import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Input } from '../../components/SnowUI';
import {
    Save,
    Upload,
    Calendar,
    ChevronDown,
    CheckSquare,
    UserPlus,
    Plus,
    FileText,
    Clock,
    Info,
    Shield,
    Smartphone,
    Mail,
    MapPin,
    Droplets,
    Ruler,
    Weight,
    Building2,
    Truck,
    Bed,
    Camera,
    Loader2
} from 'lucide-react';
import api from '../../api/api';

const AddStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');
    const [classes, setClasses] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [uploading, setUploading] = useState({
        photo: false,
        fatherPhoto: false,
        motherPhoto: false,
        guardianPhoto: false
    });

    // Form State
    const [formData, setFormData] = useState({
        // Academic Information
        academicYear: '',
        class: '',
        section: '',
        admissionNumber: '88991',
        admissionDate: '2026-02-18',
        roll: '',
        group: '',

        // Personal Info
        firstName: '',
        lastName: '',
        gender: '',
        dob: '2006-02-18',
        religion: '',
        caste: '',

        // Contact Information
        email: '',
        phone: '',

        // Address Info
        currentAddress: '',
        permanentAddress: '',

        // Medical Record
        bloodGroup: '',
        height: '',
        weight: '',

        // Fathers Info
        fatherName: '',
        fatherOccupation: '',
        fatherPhone: '',

        // Mother Info
        motherName: '',
        motherOccupation: '',
        motherPhone: '',

        // Guardian Info
        guardianRelation: 'Others',
        guardianName: '',
        relationWithGuardian: 'Other',
        guardianEmail: '',
        guardianPhone: '',
        guardianOccupation: '',
        guardianAddress: '',

        // Document Info
        nationalId: '',
        birthCert: '',
        additionalNotes: '',

        // Bank Information
        bankName: '',
        bankAccount: '',
        ifsc: '',

        // Document Attachments
        doc01Title: '',
        doc02Title: '',
        doc03Title: '',
        doc04Title: '',

        // Previous School
        previousSchoolDetails: '',

        // Other Info
        route: '',
        vehicle: '',
        dormitory: '',
        room: '',

        // Photos
        photo: '',
        fatherPhoto: '',
        motherPhoto: '',
        guardianPhoto: '',

        // Custom Fields
        panNo: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [classRes, sessionRes, categoryRes] = await Promise.all([
                    api.get('/api/academic/classes'),
                    api.get('/api/academic/sessions'),
                    api.get('/api/academic/student-categories')
                ]);
                setClasses(classRes.data);
                setSessions(sessionRes.data);
                setCategories(categoryRes.data);

                if (id) {
                    const { data } = await api.get(`/api/students/${id}`);
                    setFormData({
                        ...data,
                        academicYear: data.academicYear?._id || data.academicYear,
                        class: data.class?._id || data.class,
                        dob: data.dob ? data.dob.split('T')[0] : '',
                        admissionDate: data.admissionDate ? data.admissionDate.split('T')[0] : ''
                    });
                } else {
                    // Set default academic year if active session exists
                    const activeSession = sessionRes.data.find(s => s.status === 'Active');
                    if (activeSession) {
                        setFormData(prev => ({ ...prev, academicYear: activeSession._id }));
                    } else if (sessionRes.data.length > 0) {
                        setFormData(prev => ({ ...prev, academicYear: sessionRes.data[0]._id }));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch data");
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        // Update sections when class changes
        const selectedClass = classes.find(c => c._id === formData.class);
        if (selectedClass) {
            // Logic to handle section updates if needed
        }
    }, [formData.class, classes]);

    const getSectionOptions = () => {
        const cls = classes.find(c => c._id === formData.class);
        return cls && cls.sections ? cls.sections : [];
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (!formData.academicYear) {
            alert('Academic Year is missing. Please ensure academic sessions are set up.');
            return;
        }
        if (!formData.class) {
            alert('Please select a Class.');
            return;
        }

        try {
            if (id) {
                await api.put(`/api/students/${id}`, formData);
                alert('Student updated successfully!');
            } else {
                await api.post('/api/students', formData);
                alert('Student saved successfully!');
            }
            navigate(-1);
        } catch (error) {
            console.error('Error saving student:', error);
            alert(error.response?.data?.message || 'Error saving student');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (file, fieldName) => {
        if (!file) return;

        setUploading(prev => ({ ...prev, [fieldName]: true }));
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const { data } = await api.post('/api/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData(prev => ({ ...prev, [fieldName]: data.url }));
            alert(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} uploaded successfully!`);
        } catch (error) {
            console.error('File upload failed:', error);
            alert('File upload failed. Please try again.');
        } finally {
            setUploading(prev => ({ ...prev, [fieldName]: false }));
        }
    };

    const tabs = [
        { id: 'personal', label: 'PERSONAL INFO' },
        { id: 'parents', label: 'PARENTS & GUARDIAN INFO' },
        { id: 'documents', label: 'DOCUMENT INFO' },
        { id: 'previous', label: 'PREVIOUS SCHOOL INFORMATION' },
        { id: 'other', label: 'OTHER INFO' },
        { id: 'custom', label: 'CUSTOM FIELD' },
    ];

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );

    const Select = ({ name, value, onChange, options, placeholder, required }) => (
        <div className="relative group">
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#1C1C1C]/10 focus:border-[#1C1C1C] transition-all appearance-none"
            >
                <option value="">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#1C1C1C] transition-colors" size={14} />
        </div>
    );

    const FileUpload = ({ label, placeholder, onFileSelect, value, isUploading }) => (
        <div className="space-y-1.5">
            <Label>{label}</Label>
            <div className={`flex bg-slate-50 border ${value ? 'border-primary/20 bg-primary/5' : 'border-slate-100'} rounded-xl overflow-hidden group focus-within:ring-2 focus-within:ring-[#1C1C1C]/10 focus-within:border-[#1C1C1C] transition-all`}>
                <input
                    type="file"
                    className="hidden"
                    id={`file-${label}`}
                    onChange={(e) => onFileSelect(e.target.files[0])}
                    disabled={isUploading}
                />
                <label
                    htmlFor={`file-${label}`}
                    className={`flex-1 px-4 py-3 text-xs font-bold ${value ? 'text-primary' : 'text-slate-400'} truncate cursor-pointer`}
                >
                    {isUploading ? 'Uploading...' : value ? value.split('/').pop() : placeholder}
                </label>
                <label
                    htmlFor={`file-${label}`}
                    className={`${isUploading ? 'bg-slate-400' : 'bg-[#1C1C1C] hover:bg-black'} text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center space-x-2 cursor-pointer`}
                >
                    {isUploading ? <Loader2 className="animate-spin" size={14} /> : <Camera size={14} />}
                    <span>{isUploading ? 'WAIT' : value ? 'REPLACE' : 'BROWSE'}</span>
                </label>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">

            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">{id ? 'Edit Student' : 'Student Admission'}</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Student Info</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">{id ? 'Edit Student' : 'Student Admission'}</span>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <Button
                        onClick={handleSubmit}
                        className="bg-[#1C1C1C] hover:bg-[black] text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                    >
                        <Save size={14} strokeWidth={3} />
                        <span>SAVE STUDENT</span>
                    </Button>
                </div>
            </div>

            <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white overflow-hidden rounded-3xl">

                {/* Tabs Navigation */}
                <div className="flex border-b border-slate-50 overflow-x-auto no-scrollbar bg-slate-50/30">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-8 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all relative ${activeTab === tab.id
                                ? 'text-[#1C1C1C] bg-white'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1C1C1C] shadow-[0_-2px_8px_rgba(124,50,255,0.4)]"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-10">

                    {/* PERSONAL INFO TAB */}
                    {activeTab === 'personal' && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                {/* Left Side: Academic & Contact & Address */}
                                <div className="space-y-12">
                                    {/* Academic Information */}
                                    <div className="relative">
                                        <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                            <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                            <span>Academic Information</span>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <Label required>Academic Year</Label>
                                                <Select
                                                    name="academicYear"
                                                    value={formData.academicYear}
                                                    onChange={handleChange}
                                                    options={sessions.map(s => ({ label: s.year, value: s._id }))}
                                                    placeholder="Select Year"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label required>Class</Label>
                                                <Select name="class" value={formData.class} onChange={handleChange} options={classes.map(c => ({ value: c._id, label: c.name }))} placeholder="Select Class" required />
                                            </div>


                                            // ... inside render ...
                                            <div className="space-y-1.5">
                                                <Label required>Section</Label>
                                                <Select
                                                    name="section"
                                                    value={formData.section}
                                                    onChange={handleChange}
                                                    options={getSectionOptions()}
                                                    placeholder="Select Section"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label required>Admission Number</Label>
                                                <Input name="admissionNumber" value={formData.admissionNumber} onChange={handleChange} className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Admission Date</Label>
                                                <div className="relative">
                                                    <Input type="date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold w-full" />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Roll</Label>
                                                <Input name="roll" value={formData.roll} onChange={handleChange} placeholder="Enter Roll" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="space-y-1.5 md:col-span-2">
                                                <Label>Group</Label>
                                                <Select name="group" value={formData.group} onChange={handleChange} options={['Science', 'Commerce', 'Arts']} placeholder="Select Group" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="relative">
                                        <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                            <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                            <span>Contact Information</span>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <Label>Email Address</Label>
                                                <Input name="email" value={formData.email} onChange={handleChange} placeholder="student@example.com" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label required>Phone Number</Label>
                                                <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 ..." className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address Information */}
                                    <div className="relative">
                                        <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                            <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                            <span>Student Address Info</span>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <Label>Current Address</Label>
                                                <textarea
                                                    name="currentAddress"
                                                    value={formData.currentAddress}
                                                    onChange={handleChange}
                                                    className="w-full h-24 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#1C1C1C]/10 focus:border-[#1C1C1C] transition-all resize-none"
                                                ></textarea>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Permanent Address</Label>
                                                <textarea
                                                    name="permanentAddress"
                                                    value={formData.permanentAddress}
                                                    onChange={handleChange}
                                                    className="w-full h-24 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#1C1C1C]/10 focus:border-[#1C1C1C] transition-all resize-none"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Personal & Medical */}
                                <div className="space-y-12">
                                    {/* Personal Info */}
                                    <div className="relative">
                                        <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                            <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                            <span>Personal Info</span>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <Label required>First Name</Label>
                                                <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label required>Last Name</Label>
                                                <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label required>Gender</Label>
                                                <Select name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} placeholder="Select Gender" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label required>Date of Birth</Label>
                                                <Input type="date" name="dob" value={formData.dob} onChange={handleChange} className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold w-full" required />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Religion</Label>
                                                <Select name="religion" value={formData.religion} onChange={handleChange} options={['Islam', 'Hinduism', 'Christianity', 'Other']} placeholder="Select Religion" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Caste</Label>
                                                <Input name="caste" value={formData.caste} onChange={handleChange} placeholder="Enter Caste" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <FileUpload
                                                    label="Student Photo"
                                                    placeholder="Student Photo"
                                                    onFileSelect={(file) => handleFileUpload(file, 'photo')}
                                                    value={formData.photo}
                                                    isUploading={uploading.photo}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Medical Record */}
                                    <div className="relative">
                                        <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                            <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                            <span>Medical Record</span>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <Label>Blood Group</Label>
                                                <Select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} placeholder="Select Blood Group" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Category</Label>
                                                <Select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    options={categories.map(c => ({ value: c.category, label: c.category }))}
                                                    placeholder="Select Category"
                                                />
                                            </div>
                                            <div className="space-y-1.5 text-xs">
                                                <Label>Height (in)</Label>
                                                <Input name="height" value={formData.height} onChange={handleChange} placeholder="Enter Height" className="bg-slate-50 border-slate-100 rounded-xl font-bold" />
                                            </div>
                                            <div className="space-y-1.5 text-xs">
                                                <Label>Weight (kg)</Label>
                                                <Input name="weight" value={formData.weight} onChange={handleChange} placeholder="Enter Weight" className="bg-slate-50 border-slate-100 rounded-xl font-bold" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PARENTS & GUARDIAN INFO TAB */}
                    {activeTab === 'parents' && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">

                            {/* Add Parents Button */}
                            <div className="flex justify-end mb-4">
                                <Button className="bg-[#1C1C1C] text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                                    <Plus size={14} strokeWidth={3} />
                                    <span>ADD PARENTS</span>
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                {/* Left Side: Fathers & Mothers Info */}
                                <div className="space-y-12">
                                    {/* Fathers Info */}
                                    <div className="relative">
                                        <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                            <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                            <span>FATHERS INFO</span>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <Label>Father Name</Label>
                                                <Input name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Father Name" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Occupation</Label>
                                                <Input name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} placeholder="Occupation" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Father Phone</Label>
                                                <Input name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} placeholder="Phone" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                            </div>
                                            <FileUpload
                                                label="Fathers Photo"
                                                placeholder="Photo"
                                                onFileSelect={(file) => handleFileUpload(file, 'fatherPhoto')}
                                                value={formData.fatherPhoto}
                                                isUploading={uploading.fatherPhoto}
                                            />
                                        </div>
                                    </div>

                                    {/* Mother Info */}
                                    <div className="relative">
                                        <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                            <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                            <span>MOTHER INFO</span>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <Label>Mother Name</Label>
                                                <Input name="motherName" value={formData.motherName} onChange={handleChange} placeholder="Mother Name" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Occupation</Label>
                                                <Input name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} placeholder="Occupation" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Mother Phone</Label>
                                                <Input name="motherPhone" value={formData.motherPhone} onChange={handleChange} placeholder="Phone" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                            </div>
                                            <FileUpload
                                                label="Mothers Photo"
                                                placeholder="Photo"
                                                onFileSelect={(file) => handleFileUpload(file, 'motherPhoto')}
                                                value={formData.motherPhoto}
                                                isUploading={uploading.motherPhoto}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Guardian Info */}
                                <div className="space-y-12">
                                    <div className="relative">
                                        <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                            <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                            <span>GUARDIAN INFO</span>
                                        </h3>
                                        <div className="space-y-8">
                                            {/* Relation Radio */}
                                            <div className="flex items-center space-x-12 px-2">
                                                <Label>Relation with Guardian</Label>
                                                <div className="flex items-center space-x-8">
                                                    {['Father', 'Mother', 'Others'].map(rel => (
                                                        <label key={rel} className="flex items-center space-x-2 cursor-pointer group">
                                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${formData.guardianRelation === rel ? 'border-[#1C1C1C] bg-[#1C1C1C]/5' : 'border-slate-200 group-hover:border-[#1C1C1C]/50'}`}>
                                                                <input
                                                                    type="radio"
                                                                    name="guardianRelation"
                                                                    value={rel}
                                                                    checked={formData.guardianRelation === rel}
                                                                    onChange={handleChange}
                                                                    className="hidden"
                                                                />
                                                                {formData.guardianRelation === rel && <div className="w-1.5 h-1.5 rounded-full bg-[#1C1C1C]"></div>}
                                                            </div>
                                                            <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${formData.guardianRelation === rel ? 'text-[#1C1C1C]' : 'text-slate-400'}`}>{rel}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-1.5">
                                                    <Label>Guardians Name</Label>
                                                    <Input name="guardianName" value={formData.guardianName} onChange={handleChange} placeholder="Guardian Name" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label>Relation with Guardian</Label>
                                                    <Input name="relationWithGuardian" value={formData.relationWithGuardian} onChange={handleChange} className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                                </div>
                                                <div className="space-y-1.5 md:col-span-2">
                                                    <Label required>Guardians Email</Label>
                                                    <Input name="guardianEmail" value={formData.guardianEmail} onChange={handleChange} placeholder="Email" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" required />
                                                </div>
                                                <FileUpload
                                                    label="Guardian Photo"
                                                    placeholder="Photo"
                                                    onFileSelect={(file) => handleFileUpload(file, 'guardianPhoto')}
                                                    value={formData.guardianPhoto}
                                                    isUploading={uploading.guardianPhoto}
                                                />
                                                <div className="space-y-1.5">
                                                    <Label>Guardian Phone</Label>
                                                    <Input name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} placeholder="Phone" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                                </div>
                                                <div className="space-y-1.5 md:col-span-2">
                                                    <Label>Guardian Occupation</Label>
                                                    <Input name="guardianOccupation" value={formData.guardianOccupation} onChange={handleChange} placeholder="Occupation" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                                </div>
                                                <div className="space-y-1.5 md:col-span-2">
                                                    <Label>Guardian Address</Label>
                                                    <textarea
                                                        name="guardianAddress"
                                                        value={formData.guardianAddress}
                                                        onChange={handleChange}
                                                        className="w-full h-24 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#1C1C1C]/10 focus:border-[#1C1C1C] transition-all resize-none"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DOCUMENT INFO TAB */}
                    {activeTab === 'documents' && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                {/* Document Info */}
                                <div className="space-y-12">
                                    <div className="relative">
                                        <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                            <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                            <span>DOCUMENT INFO</span>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <Label>National ID Card</Label>
                                                <Input name="nationalId" value={formData.nationalId} onChange={handleChange} placeholder="ID Number" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Birth Certificate Number</Label>
                                                <Input name="birthCert" value={formData.birthCert} onChange={handleChange} placeholder="Number" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="space-y-1.5 md:col-span-2">
                                                <Label>Additional Notes</Label>
                                                <textarea
                                                    name="additionalNotes"
                                                    value={formData.additionalNotes}
                                                    onChange={handleChange}
                                                    className="w-full h-24 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#1C1C1C]/10 focus:border-[#1C1C1C] transition-all resize-none"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bank Information */}
                                <div className="space-y-12">
                                    <div className="relative">
                                        <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                            <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                            <span>BANK INFORMATION</span>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <Label>Bank Name</Label>
                                                <Input name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>Bank Account Number</Label>
                                                <Input name="bankAccount" value={formData.bankAccount} onChange={handleChange} placeholder="Number" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label>IFSC Code</Label>
                                                <Input name="ifsc" value={formData.ifsc} onChange={handleChange} placeholder="IFSC" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Document Attachment Section */}
                            <div className="relative pt-4">
                                <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                    <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                    <span>DOCUMENT ATTACHMENT</span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    <div className="space-y-4">
                                        <Input label="Document 01 Title" placeholder="Title" className="bg-slate-50 border-slate-100 font-bold" />
                                        <FileUpload placeholder="01" onFileSelect={(file) => console.log(file)} />
                                    </div>
                                    <div className="space-y-4">
                                        <Input label="Document 02 Title" placeholder="Title" className="bg-slate-50 border-slate-100 font-bold" />
                                        <FileUpload placeholder="01" />
                                    </div>
                                    <div className="space-y-4">
                                        <Input label="Document 03 Title" placeholder="Title" className="bg-slate-50 border-slate-100 font-bold" />
                                        <FileUpload placeholder="01" />
                                    </div>
                                    <div className="space-y-4">
                                        <Input label="Document 04 Title" placeholder="Title" className="bg-slate-50 border-slate-100 font-bold" />
                                        <FileUpload placeholder="01" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PREVIOUS SCHOOL INFORMATION TAB */}
                    {activeTab === 'previous' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                <span>PREVIOUS SCHOOL DETAILS</span>
                            </h3>
                            <textarea
                                name="previousSchoolDetails"
                                value={formData.previousSchoolDetails}
                                onChange={handleChange}
                                placeholder="Enter previous school details..."
                                className="w-full h-64 bg-slate-50 border border-slate-100 rounded-3xl p-10 text-sm font-bold text-slate-500 outline-none focus:ring-4 focus:ring-[#1C1C1C]/5 focus:border-[#1C1C1C] transition-all resize-none shadow-inner"
                            ></textarea>
                        </div>
                    )}

                    {/* OTHER INFO TAB */}
                    {activeTab === 'other' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-in fade-in slide-in-from-right-4 duration-500">
                            {/* Transport */}
                            <div className="relative">
                                <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                    <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                    <span>TRANSPORT</span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <Label>Route List</Label>
                                        <Select name="route" value={formData.route} onChange={handleChange} options={[]} placeholder="Route List" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>Vehicle Number</Label>
                                        <Select name="vehicle" value={formData.vehicle} onChange={handleChange} options={[]} placeholder="Vehicle Number" />
                                    </div>
                                </div>
                            </div>

                            {/* Dormitory Info */}
                            <div className="relative">
                                <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                    <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                    <span>DORMITORY INFO</span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <Label>Dormitory</Label>
                                        <Select name="dormitory" value={formData.dormitory} onChange={handleChange} options={[]} placeholder="Dormitory Name" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>Room Number</Label>
                                        <Select name="room" value={formData.room} onChange={handleChange} options={[]} placeholder="Room Number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CUSTOM FIELD TAB */}
                    {activeTab === 'custom' && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="relative">
                                <h3 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                                    <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                    <span>CUSTOM FIELD</span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <Label required>PAN NO</Label>
                                        <Input
                                            name="panNo"
                                            value={formData.panNo}
                                            onChange={handleChange}
                                            placeholder="Enter PAN Number"
                                            className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </Card>
        </div>
    );
};

export default AddStudent;
