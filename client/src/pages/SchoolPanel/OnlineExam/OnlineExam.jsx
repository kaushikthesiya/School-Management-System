import React, { useState } from 'react';
import {
    Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, Trash2, Plus, Clock, Calendar, CheckSquare
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

const Input = ({ label, name, value, onChange, placeholder, required, type = "text" }) => (
    <div className="space-y-2 group">
        {label && (
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 h-[46px]"
        />
    </div>
);

const OnlineExam = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openActionId, setOpenActionId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        class: '',
        subject: '',
        section: '',
        date: '2026-03-19',
        endDate: '2026-03-19',
        startTime: '15:55',
        endTime: '14:55',
        minPercentage: '',
        instruction: ''
    });

    const [exams] = useState([
        { title: 'After these in. But I will.', class: 'Class 1(A)', subject: 'statistics', date: '19th Feb, 2026', time: '11:00 PM-11:00 AM', duration: '-1260', minPer: '50', status: 'PUBLISHED' },
        { title: 'Alice a well-What also.', class: 'Class 4(E)', subject: 'chemistry', date: '19th Feb, 2026', time: '11:00 PM-11:00 AM', duration: '-1260', minPer: '50', status: 'PUBLISHED' },
        { title: 'Alice added them word with a.', class: 'Class 2(C)', subject: 'ict', date: '19th Feb, 2026', time: '11:00 PM-11:00 AM', duration: '-1260', minPer: '50', status: 'PUBLISHED' },
        { title: 'Alice as she could remember.', class: 'Class 4(F)', subject: 'bangla', date: '19th Feb, 2026', time: '11:00 PM-11:00 AM', duration: '-1260', minPer: '50', status: 'PUBLISHED' },
        { title: 'Alice as the after-time, he.', class: 'Class 2(A)', subject: 'networking', date: '19th Feb, 2026', time: '11:00 PM-11:00 AM', duration: '-1260', minPer: '50', status: 'PUBLISHED' },
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic">Offline Exam</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Offline Exam</span>
                    <span>|</span>
                    <span className="text-slate-500 italic">Offline Exam</span>
                </div>
            </div>

            <div className="px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Online Exam Card */}
                <Card className="lg:col-span-4 p-10 border-none shadow-snow-lg bg-white rounded-[40px] h-fit">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8 italic">
                        Add Offline Exam
                    </h3>
                    <div className="space-y-6">
                        <Input
                            label="EXAM TITLE *"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="EXAM TITLE *"
                            required
                        />
                        <Select
                            label="CLASS *"
                            name="class"
                            value={formData.class}
                            onChange={handleInputChange}
                            placeholder="Select Class *"
                            options={['Class 1', 'Class 2']}
                            required
                        />
                        <Select
                            label="SUBJECT *"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Select Subjects *"
                            options={['Math', 'English']}
                            required
                        />
                        <Select
                            label="SECTION *"
                            name="section"
                            value={formData.section}
                            onChange={handleInputChange}
                            placeholder="Select"
                            options={['A', 'B']}
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="DATE *" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
                            <Input label="END DATE *" name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="START TIME *" name="startTime" type="time" value={formData.startTime} onChange={handleInputChange} required />
                            <Input label="END TIME *" name="endTime" type="time" value={formData.endTime} onChange={handleInputChange} required />
                        </div>
                        <Input
                            label="MINIMUM PERCENTAGE *"
                            name="minPercentage"
                            value={formData.minPercentage}
                            onChange={handleInputChange}
                            placeholder="MINIMUM PERCENTAGE *"
                            required
                        />
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                INSTRUCTION *
                            </label>
                            <textarea
                                name="instruction"
                                value={formData.instruction}
                                onChange={handleInputChange}
                                placeholder="INSTRUCTION *"
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 min-h-[120px] resize-none"
                                required
                            />
                        </div>

                        <div className="flex items-center space-x-3 ml-1">
                            <div className="w-4 h-4 rounded-full border-2 border-slate-200 flex items-center justify-center cursor-pointer">
                                <div className="w-2 h-2 rounded-full border border-slate-300" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Auto Mark Register <span className="normal-case">(Only For Multiple)</span>
                            </span>
                        </div>

                        <div className="flex justify-center pt-6">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all w-full">
                                <span>✓ SAVE ONLINE EXAM</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Online Exam List Card */}
                <Card className="lg:col-span-8 p-10 border-none shadow-snow-lg bg-white rounded-[40px] overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest italic">
                            Offline Exam List
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="relative group flex-1 md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={12} strokeWidth={3} />
                                <input
                                    type="text"
                                    placeholder="QUICK SEARCH"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-2xl pl-11 pr-4 py-3 text-[10px] font-black tracking-widest text-slate-600 focus:ring-2 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-300"
                                />
                            </div>
                            <div className="flex items-center p-1 bg-slate-50 rounded-2xl">
                                {[Download, Printer, FileText, LayoutGrid, CheckSquare, Calendar].map((Icon, i) => (
                                    <button key={i} className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-400 hover:text-primary transition-all">
                                        <Icon size={12} strokeWidth={3} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto min-h-[500px]">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest first:rounded-l-2xl whitespace-nowrap">
                                        ↓ Title
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                        ↓ Class (Sec.)
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                        ↓ Subject
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                        ↓ Exam Date
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                        ↓ Duration
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                        ↓ Minimum Percentage
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                        ↓ Status
                                    </th>
                                    <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest last:rounded-r-2xl whitespace-nowrap">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {exams.map((exam, idx) => (
                                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 px-6 text-slate-400 text-xs font-medium max-w-[150px] truncate">{exam.title}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs">{exam.class}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs">{exam.subject}</td>
                                        <td className="py-6 px-6">
                                            <div className="flex flex-col">
                                                <span className="text-slate-500 text-[10px] font-bold">{exam.date}</span>
                                                <span className="text-slate-400 text-[9px]">Time: {exam.time}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6 text-slate-400 text-xs font-bold">{exam.duration}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs font-bold">{exam.minPer}</td>
                                        <td className="py-6 px-6">
                                            <span className="px-5 py-1.5 bg-[#17c671] text-white text-[9px] font-black rounded-lg uppercase tracking-widest shadow-lg shadow-green-500/20">
                                                {exam.status}
                                            </span>
                                        </td>
                                        <td className="py-6 px-6 text-right relative">
                                            <div className="relative inline-block">
                                                <button
                                                    onClick={() => setOpenActionId(openActionId === idx ? null : idx)}
                                                    className={`flex items-center justify-between border-2 border-[#7c32ff]/20 text-[#7c32ff] rounded-full px-5 py-1.5 text-[9px] font-black transition-all group/btn w-[100px] ${openActionId === idx ? 'bg-[#7c32ff] text-white active:scale-95' : 'hover:border-[#7c32ff] hover:bg-slate-50'}`}
                                                >
                                                    <span className="uppercase tracking-widest">SELECT ↓</span>
                                                </button>

                                                {openActionId === idx && (
                                                    <>
                                                        <div className="fixed inset-0 z-10" onClick={() => setOpenActionId(null)} />
                                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-50 py-2 z-20 animate-in zoom-in-95 duration-200 origin-top-right">
                                                            <button className="w-full px-5 py-3 text-left text-[10px] font-black text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
                                                                <Edit size={14} className="text-slate-300" />
                                                                <span>Edit</span>
                                                            </button>
                                                            <button className="w-full px-5 py-3 text-left text-[10px] font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
                                                                <Trash2 size={14} className="text-red-300" />
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default OnlineExam;
