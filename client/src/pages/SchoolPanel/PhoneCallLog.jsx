import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Card, Button, Input, Select, Badge } from '../../components/SnowUI';
import { Search, Plus, Trash2, Edit3, Phone, Clock, Calendar, Check, Upload, ChevronDown, PhoneIncoming, PhoneOutgoing } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '../../context/ToastContext';

const PhoneCallLog = () => {
    const { showToast } = useToast();
    const [callLogs, setCallLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        nextFollowUpDate: '',
        callDuration: '',
        description: '',
        note: '',
        callType: 'Incoming'
    });

    const fetchCallLogs = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin-section/phone-call-log');
            setCallLogs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Fetch Call Logs Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCallLogs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/admin-section/phone-call-log', formData);
            showToast('Call log saved successfully!');
            setFormData({
                name: '', phone: '', date: format(new Date(), 'yyyy-MM-dd'),
                nextFollowUpDate: '', callDuration: '', description: '', note: '', callType: 'Incoming'
            });
            fetchCallLogs();
        } catch (error) {
            showToast('Error saving call log', 'error');
            console.error('Add Call Log Error:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this log?')) return;
        try {
            await api.delete(`/api/admin-section/phone-call-log/${id}`);
            showToast('Call log deleted');
            fetchCallLogs();
        } catch (error) {
            showToast('Error deleting log', 'error');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Phone Call Log
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Admin Section</span>
                    <span>|</span>
                    <span className="text-primary/70">Phone Call Log</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                {/* Add Call Log Form */}
                <div className="lg:col-span-1">
                    <Card className="p-8 border-none shadow-snow-lg rounded-[30px] bg-white relative overflow-hidden">
                        {/* Decorative Tab */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-[40px] flex items-center justify-center">
                            <Phone className="text-primary/20" size={24} />
                        </div>

                        <h2 className="text-lg font-black text-slate-800 italic uppercase mb-8 flex items-center space-x-3">
                            <span className="w-2 h-8 bg-primary rounded-full"></span>
                            <span>Add Call Log</span>
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                label="Name *"
                                placeholder="Enter Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />

                            <Input
                                label="Phone *"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Date"
                                    type="date"
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                                <Input
                                    label="Duration"
                                    placeholder="00:00"
                                    value={formData.callDuration}
                                    onChange={e => setFormData({ ...formData, callDuration: e.target.value })}
                                />
                            </div>

                            <Input
                                label="Next Follow Up"
                                type="date"
                                value={formData.nextFollowUpDate}
                                onChange={e => setFormData({ ...formData, nextFollowUpDate: e.target.value })}
                            />

                            <div className="space-y-3 pt-2">
                                <label className="text-sm font-bold text-navy-700 ml-1 italic uppercase tracking-wider">Call Type</label>
                                <div className="flex space-x-4">
                                    {['Incoming', 'Outgoing'].map((type) => (
                                        <label key={type} className="flex-1 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="callType"
                                                className="hidden"
                                                checked={formData.callType === type}
                                                onChange={() => setFormData({ ...formData, callType: type })}
                                            />
                                            <div className={`p-3 rounded-2xl border-2 text-center transition-all flex items-center justify-center space-x-2 ${formData.callType === type ? 'border-primary bg-primary/5 text-primary' : 'border-slate-50 bg-slate-50 text-slate-400 group-hover:border-slate-200'}`}>
                                                {type === 'Incoming' ? <PhoneIncoming size={14} /> : <PhoneOutgoing size={14} />}
                                                <span className="text-[10px] font-black uppercase tracking-widest">{type}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy-700 ml-1 italic uppercase tracking-wider">Description</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-100 rounded-[20px] p-5 text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none h-24"
                                    placeholder="Enter details..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy-700 ml-1 italic uppercase tracking-wider">Note</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-100 rounded-[20px] p-5 text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none h-24"
                                    placeholder="Add a note..."
                                    value={formData.note}
                                    onChange={e => setFormData({ ...formData, note: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-center pt-6">
                                <Button
                                    type="submit"
                                    className="w-full bg-[#1a1a1a] hover:bg-black text-white px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 shadow-2xl shadow-black/10 active:scale-95 transition-all group"
                                >
                                    <Check size={18} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
                                    <span className="font-black italic uppercase tracking-[0.2em] text-[11px]">Save Call Log</span>
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Call Log List */}
                <Card className="lg:col-span-3 p-0 border-none shadow-snow-lg rounded-[30px] overflow-hidden bg-white min-h-[600px]">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
                        <h2 className="text-lg font-black text-slate-800 italic uppercase flex items-center space-x-3">
                            <span className="w-2 h-8 bg-indigo-400 rounded-full"></span>
                            <span>Call Log List</span>
                        </h2>

                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="QUICK SEARCH"
                                className="pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 w-48 group-hover:w-64 transition-all"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Name</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Phone</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Date</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Next Follow Up</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Type</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center space-y-4">
                                                <div className="w-10 h-10 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Fetching...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : callLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-20 text-center text-slate-400 italic font-medium">
                                            No call logs documented yet.
                                        </td>
                                    </tr>
                                ) : (
                                    callLogs
                                        .filter(log =>
                                            log.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            log.phone?.toLowerCase().includes(searchQuery.toLowerCase())
                                        )
                                        .map((log) => (
                                            <tr key={log._id} className="group hover:bg-slate-50/30 transition-colors">
                                                <td className="px-8 py-5 text-sm font-black text-slate-700 italic uppercase underline decoration-primary/10 decoration-4 underline-offset-4">{log.name}</td>
                                                <td className="px-6 py-5 text-sm font-bold text-slate-500">{log.phone}</td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col text-[11px] font-bold">
                                                        <span className="text-slate-600">{format(new Date(log.date), 'dd MMM, yyyy')}</span>
                                                        <span className="text-slate-400 flex items-center mt-1">
                                                            <Clock size={10} className="mr-1" />
                                                            {log.callDuration || '00:00'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-sm font-bold text-slate-500">
                                                    {log.nextFollowUpDate ? format(new Date(log.nextFollowUpDate), 'dd MMM, yyyy') : '-'}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <Badge
                                                        variant={log.callType === 'Incoming' ? 'primary' : 'warning'}
                                                    >
                                                        {log.callType}
                                                    </Badge>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex justify-end items-center space-x-3 transform group-hover:translate-x-0 translate-x-4 opacity-0 group-hover:opacity-100 transition-all">
                                                        <button onClick={() => handleDelete(log._id)} className="p-2.5 text-rose-400 hover:bg-rose-50 rounded-xl transition-all" title="Delete">
                                                            <Trash2 size={16} />
                                                        </button>
                                                        <button className="flex items-center space-x-3 px-6 py-2.5 bg-white border-2 border-primary text-primary rounded-full text-[10px] font-black tracking-widest hover:bg-primary hover:text-white transition-all group shadow-lg shadow-primary/5 active:scale-95">
                                                            <span>SELECT</span>
                                                            <ChevronDown size={14} strokeWidth={3} className="group-hover:rotate-180 transition-transform" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PhoneCallLog;
