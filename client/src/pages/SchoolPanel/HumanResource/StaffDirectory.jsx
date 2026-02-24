import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Search,
    ChevronDown,
    MoreVertical,
    Plus,
    Copy,
    FileText,
    FileSpreadsheet,
    FileArchive,
    Printer,
    Maximize2,
    Loader2,
    UserCircle,
    ChevronLeft,
    ChevronRight
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

const StaffDirectory = () => {
    const navigate = useNavigate();
    const { school_slug } = useParams();
    const { showToast } = useToast();
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeActionId, setActiveActionId] = useState(null);

    // Filter states
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (searchQuery) params.append('search', searchQuery);
            if (selectedRole) params.append('role', selectedRole);

            const { data } = await api.get(`/api/staff?${params.toString()}`);
            setStaffList(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching staff:', error);
            showToast('Failed to load staff directory', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const { data } = await api.get('/api/roles');
            setRoles(data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchStaff();
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, selectedRole]);

    const toggleStatus = async (id) => {
        try {
            await api.patch(`/api/staff/${id}/toggle-status`);
            showToast('Status updated successfully');
            fetchStaff();
        } catch (error) {
            console.error('Error toggling status:', error);
            showToast('Failed to update status', 'error');
        }
    };

    const handleEdit = (staff) => {
        navigate(`/${school_slug}/add-staff`, { state: { editData: staff } });
        setActiveActionId(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this staff member?')) return;
        try {
            await api.delete(`/api/staff/${id}`);
            showToast('Staff deleted successfully');
            fetchStaff();
        } catch (error) {
            console.error('Error deleting staff:', error);
            showToast('Error deleting staff member', 'error');
        }
    };

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

    const Label = ({ children }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
            {children}
        </label>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Staff Directory</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span className="cursor-pointer" onClick={() => navigate(`/${school_slug}/school`)}>Dashboard</span>
                        <span>|</span>
                        <span>Human Resource</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Staff Directory</span>
                    </div>
                </div>
                <Button
                    onClick={() => navigate(`/${school_slug}/add-staff`)}
                    className="bg-[#1C1C1C] hover:bg-black text-white rounded-xl px-6 py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-slate-200 active:scale-95 transition-all"
                >
                    <Plus size={14} />
                    <span>ADD STAFF</span>
                </Button>
            </div>

            {/* Selection Criteria */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl">
                <div className="flex flex-col md:flex-row md:items-end gap-10">
                    <div className="flex-1 space-y-1">
                        <Label>ROLE</Label>
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
                    <div className="flex-1 space-y-1">
                        <Label>SEARCH BY KEYWORD</Label>
                        <div className="relative border-b border-slate-200 focus-within:border-[#7c32ff] transition-all">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                            <input
                                type="text"
                                placeholder="Search by Staff Name, ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent py-2 pl-6 pr-4 text-xs font-bold text-slate-600 outline-none placeholder:text-slate-300"
                            />
                        </div>
                    </div>
                    <div className="md:w-auto">
                        <Button
                            onClick={fetchStaff}
                            className="bg-[#1C1C1C] hover:bg-black text-white rounded-xl px-10 py-3 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-100 active:scale-95 transition-all w-full md:w-auto"
                        >
                            SEARCH
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Staff List Table */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2">
                    <h3 className="text-sm font-black text-navy-900 uppercase tracking-widest italic">Staff List</h3>
                    <div className="flex items-center space-x-2">
                        {[Copy, FileText, FileSpreadsheet, FileArchive, Printer, Maximize2].map((Icon, idx) => (
                            <button key={idx} className="p-2 text-slate-400 hover:text-[#7c32ff] transition-all">
                                <Icon size={14} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-snow-100">
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Staff No</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Name</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Role</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Dept</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Designation</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Mobile</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Status</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 text-right italic">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-snow-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="py-20 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-4">
                                            <Loader2 className="w-8 h-8 text-[#7c32ff] animate-spin" />
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading staff members...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : staffList.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="py-20 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">No Staff Found</td>
                                </tr>
                            ) : (
                                staffList.map((staff) => (
                                    <tr key={staff._id} className="hover:bg-snow-50/50 transition-colors group">
                                        <td className="py-5 px-6 text-xs font-bold text-navy-700 italic group-hover:text-primary transition-colors">{staff.staffId || 'N/A'}</td>
                                        <td className="py-5 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden border border-slate-50">
                                                    {staff.photo
                                                        ? <img src={getPhotoUrl(staff.photo)} alt={staff.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                                                        : <UserCircle size={20} />}
                                                </div>
                                                <div className="text-xs font-bold text-navy-700 italic">{staff.name}</div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 text-xs font-bold text-navy-700 italic uppercase opacity-60">{staff.role}</td>
                                        <td className="py-5 px-6 text-xs font-bold text-navy-700 italic opacity-60">{staff.department || 'N/A'}</td>
                                        <td className="py-5 px-6 text-xs font-bold text-navy-700 italic opacity-60">{staff.designation || 'N/A'}</td>
                                        <td className="py-5 px-6 text-xs font-bold text-navy-700 italic opacity-60">{staff.contactNo || 'N/A'}</td>
                                        <td className="py-5 px-6">
                                            <button
                                                onClick={() => toggleStatus(staff._id)}
                                                className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${staff.status ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}
                                            >
                                                {staff.status ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="py-5 px-6 text-right relative action-dropdown flex justify-end">
                                            <div className="relative">
                                                <button
                                                    onClick={() => setActiveActionId(activeActionId === staff._id ? null : staff._id)}
                                                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all inline-flex items-center gap-2 border ${activeActionId === staff._id ? 'bg-[#7c32ff] text-white border-[#7c32ff]' : 'border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white'}`}
                                                >
                                                    SELECT <ChevronDown size={14} className={`transition-transform duration-200 ${activeActionId === staff._id ? 'rotate-180' : ''}`} />
                                                </button>
                                                {activeActionId === staff._id && (
                                                    <div className="absolute right-0 top-12 w-32 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
                                                        <div className="py-1">
                                                            <button
                                                                onClick={() => handleEdit(staff)}
                                                                className="w-full px-4 py-2.5 text-[11px] font-bold text-slate-500 hover:bg-slate-50 hover:text-[#7c32ff] transition-colors uppercase tracking-wider flex items-center space-x-2"
                                                            >
                                                                <Plus size={12} className="rotate-45" />
                                                                <span>EDIT</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(staff._id)}
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
    );
};

export default StaffDirectory;
