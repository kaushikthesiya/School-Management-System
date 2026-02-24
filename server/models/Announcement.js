const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    targetClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }], // Empty means all
    targetRoles: [{ type: String }], // 'Student', 'Parent', 'Staff'
    activeUntil: { type: Date },
    priority: { type: String, enum: ['Normal', 'High', 'Urgent'], default: 'Normal' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Announcement', announcementSchema);
};
