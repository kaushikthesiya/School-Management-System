const mongoose = require('mongoose');

const lessonPlanSettingSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    allowTeacherEditFinishedPlan: { type: Boolean, default: true },
    autoLockAfterDays: { type: Number, default: 7 },
    requiredFields: [{ type: String }] // e.g., ['note', 'document']
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('LessonPlanSetting', lessonPlanSettingSchema);
};
