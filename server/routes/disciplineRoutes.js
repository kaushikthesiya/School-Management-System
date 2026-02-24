const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Log a discipline complaint
// @route   POST /api/discipline
router.post('/', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const { Discipline } = req.tenantModels;
        const record = await Discipline.create({ ...req.body, school: req.school._id, reportedBy: req.user._id });
        res.status(201).json(record);
    } catch (error) {
        console.error('Log Discipline Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get discipline records
// @route   GET /api/discipline
router.get('/', protect, async (req, res) => {
    const { studentId, classId } = req.query;
    try {
        const { Discipline } = req.tenantModels;
        let query = { school: req.school._id };
        if (studentId) query.student = studentId;
        if (classId) query.class = classId;

        const records = await Discipline.find(query)
            .populate('student', 'firstName lastName admissionNumber')
            .populate('class', 'name')
            .sort({ date: -1 });
        res.json(records);
    } catch (error) {
        console.error('Get Discipline Records Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
