const mongoose = require('mongoose');

const feeStructureSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., 'Annual Tuition Fee'
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    amount: { type: Number, required: true },
    frequency: { type: String, enum: ['onetime', 'monthly', 'quarterly', 'yearly'], default: 'monthly' },
    installments: { type: Number, default: 1 },
    applicableTo: {
        class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
        stream: { type: String }
    }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('FeeStructure', feeStructureSchema);
};
