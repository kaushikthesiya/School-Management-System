const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    headerLeft: { type: String },
    date: { type: Date, default: Date.now },
    body: { type: String },
    bodyFont: { type: String, default: 'Inter' },
    fontSize: { type: String, default: '14px' },
    footerLeft: { type: String },
    footerCenter: { type: String },
    footerRight: { type: String },
    pageLayout: { type: String, enum: ['Portrait', 'Landscape'], default: 'Portrait' },
    height: { type: Number },
    width: { type: Number },
    studentPhoto: { type: Boolean, default: true },
    backgroundImage: { type: String },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Certificate', certificateSchema);
};
