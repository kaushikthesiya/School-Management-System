const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const School = require('../models/School');
const { getTenantConnection } = require('../config/tenantConnection');

dotenv.config({ path: path.join(__dirname, '../.env') });

const cleanup = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to main database');

        const schools = await School.find({});
        console.log(`🔍 Found ${schools.length} schools`);

        for (const school of schools) {
            console.log(`\n🏢 Processing ${school.name} (${school.slug})...`);
            try {
                const connection = await getTenantConnection(school.slug);
                const collections = await connection.db.listCollections().toArray();
                const studentCollection = collections.find(c => c.name === 'students');

                if (studentCollection) {
                    console.log('  Found students collection');
                    const indexes = await connection.db.collection('students').indexes();
                    console.log('  Current indexes:', indexes.map(i => i.name).join(', '));

                    const toxicIndex = indexes.find(i => i.name === 'admissionNo_1' || i.key.admissionNo);
                    if (toxicIndex) {
                        console.log(`  🗑️ Dropping index: ${toxicIndex.name}`);
                        await connection.db.collection('students').dropIndex(toxicIndex.name);
                        console.log('  ✅ Index dropped');
                    } else {
                        console.log('  ✨ No problematic indexes found');
                    }
                } else {
                    console.log('  No students collection found');
                }
            } catch (err) {
                console.error(`  ❌ Error processing ${school.slug}:`, err.message);
            }
        }

        console.log('\n🏁 Cleanup complete');
        process.exit(0);
    } catch (error) {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    }
};

cleanup();
