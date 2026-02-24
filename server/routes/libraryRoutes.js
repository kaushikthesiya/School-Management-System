const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// ─── LIBRARY ──────────────────────────────────────────────────────────────────

// ── BOOK CATEGORIES ──────────────────────────────────────────────────────────
// We store categories as distinct values from the Book collection (no separate model needed)
// @route   GET /api/library/categories
// @route   GET /api/library/categories
router.get('/categories', protect, async (req, res) => {
    try {
        const { LibraryCategory } = req.tenantModels;
        const categories = await LibraryCategory.find({ school: req.school._id }).sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   POST /api/library/categories
router.post('/categories', protect, authorize('schooladmin', 'librarian'), async (req, res) => {
    try {
        const { LibraryCategory } = req.tenantModels;
        const category = await LibraryCategory.create({ ...req.body, school: req.school._id });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   DELETE /api/library/categories/:id
router.delete('/categories/:id', protect, authorize('schooladmin', 'librarian'), async (req, res) => {
    try {
        const { LibraryCategory } = req.tenantModels;
        await LibraryCategory.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// ── LIBRARY SUBJECTS ────────────────────────────────────────────────────────
// @route   GET /api/library/subjects
router.get('/subjects', protect, async (req, res) => {
    try {
        const { LibrarySubject } = req.tenantModels;
        const subjects = await LibrarySubject.find({ school: req.school._id }).sort({ name: 1 });
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/library/subjects
router.post('/subjects', protect, authorize('schooladmin', 'librarian'), async (req, res) => {
    try {
        const { LibrarySubject } = req.tenantModels;
        const subject = await LibrarySubject.create({ ...req.body, school: req.school._id });
        res.status(201).json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/library/subjects/:id
router.delete('/subjects/:id', protect, authorize('schooladmin', 'librarian'), async (req, res) => {
    try {
        const { LibrarySubject } = req.tenantModels;
        await LibrarySubject.findByIdAndDelete(req.params.id);
        res.json({ message: 'Subject removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// ── BOOKS ─────────────────────────────────────────────────────────────────────
// @route   GET /api/library/books
router.get('/books', protect, async (req, res) => {
    const { category, search } = req.query;
    try {
        const { Book } = req.tenantModels;
        let query = { school: req.school._id };
        if (category) query.category = category;
        if (search) query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } },
            { isbn: { $regex: search, $options: 'i' } }
        ];
        const books = await Book.find(query).sort({ title: 1 });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

// @route   POST /api/library/books
router.post('/books', protect, authorize('schooladmin', 'librarian'), async (req, res) => {
    try {
        const { Book } = req.tenantModels;
        const book = await Book.create({ ...req.body, school: req.school._id });
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

// @route   PUT /api/library/books/:id
router.put('/books/:id', protect, authorize('schooladmin', 'librarian'), async (req, res) => {
    try {
        const { Book } = req.tenantModels;
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

// @route   DELETE /api/library/books/:id
router.delete('/books/:id', protect, authorize('schooladmin', 'librarian'), async (req, res) => {
    try {
        const { Book } = req.tenantModels;
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ── MEMBERS ───────────────────────────────────────────────────────────────────
// Members can be students or staff — we fetch them from their respective models
// @route   GET /api/library/members
router.get('/members', protect, async (req, res) => {
    const { search } = req.query;
    try {
        const { LibraryMember } = req.tenantModels;
        let query = { school: req.school._id };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { memberId: { $regex: search, $options: 'i' } }
            ];
        }

        const members = await LibraryMember.find(query).sort({ createdAt: -1 });
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   POST /api/library/members
router.post('/members', protect, authorize('schooladmin', 'librarian'), async (req, res) => {
    try {
        const { LibraryMember } = req.tenantModels;
        const { memberId } = req.body;

        // Check if member already exists in library
        const existing = await LibraryMember.findOne({ school: req.school._id, memberId });
        if (existing) {
            return res.status(400).json({ message: 'This ID is already registered as a library member' });
        }

        const member = await LibraryMember.create({ ...req.body, school: req.school._id });
        res.status(201).json(member);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   DELETE /api/library/members/:id
router.delete('/members/:id', protect, authorize('schooladmin', 'librarian'), async (req, res) => {
    try {
        const { LibraryMember } = req.tenantModels;
        await LibraryMember.findByIdAndDelete(req.params.id);
        res.json({ message: 'Member removed from library' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// ── ISSUE / RETURN ────────────────────────────────────────────────────────────
// We use the Book model's issueRecords or a simple inline approach on Book itself
// For proper issue/return tracking, we store issue records in the Book collection
// But since there's no IssueRecord model, we'll handle via a lean array embedded in Book
// Better: Create a virtual "issued books" lookup from Visitor model or use Complaint as placeholder
// — We'll use a dedicated inline structure in the Book document

// @route   GET /api/library/issued
// @desc    Get all currently issued books
router.get('/issued', protect, async (req, res) => {
    const { memberId, memberType } = req.query;
    try {
        const { Book } = req.tenantModels;
        // Books that have issuedTo set
        let query = { school: req.school._id, 'issuedTo.name': { $exists: true, $ne: null } };
        if (memberId) query['issuedTo.memberId'] = memberId;
        const books = await Book.find(query).select('title author isbn category issuedTo issuedDate dueDate');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @route   POST /api/library/books/:id/issue
// @desc    Issue a book to a member
router.post('/books/:id/issue', protect, authorize('schooladmin', 'librarian'), async (req, res) => {
    const { memberId, memberName, memberType, dueDate } = req.body;
    try {
        const { Book } = req.tenantModels;
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        if (book.issuedTo && book.issuedTo.memberId) {
            return res.status(400).json({ message: 'Book is already issued' });
        }
        if ((book.availableQty || book.quantity || 1) < 1) {
            return res.status(400).json({ message: 'No copies available' });
        }
        book.issuedTo = { memberId, memberName, memberType };
        book.issuedDate = new Date();
        book.dueDate = dueDate ? new Date(dueDate) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
        book.availableQty = (book.availableQty || book.quantity || 1) - 1;
        await book.save();
        res.json({ message: 'Book issued successfully', book });
    } catch (error) {
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

// @route   POST /api/library/books/:id/return
// @desc    Return a book
router.post('/books/:id/return', protect, authorize('schooladmin', 'librarian'), async (req, res) => {
    try {
        const { Book } = req.tenantModels;
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        const fine = calculateFine(book.dueDate);
        book.issuedTo = undefined;
        book.issuedDate = undefined;
        book.dueDate = undefined;
        book.availableQty = (book.availableQty || 0) + 1;
        await book.save();
        res.json({ message: 'Book returned successfully', fine, book });
    } catch (error) {
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});

function calculateFine(dueDate, ratePerDay = 1) {
    if (!dueDate) return 0;
    const today = new Date();
    const due = new Date(dueDate);
    if (today <= due) return 0;
    const days = Math.ceil((today - due) / (1000 * 60 * 60 * 24));
    return days * ratePerDay;
}

module.exports = router;
