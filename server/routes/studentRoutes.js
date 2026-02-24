const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get all students for a school (with filters)
// @route   GET /api/students
router.get('/', protect, async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        const { classId, section, search, status } = req.query;
        let query = { school: req.school._id };

        if (classId) {
            if (classId === 'unassigned') query.class = { $exists: false };
            else query.class = classId;
        }
        if (section) query.section = section;
        if (status !== undefined) query.isActive = status === 'true';
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { admissionNumber: { $regex: search, $options: 'i' } }
            ];
        }

        const students = await Student.find(query)
            .populate('class')
            .populate('academicYear')
            .populate('transportRoute');
        res.json(students);
    } catch (error) {
        console.error('Get Students Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Bulk fetch students by IDs
// @route   POST /api/students/bulk-fetch
router.post('/bulk-fetch', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: 'Invalid IDs provided' });
        }
        const students = await Student.find({
            _id: { $in: ids },
            school: req.school._id
        }).populate('class').populate('academicYear').populate('transportRoute');
        res.json(students);
    } catch (error) {
        console.error('Bulk Fetch Students Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get children for the logged-in parent
// @route   GET /api/students/my-children
router.get('/my-children', protect, async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        if (req.user.role !== 'parent') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const students = await Student.find({
            school: req.school._id,
            guardianEmail: req.user.email
        }).populate('class').populate('academicYear');

        res.json(students);
    } catch (error) {
        console.error('Get My Children Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get current student profile
// @route   GET /api/students/me
router.get('/me', protect, async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        const student = await Student.findOne({ email: req.user.email, school: req.school._id })
            .populate('class')
            .populate('academicYear');
        if (!student) return res.status(404).json({ message: 'Student profile not found' });
        res.json(student);
    } catch (error) {
        console.error('Get My Student Profile Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update current student profile
// @route   PUT /api/students/me
router.put('/me', protect, async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        const student = await Student.findOneAndUpdate(
            { email: req.user.email, school: req.school._id },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!student) return res.status(404).json({ message: 'Student profile not found' });
        res.json({ message: 'Profile updated successfully', student });
    } catch (error) {
        console.error('Update My Student Profile Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get single student details
// @route   GET /api/students/:id
router.get('/:id', protect, async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        const student = await Student.findOne({ _id: req.params.id, school: req.school._id })
            .populate('class')
            .populate('academicYear');

        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (error) {
        console.error('Get Student Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Add a new student
// @route   POST /api/students
router.post('/', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        console.log('DEBUG: Add Student Request Body:', JSON.stringify(req.body, null, 2));
        const studentCount = await Student.countDocuments({ school: req.school._id });
        if (studentCount >= req.school.studentLimit) {
            return res.status(400).json({ message: 'Student limit reached for this school' });
        }

        // The frontend sends data in the flat structure matching our new schema
        const student = await Student.create({ ...req.body, school: req.school._id });

        // 🚀 Automatic User Creation Logic
        const User = require('../models/User');

        // 1. Create Student User if email is provided
        if (req.body.email) {
            const existingStudentUser = await User.findOne({ email: req.body.email });
            if (!existingStudentUser) {
                await User.create({
                    name: `${req.body.firstName} ${req.body.lastName}`,
                    email: req.body.email,
                    password: 'Student@' + (req.body.phone ? req.body.phone.slice(-4) : '1234'),
                    role: 'student',
                    school: req.school._id
                });
            }
        }

        // 2. Create Parent/Guardian User if guardianEmail is provided
        if (req.body.guardianEmail) {
            const existingParentUser = await User.findOne({ email: req.body.guardianEmail });
            if (!existingParentUser) {
                await User.create({
                    name: req.body.guardianName || req.body.fatherName || 'Parent',
                    email: req.body.guardianEmail,
                    password: 'Parent@' + (req.body.guardianPhone ? req.body.guardianPhone.slice(-4) : '1234'),
                    role: 'parent',
                    school: req.school._id
                });
            }
        }

        res.status(201).json(student);
    } catch (error) {
        console.error('Add Student Error:', error);
        res.status(400).json({ message: error.message });
    }
});

// @desc    Toggle student active status
// @route   PATCH /api/students/:id/toggle-status
router.patch('/:id/toggle-status', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        student.isActive = !student.isActive;
        await student.save();
        res.json({ message: 'Status updated', isActive: student.isActive });
    } catch (error) {
        console.error('Toggle Student Status Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Toggle student login permission
// @route   PATCH /api/students/:id/login-toggle
router.patch('/:id/login-toggle', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        const student = await Student.findOne({ _id: req.params.id, school: req.school._id });
        if (!student) return res.status(404).json({ message: 'Student not found' });

        student.allowLogin = !student.allowLogin;
        await student.save();
        res.json(student);
    } catch (error) {
        console.error('Toggle Student Login Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update student details
// @route   PUT /api/students/:id
router.put('/:id', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        const student = await Student.findOneAndUpdate(
            { _id: req.params.id, school: req.school._id },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Student updated successfully', student });
    } catch (error) {
        console.error('Update Student Error:', error);
        res.status(400).json({ message: error.message });
    }
});

// @desc    Partial update student details
// @route   PATCH /api/students/:id
router.patch('/:id', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        const student = await Student.findOneAndUpdate(
            { _id: req.params.id, school: req.school._id },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Student updated successfully', student });
    } catch (error) {
        console.error('Patch Student Error:', error);
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete student record
// @route   DELETE /api/students/:id
router.delete('/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        const student = await Student.findOneAndDelete({ _id: req.params.id, school: req.school._id });

        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Student record deleted permanently' });
    } catch (error) {
        console.error('Delete Student Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Promote students (Bulk)
// @route   POST /api/students/promote
router.post('/promote', protect, authorize('schooladmin'), async (req, res) => {
    const { studentIds, targetClassId, targetSection, targetAcademicYear } = req.body;
    try {
        const { Student } = req.tenantModels;
        const updateData = { class: targetClassId, section: targetSection };
        if (targetAcademicYear) updateData.academicYear = targetAcademicYear;

        await Student.updateMany(
            { _id: { $in: studentIds } },
            updateData
        );
        res.json({ message: 'Students promoted successfully' });
    } catch (error) {
        console.error('Promote Students Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Add document to current student profile
// @route   POST /api/students/me/documents
router.post('/me/documents', protect, async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        const { name, url } = req.body;

        const student = await Student.findOne({ email: req.user.email, school: req.school._id });
        if (!student) return res.status(404).json({ message: 'Student not found' });

        student.documents.push({ name, url });
        await student.save();

        res.json(student);
    } catch (error) {
        console.error('Add My Document Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Add document to student profile
// @route   POST /api/students/:id/documents
router.post('/:id/documents', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        const { name, url } = req.body;

        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        student.documents.push({ name, url });
        await student.save();

        res.json(student);
    } catch (error) {
        console.error('Add Document Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get multi-class assignments
// @route   GET /api/students/multi-class
router.get('/multi-class', protect, async (req, res) => {
    try {
        const { MultiClassStudent } = req.tenantModels;
        const { classId, section } = req.query;
        let query = { school: req.school._id };
        if (classId) query.class = classId;
        if (section) query.section = section;

        const assignments = await MultiClassStudent.find(query)
            .populate('student')
            .populate('class')
            .populate('academicYear');
        res.json(assignments);
    } catch (error) {
        console.error('Get MultiClass Assignments Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Add multi-class assignment
// @route   POST /api/students/multi-class
router.post('/multi-class', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { MultiClassStudent } = req.tenantModels;
        const { studentId, classId, section, academicYearId } = req.body;

        // Check if already assigned to this class/section
        const existing = await MultiClassStudent.findOne({
            student: studentId,
            class: classId,
            section,
            school: req.school._id
        });

        if (existing) {
            return res.status(400).json({ message: 'Student is already assigned to this class and section' });
        }

        const assignment = await MultiClassStudent.create({
            student: studentId,
            class: classId,
            section,
            academicYear: academicYearId,
            school: req.school._id
        });

        res.status(201).json(assignment);
    } catch (error) {
        console.error('Add MultiClass Assignment Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete multi-class assignment
// @route   DELETE /api/students/multi-class/:id
router.delete('/multi-class/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { MultiClassStudent } = req.tenantModels;
        const assignment = await MultiClassStudent.findOneAndDelete({
            _id: req.params.id,
            school: req.school._id
        });

        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
        res.json({ message: 'Multi-class assignment removed' });
    } catch (error) {
        console.error('Delete MultiClass Assignment Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
