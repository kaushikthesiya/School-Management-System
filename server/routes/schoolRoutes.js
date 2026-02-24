const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get school info (dynamic based on tenant)
// @route   GET /api/school/info
// @access  Public (identified by slug)
router.get('/info', async (req, res) => {
    if (!req.school) {
        return res.status(404).json({ message: 'School context not found' });
    }
    res.json(req.school);
});

// @desc    Get students for the school
// @route   GET /api/school/students
// @access  Private
router.get('/students', protect, async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        const students = await Student.find({ school: req.school._id }).populate('class');
        res.json(students);
    } catch (error) {
        console.error('Get School Students Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
