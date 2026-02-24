const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., '10'
    sections: [{ type: String, required: true }], // e.g., ['A', 'B']
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    medium: { type: String },
    stream: { type: String },
    shift: { type: String }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Class', classSchema);
};
