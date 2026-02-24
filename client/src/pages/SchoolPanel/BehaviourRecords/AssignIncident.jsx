import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Check, Loader2, AlertTriangle } from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';
import api from '../../../api/api';

const Select = ({ label, name, value, onChange, options, placeholder, required }) => (
    <div className="space-y-2 group">
        {label && (
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none shadow-sm h-[46px]"
            >
                <option value="">{placeholder}</option>
                {options.map((opt, i) => (
                    <option key={i} value={opt.value || opt}>{opt.label || opt}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-primary transition-colors" size={14} />
        </div>
    </div>
);

const AssignIncident = () => {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [saving, setSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [filters, setFilters] = useState({ classId: '', section: '' });
    const [form, setForm] = useState({
        category: '',
        description: '',
        status: 'Open',
        date: new Date().toISOString().split('T')[0]
    });

    const fetchClasses = async () => {
        try {
            const { data } = await api.get('/api/academic/classes');
            setClasses(data);
        } catch (err) {
            console.error('Fetch classes error:', err);
        }
    };

    const fetchStudents = async (classId, section) => {
        if (!classId) return;
        setLoadingStudents(true);
        try {
            const params = { classId };
            if (section) params.section = section;
            const { data } = await api.get('/api/students', { params });
            setStudents(data);
        } catch (err) {
            console.error('Fetch students error:', err);
            setStudents([]);
        } finally {
            setLoadingStudents(false);
        }
    };

    useEffect(() => { fetchClasses(); }, []);

    // When class changes — update sections and fetch students for that class
    useEffect(() => {
        if (!filters.classId) { setSections([]); setStudents([]); return; }
        const cls = classes.find(c => c._id === filters.classId);
        setSections(cls?.sections || []);
        setSelectedStudent(null);
        fetchStudents(filters.classId, ''); // reset section on class change
    }, [filters.classId, classes]);

    // When section changes — re-fetch with the new section
    useEffect(() => {
        if (!filters.classId) return;
        setSelectedStudent(null);
        fetchStudents(filters.classId, filters.section);
    }, [filters.section]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!selectedStudent) { alert('Please select a student'); return; }
        if (!form.category || !form.description) { alert('Category and description are required'); return; }
        setSaving(true);
        try {
            await api.post('/api/discipline', {
                student: selectedStudent._id,
                class: filters.classId,
                category: form.category,
                description: form.description,
                date: form.date,
                status: form.status
            });
            alert('Incident assigned successfully!');
            setSelectedStudent(null);
            setForm({ category: '', description: '', status: 'Open', date: new Date().toISOString().split('T')[0] });
        } catch (err) {
            alert(err?.response?.data?.message || 'Failed to assign incident');
        } finally {
            setSaving(false);
        }
    };

    const filteredStudents = students.filter(s => {
        const name = `${s.firstName} ${s.lastName}`.toLowerCase();
        const adm = (s.admissionNumber || '').toLowerCase();
        const q = searchTerm.toLowerCase();
        return name.includes(q) || adm.includes(q);
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <h1 className="text-xl font-black text-slate-800 tracking-tight">Assign Incident</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer">Behaviour Records</span>
                    <span>|</span>
                    <span className="text-slate-500">Assign Incident</span>
                </div>
            </div>

            <div className="px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Incident Form */}
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px] h-fit">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">Incident Details</h3>

                    {selectedStudent ? (
                        <div className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Selected Student</p>
                            <p className="text-sm font-black text-slate-700">{selectedStudent.firstName} {selectedStudent.lastName}</p>
                            <p className="text-xs text-slate-400">{selectedStudent.admissionNumber}</p>
                            <button onClick={() => setSelectedStudent(null)} className="mt-2 text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest">
                                × Clear Selection
                            </button>
                        </div>
                    ) : (
                        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start space-x-3">
                            <AlertTriangle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-relaxed">Select a student from the list on the right</p>
                        </div>
                    )}

                    <div className="space-y-6">
                        <Select
                            label="CATEGORY"
                            name="category"
                            value={form.category}
                            onChange={handleFormChange}
                            placeholder="Select Category *"
                            options={['Uniform', 'Behavior', 'Late', 'Homework', 'Other'].map(c => ({ value: c, label: c }))}
                            required
                        />
                        <Select
                            label="STATUS"
                            name="status"
                            value={form.status}
                            onChange={handleFormChange}
                            placeholder="Select Status"
                            options={['Open', 'Under Review', 'Action Taken', 'Closed'].map(s => ({ value: s, label: s }))}
                        />
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">DATE</label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleFormChange}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm h-[46px]"
                            />
                        </div>
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">DESCRIPTION *</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleFormChange}
                                placeholder="Describe the incident…"
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 min-h-[100px] resize-none"
                            />
                        </div>
                        <Button
                            onClick={handleSubmit}
                            disabled={saving || !selectedStudent}
                            className="w-full bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all disabled:opacity-40"
                        >
                            {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} strokeWidth={3} />}
                            <span>ASSIGN INCIDENT</span>
                        </Button>
                    </div>
                </Card>

                {/* Student Picker */}
                <Card className="lg:col-span-2 p-10 border-none shadow-snow-lg bg-white rounded-[40px] overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Select Student</h3>
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="relative min-w-[140px]">
                                <select
                                    name="classId"
                                    value={filters.classId}
                                    onChange={handleFilterChange}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-[10px] font-black tracking-widest text-slate-600 focus:ring-2 focus:ring-primary/10 outline-none appearance-none h-[42px]"
                                >
                                    <option value="">Select Class</option>
                                    {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={12} />
                            </div>
                            <div className="relative min-w-[120px]">
                                <select
                                    name="section"
                                    value={filters.section}
                                    onChange={handleFilterChange}
                                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-[10px] font-black tracking-widest text-slate-600 focus:ring-2 focus:ring-primary/10 outline-none appearance-none h-[42px]"
                                >
                                    <option value="">All Sections</option>
                                    {sections.length > 0
                                        ? sections.map(s => <option key={s} value={s}>{s}</option>)
                                        : ['A', 'B', 'C', 'D', 'E'].map(s => <option key={s} value={s}>{s}</option>)
                                    }
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={12} />
                            </div>
                            <div className="relative flex-1 min-w-[160px]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={13} strokeWidth={3} />
                                <input
                                    type="text"
                                    placeholder="SEARCH"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-2xl pl-10 pr-4 py-3 text-[10px] font-black tracking-widest text-slate-600 focus:ring-2 focus:ring-primary/10 outline-none placeholder:text-slate-300 h-[42px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto min-h-[400px]">
                        {loadingStudents ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="animate-spin text-primary" size={24} />
                            </div>
                        ) : !filters.classId ? (
                            <div className="py-20 text-center text-xs font-black text-slate-300 uppercase tracking-widest italic">
                                Select a class to view students
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        {['↓ ADM NO', '↓ NAME', '↓ CLASS', '↓ GENDER', '↓ PHONE', '↓ SELECT'].map((h, i) => (
                                            <th key={i} className={`py-5 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ${i === 5 ? 'text-center last:rounded-r-2xl' : 'text-left first:rounded-l-2xl'}`}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredStudents.length > 0 ? filteredStudents.map(s => (
                                        <tr
                                            key={s._id}
                                            className={`group transition-colors cursor-pointer ${selectedStudent?._id === s._id ? 'bg-primary/5' : 'hover:bg-slate-50/50'}`}
                                            onClick={() => setSelectedStudent(s)}
                                        >
                                            <td className="py-4 px-4 text-xs font-bold text-slate-600">{s.admissionNumber || '-'}</td>
                                            <td className="py-4 px-4 text-xs font-semibold text-slate-700">{s.firstName} {s.lastName}</td>
                                            <td className="py-4 px-4 text-xs text-slate-400">{s.class?.name || '-'}</td>
                                            <td className="py-4 px-4 text-xs text-slate-400">{s.gender || '-'}</td>
                                            <td className="py-4 px-4 text-xs text-slate-400">{s.phone || '-'}</td>
                                            <td className="py-4 px-4 text-center">
                                                <div className={`w-5 h-5 rounded-full mx-auto border-2 transition-all flex items-center justify-center ${selectedStudent?._id === s._id ? 'bg-primary border-primary' : 'border-slate-200 group-hover:border-primary/50'}`}>
                                                    {selectedStudent?._id === s._id && <Check size={10} className="text-white" strokeWidth={4} />}
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="py-20 text-center text-xs font-black text-slate-300 uppercase tracking-widest italic">
                                                No Students Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="mt-8 px-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total {filteredStudents.length} students</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AssignIncident;
