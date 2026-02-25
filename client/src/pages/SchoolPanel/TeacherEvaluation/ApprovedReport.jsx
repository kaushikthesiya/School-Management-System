import React, { useState, useEffect } from 'react';
import { Card, Button } from '../../../components/SnowUI';
import {
    Search,
    Copy,
    FileText,
    Download,
    Printer,
    Layout,
    ChevronLeft,
    ChevronRight,
    Search as SearchIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import api from '../../../api/api';

const ApprovedReport = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [evaluations, setEvaluations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [filters, setFilters] = useState({
        class: '',
        subject: '',
        section: '',
        teacher: '',
        submittedBy: ''
    });

    const fetchOptions = async () => {
        try {
            const [classRes, sectionRes, subjectRes, staffRes] = await Promise.all([
                api.get('/api/academic/classes'),
                api.get('/api/academic/sections'),
                api.get('/api/academic/subjects'),
                api.get('/api/staff?role=Teacher')
            ]);
            setClasses(classRes.data);
            setSections(sectionRes.data);
            setSubjects(subjectRes.data);
            setTeachers(staffRes.data);
        } catch (error) {
            console.error('Error fetching filter options:', error);
        }
    };

    const fetchEvaluations = async () => {
        setLoading(true);
        try {
            const params = {
                status: 'Approved',
                classId: filters.class,
                subjectId: filters.subject,
                sectionId: filters.section,
                teacher: filters.teacher,
                submittedBy: filters.submittedBy
            };
            const { data } = await api.get('/api/teacher-evaluation', { params });
            setEvaluations(data);
        } catch (error) {
            console.error('Error fetching evaluations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOptions();
        fetchEvaluations();
    }, []);

    const ActionIcon = ({ Icon }) => (
        <button className="p-2 rounded-lg text-slate-400 hover:text-[#7c32ff] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
            <Icon size={14} />
        </button>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* ... Header and Filter sections (kept as is for now, maybe hook up filters later if needed) ... */}

            {/* ... (Skipping Header and Filter code in replacement for brevity if not changing, but wait, replace_file_content needs context. 
                   I will target the whole component content to be safe or just the parts I'm changing. 
                   Actually, I need to keep the filter UI but maybe make it functional later. 
                   For now, I'll just replace the table body and the setup logic.) 
            */}
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Teacher Approved Evaluation Report</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-[#7c32ff] cursor-pointer">Teacher Evaluation</span>
                    <span>|</span>
                    <span className="text-[#1C1C1C]">Teacher Approved Evaluation Report</span>
                </div>
            </div>

            {/* Filter Section */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8 italic">Teacher Approved Evaluation Report</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 mb-8 pr-10">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">CLASS *</label>
                        <select
                            value={filters.class}
                            onChange={(e) => setFilters({ ...filters, class: e.target.value })}
                            className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-[11px] font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer italic"
                        >
                            <option value="">Select Class *</option>
                            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">SUBJECT</label>
                        <select
                            value={filters.subject}
                            onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                            className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-[11px] font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer italic"
                        >
                            <option value="">Select Subject</option>
                            {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">SECTION</label>
                        <select
                            value={filters.section}
                            onChange={(e) => setFilters({ ...filters, section: e.target.value })}
                            className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-[11px] font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer italic"
                        >
                            <option value="">Select</option>
                            {sections.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">TEACHER</label>
                        <select
                            value={filters.teacher}
                            onChange={(e) => setFilters({ ...filters, teacher: e.target.value })}
                            className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-[11px] font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer italic"
                        >
                            <option value="">Select Teacher</option>
                            {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">SUBMITTED BY</label>
                        <select
                            value={filters.submittedBy}
                            onChange={(e) => setFilters({ ...filters, submittedBy: e.target.value })}
                            className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-[11px] font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer italic"
                        >
                            <option value="">Select Submitted By</option>
                            <option value="student">Student</option>
                            <option value="parent">Parent</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end pr-10 -mt-4">
                    <Button onClick={fetchEvaluations} className="!bg-[#7c32ff] !rounded-lg flex items-center space-x-2 px-8 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                        <SearchIcon size={14} strokeWidth={3} />
                        <span className="uppercase text-[11px] font-black tracking-widest">SEARCH</span>
                    </Button>
                </div>
            </Card>

            {/* Table Section */}
            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                <div className="flex flex-col space-y-8">
                    <div className="flex justify-between items-center">
                        <div className="flex-1 max-w-md relative group">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="SEARCH"
                                className="bg-transparent border-b border-slate-100 py-2 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:border-[#7c32ff] transition-all w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-1 border border-purple-100 rounded-2xl p-1.5 bg-purple-50/30">
                            <ActionIcon Icon={Copy} />
                            <ActionIcon Icon={FileText} />
                            <ActionIcon Icon={Download} />
                            <ActionIcon Icon={Layout} />
                            <ActionIcon Icon={Printer} />
                            <ActionIcon Icon={Layout} />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-50 italic text-slate-400">
                                    <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center space-x-1"><span>↓Staff Id</span></div>
                                    </th>
                                    <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center space-x-1"><span>↓Teacher Name</span></div>
                                    </th>
                                    <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center space-x-1"><span>↓Submitted By</span></div>
                                    </th>
                                    <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center space-x-1"><span>↓Class (Section)</span></div>
                                    </th>
                                    <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center space-x-1"><span>↓Rating</span></div>
                                    </th>
                                    <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center space-x-1"><span>↓Comment</span></div>
                                    </th>
                                    <th className="text-left py-5 px-4 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                        <div className="flex items-center space-x-1"><span>↓Status</span></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {evaluations.length > 0 ? (
                                    evaluations.map((evaluate) => (
                                        <tr key={evaluate._id} className="hover:bg-slate-50/50 transition-all border-b border-slate-50">
                                            <td className="py-4 px-4 text-xs font-bold text-slate-400">{evaluate.teacher?.staffId || 'N/A'}</td>
                                            <td className="py-4 px-4 text-xs font-bold text-slate-700">{evaluate.teacher?.name || 'N/A'}</td>
                                            <td className="py-4 px-4 text-xs font-bold text-slate-600">{evaluate.submittedBy?.name || 'N/A'}</td>
                                            <td className="py-4 px-4 text-xs font-bold text-slate-600">{evaluate.class?.name || 'N/A'} ({evaluate.section?.name || 'N/A'})</td>
                                            <td className="py-4 px-4 text-xs font-bold text-slate-600">{evaluate.rating} / 5</td>
                                            <td className="py-4 px-4 text-xs font-bold text-slate-600 truncate max-w-xs">{evaluate.comment}</td>
                                            <td className="py-4 px-4">
                                                <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-wider">
                                                    {evaluate.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="py-12 text-center">
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">No Approved Evaluations Found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span>Showing 0 to 0 of 0 entries</span>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-xl text-slate-300 hover:text-[#7c32ff] transition-all">
                                <ChevronLeft size={16} />
                            </button>
                            <button className="p-2 rounded-xl text-slate-300 hover:text-[#7c32ff] transition-all">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Basket Icon decorator */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-12 h-12 bg-[#7c32ff] rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/20 transform rotate-45">
                    <div className="-rotate-45">
                        <Layout size={20} className="text-white" />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ApprovedReport;
