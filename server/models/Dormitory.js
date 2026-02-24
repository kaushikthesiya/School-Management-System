const mongoose = require('mongoose');

const dormitorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Boys', 'Girls', 'Co-ed'],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    intake: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Dormitory', dormitorySchema);
