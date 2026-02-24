const mongoose = require('mongoose');

const disciplineSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    category: { type: String, enum: ['Uniform', 'Behavior', 'Late', 'Homework', 'Other'], required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Open', 'Under Review', 'Action Taken', 'Closed'], default: 'Open' },
    actionTaken: { type: String }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Discipline', disciplineSchema);
};
