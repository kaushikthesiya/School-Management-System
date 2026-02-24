import React, { useState } from 'react';
import { Card, Button, Input } from '../components/SnowUI';
import { Key, ShieldCheck, Lock, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

const ChangePassword = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (formData.newPassword !== formData.confirmPassword) {
            return setMessage({ type: 'error', text: 'New passwords do not match' });
        }

        if (formData.newPassword.length < 6) {
            return setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
        }

        setLoading(true);
        try {
            await api.put('/api/auth/change-password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });
            setMessage({ type: 'success', text: 'Password changed successfully!' });
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to change password' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-white rounded-2xl transition-all shadow-snow-sm text-slate-400 hover:text-primary group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-navy-900 tracking-tight uppercase italic underline decoration-primary/10 decoration-8 underline-offset-4">Change Password</h1>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Update your account security</p>
                    </div>
                </div>
            </div>

            <Card className="p-12 border-none shadow-snow-lg rounded-[40px] overflow-hidden relative">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center relative z-10">
                    {/* Left side - Visual */}
                    <div className="md:col-span-2 flex flex-col items-center text-center space-y-6">
                        <div className="relative">
                            <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 border-4 border-white shadow-snow-sm">
                                <UserIcon size={64} />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                                <Lock size={20} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-navy-900 tracking-tight">{user?.name}</h3>
                            <p className="text-slate-400 font-medium text-sm">{user?.email}</p>
                        </div>
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-relaxed">
                                Use a strong password with letters, numbers and symbols
                            </p>
                        </div>
                    </div>

                    {/* Right side - Form */}
                    <div className="md:col-span-3 space-y-8">
                        {message.text && (
                            <div className={`p-4 rounded-2xl text-xs font-bold animate-in zoom-in duration-300 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                                <Input
                                    type="password"
                                    name="currentPassword"
                                    placeholder="Enter current password"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    required
                                    className="h-14 rounded-2xl border-slate-100 focus:border-primary text-sm font-bold"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                                <Input
                                    type="password"
                                    name="newPassword"
                                    placeholder="Enter new password"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    className="h-14 rounded-2xl border-slate-100 focus:border-primary text-sm font-bold"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Re-type new password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="h-14 rounded-2xl border-slate-100 focus:border-primary text-sm font-bold"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all text-xs"
                            >
                                {loading ? 'Updating...' : 'Update Password'}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-0 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 -z-0"></div>
            </Card>
        </div>
    );
};

// Simple User placeholder icon
const UserIcon = ({ size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export default ChangePassword;
