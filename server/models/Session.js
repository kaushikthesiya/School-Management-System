const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    year: { type: String, required: true }, // e.g., "2023-2024"
    status: { type: String, enum: ['Active', 'Completed', 'Upcoming'], default: 'Upcoming' },
    startDate: { type: Date },
    endDate: { type: Date },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Session', sessionSchema);
};
