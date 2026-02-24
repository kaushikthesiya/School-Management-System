import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card } from '../../components/SnowUI';
import { Search, Plus, Trash2, CheckCircle2, Layers, BookOpen, ChevronDown } from 'lucide-react';

const Topics = () => {
    const [topics, setTopics] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [formData, setFormData] = useState({
        class: '',
        section: '',
        subject: '',
        lesson: '',
        topicNames: ['']
    });

    const fetchData = async () => {
        try {
            const [topicRes, lessonRes, classRes, subjectRes] = await Promise.all([
                api.get('/api/lesson-plan/topics'),
                api.get('/api/lesson-plan/lessons'),
                api.get('/api/academic/classes'),
                api.get('/api/academic/subjects')
            ]);
            setTopics(topicRes.data);
            setLessons(lessonRes.data);
            setClasses(classRes.data);
            setSubjects(subjectRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleTopicNameChange = (index, value) => {
        const newTopicNames = [...formData.topicNames];
        newTopicNames[index] = value;
        setFormData({ ...formData, topicNames: newTopicNames });
    };

    const addTopicField = () => {
        setFormData({ ...formData, topicNames: [...formData.topicNames, ''] });
    };

    const removeTopicField = (index) => {
        const newTopicNames = formData.topicNames.filter((_, i) => i !== index);
        setFormData({ ...formData, topicNames: newTopicNames });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            for (const name of formData.topicNames) {
                if (name.trim()) {
                    await api.post('/api/lesson-plan/topics', {
                        lesson: formData.lesson,
                        topicName: name
                    });
                }
            }
            setFormData({ ...formData, topicNames: [''] }); // Keep class/subject selection for easier entry
            fetchData();
        } catch (error) {
            console.error('Error saving topic:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this topic?')) return;
        try {
            await api.delete(`/api/lesson-plan/topics/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting topic:', error);
        }
    };

    const filteredLessons = lessons.filter(l =>
        (!formData.class || l.class?._id === formData.class) &&
        (!formData.subject || l.subject?._id === formData.subject)
        // section filtering if lesson has section
    );

    const filteredTopics = topics.filter(item =>
        item.topicName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lesson?.lessonName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Add Topic
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Lesson Plan</span>
                    <span>|</span>
                    <span className="text-primary/70">Topic</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form */}
                <div className="lg:col-span-1">
                    <Card className="p-6 border-none shadow-snow-lg rounded-[20px] bg-white sticky top-24">
                        <h2 className="text-[#3E4D67] text-base font-bold mb-6">Add Topic</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Class *</label>
                                <select
                                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                    value={formData.class}
                                    onChange={(e) => setFormData({ ...formData, class: e.target.value, lesson: '' })}
                                    required
                                >
                                    <option value="">Select Class *</option>
                                    {classes.map(c => <option key={c._id} value={c._id}>Class {c.name}</option>)}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Section *</label>
                                <select
                                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                    value={formData.section}
                                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                    required
                                >
                                    <option value="">Select Section *</option>
                                    {['A', 'B', 'C', 'D'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject *</label>
                                <select
                                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value, lesson: '' })}
                                    required
                                >
                                    <option value="">Select Subject *</option>
                                    {subjects.map(s => <option key={s._id} value={s._id}>{s.name} ({s.code})</option>)}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lesson *</label>
                                <select
                                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                    value={formData.lesson}
                                    onChange={(e) => setFormData({ ...formData, lesson: e.target.value })}
                                    required
                                    disabled={!formData.class || !formData.subject}
                                >
                                    <option value="">Select Lesson *</option>
                                    {filteredLessons.map(l => (
                                        <option key={l._id} value={l._id}>
                                            {l.lessonName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-3 pt-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Add Topic *</label>
                                {formData.topicNames.map((name, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-xs font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                            type="text"
                                            placeholder="Title"
                                            value={name}
                                            onChange={(e) => handleTopicNameChange(index, e.target.value)}
                                            required
                                        />
                                        {index === formData.topicNames.length - 1 ? (
                                            <button
                                                type="button"
                                                onClick={addTopicField}
                                                className="bg-[#7c32ff] text-white p-2.5 rounded-xl hover:bg-[#6b22ef] transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => removeTopicField(index)}
                                                className="bg-red-50 text-red-500 p-2.5 rounded-xl hover:bg-red-100 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full !bg-[#7c32ff] !rounded-lg flex items-center justify-center space-x-2 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all text-white font-black italic uppercase tracking-widest text-[11px]"
                                >
                                    <CheckCircle2 size={16} />
                                    <span>{loading ? 'Saving...' : 'Save Topic'}</span>
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Right Column: List */}
                <div className="lg:col-span-2">
                    <Card className="p-6 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden min-h-[500px]">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                            <h2 className="text-base font-bold text-[#3E4D67]">Topic List</h2>
                            <div className="relative group w-full md:w-48">
                                <input
                                    type="text"
                                    placeholder="Quick Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-xl py-2 pl-9 pr-3 text-[10px] font-bold text-slate-600 focus:ring-2 focus:ring-[#7c32ff]/20 transition-all outline-none uppercase tracking-wide"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={14} />
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
                                        <th className="px-4 py-3 text-right">Action</th>
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
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end items-center space-x-2">
                                                    <button onClick={() => handleDelete(item._id)} className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredTopics.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-10 text-center text-slate-400 italic font-medium text-xs">
                                                No Topics found
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

export default Topics;
