const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, authorize } = require('../middleware/authMiddleware');

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// --- VISITOR ROUTES ---
router.get('/visitors', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const visitors = await req.tenantModels.Visitor.find({ school: req.user.school });
        res.json(visitors);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/visitors', protect, authorize('schooladmin', 'frontdesk'), upload.single('file'), async (req, res) => {
    try {
        const { Visitor } = req.tenantModels;
        const visitorData = { ...req.body, school: req.user.school };

        // Auto-generate visitorId if not provided
        if (!visitorData.visitorId || visitorData.visitorId.trim() === '' || visitorData.visitorId === 'undefined') {
            const count = await Visitor.countDocuments({ school: req.user.school });
            const year = new Date().getFullYear();
            visitorData.visitorId = `V-${year}-${(count + 1).toString().padStart(3, '0')}`;
        }

        if (req.file) {
            visitorData.file = req.file.path;
        }
        const visitor = await Visitor.create(visitorData);
        res.status(201).json(visitor);
    } catch (error) {
        console.error('Visitor Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/visitors/:id', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        await req.tenantModels.Visitor.deleteOne({ _id: req.params.id, school: req.user.school });
        res.json({ message: 'Visitor deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- POSTAL ROUTES ---
router.get('/postals/:type', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const type = req.params.type.charAt(0).toUpperCase() + req.params.type.slice(1);
        const postals = await req.tenantModels.Postal.find({ school: req.user.school, type });
        res.json(postals);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/postals', protect, authorize('schooladmin', 'frontdesk'), upload.single('file'), async (req, res) => {
    try {
        const postalData = { ...req.body, school: req.user.school };
        if (req.file) {
            postalData.file = req.file.path;
        }
        const postal = await req.tenantModels.Postal.create(postalData);
        res.status(201).json(postal);
    } catch (error) {
        console.error('Postal Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- CALL LOG ROUTES ---
router.get('/call-logs', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const logs = await req.tenantModels.CallLog.find({ school: req.user.school });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/call-logs', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const log = await req.tenantModels.CallLog.create({ ...req.body, school: req.user.school });
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- COMPLAINT ROUTES ---
router.get('/complaints', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const complaints = await req.tenantModels.Complaint.find({ school: req.user.school });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/complaints', protect, authorize('schooladmin', 'frontdesk'), upload.single('file'), async (req, res) => {
    try {
        const complaintData = { ...req.body, school: req.user.school };
        if (req.file) {
            complaintData.file = req.file.path;
        }
        const complaint = await req.tenantModels.Complaint.create(complaintData);
        res.status(201).json(complaint);
    } catch (error) {
        console.error('Complaint Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.patch('/complaints/:id', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const complaint = await req.tenantModels.Complaint.findOneAndUpdate(
            { _id: req.params.id, school: req.user.school },
            req.body,
            { new: true }
        );
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
        res.json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- ADMIN SETUP ROUTES ---
router.get('/admin-setup', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const setups = await req.tenantModels.AdminSetup.find({ school: req.user.school });
        res.json(setups);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/admin-setup', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const setup = await req.tenantModels.AdminSetup.create({ ...req.body, school: req.user.school });
        res.status(201).json(setup);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/students/search', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { classId, section } = req.query;
        let query = { school: req.user.school };

        if (classId) query.class = classId;
        if (section) query.section = section;

        const students = await req.tenantModels.Student.find(query).populate('class');

        // Map fields to match GenerateIDCard frontend expectations
        const formattedStudents = students.map(s => ({
            ...s.toObject(),
            name: `${s.firstName} ${s.lastName}`,
            admissionNo: s.admissionNumber
        }));

        res.json(formattedStudents);
    } catch (error) {
        console.error('Student search error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/staff/search', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Staff } = req.tenantModels;
        const staff = await Staff.find({ school: req.user.school });

        // Ensure name exists (Staff model already has 'name')
        // admissionNo for staff might be staffId
        const formattedStaff = staff.map(s => ({
            ...s.toObject(),
            admissionNo: s.staffId
        }));

        res.json(formattedStaff);
    } catch (error) {
        console.error('Staff search error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/admin-setup/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const result = await req.tenantModels.AdminSetup.deleteOne({ _id: req.params.id, school: req.user.school });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Setup not found' });
        res.json({ message: 'Setup deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- ID CARD ROUTES ---
router.get('/id-cards', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const idCards = await req.tenantModels.IDCard.find({ school: req.user.school });
        res.json(idCards);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/id-cards/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const idCard = await req.tenantModels.IDCard.findOne({ _id: req.params.id, school: req.user.school });
        if (!idCard) return res.status(404).json({ message: 'ID Card not found' });
        res.json(idCard);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/id-cards', protect, authorize('schooladmin'), upload.fields([
    { name: 'schoolLogo', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 },
    { name: 'signature', maxCount: 1 }
]), async (req, res) => {
    try {
        const idCardData = { ...req.body, school: req.user.school };
        if (req.files) {
            if (req.files.schoolLogo) idCardData.schoolLogo = req.files.schoolLogo[0].path;
            if (req.files.backgroundImage) idCardData.backgroundImage = req.files.backgroundImage[0].path;
            if (req.files.signature) idCardData.signature = req.files.signature[0].path;
        }
        const idCard = await req.tenantModels.IDCard.create(idCardData);
        res.status(201).json(idCard);
    } catch (error) {
        console.error('ID Card Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/id-cards/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        await req.tenantModels.IDCard.deleteOne({ _id: req.params.id, school: req.user.school });
        res.json({ message: 'ID Card deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- CERTIFICATE ROUTES ---
router.get('/certificates', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const certificates = await req.tenantModels.Certificate.find({ school: req.user.school });
        res.json(certificates);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/certificates', protect, authorize('schooladmin'), upload.single('backgroundImage'), async (req, res) => {
    try {
        const certificateData = { ...req.body, school: req.user.school };
        if (req.file) {
            certificateData.backgroundImage = req.file.path;
        }
        const certificate = await req.tenantModels.Certificate.create(certificateData);
        res.status(201).json(certificate);
    } catch (error) {
        console.error('Certificate Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/certificates/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        await req.tenantModels.Certificate.deleteOne({ _id: req.params.id, school: req.user.school });
        res.json({ message: 'Certificate deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- DESIGNATION ROUTES ---
router.get('/designations', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const designations = await req.tenantModels.Designation.find({ school: req.user.school });
        res.json(designations);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/designations', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const designation = await req.tenantModels.Designation.create({ ...req.body, school: req.user.school });
        res.status(201).json(designation);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.patch('/designations/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const designation = await req.tenantModels.Designation.findOneAndUpdate(
            { _id: req.params.id, school: req.user.school },
            req.body,
            { new: true }
        );
        if (!designation) return res.status(404).json({ message: 'Designation not found' });
        res.json(designation);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/designations/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        await req.tenantModels.Designation.deleteOne({ _id: req.params.id, school: req.user.school });
        res.json({ message: 'Designation deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- DEPARTMENT ROUTES ---
router.get('/departments', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const departments = await req.tenantModels.Department.find({ school: req.user.school });
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/departments', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const department = await req.tenantModels.Department.create({ ...req.body, school: req.user.school });
        res.status(201).json(department);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.patch('/departments/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const department = await req.tenantModels.Department.findOneAndUpdate(
            { _id: req.params.id, school: req.user.school },
            req.body,
            { new: true }
        );
        if (!department) return res.status(404).json({ message: 'Department not found' });
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/departments/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        await req.tenantModels.Department.deleteOne({ _id: req.params.id, school: req.user.school });
        res.json({ message: 'Department deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- LEAVE TYPE ROUTES ---
router.get('/leave-types', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const leaveTypes = await req.tenantModels.LeaveType.find({ school: req.user.school });
        res.json(leaveTypes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/leave-types', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { id, name } = req.body;
        if (id) {
            const leaveType = await req.tenantModels.LeaveType.findOneAndUpdate(
                { _id: id, school: req.user.school },
                { name },
                { new: true }
            );
            return res.json(leaveType);
        }
        const leaveType = await req.tenantModels.LeaveType.create({ name, school: req.user.school });
        res.status(201).json(leaveType);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/leave-types/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        await req.tenantModels.LeaveType.deleteOne({ _id: req.params.id, school: req.user.school });
        res.json({ message: 'Leave Type deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
