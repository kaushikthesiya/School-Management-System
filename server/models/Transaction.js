const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    type: { type: String, enum: ['Income', 'Expense'], required: true },
    category: { type: String, required: true }, // e.g., 'Fees', 'Salary', 'Stationery'
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    paymentMethod: { type: String, enum: ['Cash', 'Cheque', 'Online', 'UPI'], default: 'Cash' },
    referenceId: { type: String }, // e.g., FeeRecord ID or Staff ID
    attachment: { type: String }, // URL to receipt/bill
    remarks: { type: String },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Transaction', transactionSchema);
};
