const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const School = require('../models/School');
const User = require('../models/User');
const { getTenantConnection } = require('../config/tenantConnection');

dotenv.config({ path: path.join(__dirname, '../.env') });

const fixMissingUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to main database');

        const schools = await School.find({});
        console.log(`🔍 Found ${schools.length} schools`);

        for (const school of schools) {
            console.log(`\n🏢 Processing ${school.name} (${school.slug})...`);
            try {
                const connection = await getTenantConnection(school.slug);
                const Student = (require('../models/Student'))(connection);

                const students = await Student.find({ school: school._id });
                console.log(`  Found ${students.length} students`);

                for (const student of students) {
                    console.log(`    Checking student: ${student.firstName} ${student.lastName} (${student.admissionNumber})`);

                    // 1. Student User
                    if (student.email) {
                        const existingStudentUser = await User.findOne({ email: student.email });
                        if (!existingStudentUser) {
                            console.log(`      🆕 Creating Student User: ${student.email}`);
                            await User.create({
                                name: `${student.firstName} ${student.lastName}`,
                                email: student.email,
                                password: 'Student@' + (student.phone ? student.phone.slice(-4) : '1234'),
                                role: 'student',
                                school: school._id
                            });
                        }
                    }

                    // 2. Parent User
                    if (student.guardianEmail) {
                        const existingParentUser = await User.findOne({ email: student.guardianEmail });
                        if (!existingParentUser) {
                            console.log(`      🆕 Creating Parent User: ${student.guardianEmail}`);
                            await User.create({
                                name: student.guardianName || student.fatherName || 'Parent',
                                email: student.guardianEmail,
                                password: 'Parent@' + (student.guardianPhone ? student.guardianPhone.slice(-4) : '1234'),
                                role: 'parent',
                                school: school._id
                            });
                        }
                    }
                }
            } catch (err) {
                console.error(`  ❌ Error processing ${school.slug}:`, err.message);
            }
        }

        console.log('\n🏁 Fix complete');
        process.exit(0);
    } catch (error) {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    }
};

fixMissingUsers();
