const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Mark attendance for multiple students
// @route   POST /api/attendance/mark
router.post('/mark', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    const { students, classId, date, subjectId } = req.body;
    try {
        const { Attendance } = req.tenantModels;

        // Remove existing records for this class/date/subject to prevent duplicates
        const deleteQuery = {
            school: req.school._id,
            class: classId,
            date: new Date(date)
        };
        if (subjectId) deleteQuery.subject = subjectId;
        else deleteQuery.subject = { $exists: false };

        await Attendance.deleteMany(deleteQuery);

        const attendanceRecords = students.map(s => ({
            student: s.id,
            status: s.status,
            school: req.school._id,
            class: classId,
            subject: subjectId || undefined,
            date: new Date(date)
        }));

        await Attendance.insertMany(attendanceRecords);
        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        console.error('Mark Attendance Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Get attendance for a class on a specific date
// @route   GET /api/attendance
router.get('/', protect, async (req, res) => {
    const { classId, date, subjectId } = req.query;
    try {
        const { Attendance } = req.tenantModels;
        let query = {
            school: req.school._id,
            class: classId,
            date: new Date(date)
        };

        if (subjectId) query.subject = subjectId;
        else query.subject = { $exists: false };

        const attendance = await Attendance.find(query).populate('student');
        res.json(attendance);
    } catch (error) {
        console.error('Get Attendance Error:', error);
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
