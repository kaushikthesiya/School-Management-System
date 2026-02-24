const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // Academic Information
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    section: { type: String, required: true },
    admissionNumber: { type: String, required: true, unique: true },
    admissionDate: { type: Date, default: Date.now },
    roll: { type: String },
    group: { type: String },

    // Personal Info
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dob: { type: Date, required: true },
    religion: { type: String },
    caste: { type: String },
    photo: { type: String },

    // Contact Information
    email: { type: String },
    phone: { type: String, required: true },

    // Address Info
    currentAddress: { type: String },
    permanentAddress: { type: String },

    // Medical Record
    bloodGroup: { type: String },
    height: { type: String },
    weight: { type: String },
    category: { type: String }, // General, OBC, etc.

    // Parents Info
    fatherName: { type: String },
    fatherOccupation: { type: String },
    fatherPhone: { type: String },
    fatherPhoto: { type: String },
    motherName: { type: String },
    motherOccupation: { type: String },
    motherPhone: { type: String },
    motherPhoto: { type: String },

    // Guardian Info
    guardianRelation: { type: String }, // Father, Mother, Others
    guardianName: { type: String },
    relationWithGuardian: { type: String },
    guardianEmail: { type: String },
    guardianPhone: { type: String },
    guardianOccupation: { type: String },
    guardianAddress: { type: String },
    guardianPhoto: { type: String },

    // Document Info
    nationalId: { type: String },
    birthCert: { type: String },
    additionalNotes: { type: String },

    // Bank Information
    bankName: { type: String },
    bankAccount: { type: String },
    ifsc: { type: String },

    // Document Attachments (Links/Paths)
    doc01Title: { type: String },
    doc01Url: { type: String },
    doc02Title: { type: String },
    doc02Url: { type: String },
    doc03Title: { type: String },
    doc03Url: { type: String },
    doc04Title: { type: String },
    doc04Url: { type: String },

    // Previous School
    previousSchoolDetails: { type: String },

    // Other Info
    route: { type: String },
    vehicle: { type: String },
    dormitory: { type: String },
    room: { type: String },

    // Custom Fields
    panNo: { type: String },

    // System Fields
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    isActive: { type: Boolean, default: true },
    smsAlerts: { type: Boolean, default: true },
    allowLogin: { type: Boolean, default: true },
    documents: [{
        name: { type: String },
        url: { type: String }
    }]
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Student', studentSchema);
};
