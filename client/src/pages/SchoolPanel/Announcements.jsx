import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Input, Card } from '../../components/SnowUI';
import { Bell, Plus, Search, Megaphone, Trash2, Calendar, X } from 'lucide-react';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', priority: 'Normal', targetRoles: [] });

    const fetchAnnouncements = async () => {
        try {
            const { data } = await api.get('/api/announcements');
            setAnnouncements(data);
        } catch (error) {
            console.error('Error fetching announcements');
        }
    };

    useEffect(() => { fetchAnnouncements(); }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/announcements', newAnnouncement);
            setShowAddModal(false);
            fetchAnnouncements();
        } catch (error) {
            alert('Error creating announcement');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-primary italic">School Announcements</h1>
                    <p className="text-slate-500 font-medium">Broadcast news and updates to everyone.</p>
                </div>
                <Button onClick={() => setShowAddModal(true)} className="shadow-lg shadow-primary/10">
                    <Plus size={20} />
                    <span>Post New</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {announcements.map(a => (
                    <Card key={a._id} className="p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all border-none relative group overflow-hidden">
                        <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase ${a.priority === 'Urgent' ? 'bg-red-500 text-white' :
                                a.priority === 'High' ? 'bg-orange-500 text-white' : 'bg-primary/10 text-primary'
                            }`}>
                            {a.priority}
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary">
                                <Megaphone size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800 mb-1">{a.title}</h3>
                                <p className="text-sm text-slate-500 line-clamp-3">{a.content}</p>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span className="flex items-center space-x-1">
                                <Calendar size={12} />
                                <span>{new Date(a.createdAt).toLocaleDateString()}</span>
                            </span>
                            <span className="italic">{a.targetRoles.join(', ') || 'Everyone'}</span>
                        </div>
                    </Card>
                ))}
            </div>

            {announcements.length === 0 && (
                <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
                    <Bell size={48} className="mx-auto text-slate-100 mb-4" />
                    <p className="text-slate-400 font-medium italic">Quiet in the halls... No announcements yet.</p>
                </div>
            )}

            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-xl animate-in zoom-in duration-300 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border-none">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-primary italic">Post Announcement</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-red-500"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <Input label="Subject / Title" placeholder="e.g. Annual Day Notice" value={newAnnouncement.title} onChange={e => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })} required />
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Message Content</label>
                                <textarea
                                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium h-32"
                                    value={newAnnouncement.content}
                                    onChange={e => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Priority</label>
                                    <select
                                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-sm outline-none font-bold text-slate-600"
                                        value={newAnnouncement.priority}
                                        onChange={e => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                                    >
                                        <option value="Normal">Normal</option>
                                        <option value="High">High</option>
                                        <option value="Urgent">Urgent</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Target Audience</label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {['Student', 'Parent', 'Staff'].map(role => (
                                            <button
                                                key={role} type="button"
                                                onClick={() => {
                                                    const roles = newAnnouncement.targetRoles.includes(role)
                                                        ? newAnnouncement.targetRoles.filter(r => r !== role)
                                                        : [...newAnnouncement.targetRoles, role];
                                                    setNewAnnouncement({ ...newAnnouncement, targetRoles: roles });
                                                }}
                                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${newAnnouncement.targetRoles.includes(role) ? 'bg-primary text-white shadow-md' : 'bg-slate-100 text-slate-400'
                                                    }`}
                                            >
                                                {role}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-3 pt-6">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>Cancel</Button>
                                <Button type="submit" className="flex-1 shadow-lg shadow-primary/20">Broadcast Now</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Announcements;
