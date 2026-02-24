import React, { useState } from 'react';
import {
    Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, Trash2, Award, User, CheckCircle2, XCircle
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

const ExamReport = () => {
    const [showResults, setShowResults] = useState(false);
    const [reports] = useState([
        { id: 1, admissionNo: '2024-001', name: 'John Doe', roll: '101', totalMarks: '450/500', grade: 'A+', position: '1st', result: 'Pass' },
        { id: 2, admissionNo: '2024-002', name: 'Jane Smith', roll: '102', totalMarks: '420/500', grade: 'A', position: '2nd', result: 'Pass' },
        { id: 3, admissionNo: '2024-003', name: 'Mike Johnson', roll: '103', totalMarks: '380/500', grade: 'B', position: '5th', result: 'Pass' },
    ]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic">Exam Report / Report Cards</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Examination</span>
                    <span>|</span>
                    <span className="text-slate-500">Exam Report</span>
                </div>
            </div>

            <div className="px-4 space-y-8">
                {/* Criteria Card */}
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px]">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8 italic">
                        Select Criteria
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <Select label="EXAM" placeholder="Select Exam *" options={['1st Term', 'Final Exam']} required />
                        <Select label="CLASS" placeholder="Select Class *" options={['Class 1', 'Class 2']} required />
                        <Select label="SECTION" placeholder="Select Section *" options={['A', 'B']} required />
                        <div className="flex justify-end mt-4">
                            <Button
                                onClick={() => setShowResults(true)}
                                className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all w-full"
                            >
                                <Search size={14} strokeWidth={3} />
                                <span>SEARCH REPORT</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {showResults && (
                    <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px] animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center space-x-4">
                                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest italic">
                                    Student Exam Statistics
                                </h3>
                                <div className="px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">1st Term - Class 1(A)</p>
                                </div>
                            </div>
                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-emerald-500/20">
                                <Printer size={14} strokeWidth={3} />
                                <span>PRINT ALL REPORT CARDS</span>
                            </Button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest first:rounded-l-2xl">↓ ADMISSION NO</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ STUDENT NAME</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ ROLL NO</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ TOTAL MARKS</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ AVG GRADE</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ POSITION</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ RESULT</th>
                                        <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest last:rounded-r-2xl">↓ ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {reports.map((student) => (
                                        <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 px-6 text-[11px] font-bold text-slate-600 tracking-tight">{student.admissionNo}</td>
                                            <td className="py-6 px-6 text-[11px] font-bold text-slate-600 tracking-tight">{student.name}</td>
                                            <td className="py-6 px-6 text-[11px] font-bold text-slate-500 tracking-tight">{student.roll}</td>
                                            <td className="py-6 px-6 text-[11px] font-bold text-slate-600 tracking-tight">{student.totalMarks}</td>
                                            <td className="py-6 px-6">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <span className="text-[10px] font-black text-primary">{student.grade}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-6 px-6">
                                                <div className="flex items-center space-x-2 text-[11px] font-bold text-amber-600 italic">
                                                    <Award size={14} />
                                                    <span>{student.position}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 px-6">
                                                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full w-fit ${student.result === 'Pass' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                                    {student.result === 'Pass' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{student.result}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 px-6 text-right">
                                                <button className="p-3 hover:bg-primary/10 hover:text-primary rounded-xl text-slate-300 transition-all active:scale-90 group-hover:text-slate-400">
                                                    <Printer size={16} strokeWidth={2.5} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default ExamReport;
