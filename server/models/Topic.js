const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    topicName: { type: String, required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Topic', topicSchema);
};
