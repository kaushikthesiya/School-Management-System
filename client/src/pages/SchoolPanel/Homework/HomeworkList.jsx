import React, { useState } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Search,
    Plus,
    ChevronDown,
    Copy,
    FileText,
    Download,
    Printer,
    Layout,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeworkList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const homeworks = [
        { id: 1, sl: 1, class: 'Class 5', section: 'E', subject: 'animi', marks: 10, hwDate: '17th Feb, 2026', subDate: '17th Feb, 2026', evalDate: '17th Feb, 2026', createdBy: 'Eldred' },
        { id: 2, sl: 2, class: 'Class 5', section: 'E', subject: 'voluptate', marks: 15, hwDate: '17th Feb, 2026', subDate: '17th Feb, 2026', evalDate: '17th Feb, 2026', createdBy: 'Eldred' },
        { id: 3, sl: 3, class: 'Class 5', section: 'E', subject: 'sed', marks: 12, hwDate: '17th Feb, 2026', subDate: '17th Feb, 2026', evalDate: '17th Feb, 2026', createdBy: 'Eldred' },
        { id: 4, sl: 4, class: 'Class 5', section: 'E', subject: 'eligendi', marks: 12, hwDate: '17th Feb, 2026', subDate: '17th Feb, 2026', evalDate: '17th Feb, 2026', createdBy: 'Eldred' },
        { id: 5, sl: 5, class: 'Class 5', section: 'E', subject: 'blanditiis', marks: 12, hwDate: '17th Feb, 2026', subDate: '17th Feb, 2026', evalDate: '17th Feb, 2026', createdBy: 'Eldred' },
        { id: 6, sl: 6, class: 'Class 5', section: 'E', subject: 'chemistry', marks: 15, hwDate: '17th Feb, 2026', subDate: '17th Feb, 2026', evalDate: '17th Feb, 2026', createdBy: 'Eldred' },
        { id: 7, sl: 7, class: 'Class 5', section: 'E', subject: 'Networking', marks: 11, hwDate: '17th Feb, 2026', subDate: '17th Feb, 2026', evalDate: '17th Feb, 2026', createdBy: 'Eldred' },
        { id: 8, sl: 8, class: 'Class 5', section: 'E', subject: 'Algorithms', marks: 12, hwDate: '17th Feb, 2026', subDate: '17th Feb, 2026', evalDate: '17th Feb, 2026', createdBy: 'Eldred' },
        { id: 9, sl: 9, class: 'Class 5', section: 'E', subject: 'Math', marks: 10, hwDate: '17th Feb, 2026', subDate: '17th Feb, 2026', evalDate: '17th Feb, 2026', createdBy: 'Eldred' },
        { id: 10, sl: 10, class: 'Class 5', section: 'E', subject: 'Bangla', marks: 12, hwDate: '17th Feb, 2026', subDate: '17th Feb, 2026', evalDate: '17th Feb, 2026', createdBy: 'Eldred' },
    ];

    const ActionIcon = ({ Icon }) => (
        <button className="p-2 rounded-lg text-slate-400 hover:text-[#7c32ff] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
            <Icon size={14} />
        </button>
    );

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1 italic">
            {children} {required && <span className="text-rose-500">*</span>}
        </label>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Homework List</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span>Homework</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Homework List</span>
                </div>
            </div>

            {/* Select Criteria */}
            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[40px] overflow-hidden relative">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest italic">Select Criteria</h3>
                    <Button onClick={() => navigate('/add-homework')} className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-6 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center space-x-2">
                        <Plus size={14} strokeWidth={3} />
                        <span>ADD HOMEWORK</span>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-end">
                    <div className="space-y-1">
                        <Label required>Class</Label>
                        <div className="relative group">
                            <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-[#7c32ff]/5 focus:border-[#7c32ff] transition-all appearance-none cursor-pointer italic">
                                <option value="">Select Class *</option>
                                <option>Class 5</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={18} />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label required>Section</Label>
                        <div className="relative group">
                            <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-[#7c32ff]/5 focus:border-[#7c32ff] transition-all appearance-none cursor-pointer italic">
                                <option value="">Select Section *</option>
                                <option>A</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={18} />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label required>Subject</Label>
                        <div className="relative group">
                            <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-[#7c32ff]/5 focus:border-[#7c32ff] transition-all appearance-none cursor-pointer italic">
                                <option value="">Select Subject *</option>
                                <option>Math</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={18} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-10">
                    <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-10 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center space-x-2">
                        <Search size={14} strokeWidth={3} />
                        <span>SEARCH</span>
                    </Button>
                </div>
            </Card>

            {/* Homework List Table */}
            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[40px] overflow-hidden relative">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest italic tracking-wider">Homework List</h3>

                    <div className="flex items-center space-x-6">
                        <div className="relative group">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="QUICK SEARCH"
                                className="bg-transparent border-b border-slate-100 py-2 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:border-[#7c32ff] transition-all w-64 italic"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-1 border border-purple-100 rounded-2xl p-1.5 bg-purple-50/30">
                            <ActionIcon Icon={Copy} />
                            <ActionIcon Icon={FileText} />
                            <ActionIcon Icon={Download} />
                            <ActionIcon Icon={Layout} />
                            <ActionIcon Icon={Printer} />
                            <ActionIcon Icon={Layout} />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-nowrap">
                        <thead>
                            <tr className="border-b border-slate-50 italic text-slate-400">
                                <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">↓SL</th>
                                <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">↓Class</th>
                                <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">↓Section</th>
                                <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">↓Subject</th>
                                <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">↓Marks</th>
                                <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">↓Homework Date</th>
                                <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">↓Submission Date</th>
                                <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">↓Evaluation Date</th>
                                <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">↓Created By</th>
                                <th className="text-right py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {homeworks.map((hw) => (
                                <tr key={hw.id} className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                    <td className="py-5 px-4 text-[11px] font-bold text-slate-400 italic tabular-nums">{hw.sl}</td>
                                    <td className="py-5 px-4 text-[11px] font-bold text-slate-600 italic">{hw.class}</td>
                                    <td className="py-5 px-4 text-[11px] font-bold text-slate-400 italic font-mono">{hw.section}</td>
                                    <td className="py-5 px-4 text-[11px] font-bold text-slate-600 italic tracking-tight">{hw.subject}</td>
                                    <td className="py-5 px-4 text-[11px] font-bold text-slate-500 italic tabular-nums">{hw.marks}</td>
                                    <td className="py-5 px-4 text-[10px] font-black text-slate-400 uppercase italic text-nowrap">{hw.hwDate}</td>
                                    <td className="py-5 px-4 text-[10px] font-black text-slate-400 uppercase italic text-nowrap">{hw.subDate}</td>
                                    <td className="py-5 px-4 text-[10px] font-black text-emerald-500 uppercase italic text-nowrap">{hw.evalDate}</td>
                                    <td className="py-5 px-4 text-[11px] font-bold text-slate-600 italic tracking-tight">{hw.createdBy}</td>
                                    <td className="py-5 px-4 text-right">
                                        <button className="bg-white border-2 border-purple-100 text-[#7c32ff] rounded-full px-6 py-1.5 text-[9px] font-black uppercase tracking-[0.1em] hover:bg-[#7c32ff] hover:text-white hover:border-[#7c32ff] transition-all flex items-center space-x-2 inline-flex active:scale-95 shadow-sm shadow-purple-500/5">
                                            <span>SELECT</span>
                                            <ChevronDown size={12} strokeWidth={3} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest italic space-y-6 md:space-y-0">
                    <span>Showing 1 to 10 of 500 entries</span>
                    <div className="flex items-center space-x-3">
                        <button className="p-2 rounded-xl text-slate-300 hover:text-[#7c32ff] transition-all border border-transparent hover:border-slate-50">
                            <ChevronLeft size={16} />
                        </button>
                        {[1, 2, 3, 4, 5].map(p => (
                            <button key={p} className={`w-9 h-9 rounded-xl font-black text-xs transition-all flex items-center justify-center ${p === 1 ? 'bg-[#7c32ff] text-white shadow-xl shadow-purple-500/30' : 'text-slate-400 hover:bg-slate-50 border border-slate-100'}`}>
                                {p}
                            </button>
                        ))}
                        <span className="mx-2 text-slate-300">...</span>
                        <button className="w-10 h-9 rounded-xl text-slate-400 border border-slate-100 font-black text-xs flex items-center justify-center">50</button>
                        <button className="p-2 rounded-xl text-slate-300 hover:text-[#7c32ff] transition-all border border-transparent hover:border-slate-50">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Decorative Icon */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-[#7c32ff] rounded-l-xl flex items-center justify-center">
                    <Layout className="text-white" size={18} />
                </div>
            </Card>
        </div>
    );
};

export default HomeworkList;
