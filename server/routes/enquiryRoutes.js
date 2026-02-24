const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Add new enquiry
// @route   POST /api/enquiries
router.post('/', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { Enquiry } = req.tenantModels;
        const enquiryData = { ...req.body, school: req.school._id };
        if (req.body.classId) enquiryData.class = req.body.classId;
        const enquiry = await Enquiry.create(enquiryData);
        res.status(201).json(enquiry);
    } catch (error) {
        console.error('Add Enquiry Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all enquiries with filtering
// @route   GET /api/enquiries
router.get('/', protect, async (req, res) => {
    try {
        const { Enquiry } = req.tenantModels;
        const { dateFrom, dateTo, source, status } = req.query;

        let query = { school: req.school._id };

        if (dateFrom && dateTo) {
            query.createdAt = {
                $gte: new Date(dateFrom),
                $lte: new Date(new Date(dateTo).setHours(23, 59, 59, 999))
            };
        }

        if (source && source !== 'All') {
            query.source = source;
        }

        if (status && status !== 'All') {
            query.status = status;
        }

        const enquiries = await Enquiry.find(query)
            .populate('class', 'name')
            .sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (error) {
        console.error('Get Enquiries Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update enquiry status
// @route   PATCH /api/enquiries/:id
router.patch('/:id', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { Enquiry } = req.tenantModels;
        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
        res.json(enquiry);
    } catch (error) {
        console.error('Update Enquiry Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update full enquiry
// @route   PUT /api/enquiries/:id
router.put('/:id', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { Enquiry } = req.tenantModels;
        const enquiryData = { ...req.body };
        if (req.body.classId) enquiryData.class = req.body.classId;
        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, enquiryData, { new: true });
        if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
        res.json(enquiry);
    } catch (error) {
        console.error('Put Enquiry Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get single enquiry
// @route   GET /api/enquiries/:id
router.get('/:id', protect, async (req, res) => {
    try {
        const { Enquiry } = req.tenantModels;
        const enquiry = await Enquiry.findById(req.params.id).populate('class', 'name');
        if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
        res.json(enquiry);
    } catch (error) {
        console.error('Get Single Enquiry Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
router.delete('/:id', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { Enquiry } = req.tenantModels;
        await Enquiry.findByIdAndDelete(req.params.id);
        res.json({ message: 'Enquiry deleted' });
    } catch (error) {
        console.error('Delete Enquiry Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Add follow up
// @route   POST /api/enquiries/:id/follow-up
router.post('/:id/follow-up', protect, authorize('schooladmin', 'frontdesk'), async (req, res) => {
    try {
        const { Enquiry } = req.tenantModels;
        const { note, status, nextFollowUp } = req.body;

        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });

        enquiry.followUpHistory.push({
            note,
            status,
            nextFollowUp,
            date: new Date()
        });

        enquiry.status = status || enquiry.status;
        enquiry.nextFollowUp = nextFollowUp || enquiry.nextFollowUp;
        enquiry.lastFollowUpDate = new Date();

        await enquiry.save();
        res.json(enquiry);
    } catch (error) {
        console.error('Add Follow-up Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
