const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get bulk print settings
// @route   GET /api/bulk-print/settings
router.get('/settings', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { BulkPrintSetting } = req.tenantModels;
        let settings = await BulkPrintSetting.findOne({ school: req.school._id });
        if (!settings) {
            // Create default settings if not exists
            settings = await BulkPrintSetting.create({ school: req.school._id });
        }
        res.json(settings);
    } catch (error) {
        console.error('Get Bulk Print Settings Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update bulk print settings
// @route   PATCH /api/bulk-print/settings
router.patch('/settings', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { BulkPrintSetting } = req.tenantModels;
        const settings = await BulkPrintSetting.findOneAndUpdate(
            { school: req.school._id },
            { $set: req.body },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.json(settings);
    } catch (error) {
        console.error('Update Bulk Print Settings Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
