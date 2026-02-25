import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Select } from '../../../../components/SnowUI';
import {
    FileText, Search, Download, Printer, Copy,
    FileSpreadsheet, FilePlus, ChevronDown, MoreHorizontal,
    Calendar, Paperclip, CheckCircle2, Clock
} from 'lucide-react';
import api from '../../../../api/api';
import { useAuth } from '../../../../context/AuthContext';

const ApplyLeave = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [leaves, setLeaves] = useState([]);
    const [formData, setFormData] = useState({
        applyDate: new Date().toISOString().split('T')[0],
        leaveType: '',
        leaveFrom: new Date().toISOString().split('T')[0],
        leaveTo: new Date().toISOString().split('T')[0],
        reason: '',
        file: null
    });

    const fetchLeaves = async () => {
        try {
            const { data } = await api.get('/api/leaves');
            setLeaves(data);
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const handleSubmit = async () => {
        if (!formData.leaveType || !formData.reason) {
            alert('Please fill all required fields');
            return;
        }
        setLoading(true);
        try {
            await api.post('/api/leaves/apply', {
                ...formData,
                applicantType: user?.role === 'student' ? 'Student' : 'Staff',
                applicantId: user?._id,
                startDate: formData.leaveFrom,
                endDate: formData.leaveTo
            });
            alert('Leave applied successfully');
            setFormData({
                applyDate: new Date().toISOString().split('T')[0],
                leaveType: '',
                leaveFrom: new Date().toISOString().split('T')[0],
                leaveTo: new Date().toISOString().split('T')[0],
                reason: '',
                file: null
            });
            fetchLeaves();
        } catch (error) {
            console.error('Error applying leave:', error);
            alert('Failed to apply leave');
        } finally {
            setLoading(false);
        }
    };

    const remainingLeaves = [
        { type: 'Casual leave', remaining: 5, extra: 0, taken: 0, days: 5 },
        { type: 'Sick leave', remaining: 10, extra: 0, taken: 0, days: 10 },
        { type: 'Annual/Vacation Leave', remaining: 5, extra: 0, taken: 0, days: 5 },
        { type: 'Earned Leave', remaining: 0, extra: 0, taken: 0, days: 0 },
        { type: 'Public holidays', remaining: 6, extra: 0, taken: 0, days: 6 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-l-full" />
                <div>
                    <h1 className="text-xl font-black text-navy-900 tracking-tight italic uppercase">Apply Leave</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Dashboard</span>
                    <span className="text-slate-200">|</span>
                    <span>Leave</span>
                    <span className="text-slate-200">|</span>
                    <span className="text-primary">Apply Leave</span>
                </div>
            </div>

            {/* My Remaining Leaves Section */}
            <Card className="p-8 border border-snow-100 shadow-snow-sm">
                <h2 className="text-sm font-black text-navy-900 uppercase tracking-widest mb-6 px-1">My Remaining Leaves</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-snow-100">
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4">Type</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">Remaining Days</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">Extra Taken</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">Leave Taken</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">Leave Days</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-snow-50">
                            {remainingLeaves.map((leave, idx) => (
                                <tr key={idx} className="hover:bg-snow-50/50 transition-colors group">
                                    <td className="py-4 px-4 text-xs font-bold text-navy-700 group-hover:text-primary transition-colors">{leave.type}</td>
                                    <td className="py-4 px-4 text-xs font-bold text-secondary text-center">{leave.remaining}</td>
                                    <td className="py-4 px-4 text-xs font-bold text-secondary text-center">{leave.extra}</td>
                                    <td className="py-4 px-4 text-xs font-bold text-secondary text-center">{leave.taken}</td>
                                    <td className="py-4 px-4 text-xs font-bold text-secondary text-center">{leave.days}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Add Apply Leave Form */}
                <div className="lg:col-span-4">
                    <Card className="p-8 border border-snow-100 shadow-snow-sm sticky top-24">
                        <h2 className="text-sm font-black text-navy-900 uppercase tracking-widest mb-8">Add Apply Leave</h2>
                        <div className="space-y-6">
                            <Input
                                label="APPLY DATE *"
                                type="date"
                                value={formData.applyDate}
                                onChange={(e) => setFormData({ ...formData, applyDate: e.target.value })}
                                className="font-bold"
                            />

                            <Select
                                label="Leave Type *"
                                options={[
                                    { value: '', label: 'Select Leave Type' },
                                    { value: 'casual', label: 'Casual Leave' },
                                    { value: 'sick', label: 'Sick Leave' },
                                    { value: 'vacation', label: 'Vacation Leave' },
                                ]}
                                value={formData.leaveType}
                                onChange={(val) => setFormData({ ...formData, leaveType: val })}
                                className="font-bold"
                            />

                            <div className="grid grid-cols-1 gap-6">
                                <Input
                                    label="LEAVE FROM *"
                                    type="date"
                                    value={formData.leaveFrom}
                                    onChange={(e) => setFormData({ ...formData, leaveFrom: e.target.value })}
                                    className="font-bold"
                                />
                                <Input
                                    label="LEAVE TO *"
                                    type="date"
                                    value={formData.leaveTo}
                                    onChange={(e) => setFormData({ ...formData, leaveTo: e.target.value })}
                                    className="font-bold"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy-700 ml-1 uppercase text-[10px] tracking-widest">Reason</label>
                                <textarea
                                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-secondary text-navy-700 font-medium min-h-[120px]"
                                    placeholder="Enter reason here..."
                                    value={formData.reason}
                                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy-700 ml-1 uppercase text-[10px] tracking-widest">File</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        className="flex-1 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-xs font-bold text-secondary"
                                        placeholder="No file chosen"
                                    />
                                    <Button variant="primary" className="shrink-0 uppercase text-[10px] tracking-widest px-8">
                                        Browse
                                    </Button>
                                </div>
                            </div>

                            <Button onClick={handleSubmit} disabled={loading} className="w-full uppercase text-[10px] tracking-[0.2em] py-4 bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20 mt-4 font-black">
                                <CheckCircle2 size={16} />
                                <span>{loading ? 'Saving...' : 'Save Apply Leave'}</span>
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Leave List */}
                <div className="lg:col-span-8">
                    <Card className="p-8 border border-snow-100 shadow-snow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                            <h3 className="text-sm font-black text-navy-900 uppercase tracking-widest">Leave List</h3>

                            <div className="flex flex-wrap items-center gap-4">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={14} />
                                    <input
                                        type="text"
                                        placeholder="SEARCH"
                                        className="pl-10 pr-4 py-2.5 bg-snow-50 border-none rounded-xl text-[10px] font-black tracking-widest focus:ring-2 focus:ring-primary/20 w-48 outline-none"
                                    />
                                </div>

                                <div className="flex items-center bg-snow-50 p-1 rounded-xl border border-snow-100">
                                    <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-secondary/60 transition-all"><Copy size={14} /></button>
                                    <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-secondary/60 transition-all"><FileSpreadsheet size={14} /></button>
                                    <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-secondary/60 transition-all"><Download size={14} /></button>
                                    <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-secondary/60 transition-all"><Printer size={14} /></button>
                                    <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-secondary/60 transition-all"><FileText size={14} /></button>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto min-h-[400px]">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-snow-100">
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4">
                                            <div className="flex items-center gap-2">
                                                Type <ChevronDown size={10} />
                                            </div>
                                        </th>
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                From <ChevronDown size={10} />
                                            </div>
                                        </th>
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                To <ChevronDown size={10} />
                                            </div>
                                        </th>
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                Apply Date <ChevronDown size={10} />
                                            </div>
                                        </th>
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                Status <ChevronDown size={10} />
                                            </div>
                                        </th>
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaves.length > 0 ? (
                                        leaves.map((leave) => (
                                            <tr key={leave._id} className="border-b border-snow-50 hover:bg-snow-50/30 transition-colors">
                                                <td className="py-4 px-4 text-xs font-bold text-navy-700 capitalize">{leave.leaveType}</td>
                                                <td className="py-4 px-4 text-xs font-medium text-secondary text-center">{new Date(leave.startDate).toLocaleDateString()}</td>
                                                <td className="py-4 px-4 text-xs font-medium text-secondary text-center">{new Date(leave.endDate).toLocaleDateString()}</td>
                                                <td className="py-4 px-4 text-xs font-medium text-secondary text-center">{new Date(leave.createdAt).toLocaleDateString()}</td>
                                                <td className="py-4 px-4 text-center">
                                                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' :
                                                        leave.status === 'Rejected' ? 'bg-rose-100 text-rose-600' :
                                                            'bg-amber-100 text-amber-600'
                                                        }`}>
                                                        {leave.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    <button className="text-secondary hover:text-primary transition-colors">
                                                        <MoreHorizontal size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="border-b border-snow-50">
                                            <td colSpan="6" className="py-20 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-3 opacity-40">
                                                    <div className="w-12 h-12 bg-snow-100 rounded-full flex items-center justify-center text-secondary">
                                                        <Clock size={20} />
                                                    </div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-secondary">No Data Available In Table</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 flex items-center justify-between px-2">
                            <p className="text-[10px] font-bold text-secondary uppercase tracking-widest italic">Showing {leaves.length} Entries</p>
                            <div className="flex items-center gap-2">
                                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-snow-50 transition-colors">
                                    <ChevronDown size={16} className="rotate-90" />
                                </button>
                                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-snow-50 transition-colors">
                                    <ChevronDown size={16} className="-rotate-90" />
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ApplyLeave;
