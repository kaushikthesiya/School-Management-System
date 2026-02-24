const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// ─── INCIDENTS (Behaviour Records) ───────────────────────────────────────────

// @route   GET /api/discipline
// @desc    Get all incidents with filters
router.get('/', protect, async (req, res) => {
    const { studentId, classId, category, status, from, to } = req.query;
    try {
        const { Discipline } = req.tenantModels;
        let query = { school: req.school._id };
        if (studentId) query.student = studentId;
        if (classId) query.class = classId;
        if (category) query.category = category;
        if (status) query.status = status;
        if (from || to) {
            query.date = {};
            if (from) query.date.$gte = new Date(from);
            if (to) query.date.$lte = new Date(to);
        }
        const records = await Discipline.find(query)
            .populate('student', 'firstName lastName admissionNumber photo')
            .populate('class', 'name')
            .sort({ date: -1 });
        res.json(records);
    } catch (error) {
        console.error('Get Discipline Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   POST /api/discipline
// @desc    Create new incident
router.post('/', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const { Discipline } = req.tenantModels;
        const record = await Discipline.create({
            ...req.body,
            school: req.school._id,
            reportedBy: req.user._id
        });
        const populated = await record.populate([
            { path: 'student', select: 'firstName lastName admissionNumber' },
            { path: 'class', select: 'name' }
        ]);
        res.status(201).json(populated);
    } catch (error) {
        console.error('Create Discipline Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   GET /api/discipline/:id
// @desc    Get single incident
router.get('/:id', protect, async (req, res) => {
    try {
        const { Discipline } = req.tenantModels;
        const record = await Discipline.findById(req.params.id)
            .populate('student', 'firstName lastName admissionNumber photo')
            .populate('class', 'name');
        if (!record) return res.status(404).json({ message: 'Incident not found' });
        res.json(record);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/discipline/:id
// @desc    Update incident (status, actionTaken, etc.)
router.put('/:id', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const { Discipline } = req.tenantModels;
        const record = await Discipline.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('student', 'firstName lastName admissionNumber')
            .populate('class', 'name');
        if (!record) return res.status(404).json({ message: 'Incident not found' });
        res.json(record);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   DELETE /api/discipline/:id
// @desc    Delete incident
router.delete('/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Discipline } = req.tenantModels;
        await Discipline.findByIdAndDelete(req.params.id);
        res.json({ message: 'Incident deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/discipline/report/by-student
// @desc    Student Incident Report - incidents grouped by student
router.get('/report/by-student', protect, async (req, res) => {
    const { classId, from, to } = req.query;
    try {
        const { Discipline } = req.tenantModels;
        let matchQuery = { school: req.school._id };
        if (classId && require('mongoose').Types.ObjectId.isValid(classId)) {
            matchQuery.class = new (require('mongoose').Types.ObjectId)(classId);
        }
        if (from || to) {
            matchQuery.date = {};
            if (from) matchQuery.date.$gte = new Date(from);
            if (to) matchQuery.date.$lte = new Date(to);
        }
        const report = await Discipline.aggregate([
            { $match: matchQuery },
            { $group: { _id: '$student', totalIncidents: { $sum: 1 }, categories: { $push: '$category' } } },
            { $lookup: { from: 'students', localField: '_id', foreignField: '_id', as: 'studentDetails' } },
            { $unwind: '$studentDetails' },
            {
                $project: {
                    _id: 0,
                    student: {
                        _id: '$_id',
                        firstName: '$studentDetails.firstName',
                        lastName: '$studentDetails.lastName',
                        admissionNumber: '$studentDetails.admissionNumber'
                    },
                    totalIncidents: 1,
                    categories: 1
                }
            },
            { $sort: { totalIncidents: -1 } }
        ]);
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   GET /api/discipline/report/by-category
// @desc    Incident Wise Report - grouped by category
router.get('/report/by-category', protect, async (req, res) => {
    const { from, to } = req.query;
    try {
        const { Discipline } = req.tenantModels;
        let matchQuery = { school: req.school._id };
        if (from || to) {
            matchQuery.date = {};
            if (from) matchQuery.date.$gte = new Date(from);
            if (to) matchQuery.date.$lte = new Date(to);
        }
        const report = await Discipline.aggregate([
            { $match: matchQuery },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   GET /api/discipline/report/by-class
// @desc    Class Wise Report
router.get('/report/by-class', protect, async (req, res) => {
    const { from, to } = req.query;
    try {
        const { Discipline } = req.tenantModels;
        let matchQuery = { school: req.school._id };
        if (from || to) {
            matchQuery.date = {};
            if (from) matchQuery.date.$gte = new Date(from);
            if (to) matchQuery.date.$lte = new Date(to);
        }
        const report = await Discipline.aggregate([
            { $match: matchQuery },
            { $group: { _id: '$class', count: { $sum: 1 } } },
            { $lookup: { from: 'classes', localField: '_id', foreignField: '_id', as: 'classDetails' } },
            { $unwind: '$classDetails' },
            { $project: { _id: 0, class: { _id: '$_id', name: '$classDetails.name' }, count: '$count' } },
            { $sort: { count: -1 } }
        ]);
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   GET /api/discipline/report/class-section-rank
// @desc    Class Section Wise Rank Report
router.get('/report/class-section-rank', protect, async (req, res) => {
    const { from, to } = req.query;
    try {
        const { Discipline } = req.tenantModels;
        let matchQuery = { school: req.school._id };
        if (from || to) {
            matchQuery.date = {};
            if (from) matchQuery.date.$gte = new Date(from);
            if (to) matchQuery.date.$lte = new Date(to);
        }

        const report = await Discipline.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: { class: '$class', student: '$student' },
                    totalIncidents: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: '$_id.class',
                    totalStudents: { $sum: 1 },
                    totalIncidents: { $sum: '$totalIncidents' }
                }
            },
            { $lookup: { from: 'classes', localField: '_id', foreignField: '_id', as: 'classDetails' } },
            { $unwind: '$classDetails' },
            {
                $project: {
                    _id: 0,
                    class: { _id: '$_id', name: '$classDetails.name', sections: '$classDetails.sections' },
                    totalStudents: 1,
                    totalIncidents: 1
                }
            },
            { $sort: { totalIncidents: 1 } } // Lower incidents = higher rank? Or more incidents? Usually rank report implies performance.
        ]);
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   GET /api/discipline/settings
// @desc    Get behaviour settings (categories, statuses)
router.get('/settings', protect, async (req, res) => {
    res.json({
        categories: ['Uniform', 'Behavior', 'Late', 'Homework', 'Other'],
        statuses: ['Open', 'Under Review', 'Action Taken', 'Closed']
    });
});

module.exports = router;
