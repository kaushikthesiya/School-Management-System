import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card, Input } from '../../components/SnowUI';
import { AlertCircle, Plus, User, Calendar, Search, X, MessageSquare, CheckCircle } from 'lucide-react';

const Discipline = () => {
    const [records, setRecords] = useState([]);
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newRecord, setNewRecord] = useState({
        student: '', class: '', category: 'Behavior', description: ''
    });

    const fetchData = async () => {
        try {
            const [recRes, studRes, classRes] = await Promise.all([
                api.get('/api/discipline'),
                api.get('/api/students'),
                api.get('/api/academic/classes')
            ]);
            setRecords(recRes.data);
            setStudents(studRes.data);
            setClasses(classRes.data);
        } catch (error) {
            console.error('Error fetching data');
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/discipline', newRecord);
            setShowAddModal(false);
            setNewRecord({ student: '', class: '', category: 'Behavior', description: '' });
            fetchData();
        } catch (error) {
            alert('Error logging discipline record');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-primary italic tracking-tight">Discipline Log</h1>
                    <p className="text-slate-400 font-medium tracking-tight">Track student behavior and conduct records.</p>
                </div>
                <Button onClick={() => setShowAddModal(true)} variant="outline" className="border-2 border-red-500/20 text-red-500 hover:bg-red-50">
                    <AlertCircle size={20} />
                    <span>Report Incident</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {records.map(rec => (
                    <Card key={rec._id} className="border-none hover:shadow-xl transition-all group overflow-hidden">
                        <div className={`h-1.5 w-full absolute top-0 left-0 ${rec.category === 'Uniform' ? 'bg-blue-500' :
                                rec.category === 'Behavior' ? 'bg-amber-500' :
                                    rec.category === 'Late' ? 'bg-rose-500' : 'bg-primary'
                            }`}></div>

                        <div className="flex justify-between items-start mb-4 mt-2">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{rec.student?.name}</h3>
                                    <p className="text-[10px] font-bold text-primary/70 uppercase tracking-widest">{rec.class?.name}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-black bg-slate-50 text-slate-400 px-2.5 py-1 rounded-full uppercase tracking-tighter self-start">
                                {rec.category}
                            </span>
                        </div>

                        <p className="text-xs font-medium text-slate-500 bg-slate-50/50 p-3 rounded-xl min-h-[60px]">{rec.description}</p>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
                                <Calendar size={12} />
                                <span>{new Date(rec.date).toLocaleDateString()}</span>
                            </div>
                            <div className={`flex items-center space-x-1 text-[10px] font-bold ${rec.status === 'Open' ? 'text-blue-500' : 'text-emerald-500'
                                }`}>
                                {rec.status === 'Open' ? <MessageSquare size={12} /> : <CheckCircle size={12} />}
                                <span>{rec.status}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-primary">Report Discipline Incident</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-red-500"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Student</label>
                                <select
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                                    value={newRecord.student}
                                    onChange={e => {
                                        const s = students.find(stud => stud._id === e.target.value);
                                        setNewRecord({ ...newRecord, student: e.target.value, class: s?.class?._id || '' });
                                    }}
                                    required
                                >
                                    <option value="">Select Student</option>
                                    {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.admissionNo})</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                                <select
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                                    value={newRecord.category}
                                    onChange={e => setNewRecord({ ...newRecord, category: e.target.value })}
                                    required
                                >
                                    {['Uniform', 'Behavior', 'Late', 'Homework', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                                <textarea
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                                    rows="4"
                                    placeholder="Explain the incident in detail..."
                                    value={newRecord.description}
                                    onChange={e => setNewRecord({ ...newRecord, description: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <Button type="submit" className="w-full h-12 rounded-2xl font-bold mt-4 bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200">Log Incident</Button>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Discipline;
