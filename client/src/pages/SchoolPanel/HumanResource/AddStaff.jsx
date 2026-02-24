import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Input } from '../../../components/SnowUI';
import {
    ChevronDown,
    Check,
    Layout,
    Camera,
    Loader2,
    User
} from 'lucide-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const Label = ({ children, required }) => (
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 block px-1">
        {children} {required && <span className="text-rose-500">*</span>}
    </label>
);

const FormInput = ({ type = "text", placeholder, name, value, onChange, required, section }) => (
    <input
        type={type}
        name={name}
        value={value || ''}
        onChange={section ? (e) => onChange(e, section) : onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-[11px] font-medium text-slate-600 outline-none focus:border-[#7c32ff] transition-all placeholder:text-slate-300"
    />
);

const FormSelect = ({ options = [], name, value, onChange, placeholder, required, openSelect, setOpenSelect, section }) => {
    const isOpen = openSelect === `${section || ''}-${name}`;
    const selectedOption = options.find(o => (o.value || o.name) === value);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e) => {
            if (!e.target.closest(`.select-container-${section || ''}-${name}`)) {
                setOpenSelect(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, name, setOpenSelect, section]);

    const handleSelect = (opt) => {
        const event = { target: { name, value: opt.value || opt.name } };
        if (section) {
            onChange(event, section);
        } else {
            onChange(event);
        }
        setOpenSelect(null);
    };

    return (
        <div className={`relative select-container-${section || ''}-${name}`}>
            <div
                onClick={() => setOpenSelect(isOpen ? null : `${section || ''}-${name}`)}
                className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-[11px] font-medium text-slate-600 outline-none focus:border-[#7c32ff] transition-all cursor-pointer flex justify-between items-center h-[30px]"
            >
                <span className={!selectedOption ? 'text-slate-300' : ''}>
                    {selectedOption ? (selectedOption.label || selectedOption.name) : placeholder}
                </span>
                <ChevronDown className={`text-slate-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} size={14} />
            </div>

            {isOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-100 rounded-lg shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="max-h-[224px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                        {options.map((opt, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleSelect(opt)}
                                className={`px-4 py-2 text-[11px] font-bold transition-colors cursor-pointer hover:bg-slate-50 hover:text-[#7c32ff] ${value === (opt.value || opt.name) ? 'bg-[#7c32ff]/5 text-[#7c32ff]' : 'text-slate-500'}`}
                            >
                                {opt.label || opt.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const AddStaff = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { school_slug } = useParams();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState('BASIC INFO');
    const [loadingData, setLoadingData] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);
    const photoInputRef = useRef(null);

    // Dropdown Data
    const [roles, setRoles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);

    const editData = location.state?.editData || null;
    const isEdit = !!editData;

    const [formData, setFormData] = useState({
        staffId: '',
        role: '',
        department: '',
        designation: '',
        firstName: '',
        lastName: '',
        name: '',
        fatherName: '',
        motherName: '',
        email: '',
        gender: '',
        dob: '',
        doj: '',
        contactNo: '',
        maritalStatus: '',
        emergencyContactNo: '',
        drivingLicense: '',
        address: '',
        permanentAddress: '',
        qualifications: '',
        experience: '',
        epfNo: '',
        salary: '',
        contractType: '',
        location: '',
        photo: '',
        bankDetails: {
            accountName: '',
            accountNo: '',
            bankName: '',
            branchName: '',
            ifsc: ''
        },
        socialLinks: {
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: ''
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoadingData(true);
            try {
                const [rolesRes, deptsRes, desigsRes] = await Promise.all([
                    api.get('/api/school/rbac/roles'),
                    api.get('/api/admin-section/departments'),
                    api.get('/api/admin-section/designations')
                ]);
                setRoles(rolesRes.data);
                setDepartments(deptsRes.data);
                setDesignations(desigsRes.data);

                if (isEdit && editData) {
                    const fullName = editData.name || '';
                    const firstName = fullName.split(' ')[0] || '';
                    const lastName = fullName.split(' ').slice(1).join(' ') || '';

                    setFormData({
                        staffId: editData.staffId || '',
                        role: editData.role || '',
                        department: editData.department || '',
                        designation: editData.designation || '',
                        firstName,
                        lastName,
                        fatherName: editData.fatherName || '',
                        motherName: editData.motherName || '',
                        email: editData.email || '',
                        gender: editData.gender || '',
                        dob: editData.dob ? editData.dob.split('T')[0] : '',
                        doj: editData.doj ? editData.doj.split('T')[0] : '',
                        contactNo: editData.contactNo || '',
                        maritalStatus: editData.maritalStatus || '',
                        emergencyContactNo: editData.emergencyContactNo || '',
                        drivingLicense: editData.drivingLicense || '',
                        address: editData.address || '',
                        permanentAddress: editData.permanentAddress || '',
                        qualifications: editData.qualifications || '',
                        experience: editData.experience || '',
                        epfNo: editData.epfNo || '',
                        salary: editData.salary || '',
                        contractType: editData.contractType || '',
                        location: editData.location || '',
                        photo: editData.photo || '',
                        bankDetails: {
                            accountName: editData.bankDetails?.accountName || '',
                            accountNo: editData.bankDetails?.accountNo || '',
                            bankName: editData.bankDetails?.bankName || '',
                            branchName: editData.bankDetails?.branchName || '',
                            ifsc: editData.bankDetails?.ifsc || ''
                        },
                        socialLinks: {
                            facebook: editData.socialLinks?.facebook || '',
                            twitter: editData.socialLinks?.twitter || '',
                            linkedin: editData.socialLinks?.linkedin || '',
                            instagram: editData.socialLinks?.instagram || ''
                        }
                    });

                    // Set photo preview for editing
                    if (editData.photo) {
                        const baseUrl = 'http://localhost:5000';
                        setPhotoPreview(editData.photo.startsWith('http') ? editData.photo : `${baseUrl}${editData.photo}`);
                    }
                }
            } catch (error) {
                console.error('Error fetching HR data:', error);
                showToast('Error loading form data', 'error');
            } finally {
                setLoadingData(false);
            }
        };
        fetchData();
    }, [isEdit]);

    const handleInputChange = (e, section = null) => {
        const { name, value } = e.target;
        if (section) {
            setFormData(prev => ({
                ...prev,
                [section]: { ...prev[section], [name]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePhotoUpload = async (file) => {
        if (!file) return;
        setUploadingPhoto(true);

        // Show preview immediately
        const reader = new FileReader();
        reader.onload = (e) => setPhotoPreview(e.target.result);
        reader.readAsDataURL(file);

        const uploadData = new FormData();
        uploadData.append('file', file);
        try {
            const { data } = await api.post('/api/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData(prev => ({ ...prev, photo: data.url }));
            showToast('Photo uploaded successfully!');
        } catch (error) {
            console.error('Photo upload failed:', error);
            showToast('Photo upload failed. Please try again.', 'error');
            setPhotoPreview(null);
        } finally {
            setUploadingPhoto(false);
        }
    };

    const handleSubmit = async () => {
        if (!formData.staffId || !formData.role || !formData.firstName || !formData.email || !formData.contactNo) {
            showToast('Please fill in all required fields (Staff ID, Role, First Name, Email, Mobile)', 'error');
            return;
        }

        setSaving(true);
        try {
            const finalData = {
                ...formData,
                name: `${formData.firstName} ${formData.lastName}`.trim()
            };

            if (isEdit) {
                await api.put(`/api/staff/${editData._id}`, finalData);
                showToast('Staff updated successfully!');
            } else {
                await api.post('/api/staff', finalData);
                showToast('Staff added successfully!');
            }
            navigate(`/${school_slug}/staff-directory`);
        } catch (error) {
            console.error('Error saving staff:', error);
            showToast(error.response?.data?.message || 'Error saving staff member', 'error');
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        'BASIC INFO', 'PAYROLL DETAILS', 'BANK INFO DETAILS',
        'SOCIAL LINKS DETAILS', 'DOCUMENT INFO', 'CUSTOM FIELD'
    ];

    const [openSelect, setOpenSelect] = useState(null);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'BASIC INFO':
                return (
                    <div className="space-y-8">
                        {/* Photo Upload */}
                        <div className="flex items-center space-x-6 pb-6 border-b border-slate-100">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center">
                                    {photoPreview ? (
                                        <img src={photoPreview} alt="Staff Photo" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={32} className="text-slate-300" />
                                    )}
                                </div>
                                {uploadingPhoto && (
                                    <div className="absolute inset-0 bg-white/70 rounded-2xl flex items-center justify-center">
                                        <Loader2 className="animate-spin text-[#7c32ff]" size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1">
                                <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Staff Photo</span>
                                <p className="text-[10px] text-slate-400">Upload a clear passport-sized photo (JPG, PNG). Max 5MB.</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="staff-photo-upload"
                                    ref={photoInputRef}
                                    onChange={(e) => handlePhotoUpload(e.target.files[0])}
                                    disabled={uploadingPhoto}
                                />
                                <label
                                    htmlFor="staff-photo-upload"
                                    className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all w-fit mt-1 active:scale-95"
                                >
                                    <Camera size={12} />
                                    <span>{uploadingPhoto ? 'Uploading...' : photoPreview ? 'Change Photo' : 'Upload Photo'}</span>
                                </label>
                            </div>
                        </div>

                        {/* Grid Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6">
                            <div className="space-y-1">
                                <Label required>STAFF ID</Label>
                                <FormInput name="staffId" value={formData.staffId} onChange={handleInputChange} required placeholder="G1" />
                            </div>
                            <div className="space-y-1">
                                <Label required>ROLE</Label>
                                <FormSelect
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    options={roles}
                                    placeholder="Select Role"
                                    required
                                    openSelect={openSelect}
                                    setOpenSelect={setOpenSelect}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>DEPARTMENT</Label>
                                <FormSelect
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    options={departments}
                                    placeholder="Select Department"
                                    openSelect={openSelect}
                                    setOpenSelect={setOpenSelect}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>DESIGNATION</Label>
                                <FormSelect
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    options={designations}
                                    placeholder="Select Designation"
                                    openSelect={openSelect}
                                    setOpenSelect={setOpenSelect}
                                />
                            </div>
                        </div>

                        {/* Grid Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6">
                            <div className="space-y-1">
                                <Label required>FIRST NAME</Label>
                                <FormInput name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder="Enter first name" />
                            </div>
                            <div className="space-y-1">
                                <Label>LAST NAME</Label>
                                <FormInput name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter last name" />
                            </div>
                            <div className="space-y-1">
                                <Label>FATHER NAME</Label>
                                <FormInput name="fatherName" value={formData.fatherName} onChange={handleInputChange} placeholder="Enter father name" />
                            </div>
                            <div className="space-y-1">
                                <Label>MOTHER NAME</Label>
                                <FormInput name="motherName" value={formData.motherName} onChange={handleInputChange} placeholder="Enter mother name" />
                            </div>
                        </div>

                        {/* Grid Row 3 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6">
                            <div className="space-y-1">
                                <Label required>EMAIL</Label>
                                <FormInput type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Enter email" />
                            </div>
                            <div className="space-y-1">
                                <Label>GENDER</Label>
                                <FormSelect
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    options={[{ name: 'Male' }, { name: 'Female' }, { name: 'Other' }]}
                                    placeholder="Select Gender"
                                    openSelect={openSelect}
                                    setOpenSelect={setOpenSelect}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>DATE OF BIRTH</Label>
                                <FormInput type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-1">
                                <Label>DATE OF JOINING</Label>
                                <FormInput type="date" name="doj" value={formData.doj} onChange={handleInputChange} />
                            </div>
                        </div>

                        {/* Grid Row 4 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6">
                            <div className="space-y-1">
                                <Label required>MOBILE</Label>
                                <FormInput name="contactNo" value={formData.contactNo} onChange={handleInputChange} required placeholder="Enter mobile no" />
                            </div>
                            <div className="space-y-1">
                                <Label>MARITAL STATUS</Label>
                                <FormSelect
                                    name="maritalStatus"
                                    value={formData.maritalStatus}
                                    onChange={handleInputChange}
                                    options={[{ name: 'Married' }, { name: 'Unmarried' }]}
                                    placeholder="Marital Status"
                                    openSelect={openSelect}
                                    setOpenSelect={setOpenSelect}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>EMERGENCY MOBILE</Label>
                                <FormInput name="emergencyContactNo" value={formData.emergencyContactNo} onChange={handleInputChange} placeholder="Emergency no" />
                            </div>
                            <div className="space-y-1">
                                <Label>DRIVING LICENSE</Label>
                                <FormInput name="drivingLicense" value={formData.drivingLicense} onChange={handleInputChange} placeholder="License no" />
                            </div>
                        </div>

                        {/* Grid Row 6: Addresses */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-1">
                                <Label>CURRENT ADDRESS</Label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full bg-white border border-slate-200 rounded p-4 text-[11px] font-medium text-slate-600 outline-none focus:border-[#7c32ff] transition-all h-28 resize-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>PERMANENT ADDRESS</Label>
                                <textarea
                                    name="permanentAddress"
                                    value={formData.permanentAddress}
                                    onChange={handleInputChange}
                                    className="w-full bg-white border border-slate-200 rounded p-4 text-[11px] font-medium text-slate-600 outline-none focus:border-[#7c32ff] transition-all h-28 resize-none"
                                />
                            </div>
                        </div>

                        {/* Grid Row 7: Qual & Experience */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-1">
                                <Label>QUALIFICATIONS</Label>
                                <textarea
                                    name="qualifications"
                                    value={formData.qualifications}
                                    onChange={handleInputChange}
                                    className="w-full bg-white border border-slate-200 rounded p-4 text-[11px] font-medium text-slate-600 outline-none focus:border-[#7c32ff] transition-all h-28 resize-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>EXPERIENCE</Label>
                                <textarea
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    className="w-full bg-white border border-slate-200 rounded p-4 text-[11px] font-medium text-slate-600 outline-none focus:border-[#7c32ff] transition-all h-28 resize-none"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'PAYROLL DETAILS':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6">
                        <div className="space-y-1">
                            <Label>EPF NO</Label>
                            <FormInput name="epfNo" value={formData.epfNo} onChange={handleInputChange} placeholder="EPF number" />
                        </div>
                        <div className="space-y-1">
                            <Label>BASIC SALARY</Label>
                            <FormInput type="number" name="salary" value={formData.salary} onChange={handleInputChange} placeholder="Enter salary" />
                        </div>
                        <div className="space-y-1">
                            <Label>CONTRACT TYPE</Label>
                            <FormSelect
                                name="contractType"
                                value={formData.contractType}
                                onChange={handleInputChange}
                                options={[{ name: 'Permanent' }, { name: 'Probation' }]}
                                placeholder="Contract Type"
                                openSelect={openSelect}
                                setOpenSelect={setOpenSelect}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>LOCATION</Label>
                            <FormInput name="location" value={formData.location} onChange={handleInputChange} placeholder="Work location" />
                        </div>
                    </div>
                );
            case 'BANK INFO DETAILS':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6">
                        <div className="space-y-1">
                            <Label>BANK ACCOUNT NAME</Label>
                            <FormInput name="accountName" value={formData.bankDetails.accountName} onChange={handleInputChange} section="bankDetails" placeholder="Account holder name" />
                        </div>
                        <div className="space-y-1">
                            <Label>ACCOUNT NO</Label>
                            <FormInput name="accountNo" value={formData.bankDetails.accountNo} onChange={handleInputChange} section="bankDetails" placeholder="Account number" />
                        </div>
                        <div className="space-y-1">
                            <Label>BANK NAME</Label>
                            <FormInput name="bankName" value={formData.bankDetails.bankName} onChange={handleInputChange} section="bankDetails" placeholder="Bank name" />
                        </div>
                        <div className="space-y-1">
                            <Label>BRANCH NAME</Label>
                            <FormInput name="branchName" value={formData.bankDetails.branchName} onChange={handleInputChange} section="bankDetails" placeholder="Branch name" />
                        </div>
                        <div className="space-y-1">
                            <Label>IFSC CODE</Label>
                            <FormInput name="ifsc" value={formData.bankDetails.ifsc} onChange={handleInputChange} section="bankDetails" placeholder="IFSC code" />
                        </div>
                    </div>
                );
            case 'SOCIAL LINKS DETAILS':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6">
                        <div className="space-y-1">
                            <Label>FACEBOOK URL</Label>
                            <FormInput name="facebook" value={formData.socialLinks.facebook} onChange={handleInputChange} section="socialLinks" placeholder="Facebook profile URL" />
                        </div>
                        <div className="space-y-1">
                            <Label>TWITTER URL</Label>
                            <FormInput name="twitter" value={formData.socialLinks.twitter} onChange={handleInputChange} section="socialLinks" placeholder="Twitter profile URL" />
                        </div>
                        <div className="space-y-1">
                            <Label>LINKEDIN URL</Label>
                            <FormInput name="linkedin" value={formData.socialLinks.linkedin} onChange={handleInputChange} section="socialLinks" placeholder="LinkedIn profile URL" />
                        </div>
                        <div className="space-y-1">
                            <Label>INSTAGRAM URL</Label>
                            <FormInput name="instagram" value={formData.socialLinks.instagram} onChange={handleInputChange} section="socialLinks" placeholder="Instagram profile URL" />
                        </div>
                    </div>
                );
            case 'DOCUMENT INFO':
                return (
                    <div className="min-h-[100px] flex items-center justify-center text-slate-300 italic text-xs">
                        Document uploads coming soon
                    </div>
                );
            case 'CUSTOM FIELD':
                return (
                    <div className="min-h-[100px] flex items-center justify-center text-slate-300 italic text-xs">
                        No custom fields available
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-3 px-6 rounded-xl shadow-sm border border-slate-100 mb-6 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">{isEdit ? 'Edit Staff' : 'Add New Staff'}</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="cursor-pointer hover:text-[#7c32ff]" onClick={() => navigate(`/${school_slug}`)}>Dashboard</span>
                    <span>|</span>
                    <span className="cursor-pointer hover:text-[#7c32ff]">Human Resource</span>
                    <span>|</span>
                    <span className="text-[#1C1C1C]">{isEdit ? 'Edit Staff' : 'Add New Staff'}</span>
                </div>
            </div>

            <Card className="p-0 border-none shadow-sm bg-white rounded-lg overflow-hidden">
                {/* Info Header */}
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm shadow-slate-50">
                    <h3 className="text-[10px] font-black text-[#7c32ff] uppercase tracking-widest italic">Staff Information</h3>
                    <div className="flex items-center space-x-2">
                        {!isEdit && (
                            <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest">
                                IMPORT STAFF
                            </Button>
                        )}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={saving}
                            className="bg-[#1C1C1C] hover:bg-black disabled:bg-slate-400 text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                        >
                            {saving ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" />
                                    <span>SAVING...</span>
                                </>
                            ) : (
                                <>
                                    <Check size={14} />
                                    <span>{isEdit ? 'UPDATE STAFF' : 'SAVE STAFF'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Tabs Bar */}
                <div className="px-5 py-3 flex flex-wrap gap-2 bg-white border-b border-slate-50">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all border ${activeTab === tab
                                ? 'bg-[#E2E8F0] text-slate-600 border-[#E2E8F0]'
                                : 'bg-white text-slate-400 border-slate-200 hover:border-[#7c32ff] hover:text-[#7c32ff]'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-10 bg-[#FBFCFE]">
                    <div className="max-w-7xl mx-auto">
                        {renderTabContent()}
                    </div>
                </div>
            </Card>

            {/* Float Icon */}
            <div className="fixed bottom-12 right-12 w-10 h-10 bg-[#7c32ff] rounded shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-110 active:scale-95 transition-all">
                <Layout size={18} />
            </div>
        </div>
    );
};

export default AddStaff;
