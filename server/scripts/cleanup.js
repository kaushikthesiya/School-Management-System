const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { getTenantConnection } = require('../config/tenantConnection');
const { getTenantModels } = require('../models/index');
const { School } = require('../models/index');

async function cleanup() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to Main DB');

        const schools = await School.find();
        console.log(`Found ${schools.length} schools to clean up.`);

        for (const school of schools) {
            console.log(`\n--- Cleaning Up School: ${school.name} (Slug: ${school.slug}) ---`);
            const tenantDb = await getTenantConnection(school.slug);
            const models = getTenantModels(tenantDb);

            // List of models to clear (everything except Role - we might want to keep base roles)
            // Or if roles are also demo, clear them too.
            // Let's clear everything including Roles, but maybe keep 'schooladmin' if it's there?
            // Usually, clean start means everything.

            const modelsToClear = Object.keys(models);

            for (const modelName of modelsToClear) {
                try {
                    const result = await models[modelName].deleteMany({});
                    console.log(`Cleared ${modelName}: deleted ${result.deletedCount} items.`);
                } catch (err) {
                    console.error(`Error clearing ${modelName}:`, err.message);
                }
            }
        }

        console.log('\nCleanup complete and database is now fresh.');
        process.exit(0);
    } catch (err) {
        console.error('Cleanup failed:', err);
        process.exit(1);
    }
}

cleanup();
