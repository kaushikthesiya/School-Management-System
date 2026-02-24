import React, { useState } from 'react';
import { Button, Card } from '../../components/SnowUI';
import {
    Save,
    Clock,
    Search,
    Download,
    Printer,
    FileText,
    Copy,
    ChevronLeft,
    ChevronRight,
    Terminal,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SmsSendingTime = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        startTime: '5:08 PM',
        status: ''
    });

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-[#7c32ff] hover:bg-slate-100 transition-all border border-slate-100"
                    >
                        <ArrowLeft size={18} strokeWidth={3} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">SMS Sending Time</h1>
                        <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                            <span>Dashboard</span>
                            <span>|</span>
                            <span>Student Info</span>
                            <span>|</span>
                            <span className="text-[#7c32ff]">SMS Sending Time</span>
                        </div>
                    </div>
                </div>

                <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                    <Terminal size={14} strokeWidth={3} />
                    <span>CRON COMMAND</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Add Time Setup Form */}
                <div className="lg:col-span-4">
                    <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-[#7c32ff] rounded-l-full" />

                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">Add Time Setup</h3>

                        <form className="space-y-8">
                            <div className="space-y-4">
                                <Label required>START TIME</Label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.startTime}
                                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all"
                                    />
                                    <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label required>Status</Label>
                                <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none">
                                    <option value="">Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            <Button className="w-full bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl py-5 shadow-2xl shadow-purple-500/20 flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-95 transition-all group">
                                <Save size={18} strokeWidth={3} />
                                <span className="uppercase text-[11px] font-black tracking-[0.2em] italic">SAVE TIME SETUP</span>
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* Time Setup List */}
                <div className="lg:col-span-8">
                    <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl h-full flex flex-col overflow-hidden relative">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Time Setup List</h3>

                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input
                                        type="text"
                                        placeholder="SEARCH"
                                        className="bg-transparent border-b border-slate-100 py-2 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:border-[#7c32ff] transition-all w-48"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center space-x-1 border border-purple-100 rounded-xl p-1 bg-purple-50/30">
                                    {[Copy, Download, FileText, Printer, Search].map((Icon, idx) => (
                                        <button key={idx} className="p-2 rounded-lg text-slate-400 hover:text-[#7c32ff] hover:bg-white transition-all">
                                            <Icon size={14} />
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
                                                <span>↓ Time</span>
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1">
                                                <span>↓ Status</span>
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1 text-right justify-end">
                                                <span>↓ Action</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                        <td colSpan="3" className="py-12 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
                                            No Data Available In Table
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-auto pt-8 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span>Showing 0 to 0 of 0 entries</span>
                            <div className="flex space-x-4">
                                <button className="hover:text-[#7c32ff] transition-colors"><ChevronLeft size={16} /></button>
                                <button className="hover:text-[#7c32ff] transition-colors"><ChevronRight size={16} /></button>
                            </div>
                        </div>

                        {/* Floating Action Button Placeholder */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-20 bg-[#7c32ff] rounded-l-full flex items-center justify-center shadow-lg shadow-purple-500/40">
                            <div className="w-5 h-5 rounded-full border-2 border-white/30" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SmsSendingTime;
