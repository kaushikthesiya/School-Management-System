import React, { useState, useEffect } from 'react';
import { Card, Button } from '../../components/SnowUI';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Shield,
    Edit,
    Save,
    X,
    Users,
    GraduationCap,
    Clock,
    Award
} from 'lucide-react';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const ParentProfile = () => {
    const { user, setUser } = useAuth();
    const { showToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetchingChildren, setFetchingChildren] = useState(true);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });
    const [children, setChildren] = useState([]);

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const { data } = await api.get('/api/students/my-children');
                setChildren(data);
            } catch (error) {
                console.error('Error fetching children:', error);
            } finally {
                setFetchingChildren(false);
            }
        };
        fetchChildren();
    }, []);

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
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase text-left">Parent Profile</h1>
                {!isEditing ? (
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-slate-50 hover:bg-slate-100 text-slate-600 border-none rounded-xl px-4 py-2 flex items-center space-x-2 transition-all text-xs font-bold uppercase tracking-widest italic"
                    >
                        <Edit size={16} />
                        <span>Edit</span>
                    </Button>
                ) : (
                    <div className="flex space-x-2">
                        <Button
                            onClick={() => setIsEditing(false)}
                            className="bg-red-50 hover:bg-red-100 text-red-500 border-none rounded-xl px-4 py-2 flex items-center space-x-2 transition-all text-xs font-bold uppercase tracking-widest italic"
                        >
                            <X size={16} />
                            <span>Cancel</span>
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white border-none rounded-xl px-4 py-2 flex items-center space-x-2 transition-all text-xs font-bold uppercase tracking-widest italic shadow-lg shadow-purple-500/20"
                        >
                            <Save size={16} />
                            <span>{loading ? 'Saving...' : 'Save'}</span>
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left side: Profile Info */}
                <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] h-fit">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-24 h-24 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                            <User size={48} />
                        </div>
                        <div className="space-y-2">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="text-xl font-black text-[#7c32ff] text-center border-b border-purple-200 outline-none italic w-full"
                                />
                            ) : (
                                <h2 className="text-xl font-black text-slate-800 italic uppercase">{user?.name}</h2>
                            )}
                            <p className="text-[10px] font-black text-[#7c32ff] uppercase tracking-[0.2em] italic px-4 py-1 bg-purple-50 rounded-full border border-purple-100 inline-block">
                                Role: {user?.role}
                            </p>
                        </div>

                        <div className="w-full pt-6 space-y-4 border-t border-slate-50 text-left">
                            <div className="flex items-center space-x-3 italic">
                                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                    <Mail size={16} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Email Address</p>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="text-xs font-bold text-[#7c32ff] bg-transparent border-none outline-none italic w-full"
                                        />
                                    ) : (
                                        <p className="text-xs font-bold text-slate-700 italic">{user?.email}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Right side: Children List */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] min-h-[400px]">
                        <div className="flex items-center justify-between mb-8 italic">
                            <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2 text-left">
                                <Users size={16} />
                                <span>My Children</span>
                            </h3>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                                Total: {children.length}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 italic">
                            {fetchingChildren ? (
                                <div className="col-span-full py-10 text-center text-slate-300 font-black uppercase tracking-widest italic">
                                    Fetching children data...
                                </div>
                            ) : children.length > 0 ? (
                                children.map((child) => (
                                    <div key={child._id} className="p-6 bg-slate-50 rounded-[28px] border border-slate-100 group hover:shadow-xl hover:shadow-slate-200/50 transition-all text-left italic">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#7c32ff] border border-slate-100 group-hover:scale-110 transition-transform">
                                                <GraduationCap size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-slate-800 uppercase italic leading-tight">
                                                    {child.firstName} {child.lastName}
                                                </h4>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                                                    Adm: {child.admissionNumber}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2 border-t border-slate-100 pt-4 italic">
                                            <div className="flex justify-between items-center text-[10px] font-bold">
                                                <span className="text-slate-400 uppercase italic">Class</span>
                                                <span className="text-slate-700 italic">{child.class?.name || '---'}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px] font-bold italic">
                                                <span className="text-slate-400 uppercase italic">Roll No</span>
                                                <span className="text-slate-700 italic">{child.roll || '---'}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px] font-bold italic">
                                                <span className="text-slate-400 uppercase italic">Section</span>
                                                <span className="text-slate-700 italic">{child.section || '---'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-10 flex flex-col items-center justify-center space-y-4 italic">
                                    <Users size={48} className="text-slate-100" />
                                    <p className="text-xs font-black text-slate-300 uppercase tracking-widest italic">No children found linked to your email</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ParentProfile;
