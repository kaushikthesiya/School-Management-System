import React from 'react';
import { Card, Badge } from '../../../../components/SnowUI';
import {
    Search, Copy, FileSpreadsheet, Download, Printer,
    FileText, ChevronDown, MoreHorizontal, Clock
} from 'lucide-react';

const ApproveLeaveRequest = () => {
    const leaveRequests = [
        // Placeholder data if needed, or empty as per screenshot
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-l-full" />
                <h1 className="text-xl font-black text-navy-900 tracking-tight italic uppercase">Approve Leave Request</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Dashboard</span>
                    <span className="text-slate-200">|</span>
                    <span>Leave</span>
                    <span className="text-slate-200">|</span>
                    <span className="text-primary">Approve Leave Request</span>
                </div>
            </div>

            <Card className="p-8 border border-snow-100 shadow-snow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2">
                    <h3 className="text-sm font-black text-navy-900 uppercase tracking-widest">Approve Leave Request</h3>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={14} />
                            <input
                                type="text"
                                placeholder="QUICK SEARCH"
                                className="pl-10 pr-4 py-2.5 bg-snow-50 border-none rounded-xl text-[10px] font-black tracking-widest focus:ring-2 focus:ring-primary/20 w-48 outline-none placeholder:text-secondary/60"
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

                <div className="overflow-x-auto min-h-[500px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-snow-100">
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4">SI</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4">Name</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">Type</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">From</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">To</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">Apply Date</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">Status</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveRequests.length > 0 ? (
                                leaveRequests.map((req, idx) => (
                                    <tr key={idx} className="border-b border-snow-50 hover:bg-snow-50/50 transition-colors">
                                        {/* Row data */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="py-24 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-4 opacity-40">
                                            <div className="w-16 h-16 bg-snow-100 rounded-3xl flex items-center justify-center text-secondary">
                                                <Clock size={28} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-secondary">Processing..</p>
                                                <p className="text-[10px] font-bold text-secondary/60 lowercase italic">No records found matching your criteria</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 flex items-center justify-between px-2">
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest italic">Showing 0 to 0 of 0 Entries</p>
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
    );
};

export default ApproveLeaveRequest;
