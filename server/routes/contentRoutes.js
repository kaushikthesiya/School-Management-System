const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, authorize } = require('../middleware/authMiddleware');

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// --- CONTENT ROUTES ---
router.get('/content', protect, authorize('schooladmin', 'teacher', 'student'), async (req, res) => {
    try {
        const query = { school: req.user.school };

        // Filter for specific types if provided
        if (req.query.type) {
            query.type = req.query.type;
        }

        const content = await req.tenantModels.Content.find(query)
            .populate('class', 'name');
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/content', protect, authorize('schooladmin', 'teacher'), upload.single('file'), async (req, res) => {
    try {
        const contentData = { ...req.body, school: req.user.school };
        if (req.file) {
            contentData.file = req.file.path;
        }
        const content = await req.tenantModels.Content.create(contentData);
        res.status(201).json(content);
    } catch (error) {
        console.error('Content Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/content/:id', protect, authorize('schooladmin', 'teacher'), async (req, res) => {
    try {
        const content = await req.tenantModels.Content.findOneAndDelete({
            _id: req.params.id,
            school: req.user.school
        });
        if (!content) return res.status(404).json({ message: 'Content not found' });
        res.json({ message: 'Content removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
