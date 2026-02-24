import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Button, Input, Card } from '../../components/SnowUI';
import { Plus, Search, Filter, User, MoreHorizontal, Phone, Layers, X } from 'lucide-react';

const StudentDirectory = () => {
    const { school_slug } = useParams();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [classes, setClasses] = useState([]);
    const [step, setStep] = useState(1);
    const [newStudent, setNewStudent] = useState({
        firstName: '', lastName: '', admissionNumber: '', roll: '', class: '', section: '',
        fatherName: '', fatherOccupation: '', motherName: '', motherOccupation: '',
        phone: '', guardianName: '', guardianPhone: '', gender: 'Male',
        dob: '', bloodGroup: '', address: '', category: '', group: '', smsAlerts: true
    });

    const fetchData = async () => {
        try {
            const studentRes = await api.get('/api/students');
            const classRes = await api.get('/api/academic/classes');
            setStudents(studentRes.data);
            setClasses(classRes.data);
        } catch (error) {
            console.error('Error fetching data');
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleAdmission = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/students', newStudent);
            setShowAddModal(false);
            setStep(1);
            setNewStudent({
                firstName: '', lastName: '', admissionNumber: '', roll: '', class: '', section: '',
                fatherName: '', fatherOccupation: '', motherName: '', motherOccupation: '',
                phone: '', guardianName: '', guardianPhone: '', gender: 'Male',
                dob: '', bloodGroup: '', address: '', category: '', group: '', smsAlerts: true
            });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error admitting student');
        }
    };

    const filteredStudents = students.filter(s =>
        (s.firstName?.toLowerCase().includes(search.toLowerCase()) ||
            s.lastName?.toLowerCase().includes(search.toLowerCase())) ||
        s.admissionNumber?.includes(search)
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Student Directory</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Student Info</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Student Directory</span>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <Button
                        onClick={() => setShowAddModal(true)}
                        className="bg-[#1C1C1C] hover:bg-black text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                    >
                        <Plus size={14} strokeWidth={3} />
                        <span>NEW ADMISSION</span>
                    </Button>
                </div>
            </div>

            <div className="flex space-x-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, admission no..."
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-slate-100"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map(student => (
                    <Card key={student._id} className="hover:shadow-xl hover:shadow-slate-200/50 transition-all border-none group">
                        <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 overflow-hidden border border-slate-100">
                                {student.photo ? (
                                    <img src={student.photo} alt={student.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={32} />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-800 truncate">{student.firstName} {student.lastName}</h3>
                                    <MoreHorizontal size={18} className="text-slate-300 cursor-pointer hover:text-primary" />
                                </div>
                                <div className="text-xs font-bold text-primary/70 uppercase tracking-widest mt-0.5">
                                    ROLL {student.roll || 'N/A'} • ADM {student.admissionNumber}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center space-x-3 text-sm text-slate-500 bg-slate-50 p-2 rounded-lg">
                                <div className="bg-white p-1 rounded shadow-sm">
                                    <Layers size={14} className="text-primary" />
                                </div>
                                <span className="font-semibold text-slate-700">Class {student.class?.name} - {student.section}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-slate-400">
                                <Phone size={14} />
                                <span>{student.phone || 'No contact info'}</span>
                            </div>
                        </div>

                        <div className="mt-6 flex space-x-2">
                            <Button
                                variant="ghost"
                                className="flex-1 text-xs h-9"
                                onClick={() => navigate(`/${school_slug}/student-profile/${student._id}`)}
                            >
                                Profile
                            </Button>
                            <Button variant="ghost" className="flex-1 text-xs h-9">Fees</Button>
                        </div>
                    </Card>
                ))}
            </div>

            {filteredStudents.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                    <User size={48} className="mx-auto text-slate-100 mb-4" />
                    <p className="text-slate-400">No students found matching your search</p>
                </div>
            )}

            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 shadow-[0_0_100px_rgba(0,0,0,0.2)] overflow-y-auto">
                    <Card className="w-full max-w-2xl animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto mt-10">
                        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-4 border-b border-slate-50">
                            <div>
                                <h2 className="text-2xl font-bold text-primary">New Admission</h2>
                                <p className="text-slate-400 text-sm font-medium">
                                    Step {step} of 3 - {step === 1 ? 'Academic details' : step === 2 ? 'Guardian Details' : 'Other Info'}
                                </p>
                            </div>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-red-500 transition-colors"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleAdmission} className="space-y-6">
                            {step === 1 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
                                    <Input label="First Name" placeholder="e.g. John" value={newStudent.firstName} onChange={e => setNewStudent({ ...newStudent, firstName: e.target.value })} required />
                                    <Input label="Last Name" placeholder="e.g. Doe" value={newStudent.lastName} onChange={e => setNewStudent({ ...newStudent, lastName: e.target.value })} required />
                                    <Input label="Admission Number" placeholder="ADM-2024-001" value={newStudent.admissionNumber} onChange={e => setNewStudent({ ...newStudent, admissionNumber: e.target.value })} required />
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-tight">Class</label>
                                        <select
                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all font-medium text-slate-700"
                                            value={newStudent.class}
                                            onChange={e => setNewStudent({ ...newStudent, class: e.target.value })}
                                            required
                                        >
                                            <option value="">Select Class</option>
                                            {classes.map(c => <option key={c._id} value={c._id}>Class {c.name}</option>)}
                                        </select>
                                    </div>
                                    <Input label="Section" placeholder="e.g. A" value={newStudent.section} onChange={e => setNewStudent({ ...newStudent, section: e.target.value })} required />
                                    <Input label="Roll Number" placeholder="e.g. 01" value={newStudent.roll} onChange={e => setNewStudent({ ...newStudent, roll: e.target.value })} />
                                    <Input label="Date of Birth" type="date" value={newStudent.dob} onChange={e => setNewStudent({ ...newStudent, dob: e.target.value })} />
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Gender</label>
                                        <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                                            {['Male', 'Female', 'Other'].map(g => (
                                                <button
                                                    key={g} type="button"
                                                    onClick={() => setNewStudent({ ...newStudent, gender: g })}
                                                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${newStudent.gender === g ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                                                >
                                                    {g}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : step === 2 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
                                    <Input label="Father's Name" value={newStudent.fatherName} onChange={e => setNewStudent({ ...newStudent, fatherName: e.target.value })} required />
                                    <Input label="Father's Occupation" value={newStudent.fatherOccupation} onChange={e => setNewStudent({ ...newStudent, fatherOccupation: e.target.value })} />
                                    <Input label="Mother's Name" value={newStudent.motherName} onChange={e => setNewStudent({ ...newStudent, motherName: e.target.value })} />
                                    <Input label="Mother's Occupation" value={newStudent.motherOccupation} onChange={e => setNewStudent({ ...newStudent, motherOccupation: e.target.value })} />
                                    <Input label="Guardian Name" value={newStudent.guardianName} onChange={e => setNewStudent({ ...newStudent, guardianName: e.target.value })} />
                                    <Input label="Guardian Phone" value={newStudent.guardianPhone} onChange={e => setNewStudent({ ...newStudent, guardianPhone: e.target.value })} />
                                    <Input label="Contact Number" placeholder="+91 XXXXX XXXXX" value={newStudent.phone} onChange={e => setNewStudent({ ...newStudent, phone: e.target.value })} required className="col-span-2" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
                                    <Input label="Blood Group" placeholder="e.g. O+" value={newStudent.bloodGroup} onChange={e => setNewStudent({ ...newStudent, bloodGroup: e.target.value })} />
                                    <Input label="Category" placeholder="e.g. General, OBC" value={newStudent.category} onChange={e => setNewStudent({ ...newStudent, category: e.target.value })} />
                                    <Input label="Group/Club" placeholder="e.g. Science Club" value={newStudent.group} onChange={e => setNewStudent({ ...newStudent, group: e.target.value })} />
                                    <Input label="Address" value={newStudent.address} onChange={e => setNewStudent({ ...newStudent, address: e.target.value })} className="md:col-span-2" />
                                    <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-xl md:col-span-2">
                                        <input
                                            type="checkbox"
                                            id="sms"
                                            checked={newStudent.smsAlerts}
                                            onChange={e => setNewStudent({ ...newStudent, smsAlerts: e.target.checked })}
                                            className="w-5 h-5 accent-primary"
                                        />
                                        <label htmlFor="sms" className="text-sm font-medium text-slate-700">Enable SMS Alerts for Parents</label>
                                    </div>
                                </div>
                            )}

                            <div className="flex space-x-3 pt-6 border-t border-slate-100 sticky bottom-0 bg-white z-10">
                                {step > 1 && <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(step - 1)}>Back</Button>}
                                {step < 3 ? (
                                    <Button type="button" className="flex-1 font-bold h-12 rounded-2xl" onClick={() => setStep(step + 1)}>Next Step</Button>
                                ) : (
                                    <Button type="submit" className="flex-1 font-bold h-12 rounded-2xl shadow-lg shadow-primary/20">Complete Admission</Button>
                                )}
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default StudentDirectory;
