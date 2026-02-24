const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Create an announcement
// @route   POST /api/announcements
router.post('/', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Announcement } = req.tenantModels;
        const announcement = await Announcement.create({ ...req.body, school: req.school._id, createdBy: req.user._id });
        res.status(201).json(announcement);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get announcements for a user
// @route   GET /api/announcements
router.get('/', protect, async (req, res) => {
    try {
        const { Announcement } = req.tenantModels;
        const announcements = await Announcement.find({
            school: req.school._id,
            $or: [
                { targetRoles: { $in: [req.user.role] } },
                { targetRoles: { $size: 0 } }
            ]
        }).sort({ createdAt: -1 });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
