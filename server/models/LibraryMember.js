const mongoose = require('mongoose');

const libraryMemberSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    memberId: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['Student', 'Staff', 'Teacher'], required: true },
    email: { type: String },
    mobile: { type: String },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }
}, { timestamps: true });

// Ensure memberId is unique per school
libraryMemberSchema.index({ school: 1, memberId: 1 }, { unique: true });

module.exports = (connection) => {
    return connection.model('LibraryMember', libraryMemberSchema);
};
