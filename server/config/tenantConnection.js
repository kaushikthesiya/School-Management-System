const mongoose = require('mongoose');

const connectionPool = {};

/**
 * Get or create a specific database connection for a school
 * @param {string} schoolSlug - The unique identifier for the school
 * @returns {mongoose.Connection}
 */
const getTenantConnection = async (schoolSlug) => {
    if (connectionPool[schoolSlug]) {
        return connectionPool[schoolSlug];
    }

    const baseUri = process.env.MONGODB_URI;
    // Extract the base part of the URI to replace the database name
    // Assuming URI format: mongodb+srv://user:pass@cluster.mongodb.net/dbname?options
    // We want to create dynamic database names based on the school slug

    let tenantUri;
    if (baseUri.includes('?')) {
        const [url, query] = baseUri.split('?');
        const urlParts = url.split('/');
        urlParts[urlParts.length - 1] = `school_${schoolSlug.replace(/-/g, '_')}`;
        tenantUri = `${urlParts.join('/')}?${query}`;
    } else {
        const urlParts = baseUri.split('/');
        urlParts[urlParts.length - 1] = `school_${schoolSlug.replace(/-/g, '_')}`;
        tenantUri = urlParts.join('/');
    }

    try {
        const connection = await mongoose.createConnection(tenantUri).asPromise();
        console.log(`📡 New DB Connection established for tenant: [${schoolSlug}]`);

        connectionPool[schoolSlug] = connection;

        // Handle connection events
        connection.on('error', (err) => {
            console.error(`❌ DB error for tenant [${schoolSlug}]:`, err);
            delete connectionPool[schoolSlug];
        });

        connection.on('disconnected', () => {
            console.warn(`🔌 DB disconnected for tenant [${schoolSlug}]`);
            delete connectionPool[schoolSlug];
        });

        return connection;
    } catch (error) {
        console.error(`❌ Failed to connect to database for tenant [${schoolSlug}]:`, error);
        throw error;
    }
};

module.exports = { getTenantConnection };
