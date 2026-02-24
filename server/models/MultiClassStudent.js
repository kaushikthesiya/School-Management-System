const mongoose = require('mongoose');

const multiClassStudentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    section: { type: String, required: true },
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('MultiClassStudent', multiClassStudentSchema);
};
