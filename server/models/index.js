const User = require('./User');
const School = require('./School');
const Plan = require('./Plan');

const tenantModelDefinitions = {
    AcademicStructure: require('./AcademicStructure'),
    Announcement: require('./Announcement'),
    Attendance: require('./Attendance'),
    Book: require('./Book'),
    LibraryCategory: require('./LibraryCategory'),
    LibrarySubject: require('./LibrarySubject'),
    LibraryMember: require('./LibraryMember'),
    TransportRoute: require('./TransportRoute'),
    Class: require('./Class'),
    Discipline: require('./Discipline'),
    Enquiry: require('./Enquiry'),
    Exam: require('./Exam'),
    ExamMark: require('./ExamMark'),
    FeePayment: require('./FeePayment'),
    FeeRecord: require('./FeeRecord'),
    FeeStructure: require('./FeeStructure'),
    GradeScale: require('./GradeScale'),
    Homework: require('./Homework'),
    Leave: require('./Leave'),
    Payslip: require('./Payslip'),
    Result: require('./Result'),
    Role: require('./Role'),
    Staff: require('./Staff'),
    Student: require('./Student'),
    Subject: require('./Subject'),
    Timetable: require('./Timetable'),
    Transaction: require('./Transaction'),
    Visitor: require('./Visitor'),
    Postal: require('./Postal'),
    CallLog: require('./CallLog'),
    Lesson: require('./Lesson'),
    Topic: require('./Topic'),
    Content: require('./Content'),
    ClassRoom: require('./ClassRoom'),
    SubjectAssignment: require('./SubjectAssignment'),
    ClassTeacher: require('./ClassTeacher'),
    Complaint: require('./Complaint'),
    AdminSetup: require('./AdminSetup'),
    IDCard: require('./IDCard'),
    Certificate: require('./Certificate'),
    Section: require('./Section'),
    Session: require('./Session'),
    LessonPlan: require('./LessonPlan'),
    LessonPlanSetting: require('./LessonPlanSetting'),
    Designation: require('./Designation'),
    Department: require('./Department'),
    OnlineAdmission: require('./OnlineAdmission'),
    TeacherEvaluation: require('./TeacherEvaluation'),
    StudentGroup: require('./StudentGroup'),
    FeeGroup: require('./FeeGroup'),
    FeeType: require('./FeeType'),
    StudentCategory: require('./StudentCategory'),
    LeaveType: require('./LeaveType'),
    StaffAttendance: require('./StaffAttendance'),
    Dormitory: require('./Dormitory'),
    DormitoryRoom: require('./DormitoryRoom'),
    RoomType: require('./RoomType'),
    Vehicle: require('./Vehicle'),
    SmsSettings: require('./SmsSettings'),
    MultiClassStudent: require('./MultiClassStudent')
};

/**
 * Binds all tenant-specific schemas to a dynamic connection
 * @param {mongoose.Connection} connection 
 * @returns {Object} Object containing all bound models
 */
const getTenantModels = (connection) => {
    const boundModels = {};
    for (const [name, modelFn] of Object.entries(tenantModelDefinitions)) {
        boundModels[name] = modelFn(connection);
    }
    return boundModels;
};

module.exports = {
    User,
    School,
    Plan,
    getTenantModels
};
