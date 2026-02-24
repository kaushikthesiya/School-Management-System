const mongoose = require('mongoose');

const feeRecordSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    feeStructure: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeStructure', required: true },
    amountPaid: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, enum: ['Cash', 'Cheque', 'Online', 'UPI'], default: 'Cash' },
    transactionId: { type: String },
    status: { type: String, enum: ['Paid', 'Partial', 'Pending'], default: 'Paid' },
    installmentNo: { type: Number, default: 1 },
    remarks: { type: String },
    collectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('FeeRecord', feeRecordSchema);
};
