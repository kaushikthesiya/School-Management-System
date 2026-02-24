import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/SnowUI';
import { Layout, Save, Loader2, RotateCcw } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const DEFAULT_SETTINGS = {
    'Staff No': { edit: false, required: true },
    'Role': { edit: false, required: true },
    'Department': { edit: false, required: true },
    'Designation': { edit: false, required: false },
    'First Name': { edit: true, required: true },
    'Last Name': { edit: true, required: false },
    'Fathers Name': { edit: true, required: false },
    'Mother Name': { edit: true, required: false },
    'Email': { edit: false, required: true },
    'Gender': { edit: true, required: false },
    'Date Of Birth': { edit: true, required: false },
    'Date of Joining': { edit: false, required: false },
    'Mobile': { edit: true, required: false },
    'Marital Status': { edit: false, required: false },
    'Emergency Mobile': { edit: false, required: false },
    'Driving License': { edit: false, required: false },
    'Current Address': { edit: true, required: false },
    'Permanent Address': { edit: true, required: false },
    'Qualification': { edit: false, required: false },
    'Experience': { edit: false, required: false },
    'EPF NO': { edit: false, required: false },
    'Basic Salary': { edit: false, required: false },
    'Contract Type': { edit: false, required: false },
    'Location': { edit: false, required: false },
    'Bank Account Name': { edit: false, required: false },
    'Bank Account No': { edit: false, required: false },
    'Bank Name': { edit: false, required: false },
    'Bank Branch': { edit: false, required: false },
    'Facebook': { edit: true, required: false },
    'Twitter': { edit: true, required: false },
    'Linkedin': { edit: true, required: false },
    'Instagram': { edit: true, required: false },
    'Staff Photo': { edit: true, required: false },
    'Resume': { edit: false, required: false },
    'Joining Letter': { edit: false, required: false },
    'Other Document': { edit: false, required: false },
};

const StaffSettings = () => {
    const navigate = useNavigate();
    const { school_slug } = useParams();
    const { showToast } = useToast();

    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Teacher View settings
    const [teacherView, setTeacherView] = useState({
        'Email': true, 'Phone': true, 'Address': false,
        'Date of Birth': false, 'Salary': false, 'Bank Details': false
    });

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/api/staff-settings');
                if (data.settings) setSettings(data.settings);
            } catch (error) {
                console.error('Error fetching staff settings:', error);
                // Use defaults silently
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const toggleField = (field, type) => {
        setSettings(prev => ({
            ...prev,
            [field]: { ...prev[field], [type]: !prev[field][type] }
        }));
        setHasChanges(true);
    };

    const toggleTeacherView = (field) => {
        setTeacherView(prev => ({ ...prev, [field]: !prev[field] }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.post('/api/staff-settings', { settings });
            showToast('Settings saved successfully!');
            setHasChanges(false);
        } catch (error) {
            console.error('Save settings error:', error);
            showToast('Failed to save settings', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        setSettings(DEFAULT_SETTINGS);
        setHasChanges(true);
    };

    const fields = Object.keys(settings);
    const midPoint = Math.ceil(fields.length / 2);
    const leftColumn = fields.slice(0, midPoint);
    const rightColumn = fields.slice(midPoint);

    const Toggle = ({ active, onClick }) => (
        <button
            onClick={onClick}
            className={`w-9 h-5 rounded-full relative transition-all duration-200 focus:outline-none ${active ? 'bg-[#7c32ff]' : 'bg-slate-200 hover:bg-slate-300'}`}
            title={active ? 'Click to disable' : 'Click to enable'}
        >
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${active ? 'right-0.5' : 'left-0.5'}`} />
        </button>
    );

    const SettingsTable = ({ columnFields }) => (
        <table className="w-full">
            <thead>
                <tr className="border-b border-slate-100">
                    <th className="text-left py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest w-1/2">REGISTRATION FIELD</th>
                    <th className="text-center py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">STAFF EDIT</th>
                    <th className="text-center py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">REQUIRED</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {columnFields.map((field) => (
                    <tr key={field} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 text-[11px] font-medium text-slate-600">{field}</td>
                        <td className="py-3 px-4">
                            <div className="flex justify-center">
                                <Toggle
                                    active={settings[field]?.edit}
                                    onClick={() => toggleField(field, 'edit')}
                                />
                            </div>
                        </td>
                        <td className="py-3">
                            <div className="flex justify-center">
                                <Toggle
                                    active={settings[field]?.required}
                                    onClick={() => toggleField(field, 'required')}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="w-8 h-8 text-[#7c32ff] animate-spin mb-4" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500 pb-24 text-slate-800 space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Staff Settings</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span className="cursor-pointer hover:text-[#7c32ff]" onClick={() => navigate(`/${school_slug}`)}>Dashboard</span>
                        <span>|</span><span>Human Resource</span>
                        <span>|</span><span className="text-[#1C1C1C]">Staff Settings</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleReset}
                        className="flex items-center space-x-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 text-slate-500 hover:border-slate-400 transition-all active:scale-95"
                    >
                        <RotateCcw size={13} /><span>Reset Defaults</span>
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || !hasChanges}
                        className={`flex items-center space-x-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg
                            ${hasChanges ? 'bg-[#7c32ff] text-white hover:bg-[#6b25ea] shadow-purple-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}`}
                    >
                        {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                        <span>{saving ? 'Saving...' : 'Save Settings'}</span>
                    </button>
                </div>
            </div>

            {/* Change indicator */}
            {hasChanges && (
                <div className="flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-2xl">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Unsaved changes — click Save Settings to apply</p>
                </div>
            )}

            {/* Staff Information Field Section */}
            <Card className="p-0 border-none shadow-sm bg-white rounded-3xl overflow-hidden">
                <div className="p-5 border-b border-slate-50 flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest italic">Staff Information Fields</h3>
                    <div className="flex items-center space-x-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#7c32ff]" />
                            <span>Active</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-slate-200" />
                            <span>Inactive</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 px-8 pb-8">
                    <div className="overflow-x-auto">
                        <SettingsTable columnFields={leftColumn} />
                    </div>
                    <div className="overflow-x-auto border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-12">
                        <SettingsTable columnFields={rightColumn} />
                    </div>
                </div>
            </Card>

            {/* Teacher Information View Section */}
            <Card className="p-0 border-none shadow-sm bg-white rounded-3xl overflow-hidden">
                <div className="p-5 border-b border-slate-50">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest italic">Teacher Information View</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Control what teachers can view about staff members</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 px-8 pb-8">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="text-left py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest w-2/3">FIELD</th>
                                <th className="text-center py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">VIEW</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {Object.entries(teacherView).map(([field, active]) => (
                                <tr key={field} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-3 text-[11px] font-medium text-slate-600">{field}</td>
                                    <td className="py-3 flex justify-center items-center">
                                        <Toggle active={active} onClick={() => toggleTeacherView(field)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Sticky Save Bar */}
            {hasChanges && (
                <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-100 px-8 py-4 flex items-center justify-end space-x-3 z-40 shadow-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-4">You have unsaved changes</p>
                    <button onClick={handleReset} className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 text-slate-500 hover:border-slate-400 transition-all active:scale-95">
                        Discard
                    </button>
                    <button onClick={handleSave} disabled={saving}
                        className="flex items-center space-x-2 px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-[#7c32ff] text-white hover:bg-[#6b25ea] transition-all active:scale-95 shadow-lg shadow-purple-200">
                        {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                        <span>{saving ? 'Saving...' : 'Save Settings'}</span>
                    </button>
                </div>
            )}

            {/* Float Icon */}
            <div className="fixed bottom-12 right-12 w-10 h-10 bg-[#7c32ff] rounded shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-110 active:scale-95 transition-all z-30">
                <Layout size={18} />
            </div>
        </div>
    );
};

export default StaffSettings;
