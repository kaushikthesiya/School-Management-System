import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card, Input } from '../../components/SnowUI';
import { Search, BookOpen, Trash2, MoreVertical, CheckCircle2, ChevronDown, Filter } from 'lucide-react';

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedFilterClass, setSelectedFilterClass] = useState('');
    const [formData, setFormData] = useState({ name: '', code: '', type: 'Theory', class: '' });
    const [loading, setLoading] = useState(false);

    const fetchClasses = async () => {
        try {
            const { data } = await api.get('/api/academic/classes');
            setClasses(data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const fetchSubjects = async () => {
        try {
            const params = selectedFilterClass ? { classId: selectedFilterClass } : {};
            const { data } = await api.get('/api/academic/subjects', { params });
            setSubjects(data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        fetchSubjects();
    }, [selectedFilterClass]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/api/academic/subjects', formData);
            setFormData({ name: '', code: '', type: 'Theory', class: '' });
            fetchSubjects();
        } catch (error) {
            console.error('Error creating subject:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this subject?')) return;
        try {
            await api.delete(`/api/academic/subjects/${id}`);
            fetchSubjects();
        } catch (error) {
            console.error('Error deleting subject:', error);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Subject</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Academics</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Subject</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Add Subject */}
                <div className="lg:col-span-1">
                    <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white overflow-hidden rounded-3xl">
                        <div className="bg-slate-50/50 p-6 border-b border-slate-50">
                            <h2 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] flex items-center space-x-3">
                                <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                <span>Add Subject</span>
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Class *</label>
                                <div className="relative group">
                                    <select
                                        className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                                        value={formData.class}
                                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Class *</option>
                                        {classes.map(cls => <option key={cls._id} value={cls._id}>{cls.name}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Name *</label>
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
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Type *</label>
                                <div className="flex items-center space-x-6 pt-2">
                                    <label className="flex items-center space-x-2 cursor-pointer group">
                                        <div
                                            onClick={() => setFormData({ ...formData, type: 'Theory' })}
                                            className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${formData.type === 'Theory' ? 'bg-[#7c32ff] border-[#7c32ff]' : 'border-slate-200'}`}
                                        >
                                            {formData.type === 'Theory' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Theory</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer group">
                                        <div
                                            onClick={() => setFormData({ ...formData, type: 'Practical' })}
                                            className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${formData.type === 'Practical' ? 'bg-[#7c32ff] border-[#7c32ff]' : 'border-slate-200'}`}
                                        >
                                            {formData.type === 'Practical' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Practical</span>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Code *</label>
                                <input
                                    type="text"
                                    className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                    placeholder=""
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="flex justify-center pt-6">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="!bg-[#7c32ff] !rounded-lg flex items-center space-x-2 px-8 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all text-white font-black italic uppercase tracking-widest text-[11px]"
                                >
                                    <CheckCircle2 size={16} />
                                    <span>{loading ? 'Saving...' : 'Save Subject'}</span>
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Right Column: Subject List */}
                <div className="lg:col-span-3">
                    <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 px-2 space-y-4 md:space-y-0">
                            <h2 className="text-lg font-bold text-[#3E4D67]">Subject List</h2>

                            <div className="flex items-center space-x-4">
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300">
                                        <Filter size={14} />
                                    </div>
                                    <select
                                        className="bg-slate-50 border-none rounded-full py-2 pl-10 pr-8 text-[11px] font-black text-slate-400 focus:ring-2 focus:ring-[#7c32ff]/20 transition-all outline-none appearance-none cursor-pointer"
                                        value={selectedFilterClass}
                                        onChange={(e) => setSelectedFilterClass(e.target.value)}
                                    >
                                        <option value="">ALL CLASSES</option>
                                        {classes.map(cls => <option key={cls._id} value={cls._id}>{cls.name.toUpperCase()}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={12} />
                                </div>

                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="SEARCH"
                                        className="bg-slate-50 border-none rounded-full py-2 px-10 text-[11px] font-black text-slate-400 focus:ring-2 focus:ring-[#7c32ff]/20 transition-all outline-none w-48 group-hover:w-64 duration-300"
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-[20px]">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#F8FAFC] border-y border-slate-100 uppercase tracking-widest text-[11px] font-black text-slate-400">
                                        <th className="px-6 py-4">SL</th>
                                        <th className="px-6 py-4">Subject</th>
                                        <th className="px-6 py-4">Class</th>
                                        <th className="px-6 py-4">Subject Type</th>
                                        <th className="px-6 py-4">Subject Code</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-[13px] font-bold">
                                    {subjects.map((sub, idx) => (
                                        <tr key={sub._id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-slate-400 font-black">{idx + 1}</td>
                                            <td className="px-6 py-4 text-slate-700 uppercase italic underline decoration-primary/5 decoration-4">
                                                {sub.name}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 uppercase bg-slate-50/50 rounded-lg">
                                                <span className="bg-white px-3 py-1 rounded-full shadow-sm text-[10px] font-black">
                                                    {sub.class?.name || 'GLOBAL'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 uppercase">{sub.type}</td>
                                            <td className="px-6 py-4 text-slate-500 uppercase font-black">{sub.code}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button
                                                        onClick={() => handleDelete(sub._id)}
                                                        className="text-slate-300 hover:text-red-500 transition-all p-2"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <button className="border border-slate-200 rounded-full px-4 py-1.5 flex items-center space-x-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-[#7c32ff] hover:text-[#7c32ff] transition-all">
                                                        <span>Select</span>
                                                        <MoreVertical size={12} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {subjects.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-8 text-center text-slate-400 italic">No subjects found</td>
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

export default Subjects;
