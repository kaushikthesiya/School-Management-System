import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Layout,
    Check,
    Layers,
    Copy,
    FileText,
    FileSpreadsheet,
    FileArchive,
    Printer,
    Settings,
    ArrowDown,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Maximize2
} from 'lucide-react';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const Department = () => {
    const { showToast } = useToast();
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({ name: '' });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);

    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin-section/departments');
            setDepartments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching departments:', error);
            showToast('Failed to load departments', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            showToast('Please enter department name', 'warning');
            return;
        }

        setSaving(true);
        try {
            if (editingId) {
                await api.patch(`/api/admin-section/departments/${editingId}`, formData);
                showToast('Department updated successfully');
            } else {
                await api.post('/api/admin-section/departments', formData);
                showToast('Department added successfully');
            }
            setFormData({ name: '' });
            setEditingId(null);
            fetchDepartments();
        } catch (error) {
            console.error('Error saving department:', error);
            showToast(error.response?.data?.message || 'Error saving department', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (item) => {
        setFormData({ name: item.name });
        setEditingId(item._id);
        setOpenDropdown(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this department?')) return;
        try {
            await api.delete(`/api/admin-section/departments/${id}`);
            showToast('Department deleted successfully');
            fetchDepartments();
        } catch (error) {
            console.error('Error deleting department:', error);
            showToast('Error deleting department', 'error');
        }
        setOpenDropdown(null);
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropdown && !event.target.closest('.action-dropdown')) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openDropdown]);

    const filteredList = departments.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Departments</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Human Resource</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Departments</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Department Form */}
                <div className="lg:col-span-4">
                    <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white overflow-hidden rounded-3xl sticky top-24">
                        <div className="bg-slate-50/50 p-6 border-b border-slate-50">
                            <h2 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] flex items-center space-x-3">
                                <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                <span>{editingId ? 'Edit Department' : 'Add Department'}</span>
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-1">
                                <Label required>DEPARTMENT NAME</Label>
                                <input
                                    type="text"
                                    className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-xs font-medium text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter Department"
                                    required
                                />
                            </div>
                            <div className="pt-2 flex flex-col items-center space-y-4">
                                <Button
                                    disabled={saving}
                                    className="bg-[#1C1C1C] hover:bg-black text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all w-full justify-center"
                                >
                                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                                    <span>{saving ? 'SAVING...' : editingId ? 'UPDATE DEPARTMENT' : 'SAVE DEPARTMENT'}</span>
                                </Button>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={() => { setEditingId(null); setFormData({ name: '' }); }}
                                        className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Department List */}
                <div className="lg:col-span-8">
                    <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2">
                            <h3 className="text-sm font-black text-navy-900 uppercase tracking-widest italic">Department List</h3>
                            <div className="flex items-center gap-4">
                                <div className="relative border-b border-slate-200 focus-within:border-[#7c32ff] transition-all">
                                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input
                                        type="text"
                                        placeholder="SEARCH"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-transparent py-1 pl-6 pr-4 text-[10px] font-bold text-slate-600 outline-none w-48 placeholder:text-slate-300"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    {[Copy, FileText, FileSpreadsheet, FileArchive, Printer, Maximize2].map((Icon, idx) => (
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
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Department</th>
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 text-right italic">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-snow-50">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="2" className="py-20 text-center text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Loading...</td>
                                        </tr>
                                    ) : filteredList.length === 0 ? (
                                        <tr>
                                            <td colSpan="2" className="py-20 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">No Departments Found</td>
                                        </tr>
                                    ) : (
                                        filteredList.map((item) => (
                                            <tr key={item._id} className="hover:bg-snow-50/50 transition-colors group">
                                                <td className="py-5 px-6 text-xs font-bold text-navy-700 italic group-hover:text-primary transition-colors">{item.name}</td>
                                                <td className="py-5 px-6 text-right relative action-dropdown flex justify-end">
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => setOpenDropdown(openDropdown === item._id ? null : item._id)}
                                                            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all inline-flex items-center gap-2 border ${openDropdown === item._id ? 'bg-[#7c32ff] text-white border-[#7c32ff]' : 'border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white'}`}
                                                        >
                                                            SELECT <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === item._id ? 'rotate-180' : ''}`} />
                                                        </button>
                                                        {openDropdown === item._id && (
                                                            <div className="absolute right-0 top-12 w-32 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
                                                                <div className="py-1">
                                                                    <button
                                                                        onClick={() => handleEdit(item)}
                                                                        className="w-full px-4 py-2.5 text-[11px] font-bold text-slate-500 hover:bg-slate-50 hover:text-[#7c32ff] transition-colors uppercase tracking-wider flex items-center space-x-2"
                                                                    >
                                                                        <Plus size={12} className="rotate-45" />
                                                                        <span>EDIT</span>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(item._id)}
                                                                        className="w-full px-4 py-2.5 text-[11px] font-bold text-rose-500 hover:bg-rose-50 transition-colors uppercase tracking-wider flex items-center space-x-2 border-t border-slate-50"
                                                                    >
                                                                        <Plus size={12} className="rotate-45" />
                                                                        <span>DELETE</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Department;
