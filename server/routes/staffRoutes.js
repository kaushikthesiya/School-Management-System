const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get all staff (with search)
// @route   GET /api/staff
router.get('/', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Staff } = req.tenantModels;
        const { search, role, department } = req.query;
        let query = { school: req.school._id };

        if (role) query.role = role;
        if (department) query.department = department;
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const staff = await Staff.find(query);
        res.json(staff);
    } catch (error) {
        console.error('Get Staff Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Bulk fetch staff by IDs
// @route   POST /api/staff/bulk-fetch
router.post('/bulk-fetch', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Staff } = req.tenantModels;
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: 'Invalid IDs provided' });
        }
        const staff = await Staff.find({
            _id: { $in: ids },
            school: req.school._id
        });
        res.json(staff);
    } catch (error) {
        console.error('Bulk Fetch Staff Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get current staff profile
// @route   GET /api/staff/me
router.get('/me', protect, async (req, res) => {
    try {
        const { Staff } = req.tenantModels;
        const staff = await Staff.findOne({ email: req.user.email, school: req.school._id });
        if (!staff) return res.status(404).json({ message: 'Staff profile not found' });
        res.json(staff);
    } catch (error) {
        console.error('Get My Staff Profile Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update current staff profile
// @route   PUT /api/staff/me
router.put('/me', protect, async (req, res) => {
    try {
        const { Staff } = req.tenantModels;
        const staff = await Staff.findOneAndUpdate(
            { email: req.user.email, school: req.school._id },
            { ...req.body, school: req.school._id },
            { new: true, runValidators: true }
        );
        if (!staff) return res.status(404).json({ message: 'Staff profile not found' });
        res.json(staff);
    } catch (error) {
        console.error('Update My Staff Profile Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Add a new staff member
// @route   POST /api/staff
router.post('/', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Staff } = req.tenantModels;
        const staff = await Staff.create({ ...req.body, school: req.school._id });
        res.status(201).json(staff);
    } catch (error) {
        console.error('Add Staff Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Toggle staff status
// @route   PATCH /api/staff/:id/toggle-status
router.patch('/:id/toggle-status', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Staff } = req.tenantModels;
        const staff = await Staff.findById(req.params.id);
        if (!staff) return res.status(404).json({ message: 'Staff not found' });

        staff.isActive = !staff.isActive;
        await staff.save();
        res.json(staff);
    } catch (error) {
        console.error('Toggle Staff Status Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update staff member
// @route   PUT /api/staff/:id
router.put('/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Staff } = req.tenantModels;
        const staff = await Staff.findByIdAndUpdate(
            req.params.id,
            { ...req.body, school: req.school._id },
            { new: true, runValidators: true }
        );

        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        res.json(staff);
    } catch (error) {
        console.error('Update Staff Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Generate payslip
// @route   POST /api/staff/payroll/generate
router.post('/payroll/generate', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Payslip } = req.tenantModels;
        const payslip = await Payslip.create({ ...req.body, school: req.school._id });
        res.status(201).json(payslip);
    } catch (error) {
        console.error('Generate Payslip Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

module.exports = router;
