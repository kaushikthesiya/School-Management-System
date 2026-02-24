import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../../components/SnowUI';
import {
    Search,
    Printer,
    Columns,
    ArrowUpDown,
    Copy,
    FileSpreadsheet,
    FileText,
    FileCode,
    UserPlus,
    X,
    ChevronDown
} from 'lucide-react';
import api from '../../api/api';
import { useToast } from '../../context/ToastContext';

const UnassignedStudent = () => {
    const { showToast } = useToast();
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [assigningLoading, setAssigningLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // For Assignment Modal/Inline
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [assignmentData, setAssignmentData] = useState({
        class: '',
        section: '',
        academicYear: ''
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [studentsRes, classesRes, sessionsRes] = await Promise.all([
                api.get('/api/students?classId=unassigned'),
                api.get('/api/academic/classes'),
                api.get('/api/academic/sessions')
            ]);
            setStudents(studentsRes.data);
            setClasses(classesRes.data);
            setSessions(sessionsRes.data);
        } catch (error) {
            console.error('Failed to fetch data');
            showToast('Failed to load data', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAssign = async (e) => {
        e.preventDefault();
        if (!selectedStudent || !assignmentData.class || !assignmentData.section || !assignmentData.academicYear) {
            showToast('Please fill all fields', 'error');
            return;
        }

        setAssigningLoading(true);
        try {
            await api.patch(`/api/students/${selectedStudent._id}`, {
                class: assignmentData.class,
                section: assignmentData.section,
                academicYear: assignmentData.academicYear
            });
            showToast('Student assigned successfully');
            setSelectedStudent(null);
            fetchData();
        } catch (error) {
            console.error('Assignment Error:', error);
            showToast(error.response?.data?.message || 'Error assigning class', 'error');
        } finally {
            setAssigningLoading(false);
        }
    };

    const filteredStudents = students.filter(s =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.admissionNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">

            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Unassigned Student List</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Student Info</span>
                        <span>|</span>
                        <span className="text-[#7c32ff]">Unassigned Student List</span>
                    </div>
                </div>
            </div>

            {/* Unassigned Student Table Card */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                        <input
                            type="text"
                            placeholder="QUICK SEARCH"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-500 outline-none focus:border-[#7c32ff] transition-all w-64 tracking-widest uppercase"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex border border-purple-100 rounded-xl overflow-hidden shadow-sm">
                            {[Copy, FileSpreadsheet, FileText, FileCode, Printer, Columns].map((Icon, idx) => (
                                <button key={idx} className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors border-r border-purple-50 last:border-0">
                                    <Icon size={16} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                {['Admission No', 'Name', 'Father Name', 'Date Of Birth', 'Gender', 'Phone', 'Actions'].map((header, idx) => (
                                    <th key={idx} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                        <div className="flex items-center space-x-2">
                                            <span>{header}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest italic tracking-tight">Processing...</td>
                                </tr>
                            ) : filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest italic tracking-tight">No unassigned students found</td>
                                </tr>
                            ) : filteredStudents.map(student => (
                                <tr key={student._id} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="px-6 py-4 text-[11px] font-black text-slate-700 italic uppercase">{student.admissionNumber}</td>
                                    <td className="px-6 py-4 text-[11px] font-bold text-slate-600">{student.firstName} {student.lastName}</td>
                                    <td className="px-6 py-4 text-[11px] font-bold text-slate-500">{student.fatherName || '-'}</td>
                                    <td className="px-6 py-4 text-[11px] font-bold text-slate-500">{student.dob ? new Date(student.dob).toLocaleDateString() : '-'}</td>
                                    <td className="px-6 py-4 text-[11px] font-bold text-slate-500">{student.gender}</td>
                                    <td className="px-6 py-4 text-[11px] font-bold text-slate-500">{student.mobileNumber || '-'}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => setSelectedStudent(student)}
                                            className="p-2 bg-purple-50 text-[#7c32ff] rounded-lg hover:bg-[#7c32ff] hover:text-white transition-all transform hover:scale-105"
                                            title="Assign to Class"
                                        >
                                            <UserPlus size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Assignment Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
                    <Card className="w-full max-w-md bg-white rounded-[40px] p-0 shadow-2xl relative overflow-hidden border-none">
                        {/* Dark Header */}
                        <div className="bg-[#1C1C1E] p-8 flex justify-between items-center relative">
                            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">
                                Assign Class / Section
                            </h3>
                            <button
                                onClick={() => setSelectedStudent(null)}
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group"
                            >
                                <X size={20} className="text-white group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        <div className="p-10 space-y-8">
                            {/* Student Info Card */}
                            <div className="bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6 flex items-center space-x-5 shadow-sm">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-50">
                                    <div className="relative">
                                        <div className="w-6 h-5 border-2 border-[#7c32ff] rounded-[4px] transform -rotate-12 absolute -top-1 -left-1 opacity-40"></div>
                                        <div className="w-6 h-5 border-2 border-[#7c32ff] rounded-[4px] relative z-10 bg-white"></div>
                                        <div className="w-6 h-5 border-2 border-[#7c32ff] rounded-[4px] transform rotate-12 absolute -bottom-1 -right-1 opacity-40"></div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-800 uppercase italic leading-tight">
                                        {selectedStudent.firstName} {selectedStudent.lastName}
                                    </h4>
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                        ADM: {selectedStudent.admissionNumber}
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleAssign} className="space-y-6">
                                <div className="relative group">
                                    <select
                                        className="w-full bg-[#F8FAFC] border border-slate-100 rounded-2xl px-6 py-5 text-xs font-bold text-slate-600 focus:ring-4 focus:ring-purple-500/5 focus:border-[#7c32ff] outline-none transition-all appearance-none cursor-pointer"
                                        value={assignmentData.academicYear}
                                        onChange={(e) => setAssignmentData({ ...assignmentData, academicYear: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Academic Year</option>
                                        {sessions.map(s => <option key={s._id} value={s._id}>{s.year}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" />
                                </div>

                                <div className="relative group">
                                    <select
                                        className="w-full bg-[#F8FAFC] border border-slate-100 rounded-2xl px-6 py-5 text-xs font-bold text-slate-600 focus:ring-4 focus:ring-purple-500/5 focus:border-[#7c32ff] outline-none transition-all appearance-none cursor-pointer"
                                        value={assignmentData.class}
                                        onChange={(e) => setAssignmentData({ ...assignmentData, class: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" />
                                </div>

                                <div className="relative group">
                                    <select
                                        className="w-full bg-[#F8FAFC] border border-slate-100 rounded-2xl px-6 py-5 text-xs font-bold text-slate-600 focus:ring-4 focus:ring-purple-500/5 focus:border-[#7c32ff] outline-none transition-all appearance-none cursor-pointer"
                                        value={assignmentData.section}
                                        onChange={(e) => setAssignmentData({ ...assignmentData, section: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Section</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" />
                                </div>

                                <div className="flex space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedStudent(null)}
                                        className="flex-1 bg-white border border-slate-200 text-slate-500 rounded-2xl py-5 text-[11px] font-black uppercase tracking-[0.2em] italic hover:bg-slate-50 hover:border-blue-400 active:scale-95 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={assigningLoading}
                                        className="flex-1 bg-[#1C1C1E] text-white rounded-2xl py-5 shadow-xl shadow-slate-900/10 text-[11px] font-black uppercase tracking-[0.2em] italic flex items-center justify-center space-x-3 transform active:scale-95 hover:bg-black transition-all"
                                    >
                                        <span>{assigningLoading ? 'SAVING...' : 'SAVE CHANGES'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default UnassignedStudent;

