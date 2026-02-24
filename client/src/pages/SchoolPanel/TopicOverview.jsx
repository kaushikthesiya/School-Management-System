import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Card } from '../../components/SnowUI';
import { Layers, CheckCircle2, Circle, Search, GraduationCap, BookOpen } from 'lucide-react';

const TopicOverview = () => {
    const [topics, setTopics] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [filters, setFilters] = useState({
        class: '',
        section: '',
        subject: ''
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [topicRes, classRes, subjectRes] = await Promise.all([
                api.get('/api/lesson-plan/topics'),
                api.get('/api/academic/classes'),
                api.get('/api/academic/subjects')
            ]);
            setTopics(topicRes.data);
            setClasses(classRes.data);
            setSubjects(subjectRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredTopics = topics.filter(item => {
        const matchesSearch = item.topicName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.lesson?.lessonName?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesClass = !filters.class || item.lesson?.class?._id === filters.class;
        const matchesSubject = !filters.subject || item.lesson?.subject?._id === filters.subject;
        // Section matching - assuming lesson has section or we filter by generic section if applicable
        // The current Topic model links to Lesson. Lesson has Class/Subject. Section might be on Lesson.
        const matchesSection = !filters.section || item.lesson?.section === filters.section || (!item.lesson?.section && filters.section === 'A'); // Default/Example logic

        return matchesSearch && matchesClass && matchesSubject && matchesSection;
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Topic Overview
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Lesson Plan</span>
                    <span>|</span>
                    <span className="text-primary/70">Overview</span>
                </div>
            </div>

            <Card className="p-6 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden min-h-[500px]">
                {/* Filters Header */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                        <select
                            className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all cursor-pointer"
                            value={filters.class}
                            onChange={(e) => setFilters({ ...filters, class: e.target.value })}
                        >
                            <option value="">Select Class</option>
                            {classes.map(c => <option key={c._id} value={c._id}>Class {c.name}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-1">
                        <select
                            className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all cursor-pointer"
                            value={filters.section}
                            onChange={(e) => setFilters({ ...filters, section: e.target.value })}
                        >
                            <option value="">Select Section</option>
                            {['A', 'B', 'C', 'D'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-1">
                        <select
                            className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all cursor-pointer"
                            value={filters.subject}
                            onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                        >
                            <option value="">Select Subject</option>
                            {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-1 relative group">
                        <input
                            type="text"
                            placeholder="Search Topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold text-slate-600 focus:ring-2 focus:ring-[#7c32ff]/20 transition-all outline-none uppercase tracking-wide"
                        />
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-slate-100 uppercase tracking-widest text-[9px] font-black text-slate-400">
                                <th className="px-4 py-3">SL</th>
                                <th className="px-4 py-3">Class</th>
                                <th className="px-4 py-3">Section</th>
                                <th className="px-4 py-3">Subject</th>
                                <th className="px-4 py-3">Lesson</th>
                                <th className="px-4 py-3">Topic</th>
                                <th className="px-4 py-3 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-[11px] font-bold">
                            {filteredTopics.map((item, i) => (
                                <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-3 text-slate-400">{i + 1}</td>
                                    <td className="px-4 py-3 text-slate-600">Class {item.lesson?.class?.name}</td>
                                    <td className="px-4 py-3 text-slate-600">{item.lesson?.section || 'A'}</td>
                                    <td className="px-4 py-3 text-slate-500 italic">{item.lesson?.subject?.name}</td>
                                    <td className="px-4 py-3 text-slate-600">{item.lesson?.lessonName}</td>
                                    <td className="px-4 py-3 text-slate-700">{item.topicName}</td>
                                    <td className="px-4 py-3 text-center">
                                        {item.status === 'Completed' ? (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase bg-green-50 text-green-600 tracking-wider">
                                                Completed
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase bg-amber-50 text-amber-600 tracking-wider">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {filteredTopics.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="px-6 py-10 text-center text-slate-400 italic font-medium text-xs">
                                        No Topics found matching filters
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

export default TopicOverview;
