import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../../components/SnowUI';
import {
    Search,
    Trash2,
    ChevronDown,
    Filter,
    Plus,
    User,
    BookOpen
} from 'lucide-react';
import api from '../../api/api';
import { useToast } from '../../context/ToastContext';

const MultiClassStudent = () => {
    const { showToast } = useToast();
    const [classes, setClasses] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);

    const [filters, setFilters] = useState({
        academicYear: '',
        class: '',
        section: '',
        student: ''
    });

    const [assignmentForm, setAssignmentForm] = useState({
        studentId: '',
        classId: '',
        section: '',
        academicYearId: ''
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [classesRes, sessionsRes] = await Promise.all([
                    api.get('/api/academic/classes'),
                    api.get('/api/academic/sessions')
                ]);
                setClasses(classesRes.data);
                setSessions(sessionsRes.data);

                if (sessionsRes.data.length > 0) {
                    setFilters(f => ({ ...f, academicYear: sessionsRes.data[0]._id }));
                    setAssignmentForm(af => ({ ...af, academicYearId: sessionsRes.data[0]._id }));
                }
            } catch (error) {
                showToast("Failed to fetch initial data", "error");
            }
        };
        fetchInitialData();
    }, []);

    // Fetch students when filters change (specifically class/section for the student select)
    useEffect(() => {
        const fetchStudents = async () => {
            if (!filters.class || !filters.section) return;
            try {
                const res = await api.get(`/api/students?classId=${filters.class}&section=${filters.section}`);
                setStudents(res.data);
            } catch (error) {
                console.error("Failed to fetch students");
            }
        };
        fetchStudents();
    }, [filters.class, filters.section]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = async () => {
        setSearching(true);
        try {
            const res = await api.get('/api/students/multi-class', {
                params: {
                    classId: filters.class,
                    section: filters.section
                }
            });
            setAssignments(res.data);
        } catch (error) {
            showToast("Search failed", "error");
        } finally {
            setSearching(false);
        }
    };

    const handleAddAssignment = async (e) => {
        e.preventDefault();
        if (!filters.student || !assignmentForm.classId || !assignmentForm.section) {
            showToast("Please select all fields", "error");
            return;
        }

        setLoading(true);
        try {
            await api.post('/api/students/multi-class', {
                studentId: filters.student,
                classId: assignmentForm.classId,
                section: assignmentForm.section,
                academicYearId: assignmentForm.academicYearId || filters.academicYear
            });
            showToast("Secondary class assigned successfully");
            handleSearch(); // Refresh list
        } catch (error) {
            showToast(error.response?.data?.message || "Assignment failed", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Remove this multi-class assignment?")) return;
        try {
            await api.delete(`/api/students/multi-class/${id}`);
            showToast("Assignment removed");
            setAssignments(prev => prev.filter(a => a._id !== id));
        } catch (error) {
            showToast("Delete failed", "error");
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
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Multi Class Student</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Student Info</span>
                        <span>|</span>
                        <span className="text-[#7c32ff]">Multi Class Student</span>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-1.5">
                        <Label>ACADEMIC YEAR</Label>
                        <Select name="academicYear" value={filters.academicYear} onChange={handleChange} options={sessions.map(s => ({ value: s._id, label: s.year }))} placeholder="Select Year" />
                    </div>
                    <div className="space-y-1.5">
                        <Label>CLASS</Label>
                        <Select name="class" value={filters.class} onChange={handleChange} options={classes.map(c => ({ value: c._id, label: c.name }))} placeholder="Select Class" />
                    </div>
                    <div className="space-y-1.5">
                        <Label>SECTION</Label>
                        <Select name="section" value={filters.section} onChange={handleChange} options={['A', 'B', 'C'].map(s => ({ value: s, label: s }))} placeholder="Select Section" />
                    </div>
                    <div className="space-y-1.5">
                        <Label>STUDENT</Label>
                        <Select name="student" value={filters.student} onChange={handleChange} options={students.map(s => ({ value: s._id, label: `${s.firstName} ${s.lastName} (${s.admissionNumber})` }))} placeholder="Select Student" />
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <Button
                        onClick={handleSearch}
                        className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                    >
                        <Search size={14} strokeWidth={3} />
                        <span>{searching ? 'SEARCHING...' : 'SEARCH'}</span>
                    </Button>
                </div>
            </Card>

            {/* Multiple Class Entry Card (Visible when student selected) */}
            {filters.student && (
                <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl">
                    <div className="flex items-center space-x-3 mb-8">
                        <Plus size={16} className="text-[#7c32ff]" />
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Assign Additional Class</h3>
                    </div>

                    <form onSubmit={handleAddAssignment} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                        <div className="space-y-1.5">
                            <Label required>ADD TO CLASS</Label>
                            <Select
                                name="classId"
                                value={assignmentForm.classId}
                                onChange={(e) => setAssignmentForm(f => ({ ...f, classId: e.target.value }))}
                                options={classes.map(c => ({ value: c._id, label: c.name }))}
                                placeholder="Select Class"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label required>SECTION</Label>
                            <Select
                                name="section"
                                value={assignmentForm.section}
                                onChange={(e) => setAssignmentForm(f => ({ ...f, section: e.target.value }))}
                                options={['A', 'B', 'C'].map(s => ({ value: s, label: s }))}
                                placeholder="Select Section"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-[#1C1C1E] text-white rounded-xl py-3.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 active:scale-95 transition-all w-full md:w-auto"
                        >
                            <Plus size={14} strokeWidth={3} />
                            <span>{loading ? 'SAVING...' : 'SAVE'}</span>
                        </Button>
                    </form>
                </Card>
            )}

            {/* List Table Card */}
            <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center space-x-3">
                        <BookOpen size={16} className="text-[#7c32ff]" />
                        <span>Multi Class List</span>
                    </h3>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                {['Student', 'Admission No', 'Secondary Class', 'Section', 'Year', 'Action'].map((header, idx) => (
                                    <th key={idx} className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {searching ? (
                                <tr><td colSpan="6" className="px-8 py-12 text-center text-xs font-bold text-slate-300 italic">Searching...</td></tr>
                            ) : assignments.length === 0 ? (
                                <tr><td colSpan="6" className="px-8 py-12 text-center text-xs font-bold text-slate-300 italic uppercase tracking-widest">No multi-class records found</td></tr>
                            ) : assignments.map((record) => (
                                <tr key={record._id} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-[#7c32ff]">
                                                <User size={14} />
                                            </div>
                                            <span className="text-[11px] font-black text-slate-700 uppercase italic">
                                                {record.student?.firstName} {record.student?.lastName}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-[11px] font-bold text-slate-500">{record.student?.admissionNumber}</td>
                                    <td className="px-8 py-5 text-[11px] font-black text-[#7c32ff] uppercase italic">{record.class?.name}</td>
                                    <td className="px-8 py-5 text-[11px] font-bold text-slate-600">{record.section}</td>
                                    <td className="px-8 py-5 text-[11px] font-bold text-slate-400">{record.academicYear?.year}</td>
                                    <td className="px-8 py-5">
                                        <button
                                            onClick={() => handleDelete(record._id)}
                                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all transform active:scale-95"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default MultiClassStudent;
