import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/SnowUI';
import {
    Save,
    Clock,
    Search,
    Download,
    Printer,
    FileText,
    Copy,
    ChevronLeft,
    ChevronRight,
    Terminal,
    ArrowLeft,
    Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useToast } from '../../context/ToastContext';

const SmsSendingTime = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [settingsList, setSettingsList] = useState([]);

    const [formData, setFormData] = useState({
        startTime: '09:00 AM',
        status: 'Active'
    });

    const fetchSettings = async () => {
        try {
            const res = await api.get('/api/academic/settings/sms');
            setSettingsList(res.data);
        } catch (error) {
            console.error('Failed to fetch SMS settings');
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/api/academic/settings/sms', formData);
            showToast('Time setup saved successfully');
            setFormData({ startTime: '09:00 AM', status: 'Active' });
            fetchSettings();
        } catch (error) {
            console.error('Save Error:', error);
            showToast('Failed to save time setup', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this time setup?')) return;
        try {
            await api.delete(`/api/academic/settings/sms/${id}`);
            showToast('Deleted successfully');
            fetchSettings();
        } catch (error) {
            showToast('Failed to delete', 'error');
        }
    };

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-[#7c32ff] hover:bg-slate-100 transition-all border border-slate-100"
                    >
                        <ArrowLeft size={18} strokeWidth={3} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">SMS Sending Time</h1>
                        <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                            <span>Dashboard</span>
                            <span>|</span>
                            <span>Student Info</span>
                            <span>|</span>
                            <span className="text-[#7c32ff]">SMS Sending Time</span>
                        </div>
                    </div>
                </div>

                <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                    <Terminal size={14} strokeWidth={3} />
                    <span>CRON COMMAND</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Add Time Setup Form */}
                <div className="lg:col-span-4">
                    <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-[#7c32ff] rounded-l-full" />

                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">Add Time Setup</h3>

                        <form onSubmit={handleSave} className="space-y-8">
                            <div className="space-y-4">
                                <Label required>START TIME</Label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="startTime"
                                        placeholder="e.g., 09:00 AM"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all"
                                        required
                                    />
                                    <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label required>Status</Label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none"
                                    required
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl py-5 shadow-2xl shadow-purple-500/20 flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-95 transition-all group"
                            >
                                <Save size={18} strokeWidth={3} />
                                <span className="uppercase text-[11px] font-black tracking-[0.2em] italic">{loading ? 'SAVING...' : 'SAVE TIME SETUP'}</span>
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* Time Setup List */}
                <div className="lg:col-span-8">
                    <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl h-full flex flex-col overflow-hidden relative">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Time Setup List</h3>

                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                    <input
                                        type="text"
                                        placeholder="SEARCH"
                                        className="bg-transparent border-b border-slate-100 py-2 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:border-[#7c32ff] transition-all w-48"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-50">
                                        <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                                        <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="text-right py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {settingsList.length === 0 ? (
                                        <tr className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                            <td colSpan="3" className="py-12 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
                                                No Data Available In Table
                                            </td>
                                        </tr>
                                    ) : (
                                        settingsList.map((item) => (
                                            <tr key={item._id} className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0 hover:translate-x-1 transition-all">
                                                <td className="py-4 px-4 text-xs font-black text-slate-700 italic uppercase underline decoration-purple-100 underline-offset-4 tracking-tighter">{item.startTime}</td>
                                                <td className="py-4 px-4">
                                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${item.status === 'Active' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <div className="flex justify-end space-x-2">
                                                        <button
                                                            onClick={() => handleDelete(item._id)}
                                                            className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-auto pt-8 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span>Showing {settingsList.length} entries</span>
                        </div>

                        {/* Floating Action Button Placeholder */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-20 bg-[#7c32ff] rounded-l-full flex items-center justify-center shadow-lg shadow-purple-500/40">
                            <div className="w-5 h-5 rounded-full border-2 border-white/30" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SmsSendingTime;

