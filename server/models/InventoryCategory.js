const mongoose = require('mongoose');

const inventoryCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
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
    return connection.model('InventoryCategory', inventoryCategorySchema);
};
