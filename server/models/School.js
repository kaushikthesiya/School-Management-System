const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // Used for URL: scolify.com/school-slug
    logo: { type: String },
    address: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    subscriptionPlan: {
        type: String,
        enum: ['basic', 'premium', 'platinum'],
        default: 'basic'
    },
    subscriptionStatus: {
        type: String,
        enum: ['active', 'expired', 'pending'],
        default: 'pending'
    },
    planExpiry: { type: Date },
    studentLimit: { type: Number, default: 100 },
    modulesEnabled: [{ type: String }], // e.g., ['attendance', 'fees', 'payroll']
    isActive: { type: Boolean, default: true },
    offlineActivation: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);
