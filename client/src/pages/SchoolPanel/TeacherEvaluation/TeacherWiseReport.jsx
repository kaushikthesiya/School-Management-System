import React, { useState } from 'react';
import { Card, Button } from '../../../components/SnowUI';
import {
    Search,
    Copy,
    FileText,
    Download,
    Printer,
    Layout,
    ChevronLeft,
    ChevronRight,
    Search as SearchIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherWiseReport = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const ActionIcon = ({ Icon }) => (
        <button className="p-2 rounded-lg text-slate-400 hover:text-[#7c32ff] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
            <Icon size={14} />
        </button>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Teacher Wise Evaluation Report</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-[#7c32ff] cursor-pointer">Teacher Evaluation</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Teacher Wise Evaluation Report</span>
                </div>
            </div>

            {/* Filter Section */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8 italic">Teacher Wise Evaluation Report</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">TEACHER</label>
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none italic">
                            <option value="">Select Teacher</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">SUBMITTED BY</label>
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none italic">
                            <option value="">Select Submitted By</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 transition-all flex items-center space-x-2">
                        <SearchIcon size={14} strokeWidth={3} />
                        <span>SEARCH</span>
                    </Button>
                </div>
            </Card>

            {/* Table Section */}
            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                <div className="flex flex-col space-y-8">
                    <div className="flex justify-between items-center">
                        <div className="flex-1 max-w-md relative group">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="SEARCH"
                                className="bg-transparent border-b border-slate-100 py-2 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:border-[#7c32ff] transition-all w-full"
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

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-50 italic text-slate-400">
                                    <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center space-x-1"><span>↓Staff Id</span></div>
                                    </th>
                                    <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center space-x-1"><span>↓Teacher Name</span></div>
                                    </th>
                                    <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center space-x-1"><span>↓Submitted By</span></div>
                                    </th>
                                    <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center space-x-1"><span>↓Class (Section)</span></div>
                                    </th>
                                    <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center space-x-1"><span>↓Rating</span></div>
                                    </th>
                                    <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center space-x-1"><span>↓Comment</span></div>
                                    </th>
                                    <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center space-x-1"><span>↓Status</span></div>
                                    </th>
                                    <th className="text-right py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center justify-end space-x-1"><span>↓Actions</span></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="8" className="py-12 text-center">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">No Data Available In Table</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span>Showing 0 to 0 of 0 entries</span>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-xl text-slate-300 hover:text-[#7c32ff] transition-all">
                                <ChevronLeft size={16} />
                            </button>
                            <button className="p-2 rounded-xl text-slate-300 hover:text-[#7c32ff] transition-all">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Basket Icon decorator */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-12 h-12 bg-[#7c32ff] rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/20 transform rotate-45">
                    <div className="-rotate-45">
                        <Layout size={20} className="text-white" />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default TeacherWiseReport;
