const School = require('../models/School');
const { getTenantConnection } = require('../config/tenantConnection');
const { getTenantModels } = require('../models/index');

const tenantIdentification = async (req, res, next) => {
    const schoolSlug = req.headers['x-school-slug'] || req.query.school;

    if (!schoolSlug) {
        // If the request is for a school-specific route, we MUST have a slug
        if (req.originalUrl.startsWith('/api/school')) {
            return res.status(400).json({
                message: 'Active school context required. Please provide x-school-slug header or school query parameter.'
            });
        }

        // Log skip if in dev for other routes
        if (process.env.NODE_ENV === 'development') {
            console.log('ℹ️ No school slug provided, skipping tenant identification');
        }
        return next();
    }

    try {
        const school = await School.findOne({ slug: schoolSlug, isActive: true });
        if (!school) {
            console.warn(`⚠️ Multi-tenancy: School NOT FOUND for slug [${schoolSlug}]`);
            return res.status(404).json({
                message: 'School not found or inactive',
                slug: schoolSlug
            });
        }

        req.school = school;

        // 🚀 Dynamic Multi-DB Connection
        const tenantConnection = await getTenantConnection(schoolSlug);
        req.tenantDb = tenantConnection;

        // 🧪 Bind models to this specific connection
        req.tenantModels = getTenantModels(tenantConnection);

        if (process.env.NODE_ENV === 'development') {
            console.log(`🏢 Tenant context & DB set: ${school.name} (${schoolSlug})`);
        }
        next();
    } catch (error) {
        console.error('❌ Tenant Identification Error:', error);
        res.status(500).json({ message: 'Server error in multi-tenancy identification' });
    }
};

module.exports = tenantIdentification;
