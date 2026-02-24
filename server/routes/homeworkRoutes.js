const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Add new homework
// @route   POST /api/homework
router.post('/', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const { Homework } = req.tenantModels;
        const homework = await Homework.create({ ...req.body, school: req.school._id, assignedBy: req.user._id });
        res.status(201).json(homework);
    } catch (error) {
        console.error('Add Homework Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all homework (with filters)
// @route   GET /api/homework
router.get('/', protect, async (req, res) => {
    const { classId, subjectId } = req.query;
    try {
        const { Homework } = req.tenantModels;
        let query = { school: req.school._id };
        if (classId) query.class = classId;
        if (subjectId) query.subject = subjectId;

        const homework = await Homework.find(query)
            .populate('class', 'name')
            .populate('subject', 'name')
            .sort({ dueDate: 1 });
        res.json(homework);
    } catch (error) {
        console.error('Get Homework Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
