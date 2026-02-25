const mongoose = require('mongoose');

const inventoryTransactionSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    transactionType: {
        type: String,
        enum: ['Receive', 'Sell', 'Issue'],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemStore'
    },
    issuedTo: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'issuedToModel'
    },
    issuedToModel: {
        type: String,
        enum: ['Staff', 'Student']
    },
    referenceNo: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    transactionHead: {
        type: String,
        trim: true
    },
    paymentMethod: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        trim: true
    },
    buyerName: {
        type: String,
        trim: true
    },
    note: {
        type: String,
        trim: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('InventoryTransaction', inventoryTransactionSchema);
};
