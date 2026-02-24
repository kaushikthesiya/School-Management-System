import React, { useState } from 'react';
import {
    Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, Trash2, Save, CheckCircle2
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

const MarksRegister = () => {
    const [showResults, setShowResults] = useState(false);
    const [students] = useState([
        { id: 1, admissionNo: '2024-001', name: 'John Doe', roll: '101' },
        { id: 2, admissionNo: '2024-002', name: 'Jane Smith', roll: '102' },
        { id: 3, admissionNo: '2024-003', name: 'Mike Johnson', roll: '103' },
    ]);
    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Marks Register</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Examination</span>
                    <span>|</span>
                    <span className="text-slate-500">Marks Register</span>
                </div>
            </div>

            <div className="px-4">
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px]">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">
                        Select Criteria
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <Select label="EXAM" placeholder="Select Exam *" options={['1st Term', 'Final Exam']} required />
                        <Select label="CLASS" placeholder="Select Class *" options={['Class 1', 'Class 2']} required />
                        <Select label="SECTION" placeholder="Select Section *" options={['A', 'B']} required />
                        <Select label="SUBJECT" placeholder="Select Subject *" options={['Mathematics', 'Science']} required />
                        <div className="md:col-span-4 flex justify-end mt-4">
                            <Button
                                onClick={() => setShowResults(true)}
                                className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all"
                            >
                                <Search size={14} strokeWidth={3} />
                                <span>SEARCH</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {showResults && (
                    <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px] animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest italic">
                                Student Marks Entry
                            </h3>
                            <Button
                                onClick={() => { /* Save logic */ }}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                            >
                                <Save size={14} strokeWidth={3} />
                                <span>SAVE MARKS REGISTER</span>
                            </Button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest first:rounded-l-2xl">↓ ADMISSION NO</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ STUDENT NAME</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ ROLL NO</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest w-32">↓ MARKS (40)</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest w-32">↓ ATTENDANCE</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest last:rounded-r-2xl">↓ NOTE</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {students.map((student) => (
                                        <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 px-6 text-[11px] font-bold text-slate-600 tracking-tight">{student.admissionNo}</td>
                                            <td className="py-6 px-6 text-[11px] font-bold text-slate-600 tracking-tight">{student.name}</td>
                                            <td className="py-6 px-6 text-[11px] font-bold text-slate-500 tracking-tight">{student.roll}</td>
                                            <td className="py-6 px-6">
                                                <input
                                                    type="number"
                                                    placeholder="0.00"
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[11px] font-bold text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-200"
                                                />
                                            </td>
                                            <td className="py-6 px-6">
                                                <select className="w-full bg-slate-50 border-none rounded-xl px-3 py-2 text-[11px] font-bold text-slate-500 outline-none focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer">
                                                    <option>P</option>
                                                    <option>A</option>
                                                    <option>L</option>
                                                </select>
                                            </td>
                                            <td className="py-6 px-6">
                                                <input
                                                    type="text"
                                                    placeholder="Add note..."
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[11px] font-bold text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-200"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-16 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-3 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all">
                                <CheckCircle2 size={16} strokeWidth={3} />
                                <span>CONFIRM AND FINAL SAVE REGISTER</span>
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default MarksRegister;
