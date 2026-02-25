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

// @desc    Get all leaves (with optional filters)
// @route   GET /api/leaves
router.get('/', protect, async (req, res) => {
    try {
        const { Leave, Staff, Student } = req.tenantModels;
        const query = { school: req.school._id };

        if (req.query.status) query.status = req.query.status;
        if (req.query.applicantId) query.applicantId = req.query.applicantId;

        const leaves = await Leave.find(query).sort({ appliedDate: -1 });

        // Manual population for applicantId since it can be Staff or Student
        const populatedLeaves = await Promise.all(leaves.map(async (leave) => {
            let applicant = null;
            if (leave.applicantType === 'Staff') {
                applicant = await Staff.findById(leave.applicantId).select('name staffId');
            } else {
                applicant = await Student.findById(leave.applicantId).select('name roll');
            }
            return { ...leave.toObject(), applicantId: applicant };
        }));

        res.json(populatedLeaves);
    } catch (error) {
        console.error('Get Leaves Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get leave requests (alias for GET /api/leaves with specific view)
// @route   GET /api/leaves/requests
router.get('/requests', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Leave, Staff, Student } = req.tenantModels;
        const query = { school: req.school._id };
        if (req.query.status) query.status = req.query.status;

        const leaves = await Leave.find(query).sort({ appliedDate: -1 });

        const populatedLeaves = await Promise.all(leaves.map(async (leave) => {
            let applicant = null;
            if (leave.applicantType === 'Staff') {
                applicant = await Staff.findById(leave.applicantId).select('name staffId');
            } else {
                applicant = await Student.findById(leave.applicantId).select('name roll');
            }
            return { ...leave.toObject(), applicantId: applicant };
        }));

        res.json(populatedLeaves);
    } catch (error) {
        console.error('Get Leave Requests Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Approve/Reject leave
// @route   PATCH /api/leaves/requests/:id/status
router.patch('/requests/:id/status', protect, authorize('schooladmin'), async (req, res) => {
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
