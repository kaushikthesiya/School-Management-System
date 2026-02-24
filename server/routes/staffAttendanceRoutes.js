const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// In-memory multer for import
const upload = multer({ storage: multer.memoryStorage() });

// Helper: normalize date to midnight UTC for consistent comparison
const toDateOnly = (d) => {
    const dt = new Date(d);
    return new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
};

// @desc    Mark attendance for multiple staff (upsert)
// @route   POST /api/staff-attendance/mark
router.post('/mark', protect, authorize('schooladmin'), async (req, res) => {
    const { attendanceData, date } = req.body;
    if (!attendanceData || !Array.isArray(attendanceData) || !date) {
        return res.status(400).json({ message: 'attendanceData and date are required' });
    }
    try {
        const { StaffAttendance } = req.tenantModels;
        const normalizedDate = toDateOnly(date);

        // Upsert each attendance record
        const ops = attendanceData.map(a => ({
            updateOne: {
                filter: { staff: a.staff, school: req.school._id, date: normalizedDate },
                update: {
                    $set: {
                        status: a.status || 'Present',
                        remark: a.remark || '',
                        school: req.school._id,
                        date: normalizedDate
                    }
                },
                upsert: true
            }
        }));

        await StaffAttendance.bulkWrite(ops);
        res.status(200).json({ message: 'Staff attendance saved successfully' });
    } catch (error) {
        console.error('Mark Staff Attendance Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Get staff list with their attendance for a specific date
// @route   GET /api/staff-attendance
router.get('/', protect, authorize('schooladmin'), async (req, res) => {
    const { date, role } = req.query;
    if (!date) {
        return res.status(400).json({ message: 'date query param is required' });
    }
    try {
        const { StaffAttendance, Staff } = req.tenantModels;
        const normalizedDate = toDateOnly(date);

        // Build staff query
        const staffQuery = { school: req.school._id };
        if (role) staffQuery.role = role;
        const allStaff = await Staff.find(staffQuery);

        // Get attendance for that date
        const attendanceRecords = await StaffAttendance.find({
            school: req.school._id,
            date: normalizedDate
        });

        // Merge staff + attendance
        const result = allStaff.map(staff => {
            const record = attendanceRecords.find(a => a.staff.toString() === staff._id.toString());
            return {
                staff: {
                    _id: staff._id,
                    name: staff.name,
                    staffId: staff.staffId,
                    role: staff.role,
                    photo: staff.photo || ''
                },
                status: record ? record.status : 'Present',
                remark: record ? record.remark : '',
                alreadyMarked: !!record
            };
        });

        res.json(result);
    } catch (error) {
        console.error('Get Staff Attendance Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Get attendance report for a date range
// @route   GET /api/staff-attendance/report
router.get('/report', protect, authorize('schooladmin'), async (req, res) => {
    const { startDate, endDate, role } = req.query;
    try {
        const { StaffAttendance, Staff } = req.tenantModels;

        const staffQuery = { school: req.school._id };
        if (role) staffQuery.role = role;
        const staffList = await Staff.find(staffQuery);
        const staffIds = staffList.map(s => s._id);

        const query = {
            school: req.school._id,
            staff: { $in: staffIds }
        };
        if (startDate) query.date = { $gte: toDateOnly(startDate) };
        if (endDate) query.date = { ...query.date, $lte: toDateOnly(endDate) };

        const records = await StaffAttendance.find(query).populate('staff', 'name staffId role');
        res.json(records);
    } catch (error) {
        console.error('Staff Attendance Report Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Import attendance from CSV
// @route   POST /api/staff-attendance/import
router.post('/import', protect, authorize('schooladmin'), upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { StaffAttendance, Staff } = req.tenantModels;
        const content = req.file.buffer.toString('utf-8');
        const lines = content.split('\n').filter(l => l.trim());

        if (lines.length < 2) {
            return res.status(400).json({ message: 'CSV file is empty or has no data rows' });
        }

        // Expected CSV columns: staffId,date,status,remark
        const header = lines[0].split(',').map(h => h.trim().toLowerCase());
        const staffIdIdx = header.indexOf('staffid');
        const dateIdx = header.indexOf('date');
        const statusIdx = header.indexOf('status');
        const remarkIdx = header.indexOf('remark');

        if (staffIdIdx === -1 || dateIdx === -1 || statusIdx === -1) {
            return res.status(400).json({ message: 'CSV must have columns: staffId, date, status (and optionally remark)' });
        }

        const allStaff = await Staff.find({ school: req.school._id });
        const staffMap = {};
        allStaff.forEach(s => { staffMap[s.staffId] = s._id; });

        const validStatuses = ['Present', 'Absent', 'Late', 'Half Day'];
        const ops = [];
        const errors = [];

        for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map(c => c.trim());
            const staffId = cols[staffIdIdx];
            const dateRaw = cols[dateIdx];
            const status = cols[statusIdx];
            const remark = remarkIdx !== -1 ? (cols[remarkIdx] || '') : '';

            if (!staffId || !dateRaw || !status) continue;
            if (!staffMap[staffId]) {
                errors.push(`Row ${i + 1}: Staff ID "${staffId}" not found`);
                continue;
            }
            if (!validStatuses.includes(status)) {
                errors.push(`Row ${i + 1}: Invalid status "${status}". Must be one of: ${validStatuses.join(', ')}`);
                continue;
            }

            const normalizedDate = toDateOnly(dateRaw);
            ops.push({
                updateOne: {
                    filter: { staff: staffMap[staffId], school: req.school._id, date: normalizedDate },
                    update: { $set: { status, remark, school: req.school._id, date: normalizedDate } },
                    upsert: true
                }
            });
        }

        if (ops.length > 0) {
            await StaffAttendance.bulkWrite(ops);
        }

        res.json({
            message: `Import complete. ${ops.length} records imported.`,
            imported: ops.length,
            errors: errors.length > 0 ? errors : undefined
        });
    } catch (error) {
        console.error('Import Staff Attendance Error:', error);
        res.status(500).json({ message: 'Server Error', details: error.message });
    }
});

// @desc    Delete attendance record
// @route   DELETE /api/staff-attendance/:id
router.delete('/:id', protect, authorize('schooladmin'), async (req, res) => {
    try {
        const { StaffAttendance } = req.tenantModels;
        await StaffAttendance.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (error) {
        console.error('Delete Staff Attendance Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
