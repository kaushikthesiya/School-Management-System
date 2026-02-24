import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../api/api';
import { Card } from '../../components/SnowUI';
import { Search, ChevronDown, Copy, FileSpreadsheet, FileText, Printer, Columns, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

const StudyMaterialList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const contentType = queryParams.get('type') || 'Assignment';

    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/academic/content', {
                params: { type: contentType }
            });
            setContents(res.data);
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [contentType]);

    const filteredContents = contents.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    {contentType} List
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Study Material</span>
                    <span>|</span>
                    <span className="text-primary/70">{contentType} List</span>
                </div>
            </div>

            <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 px-2">
                    <h2 className="text-lg font-bold text-[#3E4D67]">{contentType} List</h2>

                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="relative group w-full md:w-64">
                            <input
                                type="text"
                                placeholder="QUICK SEARCH"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white border-b border-slate-200 py-2 px-10 text-[11px] font-black text-slate-400 focus:border-[#7c32ff] transition-all outline-none w-full"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                        </div>

                        <div className="flex items-center space-x-1 bg-slate-50/50 p-1 rounded-xl border border-slate-100">
                            {[Copy, FileSpreadsheet, FileText, FileText, Printer, Columns].map((Icon, i) => (
                                <button key={i} className="p-2 text-slate-400 hover:text-[#7c32ff] hover:bg-white rounded-lg transition-all shadow-sm shadow-transparent hover:shadow-slate-200/50">
                                    <Icon size={16} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-[20px]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-y border-slate-100 uppercase tracking-widest text-[10px] font-black text-slate-400">
                                <th className="px-6 py-4">↓ Content Title</th>
                                <th className="px-6 py-4">↓ Type</th>
                                <th className="px-6 py-4">↓ Date</th>
                                <th className="px-6 py-4">↓ Available For</th>
                                <th className="px-6 py-4">↓ Class (Section)</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-[12px] font-bold">
                            {filteredContents.map((item) => (
                                <tr key={item._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="text-slate-500 font-medium leading-relaxed max-w-xs">
                                            {item.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-slate-400 font-bold">{item.type}</td>
                                    <td className="px-6 py-5 text-slate-400 font-bold">
                                        {format(new Date(item.uploadDate), 'do MMM, yyyy')}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-slate-400 text-[11px] max-w-[150px]">
                                            {item.availableFor}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-slate-400 font-bold">
                                        {item.class?.name} {item.section ? `(${item.section})` : ''}
                                    </td>
                                    <td className="px-6 py-5">
                                        <button className="bg-white border-2 border-[#7c32ff]/20 hover:border-[#7c32ff] text-[#7c32ff] rounded-full px-5 py-1.5 flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm shadow-purple-500/5">
                                            <span>Select</span>
                                            <ChevronDown size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredContents.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-20 text-center text-slate-400 italic font-medium">
                                        No Data Available In Table
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-8 px-2 flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Showing 1 to {filteredContents.length} of {filteredContents.length} entries</span>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 hover:text-[#7c32ff] transition-all"><ChevronLeft size={16} /></button>
                        <button className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center shadow-lg shadow-purple-500/20">1</button>
                        <button className="p-2 hover:text-[#7c32ff] transition-all"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </Card>

            <div className="text-center pt-8 opacity-50">
                <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase italic">
                    Copyright © 2026 InfixEdu. All rights reserved | Codethemes made with this application
                </p>
            </div>
        </div>
    );
};

export default StudyMaterialList;
