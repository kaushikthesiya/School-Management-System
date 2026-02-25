const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const School = require('./models/School');
require('dotenv').config();

async function generate() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const school = await School.findOne({ slug: 'aspire-intl' });
        if (!school) {
            console.error('School not found');
            process.exit(1);
        }

        const user = await User.findOne({ school: school._id, role: 'schooladmin' });
        if (!user) {
            console.error('School admin not found');
            process.exit(1);
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log('TOKEN:' + token);
        console.log('SCHOOL_SLUG:aspire-intl');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

generate();
