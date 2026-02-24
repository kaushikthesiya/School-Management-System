import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card } from '../../components/SnowUI';
import { Search, Printer, FileText, ChevronDown } from 'lucide-react';

const FeesInvoiceBulkPrint = () => {
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);

    // Filters
    const [filters, setFilters] = useState({
        class: '',
        section: '',
        student: ''
    });

    const [activeFilters, setActiveFilters] = useState(null);

    const fetchData = async () => {
        try {
            const classRes = await api.get('/api/academic/classes');
            setClasses(classRes.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch students when filters change (simplified for demo)
    useEffect(() => {
        if (filters.class && filters.section) {
            // In real app: fetch students by class/section
            setStudents([]);
        }
    }, [filters.class, filters.section]);

    const handleSearch = async () => {
        setLoading(true);
        setActiveFilters(filters);

        // Fetch real data here
        setTimeout(() => {
            setInvoices([]);
            setLoading(false);
        }, 800);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Fees Invoice Bulk Print
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Bulk Print</span>
                    <span>|</span>
                    <span className="text-primary/70">Fees Invoice</span>
                </div>
            </div>

            <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white relative overflow-hidden">
                {/* Purple decorative dot */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-[#7c32ff] rounded-l-full flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white/30"></div>
                </div>

                <h2 className="text-[#3E4D67] text-lg font-bold mb-8">Select Criteria</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pr-10">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CLASS *</label>
                        <div className="relative group">
                            <select
                                className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                                value={filters.class}
                                onChange={(e) => setFilters({ ...filters, class: e.target.value })}
                            >
                                <option value="">Select Class *</option>
                                {classes.map(c => <option key={c._id} value={c._id}>Class {c.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">SECTION *</label>
                        <div className="relative group">
                            <select
                                className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                                value={filters.section}
                                onChange={(e) => setFilters({ ...filters, section: e.target.value })}
                            >
                                <option value="">Select Section *</option>
                                {['A', 'B', 'C', 'D'].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">STUDENT *</label>
                        <div className="relative group">
                            <select
                                className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                                value={filters.student}
                                onChange={(e) => setFilters({ ...filters, student: e.target.value })}
                            >
                                <option value="">Select Student *</option>
                                {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-10 pr-10">
                    <Button
                        onClick={handleSearch}
                        className="!bg-[#7c32ff] !rounded-lg flex items-center space-x-2 px-8 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                    >
                        <Printer size={18} />
                        <span className="uppercase text-[11px] font-black tracking-widest">PRINT</span>
                    </Button>
                </div>
            </Card>

            {/* List Section */}
            {activeFilters && (
                <Card className="p-6 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden min-h-[400px]">
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-[#3E4D67]">Fees Invoice List</h2>
                        <button className="flex items-center space-x-2 bg-slate-800 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all">
                            <Printer size={14} />
                            <span>Print All</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-100">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#F8FAFC] border-b border-slate-100 uppercase tracking-widest text-[9px] font-black text-slate-400">
                                    <th className="px-4 py-3">SL</th>
                                    <th className="px-4 py-3">Student Name</th>
                                    <th className="px-4 py-3">Class (Sec)</th>
                                    <th className="px-4 py-3">Invoice No.</th>
                                    <th className="px-4 py-3 text-right">Amount</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                    <th className="px-4 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-[11px] font-bold">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-10 text-center text-slate-400 italic">Loading...</td>
                                    </tr>
                                ) : invoices.length > 0 ? (
                                    invoices.map((item, i) => (
                                        <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-4 py-3 text-slate-400">{i + 1}</td>
                                            <td className="px-4 py-3 text-slate-700">{item.studentName}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.class} ({item.section})</td>
                                            <td className="px-4 py-3 text-slate-600 font-mono">{item.invoiceNo}</td>
                                            <td className="px-4 py-3 text-right text-slate-800">
                                                ₹{item.amount.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-[9px] uppercase tracking-wider ${item.status === 'Paid' ? 'bg-green-50 text-green-600' :
                                                    item.status === 'Unpaid' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button className="text-[#7c32ff] hover:text-[#6a25e6] transition-colors p-2 rounded-lg hover:bg-purple-50">
                                                    <Printer size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-10 text-center text-slate-400 italic font-medium text-xs">
                                            No records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default FeesInvoiceBulkPrint;
