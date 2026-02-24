const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., Basic, Premium, Platinum
    price: { type: Number, required: true }, // e.g., 3000
    interval: { type: String, default: 'month' }, // month, year
    studentLimit: { type: Number, required: true },
    modules: [{ type: String }], // List of enabled feature keys
    description: { type: String },
    isPopular: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);
