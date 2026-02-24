const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get staff list with payroll status for a specific month/year
// @route   GET /api/payroll
router.get('/', protect, authorize('schooladmin'), async (req, res) => {
    const { month, year, role } = req.query;
    try {
        const { Staff, Payslip } = req.tenantModels;

        const staffQuery = { school: req.user.school };
        if (role) staffQuery.role = role;
        const allStaff = await Staff.find(staffQuery);

        const payslips = await Payslip.find({
            school: req.user.school,
            month: parseInt(month),
            year: parseInt(year)
        });

        const result = allStaff.map(staff => {
            const payslip = payslips.find(p => p.staff.toString() === staff._id.toString());
            return {
                staff: {
                    _id: staff._id,
                    name: staff.name,
                    staffId: staff.staffId,
                    role: staff.role,
                    department: staff.department,
                    designation: staff.designation,
                    contactNo: staff.contactNo,
                    salary: staff.salary
                },
                status: payslip ? payslip.status : 'Not Generated',
                payslipId: payslip ? payslip._id : null
            };
        });

        res.json(result);
    } catch (error) {
        console.error('Get Payroll List Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Generate payroll for a staff member
// @route   POST /api/payroll/generate
router.post('/generate', protect, authorize('schooladmin'), async (req, res) => {
    const { staffId, month, year, basicSalary, allowances, deductions } = req.body;
    try {
        const { Payslip } = req.tenantModels;

        // Remove existing if any
        await Payslip.deleteMany({
            school: req.user.school,
            staff: staffId,
            month,
            year
        });

        const netSalary = parseFloat(basicSalary) + parseFloat(allowances || 0) - parseFloat(deductions || 0);

        const payslip = new Payslip({
            staff: staffId,
            school: req.user.school,
            month,
            year,
            basicSalary,
            allowances: allowances || 0,
            deductions: deductions || 0,
            netSalary,
            status: 'Generated'
        });

        await payslip.save();
        res.status(201).json(payslip);
    } catch (error) {
        console.error('Generate Payroll Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
