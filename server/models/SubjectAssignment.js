const mongoose = require('mongoose');

const subjectAssignmentSchema = new mongoose.Schema({
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    section: { type: String },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('SubjectAssignment', subjectAssignmentSchema);
};
