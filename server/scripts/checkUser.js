const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to main database');

        const user = await User.findOne({ email: 'bhavesh@example.com' }).populate('school', 'name slug');
        if (user) {
            console.log('👤 User Found:');
            console.log(JSON.stringify({
                name: user.name,
                email: user.email,
                role: user.role,
                school: user.school?.name,
                school_slug: user.school?.slug,
                isActive: user.isActive,
                createdAt: user.createdAt
            }, null, 2));
        } else {
            console.log('❌ User NOT Found (bhavesh@example.com)');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

checkUser();
