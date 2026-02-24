import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Card, Button, Modal, Input, Select } from '../../components/SnowUI';
import { Search, Plus, Trash2, Printer, Copy, FileText, LayoutGrid, Upload, Check, Camera, Image as ImageIcon, PenLine, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const IDCard = () => {
    const { showToast } = useToast();
    const [idCards, setIdCards] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDesignerOpen, setIsDesignerOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const [designData, setDesignData] = useState({
        title: '',
        adminLayout: 'Horizontal',
        applicability: 'Student',
        roles: [],
        pageLayoutWidth: '87',
        pageLayoutHeight: '55',
        userPhotoStyle: 'Square',
        userPhotoSizeWidth: '21',
        userPhotoSizeHeight: '21',
        layoutSpacingTop: '28',
        layoutSpacingBottom: '2.5',
        layoutSpacingLeft: '3',
        layoutSpacingRight: '3',

        // Visibility Toggles
        showAdmissionNo: true,
        showID: true,
        showName: true,
        showClass: true,
        showAddress: true,
        showPhone: true,
        showPhoto: true,
        showDepartment: true,
        showDesignation: true,
        showBloodGroup: true,
        showFatherName: true,
        showMotherName: true,
        showDob: true,
        showRollNo: true,
        showSignature: true
    });

    const [files, setFiles] = useState({
        schoolLogo: null,
        backgroundImage: null,
        signature: null
    });

    const fetchIDCards = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin-section/id-cards');
            setIdCards(data);
        } catch (error) {
            console.error('Fetch ID Card Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const { data } = await api.get('/api/school/rbac/roles');
            setRoles(data);
        } catch (error) {
            console.error('Fetch Roles Error:', error);
        }
    };

    useEffect(() => {
        fetchIDCards();
        fetchRoles();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this template?')) return;
        try {
            await api.delete(`/api/admin-section/id-cards/${id}`);
            showToast('ID Card deleted successfully!');
            fetchIDCards();
        } catch (error) {
            showToast('Error deleting ID Card', 'error');
        }
    };

    const handleFileChange = (e, type) => {
        setFiles(prev => ({ ...prev, [type]: e.target.files[0] }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData();
            Object.keys(designData).forEach(key => {
                if (Array.isArray(designData[key])) {
                    designData[key].forEach(val => formData.append(`${key}[]`, val));
                } else {
                    formData.append(key, designData[key]);
                }
            });
            if (files.schoolLogo) formData.append('schoolLogo', files.schoolLogo);
            if (files.backgroundImage) formData.append('backgroundImage', files.backgroundImage);
            if (files.signature) formData.append('signature', files.signature);

            await api.post('/api/admin-section/id-cards', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            showToast('ID Card Template created successfully!');
            setIsDesignerOpen(false);
            fetchIDCards();
            resetForm();
        } catch (error) {
            showToast('Error saving ID Card template', 'error');
        } finally {
            setSaving(false);
        }
    };

    const resetForm = () => {
        setDesignData({
            title: '',
            adminLayout: 'Horizontal',
            applicability: 'Student',
            roles: [],
            pageLayoutWidth: '87',
            pageLayoutHeight: '55',
            userPhotoStyle: 'Square',
            userPhotoSizeWidth: '21',
            userPhotoSizeHeight: '21',
            layoutSpacingTop: '28',
            layoutSpacingBottom: '2.5',
            layoutSpacingLeft: '3',
            layoutSpacingRight: '3',
            showAdmissionNo: true,
            showID: true,
            showName: true,
            showClass: true,
            showAddress: true,
            showPhone: true,
            showPhoto: true,
            showDepartment: true,
            showDesignation: true,
            showBloodGroup: true,
            showFatherName: true,
            showMotherName: true,
            showDob: true,
            showRollNo: true,
            showSignature: true
        });
        setFiles({ schoolLogo: null, backgroundImage: null, signature: null });
    };

    const visibilityFields = {
        Student: [
            { label: 'Admission No', field: 'showAdmissionNo' },
            { label: 'Name', field: 'showName' },
            { label: 'Class', field: 'showClass' },
            { label: 'Address', field: 'showAddress' },
            { label: 'Photo', field: 'showPhoto' },
            { label: 'Signature', field: 'showSignature' }
        ],
        Staff: [
            { label: 'ID', field: 'showID' },
            { label: 'Name', field: 'showName' },
            { label: 'Class', field: 'showClass' },
            { label: 'Address', field: 'showAddress' },
            { label: 'Photo', field: 'showPhoto' },
            { label: 'Department', field: 'showDepartment' },
            { label: 'Designation', field: 'showDesignation' },
            { label: 'Signature', field: 'showSignature' }
        ],
        Guardian: [
            { label: 'Name', field: 'showName' },
            { label: 'Address', field: 'showAddress' },
            { label: 'Phone', field: 'showPhone' },
            { label: 'Photo', field: 'showPhoto' },
            { label: 'Signature', field: 'showSignature' }
        ]
    };

    const FileUpload = ({ label, type, icon: Icon, required }) => (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">{label} {required && '*'}</label>
            <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-4 py-3 group hover:border-primary/50 transition-all shadow-sm">
                <input
                    type="text"
                    readOnly
                    placeholder={label.toLowerCase()}
                    className="flex-1 bg-transparent text-xs font-bold text-slate-600 outline-none"
                    value={files[type]?.name || ''}
                />
                <div className="flex items-center space-x-2">
                    <button type="button" className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg active:scale-95 transition-all shadow-md shadow-primary/20">
                        Browser
                    </button>
                    {files[type] && (
                        <button type="button" onClick={() => setFiles({ ...files, [type]: null })} className="text-red-400 hover:text-red-500">
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
                <input
                    type="file"
                    onChange={e => handleFileChange(e, type)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                />
            </div>
        </div>
    );

    const RadioGroup = ({ label, options, value, onChange }) => (
        <div className="flex items-center space-x-8">
            {options.map(opt => (
                <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                    <div
                        onClick={() => onChange(opt)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${value === opt ? 'bg-primary border-primary shadow-lg shadow-primary/20 scale-110' : 'border-slate-200 group-hover:border-primary/50'}`}
                    >
                        {value === opt && <div className="w-2 h-2 rounded-full bg-white shadow-inner" />}
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-widest transition-all ${value === opt ? 'text-slate-700 underline decoration-primary/10 decoration-4' : 'text-slate-400 group-hover:text-slate-500'}`}>
                        {opt}
                    </span>
                </label>
            ))}
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Id Card</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Admin Section</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Id Card</span>
                    </div>
                </div>
                <Button
                    onClick={() => setIsDesignerOpen(true)}
                    className="bg-primary hover:bg-primary-hover rounded-xl flex items-center space-x-3 px-8 shadow-lg shadow-primary/20"
                >
                    <Plus size={18} strokeWidth={3} />
                    <span className="uppercase text-[11px] font-black italic tracking-widest">Add Id Card</span>
                </Button>
            </div>

            <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white">
                <div className="flex justify-between items-center mb-8 px-2">
                    <h2 className="text-lg font-bold text-[#3E4D67]">Id Card List</h2>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                            type="text"
                            placeholder="SEARCH"
                            className="bg-slate-50 border-none rounded-full py-2.5 px-12 text-[11px] font-black text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all outline-none w-64"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto rounded-[20px]">
                    <table className="w-full text-left">
                        <thead className="bg-[#F8FAFC] border-y border-slate-100 italic uppercase tracking-widest text-[11px] font-black text-slate-400">
                            <tr>
                                <th className="px-6 py-5">↓SL</th>
                                <th className="px-6 py-5">↓Title</th>
                                <th className="px-6 py-5">↓Applicability</th>
                                <th className="px-6 py-5 text-right">↓Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm font-bold">
                            {idCards.map((card, idx) => (
                                <tr key={card._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 text-slate-400 font-black">{idx + 1}</td>
                                    <td className="px-6 py-4 text-slate-700 italic uppercase underline decoration-primary/5 decoration-4 tracking-tighter">{card.title}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-100 text-slate-500 text-[10px] font-black uppercase px-3 py-1 rounded-full">{card.applicability}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(card._id)} className="p-2 text-slate-300 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal
                isOpen={isDesignerOpen}
                onClose={() => setIsDesignerOpen(false)}
                title="Add Id Card"
                maxWidth="4xl"
            >
                <form onSubmit={handleSave} className="space-y-8 pb-8 px-4">
                    <div className="grid grid-cols-1 gap-6">
                        <Input
                            label="Id Card Title *"
                            value={designData.title}
                            onChange={e => setDesignData({ ...designData, title: e.target.value })}
                            required
                        />

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Admin Layout</label>
                            <div className="relative group">
                                <select
                                    className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                                    value={designData.adminLayout}
                                    onChange={e => setDesignData({ ...designData, adminLayout: e.target.value })}
                                >
                                    <option>Horizontal</option>
                                    <option>Vertical</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
                            </div>
                        </div>

                        <FileUpload label="Background Image" type="backgroundImage" icon={ImageIcon} />

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Applicable User</label>
                            <div className="relative group">
                                <select
                                    className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none uppercase tracking-widest"
                                    value={designData.applicability}
                                    onChange={e => setDesignData({ ...designData, applicability: e.target.value })}
                                >
                                    <option value="Student">Student</option>
                                    <option value="Staff">Staff</option>
                                    <option value="Guardian">Guardian</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
                            </div>
                        </div>

                        {designData.applicability === 'Staff' && (
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Role *</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {roles.map(role => (
                                        <label key={role._id} className="flex items-center space-x-3 cursor-pointer group">
                                            <div
                                                onClick={() => {
                                                    const newRoles = designData.roles.includes(role.name)
                                                        ? designData.roles.filter(r => r !== role.name)
                                                        : [...designData.roles, role.name];
                                                    setDesignData({ ...designData, roles: newRoles });
                                                }}
                                                className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${designData.roles.includes(role.name) ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'border-slate-200 group-hover:border-primary/30'}`}
                                            >
                                                {designData.roles.includes(role.name) && <Check size={14} className="text-white" strokeWidth={4} />}
                                            </div>
                                            <span className={`text-[11px] font-black uppercase tracking-widest ${designData.roles.includes(role.name) ? 'text-primary' : 'text-slate-400'}`}>{role.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Input
                                label="Page Layout Width (Default 87 mm)"
                                value={designData.pageLayoutWidth}
                                onChange={e => setDesignData({ ...designData, pageLayoutWidth: e.target.value })}
                            />
                            <Input
                                label="Page Layout Height (Default 55 mm)"
                                value={designData.pageLayoutHeight}
                                onChange={e => setDesignData({ ...designData, pageLayoutHeight: e.target.value })}
                            />
                        </div>

                        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-center space-x-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                                <ImageIcon size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary italic">Note:</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-relaxed">Profile photo will be automatically fetched from student/staff records.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">User Photo Style</label>
                            <div className="relative group">
                                <select
                                    className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                                    value={designData.userPhotoStyle}
                                    onChange={e => setDesignData({ ...designData, userPhotoStyle: e.target.value })}
                                >
                                    <option>Square</option>
                                    <option>Rounded</option>
                                    <option>Circle</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Input
                                label="User Photo Size Width (Default 21 mm)"
                                value={designData.userPhotoSizeWidth}
                                onChange={e => setDesignData({ ...designData, userPhotoSizeWidth: e.target.value })}
                            />
                            <Input
                                label="User Photo Size Height (Default 21 mm)"
                                value={designData.userPhotoSizeHeight}
                                onChange={e => setDesignData({ ...designData, userPhotoSizeHeight: e.target.value })}
                            />
                        </div>

                        <div className="space-y-6 pt-4 border-t border-slate-50">
                            <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block italic">Layout Spacing</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input
                                    label="Top Space (Default 28 mm)"
                                    value={designData.layoutSpacingTop}
                                    onChange={e => setDesignData({ ...designData, layoutSpacingTop: e.target.value })}
                                />
                                <Input
                                    label="Bottom Space (Default 2.5 mm)"
                                    value={designData.layoutSpacingBottom}
                                    onChange={e => setDesignData({ ...designData, layoutSpacingBottom: e.target.value })}
                                />
                                <Input
                                    label="Left Space (Default 3 mm)"
                                    value={designData.layoutSpacingLeft}
                                    onChange={e => setDesignData({ ...designData, layoutSpacingLeft: e.target.value })}
                                />
                                <Input
                                    label="Right Space (Default 3 mm)"
                                    value={designData.layoutSpacingRight}
                                    onChange={e => setDesignData({ ...designData, layoutSpacingRight: e.target.value })}
                                />
                            </div>
                        </div>

                        <FileUpload label="Logo" type="schoolLogo" icon={ImageIcon} />
                        <FileUpload label="Signature *" type="signature" icon={PenLine} required />

                        <div className="space-y-8 pt-8 border-t border-slate-50">
                            <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block italic underline decoration-primary/10 decoration-8 underline-offset-8">Fields Visibility</label>
                            <div className="space-y-8">
                                {visibilityFields[designData.applicability].map(item => (
                                    <div key={item.field} className="flex items-center justify-between group">
                                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                                        <div className="flex items-center space-x-10">
                                            <label className="flex items-center space-x-3 cursor-pointer group">
                                                <div
                                                    onClick={() => setDesignData({ ...designData, [item.field]: true })}
                                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${designData[item.field] ? 'bg-primary border-primary shadow-lg shadow-primary/20 scale-110' : 'border-slate-200 group-hover:border-primary/30'}`}
                                                >
                                                    {designData[item.field] && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-inner" />}
                                                </div>
                                                <span className={`text-[11px] font-black uppercase tracking-widest ${designData[item.field] ? 'text-slate-700 underline decoration-primary/10 decoration-4' : 'text-slate-400 group-hover:text-slate-500'}`}>Yes</span>
                                            </label>
                                            <label className="flex items-center space-x-3 cursor-pointer group">
                                                <div
                                                    onClick={() => setDesignData({ ...designData, [item.field]: false })}
                                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${!designData[item.field] ? 'bg-primary border-primary shadow-lg shadow-primary/20 scale-110' : 'border-slate-200 group-hover:border-primary/30'}`}
                                                >
                                                    {!designData[item.field] && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-inner" />}
                                                </div>
                                                <span className={`text-[11px] font-black uppercase tracking-widest ${!designData[item.field] ? 'text-slate-700 underline decoration-primary/10 decoration-4' : 'text-slate-400 group-hover:text-slate-500'}`}>No</span>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 flex justify-center">
                        <Button
                            type="submit"
                            disabled={saving}
                            className="bg-primary hover:bg-primary-hover text-white rounded-2xl px-16 py-4 shadow-2xl shadow-primary/30 active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest italic"
                        >
                            {saving ? 'Saving...' : 'Save Id Card'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default IDCard;
