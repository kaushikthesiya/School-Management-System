import React, { useState } from 'react';
import { Card, Button } from '../../components/SnowUI';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../api/api';
import { User, Mail, Shield, Edit2, Save, X, Globe } from 'lucide-react';

const SuperAdminProfile = () => {
    const { user, setUser } = useAuth();
    const { showToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });

    const handleSave = async () => {
        setLoading(true);
        try {
            const { data } = await api.put('/api/auth/profile', formData);
            setUser({ ...user, ...data });
            showToast('Profile updated successfully', 'success');
            setIsEditing(false);
        } catch (error) {
            console.error('Update profile error:', error);
            showToast(error.response?.data?.message || 'Failed to update profile', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">My Profile</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>Super Admin</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Profile</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Sidebar - Profile Card */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                        <div className="h-28 bg-[#7c32ff] w-full" />
                        <div className="px-8 pb-10 -mt-14 text-center relative z-10">
                            <div className="inline-block relative">
                                <div className="w-28 h-28 rounded-3xl bg-white p-1 shadow-xl">
                                    <div className="w-full h-full rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
                                        <User size={48} />
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
                            </div>

                            <div className="mt-6 flex flex-col items-center">
                                <h2 className="text-xl font-black text-slate-800 italic uppercase">{user?.name}</h2>
                                <span className="mt-1 px-4 py-1 bg-purple-50 text-[#7c32ff] text-[10px] font-black uppercase tracking-widest rounded-full border border-purple-100 italic">
                                    {user?.role}
                                </span>
                            </div>

                            <div className="mt-10 space-y-4 text-left">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 border border-slate-100">
                                            <Mail size={16} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Primary Email</p>
                                            <p className="text-[11px] font-bold text-slate-600 italic truncate">{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 border border-slate-100">
                                            <Shield size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">System Privilege</p>
                                            <p className="text-[11px] font-bold text-slate-600 italic">Full Access</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Content Area - Edit Form */}
                <div className="lg:col-span-8">
                    <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2">
                                <Globe size={18} />
                                <span>Account Information</span>
                            </h3>
                            {!isEditing ? (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-slate-50 hover:bg-slate-100 text-slate-600 border-none rounded-xl px-6 py-2 flex items-center space-x-2 transition-all text-[10px] font-black uppercase tracking-widest"
                                >
                                    <Edit2 size={14} />
                                    <span>Edit Info</span>
                                </Button>
                            ) : (
                                <div className="flex space-x-2">
                                    <Button
                                        onClick={() => setIsEditing(false)}
                                        className="bg-red-50 hover:bg-red-100 text-red-500 border-none rounded-xl px-6 py-2 flex items-center space-x-2 transition-all text-[10px] font-black uppercase tracking-widest"
                                    >
                                        <X size={14} />
                                        <span>Cancel</span>
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-6 py-2 flex items-center space-x-2 transition-all text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-500/20 shadow-lg shadow-purple-500/20"
                                    >
                                        <Save size={14} />
                                        <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] italic">Display Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:border-[#7c32ff] outline-none transition-all italic"
                                            placeholder="Enter your name"
                                        />
                                    ) : (
                                        <div className="px-5 py-4 bg-slate-50 rounded-2xl border border-transparent italic text-sm font-bold text-slate-600">
                                            {user?.name}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] italic">Email Address</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:border-[#7c32ff] outline-none transition-all italic"
                                            placeholder="Enter email address"
                                        />
                                    ) : (
                                        <div className="px-5 py-4 bg-slate-50 rounded-2xl border border-transparent italic text-sm font-bold text-slate-600">
                                            {user?.email}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-8 bg-purple-50/50 rounded-[32px] border border-purple-100 border-dashed mt-10">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#7c32ff] shadow-sm shrink-0 border border-purple-100">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest italic mb-1">Security Notice</h4>
                                        <p className="text-[11px] font-bold text-slate-400 leading-relaxed italic">
                                            To ensure the security of the master portal, any change to the Super Admin credentials should be carefully reviewed.
                                            Contact the system administrator if you detect any unauthorized access foundation foundation foundation foundations.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminProfile;
