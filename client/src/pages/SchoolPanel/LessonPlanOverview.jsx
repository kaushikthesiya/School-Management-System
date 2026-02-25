import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Card } from '../../components/SnowUI';
import { Search, Filter, MoreVertical, Calendar as CalendarIcon, User, GraduationCap, ChevronDown, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';

const LessonPlanOverview = () => {
    const [plans, setPlans] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]); // State for teachers
    const [loading, setLoading] = useState(false);

    // Search button triggers filtering
    const [filters, setFilters] = useState({
        teacher: '',
        class: '',
        section: '',
        subject: ''
    });

    const [activeFilters, setActiveFilters] = useState({
        teacher: '',
        class: '',
        section: '',
        subject: ''
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [planRes, classRes, subjectRes, teacherRes] = await Promise.all([
                api.get('/api/lesson-plan/plans'),
                api.get('/api/academic/classes'),
                api.get('/api/academic/subjects'),
                api.get('/api/staff?role=Teacher')
            ]);
            setPlans(planRes.data);
            setClasses(classRes.data);
            setSubjects(subjectRes.data);
            setTeachers(teacherRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = () => {
        setActiveFilters(filters);
    };

    const filteredPlans = plans.filter(item => {
        const matchesTeacher = !activeFilters.teacher || item.teacher?._id === activeFilters.teacher;
        const matchesClass = !activeFilters.class || item.class?._id === activeFilters.class;
        const matchesSubject = !activeFilters.subject || item.subject?._id === activeFilters.subject;
        const matchesSection = !activeFilters.section || item.section === activeFilters.section;

        return matchesTeacher && matchesClass && matchesSubject && matchesSection;
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Lesson Plan Overview
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Lesson Plan</span>
                    <span>|</span>
                    <span className="text-primary/70">Overview</span>
                </div>
            </div>

            <Card className="p-6 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Teacher *</label>
                        <select
                            className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all cursor-pointer"
                            value={filters.teacher}
                            onChange={(e) => setFilters({ ...filters, teacher: e.target.value })}
                        >
                            <option value="">Select Teacher *</option>
                            {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Class *</label>
                        <select
                            className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all cursor-pointer"
                            value={filters.class}
                            onChange={(e) => setFilters({ ...filters, class: e.target.value })}
                        >
                            <option value="">Select Class *</option>
                            {classes.map(c => <option key={c._id} value={c._id}>Class {c.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Section *</label>
                        <select
                            className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all cursor-pointer"
                            value={filters.section}
                            onChange={(e) => setFilters({ ...filters, section: e.target.value })}
                        >
                            <option value="">Select Section *</option>
                            {['A', 'B', 'C', 'D'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject *</label>
                        <select
                            className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all cursor-pointer"
                            value={filters.subject}
                            onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                        >
                            <option value="">Select Subject *</option>
                            {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSearch}
                        className="flex items-center space-x-2 bg-[#7c32ff] px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#6c2bd9] transition-all shadow-lg shadow-purple-500/20 active:scale-95"
                    >
                        <Search size={14} />
                        <span>Search</span>
                    </button>
                </div>
            </Card>

            <Card className="p-6 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden min-h-[500px]">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-[#3E4D67]">Lesson Plan List</h2>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-slate-100 uppercase tracking-widest text-[9px] font-black text-slate-400">
                                <th className="px-4 py-3">SL</th>
                                <th className="px-4 py-3">Teacher</th>
                                <th className="px-4 py-3">Class</th>
                                <th className="px-4 py-3">Section</th>
                                <th className="px-4 py-3">Subject</th>
                                <th className="px-4 py-3">Lesson</th>
                                <th className="px-4 py-3">Topic</th>
                                <th className="px-4 py-3 text-center">Date</th>
                                <th className="px-4 py-3 text-center">Status</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-[11px] font-bold">
                            {filteredPlans.map((item, i) => (
                                <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-3 text-slate-400">{i + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-500 font-black text-[9px]">
                                                {item.teacher?.name?.charAt(0) || 'T'}
                                            </div>
                                            <span className="text-slate-700">{item.teacher?.name || 'Unknown'}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">Class {item.class?.name}</td>
                                    <td className="px-4 py-3 text-slate-600">{item.section}</td>
                                    <td className="px-4 py-3 text-slate-500 italic">{item.subject?.name}</td>
                                    <td className="px-4 py-3 text-slate-600">{item.lesson?.lessonName}</td>
                                    <td className="px-4 py-3 text-[#7c32ff]">{item.topic?.topicName}</td>
                                    <td className="px-4 py-3 text-center text-slate-500">
                                        {format(new Date(item.date), 'dd/MM/yyyy')}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {item.isCompleted ? (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase bg-green-50 text-green-600 tracking-wider">
                                                Finished
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase bg-slate-100 text-slate-500 tracking-wider">
                                                Upcoming
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="p-1.5 text-slate-300 hover:text-[#7c32ff] hover:bg-purple-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredPlans.length === 0 && (
                                <tr>
                                    <td colSpan="10" className="px-6 py-10 text-center text-slate-400 italic font-medium text-xs">
                                        No Lesson Plans found matching filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};


export default LessonPlanOverview;
