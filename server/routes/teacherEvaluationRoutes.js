const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Submit a teacher evaluation
// @route   POST /api/teacher-evaluation
router.post('/', protect, async (req, res) => {
    try {
        const { TeacherEvaluation } = req.tenantModels;
        const evaluation = await TeacherEvaluation.create({
            ...req.body,
            school: req.school._id,
            submittedBy: req.user._id // Assuming logged-in user submits
        });
        res.status(201).json(evaluation);
    } catch (error) {
        console.error('Submit Evaluation Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all evaluations (with filters)
// @route   GET /api/teacher-evaluation
router.get('/', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { TeacherEvaluation } = req.tenantModels;
        const { status, teacher, classId, sectionId, subjectId, submittedBy } = req.query;
        let query = { school: req.school._id };

        console.log('--- Evaluation Fetch Debug ---');
        console.log('Incoming Params:', req.query);

        if (status) query.status = status;
        if (teacher) query.teacher = teacher;
        if (classId) query.class = classId;
        if (sectionId) query.section = sectionId;
        if (subjectId) query.subject = subjectId;

        // If submittedBy is NOT a role, apply it to query directly
        if (submittedBy && !['student', 'parent'].includes(submittedBy)) {
            query.submittedBy = submittedBy;
        }

        console.log('Final Mongo Query:', JSON.stringify(query));

        let evaluations = await TeacherEvaluation.find(query)
            .populate('teacher', 'name staffId')
            .populate('class', 'name')
            .populate('section', 'name')
            .populate('subject', 'name')
            .populate('submittedBy', 'name role') // Populate role for filtering
            .sort({ createdAt: -1 });

        // Apply role-based filtering if requested
        if (submittedBy && ['student', 'parent'].includes(submittedBy)) {
            console.log(`Filtering results by role: ${submittedBy}`);
            evaluations = evaluations.filter(e => e.submittedBy && e.submittedBy.role === submittedBy);
        }

        console.log('Evaluations Found after filtering:', evaluations.length);
        res.json(evaluations);
    } catch (error) {
        console.error('Get Evaluations Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update evaluation status (Approve/Reject)
// @route   PATCH /api/teacher-evaluation/:id/status
router.patch('/:id/status', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { TeacherEvaluation } = req.tenantModels;
        const { status } = req.body; // 'Approved' or 'Rejected'

        const evaluation = await TeacherEvaluation.findOneAndUpdate(
            { _id: req.params.id, school: req.school._id },
            { status },
            { new: true }
        );

        if (!evaluation) return res.status(404).json({ message: 'Evaluation not found' });
        res.json(evaluation);
    } catch (error) {
        console.error('Update Evaluation Status Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
