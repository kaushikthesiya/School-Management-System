const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get all roles for a school
// @route   GET /api/school/roles
router.get('/roles', protect, async (req, res) => {
    try {
        const { Role } = req.tenantModels;
        if (!req.user.school) {
            return res.status(400).json({ message: 'User is not associated with a school' });
        }
        const roles = await Role.find({ school: req.user.school });
        res.json(roles);
    } catch (error) {
        console.error('Get Roles Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Create/Update custom role
// @route   POST /api/school/rbac/roles
router.post('/roles', protect, authorize('schooladmin'), async (req, res) => {
    const { id, name, permissions, allowLogin } = req.body;
    try {
        const { Role } = req.tenantModels;
        if (!req.user.school) {
            return res.status(400).json({ message: 'User is not associated with a school' });
        }

        let role;
        if (id) {
            role = await Role.findOneAndUpdate(
                { _id: id, school: req.user.school },
                { name, permissions, allowLogin },
                { new: true }
            );
        } else {
            role = await Role.create({
                name,
                school: req.user.school,
                permissions: permissions || [],
                allowLogin: allowLogin !== undefined ? allowLogin : true
            });
        }
        res.json(role);
    } catch (error) {
        console.error('Create/Update Role Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Toggle role login permission
// @route   PATCH /api/school/rbac/roles/:id/login-toggle
router.patch('/roles/:id/login-toggle', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Role } = req.tenantModels;
        const role = await Role.findOne({ _id: req.params.id, school: req.user.school });
        if (!role) return res.status(404).json({ message: 'Role not found' });

        role.allowLogin = !role.allowLogin;
        await role.save();
        res.json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete custom role
// @route   DELETE /api/school/rbac/roles/:id
router.delete('/roles/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Role } = req.tenantModels;
        if (!req.user.school) {
            return res.status(400).json({ message: 'User is not associated with a school' });
        }

        const role = await Role.findOneAndDelete({ _id: req.params.id, school: req.user.school });

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error('Delete Role Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

module.exports = router;
