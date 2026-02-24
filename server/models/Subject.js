const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String }, // e.g., MATH101
    type: { type: String, enum: ['Theory', 'Practical', 'Theory + Practical'], default: 'Theory' },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Subject', subjectSchema);
};
