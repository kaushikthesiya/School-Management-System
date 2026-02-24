const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    name: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('RoomType', roomTypeSchema);
};
