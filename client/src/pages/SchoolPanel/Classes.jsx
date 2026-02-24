import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card, Input } from '../../components/SnowUI';
import { Search, GraduationCap, Trash2, MoreVertical, CheckCircle2 } from 'lucide-react';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [structure, setStructure] = useState({ mediums: [], shifts: [], streams: [] });
    const [formData, setFormData] = useState({ name: '', medium: '', stream: '', shift: '', selectedSections: [] });
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const [classRes, sectionRes, structRes] = await Promise.all([
                api.get('/api/academic/classes'),
                api.get('/api/academic/sections'),
                api.get('/api/academic/structure')
            ]);
            setClasses(classRes.data);
            setSections(sectionRes.data);
            setStructure(structRes.data || { mediums: [], shifts: [], streams: [] });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.selectedSections.length === 0) {
            alert('Please select at least one section');
            return;
        }
        setLoading(true);
        try {
            await api.post('/api/academic/classes', {
                name: formData.name,
                medium: formData.medium,
                stream: formData.stream,
                shift: formData.shift,
                sections: formData.selectedSections
            });
            setFormData({ name: '', medium: '', stream: '', shift: '', selectedSections: [] });
            fetchData();
        } catch (error) {
            console.error('Error creating class:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSection = (sectionName) => {
        setFormData(prev => ({
            ...prev,
            selectedSections: prev.selectedSections.includes(sectionName)
                ? prev.selectedSections.filter(s => s !== sectionName)
                : [...prev.selectedSections, sectionName]
        }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Class</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Academics</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Class</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Add Class */}
                <div className="lg:col-span-1">
                    <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white overflow-hidden rounded-3xl">
                        <div className="bg-slate-50/50 p-6 border-b border-slate-50">
                            <h2 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] flex items-center space-x-3">
                                <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                <span>Add Class</span>
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Name *</label>
                                <input
                                    type="text"
                                    className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                    placeholder=""
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-4">Sections *</label>
                                <div className="space-y-3">
                                    {sections.map((section) => (
                                        <label key={section._id} className="flex items-center space-x-3 cursor-pointer group">
                                            <div
                                                onClick={() => toggleSection(section.name)}
                                                className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${formData.selectedSections.includes(section.name) ? 'bg-[#7c32ff] border-[#7c32ff]' : 'border-slate-200 group-hover:border-[#7c32ff]'}`}
                                            >
                                                {formData.selectedSections.includes(section.name) && <div className="w-2 h-2 rounded-full bg-white" />}
                                            </div>
                                            <span className="text-sm font-bold text-slate-600 uppercase italic tracking-wide group-hover:text-slate-800">{section.name}</span>
                                        </label>
                                    ))}
                                    {sections.length === 0 && (
                                        <div className="text-[10px] font-bold text-slate-400 italic">No sections available. Create sections first!</div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-center pt-6">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="!bg-[#7c32ff] !rounded-lg flex items-center space-x-2 px-8 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all text-white font-black italic uppercase tracking-widest text-[11px]"
                                >
                                    <CheckCircle2 size={16} />
                                    <span>{loading ? 'Saving...' : 'Save Class'}</span>
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Right Column: Class List */}
                <div className="lg:col-span-3">
                    <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white">
                        <div className="flex justify-between items-center mb-8 px-2">
                            <h2 className="text-lg font-bold text-[#3E4D67]">Class List</h2>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="SEARCH"
                                    className="bg-slate-50 border-none rounded-full py-2 px-10 text-[11px] font-black text-slate-400 focus:ring-2 focus:ring-[#7c32ff]/20 transition-all outline-none w-48 group-hover:w-64 duration-300"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-[20px]">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#F8FAFC] border-y border-slate-100 uppercase tracking-widest text-[11px] font-black text-slate-400">
                                        <th className="px-6 py-4">↓ Class</th>
                                        <th className="px-6 py-4">↓ Section</th>
                                        <th className="px-6 py-4 text-center">↓ Students</th>
                                        <th className="px-6 py-4 text-right">↓ Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-[13px] font-bold">
                                    {classes.map((cls) => (
                                        (cls.sectionCounts || []).map((secData, idx) => (
                                            <tr key={`${cls._id}-${secData.section}`} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3 text-slate-700 italic underline decoration-primary/5 decoration-4">
                                                        <span className="uppercase">{cls.name}</span>
                                                        {(cls.medium || cls.stream) && (
                                                            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-bold no-underline">
                                                                {cls.medium} {cls.stream ? `• ${cls.stream}` : ''} {cls.shift ? `• ${cls.shift}` : ''}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-[#F8FAFC] text-[#7c32ff] px-3 py-1 rounded-md text-[10px] font-black tracking-widest border border-slate-100 uppercase">
                                                        {secData.section}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center text-slate-500 font-black">
                                                    {secData.count}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end items-center">
                                                        <button className="border border-slate-200 rounded-full px-4 py-1.5 flex items-center space-x-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-[#7c32ff] hover:text-[#7c32ff] transition-all">
                                                            <span>Select</span>
                                                            <MoreVertical size={12} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ))}
                                    {classes.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-slate-400 italic">
                                                No classes found. Add your first class!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Classes;
