import React, { useState } from 'react';
import { Card, Button, Input, Select } from '../../../../components/SnowUI';
import {
    Search, Copy, FileSpreadsheet, Download, Printer,
    FileText, ChevronDown, CheckCircle2, User, Clock
} from 'lucide-react';

const LeaveDefine = () => {
    const [formData, setFormData] = useState({
        role: '',
        leaveType: '',
        days: ''
    });

    const leaveDefines = [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-l-full" />
                <h1 className="text-xl font-black text-navy-900 tracking-tight italic uppercase">Leave Define</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Dashboard</span>
                    <span className="text-slate-200">|</span>
                    <span>Leave</span>
                    <span className="text-slate-200">|</span>
                    <span className="text-primary">Leave Define</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Add Leave Define Form */}
                <div className="lg:col-span-4">
                    <Card className="p-8 border border-snow-100 shadow-snow-sm sticky top-24">
                        <h2 className="text-sm font-black text-navy-900 uppercase tracking-widest mb-8 px-1">Add leave Define</h2>
                        <div className="space-y-6">
                            <Select
                                label="Role *"
                                options={[
                                    { value: '', label: 'Select Role *' },
                                    { value: 'admin', label: 'Admin' },
                                    { value: 'teacher', label: 'Teacher' },
                                    { value: 'staff', label: 'Staff' },
                                ]}
                                value={formData.role}
                                onChange={(val) => setFormData({ ...formData, role: val })}
                                className="font-bold"
                            />

                            <Select
                                label="Leave Type *"
                                options={[
                                    { value: '', label: 'Select Leave Type *' },
                                    { value: 'casual', label: 'Casual Leave' },
                                    { value: 'sick', label: 'Sick Leave' },
                                ]}
                                value={formData.leaveType}
                                onChange={(val) => setFormData({ ...formData, leaveType: val })}
                                className="font-bold"
                            />

                            <Input
                                label="Days *"
                                type="number"
                                placeholder="Enter Number of Days"
                                value={formData.days}
                                onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                                className="font-bold"
                            />

                            <Button className="w-full uppercase text-[10px] tracking-[0.2em] py-4 bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20 mt-4 font-black">
                                <CheckCircle2 size={16} />
                                <span>Save</span>
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Leave Define List */}
                <div className="lg:col-span-8">
                    <Card className="p-8 border border-snow-100 shadow-snow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2">
                            <h3 className="text-sm font-black text-navy-900 uppercase tracking-widest">Leave Define List</h3>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={14} />
                                    <input
                                        type="text"
                                        placeholder="QUICK SEARCH"
                                        className="pl-10 pr-4 py-2.5 bg-snow-50 border-none rounded-xl text-[10px] font-black tracking-widest focus:ring-2 focus:ring-primary/20 w-40 outline-none placeholder:text-secondary/60"
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
                                    <tr className="border-b border-snow-100 italic">
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4">
                                            <div className="flex items-center gap-2">User <ChevronDown size={10} className="rotate-180" /></div>
                                        </th>
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4">
                                            <div className="flex items-center gap-2">Role <ChevronDown size={10} className="rotate-180" /></div>
                                        </th>
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4">
                                            <div className="flex items-center gap-2">Leave Type <ChevronDown size={10} className="rotate-180" /></div>
                                        </th>
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4">
                                            <div className="flex items-center gap-2">Days <ChevronDown size={10} className="rotate-180" /></div>
                                        </th>
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-snow-50">
                                        <td colSpan="5" className="py-24 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-4 opacity-40">
                                                <div className="w-16 h-16 bg-snow-100 rounded-3xl flex items-center justify-center text-secondary">
                                                    <Clock size={28} />
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-secondary italic">No Data Available In Table</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 flex items-center justify-between px-2">
                            <p className="text-[10px] font-bold text-secondary uppercase tracking-widest italic">Showing 0 to 0 of 0 entries</p>
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

export default LeaveDefine;
