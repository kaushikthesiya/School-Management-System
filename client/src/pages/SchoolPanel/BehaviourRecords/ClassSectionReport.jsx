import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Search,
    ChevronDown,
    Layout,
    ArrowLeft,
    Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';

const ClassSectionReport = () => {
    const navigate = useNavigate();
    const [searching, setSearching] = useState(false);
    const [rankings, setRankings] = useState([]);

    const fetchRankings = async () => {
        setSearching(true);
        try {
            const { data } = await api.get('/api/discipline/report/class-section-rank');
            setRankings(data);
        } catch (err) {
            console.error('Fetch rankings error:', err);
            alert('Failed to fetch class rankings');
        } finally {
            setSearching(false);
        }
    };

    useEffect(() => {
        fetchRankings();
    }, []);

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

                    <Button
                        onClick={fetchRankings}
                        disabled={searching}
                        className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-6 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center space-x-2"
                    >
                        {searching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                        <span>REFRESH</span>
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-50 italic">
                                <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rank</th>
                                <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Class</th>
                                <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Students Involved</th>
                                <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Incidents</th>
                                <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sections</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searching ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <Loader2 className="animate-spin text-[#7c32ff] mx-auto" size={24} />
                                    </td>
                                </tr>
                            ) : rankings.length > 0 ? rankings.map((row, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                    <td className="py-5 px-6 text-[11px] font-bold text-slate-400 tabular-nums italic">#{idx + 1}</td>
                                    <td className="py-5 px-6 text-[11px] font-bold text-slate-600 italic">{row.class?.name}</td>
                                    <td className="py-5 px-6 text-[11px] font-bold text-slate-600 tabular-nums italic">{row.totalStudents}</td>
                                    <td className="py-5 px-6 text-[11px] font-bold text-slate-600 tabular-nums italic">{row.totalIncidents}</td>
                                    <td className="py-5 px-6 text-[11px] font-bold text-slate-500 italic">
                                        {row.class?.sections?.join(', ')}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
                                        No Data Available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
