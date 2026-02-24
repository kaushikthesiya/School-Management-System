import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../../components/SnowUI';
import {
    Search,
    Calendar,
    ChevronDown,
    Filter,
    Plus
} from 'lucide-react';
import api from '../../api/api';

const StudentAttendance = () => {
    const [classes, setClasses] = useState([]);
    const [filters, setFilters] = useState({
        class: '',
        section: '',
        date: '2026-02-18'
    });

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await api.get('/academic/classes');
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
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Student Attendance</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Student Info</span>
                        <span>|</span>
                        <span className="text-[#7c32ff]">Student Attendance</span>
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="space-y-1.5">
                        <Label required>CLASS</Label>
                        <Select name="class" value={filters.class} onChange={handleChange} options={classes.map(c => ({ value: c._id, label: c.name }))} placeholder="Select Class *" required />
                    </div>
                    <div className="space-y-1.5">
                        <Label required>SECTION</Label>
                        <Select name="section" value={filters.section} onChange={handleChange} options={['A', 'B', 'C']} placeholder="Select Section *" required />
                    </div>
                    <div className="space-y-1.5">
                        <Label required>Attendance Date</Label>
                        <Input type="date" name="date" value={filters.date} onChange={handleChange} className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold w-full" required />
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                        <Search size={14} strokeWidth={3} />
                        <span>SEARCH</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default StudentAttendance;
