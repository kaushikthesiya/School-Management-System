const mongoose = require('mongoose');

const gradeScaleSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    name: { type: String, required: true }, // e.g., 'Primary Grade System'
    grades: [{
        grade: { type: String, required: true }, // A, B, C...
        minPercentage: { type: Number, required: true },
        maxPercentage: { type: Number, required: true },
        points: { type: Number },
        remark: { type: String }
    }]
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('GradeScale', gradeScaleSchema);
};
