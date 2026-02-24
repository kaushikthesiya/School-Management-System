import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Input, Card } from '../../components/SnowUI';
import { ClipboardList, Plus, Search, Calendar, Award, CheckCircle, X, Save, Edit3, Trash2 } from 'lucide-react';

const Examination = () => {
    const [activeTab, setActiveTab] = useState('exams');
    const [exams, setExams] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newExam, setNewExam] = useState({ name: '', class: '', date: '', subjects: [{ name: '', maxMarks: 100 }] });

    // Grade Scale State
    const [gradeScales, setGradeScales] = useState([]);
    const [showGradeModal, setShowGradeModal] = useState(false);
    const [newGrade, setNewGrade] = useState({ grade: '', minPercentage: 0, maxPercentage: 100, point: 0, remarks: '' });

    // Marks Entry State
    const [marksEntry, setMarksEntry] = useState({ exam: '', subject: '', marks: [] });
    const [students, setStudents] = useState([]);

    const fetchData = async () => {
        try {
            const [classRes, examRes, gradeRes] = await Promise.all([
                api.get('/api/academic/classes'),
                api.get(`/api/exams${selectedClass ? `?classId=${selectedClass}` : ''}`),
                api.get('/api/exams/grade-scales')
            ]);
            setClasses(classRes.data);
            setExams(examRes.data);
            setGradeScales(gradeRes.data);
        } catch (error) {
            console.error('Error fetching data');
        }
    };

    useEffect(() => { fetchData(); }, [selectedClass]);

    const handleCreateExam = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/exams', newExam);
            setShowAddModal(false);
            setNewExam({ name: '', class: '', date: '', subjects: [{ name: '', maxMarks: 100 }] });
            fetchData();
        } catch (error) {
            alert('Error creating exam');
        }
    };

    const handleCreateGrade = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/exams/grade-scales', newGrade);
            setShowGradeModal(false);
            setNewGrade({ grade: '', minPercentage: 0, maxPercentage: 100, point: 0, remarks: '' });
            fetchData();
        } catch (error) {
            alert('Error creating grade scale');
        }
    };

    const startMarksEntry = async (exam) => {
        setActiveTab('marks');
        setMarksEntry({ ...marksEntry, exam: exam._id, subject: exam.subjects[0]?.name });
        try {
            const studRes = await api.get(`/api/students?classId=${exam.class?._id}`);
            setStudents(studRes.data);
            // Pre-fill marks with 0 or existing if any (simplified)
            setMarksEntry(prev => ({ ...prev, marks: studRes.data.map(s => ({ student: s._id, marksObtained: 0 })) }));
        } catch (error) {
            console.error('Error fetching students for marks entry');
        }
    };

    const saveMarks = async () => {
        try {
            await api.post('/api/exams/marks', marksEntry);
            alert('Marks saved successfully');
            setActiveTab('exams');
        } catch (error) {
            alert('Error saving marks');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-primary italic tracking-tight underline decoration-primary/20 underline-offset-8">Examination & Results</h1>
                    <p className="text-slate-400 font-medium mt-1">Configure assessments, grades, and record student performance.</p>
                </div>
                <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
                    {['exams', 'marks', 'grades'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-primary'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'exams' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <select className="bg-white border-none rounded-2xl px-4 py-2 text-sm font-bold text-slate-600 shadow-sm outline-none" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                            <option value="">All Classes</option>
                            {classes.map(c => <option key={c._id} value={c._id}>Class {c.name}</option>)}
                        </select>
                        <Button onClick={() => setShowAddModal(true)}><Plus size={20} /><span>Schedule Exam</span></Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exams.map(exam => (
                            <Card key={exam._id} className="border-none hover:shadow-2xl hover:-translate-y-1 transition-all group overflow-hidden">
                                <div className="p-4 flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <Award size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-black text-slate-800 italic uppercase italic">{exam.name}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Class {exam.class?.name} • {new Date(exam.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="mt-4 px-4 space-y-2">
                                    <div className="text-[9px] font-black text-primary/40 uppercase tracking-widest">Subjects</div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {exam.subjects.map((s, i) => (
                                            <span key={i} className="px-2 py-0.5 rounded-md bg-slate-50 text-[10px] font-bold text-slate-500 border border-slate-100">{s.name}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-6 flex border-t border-slate-50">
                                    <button onClick={() => startMarksEntry(exam)} className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition-colors border-r border-slate-50">Enter Marks</button>
                                    <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-colors">Results</button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'grades' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">Grade Configuration</h2>
                        <Button onClick={() => setShowGradeModal(true)}><Plus size={20} /><span>Add Grade</span></Button>
                    </div>
                    <Card className="border-none shadow-xl overflow-hidden p-0">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Grade</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Range (%)</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">G. Point</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Remarks</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {gradeScales.map(gs => (
                                    <tr key={gs._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4"><span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black">{gs.grade}</span></td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-600">{gs.minPercentage}% - {gs.maxPercentage}%</td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-600">{gs.point}</td>
                                        <td className="px-6 py-4 text-sm text-slate-400">{gs.remarks}</td>
                                        <td className="px-6 py-4 text-right"><button className="text-slate-300 hover:text-red-500"><Trash2 size={16} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            )}

            {activeTab === 'marks' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Marks Entry</h2>
                            <p className="text-xs text-slate-400">Entering marks for <span className="text-primary font-bold">{marksEntry.subject}</span></p>
                        </div>
                        <div className="flex space-x-3">
                            <Button variant="outline" onClick={() => setActiveTab('exams')}>Cancel</Button>
                            <Button onClick={saveMarks}><Save size={18} /><span>Save All Marks</span></Button>
                        </div>
                    </div>

                    <Card className="border-none shadow-2xl p-0 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Roll / Adm No</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Student Name</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Marks Obtained</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {students.map((student, idx) => (
                                    <tr key={student._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-slate-400">#{student.admissionNo}</td>
                                        <td className="px-6 py-4 font-bold text-slate-700">{student.name}</td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="number"
                                                className="w-24 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold text-primary focus:ring-4 focus:ring-primary/5 outline-none"
                                                value={marksEntry.marks.find(m => m.student === student._id)?.marksObtained || 0}
                                                onChange={e => {
                                                    const newMarks = [...marksEntry.marks];
                                                    const markIdx = newMarks.findIndex(m => m.student === student._id);
                                                    newMarks[markIdx].marksObtained = parseInt(e.target.value);
                                                    setMarksEntry({ ...marksEntry, marks: newMarks });
                                                }}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input type="text" placeholder="Good" className="w-full bg-transparent border-b border-transparent focus:border-slate-100 text-xs py-1 outline-none" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            )}

            {/* Modals */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <Card className="w-full max-w-xl animate-in slide-in-from-bottom duration-300 border-none shadow-3xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-slate-800 italic uppercase">Schedule New Exam</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-red-500"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleCreateExam} className="space-y-4">
                            <Input label="Exam Title" placeholder="Mid Term 2024" value={newExam.name} onChange={e => setNewExam({ ...newExam, name: e.target.value })} required />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Class</label>
                                    <select className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-sm outline-none" value={newExam.class} onChange={e => setNewExam({ ...newExam, class: e.target.value })} required>
                                        <option value="">Choose Class</option>
                                        {classes.map(c => <option key={c._id} value={c._id}>Class {c.name}</option>)}
                                    </select>
                                </div>
                                <Input label="Exam Date" type="date" value={newExam.date} onChange={e => setNewExam({ ...newExam, date: e.target.value })} required />
                            </div>
                            <Button type="submit" className="w-full h-14 rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-primary/30 mt-6">Launch Exam Schedule</Button>
                        </form>
                    </Card>
                </div>
            )}

            {showGradeModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-primary">Define Grade</h2>
                            <button onClick={() => setShowGradeModal(false)} className="text-slate-300 hover:text-red-500"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleCreateGrade} className="space-y-4">
                            <Input label="Grade (e.g. A+)" value={newGrade.grade} onChange={e => setNewGrade({ ...newGrade, grade: e.target.value })} required />
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Min %" type="number" value={newGrade.minPercentage} onChange={e => setNewGrade({ ...newGrade, minPercentage: e.target.value })} />
                                <Input label="Max %" type="number" value={newGrade.maxPercentage} onChange={e => setNewGrade({ ...newGrade, maxPercentage: e.target.value })} />
                            </div>
                            <Input label="Grade Point" type="number" step="0.1" value={newGrade.point} onChange={e => setNewGrade({ ...newGrade, point: e.target.value })} />
                            <Input label="Remarks" value={newGrade.remarks} onChange={e => setNewGrade({ ...newGrade, remarks: e.target.value })} />
                            <Button type="submit" className="w-full h-12 rounded-2xl font-bold">Save Grade</Button>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Examination;
