import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Input, Card } from '../../components/SnowUI';
import { Shield, Plus, Save } from 'lucide-react';

const RoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [permissions, setPermissions] = useState([]);

    const modules = [
        'Students', 'Attendance', 'Fees', 'Exams', 'Academic', 'Staff', 'Payroll', 'Inventory'
    ];

    const actions = ['read', 'write', 'delete'];

    const fetchRoles = async () => {
        try {
            const { data } = await api.get('/api/school/rbac/roles');
            setRoles(data);
        } catch (error) {
            console.error('Error fetching roles');
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handlePermissionToggle = (mod, action) => {
        setPermissions(prev => {
            const modPerm = prev.find(p => p.module === mod);
            if (modPerm) {
                const newActions = modPerm.actions.includes(action)
                    ? modPerm.actions.filter(a => a !== action)
                    : [...modPerm.actions, action];

                return prev.map(p => p.module === mod ? { ...p, actions: newActions } : p);
            } else {
                return [...prev, { module: mod, actions: [action] }];
            }
        });
    };

    const handleSavePermissions = async () => {
        if (!selectedRole) return;
        try {
            await api.post('/api/school/rbac/roles', {
                name: selectedRole.name,
                permissions
            });
            alert('Permissions saved!');
            fetchRoles();
        } catch (error) {
            alert('Error saving permissions');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-primary">Role-Based Permissions</h1>
                <p className="text-slate-500">Define what each staff member can see and do.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="md:col-span-1 p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Roles</h3>
                    {['Accountant', 'Teacher', 'Frontdesk', 'Principle'].map(roleName => {
                        const existingRole = roles.find(r => r.name === roleName);
                        return (
                            <button
                                key={roleName}
                                onClick={() => {
                                    setSelectedRole({ name: roleName });
                                    setPermissions(existingRole?.permissions || []);
                                }}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${selectedRole?.name === roleName
                                        ? 'bg-primary text-white shadow-lg shadow-slate-200'
                                        : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                <span>{roleName}</span>
                                <Shield size={16} className={selectedRole?.name === roleName ? 'text-white' : 'text-slate-400'} />
                            </button>
                        );
                    })}
                </Card>

                <Card className="md:col-span-3">
                    {selectedRole ? (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                <h2 className="text-xl font-bold text-primary">Permissions for {selectedRole.name}</h2>
                                <Button onClick={handleSavePermissions}>
                                    <Save size={18} />
                                    <span>Save Changes</span>
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {modules.map(mod => (
                                    <div key={mod} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                                        <div className="font-medium text-slate-700">{mod}</div>
                                        <div className="flex space-x-4">
                                            {actions.map(action => {
                                                const isChecked = permissions.find(p => p.module === mod)?.actions.includes(action);
                                                return (
                                                    <label key={action} className="flex items-center space-x-2 cursor-pointer group">
                                                        <div
                                                            onClick={() => handlePermissionToggle(mod, action)}
                                                            className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${isChecked
                                                                    ? 'bg-primary border-primary'
                                                                    : 'border-slate-300 group-hover:border-primary'
                                                                }`}
                                                        >
                                                            {isChecked && <Check size={12} className="text-white" />}
                                                        </div>
                                                        <span className="text-xs capitalize text-slate-500">{action}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-slate-400 space-y-4">
                            <Shield size={48} className="text-slate-200" />
                            <p>Select a role from the left to manage permissions</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

import { Check } from 'lucide-react';

export default RoleManagement;
