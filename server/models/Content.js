const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: {
        type: String,
        enum: ['Assignment', 'Syllabus', 'Other Downloads'],
        required: true
    },
    availableFor: {
        type: String,
        enum: ['All Admin', 'Student', 'Available for all classes'],
        default: 'Student'
    },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    section: { type: String },
    uploadDate: { type: Date, default: Date.now },
    description: { type: String },
    sourceUrl: { type: String },
    file: { type: String },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Content', contentSchema);
};
