import React from 'react';
import { Card, Input, Button } from '../../../components/SnowUI';
import {
    Search,
    Download,
    Printer,
    Copy,
    FileSpreadsheet,
    FileText,
    LayoutList,
    MoreHorizontal,
    ChevronDown,
    ArrowUpDown
} from 'lucide-react';

const RefundRequest = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-l-full" />
                <h1 className="text-xl font-black text-navy-900 tracking-tight italic uppercase">Refund Request</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Dashboard</span>
                    <span className="text-slate-200">|</span>
                    <span>Wallet</span>
                    <span className="text-slate-200">|</span>
                    <span className="text-primary font-black">Refund Request</span>
                </div>
            </div>

            {/* Main Content Card */}
            <Card className="border-none shadow-snow-sm overflow-hidden bg-white p-0 rounded-3xl">
                <div className="p-8 space-y-6">
                    {/* Header with Search and Export */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50 pb-6">
                        <div className="flex items-center space-x-3">
                            <h2 className="text-lg font-black text-navy-900 italic uppercase tracking-tight">Refund Request</h2>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            {/* Quick Search */}
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
                                <input
                                    type="text"
                                    placeholder="QUICK SEARCH"
                                    className="pl-12 pr-6 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-600 focus:ring-2 focus:ring-primary/20 w-full md:w-64 transition-all uppercase placeholder:tracking-widest"
                                />
                            </div>

                            {/* Export Actions Toolbar */}
                            <div className="flex items-center bg-white border border-slate-100 rounded-2xl p-1 shadow-sm">
                                <button className="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-primary transition-all rounded-xl border-r border-slate-50">
                                    <Copy size={16} />
                                </button>
                                <button className="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-primary transition-all rounded-xl border-r border-slate-50">
                                    <FileText size={16} />
                                </button>
                                <button className="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-primary transition-all rounded-xl border-r border-slate-50">
                                    <FileSpreadsheet size={16} />
                                </button>
                                <button className="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-primary transition-all rounded-xl border-r border-slate-50">
                                    <FileText size={16} />
                                </button>
                                <button className="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-primary transition-all rounded-xl border-r border-slate-50">
                                    <Printer size={16} />
                                </button>
                                <button className="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-primary transition-all rounded-xl flex items-center space-x-2 px-4 group">
                                    <LayoutList size={16} />
                                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                                </button>

                                <div className="ml-2 pr-1">
                                    <button className="bg-primary text-white p-2.5 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-all">
                                        <LayoutList size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-6 py-4 flex items-center space-x-1 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors group">
                                        <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100" />
                                        <span>SL</span>
                                    </th>
                                    <th className="px-6 py-4 space-x-1 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors group">
                                        <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100 inline" />
                                        <span>Name</span>
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        Method
                                    </th>
                                    <th className="px-6 py-4 space-x-1 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors group">
                                        <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100 inline" />
                                        <span>Pending</span>
                                    </th>
                                    <th className="px-6 py-4 space-x-1 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors group">
                                        <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100 inline" />
                                        <span>Approve</span>
                                    </th>
                                    <th className="px-6 py-4 space-x-1 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors group">
                                        <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100 inline" />
                                        <span>Reject</span>
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        Note
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        File
                                    </th>
                                    <th className="px-6 py-4 space-x-1 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors group">
                                        <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-100 inline" />
                                        <span>Created Date</span>
                                    </th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="11" className="py-20 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-4">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                                                <MoreHorizontal size={32} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-slate-400 font-bold text-sm tracking-tight italic uppercase">No Data Available In Table</p>
                                                <p className="text-primary/40 font-black text-xs uppercase tracking-widest italic">Result</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Context */}
                    <div className="flex flex-col md:flex-row justify-between items-center bg-white pt-6 border-t border-slate-50 gap-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] italic">
                            Showing 0 to 0 of 0 entries
                        </span>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-slate-300 hover:text-primary transition-colors">
                                <ChevronDown size={20} className="rotate-90" />
                            </button>
                            <button className="p-2 text-slate-300 hover:text-primary transition-colors">
                                <ChevronDown size={20} className="-rotate-90" />
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default RefundRequest;
