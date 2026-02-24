const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get public school info for registration
// @route   GET /api/online-admission/public/info
// @access  Public
router.get('/public/info', async (req, res) => {
    try {
        const { Class, Session, TransportRoute, AcademicStructure } = req.tenantModels;

        const [classes, sessions, routes, structure] = await Promise.all([
            Class.find({ school: req.school._id }).select('name sections'),
            Session.find({ school: req.school._id, status: { $ne: 'Completed' } }).select('year status'),
            TransportRoute.find({ school: req.school._id }).select('routeName'),
            AcademicStructure.findOne({ school: req.school._id })
        ]);

        res.json({
            schoolName: req.school.name,
            classes,
            sessions,
            routes,
            structure
        });
    } catch (error) {
        console.error('Public Info Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Submit online admission form
// @route   POST /api/online-admission/public/submit
// @access  Public
router.post('/public/submit', async (req, res) => {
    try {
        const { OnlineAdmission } = req.tenantModels;

        const admission = await OnlineAdmission.create({
            ...req.body,
            school: req.school._id,
            status: 'Pending'
        });

        res.status(201).json({
            message: 'Application submitted successfully. Please wait for school approval.',
            admissionId: admission._id
        });
    } catch (error) {
        console.error('Submission Error:', error);
        res.status(400).json({ message: error.message });
    }
});

// @desc    Get all registrations for admin
// @route   GET /api/online-admission/admin
// @access  Private (Admin)
router.get('/admin', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { OnlineAdmission } = req.tenantModels;
        const { status, classId } = req.query;

        let query = { school: req.school._id };
        if (status) query.status = status;
        if (classId) query.class = classId;

        const registrations = await OnlineAdmission.find(query)
            .populate('class', 'name')
            .populate('academicYear', 'year')
            .sort({ createdAt: -1 });

        res.json(registrations);
    } catch (error) {
        console.error('Admin Get Registrations Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update registration status (Reject)
// @route   PATCH /api/online-admission/admin/status/:id
// @access  Private (Admin)
router.patch('/admin/status/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { OnlineAdmission } = req.tenantModels;
        const { status, rejectionReason } = req.body;

        const admission = await OnlineAdmission.findOneAndUpdate(
            { _id: req.params.id, school: req.school._id },
            { status, rejectionReason },
            { new: true }
        );

        if (!admission) return res.status(404).json({ message: 'Registration not found' });

        res.json(admission);
    } catch (error) {
        console.error('Update Status Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Approve registration and create student
// @route   POST /api/online-admission/admin/approve/:id
// @access  Private (Admin)
router.post('/admin/approve/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { OnlineAdmission, Student } = req.tenantModels;
        const { User } = require('../models'); // Global User model
        const { admissionNumber, roll } = req.body;

        if (!admissionNumber) return res.status(400).json({ message: 'Admission number is required for approval' });

        const admission = await OnlineAdmission.findOne({ _id: req.params.id, school: req.school._id });
        if (!admission) return res.status(404).json({ message: 'Registration not found' });
        if (admission.status === 'Approved') return res.status(400).json({ message: 'Already approved' });

        // 1. Check if admission number is unique
        const existingStudent = await Student.findOne({ admissionNumber, school: req.school._id });
        if (existingStudent) return res.status(400).json({ message: 'Admission number already exists' });

        // 2. Create Student Record
        const studentData = {
            academicYear: admission.academicYear,
            class: admission.class,
            section: admission.section || 'A',
            admissionNumber,
            roll,
            group: admission.group,
            firstName: admission.firstName,
            lastName: admission.lastName,
            gender: admission.gender,
            dob: admission.dob,
            religion: admission.religion,
            caste: admission.caste,
            photo: admission.photo,
            email: admission.email,
            phone: admission.phoneNumber,
            currentAddress: admission.currentAddress,
            permanentAddress: admission.permanentAddress,
            bloodGroup: admission.bloodGroup,
            height: admission.height,
            weight: admission.weight,
            category: admission.category,
            fatherName: admission.fatherName,
            fatherOccupation: admission.fatherOccupation,
            fatherPhone: admission.fatherPhone,
            fatherPhoto: admission.fatherPhoto,
            motherName: admission.motherName,
            motherOccupation: admission.motherOccupation,
            motherPhone: admission.motherPhone,
            motherPhoto: admission.motherPhoto,
            guardianRelation: admission.relation,
            guardianName: admission.guardianName,
            guardianEmail: admission.guardianEmail,
            guardianPhone: admission.guardianPhone,
            guardianOccupation: admission.guardianOccupation,
            guardianAddress: admission.guardianAddress,
            guardianPhoto: admission.guardianPhoto,
            nationalId: admission.nationalId,
            bankName: admission.bankName,
            bankAccount: admission.bankAccount,
            ifsc: admission.ifscCode,
            previousSchoolDetails: admission.previousSchool,
            additionalNotes: admission.additionalNotes,
            route: admission.route ? admission.route.toString() : '',
            vehicle: admission.vehicle,
            dormitory: admission.dormitoryName,
            room: admission.roomNumber,
            school: req.school._id
        };

        const student = await Student.create(studentData);

        // 3. Create Parent/Guardian User if email is provided
        if (admission.guardianEmail) {
            const existingUser = await User.findOne({ email: admission.guardianEmail });
            if (!existingUser) {
                await User.create({
                    name: admission.guardianName,
                    email: admission.guardianEmail,
                    password: 'Parent@' + admission.guardianPhone.slice(-4), // Default password
                    role: 'parent',
                    school: req.school._id
                });
            }
        }

        // 4. Update Admission Status
        admission.status = 'Approved';
        await admission.save();

        res.json({ message: 'Student successfully admitted', student });
    } catch (error) {
        console.error('Approve Error:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
