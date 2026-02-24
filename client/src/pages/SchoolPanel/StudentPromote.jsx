import React, { useState, useEffect } from 'react';
import { Card, Button } from '../../components/SnowUI';
import {
    Search,
    ChevronDown,
    Filter,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import api from '../../api/api';
import { useToast } from '../../context/ToastContext';

const StudentPromote = () => {
    const { showToast } = useToast();
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [filters, setFilters] = useState({
        academicYear: '',
        promoteAcademicYear: '',
        class: '',
        section: '',
    });

    // Target details for promotion
    const [targetDetails, setTargetDetails] = useState({
        class: '',
        section: ''
    });

    const [selectedStudentIds, setSelectedStudentIds] = useState([]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleTargetChange = (e) => {
        const { name, value } = e.target;
        setTargetDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = async () => {
        if (!filters.class || !filters.section) {
            showToast('Please select Class and Section', 'error');
            return;
        }
        setLoading(true);
        try {
            const res = await api.get(`/api/students?classId=${filters.class}&section=${filters.section}`);
            setStudents(res.data);
            setSelectedStudentIds([]); // Reset selection on new search
        } catch (error) {
            console.error('Error fetching students:', error);
            showToast('Error fetching students', 'error');
        } finally {
            setLoading(false);
        }
    };

    const toggleStudent = (id) => {
        setSelectedStudentIds(prev =>
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedStudentIds.length === students.length) {
            setSelectedStudentIds([]);
        } else {
            setSelectedStudentIds(students.map(s => s._id));
        }
    };

    const handlePromote = async () => {
        if (selectedStudentIds.length === 0) {
            showToast('Please select students to promote', 'error');
            return;
        }
        if (!targetDetails.class || !targetDetails.section) {
            showToast('Please select Target Class and Section', 'error');
            return;
        }

        if (!window.confirm(`Are you sure you want to promote ${selectedStudentIds.length} students?`)) return;

        setLoading(true);
        try {
            await api.post('/api/students/promote', {
                studentIds: selectedStudentIds,
                targetClassId: targetDetails.class,
                targetSection: targetDetails.section
            });
            showToast('Students promoted successfully!');
            setStudents([]); // Clear list
            setSelectedStudentIds([]);
        } catch (error) {
            console.error('Promote Error:', error);
            showToast('Error promoting students', 'error');
        } finally {
            setLoading(false);
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
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Student Promote</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Student Info</span>
                        <span>|</span>
                        <span className="text-[#7c32ff]">Student Promote</span>
                    </div>
                </div>
            </div>

            {/* Select Criteria Card */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl">
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8 flex items-center space-x-3">
                    <Filter size={16} className="text-[#7c32ff]" />
                    <span>Select Criteria</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-1.5">
                        <Label required>CURRENT SESSION</Label>
                        <Select name="academicYear" value={filters.academicYear} onChange={handleChange} options={['2024-25', '2025-26']} placeholder="Select Year *" required />
                    </div>
                    <div className="space-y-1.5">
                        <Label required>PROMOTE TO SESSION</Label>
                        <Select name="promoteAcademicYear" value={filters.promoteAcademicYear} onChange={handleChange} options={['2025-26', '2026-27']} placeholder="Promote Year *" required />
                    </div>
                    <div className="space-y-1.5">
                        <Label required>CLASS</Label>
                        <Select name="class" value={filters.class} onChange={handleChange} options={classes.map(c => ({ value: c._id, label: c.name }))} placeholder="Select Class *" required />
                    </div>
                    <div className="space-y-1.5">
                        <Label required>SECTION</Label>
                        <Select name="section" value={filters.section} onChange={handleChange} options={['A', 'B', 'C']} placeholder="Select Section *" required />
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

            {/* Student List & Promotion Section */}
            {students.length > 0 && (
                <div className="space-y-6 animate-in slide-in-from-bottom duration-500">

                    {/* Promotion Target Selection */}
                    <Card className="p-6 border-none shadow-snow-lg rounded-2xl bg-white border-l-4 border-l-[#7c32ff]">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-[#7c32ff]/10 rounded-xl text-[#7c32ff]">
                                    <ArrowRight size={24} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Promote Selected Students To:</h3>
                                    <p className="text-[10px] font-bold text-slate-400 mt-1">Select the destination class and section</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                                <div className="w-48">
                                    <Select
                                        name="class"
                                        value={targetDetails.class}
                                        onChange={handleTargetChange}
                                        options={classes.map(c => ({ value: c._id, label: `Class ${c.name}` }))}
                                        placeholder="Target Class *"
                                        required
                                    />
                                </div>
                                <div className="w-48">
                                    <Select
                                        name="section"
                                        value={targetDetails.section}
                                        onChange={handleTargetChange}
                                        options={['A', 'B', 'C']}
                                        placeholder="Target Section *"
                                        required
                                    />
                                </div>
                                <Button
                                    onClick={handlePromote}
                                    disabled={loading || selectedStudentIds.length === 0}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                                >
                                    <CheckCircle2 size={16} strokeWidth={3} />
                                    <span>PROMOTE</span>
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Student Table */}
                    <Card className="p-0 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Student List</h3>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-lg">
                                {selectedStudentIds.length} Selected
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#F8FAFC] border-y border-slate-100 uppercase tracking-widest text-[10px] font-black text-slate-400">
                                        <th className="px-6 py-4 w-16 text-center">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded text-[#7c32ff] focus:ring-[#7c32ff]"
                                                onChange={toggleAll}
                                                checked={selectedStudentIds.length === students.length && students.length > 0}
                                            />
                                        </th>
                                        <th className="px-6 py-4">Admission No</th>
                                        <th className="px-6 py-4">Student Name</th>
                                        <th className="px-6 py-4">Father Name</th>
                                        <th className="px-6 py-4">Current Result</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-[12px] font-bold">
                                    {students.map((student) => (
                                        <tr key={student._id} className={`hover:bg-slate-50/50 transition-colors ${selectedStudentIds.includes(student._id) ? 'bg-[#7c32ff]/5' : ''}`}>
                                            <td className="px-6 py-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded text-[#7c32ff] focus:ring-[#7c32ff]"
                                                    checked={selectedStudentIds.includes(student._id)}
                                                    onChange={() => toggleStudent(student._id)}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{student.admissionNumber}</td>
                                            <td className="px-6 py-4 text-slate-700">{student.firstName} {student.lastName}</td>
                                            <td className="px-6 py-4 text-slate-500">{student.fatherName || '-'}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded text-[10px] uppercase font-black">Pass</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Ready</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default StudentPromote;
