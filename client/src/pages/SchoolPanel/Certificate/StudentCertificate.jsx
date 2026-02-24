import React, { useState } from 'react';
import {
    ChevronDown, Search
} from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';

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
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none shadow-sm h-[50px]"
            >
                <option value="">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-primary transition-colors" size={14} />
        </div>
    </div>
);

const StudentCertificate = () => {
    const [filters, setFilters] = useState({
        class: '',
        section: '',
        exam: '',
        certificate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Generate Certificate</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Certificate</span>
                    <span>|</span>
                    <span className="text-slate-500">Generate Certificate</span>
                </div>
            </div>

            {/* Select Criteria Card */}
            <div className="px-4">
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-3xl">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-10">
                        Select Criteria
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <Select
                            label="CLASS"
                            name="class"
                            value={filters.class}
                            onChange={handleChange}
                            options={['Class 1', 'Class 2', 'Class 3']}
                            placeholder="Select Class"
                            required
                        />
                        <Select
                            label="SECTION"
                            name="section"
                            value={filters.section}
                            onChange={handleChange}
                            options={['A', 'B', 'C']}
                            placeholder="Select Section"
                            required
                        />
                        <Select
                            label="EXAM"
                            name="exam"
                            value={filters.exam}
                            onChange={handleChange}
                            options={['First Term', 'Half Yearly', 'Annual']}
                            placeholder="Select Exam"
                        />
                        <Select
                            label="CERTIFICATE"
                            name="certificate"
                            value={filters.certificate}
                            onChange={handleChange}
                            options={['Transfer Certificate', 'Character Certificate', 'Annual Exam Certificate']}
                            placeholder="Select Certificate"
                            required
                        />
                    </div>

                    <div className="flex justify-end mt-10">
                        <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-10 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-xl shadow-purple-500/20 active:scale-95 transition-all">
                            <Search size={14} strokeWidth={3} />
                            <span>SEARCH</span>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default StudentCertificate;
