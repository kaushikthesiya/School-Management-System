import React, { useState } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Search,
    Copy,
    Download,
    FileText,
    Printer,
    Layout,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClassSectionReport = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const ActionIcon = ({ Icon }) => (
        <button className="p-2 rounded-lg text-slate-400 hover:text-[#7c32ff] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
            <Icon size={14} />
        </button>
    );

    const rankings = [
        { rank: 1, class: 'Class 1', students: 25, sections: 'A-(5), B-(5), C-(5), D-(5), E-(5)', points: 0 },
        { rank: 2, class: 'Class 2', students: 25, sections: 'A-(5), B-(5), C-(5), D-(5), E-(5)', points: 0 },
        { rank: 3, class: 'Class 3', students: 25, sections: 'A-(5), B-(5), C-(5), D-(5), E-(5)', points: 0 },
        { rank: 4, class: 'Class 4', students: 25, sections: 'A-(5), B-(5), C-(5), D-(5), E-(5)', points: 0 },
        { rank: 5, class: 'Class 5', students: 25, sections: 'A-(5), B-(5), C-(5), D-(5), E-(5)', points: 0 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />

                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Class Section Wise Rank Report</h1>

                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span>Behaviour Records</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Class Section Wise Rank Report</span>
                </div>
            </div>

            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest leading-relaxed">
                        Class Section Wise Rank Report
                    </h3>

                    <div className="flex items-center space-x-6">
                        <div className="relative group">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="SEARCH"
                                className="bg-transparent border-b border-slate-100 py-2 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:border-[#7c32ff] transition-all w-48"
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
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-50 italic">
                                <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center space-x-1"><span>↓Rank</span></div>
                                </th>
                                <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center space-x-1"><span>↓Class</span></div>
                                </th>
                                <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center space-x-1"><span>↓Students</span></div>
                                </th>
                                <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center space-x-1"><span>↓Section-(Students)</span></div>
                                </th>
                                <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center space-x-1"><span>↓Total Points</span></div>
                                </th>
                                <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center space-x-1 justify-end"><span>↓Actions</span></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankings.map((row, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                    <td className="py-5 px-6 text-[11px] font-bold text-slate-600 tabular-nums italic">{row.rank}</td>
                                    <td className="py-5 px-6 text-[11px] font-bold text-slate-600 italic">{row.class}</td>
                                    <td className="py-5 px-6 text-[11px] font-bold text-slate-600 tabular-nums italic">{row.students}</td>
                                    <td className="py-5 px-6 text-[11px] font-bold text-slate-600 italic tracking-tight">{row.sections}</td>
                                    <td className="py-5 px-6 text-[11px] font-bold text-slate-600 tabular-nums italic">{row.points}</td>
                                    <td className="py-5 px-6 text-right">
                                        <button className="bg-white hover:bg-[#7c32ff] text-slate-400 hover:text-white border border-slate-200 hover:border-[#7c32ff] rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center space-x-2 ml-auto shadow-sm active:scale-95">
                                            <span>SELECT</span>
                                            <ChevronDown size={14} strokeWidth={3} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-10 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Showing 1 to 5 of 5 entries</span>
                    <div className="flex items-center space-x-2">
                        <button className="p-2.5 rounded-xl border border-slate-100 text-slate-300 hover:text-[#7c32ff] transition-all"><ChevronLeft size={16} /></button>
                        <div className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center italic">1</div>
                        <button className="p-2.5 rounded-xl border border-slate-100 text-slate-300 hover:text-[#7c32ff] transition-all"><ChevronRight size={16} /></button>
                    </div>
                </div>

                {/* Basket Icon decorator */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-[#7c32ff] rounded-l-xl flex items-center justify-center">
                    <Layout className="text-white" size={18} />
                </div>
            </Card>
        </div>
    );
};

export default ClassSectionReport;
