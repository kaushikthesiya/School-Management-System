import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../../../../components/SnowUI';
import {
    Search, Copy, FileSpreadsheet, Download, Printer,
    FileText, ChevronDown, CheckCircle2, MoreHorizontal, Clock, Edit2, Trash2, Check
} from 'lucide-react';
import api from '../../../../api/api';
import { useToast } from '../../../../context/ToastContext';

const LeaveType = () => {
    const { showToast } = useToast();
    const [typeName, setTypeName] = useState('');
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [editId, setEditId] = useState(null);
    const [activeActionId, setActiveActionId] = useState(null);

    const fetchLeaveTypes = async () => {
        try {
            const { data } = await api.get('/api/admin-section/leave-types');
            setLeaveTypes(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching leave types:', error);
            showToast('Failed to fetch leave types', 'error');
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!typeName.trim()) return;
        setLoading(true);
        try {
            await api.post('/api/admin-section/leave-types', { id: editId, name: typeName });
            showToast(`Leave type ${editId ? 'updated' : 'saved'} successfully`, 'success');
            setTypeName('');
            setEditId(null);
            fetchLeaveTypes();
        } catch (error) {
            console.error('Error saving leave type:', error);
            showToast('Failed to save leave type', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this leave type?')) return;
        try {
            await api.delete(`/api/admin-section/leave-types/${id}`);
            showToast('Leave type deleted successfully', 'success');
            fetchLeaveTypes();
        } catch (error) {
            console.error('Error deleting leave type:', error);
            showToast('Failed to delete leave type', 'error');
        }
    };

    const handleEdit = (type) => {
        setTypeName(type.name);
        setEditId(type._id);
        setActiveActionId(null);
    };

    useEffect(() => {
        fetchLeaveTypes();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeActionId && !event.target.closest('.action-dropdown')) {
                setActiveActionId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeActionId]);

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
            {children} {required && <span className="text-rose-500">*</span>}
        </label>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Leave Type</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Leave</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Leave Type</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Add Leave Type Form */}
                <div className="lg:col-span-4">
                    <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white overflow-hidden rounded-3xl sticky top-24">
                        <div className="bg-slate-50/50 p-6 border-b border-slate-50">
                            <h2 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] flex items-center space-x-3">
                                <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                <span>{editId ? 'Edit Leave Type' : 'Add Leave Type'}</span>
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-1">
                                <Label required>TYPE NAME</Label>
                                <input
                                    type="text"
                                    className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-xs font-medium text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                    placeholder="Enter Leave Type Name"
                                    value={typeName}
                                    onChange={(e) => setTypeName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="pt-2 flex justify-center">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#1C1C1C] hover:bg-black text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all w-full justify-center"
                                >
                                    <CheckCircle2 size={16} />
                                    <span>{loading ? 'SAVING...' : editId ? 'UPDATE TYPE' : 'SAVE TYPE'}</span>
                                </Button>
                            </div>
                            {editId && (
                                <button
                                    type="button"
                                    onClick={() => { setEditId(null); setTypeName(''); }}
                                    className="w-full text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </form>
                    </Card>
                </div>

                {/* Right Column: Leave Type List */}
                <div className="lg:col-span-8">
                    <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2">
                            <h3 className="text-sm font-black text-navy-900 uppercase tracking-widest">Leave Type List</h3>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={14} />
                                    <input
                                        type="text"
                                        placeholder="QUICK SEARCH"
                                        className="pl-10 pr-4 py-2.5 bg-snow-50 border border-slate-100 rounded-xl text-[10px] font-black tracking-widest focus:ring-2 focus:ring-[#7c32ff]/20 w-40 outline-none placeholder:text-secondary/60 transition-all uppercase"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    {[Copy, FileSpreadsheet, Download, Printer, FileText].map((Icon, idx) => (
                                        <button key={idx} className="p-2 text-slate-400 hover:text-[#7c32ff] transition-all">
                                            <Icon size={14} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto min-h-[400px]">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-snow-100">
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Type</th>
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 text-right italic">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-snow-50">
                                    {fetching ? (
                                        <tr>
                                            <td colSpan="2" className="py-20 text-center text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Loading Leave Types...</td>
                                        </tr>
                                    ) : leaveTypes.length === 0 ? (
                                        <tr>
                                            <td colSpan="2" className="py-20 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">No Leave Types Found</td>
                                        </tr>
                                    ) : leaveTypes.map((type) => (
                                        <tr key={type._id} className="hover:bg-snow-50/50 transition-colors group">
                                            <td className="py-5 px-6 text-xs font-bold text-navy-700 group-hover:text-primary transition-colors">{type.name}</td>
                                            <td className="py-5 px-6 text-right relative action-dropdown">
                                                <button
                                                    onClick={() => setActiveActionId(activeActionId === type._id ? null : type._id)}
                                                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all inline-flex items-center gap-2 border ${activeActionId === type._id ? 'bg-[#7c32ff] text-white border-[#7c32ff]' : 'border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white'}`}
                                                >
                                                    SELECT <ChevronDown size={14} className={`transition-transform duration-200 ${activeActionId === type._id ? 'rotate-180' : ''}`} />
                                                </button>

                                                {/* Action Dropdown */}
                                                {activeActionId === type._id && (
                                                    <div className="absolute right-6 top-12 w-32 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
                                                        <div className="py-1">
                                                            <button
                                                                onClick={() => handleEdit(type)}
                                                                className="w-full px-4 py-2.5 text-[11px] font-bold text-slate-500 hover:bg-slate-50 hover:text-[#7c32ff] transition-colors uppercase tracking-wider flex items-center space-x-2"
                                                            >
                                                                <Edit2 size={12} />
                                                                <span>EDIT</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(type._id)}
                                                                className="w-full px-4 py-2.5 text-[11px] font-bold text-rose-500 hover:bg-rose-50 transition-colors uppercase tracking-wider flex items-center space-x-2 border-t border-slate-50"
                                                            >
                                                                <Trash2 size={12} />
                                                                <span>DELETE</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 flex items-center justify-between px-2">
                            <p className="text-[10px] font-bold text-secondary uppercase tracking-widest italic">Showing 1 to {leaveTypes.length} of {leaveTypes.length} entries</p>
                            <div className="flex items-center gap-2">
                                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-[#7c32ff] font-black text-[10px] shadow-lg shadow-purple-200">1</button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LeaveType;

