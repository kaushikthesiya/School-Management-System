const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get staff list with payroll status for a specific month/year
// @route   GET /api/payroll
router.get('/', protect, authorize('schooladmin'), async (req, res) => {
    const { month, year, role } = req.query;
    if (!month || !year) {
        return res.status(400).json({ message: 'month and year query params are required' });
    }
    try {
        const { Staff, Payslip } = req.tenantModels;

        const staffQuery = { school: req.school._id };
        if (role) staffQuery.role = role;
        const allStaff = await Staff.find(staffQuery);

        const payslips = await Payslip.find({
            school: req.school._id,
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
                    salary: staff.salary || 0
                },
                status: payslip ? payslip.status : 'Not Generated',
                payslipId: payslip ? payslip._id : null,
                payslip: payslip || null
            };
        });

        res.json(result);
    } catch (error) {
        console.error('Get Payroll List Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Generate payroll for a staff member (upsert)
// @route   POST /api/payroll/generate
router.post('/generate', protect, authorize('schooladmin'), async (req, res) => {
    const { staffId, month, year, basicSalary, allowances, deductions, note } = req.body;
    if (!staffId || !month || !year) {
        return res.status(400).json({ message: 'staffId, month and year are required' });
    }
    try {
        const { Payslip } = req.tenantModels;

        const netSalary = parseFloat(basicSalary || 0) + parseFloat(allowances || 0) - parseFloat(deductions || 0);

        // Upsert — update if exists, create if not
        const payslip = await Payslip.findOneAndUpdate(
            { school: req.school._id, staff: staffId, month: parseInt(month), year: parseInt(year) },
            {
                $set: {
                    basicSalary: parseFloat(basicSalary || 0),
                    allowances: parseFloat(allowances || 0),
                    deductions: parseFloat(deductions || 0),
                    netSalary,
                    note: note || '',
                    status: 'Generated',
                    school: req.school._id,
                    staff: staffId,
                    month: parseInt(month),
                    year: parseInt(year)
                }
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({ message: 'Payroll generated successfully', payslip });
    } catch (error) {
        console.error('Generate Payroll Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Mark payslip as Paid
// @route   PATCH /api/payroll/:id/mark-paid
router.patch('/:id/mark-paid', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Payslip } = req.tenantModels;
        const payslip = await Payslip.findByIdAndUpdate(
            req.params.id,
            { $set: { status: 'Paid', paymentDate: new Date() } },
            { new: true }
        );
        if (!payslip) return res.status(404).json({ message: 'Payslip not found' });
        res.json({ message: 'Marked as paid', payslip });
    } catch (error) {
        console.error('Mark Paid Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get single payslip detail
// @route   GET /api/payroll/:id
router.get('/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Payslip, Staff } = req.tenantModels;
        const payslip = await Payslip.findById(req.params.id).populate('staff', 'name staffId role department designation contactNo salary photo');
        if (!payslip) return res.status(404).json({ message: 'Payslip not found' });
        res.json(payslip);
    } catch (error) {
        console.error('Get Payslip Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete payslip
// @route   DELETE /api/payroll/:id
router.delete('/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Payslip } = req.tenantModels;
        await Payslip.findByIdAndDelete(req.params.id);
        res.json({ message: 'Payslip deleted' });
    } catch (error) {
        console.error('Delete Payslip Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
