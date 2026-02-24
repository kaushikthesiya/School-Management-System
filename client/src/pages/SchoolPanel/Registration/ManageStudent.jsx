import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import { Card, Button, Input, Modal, Select, Badge } from '../../../components/SnowUI';
import {
    Search,
    ChevronDown,
    Filter,
    ArrowUpDown,
    Copy,
    FileSpreadsheet,
    FileText,
    FileCode,
    Printer,
    LayoutGrid,
    Eye,
    CheckCircle,
    XCircle,
    Loader2
} from 'lucide-react';

const ManageStudent = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedReg, setSelectedReg] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

    // Approval Form
    const [approveData, setApproveData] = useState({ admissionNumber: '', roll: '' });
    const [rejectReason, setRejectReason] = useState('');
    const [processing, setProcessing] = useState(false);

    const fetchRegistrations = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/online-admission/admin');
            setRegistrations(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Fetch Registrations Error:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const handleApprove = async () => {
        if (!approveData.admissionNumber) return alert('Admission Number is required');
        setProcessing(true);
        try {
            await api.post(`/api/online-admission/admin/approve/${selectedReg._id}`, approveData);
            setIsApproveModalOpen(false);
            fetchRegistrations();
            alert('Student approved and admitted successfully!');
        } catch (err) {
            alert(err.response?.data?.message || 'Approval failed');
        } finally {
            setProcessing(false);
        }
    };

    const handleReject = async () => {
        setProcessing(true);
        try {
            await api.patch(`/api/online-admission/admin/status/${selectedReg._id}`, {
                status: 'Rejected',
                rejectionReason: rejectReason
            });
            setIsRejectModalOpen(false);
            fetchRegistrations();
        } catch (err) {
            alert('Rejection failed');
        } finally {
            setProcessing(false);
        }
    };

    const columns = [
        'Name',
        'Class',
        'Session',
        'Date Of Birth',
        'Guardian',
        'Phone',
        'Status',
        'Actions'
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Page Header */}
            <div className="flex justify-between items-center px-2">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Online Registrations</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="text-slate-500">Student List</span>
                </div>
            </div>

            {/* Registration List Table Card */}
            <Card className="p-8 border-none shadow-snow-lg bg-white rounded-2xl overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">
                        Pending Registrations ({registrations.length})
                    </h3>

                    <div className="flex items-center space-x-6">
                        <div className="relative border-b border-slate-100 pb-1">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                            <input
                                type="text"
                                placeholder="SEARCH"
                                className="pl-6 pr-4 py-2 bg-transparent text-[10px] font-black text-slate-500 outline-none w-48 tracking-widest"
                            />
                        </div>
                        <Button variant="outline" className="p-2" onClick={fetchRegistrations}>
                            <Loader2 className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                {columns.map((header, idx) => (
                                    <th key={idx} className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                        <div className="flex items-center space-x-2">
                                            <span>{header}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-10 text-center text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                                        Loading Data...
                                    </td>
                                </tr>
                            ) : registrations.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-10 text-center text-xs font-bold text-slate-400 uppercase tracking-widest italic">
                                        No Pending Registrations Found
                                    </td>
                                </tr>
                            ) : registrations.map((reg) => (
                                <tr key={reg._id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 text-xs font-bold text-slate-700">{reg.firstName} {reg.lastName}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-600">{reg.class?.name || 'N/A'}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-600">{reg.academicYear?.year || 'N/A'}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-600">
                                        {new Date(reg.dob).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-600">{reg.guardianName}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-600">{reg.phoneNumber}</td>
                                    <td className="px-6 py-4">
                                        <Badge variant={reg.status === 'Pending' ? 'warning' : reg.status === 'Approved' ? 'success' : 'error'}>
                                            {reg.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => { setSelectedReg(reg); setIsViewModalOpen(true); }}
                                                className="p-2 text-slate-400 hover:text-primary transition-colors bg-white rounded-lg shadow-sm"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            {reg.status === 'Pending' && (
                                                <>
                                                    <button
                                                        onClick={() => { setSelectedReg(reg); setApproveData({ admissionNumber: '', roll: '' }); setIsApproveModalOpen(true); }}
                                                        className="p-2 text-emerald-500 hover:text-emerald-600 transition-colors bg-white rounded-lg shadow-sm"
                                                    >
                                                        <CheckCircle size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => { setSelectedReg(reg); setRejectReason(''); setIsRejectModalOpen(true); }}
                                                        className="p-2 text-red-400 hover:text-red-500 transition-colors bg-white rounded-lg shadow-sm"
                                                    >
                                                        <XCircle size={16} />
                                                    </button>
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

            {/* View Details Modal */}
            <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Registration Details">
                {selectedReg && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Name</label>
                                <p className="text-sm font-bold text-slate-800">{selectedReg.firstName} {selectedReg.lastName}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Class</label>
                                <p className="text-sm font-bold text-slate-800">{selectedReg.class?.name}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DOB</label>
                                <p className="text-sm font-bold text-slate-800">{new Date(selectedReg.dob).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="h-px bg-slate-100" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Guardian Name</label>
                                <p className="text-sm font-bold text-slate-800">{selectedReg.guardianName}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Relation</label>
                                <p className="text-sm font-bold text-slate-800">{selectedReg.relation}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Guardian Phone</label>
                                <p className="text-sm font-bold text-slate-800">{selectedReg.guardianPhone}</p>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Address</label>
                            <p className="text-sm font-bold text-slate-800">{selectedReg.guardianAddress || 'N/A'}</p>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Approve Modal */}
            <Modal isOpen={isApproveModalOpen} onClose={() => setIsApproveModalOpen(false)} title="Approve Student">
                <div className="p-4 space-y-6">
                    <p className="text-xs font-medium text-slate-500">Please provide the admission details to complete the approval process for <strong>{selectedReg?.firstName}</strong>.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Admission No *"
                            value={approveData.admissionNumber}
                            onChange={(e) => setApproveData(p => ({ ...p, admissionNumber: e.target.value }))}
                            placeholder="Enter Admission No"
                            autoFocus
                        />
                        <Input
                            label="Roll No"
                            value={approveData.roll}
                            onChange={(e) => setApproveData(p => ({ ...p, roll: e.target.value }))}
                            placeholder="Enter Roll No (optional)"
                        />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <Button variant="outline" onClick={() => setIsApproveModalOpen(false)}>CANCEL</Button>
                        <Button onClick={handleApprove} disabled={processing}>
                            {processing ? 'APPROVING...' : 'APPROVE & ADMIT'}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Reject Modal */}
            <Modal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} title="Reject Registration">
                <div className="p-4 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 italic uppercase tracking-tight">Rejection Reason</label>
                        <textarea
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-navy-700 min-h-[100px]"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Enter reason for rejection..."
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>CANCEL</Button>
                        <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={handleReject} disabled={processing}>
                            {processing ? 'REJECTING...' : 'REJECT REGISTRATION'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ManageStudent;
