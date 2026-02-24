import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Search,
    ChevronDown,
    Layout,
    ChevronLeft,
    ChevronRight,
    DollarSign,
    Loader2,
    Eye,
    Plus,
    X,
    Check
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

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

    // Modal state for generation
    const [showModal, setShowModal] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null);
    const [payrollData, setPayrollData] = useState({
        allowances: 0,
        deductions: 0,
        note: ''
    });

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const { data } = await api.get('/api/roles');
                setRoles(data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, []);

    const fetchPayrollList = async () => {
        if (!selectedRole) {
            showToast('Please select a role', 'error');
            return;
        }
        setLoading(true);
        try {
            const { data } = await api.get(`/api/payroll?role=${selectedRole}&month=${selectedMonth}&year=${selectedYear}`);
            setStaffList(data);
        } catch (error) {
            console.error('Error fetching payroll list:', error);
            showToast('Failed to load payroll list', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (staff) => {
        setCurrentStaff(staff);
        setPayrollData({
            allowances: 0,
            deductions: 0,
            note: ''
        });
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
                allowances: payrollData.allowances,
                deductions: payrollData.deductions
            });
            showToast('Payroll generated successfully');
            setShowModal(false);
            fetchPayrollList();
        } catch (error) {
            console.error('Error generating payroll:', error);
            showToast('Failed to generate payroll', 'error');
        } finally {
            setGenerating(false);
        }
    };

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
            {children} {required && <span className="text-rose-500">*</span>}
        </label>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Generate Payroll</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span className="cursor-pointer" onClick={() => navigate(`/${school_slug}/school`)}>Dashboard</span>
                        <span>|</span>
                        <span>Human Resource</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Generate Payroll</span>
                    </div>
                </div>
            </div>

            {/* Select Criteria */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6 items-end">
                    <div className="space-y-1">
                        <Label required>ROLE</Label>
                        <div className="relative border-b border-slate-200 focus-within:border-[#7c32ff] transition-all">
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full bg-transparent py-2 text-xs font-bold text-slate-600 outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Select Role</option>
                                {roles.map(role => (
                                    <option key={role._id} value={role.name}>{role.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label>MONTH</Label>
                        <div className="relative border-b border-slate-200 focus-within:border-[#7c32ff] transition-all">
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="w-full bg-transparent py-2 text-xs font-bold text-slate-600 outline-none appearance-none cursor-pointer"
                            >
                                {months.map((m, idx) => (
                                    <option key={idx} value={idx + 1}>{m}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label>YEAR</Label>
                        <div className="relative border-b border-slate-200 focus-within:border-[#7c32ff] transition-all">
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="w-full bg-transparent py-2 text-xs font-bold text-slate-600 outline-none appearance-none cursor-pointer"
                            >
                                {years.map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                        </div>
                    </div>
                    <div>
                        <Button
                            onClick={fetchPayrollList}
                            disabled={loading}
                            className="bg-[#1C1C1C] hover:bg-black text-white rounded-xl px-10 py-3 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-100 active:scale-95 transition-all w-full lg:w-auto"
                        >
                            {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} className="mr-2" />}
                            SEARCH
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Payroll List Table */}
            {staffList.length > 0 && (
                <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden animate-in slide-in-from-bottom-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2">
                        <h3 className="text-sm font-black text-navy-900 uppercase tracking-widest italic">Staff List</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-snow-100">
                                    <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Staff ID</th>
                                    <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Name</th>
                                    <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Role</th>
                                    <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Department</th>
                                    <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Mobile</th>
                                    <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Status</th>
                                    <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 text-right italic">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-snow-50">
                                {staffList.map((item) => (
                                    <tr key={item.staff._id} className="hover:bg-snow-50/50 transition-colors group">
                                        <td className="py-5 px-6 text-xs font-bold text-navy-700 italic">{item.staff.staffId}</td>
                                        <td className="py-5 px-6 text-xs font-bold text-navy-700 italic group-hover:text-primary transition-colors">{item.staff.name}</td>
                                        <td className="py-5 px-6 text-xs font-bold text-navy-700 italic uppercase opacity-60">{item.staff.role}</td>
                                        <td className="py-5 px-6 text-xs font-bold text-navy-700 italic opacity-60">{item.staff.department || 'N/A'}</td>
                                        <td className="py-5 px-6 text-xs font-bold text-navy-700 italic opacity-60">{item.staff.contactNo || 'N/A'}</td>
                                        <td className="py-5 px-6">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${item.status === 'Generated' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6 text-right">
                                            {item.status === 'Generated' ? (
                                                <button className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-600 border border-emerald-200 hover:bg-emerald-50 transition-all inline-flex items-center gap-2">
                                                    <Eye size={12} />
                                                    VIEW PAYSLIP
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleOpenModal(item.staff)}
                                                    className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#7c32ff] text-white shadow-lg shadow-purple-200 hover:bg-[#6b25ea] transition-all inline-flex items-center gap-2"
                                                >
                                                    <DollarSign size={12} />
                                                    GENERATE
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* Generation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-sm font-black text-navy-900 uppercase tracking-widest italic">Generate Payroll</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-8 space-y-6 text-slate-800">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Generating for</p>
                                    <h4 className="text-sm font-black text-navy-900 uppercase italic">{currentStaff?.name}</h4>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Salary</p>
                                    <p className="text-sm font-black text-[#7c32ff]">₹{currentStaff?.salary || 0}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <Label>ALLOWANCES</Label>
                                    <input
                                        type="number"
                                        value={payrollData.allowances}
                                        onChange={(e) => setPayrollData({ ...payrollData, allowances: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label>DEDUCTIONS</Label>
                                    <input
                                        type="number"
                                        value={payrollData.deductions}
                                        onChange={(e) => setPayrollData({ ...payrollData, deductions: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:border-rose-400 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label>NOTE / REMARK</Label>
                                <textarea
                                    value={payrollData.note}
                                    onChange={(e) => setPayrollData({ ...payrollData, note: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all h-24 resize-none"
                                    placeholder="Add any internal notes..."
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Net Salary</p>
                                    <p className="text-xl font-black text-navy-900">₹{parseFloat(currentStaff?.salary || 0) + parseFloat(payrollData.allowances || 0) - parseFloat(payrollData.deductions || 0)}</p>
                                </div>
                                <Button
                                    onClick={handleGenerate}
                                    disabled={generating}
                                    className="bg-[#1C1C1C] hover:bg-black text-white rounded-xl px-10 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-slate-200 active:scale-95 transition-all"
                                >
                                    {generating ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                                    <span>CONFIRM & GENERATE</span>
                                </Button>
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
