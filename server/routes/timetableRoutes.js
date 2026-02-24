const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Update timetable for a day
// @route   POST /api/timetable
router.post('/', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Timetable } = req.tenantModels;
        const { classId, section, day, periods } = req.body;
        const timetable = await Timetable.findOneAndUpdate(
            { school: req.school._id, class: classId, section, day },
            { periods },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        res.status(201).json(timetable);
    } catch (error) {
        console.error('Update Timetable Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get timetable for a class/section
// @route   GET /api/timetable
router.get('/', protect, async (req, res) => {
    const { classId, section } = req.query;
    try {
        const { Timetable } = req.tenantModels;
        const timetable = await Timetable.find({ school: req.school._id, class: classId, section })
            .populate('periods.subject', 'name')
            .populate('periods.teacher', 'name');
        res.json(timetable);
    } catch (error) {
        console.error('Get Timetable Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
