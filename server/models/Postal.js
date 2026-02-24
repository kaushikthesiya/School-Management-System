const mongoose = require('mongoose');

const postalSchema = new mongoose.Schema({
    type: { type: String, enum: ['Receive', 'Dispatch'], required: true },
    fromTitle: { type: String, required: true },
    toTitle: { type: String, required: true },
    referenceNo: { type: String },
    address: { type: String },
    note: { type: String },
    date: { type: Date, default: Date.now },
    file: { type: String },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Postal', postalSchema);
};
