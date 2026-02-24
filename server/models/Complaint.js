const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    complaintType: { type: String, required: true },
    source: { type: String, enum: ['Online', 'Offline', 'Social Media', 'Other'], default: 'Offline' },
    complaintBy: { type: String, required: true },
    phone: { type: String },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true },
    actionTaken: { type: String },
    assignedTo: { type: String },
    file: { type: String },
    status: { type: String, enum: ['Open', 'Under Review', 'Closed'], default: 'Open' },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Complaint', complaintSchema);
};
