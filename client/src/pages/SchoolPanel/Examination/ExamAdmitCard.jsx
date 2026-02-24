import React, { useState } from 'react';
import {
    Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, Trash2, User, Calendar, MapPin, Clock, Shield, CheckCircle2
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

const ExamAdmitCard = () => {
    const [showResults, setShowResults] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const [students] = useState([
        { id: 1, admissionNo: '2024-001', name: 'John Doe', class: 'Class 1', section: 'A', fatherName: 'Robert Doe', gender: 'Male' },
        { id: 2, admissionNo: '2024-002', name: 'Jane Smith', class: 'Class 1', section: 'A', fatherName: 'William Smith', gender: 'Female' },
        { id: 3, admissionNo: '2024-003', name: 'Mike Johnson', class: 'Class 1', section: 'A', fatherName: 'Richard Johnson', gender: 'Male' },
    ]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Admit Card</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Exam Plan</span>
                    <span>|</span>
                    <span className="text-slate-500">Admit Card</span>
                </div>
            </div>

            <div className="px-4 space-y-8">
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px]">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8 italic">
                        Select Criteria
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <Select label="EXAM" placeholder="Select Exam *" options={['1st Term', 'Final Exam']} required />
                        <Select label="CLASS" placeholder="Select Class *" options={['Class 1', 'Class 2']} required />
                        <Select label="SECTION" placeholder="Select Section *" options={['A', 'B']} required />
                        <Select label="ADMIT CARD" placeholder="Select Admit Card *" options={['Standard Template', 'Premium Template']} required />
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
                                Student List
                            </h3>
                            <Button
                                onClick={() => setShowPreview(true)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
                            >
                                <Printer size={14} strokeWidth={3} />
                                <span>GENERATE ADMIT CARD</span>
                            </Button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="py-5 px-6 text-left first:rounded-l-2xl">
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={(e) => {
                                                    setSelectAll(e.target.checked);
                                                    setSelectedStudents(e.target.checked ? students.map(s => s.id) : []);
                                                }}
                                                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 transition-all cursor-pointer"
                                            />
                                        </th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ ADMISSION NO</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ STUDENT NAME</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ CLASS (SECTION)</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ FATHER NAME</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ GENDER</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {students.map((student) => (
                                        <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 px-6">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStudents.includes(student.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) setSelectedStudents([...selectedStudents, student.id]);
                                                        else setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                                                    }}
                                                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 transition-all cursor-pointer"
                                                />
                                            </td>
                                            <td className="py-6 px-6 text-[11px] font-bold text-slate-600 tracking-tight">{student.admissionNo}</td>
                                            <td className="py-6 px-6 text-[11px] font-bold text-slate-600 tracking-tight">{student.name}</td>
                                            <td className="py-6 px-6 text-[11px] font-bold text-slate-500 tracking-tight">{student.class} ({student.section})</td>
                                            <td className="py-6 px-6 text-[11px] font-bold text-slate-500 tracking-tight">{student.fatherName}</td>
                                            <td className="py-6 px-6 text-[11px] font-bold text-slate-500 tracking-tight">{student.gender}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>

            {/* Admit Card Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-12 bg-white rounded-[40px] shadow-2xl relative">
                        <button
                            onClick={() => setShowPreview(false)}
                            className="absolute right-8 top-8 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>

                        <div className="space-y-12">
                            {/* Admit Card Layout Preview */}
                            <div className="border-[3px] border-double border-slate-200 p-10 rounded-[30px] bg-white relative overflow-hidden">
                                {/* Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none rotate-[-45deg]">
                                    <h1 className="text-9xl font-black uppercase">ADMIT CARD</h1>
                                </div>

                                <div className="relative z-10 space-y-8">
                                    <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8">
                                        <div className="flex items-center space-x-6">
                                            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                                                <Shield className="text-primary" size={40} />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black text-slate-800 tracking-tighter">ASPIRE INTERNATIONAL SCHOOL</h2>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quality Education for All</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <h3 className="text-lg font-black text-primary tracking-tight">ADMIT CARD</h3>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">1st Term Examination - 2026</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-12 gap-8">
                                        <div className="col-span-8 grid grid-cols-2 gap-y-6">
                                            {[
                                                { label: 'NAME', value: 'John Doe', icon: User },
                                                { label: 'ROLL NO', value: '101', icon: FileText },
                                                { label: 'ADMISSION NO', value: '2024-AD-001', icon: Shield },
                                                { label: 'CLASS (SECTION)', value: 'Class 1 (A)', icon: LayoutGrid },
                                                { label: 'EXAM CENTER', value: 'Aspire Campus - Block A', icon: MapPin },
                                                { label: 'GENDER', value: 'Male', icon: User }
                                            ].map((item, idx) => (
                                                <div key={idx} className="space-y-1">
                                                    <div className="flex items-center space-x-2 text-[8px] font-black text-slate-300 uppercase tracking-widest">
                                                        <item.icon size={10} />
                                                        <span>{item.label}</span>
                                                    </div>
                                                    <p className="text-xs font-black text-slate-700 uppercase">{item.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="col-span-4 flex justify-end">
                                            <div className="w-32 h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-300 space-y-2">
                                                <User size={30} strokeWidth={1} />
                                                <p className="text-[8px] font-black uppercase tracking-widest">Student Photograph</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-100 pt-8">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Exam Schedule</h4>
                                        <div className="grid grid-cols-4 gap-4">
                                            {[
                                                { date: '2026-03-15', time: '10:00 AM', subject: 'Mathematics' },
                                                { date: '2026-03-17', time: '10:00 AM', subject: 'English' },
                                                { date: '2026-03-19', time: '10:00 AM', subject: 'Science' },
                                                { date: '2026-03-21', time: '10:00 AM', subject: 'Social Studies' }
                                            ].map((exam, idx) => (
                                                <div key={idx} className="bg-slate-50/50 p-4 rounded-2xl space-y-2 group hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
                                                    <div className="flex items-center space-x-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                                                        <Calendar size={10} />
                                                        <span>{exam.date}</span>
                                                    </div>
                                                    <h5 className="text-[10px] font-black text-slate-700 uppercase truncate">{exam.subject}</h5>
                                                    <div className="flex items-center space-x-2 text-[8px] font-black text-primary uppercase tracking-widest">
                                                        <Clock size={10} />
                                                        <span>{exam.time}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end pt-12">
                                        <div className="space-y-2">
                                            <div className="w-32 h-1 bg-slate-100"></div>
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Class Teacher's Signature</p>
                                        </div>
                                        <div className="space-y-2 text-right">
                                            <div className="w-32 h-1 bg-slate-100 ml-auto"></div>
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Principal's Signature</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center space-x-4 pt-4">
                                <Button
                                    onClick={() => setShowPreview(false)}
                                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl px-12 py-4 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                                >
                                    <span>CANCEL</span>
                                </Button>
                                <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all">
                                    <Printer size={14} strokeWidth={3} />
                                    <span>PRINT NOW</span>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ExamAdmitCard;
