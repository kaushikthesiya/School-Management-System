import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card, Input } from '../../components/SnowUI';
import { Search, Plus, Trash2, MoreVertical, CheckCircle2 } from 'lucide-react';

const Sections = () => {
    const [sections, setSections] = useState([]);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchSections = async () => {
        try {
            const { data } = await api.get('/api/academic/sections');
            setSections(data);
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    useEffect(() => {
        fetchSections();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/api/academic/sections', { name });
            setName('');
            fetchSections();
        } catch (error) {
            console.error('Error creating section:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this section?')) return;
        try {
            await api.delete(`/api/academic/sections/${id}`);
            fetchSections();
        } catch (error) {
            console.error('Error deleting section:', error);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Section</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Academics</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Section</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Add Section */}
                <div className="lg:col-span-1">
                    <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white overflow-hidden rounded-3xl">
                        <div className="bg-slate-50/50 p-6 border-b border-slate-50">
                            <h2 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] flex items-center space-x-3">
                                <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                <span>Add Section</span>
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Name *</label>
                                <input
                                    type="text"
                                    className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                    placeholder=""
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex justify-center pt-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="!bg-[#7c32ff] !rounded-lg flex items-center space-x-2 px-8 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all text-white font-black italic uppercase tracking-widest text-[11px]"
                                >
                                    <CheckCircle2 size={16} />
                                    <span>{loading ? 'Saving...' : 'Save Section'}</span>
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Right Column: Section List */}
                <div className="lg:col-span-3">
                    <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden">
                        <div className="flex justify-between items-center mb-8 px-2">
                            <h2 className="text-lg font-bold text-[#3E4D67]">Section List</h2>
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
                                    <tr className="bg-[#F8FAFC] border-y border-slate-100 uppercase tracking-widest">
                                        <th className="px-6 py-4 text-[11px] font-black text-slate-400">↓ Section</th>
                                        <th className="px-6 py-4 text-[11px] font-black text-slate-400 text-right">↓ Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-[13px] font-bold">
                                    {sections.map((section) => (
                                        <tr key={section._id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-slate-600 uppercase italic underline decoration-primary/5 decoration-4">
                                                {section.name}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end items-center space-x-2">
                                                    <button
                                                        onClick={() => handleDelete(section._id)}
                                                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <div className="relative group/menu">
                                                        <button className="border border-slate-200 rounded-full px-4 py-1.5 flex items-center space-x-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-[#7c32ff] hover:text-[#7c32ff] transition-all">
                                                            <span>Select</span>
                                                            <MoreVertical size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {sections.length === 0 && (
                                        <tr>
                                            <td colSpan="2" className="px-6 py-12 text-center text-slate-400 italic font-medium">
                                                No sections found. Add your first section!
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

export default Sections;
