const mongoose = require('mongoose');

const examMarkSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    marks: [{
        subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
        marksObtained: { type: Number, required: true },
        maxMarks: { type: Number, required: true },
        passingMarks: { type: Number },
        grade: { type: String } // Auto-calculated based on GradeScale
    }],
    totalMarks: { type: Number },
    percentage: { type: Number },
    status: { type: String, enum: ['Pass', 'Fail', 'Absent'], default: 'Pass' }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('ExamMark', examMarkSchema);
};
