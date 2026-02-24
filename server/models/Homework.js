const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    section: { type: String, required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    topic: { type: String, required: true },
    description: { type: String },
    assignDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    attachments: [{ type: String }], // URLs to files
    maxMarks: { type: Number },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Assigned', 'Evaluated'], default: 'Assigned' }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Homework', homeworkSchema);
};
