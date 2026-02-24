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
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IncidentWiseReport = () => {
    const navigate = useNavigate();
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

                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Incident Wise Report</h1>

                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span>Behaviour Records</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Incident Wise Report</span>
                </div>
            </div>

            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest leading-relaxed">
                        Incident Wise Report
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
                                    <div className="flex items-center space-x-1"><span>↓Incidents</span></div>
                                </th>
                                <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center space-x-1 justify-end"><span>↓Students</span></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                <td colSpan="2" className="py-20 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
                                    No Data Available In Table
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>showing 0 to 0 of 0 entries</span>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-xl bg-slate-50 text-slate-300 hover:text-[#7c32ff] transition-all border border-slate-100 disabled:opacity-30 self-center">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="p-2 rounded-xl bg-slate-50 text-slate-300 hover:text-[#7c32ff] transition-all border border-slate-100 disabled:opacity-30 self-center">
                            <ChevronRight size={16} />
                        </button>
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

export default IncidentWiseReport;
