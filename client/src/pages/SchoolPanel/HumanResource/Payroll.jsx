import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Search, Layout, Loader2, Eye, DollarSign,
    X, Check, CheckCircle2, Printer, ChevronDown, Info
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const baseUrl = 'http://localhost:5000';
const getPhotoUrl = (photo) => {
    if (!photo) return null;
    if (photo.startsWith('http')) return photo;
    return `${baseUrl}${photo.startsWith('/') ? '' : '/'}${photo}`;
};

const statusColors = {
    'Generated': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Paid': 'bg-blue-50 text-blue-600 border-blue-100',
    'Not Generated': 'bg-rose-50 text-rose-500 border-rose-100'
};

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

const Payroll = () => {
    const navigate = useNavigate();
    const { school_slug } = useParams();
    const { showToast } = useToast();

    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [markingPaid, setMarkingPaid] = useState(null);

    // Generate Modal
    const [showModal, setShowModal] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null);
    const [payrollForm, setPayrollForm] = useState({ allowances: 0, deductions: 0, note: '' });

    // View Payslip Modal
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewPayslip, setViewPayslip] = useState(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const { data } = await api.get('/api/school/rbac/roles');
                setRoles(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, []);

    const fetchPayrollList = async () => {
        if (!selectedRole) { showToast('Please select a role', 'error'); return; }
        setLoading(true);
        setStaffList([]);
        try {
            const { data } = await api.get(`/api/payroll?role=${selectedRole}&month=${selectedMonth}&year=${selectedYear}`);
            setStaffList(Array.isArray(data) ? data : []);
            if (!data.length) showToast('No staff found for selected role', 'error');
        } catch (error) {
            console.error('Error fetching payroll:', error);
            showToast('Failed to load payroll list', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenGenerate = (staff) => {
        setCurrentStaff(staff);
        setPayrollForm({ allowances: 0, deductions: 0, note: '' });
        setShowModal(true);
    };

    const handleGenerate = async () => {
        if (!currentStaff) return;
        setGenerating(true);
        try {
            await api.post('/api/payroll/generate', {
                staffId: currentStaff._id,
                month: selectedMonth,
                year: selectedYear,
                basicSalary: currentStaff.salary || 0,
                allowances: parseFloat(payrollForm.allowances) || 0,
                deductions: parseFloat(payrollForm.deductions) || 0,
                note: payrollForm.note
            });
            showToast('Payroll generated successfully!');
            setShowModal(false);
            fetchPayrollList();
        } catch (error) {
            console.error('Error generating payroll:', error);
            showToast(error.response?.data?.message || 'Failed to generate payroll', 'error');
        } finally {
            setGenerating(false);
        }
    };

    const handleMarkPaid = async (payslipId) => {
        setMarkingPaid(payslipId);
        try {
            await api.patch(`/api/payroll/${payslipId}/mark-paid`);
            showToast('Marked as Paid!');
            fetchPayrollList();
        } catch (error) {
            console.error('Mark paid error:', error);
            showToast('Failed to mark as paid', 'error');
        } finally {
            setMarkingPaid(null);
        }
    };

    const handleViewPayslip = async (payslipId) => {
        try {
            const { data } = await api.get(`/api/payroll/${payslipId}`);
            setViewPayslip(data);
            setShowViewModal(true);
        } catch (error) {
            showToast('Failed to load payslip', 'error');
        }
    };

    const handlePrint = () => window.print();

    const netSalary = parseFloat(currentStaff?.salary || 0)
        + parseFloat(payrollForm.allowances || 0)
        - parseFloat(payrollForm.deductions || 0);

    const Label = ({ children }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{children}</label>
    );

    // Summary counts
    const summary = {
        Generated: staffList.filter(i => i.status === 'Generated').length,
        Paid: staffList.filter(i => i.status === 'Paid').length,
        'Not Generated': staffList.filter(i => i.status === 'Not Generated').length,
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Generate Payroll</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span className="cursor-pointer hover:text-[#7c32ff]" onClick={() => navigate(`/${school_slug}`)}>Dashboard</span>
                        <span>|</span><span>Human Resource</span>
                        <span>|</span><span className="text-[#1C1C1C]">Generate Payroll</span>
                    </div>
                </div>
            </div>

            {/* Criteria */}
            <Card className="p-8 border-none shadow-sm bg-white rounded-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6 items-end">
                    {/* Role */}
                    <div className="space-y-1">
                        <Label>ROLE *</Label>
                        <div className="relative border-b border-slate-200 focus-within:border-[#7c32ff] transition-all">
                            <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}
                                className="w-full bg-transparent py-2 text-xs font-bold text-slate-600 outline-none appearance-none cursor-pointer">
                                <option value="">Select Role</option>
                                {roles.map(r => <option key={r._id} value={r.name}>{r.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                        </div>
                    </div>
                    {/* Month */}
                    <div className="space-y-1">
                        <Label>MONTH</Label>
                        <div className="relative border-b border-slate-200 focus-within:border-[#7c32ff] transition-all">
                            <select value={selectedMonth} onChange={e => setSelectedMonth(parseInt(e.target.value))}
                                className="w-full bg-transparent py-2 text-xs font-bold text-slate-600 outline-none appearance-none cursor-pointer">
                                {months.map((m, idx) => <option key={idx} value={idx + 1}>{m}</option>)}
                            </select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                        </div>
                    </div>
                    {/* Year */}
                    <div className="space-y-1">
                        <Label>YEAR</Label>
                        <div className="relative border-b border-slate-200 focus-within:border-[#7c32ff] transition-all">
                            <select value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))}
                                className="w-full bg-transparent py-2 text-xs font-bold text-slate-600 outline-none appearance-none cursor-pointer">
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                        </div>
                    </div>
                    <div>
                        <button onClick={fetchPayrollList} disabled={loading}
                            className="flex items-center space-x-2 bg-[#1C1C1C] hover:bg-black disabled:bg-slate-300 text-white rounded-xl px-10 py-3 text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all w-full lg:w-auto">
                            {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                            <span>SEARCH</span>
                        </button>
                    </div>
                </div>
            </Card>

            {/* Staff Table */}
            {staffList.length > 0 && (
                <Card className="p-8 border-none shadow-sm bg-white rounded-3xl overflow-hidden animate-in slide-in-from-bottom-5">
                    {/* Summary */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        {Object.entries(summary).map(([s, count]) => (
                            <div key={s} className={`flex items-center space-x-2 px-4 py-2 rounded-xl border ${statusColors[s]}`}>
                                <span className="text-[10px] font-black uppercase tracking-widest">{s}</span>
                                <span className="text-sm font-black">{count}</span>
                            </div>
                        ))}
                        <div className="flex items-center space-x-2 px-4 py-2 rounded-xl border border-slate-100 bg-slate-50 text-slate-500">
                            <span className="text-[10px] font-black uppercase tracking-widest">Total</span>
                            <span className="text-sm font-black">{staffList.length}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-6 px-2">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest italic">Staff List</h3>
                        <p className="text-[10px] font-bold text-slate-400">{months[selectedMonth - 1]} {selectedYear} · {selectedRole}</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">#</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">Staff ID</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">Name</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">Role</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">Department</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">Basic Salary</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 italic">Status</th>
                                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 text-right italic">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {staffList.map((item, idx) => (
                                    <tr key={item.staff._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="py-5 px-4 text-[10px] font-black text-slate-400">{idx + 1}</td>
                                        <td className="py-5 px-4 text-xs font-bold text-slate-700 italic">{item.staff.staffId || 'N/A'}</td>
                                        <td className="py-5 px-4 text-xs font-bold text-slate-700 italic group-hover:text-[#7c32ff] transition-colors">{item.staff.name}</td>
                                        <td className="py-5 px-4 text-xs font-bold text-slate-500 italic uppercase opacity-70">{item.staff.role}</td>
                                        <td className="py-5 px-4 text-xs font-bold text-slate-500 italic opacity-70">{item.staff.department || 'N/A'}</td>
                                        <td className="py-5 px-4 text-xs font-bold text-slate-700">₹{item.staff.salary || 0}</td>
                                        <td className="py-5 px-4">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[item.status] || 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-5 px-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                {item.status === 'Not Generated' ? (
                                                    <button onClick={() => handleOpenGenerate(item.staff)}
                                                        className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#7c32ff] text-white shadow-lg shadow-purple-200 hover:bg-[#6b25ea] transition-all inline-flex items-center gap-2 active:scale-95">
                                                        <DollarSign size={12} /> GENERATE
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button onClick={() => handleViewPayslip(item.payslipId)}
                                                            className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#7c32ff] border border-[#7c32ff]/30 hover:bg-[#7c32ff]/10 transition-all inline-flex items-center gap-1.5 active:scale-95">
                                                            <Eye size={11} /> VIEW
                                                        </button>
                                                        {item.status === 'Generated' && (
                                                            <button onClick={() => handleMarkPaid(item.payslipId)}
                                                                disabled={markingPaid === item.payslipId}
                                                                className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-600 border border-emerald-200 hover:bg-emerald-50 transition-all inline-flex items-center gap-1.5 active:scale-95 disabled:opacity-50">
                                                                {markingPaid === item.payslipId ? <Loader2 size={11} className="animate-spin" /> : <CheckCircle2 size={11} />}
                                                                MARK PAID
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* Empty State */}
            {!staffList.length && !loading && (
                <div className="py-20 flex flex-col items-center justify-center text-slate-300">
                    <Info size={48} className="mb-4 opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] italic">Select Role, Month, and Year to view payroll</p>
                </div>
            )}

            {/* Generate Modal */}
            {showModal && currentStaff && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest italic">Generate Payroll</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={20} /></button>
                        </div>
                        <div className="p-8 space-y-6">
                            {/* Staff Info */}
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Generating for</p>
                                    <h4 className="text-sm font-black text-slate-800 uppercase italic">{currentStaff.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold">{currentStaff.staffId} · {months[selectedMonth - 1]} {selectedYear}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Salary</p>
                                    <p className="text-lg font-black text-[#7c32ff]">₹{currentStaff.salary || 0}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <Label>ALLOWANCES (+)</Label>
                                    <input type="number" min="0" value={payrollForm.allowances}
                                        onChange={e => setPayrollForm({ ...payrollForm, allowances: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:border-emerald-400 transition-all" />
                                </div>
                                <div className="space-y-1">
                                    <Label>DEDUCTIONS (-)</Label>
                                    <input type="number" min="0" value={payrollForm.deductions}
                                        onChange={e => setPayrollForm({ ...payrollForm, deductions: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:border-rose-400 transition-all" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label>NOTE / REMARK</Label>
                                <textarea value={payrollForm.note}
                                    onChange={e => setPayrollForm({ ...payrollForm, note: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all h-20 resize-none"
                                    placeholder="Any internal notes..." />
                            </div>

                            {/* Total */}
                            <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Net Salary</p>
                                    <p className="text-2xl font-black text-slate-800">₹{Math.max(0, netSalary).toLocaleString('en-IN')}</p>
                                </div>
                                <button onClick={handleGenerate} disabled={generating}
                                    className="flex items-center space-x-2 bg-[#1C1C1C] hover:bg-black disabled:bg-slate-300 text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                                    {generating ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                                    <span>{generating ? 'GENERATING...' : 'CONFIRM & GENERATE'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* View Payslip Modal */}
            {showViewModal && viewPayslip && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowViewModal(false)}>
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                            <div>
                                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest italic">Payslip</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                    {months[(viewPayslip.month || 1) - 1]} {viewPayslip.year}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button onClick={handlePrint} className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all"><Printer size={16} /></button>
                                <button onClick={() => setShowViewModal(false)} className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all"><X size={18} /></button>
                            </div>
                        </div>
                        <div className="p-8 space-y-4">
                            {/* Staff Info in payslip */}
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Staff</p>
                                <h4 className="text-sm font-black text-slate-800">{viewPayslip.staff?.name}</h4>
                                <p className="text-[10px] text-slate-500 font-bold">{viewPayslip.staff?.staffId} · {viewPayslip.staff?.role}</p>
                            </div>
                            {/* Salary Breakdown */}
                            <div className="space-y-3">
                                {[
                                    { label: 'Basic Salary', value: viewPayslip.basicSalary, color: 'text-slate-700' },
                                    { label: 'Allowances (+)', value: viewPayslip.allowances, color: 'text-emerald-600' },
                                    { label: 'Deductions (-)', value: viewPayslip.deductions, color: 'text-rose-500' },
                                ].map(({ label, value, color }) => (
                                    <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50">
                                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
                                        <span className={`text-sm font-black ${color}`}>₹{(value || 0).toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                                <div className="flex items-center justify-between pt-3">
                                    <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">Net Salary</span>
                                    <span className="text-xl font-black text-[#7c32ff]">₹{(viewPayslip.netSalary || 0).toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                            {viewPayslip.note && (
                                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Note</p>
                                    <p className="text-xs text-amber-700 font-medium">{viewPayslip.note}</p>
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[viewPayslip.status]}`}>
                                    {viewPayslip.status}
                                </span>
                                {viewPayslip.status === 'Generated' && (
                                    <button onClick={async () => { await handleMarkPaid(viewPayslip._id); setShowViewModal(false); }}
                                        className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-white hover:bg-emerald-600 transition-all active:scale-95">
                                        <CheckCircle2 size={13} /><span>Mark as Paid</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Float Icon */}
            <div className="fixed bottom-12 right-12 w-10 h-10 bg-[#7c32ff] rounded shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-110 active:scale-95 transition-all">
                <Layout size={18} />
            </div>
        </div>
    );
};

export default Payroll;
