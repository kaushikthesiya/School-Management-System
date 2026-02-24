import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card } from '../../components/SnowUI';
import { Search, Plus, ChevronDown, CheckCircle2, Trash2, MoreVertical } from 'lucide-react';

const AssignSubject = () => {
    const [assignments, setAssignments] = useState([]);
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        classId: '',
        section: '',
        subjectId: '',
        teacherId: ''
    });

    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        try {
            const [assignRes, classRes, sectionRes, subjectRes, teacherRes] = await Promise.all([
                api.get('/api/academic/subject-assignments'),
                api.get('/api/academic/classes'),
                api.get('/api/academic/sections'),
                api.get('/api/academic/subjects'),
                api.get('/api/staff?role=Teacher')
            ]);
            setAssignments(assignRes.data);
            setClasses(classRes.data);
            setSections(sectionRes.data);
            setSubjects(subjectRes.data);
            setTeachers(teacherRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.classId || !formData.section || !formData.subjectId || !formData.teacherId) {
            alert('Please fill all required fields');
            return;
        }
        setLoading(true);
        try {
            await api.post('/api/academic/subject-assignments', {
                class: formData.classId,
                section: formData.section,
                subject: formData.subjectId,
                teacher: formData.teacherId
            });
            setFormData({ classId: '', section: '', subjectId: '', teacherId: '' });
            fetchData();
        } catch (error) {
            console.error('Error assigning subject:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this assignment?')) return;
        try {
            await api.delete(`/api/academic/subject-assignments/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting assignment:', error);
        }
    };

    const filteredAssignments = assignments.filter(item =>
        item.class?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.teacher?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Assign Subject
                </h1>
                <div className="hidden md:flex space-x-4 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Academics</span>
                    <span>|</span>
                    <span className="text-primary/70">Assign Subject</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Assign Form */}
                <div className="lg:col-span-1">
                    <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white sticky top-24">
                        <h2 className="text-[#3E4D67] text-lg font-bold mb-8">Assign Subject</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Class *</label>
                                <div className="relative group">
                                    <select
                                        className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                                        value={formData.classId}
                                        onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Class *</option>
                                        {classes.map(cls => <option key={cls._id} value={cls._id}>{cls.name}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                                </div>
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Section *</label>
                                <div className="relative group">
                                    <select
                                        className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                                        value={formData.section}
                                        onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Section *</option>
                                        {sections.map(sec => <option key={sec._id} value={sec.name}>{sec.name}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                                </div>
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject *</label>
                                <div className="relative group">
                                    <select
                                        className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                                        value={formData.subjectId}
                                        onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Subject *</option>
                                        {subjects.map(sub => <option key={sub._id} value={sub._id}>{sub.name} ({sub.code})</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                                </div>
                            </div>

                            <div className="space-y-3 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-4">Teacher *</label>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {teachers.map((teacher) => (
                                        <label key={teacher._id} className="flex items-center space-x-3 cursor-pointer group">
                                            <div
                                                onClick={() => setFormData({ ...formData, teacherId: teacher._id })}
                                                className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${formData.teacherId === teacher._id ? 'bg-[#7c32ff] border-[#7c32ff]' : 'border-slate-200 group-hover:border-[#7c32ff]'}`}
                                            >
                                                {formData.teacherId === teacher._id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                            </div>
                                            <span className="text-xs font-bold text-slate-500 uppercase italic tracking-wide group-hover:text-slate-800">{teacher.name}</span>
                                        </label>
                                    ))}
                                    {teachers.length === 0 && (
                                        <div className="text-[10px] font-bold text-slate-400 italic">No teachers found.</div>
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
                                    <span>{loading ? 'Saving...' : 'Save'}</span>
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Right Column: Assignment List */}
                <div className="lg:col-span-3">
                    <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden">
                        <div className="flex justify-between items-center mb-8 px-2">
                            <h2 className="text-lg font-bold text-[#3E4D67]">Subject Assignment List</h2>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="SEARCH"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
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
                                        <th className="px-6 py-4">↓ Subject</th>
                                        <th className="px-6 py-4">↓ Teacher</th>
                                        <th className="px-6 py-4 text-right">↓ Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-[13px] font-bold">
                                    {filteredAssignments.map((item) => (
                                        <tr key={item._id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-slate-700 uppercase italic underline decoration-primary/5 decoration-4">
                                                {item.class?.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-[#F8FAFC] text-[#7c32ff] px-3 py-1 rounded-md text-[10px] font-black tracking-widest border border-slate-100 uppercase">
                                                    {item.section}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 uppercase font-black">
                                                {item.subject?.name}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 italic">
                                                {item.teacher?.name}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <button className="border border-slate-200 rounded-full px-4 py-1.5 flex items-center space-x-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-[#7c32ff] hover:text-[#7c32ff] transition-all bg-white overflow-hidden shadow-sm">
                                                        <span>Select</span>
                                                        <MoreVertical size={12} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredAssignments.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-20 text-center text-slate-400 italic font-medium">
                                                No Data Available In Table
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

export default AssignSubject;
