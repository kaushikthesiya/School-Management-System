const mongoose = require('mongoose');
const User = require('./models/User');
const School = require('./models/School');
const TeacherEvaluationFn = require('./models/TeacherEvaluation');

async function debug() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Scolify_Admin');
        console.log('Connected to DB');

        const schools = await School.find();
        console.log(`Found ${schools.length} schools`);

        for (const school of schools) {
            console.log(`\n--- School: ${school.name} (${school.slug}) ---`);

            const students = await User.find({ role: 'student', school: school._id });
            const parents = await User.find({ role: 'parent', school: school._id });
            console.log(`Users - Students: ${students.length}, Parents: ${parents.length}`);

            const TeacherEvaluation = TeacherEvaluationFn(mongoose.connection);
            const evalCount = await TeacherEvaluation.countDocuments({ school: school._id });
            console.log(`Teacher Evaluations: ${evalCount}`);

            if (evalCount > 0) {
                const evaluations = await TeacherEvaluation.find({ school: school._id }).limit(5).populate('submittedBy');
                evaluations.forEach(e => {
                    console.log(`EvalID: ${e._id}, Status: ${e.status}, Role: ${e.submittedBy?.role || 'N/A'}, Submitter: ${e.submittedBy?.name || 'Unknown'}`);
                });
            }
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

debug();
