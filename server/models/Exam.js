const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., 'Mid Term 2024'
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    date: { type: Date, required: true },
    subjects: [{
        name: { type: String },
        maxMarks: { type: Number, default: 100 },
        passingMarks: { type: Number, default: 33 }
    }],
    type: { type: String, enum: ['Offline', 'Online'], default: 'Offline' },
    status: { type: String, enum: ['Scheduled', 'Ongoing', 'Completed'], default: 'Scheduled' }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Exam', examSchema);
};
