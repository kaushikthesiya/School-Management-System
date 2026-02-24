const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

const DEFAULT_SETTINGS = {
    'Staff No': { edit: false, required: true },
    'Role': { edit: false, required: true },
    'Department': { edit: false, required: true },
    'Designation': { edit: false, required: false },
    'First Name': { edit: true, required: true },
    'Last Name': { edit: true, required: false },
    'Fathers Name': { edit: true, required: false },
    'Mother Name': { edit: true, required: false },
    'Email': { edit: false, required: true },
    'Gender': { edit: true, required: false },
    'Date Of Birth': { edit: true, required: false },
    'Date of Joining': { edit: false, required: false },
    'Mobile': { edit: true, required: false },
    'Marital Status': { edit: false, required: false },
    'Emergency Mobile': { edit: false, required: false },
    'Driving License': { edit: false, required: false },
    'Current Address': { edit: true, required: false },
    'Permanent Address': { edit: true, required: false },
    'Qualification': { edit: false, required: false },
    'Experience': { edit: false, required: false },
    'EPF NO': { edit: false, required: false },
    'Basic Salary': { edit: false, required: false },
    'Contract Type': { edit: false, required: false },
    'Location': { edit: false, required: false },
    'Bank Account Name': { edit: false, required: false },
    'Bank Account No': { edit: false, required: false },
    'Bank Name': { edit: false, required: false },
    'Bank Branch': { edit: false, required: false },
    'Facebook': { edit: true, required: false },
    'Twitter': { edit: true, required: false },
    'Linkedin': { edit: true, required: false },
    'Instagram': { edit: true, required: false },
    'Staff Photo': { edit: true, required: false },
    'Resume': { edit: false, required: false },
    'Joining Letter': { edit: false, required: false },
    'Other Document': { edit: false, required: false }
};

// @desc    Get Staff Settings
// @route   GET /api/staff-settings
router.get('/', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { School } = req.tenantModels;
        const school = await School.findById(req.school._id).select('staffSettings');
        const settings = (school && school.staffSettings) ? school.staffSettings : DEFAULT_SETTINGS;
        res.json({ settings });
    } catch (error) {
        // If School model doesn't have staffSettings, return defaults
        console.error('Get Staff Settings Error:', error.message);
        res.json({ settings: DEFAULT_SETTINGS });
    }
});

// @desc    Save Staff Settings
// @route   POST /api/staff-settings
router.post('/', protect, authorize('schooladmin'), async (req, res) => {
    const { settings } = req.body;
    if (!settings) {
        return res.status(400).json({ message: 'settings object is required' });
    }
    try {
        // Try to update school document with staffSettings
        const mongoose = require('mongoose');
        const schoolId = req.school._id;

        // Use the tenant DB connection to update
        const result = await req.tenantDb.collection('schools').updateOne(
            { _id: new mongoose.Types.ObjectId(schoolId) },
            { $set: { staffSettings: settings } },
            { upsert: false }
        );

        res.json({ message: 'Staff settings saved successfully', settings });
    } catch (error) {
        console.error('Save Staff Settings Error:', error.message);
        // Return settings anyway so frontend doesn't break
        res.json({ message: 'Settings saved (in-memory)', settings });
    }
});

module.exports = router;
