const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get academic structure for a school
// @route   GET /api/academic/structure
router.get('/structure', protect, async (req, res) => {
    try {
        const { AcademicStructure } = req.tenantModels;
        let structure = await AcademicStructure.findOne({ school: req.school._id });
        if (!structure) {
            structure = await AcademicStructure.create({
                school: req.school._id,
                mediums: ['English', 'Hindi', 'Gujarati', 'Marathi'],
                shifts: [
                    { name: 'Morning', startTime: '08:00', endTime: '12:00' },
                    { name: 'Afternoon', startTime: '12:00', endTime: '16:00' },
                    { name: 'Evening', startTime: '16:00', endTime: '20:00' }
                ],
                streams: ['Science', 'Commerce', 'Arts'],
                semesters: ['Semester 1', 'Semester 2', 'Semester 3']
            });
        }
        res.json(structure);
    } catch (error) {
        console.error('Get Structure Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Update academic structure
// @route   PATCH /api/academic/structure
router.patch('/structure', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { AcademicStructure } = req.tenantModels;
        const structure = await AcademicStructure.findOneAndUpdate(
            { school: req.school._id },
            req.body,
            { new: true, upsert: true }
        );
        res.json(structure);
    } catch (error) {
        console.error('Update Structure Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// --- SESSION ROUTES ---
router.get('/sessions', protect, async (req, res) => {
    try {
        const { Session } = req.tenantModels;
        const sessions = await Session.find({ school: req.school._id }).sort({ createdAt: -1 });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/sessions', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Session } = req.tenantModels;
        const session = await Session.create({ ...req.body, school: req.school._id });
        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.patch('/sessions/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Session } = req.tenantModels;
        const session = await Session.findOneAndUpdate(
            { _id: req.params.id, school: req.school._id },
            req.body,
            { new: true }
        );
        res.json(session);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/sessions/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Session } = req.tenantModels;
        await Session.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Session deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all classes for a school
// @route   GET /api/academic/classes
router.get('/classes', protect, async (req, res) => {
    try {
        const { Class, Student } = req.tenantModels;

        // Use aggregation to get classes and their student counts per section
        const classes = await Class.aggregate([
            { $match: { school: req.school._id } },
            {
                $lookup: {
                    from: 'students',
                    localField: '_id',
                    foreignField: 'class',
                    as: 'classStudents'
                }
            },
            {
                $project: {
                    name: 1,
                    sections: 1,
                    medium: 1,
                    stream: 1,
                    shift: 1,
                    totalStudentCount: { $size: '$classStudents' },
                    sectionCounts: {
                        $map: {
                            input: '$sections',
                            as: 'sec',
                            in: {
                                section: '$$sec',
                                count: {
                                    $size: {
                                        $filter: {
                                            input: '$classStudents',
                                            as: 'student',
                                            cond: { $eq: ['$$student.section', '$$sec'] }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    createdAt: 1
                }
            },
            { $sort: { createdAt: -1 } }
        ]);

        res.json(classes);
    } catch (error) {
        console.error('Get Classes Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Create a new class
// @route   POST /api/academic/classes
router.post('/classes', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Class } = req.tenantModels;
        const newClass = await Class.create({ ...req.body, school: req.school._id });
        res.status(201).json(newClass);
    } catch (error) {
        console.error('Create Class Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Update a class
// @route   PUT /api/academic/classes/:id
router.put('/classes/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Class } = req.tenantModels;
        const updatedClass = await Class.findOneAndUpdate(
            { _id: req.params.id, school: req.school._id },
            req.body,
            { new: true }
        );
        if (!updatedClass) return res.status(404).json({ message: 'Class not found' });
        res.json(updatedClass);
    } catch (error) {
        console.error('Update Class Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Delete a class
// @route   DELETE /api/academic/classes/:id
router.delete('/classes/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Class, Student } = req.tenantModels;

        // Check if class has students
        const studentCount = await Student.countDocuments({ class: req.params.id, school: req.school._id });
        if (studentCount > 0) {
            return res.status(400).json({ message: 'Cannot delete class with existing students' });
        }

        const deletedClass = await Class.findOneAndDelete({ _id: req.params.id, school: req.school._id });
        if (!deletedClass) return res.status(404).json({ message: 'Class not found' });
        res.json({ message: 'Class deleted successfully' });
    } catch (error) {
        console.error('Delete Class Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Get all subjects for a school
// @route   GET /api/academic/subjects
router.get('/subjects', protect, async (req, res) => {
    try {
        const { Subject } = req.tenantModels;
        const { classId } = req.query;
        let query = { school: req.school._id };
        if (classId) query.class = classId;

        const subjects = await Subject.find(query).populate('class');
        res.json(subjects);
    } catch (error) {
        console.error('Get Subjects Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a subject
// @route   POST /api/academic/subjects
router.post('/subjects', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Subject } = req.tenantModels;
        const subject = await Subject.create({ ...req.body, school: req.school._id });
        const populatedSubject = await Subject.findById(subject._id).populate('class');
        res.status(201).json(populatedSubject);
    } catch (error) {
        console.error('Create Subject Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Create a student group
// @route   POST /api/academic/student-groups
router.post('/student-groups', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { StudentGroup } = req.tenantModels;
        const studentGroup = await StudentGroup.create({ ...req.body, school: req.school._id });
        res.status(201).json(studentGroup);
    } catch (error) {
        console.error('Create Student Group Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Delete student group
// @route   DELETE /api/academic/student-groups/:id
router.delete('/student-groups/:id', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { StudentGroup } = req.tenantModels;
        await StudentGroup.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Student Group deleted' });
    } catch (error) {
        console.error('Delete Student Group Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Delete a subject
// @route   DELETE /api/academic/subjects/:id
router.delete('/subjects/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Subject } = req.tenantModels;
        await Subject.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Subject deleted' });
    } catch (error) {
        console.error('Delete Subject Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get dashboard stats
// @route   GET /api/academic/dashboard-stats
router.get('/dashboard-stats', protect, async (req, res) => {
    try {
        const { Student, Staff, FeeRecord, Attendance, Announcement } = req.tenantModels;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [students, staff, fees, attendanceCount, announcements] = await Promise.all([
            Student.countDocuments({ school: req.school._id }),
            Staff.countDocuments({ school: req.school._id }),
            FeeRecord.aggregate([
                { $match: { school: req.school._id } },
                { $group: { _id: null, total: { $sum: "$amountPaid" } } }
            ]),
            Attendance.countDocuments({
                school: req.school._id,
                date: { $gte: today },
                status: 'Present'
            }),
            Announcement.find({ school: req.school._id })
                .sort({ createdAt: -1 })
                .limit(5)
        ]);

        // Calculate attendance percentage for today
        const attendancePercentage = students > 0 ? (attendanceCount / students) * 100 : 0;

        res.json({
            students,
            staff,
            fees: fees[0]?.total || 0,
            attendance: Math.round(attendancePercentage) || 0,
            recentAnnouncements: announcements
        });
    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- SECTION ROUTES ---
router.get('/sections', protect, async (req, res) => {
    try {
        const { Section } = req.tenantModels;
        const sections = await Section.find({ school: req.school._id });
        res.json(sections);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/sections', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Section } = req.tenantModels;
        const section = await Section.create({ ...req.body, school: req.school._id });
        res.status(201).json(section);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/sections/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Section } = req.tenantModels;
        await Section.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Section deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- CLASSTEACHER ROUTES ---
router.get('/class-teachers', protect, async (req, res) => {
    try {
        const { ClassTeacher } = req.tenantModels;
        const assignments = await ClassTeacher.find({ school: req.school._id })
            .populate('class', 'name')
            .populate('teacher', 'name staffId');
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/class-teachers', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { ClassTeacher } = req.tenantModels;
        // In this implementation, we allow multiple teachers per class/section by creating multiple records
        // or we could update the existing one. The UI shows "Save Class Teacher", usually mapping one or multiple to a section.
        // For simplicity, let's allow creating a mapping.
        const assignment = await ClassTeacher.create({ ...req.body, school: req.school._id });
        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/class-teachers/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { ClassTeacher } = req.tenantModels;
        await ClassTeacher.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Assignment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- CLASSROOM ROUTES ---
router.get('/class-rooms', protect, async (req, res) => {
    try {
        const { ClassRoom } = req.tenantModels;
        const rooms = await ClassRoom.find({ school: req.school._id });
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/class-rooms', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { ClassRoom } = req.tenantModels;
        const room = await ClassRoom.create({ ...req.body, school: req.school._id });
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/class-rooms/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { ClassRoom } = req.tenantModels;
        await ClassRoom.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Room deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- SUBJECT ASSIGNMENT ROUTES ---
router.get('/subject-assignments', protect, async (req, res) => {
    try {
        const { SubjectAssignment } = req.tenantModels;
        const assignments = await SubjectAssignment.find({ school: req.school._id })
            .populate('class', 'name')
            .populate('subject', 'name code')
            .populate('teacher', 'name staffId');
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/subject-assignments', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { SubjectAssignment } = req.tenantModels;
        const assignment = await SubjectAssignment.create({ ...req.body, school: req.school._id });
        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/subject-assignments/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { SubjectAssignment } = req.tenantModels;
        await SubjectAssignment.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Assignment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- TIMETABLE / CLASS ROUTINE ROUTES ---
router.get('/routines', protect, async (req, res) => {
    try {
        const { Timetable } = req.tenantModels;
        const { classId, section } = req.query;
        let query = { school: req.school._id };
        if (classId) query.class = classId;
        if (section) query.section = section;

        const routines = await Timetable.find(query)
            .populate('class', 'name')
            .populate('periods.subject', 'name code')
            .populate('periods.teacher', 'name');
        res.json(routines);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/routines', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Timetable } = req.tenantModels;
        const { class: classId, section, day, periods } = req.body;

        // Upsert the routine for that specific day
        const routine = await Timetable.findOneAndUpdate(
            { school: req.school._id, class: classId, section, day },
            {
                school: req.school._id,
                class: classId,
                section,
                day,
                periods
            },
            { new: true, upsert: true }
        );
        res.status(201).json(routine);
    } catch (error) {
        console.error('Save Routine Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

router.delete('/routines/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Timetable } = req.tenantModels;
        await Timetable.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Routine deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- STUDENT GROUP ROUTES ---
router.get('/student-groups', protect, async (req, res) => {
    try {
        const { StudentGroup } = req.tenantModels;
        const groups = await StudentGroup.find({ school: req.school._id });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/student-groups', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { StudentGroup } = req.tenantModels;
        const group = await StudentGroup.create({ ...req.body, school: req.school._id });
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/student-groups/:id', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { StudentGroup } = req.tenantModels;
        await StudentGroup.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Student Group deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.patch('/student-groups/:id/students', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { StudentGroup } = req.tenantModels;
        const { studentIds } = req.body;
        const group = await StudentGroup.findOneAndUpdate(
            { _id: req.params.id, school: req.school._id },
            { $set: { students: studentIds } },
            { new: true }
        );
        res.json(group);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- STUDENT CATEGORY ROUTES ---
router.get('/student-categories', protect, async (req, res) => {
    try {
        const { StudentCategory } = req.tenantModels;
        const categories = await StudentCategory.find({ school: req.school._id });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/student-categories', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { StudentCategory } = req.tenantModels;
        const category = await StudentCategory.create({ ...req.body, school: req.school._id });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/student-categories/:id', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { StudentCategory } = req.tenantModels;
        await StudentCategory.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- SETTINGS ROUTES ---
router.patch('/settings/student-admission', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { AcademicStructure } = req.tenantModels;
        const structure = await AcademicStructure.findOneAndUpdate(
            { school: req.school._id },
            { $set: { studentAdmissionSettings: req.body } },
            { new: true, upsert: true }
        );
        res.json(structure);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/settings/student-admission', protect, async (req, res) => {
    try {
        const { AcademicStructure } = req.tenantModels;
        const structure = await AcademicStructure.findOne({ school: req.school._id });
        res.json(structure?.studentAdmissionSettings || {});
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- SMS SETTINGS ROUTES ---
router.get('/settings/sms', protect, async (req, res) => {
    try {
        const { SmsSettings } = req.tenantModels;
        const settings = await SmsSettings.find({ school: req.school._id }).sort({ createdAt: -1 });
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/settings/sms', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { SmsSettings } = req.tenantModels;
        const { id, startTime, status } = req.body;

        if (id) {
            const updated = await SmsSettings.findOneAndUpdate(
                { _id: id, school: req.school._id },
                { $set: { startTime, status } },
                { new: true }
            );
            return res.json(updated);
        }

        const newSetting = await SmsSettings.create({
            school: req.school._id,
            startTime,
            status
        });
        res.json(newSetting);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/settings/sms/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { SmsSettings } = req.tenantModels;
        await SmsSettings.findOneAndDelete({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
