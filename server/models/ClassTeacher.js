const mongoose = require('mongoose');

const classTeacherSchema = new mongoose.Schema({
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    section: { type: String },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('ClassTeacher', classTeacherSchema);
};
