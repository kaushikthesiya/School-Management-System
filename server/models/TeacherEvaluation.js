const mongoose = require('mongoose');

const teacherEvaluationSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Or specific role
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('TeacherEvaluation', teacherEvaluationSchema);
};
