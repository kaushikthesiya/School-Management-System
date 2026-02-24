const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { razorpay } = require('../config/razorpay');

// @desc    Get all fee structures
// @route   GET /api/fees/structures
router.get('/structures', protect, async (req, res) => {
    try {
        const { FeeStructure } = req.tenantModels;
        const structures = await FeeStructure.find({ school: req.school._id });
        res.json(structures);
    } catch (error) {
        console.error('Get Fee Structures Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create fee structure
// @route   POST /api/fees/structures
router.post('/structures', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { FeeStructure } = req.tenantModels;
        const structure = await FeeStructure.create({ ...req.body, school: req.school._id });
        res.status(201).json(structure);
    } catch (error) {
        console.error('Create Fee Structure Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Collect fee (Manual)
// @route   POST /api/fees/collect
router.post('/collect', protect, authorize('schooladmin', 'accountant'), async (req, res) => {
    try {
        const { FeeRecord } = req.tenantModels;
        const record = await FeeRecord.create({
            ...req.body,
            school: req.school._id,
            collectedBy: req.user._id
        });
        res.status(201).json(record);
    } catch (error) {
        console.error('Collect Fee Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get fee records (with filters)
// @route   GET /api/fees/records
router.get('/records', protect, async (req, res) => {
    const { studentId, classId, status } = req.query;
    try {
        const { FeeRecord } = req.tenantModels;
        let query = { school: req.school._id };
        if (studentId) query.student = studentId;
        if (classId) query.class = classId;
        if (status) query.status = status;

        const records = await FeeRecord.find(query)
            .populate('student', 'firstName lastName admissionNumber')
            .populate('class', 'name')
            .populate('feeStructure', 'name amount')
            .sort({ paymentDate: -1 });
        res.json(records);
    } catch (error) {
        console.error('Get Fee Records Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create Razorpay Order for Student Fees
// @route   POST /api/fees/pay
router.post('/pay', protect, async (req, res) => {
    const { feeId, amount } = req.body;
    try {
        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: `fee_${Date.now()}`,
            notes: {
                school_id: req.school._id.toString(),
                student_id: req.user._id.toString(),
                fee_id: feeId
            }
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Razorpay Order Error:', error);
        res.status(500).json({ message: 'Razorpay Order Error' });
    }
});

// --- FEE GROUP ROUTES ---
router.get('/groups', protect, async (req, res) => {
    try {
        const { FeeGroup } = req.tenantModels;
        const groups = await FeeGroup.find({ school: req.school._id });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/groups', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { FeeGroup } = req.tenantModels;
        const group = await FeeGroup.create({ ...req.body, school: req.school._id });
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/groups/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { FeeGroup } = req.tenantModels;
        await FeeGroup.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Fee Group deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- FEE TYPE ROUTES ---
router.get('/types', protect, async (req, res) => {
    try {
        const { FeeType } = req.tenantModels;
        const types = await FeeType.find({ school: req.school._id }).populate('feeGroup');
        res.json(types);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/types', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { FeeType } = req.tenantModels;
        const type = await FeeType.create({ ...req.body, school: req.school._id });
        res.status(201).json(type);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/types/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { FeeType } = req.tenantModels;
        await FeeType.deleteOne({ _id: req.params.id, school: req.school._id });
        res.json({ message: 'Fee Type deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
