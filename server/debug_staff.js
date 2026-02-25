const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Scolify_Admin';

async function debugStaffRoles() {
    try {
        await mongoose.connect(MONGO_URI);

        const School = mongoose.model('School', new mongoose.Schema({ slug: String, name: String }));
        const school = await School.findOne({ slug: 'aspire-intl' });

        const tenantConn = mongoose.createConnection(`mongodb://127.0.0.1:27017/school_aspire_intl`);
        await tenantConn.asPromise();

        const Staff = tenantConn.model('Staff', new mongoose.Schema({ name: String, role: String, school: mongoose.Schema.Types.ObjectId }));
        const allStaff = await Staff.find({ school: school._id });

        console.log('--- All Staff Members ---');
        console.log('Total Staff:', allStaff.length);
        allStaff.forEach(s => console.log(` - ${s.name}: ${s.role}`));

        await mongoose.connection.close();
        await tenantConn.close();
    } catch (err) {
        console.error(err);
    }
}

debugStaffRoles();
