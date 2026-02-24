const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Mark attendance for multiple students
// @route   POST /api/attendance/mark
router.post('/mark', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    const { students, classId, date } = req.body;
    try {
        const { Attendance } = req.tenantModels;
        const attendanceRecords = students.map(s => ({
            student: s.id,
            status: s.status,
            school: req.school._id,
            class: classId,
            date: new Date(date)
        }));

        await Attendance.insertMany(attendanceRecords);
        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get attendance for a class on a specific date
// @route   GET /api/attendance
router.get('/', protect, async (req, res) => {
    const { classId, date } = req.query;
    try {
        const { Attendance } = req.tenantModels;
        const attendance = await Attendance.find({
            school: req.school._id,
            class: classId,
            date: new Date(date)
        }).populate('student');
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get attendance history for a specific student
// @route   GET /api/attendance/student/:id
router.get('/student/:id', protect, async (req, res) => {
    try {
        const { Attendance } = req.tenantModels;
        const attendance = await Attendance.find({
            school: req.school._id,
            student: req.params.id
        }).sort({ date: -1 });
        res.json(attendance);
    } catch (error) {
        console.error('Get Student Attendance Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
