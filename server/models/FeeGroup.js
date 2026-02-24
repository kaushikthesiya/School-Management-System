const mongoose = require('mongoose');

const feeGroupSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    name: { type: String, required: true },
    description: String,
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('FeeGroup', feeGroupSchema);
};
