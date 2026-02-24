import React, { useState, useEffect } from 'react';
import {
    Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Trash2, Loader2
} from 'lucide-react';
import { Card } from '../../../components/SnowUI';
import api from '../../../api/api';

const statusColors = {
    'Open': 'bg-red-50 text-red-500',
    'Under Review': 'bg-yellow-50 text-yellow-600',
    'Action Taken': 'bg-blue-50 text-blue-600',
    'Closed': 'bg-green-50 text-green-600',
};

const categoryColors = {
    'Uniform': 'bg-orange-50 text-orange-500',
    'Behavior': 'bg-red-50 text-red-500',
    'Late': 'bg-yellow-50 text-yellow-600',
    'Homework': 'bg-purple-50 text-purple-600',
    'Other': 'bg-slate-50 text-slate-500',
};

const Select = ({ value, onChange, options, placeholder }) => (
    <div className="relative">
        <select
            value={value}
            onChange={onChange}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none shadow-sm h-[42px]"
        >
            <option value="">{placeholder}</option>
            {options.map((opt, i) => (
                <option key={i} value={opt.value}>{opt.label}</option>
            ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={13} />
    </div>
);

const Incidents = () => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openActionId, setOpenActionId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ category: '', status: '' });

    const fetchIncidents = async () => {
        setLoading(true);
        try {
            const params = {};
            if (filters.category) params.category = filters.category;
            if (filters.status) params.status = filters.status;
            const { data } = await api.get('/api/discipline', { params });
            setIncidents(data);
        } catch (err) {
            console.error('Fetch incidents error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchIncidents(); }, [filters]);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this incident record?')) return;
        try {
            await api.delete(`/api/discipline/${id}`);
            fetchIncidents();
        } catch (err) {
            alert('Failed to delete incident');
        }
        setOpenActionId(null);
    };

    const filtered = incidents.filter(inc =>
        [(inc.student?.firstName || '') + ' ' + (inc.student?.lastName || ''),
        inc.student?.admissionNumber || '',
        inc.category || '',
        inc.description || ''
        ].some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <h1 className="text-xl font-black text-slate-800 tracking-tight">Behaviour Incidents</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer">Behaviour Records</span>
                    <span>|</span>
                    <span className="text-slate-500">Incidents</span>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="px-4">
                <Card className="p-6 border-none shadow-snow-lg bg-white rounded-[32px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            value={filters.category}
                            onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
                            placeholder="All Categories"
                            options={['Uniform', 'Behavior', 'Late', 'Homework', 'Other'].map(c => ({ value: c, label: c }))}
                        />
                        <Select
                            value={filters.status}
                            onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
                            placeholder="All Status"
                            options={['Open', 'Under Review', 'Action Taken', 'Closed'].map(s => ({ value: s, label: s }))}
                        />
                    </div>
                </Card>
            </div>

            {/* Table Card */}
            <div className="px-4">
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px] overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Incident List</h3>
                        <div className="flex items-center gap-4">
                            <div className="relative group flex-1 md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={14} strokeWidth={3} />
                                <input
                                    type="text"
                                    placeholder="SEARCH"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-2xl pl-11 pr-4 py-3 text-[10px] font-black tracking-widest text-slate-600 focus:ring-2 focus:ring-primary/10 outline-none placeholder:text-slate-300"
                                />
                            </div>
                            <div className="flex items-center p-1 bg-slate-50 rounded-2xl">
                                {[Download, Printer, FileText, LayoutGrid].map((Icon, i) => (
                                    <button key={i} className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-400 hover:text-primary transition-all">
                                        <Icon size={14} strokeWidth={3} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto min-h-[400px]">
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="animate-spin text-primary" size={24} />
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        {['↓ SL', '↓ STUDENT', '↓ ADM NO', '↓ CLASS', '↓ CATEGORY', '↓ DATE', '↓ STATUS', '↓ ACTION'].map((h, i) => (
                                            <th key={i} className={`py-5 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ${i === 7 ? 'text-right last:rounded-r-2xl' : 'text-left first:rounded-l-2xl'}`}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filtered.length > 0 ? filtered.map((inc, idx) => (
                                        <tr key={inc._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-5 px-4 font-bold text-slate-600 text-xs">{idx + 1}</td>
                                            <td className="py-5 px-4 text-slate-700 text-xs font-semibold">
                                                {inc.student ? `${inc.student.firstName} ${inc.student.lastName}` : '-'}
                                            </td>
                                            <td className="py-5 px-4 text-slate-400 text-xs">{inc.student?.admissionNumber || '-'}</td>
                                            <td className="py-5 px-4 text-slate-400 text-xs">{inc.class?.name || '-'}</td>
                                            <td className="py-5 px-4 text-xs">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black ${categoryColors[inc.category] || 'bg-slate-50 text-slate-400'}`}>
                                                    {inc.category}
                                                </span>
                                            </td>
                                            <td className="py-5 px-4 text-slate-400 text-xs">{inc.date ? new Date(inc.date).toLocaleDateString() : '-'}</td>
                                            <td className="py-5 px-4 text-xs">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black ${statusColors[inc.status] || 'bg-slate-50 text-slate-400'}`}>
                                                    {inc.status}
                                                </span>
                                            </td>
                                            <td className="py-5 px-4 text-right relative">
                                                <div className="relative inline-block">
                                                    <button
                                                        onClick={() => setOpenActionId(openActionId === idx ? null : idx)}
                                                        className={`flex items-center space-x-2 bg-white border border-slate-200 rounded-full pl-5 pr-2 py-1.5 text-[10px] font-black transition-all group/btn shadow-sm active:scale-95 ${openActionId === idx ? 'text-primary border-primary ring-4 ring-primary/5' : 'text-slate-400 hover:text-primary hover:border-primary'}`}
                                                    >
                                                        <span className="uppercase tracking-widest">SELECT</span>
                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${openActionId === idx ? 'bg-primary text-white' : 'bg-slate-50 group-hover/btn:bg-primary/5'}`}>
                                                            <ChevronDown size={12} className={`transition-transform duration-300 ${openActionId === idx ? 'rotate-180' : ''}`} />
                                                        </div>
                                                    </button>
                                                    {openActionId === idx && (
                                                        <>
                                                            <div className="fixed inset-0 z-10" onClick={() => setOpenActionId(null)} />
                                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-50 py-2 z-20 animate-in zoom-in-95 duration-200 origin-top-right">
                                                                <button onClick={() => handleDelete(inc._id)} className="w-full px-5 py-3 text-left text-[10px] font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
                                                                    <Trash2 size={14} className="text-red-300" />
                                                                    <span>Delete</span>
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="8" className="py-20 text-center text-xs font-black text-slate-300 uppercase tracking-widest italic">
                                                No Incidents Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="mt-8 px-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total {filtered.length} entries</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Incidents;
