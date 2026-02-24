import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import { Search, Calendar, Layout, ChevronDown, Loader2, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';

const HomeworkEvaluation = () => {
    const navigate = useNavigate();

    // ── master data
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);

    // ── filter state
    const [filters, setFilters] = useState({ classId: '', section: '', subjectId: '', date: '' });
    const [sections, setSections] = useState([]);

    // ── search results
    const [homeworkList, setHomeworkList] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searched, setSearched] = useState(false);

    // ── evaluation state: { [studentId]: { marks, remarks, status } }
    const [evaluations, setEvaluations] = useState({});
    const [saving, setSaving] = useState(false);

    // ── fetch classes & subjects on mount
    useEffect(() => {
        api.get('/api/academic/classes').then(({ data }) => setClasses(data)).catch(console.error);
        api.get('/api/academic/subjects').then(({ data }) => setSubjects(data)).catch(console.error);
    }, []);

    // ── when class changes, update available sections
    useEffect(() => {
        if (!filters.classId) { setSections([]); return; }
        const cls = classes.find(c => c._id === filters.classId);
        setSections(cls?.sections || []);
        setFilters(f => ({ ...f, section: '', subjectId: '' }));
    }, [filters.classId, classes]);

    const filteredSubjects = subjects.filter(s =>
        !filters.classId || (s.class?._id?.toString() === filters.classId || s.class?.toString() === filters.classId)
    );

    const handleFilterChange = (key, value) => setFilters(f => ({ ...f, [key]: value }));

    // ── Search homework
    const handleSearch = async () => {
        if (!filters.classId || !filters.subjectId) {
            alert('Please select Class and Subject');
            return;
        }
        setSearching(true);
        setSearched(false);
        try {
            const params = { classId: filters.classId, subjectId: filters.subjectId };
            if (filters.section) params.section = filters.section;
            if (filters.date) params.from = filters.date;
            const { data } = await api.get('/api/homework', { params });
            setHomeworkList(data);
            setSearched(true);
            // Init evaluation state
            const init = {};
            data.forEach(hw => { init[hw._id] = { marks: '', remarks: '', evaluated: hw.status === 'Evaluated' }; });
            setEvaluations(init);
        } catch (err) {
            console.error('Search homework error:', err);
        } finally {
            setSearching(false);
        }
    };

    // ── Evaluate single homework
    const handleEvaluate = async (hwId) => {
        setSaving(true);
        try {
            await api.post(`/api/homework/${hwId}/evaluate`, {
                marks: evaluations[hwId]?.marks,
                remarks: evaluations[hwId]?.remarks
            });
            setEvaluations(prev => ({ ...prev, [hwId]: { ...prev[hwId], evaluated: true } }));
            setHomeworkList(prev => prev.map(hw => hw._id === hwId ? { ...hw, status: 'Evaluated' } : hw));
        } catch (err) {
            alert('Failed to mark as evaluated');
        } finally {
            setSaving(false);
        }
    };

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1 italic">
            {children} {required && <span className="text-rose-500">*</span>}
        </label>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Homework Evaluation</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span>Homework</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Homework Evaluation</span>
                </div>
            </div>

            {/* Select Criteria */}
            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[40px] overflow-hidden relative">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest italic">Select Criteria</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-end">
                    {/* Class */}
                    <div className="space-y-1">
                        <Label required>Class</Label>
                        <div className="relative group">
                            <select
                                value={filters.classId}
                                onChange={e => handleFilterChange('classId', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-[#7c32ff]/5 focus:border-[#7c32ff] transition-all appearance-none cursor-pointer italic"
                            >
                                <option value="">Select Class *</option>
                                {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                        </div>
                    </div>

                    {/* Section */}
                    <div className="space-y-1">
                        <Label>Section</Label>
                        <div className="relative group">
                            <select
                                value={filters.section}
                                onChange={e => handleFilterChange('section', e.target.value)}
                                disabled={!filters.classId}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-[#7c32ff]/5 focus:border-[#7c32ff] transition-all appearance-none cursor-pointer italic disabled:opacity-40"
                            >
                                <option value="">All Sections</option>
                                {sections.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                        </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1">
                        <Label required>Subject</Label>
                        <div className="relative group">
                            <select
                                value={filters.subjectId}
                                onChange={e => handleFilterChange('subjectId', e.target.value)}
                                disabled={!filters.classId}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-[#7c32ff]/5 focus:border-[#7c32ff] transition-all appearance-none cursor-pointer italic disabled:opacity-40"
                            >
                                <option value="">Select Subject *</option>
                                {filteredSubjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                        </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-1">
                        <Label>Homework Date</Label>
                        <div className="relative group">
                            <input
                                type="date"
                                value={filters.date}
                                onChange={e => handleFilterChange('date', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-[#7c32ff]/5 focus:border-[#7c32ff] transition-all italic"
                            />
                            <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-10">
                    <Button
                        onClick={handleSearch}
                        disabled={searching}
                        className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-10 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-50"
                    >
                        {searching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} strokeWidth={3} />}
                        <span>SEARCH</span>
                    </Button>
                </div>

                {/* Decorative Icon */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-[#7c32ff] rounded-l-xl flex items-center justify-center">
                    <Layout className="text-white" size={18} />
                </div>
            </Card>

            {/* Results Table */}
            {searched && (
                <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[40px] overflow-hidden">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest italic mb-8">Homework List</h3>
                    {homeworkList.length === 0 ? (
                        <p className="py-10 text-center text-xs font-black text-slate-300 uppercase tracking-widest italic">No homework found for the selected criteria</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        {['Topic', 'Class', 'Section', 'Subject', 'Due Date', 'Max Marks', 'Status', 'Action'].map((h, i) => (
                                            <th key={i} className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left first:rounded-l-2xl last:rounded-r-2xl">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {homeworkList.map(hw => (
                                        <tr key={hw._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-4 text-xs font-semibold text-slate-700">{hw.topic}</td>
                                            <td className="py-4 px-4 text-xs text-slate-500">{hw.class?.name || '-'}</td>
                                            <td className="py-4 px-4 text-xs text-slate-500">{hw.section || '-'}</td>
                                            <td className="py-4 px-4 text-xs text-slate-500">{hw.subject?.name || '-'}</td>
                                            <td className="py-4 px-4 text-xs text-slate-500">{hw.dueDate ? new Date(hw.dueDate).toLocaleDateString('en-IN') : '-'}</td>
                                            <td className="py-4 px-4 text-xs text-slate-500">{hw.maxMarks ?? '-'}</td>
                                            <td className="py-4 px-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${hw.status === 'Evaluated' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                    {hw.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                {hw.status === 'Evaluated' ? (
                                                    <span className="flex items-center space-x-1 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                                                        <Check size={12} strokeWidth={3} />
                                                        <span>Done</span>
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEvaluate(hw._id)}
                                                        disabled={saving}
                                                        className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest flex items-center space-x-1 active:scale-95 transition-all disabled:opacity-40"
                                                    >
                                                        {saving ? <Loader2 size={10} className="animate-spin" /> : <Check size={10} strokeWidth={3} />}
                                                        <span>Mark Evaluated</span>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
};

export default HomeworkEvaluation;
