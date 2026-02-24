const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    section: { type: String, required: true },
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
    periods: [{
        subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
        teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
        startTime: { type: String }, // e.g., '08:00 AM'
        endTime: { type: String },
        roomNo: { type: String }
    }]
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Timetable', timetableSchema);
};
