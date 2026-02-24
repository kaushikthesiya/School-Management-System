import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card } from '../../components/SnowUI';
import { Search, Plus, Trash2, CheckCircle2, ChevronDown, Calendar as CalendarIcon, Link as LinkIcon, FileText, StickyNote } from 'lucide-react';
import { format } from 'date-fns';

const LessonPlan = () => {
    const [plans, setPlans] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        class: '',
        section: '',
        subject: '',
        lesson: '',
        topic: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        subTopic: '',
        lectureYoutubeLink: '',
        note: ''
    });

    const fetchData = async () => {
        try {
            const [planRes, classRes, subjectRes, lessonRes, topicRes] = await Promise.all([
                api.get('/api/lesson-plan/plans'),
                api.get('/api/academic/classes'),
                api.get('/api/academic/subjects'),
                api.get('/api/lesson-plan/lessons'),
                api.get('/api/lesson-plan/topics')
            ]);
            setPlans(planRes.data);
            setClasses(classRes.data);
            setSubjects(subjectRes.data);
            setLessons(lessonRes.data);
            setTopics(topicRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/api/lesson-plan/plans', formData);
            setFormData({
                class: '',
                section: '',
                subject: '',
                lesson: '',
                topic: '',
                date: format(new Date(), 'yyyy-MM-dd'),
                subTopic: '',
                lectureYoutubeLink: '',
                note: ''
            });
            fetchData();
        } catch (error) {
            console.error('Error saving plan:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this plan?')) return;
        try {
            await api.delete(`/api/lesson-plan/plans/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting plan:', error);
        }
    };

    const filteredLessons = lessons.filter(l => l.class?._id === formData.class && l.subject?._id === formData.subject);
    const filteredTopics = topics.filter(t => t.lesson?._id === formData.lesson);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Lesson Plan (Add)
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Lesson Plan</span>
                    <span>|</span>
                    <span className="text-primary/70">Add Plan</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form */}
                <div className="lg:col-span-1">
                    <Card className="p-6 border-none shadow-snow-lg rounded-[20px] bg-white sticky top-24">
                        <h2 className="text-[#3E4D67] text-base font-bold mb-6">Create Lesson Plan</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Class *</label>
                                    <select
                                        className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all"
                                        value={formData.class}
                                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Section *</label>
                                    <select
                                        className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all"
                                        value={formData.section}
                                        onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Section</option>
                                        {['A', 'B', 'C', 'D'].map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject *</label>
                                <select
                                    className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map(s => <option key={s._id} value={s._id}>{s.name} ({s.code})</option>)}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lesson *</label>
                                <select
                                    className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all"
                                    value={formData.lesson}
                                    onChange={(e) => setFormData({ ...formData, lesson: e.target.value })}
                                    required
                                    disabled={!formData.class || !formData.subject}
                                >
                                    <option value="">Select Lesson</option>
                                    {filteredLessons.map(l => <option key={l._id} value={l._id}>{l.lessonName}</option>)}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Topic *</label>
                                <select
                                    className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all"
                                    value={formData.topic}
                                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                    required
                                    disabled={!formData.lesson}
                                >
                                    <option value="">Select Topic</option>
                                    {filteredTopics.map(t => <option key={t._id} value={t._id}>{t.topicName}</option>)}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sub Topic *</label>
                                <input
                                    className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all"
                                    type="text"
                                    placeholder="Enter Sub Topic"
                                    value={formData.subTopic}
                                    onChange={(e) => setFormData({ ...formData, subTopic: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date *</label>
                                <input
                                    className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">YouTube Link</label>
                                <input
                                    className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all"
                                    type="url"
                                    placeholder="https://youtube.com/..."
                                    value={formData.lectureYoutubeLink}
                                    onChange={(e) => setFormData({ ...formData, lectureYoutubeLink: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notes</label>
                                <textarea
                                    className="w-full bg-slate-50 border-none rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all min-h-[80px]"
                                    placeholder="Add any notes..."
                                    value={formData.note}
                                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                />
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full !bg-[#7c32ff] !rounded-lg flex items-center justify-center space-x-2 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all text-white font-black italic uppercase tracking-widest text-[11px]"
                                >
                                    <CheckCircle2 size={16} />
                                    <span>{loading ? 'Creating...' : 'Create Plan'}</span>
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Right Column: Table */}
                <div className="lg:col-span-2">
                    <Card className="p-6 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden min-h-[500px]">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                            <h2 className="text-base font-bold text-[#3E4D67]">My Scheduled Plans</h2>
                            <div className="flex gap-2">
                                <div className="relative group w-full md:w-48">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full bg-slate-50 border-none rounded-xl py-2 pl-9 pr-3 text-[10px] font-bold text-slate-600 focus:ring-2 focus:ring-[#7c32ff]/20 transition-all outline-none uppercase tracking-wide"
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={14} />
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-slate-100">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#F8FAFC] border-b border-slate-100 uppercase tracking-widest text-[9px] font-black text-slate-400">
                                        <th className="px-4 py-3">SL</th>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Class</th>
                                        <th className="px-4 py-3">Subject</th>
                                        <th className="px-4 py-3">Lesson</th>
                                        <th className="px-4 py-3">Topic</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-[11px] font-bold">
                                    {plans.map((item, i) => (
                                        <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-4 py-3 text-slate-400">{i + 1}</td>
                                            <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                                                {format(new Date(item.date), 'dd/MM/yyyy')}
                                            </td>
                                            <td className="px-4 py-3 text-slate-600">
                                                {item.class?.name} ({item.section})
                                            </td>
                                            <td className="px-4 py-3 text-slate-500 italic">{item.subject?.name}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.lesson?.lessonName}</td>
                                            <td className="px-4 py-3 text-slate-700">{item.topic?.topicName}</td>
                                            <td className="px-4 py-3">
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
                                                <div className="flex justify-end items-center space-x-2">
                                                    <button onClick={() => handleDelete(item._id)} className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {plans.length === 0 && (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-10 text-center text-slate-400 italic font-medium text-xs">
                                                No Lesson Plans found
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

export default LessonPlan;
