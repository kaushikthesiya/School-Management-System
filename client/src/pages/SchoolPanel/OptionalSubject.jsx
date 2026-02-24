import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card, Input } from '../../components/SnowUI';
import { Search, ChevronDown } from 'lucide-react';

const OptionalSubject = () => {
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [formData, setFormData] = useState({ classId: '', sectionName: '', subjectId: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [classRes, sectionRes, subjectRes] = await Promise.all([
                    api.get('/api/academic/classes'),
                    api.get('/api/academic/sections'),
                    api.get('/api/academic/subjects')
                ]);
                setClasses(classRes.data);
                setSections(sectionRes.data);
                setSubjects(subjectRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        setLoading(true);
        // Implement search logic here
        setTimeout(() => setLoading(false), 800);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Optional Subject</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Academics</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Optional Subject</span>
                    </div>
                </div>
            </div>

            <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-16 -mt-16 transition-transform group-hover:scale-110" />

                {/* Decorative purple tab from screenshot */}
                <div className="absolute right-0 top-1/4 w-10 h-16 bg-[#7c32ff] rounded-l-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 shadow-[0_0_8px_white]" />
                </div>

                <h2 className="text-lg font-bold text-[#3E4D67] mb-10 border-l-4 border-[#7c32ff] pl-4">Select Criteria</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Class *</label>
                        <div className="relative group">
                            <select
                                className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-[12px] font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all appearance-none cursor-pointer"
                                value={formData.classId}
                                onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                            >
                                <option value="">Select Class *</option>
                                {classes.map(cls => <option key={cls._id} value={cls._id}>{cls.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Section *</label>
                        <div className="relative group">
                            <select
                                className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-[12px] font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all appearance-none cursor-pointer"
                                value={formData.sectionName}
                                onChange={(e) => setFormData({ ...formData, sectionName: e.target.value })}
                            >
                                <option value="">Select Section *</option>
                                {sections.map(sec => <option key={sec._id} value={sec.name}>{sec.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject *</label>
                        <div className="relative group">
                            <select
                                className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-[12px] font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all appearance-none cursor-pointer"
                                value={formData.subjectId}
                                onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                            >
                                <option value="">Select Subject *</option>
                                {subjects.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-12 pr-2">
                    <Button
                        onClick={handleSearch}
                        disabled={loading}
                        className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl px-10 py-3.5 text-[11px] font-black uppercase tracking-widest flex items-center space-x-3 shadow-xl shadow-purple-500/20 active:scale-95 transition-all"
                    >
                        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Search size={18} strokeWidth={3} />}
                        <span className="italic uppercase">{loading ? 'Searching...' : 'Search'}</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default OptionalSubject;
