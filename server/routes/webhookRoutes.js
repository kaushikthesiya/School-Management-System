const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const School = require('../models/School');

// @desc    Handle Razorpay Webhooks
// @route   POST /api/webhooks/razorpay
// @access  Public (Secret verified)
router.post('/razorpay', async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(JSON.stringify(req.body))
        .digest('hex');

    if (expectedSignature !== signature) {
        return res.status(400).send('Invalid signature');
    }

    const event = req.body.event;
    const payload = req.body.payload;

    try {
        if (event === 'subscription.charged') {
            const subscription = payload.subscription.entity;
            const schoolSlug = subscription.notes.school_slug;

            await School.findOneAndUpdate(
                { slug: schoolSlug },
                {
                    subscriptionStatus: 'active',
                    planExpiry: new Date(subscription.current_end * 1000)
                }
            );
        }

        if (event === 'subscription.cancelled' || event === 'subscription.expired') {
            const subscription = payload.subscription.entity;
            const schoolSlug = subscription.notes.school_slug;

            await School.findOneAndUpdate(
                { slug: schoolSlug },
                { subscriptionStatus: 'expired' }
            );
        }

        res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
