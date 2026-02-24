const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// ─── HOMEWORK ─────────────────────────────────────────────────────────────────

// @route   GET /api/homework
// @desc    Get homework list with filters
router.get('/', protect, async (req, res) => {
    const { classId, subjectId, section, status, from, to } = req.query;
    try {
        const { Homework } = req.tenantModels;
        let query = { school: req.school._id };
        if (classId) query.class = classId;
        if (subjectId) query.subject = subjectId;
        if (section) query.section = section;
        if (status) query.status = status;
        if (from || to) {
            query.dueDate = {};
            if (from) query.dueDate.$gte = new Date(from);
            if (to) query.dueDate.$lte = new Date(to);
        }
        const homework = await Homework.find(query)
            .populate('class', 'name')
            .populate('subject', 'name')
            .sort({ dueDate: 1 });
        res.json(homework);
    } catch (error) {
        console.error('Get Homework Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   POST /api/homework
// @desc    Add homework
router.post('/', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const { Homework } = req.tenantModels;
        const homework = await Homework.create({
            ...req.body,
            school: req.school._id,
            assignedBy: req.user._id
        });
        const populated = await homework.populate([
            { path: 'class', select: 'name' },
            { path: 'subject', select: 'name' }
        ]);
        res.status(201).json(populated);
    } catch (error) {
        console.error('Add Homework Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   GET /api/homework/:id
// @desc    Get single homework
router.get('/:id', protect, async (req, res) => {
    try {
        const { Homework } = req.tenantModels;
        const hw = await Homework.findById(req.params.id)
            .populate('class', 'name')
            .populate('subject', 'name');
        if (!hw) return res.status(404).json({ message: 'Homework not found' });
        res.json(hw);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/homework/:id
// @desc    Update homework
router.put('/:id', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const { Homework } = req.tenantModels;
        const hw = await Homework.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('class', 'name')
            .populate('subject', 'name');
        if (!hw) return res.status(404).json({ message: 'Homework not found' });
        res.json(hw);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   DELETE /api/homework/:id
// @desc    Delete homework
router.delete('/:id', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const { Homework } = req.tenantModels;
        await Homework.findByIdAndDelete(req.params.id);
        res.json({ message: 'Homework deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/homework/:id/evaluate
// @desc    Mark homework as evaluated
router.post('/:id/evaluate', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const { Homework } = req.tenantModels;
        const hw = await Homework.findByIdAndUpdate(
            req.params.id,
            { $set: { status: 'Evaluated' } },
            { new: true }
        ).populate('class', 'name').populate('subject', 'name');
        if (!hw) return res.status(404).json({ message: 'Homework not found' });
        res.json({ message: 'Marked as evaluated', homework: hw });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
