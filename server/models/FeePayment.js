const mongoose = require('mongoose');

const feePaymentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    feeType: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeStructure', required: true },
    amountPaid: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMode: { type: String, enum: ['online', 'offline'], default: 'online' },
    transactionId: { type: String }, // Razorpay Order ID or Offline Ref
    status: { type: String, enum: ['paid', 'pending', 'failed'], default: 'paid' }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('FeePayment', feePaymentSchema);
};
