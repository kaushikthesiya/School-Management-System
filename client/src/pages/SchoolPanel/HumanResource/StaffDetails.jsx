import React, { useState, useEffect } from 'react';
import { Card, Button } from '../../../components/SnowUI';
import {
    User,
    CreditCard,
    Clock,
    FileText,
    History,
    QrCode,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Briefcase,
    Shield,
    Edit2,
    UploadCloud,
    Plus,
    Save,
    X
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const StaffDetails = () => {
    const navigate = useNavigate();
    const { id, school_slug } = useParams();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState('PROFILE');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [staff, setStaff] = useState({
        name: '',
        role: '',
        designation: '',
        department: '',
        epfNo: '',
        basicSalary: '',
        contractType: '',
        dateOfJoining: '',
        email: '',
        phone: '',
        emergencyContact: '',
        currentAddress: '',
        permanentAddress: '',
        qualifications: '',
        experience: '',
    });

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const endpoint = id ? `/api/staff/${id}` : '/api/staff/me';
                const { data } = await api.get(endpoint);
                setStaff(data);
            } catch (error) {
                console.error('Error fetching staff:', error);
                if (id) showToast('Failed to load staff details', 'error');
            }
        };
        fetchStaff();
    }, [id]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const endpoint = id ? `/api/staff/${id}` : '/api/staff/me';
            await api.put(endpoint, staff);
            showToast('Staff details updated successfully', 'success');
            setIsEditing(false);
        } catch (error) {
            console.error('Update staff error:', error);
            showToast('Failed to update staff details', 'error');
        } finally {
            setLoading(false);
        }
    };


    const tabs = [
        { id: 'PROFILE', label: 'PROFILE', icon: <User size={16} /> },
        { id: 'PAYROLL', label: 'PAYROLL', icon: <CreditCard size={16} /> },
        { id: 'LEAVE', label: 'LEAVE', icon: <Clock size={16} /> },
        { id: 'DOCUMENTS', label: 'DOCUMENTS', icon: <FileText size={16} /> },
        { id: 'TIMELINE', label: 'TIMELINE', icon: <History size={16} /> },
    ];

    const EditInput = ({ label, value, name, type = "text" }) => (
        <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{label}</label>
            <input
                type={type}
                value={value || ''}
                onChange={(e) => setStaff({ ...staff, [name]: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[11px] font-bold text-slate-700 outline-none focus:border-[#7c32ff] transition-all italic"
            />
        </div>
    );

    const InfoRow = ({ label, value, name }) => (
        <div className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0 italic">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic shrink-0">{label}</span>
            {isEditing ? (
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => setStaff({ ...staff, [name]: e.target.value })}
                    className="ml-4 text-right bg-slate-50 border-none rounded-lg px-2 py-1 text-[11px] font-black text-[#7c32ff] focus:ring-1 ring-purple-200 outline-none w-1/2 italic"
                />
            ) : (
                <span className="text-[11px] font-black text-slate-700 italic ml-4 text-right truncate">{value || '---'}</span>
            )}
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Human Resource</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-[#7c32ff] cursor-pointer">Human Resource</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Staff Details</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Sidebar - Profile Card */}
                <div className="lg:col-span-3 space-y-6">
                    <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative font-sans">
                        {/* Purple Banner */}
                        <div className="h-24 bg-[#7c32ff] w-full" />

                        <div className="px-6 pb-10 -mt-12 text-center relative z-10">
                            {/* Profile Image Wrapper */}
                            <div className="inline-block relative">
                                <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-xl">
                                    <div className="w-full h-full rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
                                        <User size={40} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-6 text-left font-sans">
                                <div className="space-y-1 pb-4 border-b border-slate-100">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Staff Details</h3>
                                </div>

                                <div className="space-y-1">
                                    <InfoRow label="Staff Name" value={staff.name} name="name" />
                                    <InfoRow label="Role" value={staff.role} name="role" />
                                    <InfoRow label="Designation" value={staff.designation} name="designation" />
                                    <InfoRow label="Department" value={staff.department} name="department" />
                                    <InfoRow label="EPF NO" value={staff.epfNo} name="epfNo" />
                                    <InfoRow label="Basic Salary" value={staff.basicSalary} name="basicSalary" />
                                    <InfoRow label="Contract Type" value={staff.contractType} name="contractType" />
                                    <InfoRow label="Date of Joining" value={staff.dateOfJoining} name="dateOfJoining" />
                                </div>

                                <div className="pt-6 flex flex-col items-center space-y-4">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">QR Code</span>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <QrCode size={80} className="text-slate-800" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Content Area - Tabs */}
                <div className="lg:col-span-9 space-y-6 font-sans">
                    <div className="flex justify-between items-center bg-white p-2 rounded-2xl shadow-sm border border-slate-100 font-sans">
                        <div className="flex items-center space-x-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all flex items-center space-x-2 ${activeTab === tab.id
                                        ? 'bg-white text-[#7c32ff] shadow-lg shadow-purple-500/10 border border-slate-100'
                                        : 'text-slate-400 hover:text-[#7c32ff] hover:bg-slate-50'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {!isEditing ? (
                            <Button
                                onClick={() => setIsEditing(true)}
                                className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center space-x-2 italic"
                            >
                                <Edit2 size={14} strokeWidth={3} />
                                <span>EDIT</span>
                            </Button>
                        ) : (
                            <div className="flex space-x-2">
                                <Button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-red-50 hover:bg-red-100 text-red-500 rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all flex items-center space-x-2 italic"
                                >
                                    <X size={14} />
                                    <span>Cancel</span>
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center space-x-2 italic"
                                >
                                    <Save size={14} />
                                    <span>{loading ? 'SAVING...' : 'SAVE'}</span>
                                </Button>
                            </div>
                        )}
                    </div>

                    <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative min-h-[600px] font-sans">
                        {activeTab === 'PROFILE' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12 font-sans">
                                {/* Basic Info */}
                                <div className="space-y-8 italic">
                                    <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2">
                                        <User size={16} />
                                        <span>PERSONAL INFO</span>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {isEditing ? (
                                            <>
                                                <EditInput label="Email Address" value={staff.email} name="email" type="email" />
                                                <EditInput label="Phone Number" value={staff.phone} name="phone" />
                                                <EditInput label="Emergency Contact" value={staff.emergencyContact} name="emergencyContact" />
                                            </>
                                        ) : (
                                            <>
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Email Address</label>
                                                    <p className="text-[11px] font-bold text-slate-600 italic break-all">{staff.email}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Phone Number</label>
                                                    <p className="text-[11px] font-bold text-slate-600 italic">{staff.phone || '---'}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Emergency Contact</label>
                                                    <p className="text-[11px] font-bold text-slate-600 italic">{staff.emergencyContact || '---'}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="space-y-8 italic">
                                    <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2">
                                        <MapPin size={16} />
                                        <span>ADDRESS DETAILS</span>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        {isEditing ? (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Current Address</label>
                                                    <textarea
                                                        value={staff.currentAddress}
                                                        onChange={(e) => setStaff({ ...staff, currentAddress: e.target.value })}
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[11px] font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all italic min-h-[100px]"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Permanent Address</label>
                                                    <textarea
                                                        value={staff.permanentAddress}
                                                        onChange={(e) => setStaff({ ...staff, permanentAddress: e.target.value })}
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[11px] font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all italic min-h-[100px]"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Current Address</label>
                                                    <p className="text-[11px] font-bold text-slate-600 italic leading-relaxed">{staff.currentAddress || 'No address provided'}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Permanent Address</label>
                                                    <p className="text-[11px] font-bold text-slate-600 italic leading-relaxed">{staff.permanentAddress || 'No address provided'}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Experience & Bio */}
                                <div className="space-y-8 italic">
                                    <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2">
                                        <Briefcase size={16} />
                                        <span>Bio & Experience</span>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        {isEditing ? (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Qualifications</label>
                                                    <textarea
                                                        value={staff.qualifications}
                                                        onChange={(e) => setStaff({ ...staff, qualifications: e.target.value })}
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[11px] font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all italic min-h-[100px]"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Experience</label>
                                                    <textarea
                                                        value={staff.experience}
                                                        onChange={(e) => setStaff({ ...staff, experience: e.target.value })}
                                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[11px] font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all italic min-h-[100px]"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Qualifications</label>
                                                    <p className="text-[11px] font-bold text-slate-600 italic leading-relaxed">{staff.qualifications || 'No qualifications listed'}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Experience</label>
                                                    <p className="text-[11px] font-bold text-slate-600 italic leading-relaxed">{staff.experience || 'No experience listed'}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'PAYROLL' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 font-sans italic">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2">
                                        <CreditCard size={16} />
                                        <span>PAYSLIP RECORDS</span>
                                    </h3>
                                </div>
                                <div className="overflow-x-auto shadow-sm border border-slate-50 rounded-2xl">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-100 italic">
                                                <th className="text-left py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">ID</th>
                                                <th className="text-left py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">MONTH - YEAR</th>
                                                <th className="text-left py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">DATE</th>
                                                <th className="text-left py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">MODE OF PAYMENT</th>
                                                <th className="text-left py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">NET SALARY(S)</th>
                                                <th className="text-left py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">STATUS</th>
                                                <th className="text-right py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-slate-50 last:border-0 italic">
                                                <td colSpan="7" className="py-20 text-center">
                                                    <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">No payroll data</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'LEAVE' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 font-sans italic">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2">
                                        <Clock size={16} />
                                        <span>LEAVE RECORDS</span>
                                    </h3>
                                </div>
                                <div className="overflow-x-auto shadow-sm border border-slate-50 rounded-2xl">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-100 italic">
                                                <th className="text-left py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">LEAVE TYPE</th>
                                                <th className="text-left py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">LEAVE FROM</th>
                                                <th className="text-left py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">LEAVE TO</th>
                                                <th className="text-left py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">APPLY DATE</th>
                                                <th className="text-left py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">STATUS</th>
                                                <th className="text-right py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-slate-50 last:border-0 italic">
                                                <td colSpan="6" className="py-20 text-center">
                                                    <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">No leave data</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'DOCUMENTS' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 font-sans italic">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2">
                                        <FileText size={16} />
                                        <span>DOCUMENTS</span>
                                    </h3>
                                    <Button className="bg-[#7c32ff]/10 hover:bg-[#7c32ff]/20 text-[#7c32ff] rounded-xl px-6 py-2 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all italic">
                                        <UploadCloud size={14} />
                                        <span>UPLOAD DOCUMENT</span>
                                    </Button>
                                </div>
                                <div className="overflow-x-auto shadow-sm border border-slate-50 rounded-2xl">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-100 italic">
                                                <th className="text-left py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">DOCUMENT TITLE</th>
                                                <th className="text-right py-5 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-slate-50 last:border-0 italic">
                                                <td colSpan="2" className="py-20 text-center">
                                                    <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">No documents found</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'TIMELINE' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 font-sans italic">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2">
                                        <History size={16} />
                                        <span>TIMELINE</span>
                                    </h3>
                                    <Button className="bg-[#7c32ff]/10 hover:bg-[#7c32ff]/20 text-[#7c32ff] rounded-xl px-6 py-2 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all italic">
                                        <Plus size={14} />
                                        <span>ADD TIMELINE</span>
                                    </Button>
                                </div>
                                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 italic">
                                    <History size={40} className="text-slate-100" />
                                    <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">No timeline entries yet</p>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StaffDetails;
