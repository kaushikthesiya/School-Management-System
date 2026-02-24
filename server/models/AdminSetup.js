const mongoose = require('mongoose');

const adminSetupSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Purpose', 'Complaint Type', 'Source', 'Reference']
    },
    name: { type: String, required: true },
    description: { type: String },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('AdminSetup', adminSetupSchema);
};
