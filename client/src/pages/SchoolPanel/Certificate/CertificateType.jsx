import React, { useState } from 'react';
import {
    Search, ChevronDown, Plus, Download, Printer,
    FileText, LayoutGrid, Trash2, Edit
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
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none shadow-sm h-[46px]"
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

const Input = ({ label, name, value, onChange, placeholder, required }) => (
    <div className="space-y-2">
        {label && (
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300"
        />
    </div>
);

const CertificateType = () => {
    const [formData, setFormData] = useState({
        name: '',
        applicableFor: '',
        shortCode: ''
    });

    const [certificateTypes] = useState([
        { id: 1, name: 'Exam Certificate', role: 'Student' },
        { id: 2, name: 'Experience Certificate', role: 'Employee' },
        { id: 3, name: 'Extra Curricular Activities Certificate', role: 'Student' },
        { id: 4, name: 'NOC', role: 'Employee' },
        { id: 5, name: 'Staff Character Certificate', role: 'Employee' },
        { id: 6, name: 'Student Character Certificate', role: 'Student' },
        { id: 7, name: 'Transfer Certificate', role: 'Student' },
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Certificate Type</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Certificate</span>
                    <span>|</span>
                    <span className="text-slate-500">Certificate Type</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4">
                {/* Add Certificate Type Form */}
                <div className="lg:col-span-4">
                    <Card className="p-8 border-none shadow-snow-lg bg-white rounded-3xl h-full">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">
                            Add Certificate Type
                        </h3>

                        <div className="space-y-6">
                            <Input
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Certificate Type"
                                required
                            />

                            <Select
                                label="APPLICABLE FOR"
                                name="applicableFor"
                                value={formData.applicableFor}
                                onChange={handleChange}
                                options={[
                                    { label: 'Student', value: 'student' },
                                    { label: 'Employee', value: 'employee' }
                                ]}
                                placeholder="Applicable For"
                                required
                            />

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    SHORT CODE <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="selectAll"
                                        className="w-4 h-4 rounded-md border-slate-200 text-primary focus:ring-primary/20"
                                    />
                                    <label htmlFor="selectAll" className="text-xs font-medium text-slate-400">Select All</label>
                                </div>
                                <div className="h-px bg-slate-100" />
                            </div>

                            <div className="flex justify-center pt-4">
                                <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-10 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                                    <span>✓ SAVE CERTIFICATE</span>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Certificate Types List */}
                <div className="lg:col-span-8">
                    <Card className="p-8 border-none shadow-snow-lg bg-white rounded-3xl">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">
                                Certificate Types List
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="relative group flex-1 md:w-64">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={14} strokeWidth={3} />
                                    <input
                                        type="text"
                                        placeholder="SEARCH"
                                        className="w-full bg-slate-50 border-none rounded-2xl pl-11 pr-4 py-3 text-[10px] font-black tracking-widest text-slate-600 focus:ring-2 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-300"
                                    />
                                </div>
                                <div className="flex items-center p-1 bg-slate-50 rounded-2xl">
                                    {[Download, Printer, FileText, LayoutGrid].map((Icon, i) => (
                                        <button key={i} className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-400 hover:text-primary transition-all">
                                            <Icon size={14} strokeWidth={3} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-50">
                                        <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1">
                                                <span>↓ Name</span>
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1">
                                                <span>↓ Role</span>
                                            </div>
                                        </th>
                                        <th className="text-right py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1 justify-end">
                                                <span>↓ Action</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {certificateTypes.map((item) => (
                                        <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-4">
                                                <span className="text-xs font-bold text-slate-600">{item.name}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-xs font-medium text-slate-400">{item.role}</span>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="relative inline-block text-left">
                                                    <button className="flex items-center space-x-2 bg-white border border-slate-200 rounded-full pl-6 pr-2 py-1.5 text-[10px] font-black text-slate-400 hover:text-primary hover:border-primary transition-all group/btn shadow-sm active:scale-95">
                                                        <span className="uppercase tracking-widest">SELECT</span>
                                                        <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-primary/5 transition-colors">
                                                            <ChevronDown size={14} className="group-hover/btn:text-primary transition-colors" />
                                                        </div>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10 px-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Showing 1 to 7 of 7 entries
                            </p>
                            <div className="flex items-center space-x-3">
                                <button className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm active:scale-90">
                                    <ChevronDown size={14} className="rotate-90" />
                                </button>
                                <button className="w-10 h-10 rounded-2xl bg-primary text-white text-[10px] font-black shadow-lg shadow-primary/30 active:scale-90 transition-all">
                                    1
                                </button>
                                <button className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm active:scale-90">
                                    <ChevronDown size={14} className="-rotate-90" />
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CertificateType;
