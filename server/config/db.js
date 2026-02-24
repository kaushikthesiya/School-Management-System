const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        if (error.message.includes('bad auth')) {
            console.error('👉 Tip: Please verify your MongoDB username and password in Atlas (Database Access).');
            console.error('👉 Tip: Ensure your password does not contain special characters that need URL encoding, or encode them.');
        }
        process.exit(1);
    }
};

module.exports = connectDB;
