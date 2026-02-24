const mongoose = require('mongoose');

const transportRouteSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    title: { type: String, required: true },
    fare: { type: Number, required: true },
    vehicleNumber: { type: String },
    driverName: { type: String },
    phone: { type: String },
    description: { type: String }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('TransportRoute', transportRouteSchema);
};
