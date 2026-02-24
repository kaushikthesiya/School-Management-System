const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    description: { type: String },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    source: { type: String }, // e.g., Website, Walk-in, Referral
    reference: { type: String },
    noOfChild: { type: Number },
    status: { type: String, enum: ['Open', 'Following Up', 'Admitted', 'Closed'], default: 'Open' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedName: { type: String },
    lastFollowUpDate: { type: Date },
    nextFollowUp: { type: Date },
    notes: { type: String },
    followUpHistory: [{
        date: { type: Date, default: Date.now },
        note: { type: String },
        status: { type: String },
        nextFollowUp: { type: Date }
    }]
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Enquiry', enquirySchema);
};
