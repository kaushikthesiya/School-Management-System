const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const School = require('../models/School');
const { getTenantConnection } = require('../config/tenantConnection');

dotenv.config({ path: path.join(__dirname, '../.env') });

const checkStudent = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const school = await School.findOne({ slug: 'aspire-intl' });
        if (!school) {
            console.log('❌ School not found');
            process.exit(1);
        }

        const connection = await getTenantConnection('aspire-intl');
        const Student = (require('../models/Student'))(connection);

        const student = await Student.findOne({ firstName: 'Kaushik' });
        if (student) {
            console.log('🎓 Student Found:');
            console.log(JSON.stringify({
                firstName: student.firstName,
                lastName: student.lastName,
                admissionNumber: student.admissionNumber,
                email: student.email,
                guardianEmail: student.guardianEmail,
                school: student.school,
                createdAt: student.createdAt
            }, null, 2));
        } else {
            console.log('❌ Student NOT Found (Kaushik)');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

checkStudent();
