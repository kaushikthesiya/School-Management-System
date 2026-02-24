import React, { useState } from 'react';
import { Card, Button } from '../../../components/SnowUI';
import {
    Search,
    ChevronDown
} from 'lucide-react';

const StudentAttendanceReport = () => {
    const [filters, setFilters] = useState({
        class: '',
        section: '',
        month: 'February',
        year: '2026'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const Select = ({ name, value, onChange, options, placeholder }) => (
        <div className="relative group">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none shadow-sm"
            >
                <option value="">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-primary transition-colors" size={14} />
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Student Attendance Report</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Biometrics</span>
                    <span>|</span>
                    <span className="text-slate-500">Student Attendance Report</span>
                </div>
            </div>

            {/* Select Criteria Section */}
            <div className="px-4 space-y-4">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    Select Criteria
                </h3>
                <Card className="p-8 border-none shadow-snow-lg bg-white rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-1.5">
                            <Select
                                name="class"
                                value={filters.class}
                                onChange={handleChange}
                                options={[]}
                                placeholder="Select Class *"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Select
                                name="section"
                                value={filters.section}
                                onChange={handleChange}
                                options={[]}
                                placeholder="Select Section *"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Select
                                name="month"
                                value={filters.month}
                                onChange={handleChange}
                                options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                                placeholder="Select Month"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Select
                                name="year"
                                value={filters.year}
                                onChange={handleChange}
                                options={['2026', '2025', '2024']}
                                placeholder="Select Year"
                            />
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
        </div>
    );
};

export default StudentAttendanceReport;
