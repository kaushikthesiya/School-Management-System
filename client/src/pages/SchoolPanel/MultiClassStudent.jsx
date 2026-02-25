import React, { useState, useEffect } from 'react';
import { Card, Button } from '../../components/SnowUI';
import {
    Search,
    Trash2,
    ChevronDown,
    Filter,
    Plus,
    User,
    Check,
    X
} from 'lucide-react';
import api from '../../api/api';
import { useToast } from '../../context/ToastContext';

const MultiClassStudent = () => {
    const { showToast } = useToast();
    const [classes, setClasses] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [students, setStudents] = useState([]);
    const [assignmentsGroups, setAssignmentsGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);

    const [filters, setFilters] = useState({
        academicYear: '',
        class: '',
        section: '',
        student: ''
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
                }
            } catch (error) {
                showToast("Failed to fetch initial data", "error");
            }
        };
        fetchInitialData();
    }, []);

    // Fetch students for the searchable student dropdown
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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = async () => {
        setSearching(true);
        try {
            const res = await api.get('/api/students/multi-class', {
                params: {
                    classId: filters.class,
                    section: filters.section,
                    studentId: filters.student
                }
            });

            // Format the fetched data for our local state
            const formatted = res.data.map(group => ({
                student: group.student,
                // Local rows including the primary one and secondary ones
                rows: [
                    {
                        id: 'primary',
                        classId: group.student.class?._id || group.student.class,
                        section: group.student.section,
                        isPrimary: true,
                        isSaved: true
                    },
                    ...group.assignments.map(a => ({
                        id: a._id,
                        classId: a.class?._id || a.class,
                        section: a.section,
                        academicYearId: a.academicYear?._id || a.academicYear,
                        isPrimary: false,
                        isSaved: true
                    }))
                ]
            }));

            setAssignmentsGroups(formatted);
        } catch (error) {
            showToast("Search failed", "error");
        } finally {
            setSearching(false);
        }
    };

    const addRow = (studentId) => {
        setAssignmentsGroups(groups => groups.map(group => {
            if (group.student._id === studentId) {
                return {
                    ...group,
                    rows: [...group.rows, {
                        id: 'new-' + Date.now(),
                        classId: '',
                        section: '',
                        academicYearId: filters.academicYear,
                        isPrimary: false,
                        isSaved: false
                    }]
                };
            }
            return group;
        }));
    };

    const removeRow = (studentId, rowId) => {
        setAssignmentsGroups(groups => groups.map(group => {
            if (group.student._id === studentId) {
                return {
                    ...group,
                    rows: group.rows.filter(r => r.id !== rowId)
                };
            }
            return group;
        }));
    };

    const updateRow = (studentId, rowId, field, value) => {
        setAssignmentsGroups(groups => groups.map(group => {
            if (group.student._id === studentId) {
                return {
                    ...group,
                    rows: group.rows.map(row => {
                        if (row.id === rowId) {
                            return { ...row, [field]: value };
                        }
                        return row;
                    })
                };
            }
            return group;
        }));
    };

    const setPrimary = (studentId, rowId) => {
        setAssignmentsGroups(groups => groups.map(group => {
            if (group.student._id === studentId) {
                return {
                    ...group,
                    rows: group.rows.map(row => ({
                        ...row,
                        isPrimary: row.id === rowId
                    }))
                };
            }
            return group;
        }));
    };

    const handleUpdate = async (studentId) => {
        const group = assignmentsGroups.find(g => g.student._id === studentId);
        if (!group) return;

        const primaryRow = group.rows.find(r => r.isPrimary);
        if (!primaryRow || !primaryRow.classId || !primaryRow.section) {
            showToast("Please ensure a primary class/section is selected", "error");
            return;
        }

        const secondaryAssignments = group.rows.filter(r => !r.isPrimary && r.classId && r.section);

        setLoading(true);
        try {
            await api.post(`/api/students/${studentId}/multi-class/bulk`, {
                primaryClass: primaryRow.classId,
                primarySection: primaryRow.section,
                assignments: secondaryAssignments.map(a => ({
                    classId: a.classId,
                    section: a.section,
                    academicYearId: a.academicYearId || filters.academicYear
                }))
            });
            showToast("Assignments updated successfully");
            handleSearch(); // Refresh to get clean IDs
        } catch (error) {
            showToast(error.response?.data?.message || "Failed to update assignments", "error");
        } finally {
            setLoading(false);
        }
    };

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );

    const Select = ({ name, value, onChange, options, placeholder, className = "" }) => (
        <div className={`relative group ${className}`}>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-[11px] font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
            >
                <option value="">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={12} />
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            {/* Page Header */}
            <div className="flex justify-between items-center px-4">
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

            {/* Select Criteria */}
            <Card className="p-8 border-none shadow-snow-lg bg-white rounded-[24px] relative overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center space-x-3">
                        <Filter size={16} className="text-[#7c32ff]" />
                        <span>Select Criteria</span>
                    </h3>
                    <button className="bg-[#7c32ff] text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                        <Plus size={14} strokeWidth={3} />
                        <span>DELETE STUDENT RECORD</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-1.5">
                        <Label>ACADEMIC YEAR</Label>
                        <Select name="academicYear" value={filters.academicYear} onChange={handleFilterChange} options={sessions.map(s => ({ value: s._id, label: s.year }))} placeholder="Select Year" />
                    </div>
                    <div className="space-y-1.5">
                        <Label>CLASS</Label>
                        <Select name="class" value={filters.class} onChange={handleFilterChange} options={classes.map(c => ({ value: c._id, label: `Class ${c.name}` }))} placeholder="Select Class" />
                    </div>
                    <div className="space-y-1.5">
                        <Label>SECTION</Label>
                        <Select name="section" value={filters.section} onChange={handleFilterChange} options={['A', 'B', 'C'].map(s => ({ value: s, label: s }))} placeholder="Select Section" />
                    </div>
                    <div className="space-y-1.5">
                        <Label>STUDENT</Label>
                        <Select name="student" value={filters.student} onChange={handleFilterChange} options={students.map(s => ({ value: s._id, label: `${s.firstName} ${s.lastName} (${s.admissionNumber})` }))} placeholder="Select Student" />
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <Button
                        onClick={handleSearch}
                        disabled={searching}
                        className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                    >
                        <Search size={14} strokeWidth={3} />
                        <span>{searching ? 'SEARCHING...' : 'SEARCH'}</span>
                    </Button>
                </div>
            </Card>

            {/* Student Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {assignmentsGroups.map((group) => (
                    <Card key={group.student._id} className="p-0 border-none shadow-snow-lg bg-white rounded-[24px] overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-[#7c32ff] p-5 flex justify-between items-center text-white">
                            <h3 className="text-sm font-black uppercase tracking-tight italic">
                                {group.student.firstName} {group.student.lastName} ({group.student.admissionNumber})
                            </h3>
                            <button
                                onClick={() => addRow(group.student._id)}
                                className="flex items-center space-x-1 underline-offset-4 hover:underline text-[10px] font-black uppercase"
                            >
                                <Plus size={14} strokeWidth={4} />
                                <span>ADD</span>
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 space-y-4">
                            {group.rows.map((row) => (
                                <div key={row.id} className="flex items-center space-x-3 group animate-in slide-in-from-left-2 duration-300">
                                    <Select
                                        className="flex-1"
                                        placeholder="Select Class *"
                                        value={row.classId}
                                        options={classes.map(c => ({ value: c._id, label: `Class ${c.name}` }))}
                                        onChange={(e) => updateRow(group.student._id, row.id, 'classId', e.target.value)}
                                    />
                                    <Select
                                        className="w-32 md:w-40"
                                        placeholder="Section *"
                                        value={row.section}
                                        options={['A', 'B', 'C', 'D'].map(s => ({ value: s, label: s }))}
                                        onChange={(e) => updateRow(group.student._id, row.id, 'section', e.target.value)}
                                    />

                                    {/* Default Select */}
                                    <div className="flex items-center space-x-2 px-2 cursor-pointer select-none" onClick={() => setPrimary(group.student._id, row.id)}>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${row.isPrimary ? 'bg-[#7c32ff] border-[#7c32ff]' : 'border-slate-200'}`}>
                                            {row.isPrimary && <Check size={12} strokeWidth={4} className="text-white" />}
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 tracking-wider">Default</span>
                                    </div>

                                    {/* Action Button */}
                                    {!row.isPrimary ? (
                                        <button
                                            onClick={() => removeRow(group.student._id, row.id)}
                                            className="w-10 h-10 bg-[#7c32ff] rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/10 active:scale-90 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    ) : (
                                        <div className="w-10 h-10" />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Card Footer */}
                        <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex justify-center">
                            <button
                                onClick={() => handleUpdate(group.student._id)}
                                disabled={loading}
                                className="bg-[#7c32ff] text-white px-10 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                            >
                                <Check size={14} strokeWidth={4} />
                                <span>{loading ? 'UPDATING...' : 'UPDATE'}</span>
                            </button>
                        </div>
                    </Card>
                ))}
            </div>

            {assignmentsGroups.length === 0 && !searching && (
                <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-slate-200">
                        <User className="text-slate-300" size={32} />
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No students loaded. Use filters to search.</p>
                </div>
            )}
        </div>
    );
};

export default MultiClassStudent;
