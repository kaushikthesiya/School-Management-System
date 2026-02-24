import React, { useState, useEffect } from 'react';
import { Card, Button } from '../../components/SnowUI';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Award,
    FileText,
    History,
    UploadCloud,
    Download,
    Eye,
    Edit,
    Plus,
    Save,
    X,
    Shield,
    BookOpen,
    Hash,
    Layers,
    UserCheck,
    Users,
    Briefcase,
    Search
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import { useToast } from '../../context/ToastContext';

const StudentProfile = () => {
    const baseUrl = 'http://localhost:5000';
    const { id } = useParams();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        admissionNumber: '',
        roll: '',
        class: '',
        section: '',
        gender: '',
        dob: '',
        category: '',
        religion: '',
        phone: '',
        email: '',
        admissionDate: '',
        bloodGroup: '',
        height: '',
        weight: '',
        fatherName: '',
        fatherPhone: '',
        fatherOccupation: '',
        motherName: '',
        motherPhone: '',
        motherOccupation: '',
        guardianName: '',
        guardianRelation: '',
        guardianPhone: '',
        guardianEmail: '',
        guardianOccupation: '',
        guardianAddress: '',
        currentAddress: '',
        permanentAddress: '',
    });

    const [documents, setDocuments] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const endpoint = id ? `/api/students/${id}` : '/api/students/me';
                const { data } = await api.get(endpoint);
                setStudent(data);
                if (data.documents) setDocuments(data.documents);
            } catch (error) {
                console.error('Error fetching student:', error);
                const errorMessage = error.response?.data?.message || error.message || 'Failed to load student data';
                if (id) showToast(errorMessage, 'error');
            } finally {
                setFetching(false);
            }
        };
        fetchStudent();
    }, [id]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const endpoint = id ? `/api/students/${id}` : '/api/students/me';
            await api.put(endpoint, student);
            showToast('Student profile updated successfully', 'success');
            setIsEditing(false);
        } catch (error) {
            console.error('Update student error:', error);
            showToast('Failed to update student profile', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', file.name);

        setUploading(true);
        try {
            const endpoint = id ? `/api/students/${id}/documents` : '/api/students/me/documents';
            // Note: need to ensure backend has /api/students/me/documents if we want this for self
            const { data } = await api.post(endpoint, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setDocuments(data.documents);
            showToast('Document uploaded successfully', 'success');
        } catch (error) {
            console.error('Upload error:', error);
            showToast('Failed to upload document', 'error');
        } finally {
            setUploading(false);
        }
    };

    const InfoCard = ({ icon: Icon, label, value, name, editable = true }) => (
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 italic transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 group text-left">
            <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 border border-slate-100 group-hover:text-[#7c32ff] group-hover:border-purple-100 transition-colors">
                    <Icon size={14} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{label}</span>
            </div>
            {isEditing && editable ? (
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => setStudent({ ...student, [name]: e.target.value })}
                    className="w-full bg-white border border-slate-100 rounded-lg px-2 py-1 text-[12px] font-black text-[#7c32ff] focus:ring-1 ring-purple-200 outline-none italic"
                />
            ) : (
                <p className="text-[12px] font-black text-slate-700 italic pl-11">{value || '---'}</p>
            )}
        </div>
    );

    if (fetching) return <div className="p-20 text-center text-slate-400 font-bold italic uppercase tracking-widest">Loading...</div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Student Profile</h1>
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Sidebar - Quick Info */}
                <div className="lg:col-span-3 space-y-6">
                    <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                        <div className="h-24 bg-[#7c32ff] w-full" />
                        <div className="px-6 pb-10 -mt-12 text-center relative z-10">
                            <div className="inline-block relative">
                                <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-xl">
                                    <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-slate-300 border border-slate-100 overflow-hidden">
                                        {student.photo ? (
                                            <img
                                                src={student.photo.startsWith('http') ? student.photo : `${baseUrl}${student.photo.replace(/\\/g, '/')}`}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
                                                }}
                                            />
                                        ) : (
                                            <User size={40} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <h2 className="text-xl font-black text-slate-800 italic uppercase">
                                    {isEditing ? (
                                        <div className="flex space-x-1 justify-center">
                                            <input
                                                type="text"
                                                value={student.firstName}
                                                onChange={(e) => setStudent({ ...student, firstName: e.target.value })}
                                                className="w-20 bg-slate-50 border-none rounded px-1 py-1 text-center outline-none focus:ring-1 ring-purple-200"
                                            />
                                            <input
                                                type="text"
                                                value={student.lastName}
                                                onChange={(e) => setStudent({ ...student, lastName: e.target.value })}
                                                className="w-20 bg-slate-50 border-none rounded px-1 py-1 text-center outline-none focus:ring-1 ring-purple-200"
                                            />
                                        </div>
                                    ) : (
                                        `${student.firstName} ${student.lastName}`
                                    )}
                                </h2>
                                <p className="text-[10px] font-black text-[#7c32ff] uppercase tracking-[0.2em] italic mt-1 px-4 py-1 bg-purple-50 rounded-full border border-purple-100 inline-block">
                                    Adm: {student.admissionNumber}
                                </p>
                            </div>

                            <div className="mt-10 space-y-2 text-left">
                                <div className="flex justify-between items-center py-3 border-b border-slate-50 italic">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Roll Number</span>
                                    <span className="text-[11px] font-black text-slate-700 italic">{student.roll || '---'}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-slate-50 italic">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Class</span>
                                    <span className="text-[11px] font-black text-slate-700 italic">
                                        {student.class?.name || (typeof student.class === 'string' ? student.class : '---')}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-3 italic">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Section</span>
                                    <span className="text-[11px] font-black text-slate-700 italic">{student.section || '---'}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Content Area - Details */}
                <div className="lg:col-span-9 space-y-6">
                    {/* Tabs */}
                    <div className="flex space-x-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                        {['profile', 'documents', 'timeline'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all capitalize ${activeTab === tab
                                    ? 'bg-white text-[#7c32ff] shadow-lg shadow-purple-500/10 border border-slate-100'
                                    : 'text-slate-400 hover:text-[#7c32ff] hover:bg-slate-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative min-h-[600px]">
                        {activeTab === 'profile' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12 italic">
                                {/* Personal Details */}
                                <div className="space-y-8">
                                    <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2 text-left">
                                        <User size={16} />
                                        <span>Personal Information</span>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 italic">
                                        <InfoCard icon={Layers} label="Admission Number" value={student.admissionNumber} name="admissionNumber" editable={false} />
                                        <InfoCard icon={Hash} label="Roll Number" value={student.roll} name="roll" />
                                        <InfoCard icon={BookOpen} label="Class" value={student.class?.name || (typeof student.class === 'string' ? student.class : '')} name="class" editable={false} />
                                        <InfoCard icon={Layers} label="Section" value={student.section} name="section" editable={false} />
                                        <InfoCard icon={UserCheck} label="Gender" value={student.gender} name="gender" />
                                        <InfoCard icon={Calendar} label="Date of Birth" value={student.dob ? (typeof student.dob === 'string' ? student.dob.split('T')[0] : '') : ''} name="dob" />
                                        <InfoCard icon={Layers} label="Category" value={student.category} name="category" />
                                        <InfoCard icon={Shield} label="Religion" value={student.religion} name="religion" />
                                        <InfoCard icon={Phone} label="Mobile Number" value={student.phone} name="phone" />
                                        <InfoCard icon={Mail} label="Email" value={student.email} name="email" />
                                        <InfoCard icon={Calendar} label="Admission Date" value={student.admissionDate ? (typeof student.admissionDate === 'string' ? student.admissionDate.split('T')[0] : '') : ''} name="admissionDate" />
                                        <InfoCard icon={History} label="Blood Group" value={student.bloodGroup} name="bloodGroup" />
                                    </div>
                                </div>

                                {/* Parent Information */}
                                <div className="space-y-8">
                                    <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2 text-left">
                                        <Users size={16} />
                                        <span>Parent / Guardian Information</span>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 italic">
                                        <InfoCard icon={User} label="Father Name" value={student.fatherName} name="fatherName" />
                                        <InfoCard icon={Phone} label="Father Phone" value={student.fatherPhone} name="fatherPhone" />
                                        <InfoCard icon={Briefcase} label="Father Occupation" value={student.fatherOccupation} name="fatherOccupation" />
                                        <InfoCard icon={User} label="Mother Name" value={student.motherName} name="motherName" />
                                        <InfoCard icon={Phone} label="Mother Phone" value={student.motherPhone} name="motherPhone" />
                                        <InfoCard icon={Briefcase} label="Mother Occupation" value={student.motherOccupation} name="motherOccupation" />
                                        <InfoCard icon={User} label="Guardian Name" value={student.guardianName} name="guardianName" />
                                        <InfoCard icon={Layers} label="Guardian Relation" value={student.guardianRelation} name="guardianRelation" />
                                        <InfoCard icon={Phone} label="Guardian Phone" value={student.guardianPhone} name="guardianPhone" />
                                        <InfoCard icon={Mail} label="Guardian Email" value={student.guardianEmail} name="guardianEmail" />
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="space-y-8 italic">
                                    <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2 text-left">
                                        <MapPin size={16} />
                                        <span>Address Information</span>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 italic">
                                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-3">Current Address</p>
                                            {isEditing ? (
                                                <textarea
                                                    value={student.currentAddress}
                                                    onChange={(e) => setStudent({ ...student, currentAddress: e.target.value })}
                                                    className="w-full bg-white border border-slate-100 rounded-lg px-3 py-2 text-[12px] font-black text-[#7c32ff] outline-none focus:ring-1 ring-purple-200 italic min-h-[80px]"
                                                />
                                            ) : (
                                                <p className="text-[12px] font-black text-slate-600 italic leading-relaxed">{student.currentAddress || 'No address provided'}</p>
                                            )}
                                        </div>
                                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-3">Permanent Address</p>
                                            {isEditing ? (
                                                <textarea
                                                    value={student.permanentAddress}
                                                    onChange={(e) => setStudent({ ...student, permanentAddress: e.target.value })}
                                                    className="w-full bg-white border border-slate-100 rounded-lg px-3 py-2 text-[12px] font-black text-[#7c32ff] outline-none focus:ring-1 ring-purple-200 italic min-h-[80px]"
                                                />
                                            ) : (
                                                <p className="text-[12px] font-black text-slate-600 italic leading-relaxed">{student.permanentAddress || 'No address provided'}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'documents' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 italic text-slate-800">
                                <div className="flex justify-between items-center mb-10 italic">
                                    <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2 text-left">
                                        <FileText size={16} />
                                        <span>Documents Vault</span>
                                    </h3>
                                    <div className="relative italic">
                                        <input
                                            type="file"
                                            onChange={handleFileUpload}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            disabled={uploading}
                                        />
                                        <Button
                                            className="bg-[#7c32ff]/10 hover:bg-[#7c32ff]/20 text-[#7c32ff] rounded-xl px-6 py-2 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all italic"
                                            disabled={uploading}
                                        >
                                            <UploadCloud size={14} />
                                            <span>{uploading ? 'Uploading...' : 'Upload Document'}</span>
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 italic">
                                    {documents.length > 0 ? (
                                        documents.map((doc, idx) => (
                                            <div key={idx} className="p-6 bg-slate-50 rounded-[28px] border border-slate-100 italic relative group text-left">
                                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#7c32ff] border border-slate-100 mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                    <FileText size={20} />
                                                </div>
                                                <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest italic mb-1 truncate">{doc.title}</h4>
                                                <p className="text-[9px] font-bold text-slate-400 italic mb-4">Added: {new Date(doc.createdAt).toLocaleDateString()}</p>
                                                <div className="flex items-center space-x-2 italic">
                                                    <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-xl text-slate-400 hover:text-[#7c32ff] border border-slate-100 transition-colors italic">
                                                        <Eye size={14} />
                                                    </a>
                                                    <a href={doc.fileUrl} download className="p-2 bg-white rounded-xl text-slate-400 hover:text-green-500 border border-slate-100 transition-colors italic">
                                                        <Download size={14} />
                                                    </a>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4 italic">
                                            <FileText size={48} className="text-slate-100" />
                                            <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] italic">No documents uploaded yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'timeline' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 italic">
                                <div className="flex justify-between items-center mb-10 italic">
                                    <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2 text-slate-800 text-left">
                                        <History size={16} />
                                        <span>Student Journey</span>
                                    </h3>
                                    <Button className="bg-[#7c32ff]/10 hover:bg-[#7c32ff]/20 text-[#7c32ff] rounded-xl px-6 py-2 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all italic">
                                        <Plus size={14} />
                                        <span>Add Event</span>
                                    </Button>
                                </div>

                                <div className="relative pl-8 italic">
                                    <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-slate-100 dashed italic" />
                                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 italic">
                                        <History size={40} className="text-slate-100" />
                                        <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] italic">No timeline events recorded</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
