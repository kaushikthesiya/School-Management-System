const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    title: { type: String, required: true },
    author: { type: String },
    isbn: { type: String },
    category: { type: String },
    price: { type: Number },
    quantity: { type: Number, default: 1 },
    rackNumber: { type: String },
    description: { type: String }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Book', bookSchema);
};
