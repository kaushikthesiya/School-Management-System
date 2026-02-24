const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Department', departmentSchema);
};
