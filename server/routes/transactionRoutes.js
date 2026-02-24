const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Record a transaction (Income/Expense)
// @route   POST /api/transactions
router.post('/', protect, authorize('schooladmin', 'accountant'), async (req, res) => {
    try {
        const { Transaction } = req.tenantModels;
        const transaction = await Transaction.create({
            ...req.body,
            school: req.school._id,
            recordedBy: req.user._id
        });
        res.status(201).json(transaction);
    } catch (error) {
        console.error('Record Transaction Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all transactions (with filters)
// @route   GET /api/transactions
router.get('/', protect, authorize('schooladmin', 'accountant'), async (req, res) => {
    const { type, category, startDate, endDate } = req.query;
    try {
        const { Transaction } = req.tenantModels;
        let query = { school: req.school._id };
        if (type) query.type = type;
        if (category) query.category = category;
        if (startDate && endDate) {
            query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const transactions = await Transaction.find(query).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        console.error('Get Transactions Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get account summary (Income vs Expense)
// @route   GET /api/transactions/summary
router.get('/summary', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Transaction } = req.tenantModels;
        const summary = await Transaction.aggregate([
            { $match: { school: req.school._id } },
            {
                $group: {
                    _id: '$type',
                    total: { $sum: '$amount' }
                }
            }
        ]);
        res.json(summary);
    } catch (error) {
        console.error('Account Summary Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
