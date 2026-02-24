import React, { useState, useEffect, useRef } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Search,
    Layout,
    Loader2,
    Save,
    Info,
    Upload,
    Download,
    X,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const baseUrl = 'http://localhost:5000';

const getPhotoUrl = (photo) => {
    if (!photo) return null;
    if (photo.startsWith('http')) return photo;
    return `${baseUrl}${photo.startsWith('/') ? '' : '/'}${photo}`;
};

// Status pill color map
const statusColors = {
    'Present': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Absent': 'bg-rose-50 text-rose-600 border-rose-100',
    'Late': 'bg-amber-50 text-amber-600 border-amber-100',
    'Half Day': 'bg-blue-50 text-blue-600 border-blue-100'
};

const StaffAttendance = () => {
    const navigate = useNavigate();
    const { school_slug } = useParams();
    const { showToast } = useToast();
    const importInputRef = useRef(null);

    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
    const [staffAttendance, setStaffAttendance] = useState([]);

    const [loadingRoles, setLoadingRoles] = useState(false);
    const [loadingStaff, setLoadingStaff] = useState(false);
    const [saving, setSaving] = useState(false);
    const [importing, setImporting] = useState(false);
    const [importResult, setImportResult] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);

    // Fetch roles on mount
    useEffect(() => {
        const fetchRoles = async () => {
            setLoadingRoles(true);
            try {
                const { data } = await api.get('/api/school/rbac/roles');
                setRoles(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching roles:', error);
            } finally {
                setLoadingRoles(false);
            }
        };
        fetchRoles();
    }, []);

    const handleSearch = async () => {
        if (!selectedRole) {
            showToast('Please select a role', 'error');
            return;
        }
        setLoadingStaff(true);
        setStaffAttendance([]);
        try {
            const { data } = await api.get(`/api/staff-attendance?date=${attendanceDate}&role=${selectedRole}`);
            setStaffAttendance(Array.isArray(data) ? data : []);
            if (!data.length) showToast('No staff found for the selected role', 'error');
        } catch (error) {
            console.error('Error fetching staff attendance:', error);
            showToast('Failed to load staff list', 'error');
        } finally {
            setLoadingStaff(false);
        }
    };

    const handleStatusChange = (staffId, status) => {
        setStaffAttendance(prev =>
            prev.map(item => item.staff._id === staffId ? { ...item, status } : item)
        );
    };

    const handleRemarkChange = (staffId, remark) => {
        setStaffAttendance(prev =>
            prev.map(item => item.staff._id === staffId ? { ...item, remark } : item)
        );
    };

    const markAllAs = (status) => {
        setStaffAttendance(prev => prev.map(item => ({ ...item, status })));
    };

    const handleSubmit = async () => {
        if (staffAttendance.length === 0) return;
        setSaving(true);
        try {
            const attendanceData = staffAttendance.map(item => ({
                staff: item.staff._id,
                status: item.status,
                remark: item.remark || ''
            }));
            await api.post('/api/staff-attendance/mark', {
                attendanceData,
                date: attendanceDate
            });
            showToast('Attendance saved successfully!');
        } catch (error) {
            console.error('Error saving attendance:', error);
            showToast(error.response?.data?.message || 'Failed to save attendance', 'error');
        } finally {
            setSaving(false);
        }
    };

    // Download CSV template
    const downloadTemplate = () => {
        const header = 'staffId,date,status,remark';
        const example = `G101,${attendanceDate},Present,On time\nG102,${attendanceDate},Absent,Sick leave`;
        const blob = new Blob([`${header}\n${example}`], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `staff_attendance_template_${attendanceDate}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Handle CSV import
    const handleImport = async (file) => {
        if (!file) return;
        setImporting(true);
        setImportResult(null);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const { data } = await api.post('/api/staff-attendance/import', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setImportResult({ success: true, ...data });
            showToast(data.message || 'Import successful!');
            // Refresh list if already searched
            if (selectedRole) handleSearch();
        } catch (error) {
            console.error('Import error:', error);
            const msg = error.response?.data?.message || 'Import failed';
            setImportResult({ success: false, message: msg });
            showToast(msg, 'error');
        } finally {
            setImporting(false);
            if (importInputRef.current) importInputRef.current.value = '';
        }
    };

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
            {children} {required && <span className="text-rose-500">*</span>}
        </label>
    );

    // Summary counts
    const summary = {
        Present: staffAttendance.filter(i => i.status === 'Present').length,
        Absent: staffAttendance.filter(i => i.status === 'Absent').length,
        Late: staffAttendance.filter(i => i.status === 'Late').length,
        'Half Day': staffAttendance.filter(i => i.status === 'Half Day').length
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Staff Attendance</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span className="cursor-pointer hover:text-[#7c32ff]" onClick={() => navigate(`/${school_slug}`)}>Dashboard</span>
                        <span>|</span>
                        <span>Human Resource</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Staff Attendance</span>
                    </div>
                </div>
                {/* IMPORT ATTENDANCE button in header */}
                <div className="flex items-center space-x-2">
                    <button
                        onClick={downloadTemplate}
                        className="flex items-center space-x-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 text-slate-500 hover:border-[#7c32ff] hover:text-[#7c32ff] transition-all active:scale-95"
                    >
                        <Download size={14} />
                        <span>CSV Template</span>
                    </button>
                    <button
                        onClick={() => setShowImportModal(true)}
                        className="flex items-center space-x-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-[#7c32ff] text-white hover:bg-[#6b25ea] transition-all active:scale-95 shadow-lg shadow-purple-500/20"
                    >
                        <Upload size={14} />
                        <span>+ Import Attendance</span>
                    </button>
                </div>
            </div>

            {/* Select Criteria */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Select Criteria</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6 items-end">
                    <div className="space-y-1">
                        <Label required>ROLE</Label>
                        <div className="relative border-b border-slate-200 focus-within:border-[#7c32ff] transition-all">
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full bg-transparent py-2 text-xs font-bold text-slate-600 outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Select Role *</option>
                                {roles.map(role => (
                                    <option key={role._id} value={role.name}>{role.name}</option>
                                ))}
                            </select>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">▾</div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label required>ATTENDANCE DATE</Label>
                        <div className="relative border-b border-slate-200 focus-within:border-[#7c32ff] transition-all">
                            <input
                                type="date"
                                value={attendanceDate}
                                onChange={(e) => setAttendanceDate(e.target.value)}
                                className="w-full bg-transparent py-2 text-xs font-bold text-slate-600 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleSearch}
                            disabled={loadingStaff}
                            className="flex items-center space-x-2 bg-[#1C1C1C] hover:bg-black disabled:bg-slate-300 text-white rounded-xl px-10 py-3 text-[10px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95 w-full md:w-auto"
                        >
                            {loadingStaff ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                            <span>SEARCH</span>
                        </button>
                    </div>
                </div>
            </Card>

            {/* Attendance Table */}
            {staffAttendance.length > 0 && (
                <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden animate-in slide-in-from-bottom-5">
                    {/* Summary row */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        {Object.entries(summary).map(([status, count]) => (
                            <div key={status} className={`flex items-center space-x-2 px-4 py-2 rounded-xl border ${statusColors[status]}`}>
                                <span className="text-[10px] font-black uppercase tracking-widest">{status}</span>
                                <span className="text-sm font-black">{count}</span>
                            </div>
                        ))}
                        <div className="flex items-center space-x-2 px-4 py-2 rounded-xl border border-slate-100 bg-slate-50 text-slate-500">
                            <span className="text-[10px] font-black uppercase tracking-widest">Total</span>
                            <span className="text-sm font-black">{staffAttendance.length}</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2">
                        <div>
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest italic">Staff List</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                Date: {new Date(attendanceDate + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                {' · '} Role: {selectedRole}
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            {/* Mark All Buttons */}
                            <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                                {['Present', 'Absent', 'Late', 'Half Day'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => markAllAs(status)}
                                        className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-white hover:shadow-sm transition-all text-slate-500 whitespace-nowrap"
                                    >
                                        All {status === 'Half Day' ? 'Half' : status}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                className="flex items-center space-x-2 bg-[#7c32ff] hover:bg-[#6b25ea] disabled:bg-slate-300 text-white rounded-xl px-6 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                            >
                                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                <span>{saving ? 'SAVING...' : 'SAVE ATTENDANCE'}</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto min-h-[300px]">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">#</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">Staff ID</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">Name</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">Role</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">Status</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">Attendance</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">Remark</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {staffAttendance.map((item, idx) => (
                                    <tr key={item.staff._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="py-4 px-4 text-[10px] font-black text-slate-400">{idx + 1}</td>
                                        <td className="py-4 px-4 text-xs font-bold text-slate-700 italic">{item.staff.staffId || 'N/A'}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-black shrink-0">
                                                    {item.staff.photo
                                                        ? <img src={getPhotoUrl(item.staff.photo)} alt={item.staff.name} className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                                                        : (item.staff.name?.[0] || '?').toUpperCase()
                                                    }
                                                </div>
                                                <span className="text-xs font-bold text-slate-700 italic group-hover:text-[#7c32ff] transition-colors">{item.staff.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-xs font-bold text-slate-500 italic uppercase opacity-70">{item.staff.role}</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[item.status] || 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                {item.alreadyMarked ? '✓ Saved' : 'New'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                {['Present', 'Absent', 'Late', 'Half Day'].map((status) => (
                                                    <label key={status} className="flex items-center space-x-1.5 cursor-pointer group/radio">
                                                        <div className="relative flex items-center justify-center">
                                                            <input
                                                                type="radio"
                                                                name={`attendance-${item.staff._id}`}
                                                                checked={item.status === status}
                                                                onChange={() => handleStatusChange(item.staff._id, status)}
                                                                className="sr-only"
                                                            />
                                                            <div className={`w-4 h-4 rounded-full border-2 transition-all ${item.status === status ? 'border-[#7c32ff] bg-white' : 'border-slate-200 group-hover/radio:border-slate-300'}`}>
                                                                {item.status === status && <div className="absolute inset-1 rounded-full bg-[#7c32ff]" />}
                                                            </div>
                                                        </div>
                                                        <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${item.status === status ? 'text-[#7c32ff]' : 'text-slate-400'}`}>
                                                            {status === 'Half Day' ? 'Half' : status}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <input
                                                type="text"
                                                value={item.remark || ''}
                                                onChange={(e) => handleRemarkChange(item.staff._id, e.target.value)}
                                                placeholder="Add remark..."
                                                className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-[10px] font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all placeholder:text-slate-300"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Bottom Save */}
                    <div className="flex justify-end mt-6 pt-4 border-t border-slate-50">
                        <button
                            onClick={handleSubmit}
                            disabled={saving}
                            className="flex items-center space-x-2 bg-[#7c32ff] hover:bg-[#6b25ea] disabled:bg-slate-300 text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                        >
                            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                            <span>{saving ? 'SAVING...' : 'SAVE ATTENDANCE'}</span>
                        </button>
                    </div>
                </Card>
            )}

            {/* Empty State */}
            {!staffAttendance.length && !loadingStaff && (
                <div className="py-20 flex flex-col items-center justify-center text-slate-300 animate-in fade-in duration-1000">
                    <Info size={48} className="mb-4 opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] italic">Select Role and Date to mark attendance</p>
                </div>
            )}

            {/* Import Modal */}
            {showImportModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowImportModal(false)}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-base font-black text-slate-800 uppercase tracking-tight">Import Attendance</h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Upload a CSV file to bulk-import</p>
                            </div>
                            <button onClick={() => setShowImportModal(false)} className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Instructions */}
                        <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">CSV Format Required</p>
                            <code className="text-[10px] font-mono text-[#7c32ff] block">staffId, date, status, remark</code>
                            <p className="text-[10px] text-slate-400 mt-2">Status must be: <strong>Present</strong>, <strong>Absent</strong>, <strong>Late</strong>, or <strong>Half Day</strong></p>
                        </div>

                        {/* Download Template */}
                        <button
                            onClick={downloadTemplate}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-200 text-[10px] font-black text-slate-500 hover:border-[#7c32ff] hover:text-[#7c32ff] uppercase tracking-widest transition-all mb-4"
                        >
                            <Download size={14} />
                            <span>Download CSV Template</span>
                        </button>

                        {/* Upload Area */}
                        <label className="block cursor-pointer">
                            <input
                                type="file"
                                accept=".csv"
                                className="hidden"
                                ref={importInputRef}
                                disabled={importing}
                                onChange={(e) => {
                                    if (e.target.files[0]) handleImport(e.target.files[0]);
                                }}
                            />
                            <div className="w-full flex flex-col items-center justify-center space-y-3 px-4 py-8 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#7c32ff] hover:bg-[#7c32ff]/5 transition-all">
                                {importing ? (
                                    <Loader2 size={32} className="text-[#7c32ff] animate-spin" />
                                ) : (
                                    <Upload size={32} className="text-slate-300" />
                                )}
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    {importing ? 'Importing...' : 'Click to select CSV file'}
                                </p>
                            </div>
                        </label>

                        {/* Import Result */}
                        {importResult && (
                            <div className={`mt-4 p-4 rounded-2xl flex items-start space-x-3 ${importResult.success ? 'bg-emerald-50 border border-emerald-100' : 'bg-rose-50 border border-rose-100'}`}>
                                {importResult.success ? <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> : <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />}
                                <div>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${importResult.success ? 'text-emerald-700' : 'text-rose-700'}`}>
                                        {importResult.message}
                                    </p>
                                    {importResult.errors && importResult.errors.map((err, i) => (
                                        <p key={i} className="text-[10px] text-rose-600 mt-1">{err}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Float Icon */}
            <div className="fixed bottom-12 right-12 w-10 h-10 bg-[#7c32ff] rounded shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-110 active:scale-95 transition-all">
                <Layout size={18} />
            </div>
        </div>
    );
};

export default StaffAttendance;
