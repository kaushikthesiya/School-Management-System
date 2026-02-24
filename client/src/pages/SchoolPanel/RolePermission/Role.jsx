import React, { useState, useEffect } from 'react';
import { Button, Card, Input as SnowInput } from '../../../components/SnowUI';
import {
    Search,
    Plus,
    ChevronDown,
    Check,
    Copy,
    FileText,
    FileSpreadsheet,
    FileArchive,
    Printer,
    Maximize2,
    ChevronLeft,
    ChevronRight,
    Loader2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const Role = () => {
    const navigate = useNavigate();
    const { school_slug } = useParams();
    const { showToast } = useToast();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [editingRole, setEditingRole] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/school/rbac/roles');
            setRoles(data);
        } catch (error) {
            console.error('Fetch Roles Error:', error);
            showToast('Failed to load roles', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleSaveRole = async (e) => {
        e.preventDefault();
        if (!roleName.trim()) {
            showToast('Please enter a role name', 'warning');
            return;
        }

        setSaving(true);
        try {
            if (editingRole) {
                await api.post('/api/school/rbac/roles', {
                    id: editingRole._id,
                    name: roleName,
                    permissions: editingRole.permissions
                });
                showToast('Role updated successfully!');
            } else {
                await api.post('/api/school/rbac/roles', { name: roleName, permissions: [] });
                showToast('Role created successfully!');
            }
            setRoleName('');
            setEditingRole(null);
            fetchRoles();
        } catch (error) {
            console.error('Save Role Error:', error);
            showToast(error.response?.data?.message || 'Failed to save role', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (role) => {
        setRoleName(role.name);
        setEditingRole(role);
        setOpenDropdown(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (roleId) => {
        if (!window.confirm('Are you sure you want to delete this role?')) return;

        try {
            await api.delete(`/api/school/rbac/roles/${roleId}`);
            showToast('Role deleted successfully!');
            fetchRoles();
        } catch (error) {
            console.error('Delete Role Error:', error);
            showToast('Failed to delete role', 'error');
        }
        setOpenDropdown(null);
    };

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

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

    const filteredRoles = roles.filter(role =>
        role.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Role</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Role Permission</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Role</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Role Form */}
                <div className="lg:col-span-4">
                    <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white overflow-hidden rounded-3xl sticky top-24">
                        <div className="bg-slate-50/50 p-6 border-b border-slate-50">
                            <h2 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] flex items-center space-x-3">
                                <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                <span>{editingRole ? 'Edit Role' : 'Add Role'}</span>
                            </h2>
                        </div>
                        <form onSubmit={handleSaveRole} className="p-8 space-y-6">
                            <div className="space-y-1">
                                <Label required>NAME</Label>
                                <input
                                    type="text"
                                    className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-xs font-medium text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                    value={roleName}
                                    onChange={(e) => setRoleName(e.target.value)}
                                    placeholder="Enter role name"
                                    required
                                />
                            </div>
                            <div className="pt-2 flex justify-center">
                                <Button
                                    disabled={saving}
                                    className="bg-[#1C1C1C] hover:bg-black text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all w-full justify-center"
                                >
                                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                                    <span>{saving ? 'SAVING...' : editingRole ? 'UPDATE ROLE' : 'SAVE ROLE'}</span>
                                </Button>
                            </div>
                            {editingRole && (
                                <button
                                    type="button"
                                    onClick={() => { setEditingRole(null); setRoleName(''); }}
                                    className="w-full text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </form>
                    </Card>
                </div>

                {/* Role List Table */}
                <div className="lg:col-span-8">
                    <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2">
                            <h3 className="text-sm font-black text-navy-900 uppercase tracking-widest">Role List</h3>

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
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Role</th>
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Type</th>
                                        <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 text-right italic">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-snow-50">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="3" className="py-20 text-center text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Loading roles...</td>
                                        </tr>
                                    ) : filteredRoles.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="py-20 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">No Roles Found</td>
                                        </tr>
                                    ) : (
                                        filteredRoles.map((role) => (
                                            <tr key={role._id} className="hover:bg-snow-50/50 transition-colors group">
                                                <td className="py-5 px-6 text-xs font-bold text-navy-700 group-hover:text-primary transition-colors">{role.name}</td>
                                                <td className="py-5 px-6">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${role.isDefault ? 'bg-slate-100 text-slate-500' : 'bg-purple-100 text-purple-600'}`}>
                                                        {role.isDefault ? 'System' : 'Custom'}
                                                    </span>
                                                </td>
                                                <td className="py-5 px-6 text-right relative action-dropdown flex justify-end items-center space-x-3">
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => toggleDropdown(role._id)}
                                                            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all inline-flex items-center gap-2 border ${openDropdown === role._id ? 'bg-[#7c32ff] text-white border-[#7c32ff]' : 'border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white'}`}
                                                        >
                                                            SELECT <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === role._id ? 'rotate-180' : ''}`} />
                                                        </button>

                                                        {/* Action Dropdown */}
                                                        {openDropdown === role._id && (
                                                            <div className="absolute right-0 top-12 w-32 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
                                                                <div className="py-1">
                                                                    <button
                                                                        onClick={() => handleEdit(role)}
                                                                        className="w-full px-4 py-2.5 text-[11px] font-bold text-slate-500 hover:bg-slate-50 hover:text-[#7c32ff] transition-colors uppercase tracking-wider flex items-center space-x-2"
                                                                    >
                                                                        <Plus size={12} className="rotate-45" /> {/* Edit icon placeholder */}
                                                                        <span>EDIT</span>
                                                                    </button>
                                                                    {!role.isDefault && (
                                                                        <button
                                                                            onClick={() => handleDelete(role._id)}
                                                                            className="w-full px-4 py-2.5 text-[11px] font-bold text-rose-500 hover:bg-rose-50 transition-colors uppercase tracking-wider flex items-center space-x-2 border-t border-slate-50"
                                                                        >
                                                                            <Plus size={12} className="rotate-45" /> {/* Trash icon placeholder */}
                                                                            <span>DELETE</span>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => navigate(`/${school_slug}/assign-permission/${role._id}`)}
                                                        className="bg-[#7c32ff] text-white rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest hover:bg-[#6b25ea] transition-all active:scale-95 shadow-lg shadow-purple-500/20"
                                                    >
                                                        ASSIGN PERMISSION
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 flex items-center justify-between px-2">
                            <p className="text-[10px] font-bold text-secondary uppercase tracking-widest italic">Showing 1 to {filteredRoles.length} of {roles.length} entries</p>
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

export default Role;
