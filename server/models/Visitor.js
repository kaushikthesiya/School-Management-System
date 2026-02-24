const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    purpose: { type: String, required: true },
    phone: { type: String, required: true },
    visitorId: { type: String },
    noOfPerson: { type: Number, default: 1 },
    date: { type: Date, default: Date.now },
    inTime: { type: String },
    outTime: { type: String },
    file: { type: String }, // Path to ID proof or photo
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Visitor', visitorSchema);
};
