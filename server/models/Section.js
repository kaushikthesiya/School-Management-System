const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., 'A', 'B'
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Section', sectionSchema);
};
