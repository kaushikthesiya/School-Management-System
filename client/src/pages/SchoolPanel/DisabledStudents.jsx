import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../../components/SnowUI';
import {
    Search,
    ChevronDown,
    Filter,
    Printer,
    Columns,
    ArrowUpDown,
    Copy,
    FileSpreadsheet,
    FileText,
    FileCode,
    CheckCircle2
} from 'lucide-react';
import api from '../../api/api';
import { useToast } from '../../context/ToastContext';

const DisabledStudents = () => {
    const { showToast } = useToast();
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        class: '',
        section: '',
        name: '',
        admissionNo: ''
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            let query = `?status=false`;
            if (filters.class) query += `&classId=${filters.class}`;
            if (filters.section) query += `&section=${filters.section}`;
            if (filters.name) query += `&search=${filters.name}`;
            if (filters.admissionNo) query += `&search=${filters.admissionNo}`;

            const res = await api.get(`/api/students${query}`);
            setStudents(res.data);
        } catch (error) {
            console.error('Error fetching disabled students:', error);
            showToast('Error fetching students', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleEnable = async (id) => {
        if (!window.confirm('Are you sure you want to enable this student?')) return;
        try {
            await api.patch(`/api/students/${id}/toggle-status`);
            showToast('Student enabled successfully!');
            handleSearch(); // Refresh list
        } catch (error) {
            console.error('Error enabling student:', error);
            showToast('Error enabling student', 'error');
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
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Disabled Students</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Student Info</span>
                        <span>|</span>
                        <span className="text-[#7c32ff]">Disabled Students</span>
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
                        <Label required>CLASS</Label>
                        <Select name="class" value={filters.class} onChange={handleChange} options={classes.map(c => ({ value: c._id, label: c.name }))} placeholder="Select Class" />
                    </div>
                    <div className="space-y-1.5">
                        <Label>SECTION</Label>
                        <Select name="section" value={filters.section} onChange={handleChange} options={['A', 'B', 'C']} placeholder="Select Section" />
                    </div>
                    <div className="space-y-1.5">
                        <Label>SEARCH BY NAME</Label>
                        <Input name="name" value={filters.name} onChange={handleChange} placeholder="Search by name" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                    </div>
                    <div className="space-y-1.5">
                        <Label>SEARCH BY ADMISSION NO</Label>
                        <Input name="admissionNo" value={filters.admissionNo} onChange={handleChange} placeholder="Search by admission no" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
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

            {/* Disabled Students Table Card */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Disabled Students</h3>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                            <input
                                type="text"
                                placeholder="QUICK SEARCH"
                                className="pl-10 pr-4 py-2 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-500 outline-none focus:border-[#7c32ff] transition-all w-64 tracking-widest uppercase"
                            />
                        </div>

                        <div className="flex border border-purple-100 rounded-xl overflow-hidden shadow-sm">
                            {[Copy, FileSpreadsheet, FileText, FileCode, Printer, Columns].map((Icon, i) => (
                                <button key={i} className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors border-r border-purple-50 last:border-r-0">
                                    <Icon size={16} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                {['Admission No', 'Roll No', 'Name', 'Class', 'Father Name', 'Date Of Birth', 'Gender', 'Mobile', 'Actions'].map((header, idx) => (
                                    <th key={idx} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                        <div className="flex items-center space-x-2">
                                            <span>{header}</span>
                                            {header !== 'Actions' && <ArrowUpDown size={10} />}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <tr key={student._id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-6 py-5 text-xs font-bold text-slate-500">{student.admissionNumber}</td>
                                        <td className="px-6 py-5 text-xs font-bold text-slate-500">{student.roll || '-'}</td>
                                        <td className="px-6 py-5 text-xs font-bold text-slate-700">{student.firstName} {student.lastName}</td>
                                        <td className="px-6 py-5 text-xs font-bold text-slate-500">{student.class?.name} ({student.section})</td>
                                        <td className="px-6 py-5 text-xs font-bold text-slate-500">{student.fatherName || '-'}</td>
                                        <td className="px-6 py-5 text-xs font-bold text-slate-500">{student.dob ? new Date(student.dob).toLocaleDateString() : '-'}</td>
                                        <td className="px-6 py-5 text-xs font-bold text-slate-500">{student.gender}</td>
                                        <td className="px-6 py-5 text-xs font-bold text-slate-500">{student.phone || '-'}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleEnable(student._id)}
                                                    className="px-4 py-2 border border-emerald-100 rounded-full text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all flex items-center space-x-2"
                                                >
                                                    <CheckCircle2 size={12} />
                                                    <span>ENABLE</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="px-6 py-12 text-center text-xs font-bold text-slate-400 italic">
                                        {loading ? 'Searching...' : 'No disabled students found.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default DisabledStudents;
