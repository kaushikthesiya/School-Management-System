import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card } from '../../components/SnowUI';
import {
    Layout, Globe, FastForward, Clock, Calendar,
    Plus, Trash2, CheckCircle2, MoreVertical,
    Settings, Layers, Users, Zap
} from 'lucide-react';
import { format } from 'date-fns';
import { formatTimeTo12Hour } from '../../utils/timeFormat';
import TimePicker from '../../components/TimePicker';

const AcademicManagement = () => {
    const [activeTab, setActiveTab] = useState('Medium');
    const [structure, setStructure] = useState({
        mediums: [],
        shifts: [],
        streams: [],
        semesters: []
    });
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form States
    const [newItem, setNewItem] = useState('');
    const [newShift, setNewShift] = useState({ name: '', startTime: '', endTime: '' });
    const [newSession, setNewSession] = useState({ year: '', startDate: '', endDate: '', status: 'Upcoming' });

    const fetchData = async () => {
        try {
            const [structRes, sessRes] = await Promise.all([
                api.get('/api/academic/structure'),
                api.get('/api/academic/sessions')
            ]);
            setStructure(structRes.data);
            setSessions(sessRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateStructure = async (updatedFields) => {
        setLoading(true);
        try {
            const res = await api.patch('/api/academic/structure', updatedFields);
            setStructure(res.data);
            setNewItem('');
            setNewShift({ name: '', startTime: '', endTime: '' });
        } catch (error) {
            console.error('Update Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSimpleItem = (field) => {
        if (!newItem) return;
        const currentList = structure[field] || [];
        if (currentList.includes(newItem)) {
            alert('Item already exists');
            return;
        }
        updateStructure({ [field]: [...currentList, newItem] });
    };

    const handleRemoveSimpleItem = (field, index) => {
        const currentList = [...structure[field]];
        currentList.splice(index, 1);
        updateStructure({ [field]: currentList });
    };

    const handleAddShift = () => {
        if (!newShift.name || !newShift.startTime || !newShift.endTime) return;
        updateStructure({ shifts: [...structure.shifts, newShift] });
    };

    const handleAddSession = async () => {
        if (!newSession.year) return;
        setLoading(true);
        try {
            await api.post('/api/academic/sessions', newSession);
            setNewSession({ year: '', startDate: '', endDate: '', status: 'Upcoming' });
            fetchData();
        } catch (error) {
            console.error('Session Add Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { name: 'Medium', icon: <Globe size={18} /> },
        { name: 'Stream', icon: <Layers size={18} /> },
        { name: 'Shift', icon: <Clock size={18} /> },
        { name: 'Session', icon: <Calendar size={18} /> },
        { name: 'Semester', icon: <FastForward size={18} /> }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Academic Management
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Academics</span>
                    <span>|</span>
                    <span className="text-primary/70">Academic Management</span>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-4 bg-white p-2 rounded-[20px] shadow-snow-sm overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all font-black italic uppercase tracking-widest text-[11px] ${activeTab === tab.name
                            ? 'bg-[#7c32ff] text-white shadow-lg shadow-purple-500/20'
                            : 'text-slate-400 hover:bg-slate-50'
                            }`}
                    >
                        {tab.icon}
                        <span>{tab.name}</span>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Form */}
                <div className="lg:col-span-1">
                    <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white sticky top-24">
                        <h2 className="text-[#3E4D67] text-lg font-bold mb-8">Add {activeTab}</h2>

                        {(activeTab === 'Medium' || activeTab === 'Stream' || activeTab === 'Semester') && (
                            <div className="space-y-6">
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{activeTab} Name *</label>
                                    <input
                                        className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                        type="text"
                                        placeholder={`Enter ${activeTab} Name`}
                                        value={newItem}
                                        onChange={(e) => setNewItem(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={() => handleAddSimpleItem(activeTab.toLowerCase() + 's')}
                                    disabled={loading}
                                    className="w-full !bg-[#7c32ff] !rounded-lg flex items-center justify-center space-x-2 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all text-white font-black italic uppercase tracking-widest text-[11px]"
                                >
                                    <Plus size={16} />
                                    <span>Add {activeTab}</span>
                                </Button>
                            </div>
                        )}

                        {activeTab === 'Shift' && (
                            <div className="space-y-6">
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Shift Name *</label>
                                    <input
                                        className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                        type="text"
                                        placeholder="e.g., Morning"
                                        value={newShift.name}
                                        onChange={(e) => setNewShift({ ...newShift, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2 text-left">
                                        <TimePicker
                                            label="Start *"
                                            value={newShift.startTime}
                                            onChange={(val) => setNewShift({ ...newShift, startTime: val })}
                                        />
                                    </div>
                                    <div className="space-y-2 text-left">
                                        <TimePicker
                                            label="End *"
                                            value={newShift.endTime}
                                            onChange={(val) => setNewShift({ ...newShift, endTime: val })}
                                        />
                                    </div>
                                </div>
                                <Button
                                    onClick={handleAddShift}
                                    disabled={loading}
                                    className="w-full !bg-[#7c32ff] !rounded-lg flex items-center justify-center space-x-2 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all text-white font-black italic uppercase tracking-widest text-[11px]"
                                >
                                    <Plus size={16} />
                                    <span>Add Shift</span>
                                </Button>
                            </div>
                        )}

                        {activeTab === 'Session' && (
                            <div className="space-y-6">
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Academic Year *</label>
                                    <input
                                        className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                        type="text"
                                        placeholder="e.g., 2024-2025"
                                        value={newSession.year}
                                        onChange={(e) => setNewSession({ ...newSession, year: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                                    <input
                                        className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                        type="date"
                                        value={newSession.startDate}
                                        onChange={(e) => setNewSession({ ...newSession, startDate: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">End Date</label>
                                    <input
                                        className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                        type="date"
                                        value={newSession.endDate}
                                        onChange={(e) => setNewSession({ ...newSession, endDate: e.target.value })}
                                    />
                                </div>
                                <Button
                                    onClick={handleAddSession}
                                    disabled={loading}
                                    className="w-full !bg-[#7c32ff] !rounded-lg flex items-center justify-center space-x-2 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all text-white font-black italic uppercase tracking-widest text-[11px]"
                                >
                                    <Plus size={16} />
                                    <span>Create Session</span>
                                </Button>
                            </div>
                        )}

                        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                                <Zap size={12} className="mr-2 text-yellow-500" /> Quick Setup Tip
                            </h4>
                            <p className="text-[10px] text-slate-400 font-bold leading-relaxed italic">
                                Use this module to define your school's structural DNA. These master data points will be available across the campus panel.
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Right Column: List */}
                <div className="lg:col-span-3">
                    <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden min-h-[500px]">
                        <div className="flex justify-between items-center mb-8 px-2">
                            <h2 className="text-lg font-bold text-[#3E4D67]">{activeTab} List</h2>
                            <Settings className="text-slate-200" size={20} />
                        </div>

                        <div className="overflow-x-auto rounded-[20px]">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#F8FAFC] border-y border-slate-100 uppercase tracking-widest text-[10px] font-black text-slate-400">
                                        <th className="px-6 py-4">#</th>
                                        <th className="px-6 py-4">{activeTab} Info</th>
                                        {activeTab === 'Shift' && <th className="px-6 py-4 text-center">Timing</th>}
                                        {activeTab === 'Session' && <th className="px-6 py-4 text-center">Status</th>}
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-[12px] font-bold">
                                    {activeTab === 'Medium' && structure.mediums.map((item, i) => (
                                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 text-slate-400">{i + 1}</td>
                                            <td className="px-6 py-4">
                                                <span className="text-[#7c32ff] uppercase italic tracking-wide">{item}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleRemoveSimpleItem('mediums', i)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {activeTab === 'Stream' && structure.streams.map((item, i) => (
                                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 text-slate-400">{i + 1}</td>
                                            <td className="px-6 py-4 text-[#7c32ff] uppercase italic tracking-wide">{item}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleRemoveSimpleItem('streams', i)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {activeTab === 'Semester' && structure.semesters.map((item, i) => (
                                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 text-slate-400">{i + 1}</td>
                                            <td className="px-6 py-4 text-[#7c32ff] uppercase italic tracking-wide">{item}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleRemoveSimpleItem('semesters', i)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {activeTab === 'Shift' && structure.shifts.map((item, i) => (
                                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 text-slate-400">{i + 1}</td>
                                            <td className="px-6 py-4 text-[#7c32ff] uppercase italic tracking-wide">{item.name}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center items-center space-x-2">
                                                    <span className="bg-slate-50 px-3 py-1 rounded-md text-[10px] text-slate-400 border border-slate-100 font-black">{formatTimeTo12Hour(item.startTime)}</span>
                                                    <span className="text-slate-200">→</span>
                                                    <span className="bg-slate-50 px-3 py-1 rounded-md text-[10px] text-slate-400 border border-slate-100 font-black">{formatTimeTo12Hour(item.endTime)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleRemoveSimpleItem('shifts', i)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {activeTab === 'Session' && sessions.map((item, i) => (
                                        <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 text-slate-400">{i + 1}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col text-left">
                                                    <span className="text-[#7c32ff] uppercase italic tracking-wide">{item.year}</span>
                                                    <span className="text-[10px] text-slate-400 font-bold italic">
                                                        {item.startDate ? format(new Date(item.startDate), 'MMM yyyy') : '--'} to {item.endDate ? format(new Date(item.endDate), 'MMM yyyy') : '--'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === 'Active' ? 'bg-green-50 text-green-500 border border-green-100' :
                                                    item.status === 'Completed' ? 'bg-slate-50 text-slate-400 border border-slate-100' :
                                                        'bg-blue-50 text-blue-500 border border-blue-100'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end items-center space-x-2">
                                                    <button className="border border-slate-100 rounded-full px-4 py-1.5 flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-[#7c32ff] transition-all bg-white shadow-sm opacity-0 group-hover:opacity-100">
                                                        <span>Activate</span>
                                                    </button>
                                                    <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <Card className="p-6 bg-gradient-to-br from-[#7c32ff]/5 to-[#7c32ff]/10 border-none rounded-[20px] flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-purple-500/10">
                                <Users className="text-[#7c32ff]" size={24} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Class Management</h4>
                                <p className="text-xs font-bold text-slate-800 italic underline decoration-[#7c32ff]/20 cursor-pointer hover:text-[#7c32ff] transition-all">Setup Class & Sections</p>
                            </div>
                        </Card>
                        <Card className="p-6 bg-gradient-to-br from-green-500/5 to-green-500/10 border-none rounded-[20px] flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-green-500/10">
                                <Layers className="text-green-500" size={24} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bulk Setup</h4>
                                <p className="text-xs font-bold text-slate-800 italic underline decoration-green-500/20 cursor-pointer hover:text-green-500 transition-all">Bulk Class Allocation</p>
                            </div>
                        </Card>
                        <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-none rounded-[20px] flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-blue-500/10">
                                <Settings className="text-blue-500" size={24} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Advanced Setup</h4>
                                <p className="text-xs font-bold text-slate-800 italic underline decoration-blue-500/20 cursor-pointer hover:text-blue-500 transition-all">Global Configurations</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicManagement;
