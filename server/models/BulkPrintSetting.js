const mongoose = require('mongoose');

const bulkPrintSettingSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, unique: true },
    feesInvoiceType: { type: String, enum: ['invoice', 'slip'], default: 'invoice' }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('BulkPrintSetting', bulkPrintSettingSchema);
};
