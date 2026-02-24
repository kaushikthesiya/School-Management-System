const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    vehicleNumber: { type: String, required: true },
    vehicleModel: { type: String },
    type: { type: String },
    yearMade: { type: String },
    driverName: { type: String },
    driverLicense: { type: String },
    driverPhone: { type: String },
    capacity: { type: Number, default: 0 },
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'TransportRoute' },
    status: { type: String, enum: ['Active', 'Inactive', 'Maintenance'], default: 'Active' },
    note: { type: String }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Vehicle', vehicleSchema);
};
