import React, { useState } from 'react';
import { Card, Button, Input } from '../../../components/SnowUI';
import {
    Search,
    ChevronDown,
    Copy,
    FileText,
    File as FileIcon,
    Printer,
    Columns,
    ArrowUpDown
} from 'lucide-react';

const UserIds = () => {
    const [filters, setFilters] = useState({
        role: ''
    });

    const [searchTerm, setSearchTerm] = useState('');

    const users = [
        { id: 2, role: 'Teacher', name: 'Barrett' },
        { id: 3, role: 'Teacher', name: 'Alberto' },
        { id: 4, role: 'Teacher', name: 'Christophe' },
        { id: 5, role: 'Teacher', name: 'Jasper' },
        { id: 6, role: 'Teacher', name: 'Benton' },
        { id: 7, role: 'Admin', name: 'Sylvan' },
        { id: 8, role: 'Admin', name: 'Devante' },
        { id: 9, role: 'Admin', name: 'Joany' },
        { id: 10, role: 'Admin', name: 'Braxton' },
        { id: 11, role: 'Admin', name: 'Ray' },
    ];

    const columns = [
        { key: 'id', label: 'User Id' },
        { key: 'role', label: 'User Role' },
        { key: 'name', label: 'User Name' }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">User ids</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Biometrics</span>
                    <span>|</span>
                    <span className="text-slate-500">User ids</span>
                </div>
            </div>

            {/* Select Criteria */}
            <div className="px-4">
                <Card className="p-8 border-none shadow-snow-lg bg-white rounded-2xl">
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest mb-8">
                        Select Criteria
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                        <div className="relative group">
                            <select
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none shadow-sm"
                            >
                                <option value="">Select Role</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-primary transition-colors" size={14} />
                        </div>
                    </div>

                    <div className="flex justify-end mt-8">
                        <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                            <Search size={14} strokeWidth={3} />
                            <span>SEARCH</span>
                        </Button>
                    </div>
                </Card>
            </div>

            {/* User IDs Table Card */}
            <div className="px-4 mt-8">
                <Card className="p-8 border-none shadow-snow-lg bg-white rounded-2xl overflow-hidden">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">
                            User ids
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
                                    {columns.map((col, idx) => (
                                        <th key={idx} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                            <div className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors">
                                                <ArrowUpDown size={10} className="mr-1" />
                                                <span>{col.label}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-8 py-5 text-xs font-bold text-slate-600 tracking-tight">{user.id}</td>
                                        <td className="px-8 py-5 text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors">{user.role}</td>
                                        <td className="px-8 py-5 text-xs font-bold text-slate-600 tracking-tight">{user.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-10 px-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Showing 1 to 10 of 184 entries
                        </span>
                        <div className="flex items-center space-x-2">
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-primary hover:bg-slate-50 transition-all text-xs font-black">&larr;</button>
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-white shadow-lg shadow-primary/20 text-xs font-black">1</button>
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 transition-all text-xs font-black">2</button>
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 transition-all text-xs font-black">3</button>
                            <span className="text-slate-300 px-1">...</span>
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 transition-all text-xs font-black">19</button>
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-primary hover:bg-slate-50 transition-all text-xs font-black">&rarr;</button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default UserIds;
