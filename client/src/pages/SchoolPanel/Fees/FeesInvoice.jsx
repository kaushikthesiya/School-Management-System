import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Copy,
    FileText,
    Download,
    Printer,
    Layout,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    ChevronDown,
    CreditCard,
    ShieldCheck,
    Check,
    DollarSign,
    CreditCard as Razorpay
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const FeesInvoice = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form Data needed for Add Invoice
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [feeStructures, setFeeStructures] = useState([]);

    const [formData, setFormData] = useState({
        classId: '',
        studentId: '',
        createDate: new Date().toISOString().split('T')[0],
        dueDate: new Date().toISOString().split('T')[0],
        paymentStatus: '',
        feeStructureId: '',
        amountPaid: 0 // For initial payment if any
    });

    useEffect(() => {
        fetchInvoices();
        fetchClasses();
        fetchFeeStructures();
    }, []);

    useEffect(() => {
        if (formData.classId) {
            fetchStudents(formData.classId);
        } else {
            setStudents([]);
        }
    }, [formData.classId]);

    const fetchInvoices = async () => {
        try {
            const res = await api.get('/api/fees/records');
            setInvoices(res.data);
        } catch (error) {
            console.error("Failed to fetch invoices", error);
        }
    };

    const fetchClasses = async () => {
        try {
            const res = await api.get('/api/academic/classes');
            setClasses(res.data);
        } catch (error) {
            console.error("Failed to fetch classes");
        }
    };

    const fetchFeeStructures = async () => {
        try {
            const res = await api.get('/api/fees/structures');
            setFeeStructures(res.data);
        } catch (error) {
            console.error("Failed to fetch fee structures");
        }
    };

    const fetchStudents = async (classId) => {
        try {
            const res = await api.get(`/api/students?classId=${classId}`);
            setStudents(res.data);
        } catch (error) {
            console.error("Failed to fetch students");
        }
    };

    const handleSaveInvoice = async () => {
        if (!formData.studentId || !formData.feeStructureId || !formData.paymentStatus) { // Basic Validation
            showToast('Please fill all required fields', 'error');
            return;
        }

        setLoading(true);
        try {
            // Determine amountPaid based on status.
            let amountPaid = 0;
            const selectedStructure = feeStructures.find(f => f._id === formData.feeStructureId);
            const totalAmount = selectedStructure ? selectedStructure.amount : 0;

            if (formData.paymentStatus === 'Paid') amountPaid = totalAmount;
            else if (formData.paymentStatus === 'Partial') amountPaid = formData.amountPaid || 0;
            // If Unpaid/Pending, amountPaid stays 0

            const payload = {
                student: formData.studentId,
                class: formData.classId,
                feeStructure: formData.feeStructureId,
                amountPaid: amountPaid,
                paymentDate: formData.createDate, // Using create date as payment date for initial record
                status: formData.paymentStatus,
                paymentMethod: 'Cash' // Defaulting for now as per UI flow assumption
            };

            await api.post('/api/fees/collect', payload);
            showToast('Invoice created successfully!');
            setIsAdding(false);
            fetchInvoices();
            // Reset form
            setFormData({
                classId: '',
                studentId: '',
                createDate: new Date().toISOString().split('T')[0],
                dueDate: new Date().toISOString().split('T')[0],
                paymentStatus: '',
                feeStructureId: '',
                amountPaid: 0
            });

        } catch (error) {
            console.error("Error creating invoice", error);
            showToast('Failed to create invoice', 'error');
        } finally {
            setLoading(false);
        }
    };


    const ActionIcon = ({ Icon }) => (
        <button className="p-2 rounded-lg text-slate-400 hover:text-[#7c32ff] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
            <Icon size={14} />
        </button>
    );

    const AddInvoiceView = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-slate-800">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Add Fees Invoice</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-[#7c32ff] cursor-pointer">Fees</span>
                    <span>|</span>
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => setIsAdding(false)}>Fees Invoice</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Add Fees Invoice</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                {/* Left Column - Form */}
                <Card className="lg:col-span-1 p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden sticky top-24">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-2 italic">Add Fees Invoice</h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-8 italic">Invoice - infixEdu-Admission No-Class-Section</p>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">Class *</label>
                            <select
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none italic"
                                value={formData.classId}
                                onChange={(e) => setFormData({ ...formData, classId: e.target.value, studentId: '' })}
                            >
                                <option value="">Select Class *</option>
                                {classes.map(cls => <option key={cls._id} value={cls._id}>{cls.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">SELECT STUDENT *</label>
                            <select
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none italic"
                                value={formData.studentId}
                                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                disabled={!formData.classId}
                            >
                                <option value="">Select Student *</option>
                                {students.map(std => <option key={std._id} value={std._id}>{std.name} ({std.admissionNo})</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">FEE STRUCTURE *</label>
                            <select
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none italic"
                                value={formData.feeStructureId}
                                onChange={(e) => setFormData({ ...formData, feeStructureId: e.target.value })}
                            >
                                <option value="">Select Fee Structure *</option>
                                {feeStructures.map(fs => <option key={fs._id} value={fs._id}>{fs.name} - ₹{fs.amount}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">CREATE DATE *</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all italic"
                                    value={formData.createDate}
                                    onChange={(e) => setFormData({ ...formData, createDate: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">PAYMENT STATUS *</label>
                            <select
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none italic"
                                value={formData.paymentStatus}
                                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                            >
                                <option value="">Payment Status *</option>
                                <option value="Pending">Unpaid (Pending)</option>
                                <option value="Partial">Partial</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </div>
                        {formData.paymentStatus === 'Partial' && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">AMOUNT PAID *</label>
                                <input
                                    type="number"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all italic"
                                    value={formData.amountPaid}
                                    onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
                                    placeholder="Enter Amount"
                                />
                            </div>
                        )}

                        <div className="pt-4 flex justify-center">
                            <Button
                                onClick={handleSaveInvoice}
                                disabled={loading}
                                className="w-32 bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center space-x-2"
                            >
                                <Check size={14} strokeWidth={3} />
                                <span>{loading ? 'SAVING...' : 'SAVE'}</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Right Column - Placeholders for now as per UI */}
                <Card className="lg:col-span-3 p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative min-h-[600px] flex items-center justify-center">
                    <p className="text-slate-400 font-bold italic">Select options on the left to add invoice.</p>
                    {/* Close Button Overlay */}
                    <div className="absolute top-0 right-0 p-8">
                        <button onClick={() => setIsAdding(false)} className="w-10 h-10 rounded-full bg-slate-50 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all flex items-center justify-center group shadow-sm active:scale-95">
                            <Plus size={20} className="rotate-45" />
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );

    if (isAdding) return <AddInvoiceView />;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Fees Invoice</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span>Fees</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Fees Invoice</span>
                </div>
            </div>

            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                <div className="flex flex-col space-y-8">
                    <div className="flex justify-between items-center">
                        <Button
                            onClick={() => setIsAdding(true)}
                            className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center space-x-2"
                        >
                            <Plus size={14} strokeWidth={3} />
                            <span>ADD</span>
                        </Button>

                        {/* Search & Actions */}
                        <div className="flex items-center space-x-6">
                            <div className="relative group">
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                                <input
                                    type="text"
                                    placeholder="QUICK SEARCH"
                                    className="bg-transparent border-b border-slate-100 py-2 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:border-[#7c32ff] transition-all w-64"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-50 italic text-slate-400">
                                    {['Student', 'Class', 'Fee Structure', 'Amount Due', 'Paid', 'Status', 'Date', 'Action'].map((h, i) => (
                                        <th key={i} className="text-left py-5 px-4 text-[10px] font-black uppercase tracking-widest">
                                            <div className="flex items-center space-x-1"><span>{h}</span></div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.length > 0 ? (
                                    invoices.map((inv) => (
                                        <tr key={inv._id} className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                            <td className="py-5 px-4 text-[11px] font-bold text-slate-600 italic text-nowrap">
                                                {inv.student?.name} <span className="text-slate-400">({inv.student?.admissionNo})</span>
                                            </td>
                                            <td className="py-5 px-4 text-[11px] font-bold text-slate-400 italic tabular-nums">{inv.class?.name}</td>
                                            <td className="py-5 px-4 text-[11px] font-bold text-slate-600 italic tabular-nums">{inv.feeStructure?.name}</td>
                                            <td className="py-5 px-4 text-[11px] font-bold text-slate-600 italic tabular-nums">{inv.feeStructure?.amount}</td>
                                            <td className="py-5 px-4 text-[11px] font-bold text-emerald-500 italic tabular-nums">{inv.amountPaid}</td>
                                            <td className="py-5 px-4 text-nowrap">
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest shadow-sm ${inv.status === 'Paid' ? 'bg-emerald-500 text-white shadow-emerald-500/10' : inv.status === 'Partial' ? 'bg-yellow-500 text-white' : 'bg-[#EB5757] text-white shadow-red-500/10'}`}>
                                                    {inv.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="py-5 px-4 text-[11px] font-bold text-slate-500 italic uppercase whitespace-nowrap">{new Date(inv.createdAt).toLocaleDateString()}</td>
                                            <td className="py-5 px-4 text-right">
                                                {/* Actions can be expanded */}
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button className="p-1.5 rounded-lg text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 transition-all border border-transparent hover:border-emerald-100" title="Download PDF">
                                                        <FileText size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center text-xs font-bold text-slate-400 italic">
                                            No invoices found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>
        </div>
    );
};

// End of file
export default FeesInvoice;
