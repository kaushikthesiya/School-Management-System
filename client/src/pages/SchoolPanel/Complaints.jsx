import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Card, Button, Input, Select, Badge } from '../../components/SnowUI';
import { Search, Plus, Download, Printer, FileText, FileSpreadsheet, Copy, LayoutGrid, MoreHorizontal, Trash2, Edit3, MessageCircle, Check, Upload, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '../../context/ToastContext';

const Complaints = () => {
    const { showToast } = useToast();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        complaintBy: '',
        complaintType: '',
        source: 'Offline',
        phone: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        actionTaken: '',
        assignedTo: '',
        description: '',
        file: null
    });

    const sources = ['Online', 'Offline', 'Social Media', 'Other'];
    const complaintTypes = ['Fees', 'Academic', 'Transport', 'Infrastructure', 'Other'];

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin-section/complaints');
            setComplaints(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Fetch Complaints Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'file' && formData[key]) {
                    data.append('file', formData[key]);
                } else {
                    data.append(key, formData[key]);
                }
            });

            await api.post('/api/admin-section/complaints', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            showToast('Complaint saved successfully!');
            setFormData({
                complaintBy: '',
                complaintType: '',
                source: 'Offline',
                phone: '',
                date: format(new Date(), 'yyyy-MM-dd'),
                actionTaken: '',
                assignedTo: '',
                description: '',
                file: null
            });
            fetchComplaints();
        } catch (error) {
            showToast('Error saving complaint', 'error');
            console.error('Add Complaint Error:', error);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Complaint
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Admin Section</span>
                    <span>|</span>
                    <span className="text-primary/70">Complaint</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                {/* Add Complaint Form */}
                <div className="lg:col-span-1">
                    <Card className="p-8 border-none shadow-snow-lg rounded-[30px] bg-white relative overflow-hidden">
                        {/* Decorative Tab */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-[40px] flex items-center justify-center">
                            <Plus className="text-primary/20" size={24} />
                        </div>

                        <h2 className="text-lg font-black text-slate-800 italic uppercase mb-8 flex items-center space-x-3">
                            <span className="w-2 h-8 bg-primary rounded-full"></span>
                            <span>Add Complaint</span>
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                label="Complaint By *"
                                placeholder="Enter Name"
                                value={formData.complaintBy}
                                onChange={e => setFormData({ ...formData, complaintBy: e.target.value })}
                                required
                            />

                            <Select
                                label="Complaint Type *"
                                options={['Select Type', ...complaintTypes]}
                                value={formData.complaintType}
                                onChange={value => setFormData({ ...formData, complaintType: value })}
                                required
                            />

                            <Select
                                label="Source *"
                                options={sources}
                                value={formData.source}
                                onChange={value => setFormData({ ...formData, source: value })}
                                required
                            />

                            <Input
                                label="Phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />

                            <Input
                                label="Date *"
                                type="date"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                required
                            />

                            <Input
                                label="Action Taken"
                                placeholder="What action was taken?"
                                value={formData.actionTaken}
                                onChange={e => setFormData({ ...formData, actionTaken: e.target.value })}
                            />

                            <Input
                                label="Assigned"
                                placeholder="Assign to staff"
                                value={formData.assignedTo}
                                onChange={e => setFormData({ ...formData, assignedTo: e.target.value })}
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy-700 ml-1 italic uppercase tracking-wider">Description</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-100 rounded-[20px] p-5 text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none h-32"
                                    placeholder="Enter details..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2 pt-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Attachment</label>
                                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[20px] p-6 hover:border-primary transition-all cursor-pointer group bg-slate-50/50">
                                    <Upload size={24} className="text-slate-300 group-hover:text-primary mb-3 transition-colors" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                                        {formData.file ? formData.file.name : 'Click to Browse File'}
                                    </span>
                                    <input type="file" className="hidden" onChange={e => setFormData({ ...formData, file: e.target.files[0] })} />
                                </label>
                            </div>

                            <div className="flex justify-center pt-6">
                                <Button
                                    type="submit"
                                    className="w-full bg-[#1a1a1a] hover:bg-black text-white px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 shadow-2xl shadow-black/10 active:scale-95 transition-all group"
                                >
                                    <Check size={18} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
                                    <span className="font-black italic uppercase tracking-[0.2em] text-[11px]">Save Complaint</span>
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Complaint List */}
                <Card className="lg:col-span-3 p-0 border-none shadow-snow-lg rounded-[30px] overflow-hidden bg-white min-h-[600px]">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
                        <h2 className="text-lg font-black text-slate-800 italic uppercase flex items-center space-x-3">
                            <span className="w-2 h-8 bg-rose-400 rounded-full"></span>
                            <span>Complaint List</span>
                        </h2>

                        <div className="flex items-center space-x-4">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={16} />
                                <input
                                    type="text"
                                    placeholder="QUICK SEARCH"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 w-48 group-hover:w-64 transition-all"
                                />
                            </div>
                            <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
                                {[Copy, FileSpreadsheet, FileText, Download, Printer, LayoutGrid].map((Icon, i) => (
                                    <button key={i} className="p-2 hover:bg-white hover:text-primary hover:shadow-sm rounded-xl text-slate-400 transition-all">
                                        <Icon size={14} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Type</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Complainer</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Phone</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Date</th>
                                    <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Status</th>
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
                                ) : complaints.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-20 text-center text-slate-400 italic font-medium">
                                            No complaints logged yet.
                                        </td>
                                    </tr>
                                ) : (
                                    complaints
                                        .filter(c =>
                                            c.complaintBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            c.complaintType?.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((item) => (
                                            <tr key={item._id} className="group hover:bg-slate-50/30 transition-colors">
                                                <td className="px-8 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-slate-700 italic uppercase underline decoration-primary/10 decoration-4 underline-offset-4">{item.complaintType}</span>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-1">{item.source}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-sm font-black text-slate-700 italic uppercase">{item.complaintBy}</td>
                                                <td className="px-6 py-5 text-sm font-bold text-slate-500">{item.phone || '-'}</td>
                                                <td className="px-6 py-5 text-sm font-bold text-slate-500">{format(new Date(item.date), 'dd MMM, yyyy')}</td>
                                                <td className="px-6 py-5">
                                                    <Badge
                                                        variant={item.status === 'Open' ? 'error' : item.status === 'Closed' ? 'success' : 'warning'}
                                                    >
                                                        {item.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex justify-end items-center space-x-3 transform group-hover:translate-x-0 translate-x-4 opacity-0 group-hover:opacity-100 transition-all">
                                                        <button className="p-2.5 text-indigo-400 hover:bg-indigo-50 rounded-xl transition-all" title="View Details">
                                                            <MessageCircle size={16} />
                                                        </button>
                                                        <button className="p-2.5 text-emerald-400 hover:bg-emerald-50 rounded-xl transition-all" title="Edit">
                                                            <Edit3 size={16} />
                                                        </button>
                                                        <button className="p-2.5 text-rose-400 hover:bg-rose-50 rounded-xl transition-all" title="Delete">
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

export default Complaints;
