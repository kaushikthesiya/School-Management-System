const express = require('express');
const router = express.Router();
const School = require('../models/School');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Create a new school
// @route   POST /api/superadmin/schools
// @access  Private/SuperAdmin
router.post('/schools', protect, authorize('superadmin'), async (req, res) => {
    const { name, slug, contactEmail } = req.body;

    try {
        const schoolExists = await School.findOne({ slug });
        if (schoolExists) {
            return res.status(400).json({ message: 'School with this slug already exists' });
        }

        const school = await School.create({ name, slug, contactEmail, subscriptionStatus: 'active' });

        res.status(201).json(school);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all schools with admin status
// @route   GET /api/superadmin/schools
// @access  Private/SuperAdmin
router.get('/schools', protect, authorize('superadmin'), async (req, res) => {
    try {
        const schools = await School.find({}).sort({ createdAt: -1 });
        const schoolAdmins = await User.find({ role: 'schooladmin' }).select('school');

        const schoolsWithStatus = schools.map(school => {
            const hasAdmin = schoolAdmins.some(admin =>
                admin.school && admin.school.toString() === school._id.toString()
            );
            return { ...school.toObject(), hasAdmin };
        });

        res.json(schoolsWithStatus);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update school status (Enable/Disable/Offline Activate)
// @route   PATCH /api/superadmin/schools/:id
// @access  Private/SuperAdmin
router.patch('/schools/:id', protect, authorize('superadmin'), async (req, res) => {
    try {
        const school = await School.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(school);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Provision School Admin for an existing school
// @route   POST /api/superadmin/schools/:id/create-admin
// @access  Private/SuperAdmin
router.post('/schools/:id/create-admin', protect, authorize('superadmin'), async (req, res) => {
    const { name, password } = req.body;
    try {
        const school = await School.findById(req.params.id);
        if (!school) return res.status(404).json({ message: 'School not found' });

        // Check if Admin already exists for this school
        const existingAdmin = await User.findOne({ school: school._id, role: 'schooladmin' });
        if (existingAdmin) {
            return res.status(400).json({ message: 'School Admin already created for this school' });
        }

        // Strict Email Policy: Use School Contact Email
        const email = school.contactEmail;

        // Double check if email is taken globally (though likely checked above)
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: `User with email ${email} already exists` });
        }

        const user = await User.create({
            name: name || `${school.name} Admin`,
            email,
            password,
            role: 'schooladmin',
            school: school._id
        });

        res.status(201).json({
            message: 'School Admin created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Create School Admin Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get Super Admin Dashboard Stats
// @route   GET /api/superadmin/dashboard-stats
// @access  Private/SuperAdmin
router.get('/dashboard-stats', protect, authorize('superadmin'), async (req, res) => {
    try {
        const totalSchools = await School.countDocuments();
        const activeSubscriptions = await School.countDocuments({ subscriptionStatus: 'active' });

        // Logic for revenue (Example: Summing prices of plans for active schools)
        // For now, returning counts. You can expand this as needed.
        res.json({
            totalSchools,
            activeSubscriptions,
            monthlyRevenue: totalSchools * 1000 // Placeholder logic for revenue
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
