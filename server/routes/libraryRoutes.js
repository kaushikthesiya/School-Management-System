const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get all books
// @route   GET /api/library/books
router.get('/books', protect, async (req, res) => {
    try {
        const { Book } = req.tenantModels;
        const books = await Book.find({ school: req.school._id });
        res.json(books);
    } catch (error) {
        console.error('Get Books Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Add book
// @route   POST /api/library/books
router.post('/books', protect, authorize('schooladmin', 'librarian'), async (req, res) => {
    try {
        const { Book } = req.tenantModels;
        const book = await Book.create({ ...req.body, school: req.school._id });
        res.status(201).json(book);
    } catch (error) {
        console.error('Add Book Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Delete book
// @route   DELETE /api/library/books/:id
router.delete('/books/:id', protect, authorize('schooladmin', 'librarian'), async (req, res) => {
    try {
        const { Book } = req.tenantModels;
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book removed' });
    } catch (error) {
        console.error('Delete Book Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
