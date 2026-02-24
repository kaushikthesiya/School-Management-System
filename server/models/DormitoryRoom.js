const mongoose = require('mongoose');

const dormitoryRoomSchema = new mongoose.Schema({
    dormitory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dormitory',
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true // e.g., 'Single', 'Double', 'AC', 'Non-AC'
    },
    numberOfBed: {
        type: Number,
        required: true
    },
    costPerBed: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('DormitoryRoom', dormitoryRoomSchema);
