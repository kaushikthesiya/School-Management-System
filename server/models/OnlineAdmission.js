const mongoose = require('mongoose');

const onlineAdmissionSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },

    // Step 1: Academic Details
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    section: { type: String }, // Optional, sometimes assigned by admin later

    // Step 2: Student Details
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    email: { type: String },
    phoneNumber: { type: String, required: true },
    age: { type: Number },
    bloodGroup: { type: String },
    religion: { type: String },
    caste: { type: String },
    idNumber: { type: String },
    category: { type: String },
    group: { type: String },
    height: { type: String },
    weight: { type: String },
    photo: { type: String },

    // Step 3: Guardian Details
    fatherName: { type: String },
    fatherOccupation: { type: String },
    fatherPhone: { type: String },
    fatherPhoto: { type: String },
    motherName: { type: String },
    motherOccupation: { type: String },
    motherPhone: { type: String },
    motherPhoto: { type: String },

    relation: { type: String, required: true }, // Father, Mother, Others
    guardianName: { type: String, required: true },
    guardianEmail: { type: String }, // Required in reference image but maybe optional?
    guardianPhone: { type: String, required: true },
    guardianOccupation: { type: String },
    guardianPhoto: { type: String },
    guardianAddress: { type: String },
    currentAddress: { type: String },
    permanentAddress: { type: String },

    // Step 4: Miscellaneous Details
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'TransportRoute' },
    vehicle: { type: String },
    dormitoryName: { type: String },
    roomNumber: { type: String },
    nationalId: { type: String },
    localId: { type: String },
    bankAccount: { type: String },
    bankName: { type: String },
    ifscCode: { type: String },
    previousSchool: { type: String },
    additionalNotes: { type: String },
    howDoYouKnowUs: { type: String },

    documents: [{
        name: { type: String },
        url: { type: String }
    }],

    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },

    rejectionReason: { type: String }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('OnlineAdmission', onlineAdmissionSchema);
};
