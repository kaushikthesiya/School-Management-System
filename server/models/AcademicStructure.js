const mongoose = require('mongoose');

const academicStructureSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    mediums: [{ type: String }], // e.g., ['English', 'Hindi', 'Gujarati']
    shifts: [{
        name: { type: String }, // e.g., Morning
        startTime: { type: String },
        endTime: { type: String }
    }],
    streams: [{ type: String }], // e.g., ['Science', 'Commerce', 'Arts']
    semesters: [{ type: String }], // e.g., ['Semester 1', 'Semester 2']
    departments: [{ type: String }] // e.g., ['Primary', 'Secondary', 'Admin']
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('AcademicStructure', academicStructureSchema);
};
