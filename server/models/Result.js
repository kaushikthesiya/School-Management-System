const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    marks: [{
        subject: { type: String },
        marksObtained: { type: Number },
        remarks: { type: String }
    }],
    totalMarks: { type: Number },
    percentage: { type: Number },
    grade: { type: String },
    isPublished: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Result', resultSchema);
};
