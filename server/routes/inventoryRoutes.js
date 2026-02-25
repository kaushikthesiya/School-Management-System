const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// --- Item Category Routes ---
router.post('/category', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { InventoryCategory } = req.tenantModels;
        const category = new InventoryCategory({ ...req.body, school: req.school._id });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/category', protect, authorize('schooladmin', 'accountant'), async (req, res) => {
    try {
        const { InventoryCategory } = req.tenantModels;
        const categories = await InventoryCategory.find({ school: req.school._id });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Item Store Routes ---
router.post('/store', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { ItemStore } = req.tenantModels;
        const store = new ItemStore({ ...req.body, school: req.school._id });
        await store.save();
        res.status(201).json(store);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/store', protect, authorize('schooladmin', 'accountant'), async (req, res) => {
    try {
        const { ItemStore } = req.tenantModels;
        const stores = await ItemStore.find({ school: req.school._id });
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Supplier Routes ---
router.post('/supplier', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Supplier } = req.tenantModels;
        const supplier = new Supplier({ ...req.body, school: req.school._id });
        await supplier.save();
        res.status(201).json(supplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/supplier', protect, authorize('schooladmin', 'accountant'), async (req, res) => {
    try {
        const { Supplier } = req.tenantModels;
        const suppliers = await Supplier.find({ school: req.school._id });
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Item Routes ---
router.post('/item', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { Item } = req.tenantModels;
        const item = new Item({ ...req.body, school: req.school._id });
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/item', protect, authorize('schooladmin', 'accountant'), async (req, res) => {
    try {
        const { Item } = req.tenantModels;
        const items = await Item.find({ school: req.school._id }).populate('category');
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Inventory Transaction Routes (Receive/Sell/Issue) ---
router.post('/transaction', protect, authorize('schooladmin', 'accountant'), async (req, res) => {
    try {
        const { InventoryTransaction, Item } = req.tenantModels;
        const { item: itemId, transactionType, quantity, price } = req.body;

        const transaction = new InventoryTransaction({
            ...req.body,
            totalAmount: (parseFloat(price) || 0) * (parseFloat(quantity) || 0),
            school: req.school._id
        });
        await transaction.save();

        // Update Item quantity
        const item = await Item.findById(itemId);
        if (!item) throw new Error('Item not found');

        const qtyChange = parseFloat(quantity) || 0;

        if (transactionType === 'Receive') {
            item.quantity += qtyChange;
        } else if (transactionType === 'Sell' || transactionType === 'Issue') {
            if (item.quantity < qtyChange) throw new Error(`Insufficient stock for ${item.name}. Available: ${item.quantity}`);
            item.quantity -= qtyChange;
        } else {
            throw new Error('Invalid transaction type');
        }

        await item.save();

        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/transaction', protect, authorize('schooladmin', 'accountant'), async (req, res) => {
    try {
        const { InventoryTransaction } = req.tenantModels;
        const { type } = req.query;
        let query = { school: req.school._id };
        if (type) query.transactionType = type;

        const transactions = await InventoryTransaction.find(query)
            .populate('item')
            .populate('supplier')
            .populate('store')
            .sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
