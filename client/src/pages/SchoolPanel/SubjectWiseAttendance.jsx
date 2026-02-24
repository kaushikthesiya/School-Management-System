import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../../components/SnowUI';
import {
    Search,
    ChevronDown,
    Filter,
    Plus,
    Save,
    CheckCircle2,
    XCircle,
    Clock,
    UserCircle2
} from 'lucide-react';
import api from '../../api/api';
import { useToast } from '../../context/ToastContext';

const SubjectWiseAttendance = () => {
    const { showToast } = useToast();
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [filters, setFilters] = useState({
        class: '',
        section: '',
        subject: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await api.get('/api/academic/classes');
                setClasses(res.data);
            } catch (error) {
                console.error("Failed to fetch classes");
            }
        };
        fetchClasses();
    }, []);

    useEffect(() => {
        const fetchSubjects = async () => {
            if (!filters.class) {
                setSubjects([]);
                return;
            }
            try {
                // Fetching subjects for the selected class
                const res = await api.get(`/api/academic/subjects?classId=${filters.class}`);
                setSubjects(res.data);
            } catch (error) {
                console.error("Failed to fetch subjects");
            }
        };
        fetchSubjects();
    }, [filters.class]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = async () => {
        if (!filters.class || !filters.section || !filters.subject || !filters.date) {
            showToast('Please select all criteria', 'error');
            return;
        }
        setLoading(true);
        try {
            // 1. Fetch all students in the class/section
            const studentsRes = await api.get(`/api/students?classId=${filters.class}&section=${filters.section}`);
            const studentList = studentsRes.data;

            // 2. Fetch existing attendance for the date and subject
            const attendanceRes = await api.get(`/api/attendance?classId=${filters.class}&date=${filters.date}&subjectId=${filters.subject}`);
            const attendanceData = attendanceRes.data;

            // 3. Merge: Default to 'Present' if no record exists
            const merged = studentList.map(student => {
                const existing = attendanceData.find(a => a.student._id === student._id);
                return {
                    ...student,
                    status: existing ? existing.status : 'Present'
                };
            });

            setStudents(merged);
        } catch (error) {
            console.error('Search Error:', error);
            showToast('Failed to fetch data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = (studentId, status) => {
        setStudents(prev => prev.map(s => s._id === studentId ? { ...s, status } : s));
    };

    const markAll = (status) => {
        setStudents(prev => prev.map(s => ({ ...s, status })));
    };

    const handleSave = async () => {
        if (students.length === 0) return;
        setSaving(true);
        try {
            const payload = {
                classId: filters.class,
                subjectId: filters.subject,
                date: filters.date,
                students: students.map(s => ({ id: s._id, status: s.status }))
            };
            await api.post('/api/attendance/mark', payload);
            showToast('Subject attendance saved successfully');
        } catch (error) {
            console.error('Save Error:', error);
            showToast('Failed to save attendance', 'error');
        } finally {
            setSaving(false);
        }
    };

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );

    const Select = ({ name, value, onChange, options, placeholder, required }) => (
        <div className="relative group">
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none"
            >
                <option value="">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={14} />
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">

            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Subject Wise Attendance</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Student Info</span>
                        <span>|</span>
                        <span className="text-[#7c32ff]">Subject Wise Attendance</span>
                    </div>
                </div>
            </div>

            {/* Select Criteria Card */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center space-x-3">
                        <Filter size={16} className="text-[#7c32ff]" />
                        <span>Select Criteria</span>
                    </h3>
                    <Button
                        className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                    >
                        <Plus size={14} strokeWidth={3} />
                        <span>IMPORT ATTENDANCE</span>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-1.5">
                        <Label required>CLASS</Label>
                        <Select name="class" value={filters.class} onChange={handleChange} options={classes.map(c => ({ value: c._id, label: c.name }))} placeholder="Select Class *" required />
                    </div>
                    <div className="space-y-1.5">
                        <Label required>SECTION</Label>
                        <Select name="section" value={filters.section} onChange={handleChange} options={['A', 'B', 'C']} placeholder="Select Section *" required />
                    </div>
                    <div className="space-y-1.5">
                        <Label required>SUBJECT</Label>
                        <Select name="subject" value={filters.subject} onChange={handleChange} options={subjects.map(s => ({ value: s._id, label: s.name }))} placeholder="Select Subject *" required />
                    </div>
                    <div className="space-y-1.5">
                        <Label required>Attendance Date</Label>
                        <Input type="date" name="date" value={filters.date} onChange={handleChange} className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold w-full" required />
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <Button
                        onClick={handleSearch}
                        disabled={loading}
                        className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                    >
                        <Search size={14} strokeWidth={3} />
                        <span>{loading ? 'SEARCHING...' : 'SEARCH'}</span>
                    </Button>
                </div>
            </Card>

            {/* Attendance Table */}
            {students.length > 0 && (
                <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden animate-in slide-in-from-bottom duration-500">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                        <div>
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Subject Attendance List</h3>
                            <p className="text-[10px] font-bold text-slate-400 mt-1">Mark attendance for students in selected subject</p>
                        </div>
                        <div className="flex space-x-3">
                            <Button onClick={() => markAll('Present')} className="bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all">All Present</Button>
                            <Button onClick={() => markAll('Absent')} className="bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all">All Absent</Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic tracking-tight">#</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic tracking-tight">Admission No</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic tracking-tight">Student Name</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic tracking-tight text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {students.map((student, idx) => (
                                    <tr key={student._id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-8 py-4 text-xs font-bold text-slate-400">{idx + 1}</td>
                                        <td className="px-8 py-4 text-xs font-black text-slate-700 italic uppercase">{student.admissionNumber}</td>
                                        <td className="px-8 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                                                    <UserCircle2 size={24} />
                                                </div>
                                                <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{student.firstName} {student.lastName}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex justify-center space-x-2">
                                                {[
                                                    { id: 'Present', label: 'P', icon: CheckCircle2, bg: 'bg-emerald-50', text: 'text-emerald-500', active: 'bg-emerald-500 text-white' },
                                                    { id: 'Late', label: 'L', icon: Clock, bg: 'bg-amber-50', text: 'text-amber-500', active: 'bg-amber-500 text-white' },
                                                    { id: 'Absent', label: 'A', icon: XCircle, bg: 'bg-rose-50', text: 'text-rose-500', active: 'bg-rose-500 text-white' }
                                                ].map(st => (
                                                    <button
                                                        key={st.id}
                                                        onClick={() => handleStatusUpdate(student._id, st.id)}
                                                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${student.status === st.id ? st.active : `${st.bg} ${st.text} opacity-40 hover:opacity-100`}`}
                                                        title={st.id}
                                                    >
                                                        <span className="text-[10px] font-black">{st.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 border-t border-slate-50 flex justify-end">
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] flex items-center space-x-3 shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            <Save size={18} strokeWidth={3} />
                            <span>{saving ? 'SAVING...' : 'SAVE ATTENDANCE'}</span>
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default SubjectWiseAttendance;

