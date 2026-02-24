const mongoose = require('mongoose');

const callLogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
    nextFollowUp: { type: Date },
    callDuration: { type: String },
    callType: { type: String, enum: ['Incoming', 'Outgoing'], default: 'Incoming' },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('CallLog', callLogSchema);
};
