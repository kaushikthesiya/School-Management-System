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

const BehaviourReport = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [rankData, setRankData] = useState([]);
    const [filters, setFilters] = useState({
        academicYear: '2026',
        classId: '',
        section: ''
    });

    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/api/academic/classes');
                setClasses(data);
            } catch (err) {
                console.error('Fetch classes error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

    const handleClassChange = (classId) => {
        const selectedClass = classes.find(c => c._id === classId);
        setSections(selectedClass?.sections || []);
        setFilters(prev => ({ ...prev, classId, section: '' }));
    };

    const handleSearch = async () => {
        setSearching(true);
        try {
            const params = { classId: filters.classId };
            const { data } = await api.get('/api/discipline/report/by-student', { params });
            // Sort by incident count (fewer is better rank? or most points? User said "rank report")
            // Usually rank report shows top performers or those with most issues. I'll stick to incidents count.
            setRankData(data);
        } catch (err) {
            console.error('Search error:', err);
            alert('Failed to fetch rank report');
        } finally {
            setSearching(false);
        }
    };

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1 italic">
            {children} {required && <span className="text-rose-500">*</span>}
        </label>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />

                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Student Behaviour Rank Report</h1>

                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span>Behaviour Records</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Student Behaviour Rank Report</span>
                </div>
            </div>

            {/* Select Criteria Card */}
            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-10">Select Criteria</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-2">
                        <Label required>ACADEMIC YEAR</Label>
                        <div className="relative group">
                            <select
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none"
                                value={filters.academicYear}
                                onChange={e => setFilters({ ...filters, academicYear: e.target.value })}
                                required
                            >
                                <option value="2026">2026(Jan-Dec)</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={14} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>CLASS</Label>
                        <div className="relative group">
                            <select
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none"
                                value={filters.classId}
                                onChange={e => handleClassChange(e.target.value)}
                            >
                                <option value="">Select Class</option>
                                {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={14} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>SECTION</Label>
                        <div className="relative group">
                            <select
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none"
                                value={filters.section}
                                onChange={e => setFilters({ ...filters, section: e.target.value })}
                            >
                                <option value="">Select Section</option>
                                {sections.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={14} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>TYPE</Label>
                        <div className="relative group">
                            <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none">
                                <option>Incident Rank</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={14} />
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex justify-end">
                    <Button
                        onClick={handleSearch}
                        disabled={searching || !filters.classId}
                        className="w-full lg:w-32 bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl py-4 shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2 active:scale-95 transition-all text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
                    >
                        {searching ? <Loader2 className="animate-spin" size={14} /> : <Search size={14} strokeWidth={3} />}
                        <span>SEARCH</span>
                    </Button>
                </div>

                {/* Basket Icon decorator */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-[#7c32ff] rounded-l-xl flex items-center justify-center">
                    <Layout className="text-white" size={18} />
                </div>
            </Card>

            {/* Ranking Section */}
            {(rankData.length > 0 || searching) && (
                <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-50 italic">
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rank</th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Admission No</th>
                                    <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Incidents</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rankData.map((row, idx) => (
                                    <tr key={idx} className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                        <td className="py-5 px-6 text-[11px] font-bold text-slate-400 italic">#{idx + 1}</td>
                                        <td className="py-5 px-6 text-[11px] font-bold text-slate-600 italic">
                                            {row.student?.firstName} {row.student?.lastName}
                                        </td>
                                        <td className="py-5 px-6 text-[11px] font-bold text-slate-600 italic">
                                            {row.student?.admissionNumber}
                                        </td>
                                        <td className="py-5 px-6 text-[11px] font-bold text-slate-600 tabular-nums text-right italic">
                                            {row.totalIncidents}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default BehaviourReport;
