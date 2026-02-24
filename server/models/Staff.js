const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    staffId: { type: String, required: true, unique: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    role: { type: String, required: true },
    department: { type: String },
    designation: { type: String },
    gender: { type: String },
    email: { type: String },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    dob: { type: Date },
    doj: { type: Date, default: Date.now },
    maritalStatus: { type: String },
    address: { type: String },
    permanentAddress: { type: String },
    qualifications: { type: String },
    experience: { type: String },
    epfNo: { type: String },
    salary: { type: String },
    contractType: { type: String },
    location: { type: String },
    bankDetails: {
        accountName: { type: String },
        accountNo: { type: String },
        bankName: { type: String },
        branchName: { type: String },
        ifsc: { type: String }
    },
    socialLinks: {
        facebook: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
        instagram: { type: String }
    },
    photo: { type: String },
    status: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('Staff', staffSchema);
};
