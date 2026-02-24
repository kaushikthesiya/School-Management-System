const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// ─── TRANSPORT ────────────────────────────────────────────────────────────────

// ── VEHICLES ─────────────────────────────────────────────────────────────────
// @route   GET /api/transport/vehicles
router.get('/vehicles', protect, async (req, res) => {
    try {
        const { Vehicle } = req.tenantModels;
        const vehicles = await Vehicle.find({ school: req.school._id }).sort({ vehicleNumber: 1 });
        res.json(vehicles);
    } catch (error) {
        // Vehicle model might not exist — return informative message
        console.error('Get Vehicles Error:', error);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

// @route   POST /api/transport/vehicles
router.post('/vehicles', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Vehicle } = req.tenantModels;
        const vehicle = await Vehicle.create({ ...req.body, school: req.school._id });
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

// @route   PUT /api/transport/vehicles/:id
router.put('/vehicles/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Vehicle } = req.tenantModels;
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

// @route   DELETE /api/transport/vehicles/:id
router.delete('/vehicles/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Vehicle } = req.tenantModels;
        await Vehicle.findByIdAndDelete(req.params.id);
        res.json({ message: 'Vehicle removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ── ROUTES ────────────────────────────────────────────────────────────────────
// @route   GET /api/transport/routes
router.get('/routes', protect, async (req, res) => {
    try {
        const { TransportRoute } = req.tenantModels;
        const routes = await TransportRoute.find({ school: req.school._id }).sort({ title: 1 });
        res.json(routes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

// @route   POST /api/transport/routes
router.post('/routes', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { TransportRoute } = req.tenantModels;
        const route = await TransportRoute.create({ ...req.body, school: req.school._id });
        res.status(201).json(route);
    } catch (error) {
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

// @route   PUT /api/transport/routes/:id
router.put('/routes/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { TransportRoute } = req.tenantModels;
        const route = await TransportRoute.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.json(route);
    } catch (error) {
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

// @route   DELETE /api/transport/routes/:id
router.delete('/routes/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { TransportRoute } = req.tenantModels;
        await TransportRoute.findByIdAndDelete(req.params.id);
        res.json({ message: 'Route removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ── ASSIGNMENTS (Assign student/staff to route) ───────────────────────────────
// Assignments are stored directly on the Student model as `transportRoute` field
// @route   GET /api/transport/assignments
// @desc    Get all students assigned to transport routes
router.get('/assignments', protect, async (req, res) => {
    const { routeId } = req.query;
    try {
        const { Student } = req.tenantModels;
        let query = { school: req.school._id, transportRoute: { $exists: true, $ne: null } };
        if (routeId) query.transportRoute = routeId;
        const students = await Student.find(query)
            .select('firstName lastName admissionNumber class transportRoute transportStop')
            .populate('class', 'name')
            .populate('transportRoute', 'title');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

// @route   POST /api/transport/assignments
// @desc    Assign a student to a transport route
router.post('/assignments', protect, authorize('schooladmin'), async (req, res) => {
    const { studentId, routeId, stopName } = req.body;
    if (!studentId || !routeId) {
        return res.status(400).json({ message: 'studentId and routeId are required' });
    }
    try {
        const { Student } = req.tenantModels;
        const student = await Student.findByIdAndUpdate(
            studentId,
            { $set: { transportRoute: routeId, transportStop: stopName || '' } },
            { new: true }
        ).populate('transportRoute', 'title');
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Assigned successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

// @route   DELETE /api/transport/assignments/:studentId
// @desc    Remove transport assignment from a student
router.delete('/assignments/:studentId', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Student } = req.tenantModels;
        await Student.findByIdAndUpdate(req.params.studentId, {
            $unset: { transportRoute: 1, transportStop: 1 }
        });
        res.json({ message: 'Assignment removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
