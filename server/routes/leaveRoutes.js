const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Apply for leave
// @route   POST /api/leaves/apply
router.post('/apply', protect, async (req, res) => {
    try {
        const { Leave } = req.tenantModels;
        const { applicantType, applicantId, leaveType, startDate, endDate, reason } = req.body;
        const leave = await Leave.create({
            school: req.school._id,
            applicantType,
            applicantId,
            leaveType,
            startDate,
            endDate,
            reason
        });
        res.status(201).json(leave);
    } catch (error) {
        console.error('Apply Leave Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all leaves (for admin approval)
// @route   GET /api/leaves
router.get('/', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Leave } = req.tenantModels;
        const leaves = await Leave.find({ school: req.school._id }).sort({ appliedDate: -1 });
        res.json(leaves);
    } catch (error) {
        console.error('Get Leaves Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Approve/Reject leave
// @route   PATCH /api/leaves/:id/status
router.patch('/:id/status', protect, authorize('schooladmin'), async (req, res) => {
    const { status } = req.body;
    try {
        const { Leave } = req.tenantModels;
        const leave = await Leave.findById(req.params.id);
        if (!leave) return res.status(404).json({ message: 'Leave request not found' });

        leave.status = status;
        leave.approvedBy = req.user._id;
        await leave.save();
        res.json(leave);
    } catch (error) {
        console.error('Update Leave Status Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
