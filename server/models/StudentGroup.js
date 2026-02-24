const mongoose = require('mongoose');

const studentGroupSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    name: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    description: { type: String }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('StudentGroup', studentGroupSchema);
};
