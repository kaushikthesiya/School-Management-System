const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Scolify_Admin';

async function debugAcademicData() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to Scolify_Admin');

        const School = mongoose.model('School', new mongoose.Schema({ slug: String, name: String }));
        const school = await School.findOne({ slug: 'aspire-intl' });

        if (!school) {
            console.log('School aspire-intl not found');
            process.exit(1);
        }

        console.log(`Found school: ${school.name} (${school._id})`);

        const tenantConn = mongoose.createConnection(`mongodb://127.0.0.1:27017/school_aspire_intl`);
        await tenantConn.asPromise();
        console.log('Connected to school_aspire_intl');

        const Class = tenantConn.model('Class', new mongoose.Schema({ name: String, school: mongoose.Schema.Types.ObjectId }));
        const Section = tenantConn.model('Section', new mongoose.Schema({ name: String, school: mongoose.Schema.Types.ObjectId }));
        const Subject = tenantConn.model('Subject', new mongoose.Schema({ name: String, school: mongoose.Schema.Types.ObjectId }));
        const Staff = tenantConn.model('Staff', new mongoose.Schema({ name: String, role: String, school: mongoose.Schema.Types.ObjectId }));

        const classes = await Class.find({ school: school._id });
        const sections = await Section.find({ school: school._id });
        const subjects = await Subject.find({ school: school._id });
        const teachers = await Staff.find({ school: school._id, role: 'teacher' });

        console.log('--- Academic Data Summary ---');
        console.log('Classes:', classes.length);
        classes.forEach(c => console.log(` - ${c.name}`));

        console.log('Sections:', sections.length);
        sections.forEach(s => console.log(` - ${s.name}`));

        console.log('Subjects:', subjects.length);
        subjects.forEach(s => console.log(` - ${s.name}`));

        console.log('Teachers:', teachers.length);
        teachers.forEach(t => console.log(` - ${t.name}`));

        await mongoose.connection.close();
        await tenantConn.close();
    } catch (err) {
        console.error(err);
    }
}

debugAcademicData();
