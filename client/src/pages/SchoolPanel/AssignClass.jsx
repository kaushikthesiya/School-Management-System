import React, { useState, useEffect } from 'react';
import { Card, Button } from '../../components/SnowUI';
import {
    User,
    Plus,
    X,
    Trash2,
    Calendar,
    Layers,
    BookOpen,
    Hash,
    QrCode,
    Save,
    MapPin,
    Phone,
    Mail,
    ArrowLeft
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useToast } from '../../context/ToastContext';

const AssignClass = () => {
    const { id, school_slug } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [saving, setSaving] = useState(false);
    const [student, setStudent] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);

    // For Add Assignment Modal
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [newAssignment, setNewAssignment] = useState({
        classId: '',
        sectionId: '',
        academicYearId: '',
        isPrimary: false
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentRes, assignmentsRes, classesRes, yearsRes] = await Promise.all([
                    api.get(`/api/students/${id}`),
                    api.get(`/api/students/multi-class?studentId=${id}`), // Need to verify this endpoint
                    api.get('/api/academic/classes'),
                    api.get('/api/academic/sessions')
                ]);

                setStudent(studentRes.data);
                // The assignmentsRes might need processing if it returns full list
                // For now, let's assume it returns assignments for this student
                setAssignments(assignmentsRes.data.find(a => a.student._id === id)?.assignments || []);
                setClasses(classesRes.data);
                setAcademicYears(yearsRes.data);

                if (classesRes.data.length > 0) {
                    setNewAssignment(prev => ({ ...prev, classId: classesRes.data[0]._id }));
                }
                if (yearsRes.data.length > 0) {
                    setNewAssignment(prev => ({ ...prev, academicYearId: yearsRes.data.find(y => y.isCurrent)?._id || yearsRes.data[0]._id }));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                showToast('Failed to load data', 'error');
            } finally {
                setFetching(false);
            }
        };
        fetchData();
    }, [id]);

    const handleAddAssignment = async () => {
        if (!newAssignment.classId || !newAssignment.sectionId || !newAssignment.academicYearId) {
            showToast('Please select all fields', 'warning');
            return;
        }

        setSaving(true);
        try {
            // Re-using the bulk update logic
            const currentAssignments = assignments.map(a => ({
                classId: a.class._id,
                section: a.section,
                academicYearId: a.academicYear._id
            }));

            const updatedAssignments = [...currentAssignments, {
                classId: newAssignment.classId,
                section: newAssignment.sectionId,
                academicYearId: newAssignment.academicYearId
            }];

            await api.post(`/api/students/${id}/multi-class/bulk`, {
                assignments: updatedAssignments,
                // If the new one is primary, we'd update Student model too
                // But the UI shows "ADD" for additional ones usually.
                // Let's stick to the bulk update pattern.
                primaryClass: newAssignment.isPrimary ? newAssignment.classId : student.class?._id,
                primarySection: newAssignment.isPrimary ? newAssignment.sectionId : student.section
            });

            showToast('Assignment added successfully');
            setShowAddModal(false);
            // Refresh data
            window.location.reload();
        } catch (error) {
            showToast('Failed to add assignment', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAssignment = async (assignmentId) => {
        if (!window.confirm('Are you sure you want to delete this assignment?')) return;

        try {
            const updatedAssignments = assignments.filter(a => a._id !== assignmentId).map(a => ({
                classId: a.class._id,
                section: a.section,
                academicYearId: a.academicYear._id
            }));

            await api.post(`/api/students/${id}/multi-class/bulk`, {
                assignments: updatedAssignments
            });

            showToast('Assignment deleted successfully');
            setAssignments(prev => prev.filter(a => a._id !== assignmentId));
        } catch (error) {
            showToast('Failed to delete assignment', 'error');
        }
    };

    if (fetching) return <div className="p-20 text-center text-slate-400 font-bold italic uppercase tracking-widest animate-pulse">Loading Student Data...</div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800 font-sans">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate(`/${school_slug}/student-list`)}
                        className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#7c32ff] hover:bg-purple-50 transition-all border border-slate-100"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Assign Class</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Sidebar - Student Profile Card */}
                <div className="lg:col-span-3 space-y-6">
                    <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white rounded-[40px] overflow-hidden relative font-sans border-2 border-slate-50">
                        <div className="h-28 bg-[#7c32ff] w-full" />

                        <div className="px-8 pb-12 -mt-14 text-center relative z-10">
                            <div className="inline-block relative">
                                <div className="w-28 h-28 rounded-[35px] bg-white p-1.5 shadow-2xl">
                                    <div className="w-full h-full rounded-[30px] bg-slate-50 flex items-center justify-center text-slate-200 border border-slate-100 overflow-hidden">
                                        {student?.photo ? (
                                            <img src={`http://localhost:5000${student.photo}`} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={48} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-2">
                                <h2 className="text-2xl font-black text-slate-800 italic uppercase leading-none">
                                    {student?.firstName} {student?.lastName}
                                </h2>
                                <p className="text-[10px] font-black text-[#7c32ff] uppercase tracking-[0.2em] italic bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100 inline-block">
                                    Adm: {student?.admissionNumber}
                                </p>
                            </div>

                            <div className="mt-10 space-y-1 text-left">
                                <div className="flex justify-between items-center py-4 border-b border-slate-50 italic">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Roll Number</span>
                                    <span className="text-[12px] font-black text-slate-700 italic">{student?.rollNumber || '---'}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-slate-50 italic">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Class</span>
                                    <span className="text-[12px] font-black text-slate-700 italic">{student?.class?.name || '---'}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 italic">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Section</span>
                                    <span className="text-[12px] font-black text-slate-700 italic">{student?.section || '---'}</span>
                                </div>
                            </div>

                            <div className="pt-10 flex flex-col items-center space-y-4">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] italic">Student Token</span>
                                <div className="p-6 bg-slate-50 rounded-[35px] border border-slate-100 shadow-inner group transition-all hover:bg-white hover:shadow-xl duration-500">
                                    <QrCode size={100} className="text-slate-800 transition-transform group-hover:scale-110" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Content - Enrollment List */}
                <div className="lg:col-span-9 space-y-6">
                    <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[40px] overflow-hidden min-h-[700px] border-2 border-slate-50">
                        <div className="flex justify-between items-center mb-12">
                            <div className="space-y-1">
                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight italic">Enrollment List</h3>
                                <div className="h-1 w-12 bg-[#7c32ff] rounded-full" />
                            </div>
                            <Button
                                onClick={() => setShowAddModal(true)}
                                className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-[20px] px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-purple-500/30 flex items-center space-x-3 transition-all active:scale-95 italic group"
                            >
                                <Plus size={16} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
                                <span>ADD</span>
                            </Button>
                        </div>

                        <div className="overflow-hidden rounded-[30px] border border-slate-50 shadow-sm">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100 italic">
                                        <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Class</th>
                                        <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Section</th>
                                        <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Academic Year</th>
                                        <th className="text-right py-6 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Primary Enrollment */}
                                    <tr className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors italic group">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center font-black text-xs italic">
                                                    {student?.class?.name?.[0]}
                                                </div>
                                                <span className="text-[13px] font-black text-slate-700 italic uppercase">{student?.class?.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8 text-[13px] font-black text-slate-600 italic uppercase">{student?.section}</td>
                                        <td className="py-6 px-8">
                                            <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest italic border border-green-100">Primary</span>
                                        </td>
                                        <td className="py-6 px-8 text-right">
                                            <span className="text-[11px] font-black text-slate-300 italic uppercase">Default</span>
                                        </td>
                                    </tr>

                                    {/* Secondary Enrollments */}
                                    {assignments.map((assignment) => (
                                        <tr key={assignment._id} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors italic group">
                                            <td className="py-6 px-8">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7c32ff] flex items-center justify-center font-black text-xs italic">
                                                        {assignment.class?.name?.[0]}
                                                    </div>
                                                    <span className="text-[13px] font-black text-slate-700 italic uppercase">{assignment.class?.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 px-8 text-[13px] font-black text-slate-600 italic uppercase">{assignment.section}</td>
                                            <td className="py-6 px-8 text-[13px] font-black text-slate-500 italic uppercase">{assignment.academicYear?.year}</td>
                                            <td className="py-6 px-8 text-right">
                                                <button
                                                    onClick={() => handleDeleteAssignment(assignment._id)}
                                                    className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm group-hover:scale-105"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {assignments.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="py-32 text-center">
                                                <div className="flex flex-col items-center space-y-4 opacity-20">
                                                    <Layers size={64} className="text-slate-300" />
                                                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">No secondary assignments</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Add Assignment Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[1000] flex items-center justify-center p-4 font-sans animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-lg rounded-[45px] shadow-2xl relative overflow-hidden border-4 border-white animate-in zoom-in-95 duration-500">
                        {/* Modal Header */}
                        <div className="p-10 pb-6 flex justify-between items-center text-slate-800">
                            <div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tight">Assign Class / Section</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic mt-1">Multi Class Enrollment</p>
                            </div>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all group"
                            >
                                <X size={24} className="group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>

                        <div className="p-10 pt-4 space-y-8">
                            {/* Academic Year */}
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] italic ml-2">Academic Year</label>
                                <select
                                    value={newAssignment.academicYearId}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, academicYearId: e.target.value })}
                                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-[25px] px-8 py-5 text-[13px] font-black text-slate-700 outline-none focus:border-[#7c32ff] transition-all italic appearance-none cursor-pointer"
                                >
                                    <option value="">Select Year</option>
                                    {academicYears.map(year => (
                                        <option key={year._id} value={year._id}>{year.year}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Class */}
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] italic ml-2">Class</label>
                                <select
                                    value={newAssignment.classId}
                                    onChange={(e) => {
                                        const selectedClass = classes.find(c => c._id === e.target.value);
                                        setNewAssignment({ ...newAssignment, classId: e.target.value, sectionId: '' });
                                        setSections(selectedClass?.sections || []);
                                    }}
                                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-[25px] px-8 py-5 text-[13px] font-black text-slate-700 outline-none focus:border-[#7c32ff] transition-all italic appearance-none cursor-pointer"
                                >
                                    <option value="">Select Class</option>
                                    {classes.map(c => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Section */}
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] italic ml-2">Section</label>
                                <select
                                    value={newAssignment.sectionId}
                                    onChange={(e) => setNewAssignment({ ...newAssignment, sectionId: e.target.value })}
                                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-[25px] px-8 py-5 text-[13px] font-black text-slate-700 outline-none focus:border-[#7c32ff] transition-all italic appearance-none cursor-pointer"
                                >
                                    <option value="">Select Section</option>
                                    {sections.map((s, idx) => (
                                        <option key={idx} value={typeof s === 'string' ? s : s.name}>{typeof s === 'string' ? s : s.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Set Primary Radio */}
                            <div className="flex items-center space-x-4 p-6 bg-slate-50 rounded-[30px] border-2 border-slate-50 transition-all hover:bg-purple-50 hover:border-purple-100 group cursor-pointer"
                                onClick={() => setNewAssignment({ ...newAssignment, isPrimary: !newAssignment.isPrimary })}>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${newAssignment.isPrimary ? 'border-[#7c32ff] bg-[#7c32ff]' : 'border-slate-200 bg-white'}`}>
                                    {newAssignment.isPrimary && <div className="w-2.5 h-2.5 rounded-full bg-white animate-in zoom-in" />}
                                </div>
                                <div>
                                    <p className="text-[12px] font-black text-slate-700 italic uppercase">Make Primary Enrollment</p>
                                    <p className="text-[9px] font-bold text-slate-400 italic">This will update the student's main class assignment</p>
                                </div>
                            </div>

                            <Button
                                onClick={handleAddAssignment}
                                disabled={saving}
                                className="w-full bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-[25px] py-6 text-[12px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-purple-500/40 flex items-center justify-center space-x-3 transition-all active:scale-95 italic mt-10"
                            >
                                {saving ? (
                                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Save size={18} />
                                        <span>SAVE ASSIGNMENT</span>
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Decorative Background Element */}
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-50 rounded-full blur-3xl -z-10 opacity-50" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignClass;
