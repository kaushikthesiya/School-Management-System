const mongoose = require('mongoose');

const lessonPlanSchema = new mongoose.Schema({
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    section: { type: String, required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
    date: { type: Date, required: true },
    subTopic: { type: String },
    lectureYoutubeLink: { type: String },
    lectureVideo: { type: String },
    document: { type: String },
    note: { type: String },
    isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = (connection) => {
    return connection.model('LessonPlan', lessonPlanSchema);
};
