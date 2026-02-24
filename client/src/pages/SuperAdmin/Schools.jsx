import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Input, Card } from '../../components/SnowUI';
import { Plus, Search, MoreVertical, Shield, Power, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

const Schools = () => {
    const [schools, setSchools] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [newSchool, setNewSchool] = useState({
        name: '',
        slug: '',
        contactEmail: ''
    });

    const fetchSchools = async () => {
        try {
            const { data } = await api.get('/api/superadmin/schools');
            setSchools(data);
        } catch (error) {
            console.error('Error fetching schools');
        }
    };

    useEffect(() => {
        fetchSchools();
    }, []);

    const handleAddSchool = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/superadmin/schools', newSchool);
            setShowAddModal(false);
            fetchSchools();
            showToast('School registered successfully!');
        } catch (error) {
            showToast('Error creating school', 'error');
        }
    };

    const handleToggleStatus = async (school) => {
        try {
            await api.patch(`/api/superadmin/schools/${school._id}`, { isActive: !school.isActive });
            fetchSchools();
            showToast(`School ${school.isActive ? 'disabled' : 'enabled'} successfully!`);
        } catch (error) {
            showToast('Error updating status', 'error');
        }
    };

    const handleOfflineActivate = async (school) => {
        try {
            await api.patch(`/api/superadmin/schools/${school._id}`, {
                subscriptionStatus: 'active',
                offlineActivation: true,
                planExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
            });
            fetchSchools();
            setActiveMenu(null);
            showToast('School activated offline successfully!');
        } catch (error) {
            showToast('Error activating school', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Schools</h1>
                    <p className="text-slate-500">Manage all registered schools and their subscriptions.</p>
                </div>
                <Button onClick={() => setShowAddModal(true)}>
                    <Plus size={20} />
                    <span>Add New School</span>
                </Button>
            </div>

            <Card className="p-0 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search schools..."
                            className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
                        />
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-600 text-sm font-medium">
                        <tr>
                            <th className="px-6 py-4">School Name</th>
                            <th className="px-6 py-4">Slug</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Plan</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {schools.map((school) => (
                            <tr key={school._id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-primary">{school.name}</div>
                                    <div className="text-xs text-slate-400">{school.contactEmail}</div>
                                </td>
                                <td className="px-6 py-4 text-slate-600 font-mono text-sm">{school.slug}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${school.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {school.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 capitalize text-slate-600 font-medium">
                                    {school.subscriptionPlan}
                                    {school.offlineActivation && <span className="ml-1 text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400">OFFLINE</span>}
                                </td>
                                <td className="px-6 py-4 relative">
                                    <button
                                        onClick={() => setActiveMenu(activeMenu === school._id ? null : school._id)}
                                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-primary"
                                    >
                                        <MoreVertical size={18} />
                                    </button>

                                    {activeMenu === school._id && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setActiveMenu(null)}
                                            ></div>
                                            <div className="absolute right-12 top-0 mt-2 w-56 bg-white rounded-2xl shadow-snow-lg border border-snow-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                                                <button
                                                    onClick={() => {
                                                        navigate('/superadmin/create-school-admin', {
                                                            state: {
                                                                schoolId: school._id,
                                                                name: school.name,
                                                                email: school.contactEmail
                                                            }
                                                        });
                                                        setActiveMenu(null);
                                                    }}
                                                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors group"
                                                >
                                                    <Shield size={16} className="text-slate-400 group-hover:text-primary" />
                                                    <span className="font-medium">Create School Admin</span>
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        handleToggleStatus(school);
                                                        setActiveMenu(null);
                                                    }}
                                                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors group"
                                                >
                                                    <Power size={16} className={`text-slate-400 group-hover:${school.isActive ? 'text-orange-500' : 'text-green-500'}`} />
                                                    <span className="font-medium">{school.isActive ? 'Disable School' : 'Enable School'}</span>
                                                </button>

                                                {school.subscriptionStatus !== 'active' && (
                                                    <button
                                                        onClick={() => handleOfflineActivate(school)}
                                                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors group"
                                                    >
                                                        <CheckCircle size={16} className="text-slate-400 group-hover:text-blue-500" />
                                                        <span className="font-medium">Activate Offline</span>
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {schools.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                                    No schools found. Add a new school to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>

            {/* Basic Modal Implementation */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <Card className="w-full max-w-lg animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-bold mb-4">Register New School</h2>
                        <form onSubmit={handleAddSchool} className="space-y-4">
                            <Input
                                label="School Name"
                                value={newSchool.name}
                                onChange={e => setNewSchool({ ...newSchool, name: e.target.value })}
                                required
                            />
                            <Input
                                label="URL Slug (e.g. greenwood-high)"
                                value={newSchool.slug}
                                onChange={e => setNewSchool({ ...newSchool, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                                required
                            />
                            <Input
                                label="Contact Email"
                                type="email"
                                value={newSchool.contactEmail}
                                onChange={e => setNewSchool({ ...newSchool, contactEmail: e.target.value })}
                                required
                            />
                            <div className="flex space-x-3 pt-4">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>Cancel</Button>
                                <Button type="submit" className="flex-1">Create School</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}

        </div>
    );
};

export default Schools;
