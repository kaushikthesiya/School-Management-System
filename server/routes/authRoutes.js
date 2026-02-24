const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password, role, school } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            school
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).populate('school', 'slug name');

        if (user && (await user.comparePassword(password))) {
            let permissions = [];

            // If it's not a superadmin, fetch tenant-specific role permissions
            if (user.role !== 'superadmin' && user.school?.slug) {
                try {
                    const { getTenantConnection } = require('../config/tenantConnection');
                    const { getTenantModels } = require('../models/index');

                    const tenantDb = await getTenantConnection(user.school.slug);
                    const { Role } = getTenantModels(tenantDb);

                    // Match role name (ignoring case usually better, but names are fixed in system)
                    // We search for role name that matches user.role
                    // Roles in DB might be "Student" while user.role is "student"
                    const roleDoc = await Role.findOne({
                        name: { $regex: new RegExp(`^${user.role}$`, 'i') },
                        school: user.school._id
                    });

                    if (roleDoc) {
                        permissions = roleDoc.permissions;
                    }
                } catch (tenantErr) {
                    console.error('Error fetching tenant permissions during login:', tenantErr);
                    // Continue even if permissions fail, fallback to empty
                }
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                permissions,
                school_slug: user.school?.slug,
                school_name: user.school?.name,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const { protect } = require('../middleware/authMiddleware');

router.put('/profile', protect, async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;

            // Check if email is already taken by another user
            if (email && email !== user.email) {
                const emailExists = await User.findOne({ email });
                if (emailExists) {
                    return res.status(400).json({ message: 'Email already in use' });
                }
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                school: updatedUser.school
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/change-password', protect, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (user && (await user.comparePassword(currentPassword))) {
            user.password = newPassword;
            await user.save();
            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(401).json({ message: 'Invalid current password' });
        }
    } catch (error) {
        console.error('Change Password Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
