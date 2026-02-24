const mongoose = require('mongoose');

const feeTypeSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    feeGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeGroup', required: true },
    name: { type: String, required: true },
    description: String,
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('FeeType', feeTypeSchema);
};
