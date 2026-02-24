import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Search,
    ChevronDown,
    Layout,
    Loader2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const LoginPermission = () => {
    const navigate = useNavigate();
    const { school_slug } = useParams();
    const { showToast } = useToast();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toggling, setToggling] = useState({});

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

    const handleToggle = async (roleId) => {
        setToggling(prev => ({ ...prev, [roleId]: true }));
        try {
            await api.patch(`/api/school/rbac/roles/${roleId}/login-toggle`);
            setRoles(prev => prev.map(r => r._id === roleId ? { ...r, allowLogin: !r.allowLogin } : r));
            showToast('Status updated successfully');
        } catch (error) {
            console.error('Toggle Error:', error);
            showToast('Failed to update status', 'error');
        } finally {
            setToggling(prev => ({ ...prev, [roleId]: false }));
        }
    };

    return (
        <div className="animate-in fade-in duration-500 pb-12 text-slate-800 space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Login Permission</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span className="cursor-pointer hover:text-[#7c32ff] transition-colors" onClick={() => navigate(`/${school_slug}`)}>Dashboard</span>
                        <span>|</span>
                        <span>Role Permission</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Login Permission</span>
                    </div>
                </div>
            </div>

            {/* List Table */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl">
                <div className="flex items-center justify-between mb-8 px-2">
                    <h3 className="text-sm font-black text-navy-900 uppercase tracking-widest italic">Role List</h3>
                </div>

                <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-snow-100">
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Role</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 text-right italic">Login Permission</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-snow-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="2" className="py-20 text-center text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Loading...</td>
                                </tr>
                            ) : roles.length === 0 ? (
                                <tr>
                                    <td colSpan="2" className="py-20 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">No Roles Found</td>
                                </tr>
                            ) : (
                                roles.map((role) => (
                                    <tr key={role._id} className="hover:bg-snow-50/50 transition-colors group">
                                        <td className="py-5 px-6 text-xs font-bold text-navy-700">{role.name}</td>
                                        <td className="py-5 px-6 text-right">
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => handleToggle(role._id)}
                                                    disabled={toggling[role._id]}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${role.allowLogin ? 'bg-[#7c32ff]' : 'bg-slate-200'}`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${role.allowLogin ? 'translate-x-6' : 'translate-x-1'}`}
                                                    />
                                                    {toggling[role._id] && (
                                                        <Loader2 className="absolute inset-x-0 mx-auto text-white/50 animate-spin" size={12} />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Float Icon */}
            <div className="fixed bottom-12 right-12 w-10 h-10 bg-[#7c32ff] rounded shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-110 active:scale-95 transition-all">
                <Layout size={18} />
            </div>
        </div>
    );
};

export default LoginPermission;
