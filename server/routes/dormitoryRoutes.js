const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// ─── DORMITORY ────────────────────────────────────────────────────────────────

// ── DORMITORIES (Buildings) ───────────────────────────────────────────────────
// @route   GET /api/dormitory
router.get('/', protect, async (req, res) => {
    try {
        const { Dormitory } = req.tenantModels;
        const dormitories = await Dormitory.find({ school: req.school._id }).sort({ name: 1 });
        res.json(dormitories);
    } catch (error) {
        console.error('Get Dormitories Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   POST /api/dormitory
router.post('/', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Dormitory } = req.tenantModels;
        const dormitory = await Dormitory.create({ ...req.body, school: req.school._id });
        res.status(201).json(dormitory);
    } catch (error) {
        console.error('Create Dormitory Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   PUT /api/dormitory/:id
router.put('/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Dormitory } = req.tenantModels;
        const dormitory = await Dormitory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!dormitory) return res.status(404).json({ message: 'Dormitory not found' });
        res.json(dormitory);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   DELETE /api/dormitory/:id
router.delete('/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Dormitory, DormitoryRoom } = req.tenantModels;
        // Remove all rooms first
        await DormitoryRoom.deleteMany({ dormitory: req.params.id });
        await Dormitory.findByIdAndDelete(req.params.id);
        res.json({ message: 'Dormitory and its rooms deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// ── ROOMS ─────────────────────────────────────────────────────────────────────
// @route   GET /api/dormitory/rooms
router.get('/rooms', protect, async (req, res) => {
    const { dormitoryId, type, status } = req.query;
    try {
        const { DormitoryRoom } = req.tenantModels;
        let query = { school: req.school._id };
        if (dormitoryId) query.dormitory = dormitoryId;
        if (type) query.type = type;
        if (status) query.status = status;
        const rooms = await DormitoryRoom.find(query)
            .populate('dormitory', 'name type')
            .sort({ roomNumber: 1 });
        res.json(rooms);
    } catch (error) {
        console.error('Get Rooms Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   POST /api/dormitory/rooms
router.post('/rooms', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { DormitoryRoom } = req.tenantModels;
        const room = await DormitoryRoom.create({ ...req.body, school: req.school._id });
        const populated = await room.populate('dormitory', 'name type');
        res.status(201).json(populated);
    } catch (error) {
        console.error('Create Room Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   PUT /api/dormitory/rooms/:id
router.put('/rooms/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { DormitoryRoom } = req.tenantModels;
        const room = await DormitoryRoom.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('dormitory', 'name type');
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   DELETE /api/dormitory/rooms/:id
router.delete('/rooms/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { DormitoryRoom } = req.tenantModels;
        await DormitoryRoom.findByIdAndDelete(req.params.id);
        res.json({ message: 'Room deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// ── ROOM TYPES ─────────────────────────────────────────────────────────────────
// @route   GET /api/dormitory/room-types
// @desc    Get distinct room types
// @route   GET /api/dormitory/room-types
router.get('/room-types', protect, async (req, res) => {
    try {
        const { RoomType } = req.tenantModels;
        const types = await RoomType.find({ school: req.school._id }).sort({ name: 1 });
        res.json(types);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/dormitory/room-types
router.post('/room-types', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { RoomType } = req.tenantModels;
        const type = await RoomType.create({ ...req.body, school: req.school._id });
        res.status(201).json(type);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/dormitory/room-types/:id
router.delete('/room-types/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { RoomType } = req.tenantModels;
        await RoomType.findByIdAndDelete(req.params.id);
        res.json({ message: 'Room type removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
