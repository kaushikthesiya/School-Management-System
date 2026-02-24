const mongoose = require('mongoose');

const studentCategorySchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    category: { type: String, required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('StudentCategory', studentCategorySchema);
};
