const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Schedule a new exam
// @route   POST /api/exams
router.post('/', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Exam } = req.tenantModels;
        const exam = await Exam.create({ ...req.body, school: req.school._id });
        res.status(201).json(exam);
    } catch (error) {
        console.error('Schedule Exam Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all exams
// @route   GET /api/exams
router.get('/', protect, async (req, res) => {
    try {
        const { Exam } = req.tenantModels;
        const exams = await Exam.find({ school: req.school._id })
            .populate('class', 'name')
            .sort({ date: -1 });
        res.json(exams);
    } catch (error) {
        console.error('Get Exams Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Enter marks for student
// @route   POST /api/exams/marks
router.post('/marks', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const { ExamMark } = req.tenantModels;
        const { student, exam, marks } = req.body;
        const totalMarks = marks.reduce((acc, current) => acc + current.marksObtained, 0);
        const maxTotal = marks.reduce((acc, current) => acc + current.maxMarks, 0);
        const percentage = (totalMarks / maxTotal) * 100;

        const record = await ExamMark.create({
            ...req.body,
            school: req.school._id,
            totalMarks,
            percentage
        });
        res.status(201).json(record);
    } catch (error) {
        console.error('Enter Marks Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get Grade Scales
// @route   GET /api/exams/grade-scales
router.get('/grade-scales', protect, async (req, res) => {
    try {
        const { GradeScale } = req.tenantModels;
        const scales = await GradeScale.find({ school: req.school._id });
        res.json(scales);
    } catch (error) {
        console.error('Get Grade Scales Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
