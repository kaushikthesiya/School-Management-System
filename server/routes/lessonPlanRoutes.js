const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// --- LESSON ROUTES ---
router.get('/lessons', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const lessons = await req.tenantModels.Lesson.find({ school: req.school._id })
            .populate('class', 'name')
            .populate('subject', 'name');
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/lessons', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const lesson = await req.tenantModels.Lesson.create({ ...req.body, school: req.school._id });
        res.status(201).json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/lessons/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        await req.tenantModels.Lesson.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Lesson deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- TOPIC ROUTES ---
router.get('/topics', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const topics = await req.tenantModels.Topic.find({ school: req.school._id })
            .populate({
                path: 'lesson',
                select: 'lessonName',
                populate: [
                    { path: 'class', select: 'name' },
                    { path: 'subject', select: 'name' }
                ]
            });
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/topics', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const topic = await req.tenantModels.Topic.create({ ...req.body, school: req.school._id });
        res.status(201).json(topic);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/topics/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        await req.tenantModels.Topic.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Topic deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- LESSON PLAN ROUTES ---
router.get('/plans', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const plans = await req.tenantModels.LessonPlan.find({ school: req.school._id })
            .populate('class', 'name')
            .populate('subject', 'name')
            .populate('lesson', 'lessonName')
            .populate('topic', 'topicName')
            .populate('teacher', 'name');
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/plans', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const plan = await req.tenantModels.LessonPlan.create({ ...req.body, school: req.school._id, teacher: req.user._id });
        res.status(201).json(plan);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.patch('/plans/:id', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const plan = await req.tenantModels.LessonPlan.findOneAndUpdate(
            { _id: req.params.id, school: req.school._id },
            req.body,
            { new: true }
        );
        res.json(plan);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/plans/:id', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        await req.tenantModels.LessonPlan.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Plan deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- SETTING ROUTES ---
router.get('/settings', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        let setting = await req.tenantModels.LessonPlanSetting.findOne({ school: req.school._id });
        if (!setting) {
            setting = await req.tenantModels.LessonPlanSetting.create({ school: req.school._id });
        }
        res.json(setting);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.patch('/settings', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const setting = await req.tenantModels.LessonPlanSetting.findOneAndUpdate(
            { school: req.school._id },
            req.body,
            { new: true, upsert: true }
        );
        res.json(setting);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
