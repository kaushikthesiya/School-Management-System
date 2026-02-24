const mongoose = require('mongoose');

const dormitoryRoomSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    dormitory: { type: mongoose.Schema.Types.ObjectId, ref: 'Dormitory', required: true },
    roomNumber: { type: String, required: true },
    type: { type: String, default: 'Standard' }, // Single, Double, AC, Non-AC etc
    numberOfBed: { type: Number, required: true },
    costPerBed: { type: Number, default: 0 },
    description: { type: String },
    status: { type: String, enum: ['Available', 'Full', 'Maintenance'], default: 'Available' }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('DormitoryRoom', dormitoryRoomSchema);
};
