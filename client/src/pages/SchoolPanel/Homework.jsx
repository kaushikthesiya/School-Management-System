import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card, Input } from '../../components/SnowUI';
import { Plus, Book, Calendar, User, Clock, CheckCircle, X, Search } from 'lucide-react';

const Homework = () => {
    const [homework, setHomework] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newHomework, setNewHomework] = useState({
        class: '', section: 'A', subject: '', topic: '', description: '', dueDate: '', maxMarks: 10
    });

    const fetchData = async () => {
        try {
            const [hwRes, classRes, subRes] = await Promise.all([
                api.get('/api/homework'),
                api.get('/api/academic/classes'),
                api.get('/api/academic/subjects')
            ]);
            setHomework(hwRes.data);
            setClasses(classRes.data);
            setSubjects(subRes.data);
        } catch (error) {
            console.error('Error fetching homework');
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/homework', newHomework);
            setShowAddModal(false);
            setNewHomework({ class: '', section: 'A', subject: '', topic: '', description: '', dueDate: '', maxMarks: 10 });
            fetchData();
        } catch (error) {
            alert('Error assigning homework');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Homework Management</h1>
                    <p className="text-slate-500">Assign and track subject-wise daily tasks.</p>
                </div>
                <Button onClick={() => setShowAddModal(true)}><Plus size={20} /><span>Assign Homework</span></Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {homework.map(hw => (
                    <Card key={hw._id} className="hover:shadow-lg transition-all border-none">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2.5 bg-primary/5 rounded-2xl text-primary">
                                    <Book size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{hw.topic}</h3>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{hw.subject?.name}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold bg-slate-50 text-slate-400 px-2 py-1 rounded-lg">
                                CLASS {hw.class?.name}-{hw.section}
                            </span>
                        </div>

                        <p className="text-sm text-slate-500 line-clamp-2 mb-6">{hw.description}</p>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400 font-medium flex items-center space-x-1">
                                    <Clock size={12} />
                                    <span>Due Date:</span>
                                </span>
                                <span className="text-red-500 font-bold">{new Date(hw.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400 font-medium flex items-center space-x-1">
                                    <User size={12} />
                                    <span>Assigned By:</span>
                                </span>
                                <span className="text-slate-700 font-bold">{hw.assignedBy?.name || 'Teacher'}</span>
                            </div>
                        </div>

                        <div className="flex space-x-2 pt-4 border-t border-slate-50">
                            <Button variant="ghost" className="flex-1 text-xs h-9">Evaluation</Button>
                            <Button variant="ghost" className="flex-1 text-xs h-9">Details</Button>
                        </div>
                    </Card>
                ))}
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-primary">Assign Homework</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-red-500"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Class</label>
                                    <select
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                                        value={newHomework.class}
                                        onChange={e => setNewHomework({ ...newHomework, class: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map(c => <option key={c._id} value={c._id}>Class {c.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Subject</label>
                                    <select
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                                        value={newHomework.subject}
                                        onChange={e => setNewHomework({ ...newHomework, subject: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Subject</option>
                                        {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <Input label="Topic" value={newHomework.topic} onChange={e => setNewHomework({ ...newHomework, topic: e.target.value })} required />
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                                <textarea
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                                    rows="3"
                                    value={newHomework.description}
                                    onChange={e => setNewHomework({ ...newHomework, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Due Date" type="date" value={newHomework.dueDate} onChange={e => setNewHomework({ ...newHomework, dueDate: e.target.value })} required />
                                <Input label="Max Marks" type="number" value={newHomework.maxMarks} onChange={e => setNewHomework({ ...newHomework, maxMarks: e.target.value })} />
                            </div>
                            <Button type="submit" className="w-full h-12 rounded-2xl font-bold mt-4 shadow-lg shadow-primary/20">Assign Now</Button>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Homework;
