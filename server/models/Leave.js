const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    applicantType: { type: String, enum: ['Staff', 'Student'], required: true },
    applicantId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Ref to Staff or Student
    leaveType: { type: String, required: true }, // e.g., Sick Leave, Casual Leave
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appliedDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Leave', leaveSchema);
};
