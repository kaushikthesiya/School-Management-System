import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card } from '../../components/SnowUI';
import { Search, Printer, FileText, ChevronDown } from 'lucide-react';

const PayrollBulkPrint = () => {
    const [roles, setRoles] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(false);

    // Filters
    const [filters, setFilters] = useState({
        role: '',
        month: new Date().getMonth() + 1, // Current month
        year: new Date().getFullYear()
    });

    const [activeFilters, setActiveFilters] = useState(null);

    const months = [
        { value: 1, label: 'January' }, { value: 2, label: 'February' },
        { value: 3, label: 'March' }, { value: 4, label: 'April' },
        { value: 5, label: 'May' }, { value: 6, label: 'June' },
        { value: 7, label: 'July' }, { value: 8, label: 'August' },
        { value: 9, label: 'September' }, { value: 10, label: 'October' },
        { value: 11, label: 'November' }, { value: 12, label: 'December' }
    ];

    // Generate last 5 years
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    const fetchData = async () => {
        try {
            const roleRes = await api.get('/api/school/rbac/roles');
            setRoles(roleRes.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = async () => {
        if (!filters.month || !filters.year) {
            alert('Please select month and year');
            return;
        }
        setLoading(true);
        setActiveFilters(filters);
        try {
            const res = await api.get('/api/payroll', {
                params: {
                    month: filters.month,
                    year: filters.year,
                    role: filters.role
                }
            });
            const formattedList = res.data.map(item => ({
                _id: item.staff._id,
                name: item.staff.name,
                role: item.staff.role,
                amount: item.staff.salary || 0,
                status: item.status,
                payslipId: item.payslipId
            }));
            setStaffList(formattedList);
        } catch (error) {
            console.error('Error searching payroll:', error);
            alert('Failed to fetch payroll data');
        } finally {
            setLoading(false);
        }
    };

    const handlePrintAll = () => {
        if (staffList.length === 0) return;
        window.print();
    };

    const handlePrintSingle = (id) => {
        window.print();
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Payroll Bulk Print
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Bulk Print</span>
                    <span>|</span>
                    <span className="text-primary/70">Payroll</span>
                </div>
            </div>

            <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white relative overflow-hidden">
                {/* Purple decorative dot */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-[#7c32ff] rounded-l-full flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white/30"></div>
                </div>

                <h2 className="text-[#3E4D67] text-lg font-bold mb-8">Select Criteria</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pr-10">
                    <div className="relative group">
                        <select
                            className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                            value={filters.role}
                            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                        >
                            <option value="">Role</option>
                            {roles.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                    </div>
                    <div className="relative group">
                        <select
                            className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                            value={filters.month}
                            onChange={(e) => setFilters({ ...filters, month: e.target.value })}
                        >
                            {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                    </div>
                    <div className="relative group">
                        <select
                            className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                            value={filters.year}
                            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                        >
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                    </div>
                </div>

                <div className="flex justify-end mt-10 pr-10">
                    <Button
                        onClick={handleSearch}
                        disabled={loading}
                        className="!bg-[#7c32ff] !rounded-lg flex items-center space-x-2 px-8 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                    >
                        <Search size={18} />
                        <span className="uppercase text-[11px] font-black tracking-widest">{loading ? 'SEARCHING...' : 'SEARCH'}</span>
                    </Button>
                </div>
            </Card>

            {activeFilters && (
                <Card className="p-6 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden min-h-[400px]">
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-[#3E4D67]">Staff Payroll List</h2>
                        <button
                            onClick={handlePrintAll}
                            className="flex items-center space-x-2 bg-slate-800 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all">
                            <Printer size={14} />
                            <span>Print All</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-100">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#F8FAFC] border-b border-slate-100 uppercase tracking-widest text-[9px] font-black text-slate-400">
                                    <th className="px-4 py-3">SL</th>
                                    <th className="px-4 py-3">Staff Name</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3 text-center">Month/Year</th>
                                    <th className="px-4 py-3 text-right">Net Salary</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                    <th className="px-4 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-[11px] font-bold">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-10 text-center text-slate-400 italic">Loading...</td>
                                    </tr>
                                ) : staffList.length > 0 ? (
                                    staffList.map((item, i) => (
                                        <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-4 py-3 text-slate-400">{i + 1}</td>
                                            <td className="px-4 py-3 text-slate-700">{item.name}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.role}</td>
                                            <td className="px-4 py-3 text-center text-slate-500">
                                                {months.find(m => m.value == activeFilters.month)?.label} - {activeFilters.year}
                                            </td>
                                            <td className="px-4 py-3 text-right text-slate-800">
                                                ₹{item.amount.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-[9px] uppercase tracking-wider ${item.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    onClick={() => handlePrintSingle(item._id)}
                                                    className="text-[#7c32ff] hover:text-[#6a25e6] transition-colors p-2 rounded-lg hover:bg-purple-50">
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
            )
            }
        </div >
    );
};

export default PayrollBulkPrint;
