const mongoose = require('mongoose');

const payslipSchema = new mongoose.Schema({
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    basicSalary: { type: Number, required: true },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    netSalary: { type: Number, required: true },
    status: { type: String, enum: ['Generated', 'Paid'], default: 'Generated' },
    paymentDate: { type: Date }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Payslip', payslipSchema);
};
