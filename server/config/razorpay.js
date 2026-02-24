const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Create a Subscription for a School
 * This is for UPI Autopay/Recurring payments
 */
const createSubscription = async (planId, schoolId) => {
    try {
        // Note: In a real scenario, you'd first create a 'Plan' in Razorpay dashboard or via API
        // and use that plan_id here.
        const subscription = await razorpay.subscriptions.create({
            plan_id: planId, // This is the Razorpay Plan ID, not our DB ID
            customer_notify: 1,
            total_count: 12, // For 1 year
            start_at: Math.floor(Date.now() / 1000) + 3600, // Starts in 1 hour
        });
        return subscription;
    } catch (error) {
        console.error('Razorpay Subscription Error:', error);
        throw error;
    }
};

module.exports = { razorpay, createSubscription };
