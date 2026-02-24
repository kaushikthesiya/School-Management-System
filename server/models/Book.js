const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    title: { type: String, required: true },
    author: { type: String },
    isbn: { type: String },
    category: { type: String },
    subject: { type: String },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
    availableQty: { type: Number, default: 1 },
    rackNumber: { type: String },
    description: { type: String },
    // Issue / Return tracking
    issuedTo: {
        memberId: { type: String },
        memberName: { type: String },
        memberType: { type: String, enum: ['Student', 'Staff'] }
    },
    issuedDate: { type: Date },
    dueDate: { type: Date }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Book', bookSchema);
};
