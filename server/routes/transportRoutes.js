const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get all transport routes
// @route   GET /api/transport/routes
router.get('/routes', protect, async (req, res) => {
    try {
        const { TransportRoute } = req.tenantModels;
        const routes = await TransportRoute.find({ school: req.school._id });
        res.json(routes);
    } catch (error) {
        console.error('Get Transport Routes Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Add transport route
// @route   POST /api/transport/routes
router.post('/routes', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { TransportRoute } = req.tenantModels;
        const route = await TransportRoute.create({ ...req.body, school: req.school._id });
        res.status(201).json(route);
    } catch (error) {
        console.error('Add Transport Route Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Delete transport route
// @route   DELETE /api/transport/routes/:id
router.delete('/routes/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { TransportRoute } = req.tenantModels;
        await TransportRoute.findByIdAndDelete(req.params.id);
        res.json({ message: 'Route removed' });
    } catch (error) {
        console.error('Delete Transport Route Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
