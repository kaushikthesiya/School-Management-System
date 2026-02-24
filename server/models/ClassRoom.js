const mongoose = require('mongoose');

const classRoomSchema = new mongoose.Schema({
    roomNo: { type: String, required: true },
    capacity: { type: Number },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('ClassRoom', classRoomSchema);
};
