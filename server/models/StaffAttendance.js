const mongoose = require('mongoose');

const staffAttendanceSchema = new mongoose.Schema({
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'Late', 'Half Day'], default: 'Present' },
    remark: { type: String }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('StaffAttendance', staffAttendanceSchema);
};
