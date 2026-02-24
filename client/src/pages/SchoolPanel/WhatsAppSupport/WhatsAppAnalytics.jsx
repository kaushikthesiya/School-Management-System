import React, { useState } from 'react';
import { Card } from '../../../components/SnowUI';
import {
    Search,
    Copy,
    FileText,
    File as FileIcon,
    Printer,
    Columns,
    ArrowUpDown,
    MousePointer2,
    Smartphone,
    Monitor
} from 'lucide-react';

const WhatsAppAnalytics = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const columns = [
        'ID',
        'IP',
        'Browser',
        'Operating System',
        'Messages'
    ];

    const stats = [
        { label: 'Total Clicks', value: '0', color: 'bg-[#00BCD4]', icon: <MousePointer2 size={24} /> },
        { label: 'Click From Mobile', value: '0', color: 'bg-[#9C27B0]', icon: <Smartphone size={24} /> },
        { label: 'Click From Desktop', value: '0', color: 'bg-[#2196F3]', icon: <Monitor size={24} /> }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-slate-50">
                <h1 className="text-xl font-black text-slate-800 tracking-tight">Analytics</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">WhatsApp Support</span>
                    <span>|</span>
                    <span className="text-slate-500">Analytics</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 pt-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`${stat.color} rounded-xl p-8 flex justify-between items-center text-white shadow-lg transition-transform hover:scale-[1.02] cursor-default`}>
                        <div className="space-y-1">
                            <span className="text-sm font-black uppercase tracking-widest opacity-90">{stat.label}</span>
                        </div>
                        <span className="text-2xl font-black">{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Analytics Table Card */}
            <div className="px-4 mt-8">
                <Card className="p-8 border-none shadow-snow-lg bg-white rounded-2xl overflow-hidden">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">
                            Analytics
                        </h3>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={14} />
                            <input
                                placeholder="SEARCH"
                                className="w-full bg-slate-50/50 border border-slate-100 rounded-xl pl-12 pr-4 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-2 bg-slate-50/50 p-1.5 rounded-xl border border-slate-100">
                            {[
                                { icon: <Copy size={12} />, label: 'Copy' },
                                { icon: <FileText size={12} />, label: 'CSV' },
                                { icon: <FileIcon size={12} />, label: 'Excel' },
                                { icon: <FileText size={12} />, label: 'PDF' },
                                { icon: <Printer size={12} />, label: 'Print' },
                                { icon: <Columns size={12} />, label: 'Columns' }
                            ].map((btn, idx) => (
                                <button key={idx} title={btn.label} className="p-2.5 rounded-lg text-slate-400 hover:text-primary hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100">
                                    {btn.icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    {columns.map((header, idx) => (
                                        <th key={idx} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                            <div className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors">
                                                <ArrowUpDown size={10} className="mr-1" />
                                                <span>{header}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={columns.length} className="px-8 py-10 text-center text-xs font-bold text-slate-300 italic tracking-widest">
                                        No Data Available In Table
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-10 px-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Showing 0 to 0 of 0 entries
                        </span>
                        <div className="flex items-center space-x-2">
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-200 cursor-not-allowed text-xs font-black">&larr;</button>
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-200 cursor-not-allowed text-xs font-black">&rarr;</button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default WhatsAppAnalytics;
