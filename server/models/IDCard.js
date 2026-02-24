const mongoose = require('mongoose');

const idCardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    adminLayout: { type: String, enum: ['Horizontal', 'Vertical'], default: 'Horizontal' },
    backgroundImage: { type: String },
    applicability: { type: String, enum: ['Student', 'Staff', 'Guardian'], default: 'Student' },
    role: [{ type: String }], // Array of staff roles if applicable
    pageLayoutWidth: { type: String, default: '87' },
    pageLayoutHeight: { type: String, default: '55' },
    schoolLogo: { type: String },
    userPhotoStyle: { type: String, enum: ['Square', 'Rounded', 'Circle'], default: 'Square' },
    userPhotoSizeWidth: { type: String, default: '21' },
    userPhotoSizeHeight: { type: String, default: '21' },
    layoutSpacingTop: { type: String, default: '28' },
    layoutSpacingBottom: { type: String, default: '2.5' },
    layoutSpacingLeft: { type: String, default: '3' },
    layoutSpacingRight: { type: String, default: '3' },
    signature: { type: String },

    // Visibility Toggles
    showAdmissionNo: { type: Boolean, default: true },
    showID: { type: Boolean, default: true },
    showName: { type: Boolean, default: true },
    showClass: { type: Boolean, default: true },
    showAddress: { type: Boolean, default: true },
    showPhone: { type: Boolean, default: true },
    showPhoto: { type: Boolean, default: true },
    showDepartment: { type: Boolean, default: true },
    showDesignation: { type: Boolean, default: true },
    showBloodGroup: { type: Boolean, default: true },
    showFatherName: { type: Boolean, default: true },
    showMotherName: { type: Boolean, default: true },
    showDob: { type: Boolean, default: true },
    showRollNo: { type: Boolean, default: true },
    showSignature: { type: Boolean, default: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('IDCard', idCardSchema);
};
