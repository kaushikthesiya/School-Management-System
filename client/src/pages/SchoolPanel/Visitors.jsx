import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card, Input, Select } from '../../components/SnowUI';
import { Search, Plus, Trash2, MoreVertical, CheckCircle2, Upload, Calendar, Clock, User, ChevronDown } from 'lucide-react';

const Visitors = () => {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        purpose: '',
        phone: '',
        visitorId: '',
        noOfPerson: 1,
        date: new Date().toISOString().split('T')[0],
        inTime: '',
        outTime: '',
        file: null
    });

    const fetchVisitors = async () => {
        try {
            const { data } = await api.get('/api/admin-section/visitors');
            setVisitors(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching visitors:', error);
        }
    };

    useEffect(() => {
        fetchVisitors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'file') {
                if (formData[key]) data.append('file', formData[key]);
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            await api.post('/api/admin-section/visitors', data);
            setFormData({
                name: '', purpose: '', phone: '', visitorId: '', noOfPerson: 1,
                date: new Date().toISOString().split('T')[0], inTime: '', outTime: '', file: null
            });
            fetchVisitors();
        } catch (error) {
            console.error('Error saving visitor:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/api/admin-section/visitors/${id}`);
            fetchVisitors();
        } catch (error) {
            console.error('Error deleting visitor:', error);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Visitor Book</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Admin Section</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Visitor Book</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Add Visitor */}
                <div className="lg:col-span-1">
                    <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white overflow-hidden rounded-3xl">
                        <div className="bg-slate-50/50 p-6 border-b border-slate-50">
                            <h2 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] flex items-center space-x-3">
                                <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                <span>Add Visitor</span>
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <Select
                                label="Purpose *"
                                options={['Select Purpose', 'Admission', 'Meeting', 'Other']}
                                value={formData.purpose}
                                onChange={value => setFormData({ ...formData, purpose: value })}
                                required
                            />

                            <Input
                                label="Name *"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter Name"
                                required
                            />

                            <Input
                                label="Phone *"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Phone Number"
                                required
                            />

                            <Input
                                label="Visitor ID / Pass No"
                                value={formData.visitorId}
                                onChange={e => setFormData({ ...formData, visitorId: e.target.value })}
                                placeholder="Auto-generated if empty"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Date"
                                    type="date"
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                                <Input
                                    label="No of Person"
                                    type="number"
                                    value={formData.noOfPerson}
                                    onChange={e => setFormData({ ...formData, noOfPerson: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="In Time"
                                    type="time"
                                    value={formData.inTime}
                                    onChange={e => setFormData({ ...formData, inTime: e.target.value })}
                                />
                                <Input
                                    label="Out Time"
                                    type="time"
                                    value={formData.outTime}
                                    onChange={e => setFormData({ ...formData, outTime: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2 pt-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ID Proof / Photo</label>
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
                                    disabled={loading}
                                    className="w-full bg-[#1a1a1a] hover:bg-black text-white px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 shadow-2xl shadow-black/10 active:scale-95 transition-all group"
                                >
                                    <CheckCircle2 size={18} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
                                    <span className="font-black italic uppercase tracking-[0.2em] text-[11px]">{loading ? 'Saving...' : 'Save Visitor'}</span>
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Right Column: Visitor List */}
                <div className="lg:col-span-3">
                    <Card className="p-0 border-none shadow-snow-lg rounded-[30px] bg-white overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
                            <h2 className="text-lg font-black text-slate-800 italic uppercase flex items-center space-x-3">
                                <span className="w-2 h-8 bg-emerald-400 rounded-full"></span>
                                <span>Visitor List</span>
                            </h2>
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
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Visitor</th>
                                        <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">People</th>
                                        <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Date/Time</th>
                                        <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Purpose</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-[13px] font-bold">
                                    {visitors.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center text-slate-400 italic font-medium">
                                                No visitor records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        visitors
                                            .filter(v =>
                                                v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                v.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                v.purpose?.toLowerCase().includes(searchTerm.toLowerCase())
                                            )
                                            .map((visitor) => (
                                                <tr key={visitor._id} className="hover:bg-slate-50/30 transition-colors group">
                                                    <td className="px-8 py-5">
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-sm font-black text-slate-700 italic uppercase underline decoration-primary/10 decoration-4 underline-offset-4">{visitor.name}</span>
                                                                <span className="bg-primary/10 text-primary text-[8px] font-black px-1.5 py-0.5 rounded-md tracking-tighter uppercase">{visitor.visitorId}</span>
                                                            </div>
                                                            <span className="text-[10px] text-slate-400 font-black tracking-widest mt-1">{visitor.phone}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-center">
                                                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[11px] font-black">
                                                            {visitor.noOfPerson}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="flex flex-col text-[11px] font-bold">
                                                            <span className="text-slate-600">{new Date(visitor.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                            <span className="text-slate-400 flex items-center mt-1">
                                                                <Clock size={10} className="mr-1" />
                                                                {visitor.inTime} - {visitor.outTime}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-500 text-[9px] font-black uppercase tracking-wider border border-indigo-100">
                                                            {visitor.purpose}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5 text-right">
                                                        <div className="flex justify-end items-center space-x-3 transform group-hover:translate-x-0 translate-x-4 opacity-0 group-hover:opacity-100 transition-all">
                                                            <button
                                                                onClick={() => handleDelete(visitor._id)}
                                                                className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-rose-100"
                                                                title="Delete"
                                                            >
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
        </div>
    );
};

export default Visitors;
