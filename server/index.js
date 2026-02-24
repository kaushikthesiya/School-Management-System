const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/superadmin', require('./routes/superAdminRoutes'));
app.use('/api/plans', require('./routes/planRoutes'));
app.use('/api/webhooks', require('./routes/webhookRoutes'));
app.use('/api/school', require('./middleware/tenantMiddleware'), require('./routes/schoolRoutes'));
app.use('/api/school/rbac', require('./middleware/tenantMiddleware'), require('./routes/roleRoutes'));
app.use('/api/academic', require('./middleware/tenantMiddleware'), require('./routes/academicRoutes'));
app.use('/api/timetable', require('./middleware/tenantMiddleware'), require('./routes/timetableRoutes'));
app.use('/api/enquiries', require('./middleware/tenantMiddleware'), require('./routes/enquiryRoutes'));
app.use('/api/students', require('./middleware/tenantMiddleware'), require('./routes/studentRoutes'));
app.use('/api/attendance', require('./middleware/tenantMiddleware'), require('./routes/attendanceRoutes'));
app.use('/api/fees', require('./middleware/tenantMiddleware'), require('./routes/feeRoutes'));
app.use('/api/transactions', require('./middleware/tenantMiddleware'), require('./routes/transactionRoutes'));
app.use('/api/homework', require('./middleware/tenantMiddleware'), require('./routes/homeworkRoutes'));
app.use('/api/discipline', require('./middleware/tenantMiddleware'), require('./routes/disciplineRoutes'));
app.use('/api/exams', require('./middleware/tenantMiddleware'), require('./routes/examRoutes'));
app.use('/api/staff', require('./middleware/tenantMiddleware'), require('./routes/staffRoutes'));
app.use('/api/leaves', require('./middleware/tenantMiddleware'), require('./routes/leaveRoutes'));
app.use('/api/announcements', require('./middleware/tenantMiddleware'), require('./routes/announcementRoutes'));
app.use('/api/admin-section', require('./middleware/tenantMiddleware'), require('./routes/adminSectionRoutes'));
app.use('/api/lesson-plan', require('./middleware/tenantMiddleware'), require('./routes/lessonPlanRoutes'));
app.use('/api/study-material', require('./middleware/tenantMiddleware'), require('./routes/contentRoutes'));
app.use('/api/study-material', require('./middleware/tenantMiddleware'), require('./routes/contentRoutes'));
app.use('/api/dormitory', require('./middleware/tenantMiddleware'), require('./routes/dormitoryRoutes'));
app.use('/api/transport', require('./middleware/tenantMiddleware'), require('./routes/transportRoutes'));
app.use('/api/library', require('./middleware/tenantMiddleware'), require('./routes/libraryRoutes'));
app.use('/api/online-admission', require('./middleware/tenantMiddleware'), require('./routes/onlineAdmissionRoutes'));
app.use('/api/teacher-evaluation', require('./middleware/tenantMiddleware'), require('./routes/teacherEvaluationRoutes'));
app.use('/api/staff-attendance', require('./middleware/tenantMiddleware'), require('./routes/staffAttendanceRoutes'));
app.use('/api/payroll', require('./middleware/tenantMiddleware'), require('./routes/payrollRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Serve Uploads Static Folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic Route
app.get('/', (req, res) => {
  res.send('School Management System API Running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('💥 SERVER ERROR:', err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'production'}`);
});
