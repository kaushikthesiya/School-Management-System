import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Button, Input, Card } from '../../components/SnowUI';
import { Shield, ArrowLeft } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const CreateSchoolAdmin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { schoolId, name, email } = location.state || {};

    const [adminName, setAdminName] = useState(name ? `${name} Admin` : '');
    const [adminEmail] = useState(email || '');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!schoolId) {
            showToast('No school selected. Please go to the Schools page.', 'error');
            return;
        }

        setLoading(true);
        try {
            await api.post(`/api/superadmin/schools/${schoolId}/create-admin`, {
                name: adminName,
                password
            });
            showToast('School Admin created successfully!');
            navigate('/superadmin/schools');
        } catch (error) {
            showToast(error.response?.data?.message || 'Error creating admin', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => navigate('/superadmin/schools')}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <ArrowLeft size={20} className="text-slate-500" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-primary">Create School Admin</h1>
                    <p className="text-slate-500 text-sm">Provision a new administrator account for a school.</p>
                </div>
            </div>

            <Card className="p-8">
                <div className="flex items-center space-x-3 mb-8 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <div className="p-2 bg-indigo-500 rounded-xl text-white">
                        <Shield size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Target School</p>
                        <p className="text-indigo-900 font-bold">{name || 'No school selected'}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="Admin Name"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        placeholder="Enter admin name"
                        required
                    />
                    <div className="relative">
                        <Input
                            label="Login Email (Strictly tied to contact)"
                            type="email"
                            value={adminEmail}
                            disabled
                            className="bg-slate-50 cursor-not-allowed opacity-80"
                        />
                        <p className="text-[10px] text-slate-400 mt-1.5 ml-1">
                            The login email is automatically set to the school's contact email.
                        </p>
                    </div>
                    <Input
                        label="Create Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter secure password"
                        required
                    />

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full h-12 text-sm font-bold tracking-tight"
                            disabled={loading || !schoolId}
                        >
                            {loading ? 'Creating Account...' : 'Create Admin Account'}
                        </Button>
                    </div>
                </form>
            </Card>

            {!schoolId && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-800 text-sm">
                    <p className="font-bold mb-1">⚠️ Orientation Required</p>
                    <p>To create an admin, please visit the <strong>Schools</strong> list and select <strong>Create School Admin</strong> from the action menu of the desired school. This ensures the correct school record is linked.</p>
                </div>
            )}
        </div>
    );
};

export default CreateSchoolAdmin;
