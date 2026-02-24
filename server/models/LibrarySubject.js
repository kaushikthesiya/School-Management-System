const mongoose = require('mongoose');

const librarySubjectSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    name: { type: String, required: true },
    category: { type: String }, // Optional link to category name or ID
    code: { type: String }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('LibrarySubject', librarySubjectSchema);
};
