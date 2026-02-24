const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get all active plans
// @route   GET /api/plans
// @access  Public
router.get('/', async (req, res) => {
    try {
        const plans = await Plan.find({});
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a new plan (SuperAdmin only)
// @route   POST /api/plans
// @access  Private/SuperAdmin
router.post('/', protect, authorize('superadmin'), async (req, res) => {
    try {
        const plan = await Plan.create(req.body);
        res.status(201).json(plan);
    } catch (error) {
        console.error('Plan Creation Error:', error);
        res.status(500).json({
            message: 'Server Error',
            details: error.message,
            tip: 'Ensure all required fields (name, price, studentLimit) are present in the request body.'
        });
    }
});

module.exports = router;
