const mongoose = require('mongoose');

const dormitorySchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['Boys', 'Girls', 'Co-ed'], required: true },
    address: { type: String },
    intake: { type: Number, default: 0 },
    description: { type: String },
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Dormitory', dormitorySchema);
};
