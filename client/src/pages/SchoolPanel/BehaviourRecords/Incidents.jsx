import React, { useState } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Plus,
    Search,
    Copy,
    Download,
    FileText,
    Printer,
    Layout,
    ArrowLeft,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const Incidents = () => {
    const navigate = useNavigate();
    const { school_slug } = useParams();
    const [searchTerm, setSearchTerm] = useState('');

    const ActionIcon = ({ Icon }) => (
        <button className="p-2 rounded-lg text-slate-400 hover:text-[#7c32ff] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
            <Icon size={14} />
        </button>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />

                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Incidents</h1>

                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate(`/${school_slug}`)}>Dashboard</span>
                    <span>|</span>
                    <span>Behaviour Records</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Incidents</span>
                </div>
            </div>

            {/* List Actions Area */}
            <div className="flex justify-end pr-1">
                <Button
                    onClick={() => navigate(`/${school_slug}/assign-incident`)}
                    className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-8 py-3.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all group"
                >
                    <Plus size={14} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>ADD</span>
                </Button>
            </div>

            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-[0.1em]">Incident List</h3>

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
                            <tr className="border-b border-slate-50">
                                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center space-x-1">
                                        <span>↓ Title</span>
                                    </div>
                                </th>
                                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center space-x-1">
                                        <span>↓ Point</span>
                                    </div>
                                </th>
                                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center space-x-1">
                                        <span>↓ Description</span>
                                    </div>
                                </th>
                                <th className="text-right py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center space-x-1 justify-end">
                                        <span>↓ Actions</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                <td colSpan="4" className="py-16 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
                                    No Data Available In Table
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Showing 0 to 0 of 0 entries</span>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-xl bg-slate-50 text-slate-300 hover:text-[#7c32ff] transition-all border border-slate-100 disabled:opacity-30 self-center">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="p-2 rounded-xl bg-slate-50 text-slate-300 hover:text-[#7c32ff] transition-all border border-slate-100 disabled:opacity-30 self-center">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Floating Side Icon Element (as seen in some photos) */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-20 bg-[#7c32ff] rounded-l-full flex items-center justify-center shadow-lg shadow-purple-500/40 cursor-pointer hover:shadow-2xl transition-all group">
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 group-hover:scale-125 transition-transform" />
                </div>
            </Card>
        </div>
    );
};

export default Incidents;
