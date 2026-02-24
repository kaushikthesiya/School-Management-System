const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., Accountant
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    permissions: [{
        module: { type: String, required: true }, // e.g., 'students', 'fees'
        actions: [{ type: String }] // e.g., ['read', 'write', 'delete']
    }],
    isDefault: { type: Boolean, default: false }, // Default roles like 'teacher' provided by system
    allowLogin: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Role', roleSchema);
};
