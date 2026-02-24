const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }, // Optional for daily attendance
    date: { type: Date, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'Late', 'Half Day'], default: 'Present' },
    remark: { type: String }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Attendance', attendanceSchema);
};
