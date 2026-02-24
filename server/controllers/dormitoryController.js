const Dormitory = require('../models/Dormitory');
const DormitoryRoom = require('../models/DormitoryRoom');

// Dormitory Controllers
exports.createDormitory = async (req, res) => {
    try {
        const dormitory = new Dormitory({
            ...req.body,
            schoolId: req.user.school
        });
        await dormitory.save();
        res.status(201).json(dormitory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDormitories = async (req, res) => {
    try {
        const dormitories = await Dormitory.find({ schoolId: req.user.schoolId });
        res.json(dormitories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteDormitory = async (req, res) => {
    try {
        await Dormitory.findOneAndDelete({ _id: req.params.id, schoolId: req.user.schoolId });
        res.json({ message: 'Dormitory deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Room Controllers
exports.createRoom = async (req, res) => {
    try {
        const room = new DormitoryRoom({
            ...req.body,
            schoolId: req.user.school
        });
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await DormitoryRoom.find({ schoolId: req.user.schoolId }).populate('dormitory', 'name');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        await DormitoryRoom.findOneAndDelete({ _id: req.params.id, schoolId: req.user.schoolId });
        res.json({ message: 'Room deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
