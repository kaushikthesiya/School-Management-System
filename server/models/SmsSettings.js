const mongoose = require('mongoose');

const smsSettingsSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    startTime: { type: String, default: '09:00 AM' },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('SmsSettings', smsSettingsSchema);
};
