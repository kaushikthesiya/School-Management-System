import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../../components/SnowUI';
import api from '../../api/api';
import {
    Search,
    Save,
    ChevronDown,
    Printer,
    Columns,
    ArrowUpDown,
    Copy,
    FileSpreadsheet,
    FileText,
    FileCode,
    Trash2,
    Users,
    X,
    Check
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const StudentGroup = () => {
    const { showToast } = useToast();
    const [groupName, setGroupName] = useState('');
    const [groups, setGroups] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [manageGroup, setManageGroup] = useState(null);
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);
    const [updatingMembers, setUpdatingMembers] = useState(false);
    const [studentSearch, setStudentSearch] = useState('');

    const fetchData = async () => {
        try {
            const [groupsRes, studentsRes] = await Promise.all([
                api.get('/api/academic/student-groups'),
                api.get('/api/students')
            ]);
            setGroups(groupsRes.data);
            setAllStudents(studentsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async () => {
        if (!groupName) return;
        setLoading(true);
        try {
            await api.post('/api/academic/student-groups', { name: groupName });
            setGroupName('');
            showToast('Student Group added successfully!');
            fetchData();
        } catch (error) {
            console.error('Error adding group:', error);
            showToast('Error adding group', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this group?')) return;
        try {
            await api.delete(`/api/academic/student-groups/${id}`);
            showToast('Student Group deleted successfully!');
            fetchData();
        } catch (error) {
            console.error('Error deleting group:', error);
            showToast('Error deleting group', 'error');
        }
    };

    const handleOpenManage = (group) => {
        setManageGroup(group);
        setSelectedStudentIds(group.students.map(s => s._id || s));
    };

    const handleUpdateMembers = async () => {
        setUpdatingMembers(true);
        try {
            await api.patch(`/api/academic/student-groups/${manageGroup._id}/students`, {
                studentIds: selectedStudentIds
            });
            showToast('Group members updated successfully');
            setManageGroup(null);
            fetchData();
        } catch (error) {
            showToast('Failed to update members', 'error');
        } finally {
            setUpdatingMembers(false);
        }
    };

    const toggleStudent = (id) => {
        setSelectedStudentIds(prev =>
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        );
    };

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );

    const filteredStudents = allStudents.filter(s =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.admissionNumber?.toLowerCase().includes(studentSearch.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">

            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Student Group</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Student Info</span>
                        <span>|</span>
                        <span className="text-[#7c32ff]">Student Group</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Add Student Group Form */}
                <div className="lg:col-span-4">
                    <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl sticky top-6">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">Add Student Group</h3>

                        <div className="space-y-6">
                            <div className="space-y-1.5">
                                <Label required>GROUP</Label>
                                <Input
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    placeholder="Enter Group Name"
                                    className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold"
                                    required
                                />
                            </div>

                            <div className="flex justify-center pt-4">
                                <Button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] flex items-center space-x-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                                >
                                    <Save size={16} strokeWidth={3} />
                                    <span>{loading ? 'SAVING...' : 'SAVE GROUP'}</span>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Student Group List Table */}
                <div className="lg:col-span-8">
                    <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden min-h-[400px]">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Student Group List</h3>

                            <div className="flex items-center space-x-4">
                                <div className="flex border border-purple-100 rounded-xl overflow-hidden shadow-sm">
                                    {[Copy, FileSpreadsheet, FileText, FileCode, Printer, Columns].map((Icon, i) => (
                                        <button key={i} className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors border-r border-purple-50 last:border-r-0">
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
                                        {['Group', 'Students', 'Actions'].map((header, idx) => (
                                            <th key={idx} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                                <div className="flex items-center space-x-2">
                                                    <span>{header}</span>
                                                    {header !== 'Actions' && <ArrowUpDown size={10} />}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {groups.map((group) => (
                                        <tr key={group._id} className="hover:bg-slate-50/30 transition-colors group border-b border-slate-50 last:border-0">
                                            <td className="px-6 py-5 text-xs font-bold text-slate-500 uppercase italic tracking-tighter">{group.name}</td>
                                            <td className="px-6 py-5">
                                                <span className="bg-purple-50 text-[#7c32ff] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-100">
                                                    {group.students?.length || 0} MEMBERS
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleOpenManage(group)}
                                                        className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-[#7c32ff] hover:text-[#7c32ff] transition-all flex items-center space-x-2 shadow-sm"
                                                    >
                                                        <Users size={12} strokeWidth={3} />
                                                        <span>MANAGE</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(group._id)}
                                                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {groups.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-12 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest italic tracking-tight">
                                                No groups found. Create one!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Manage Members Modal */}
            {manageGroup && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <Card className="w-full max-w-2xl bg-white rounded-[32px] p-0 shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh]">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
                            <div>
                                <h3 className="text-lg font-black text-slate-800 uppercase italic tracking-tight flex items-center space-x-3">
                                    <span className="w-1.5 h-6 bg-[#7c32ff] rounded-full" />
                                    <span>Manage Group Members</span>
                                </h3>
                                <p className="text-[10px] font-black text-[#7c32ff] uppercase tracking-widest mt-1 italic">
                                    GROUP: {manageGroup.name} • {selectedStudentIds.length} SELECTED
                                </p>
                            </div>
                            <button onClick={() => setManageGroup(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="p-6 bg-slate-50/50 border-b border-slate-100 sticky top-[108px] z-10">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                                <input
                                    type="text"
                                    placeholder="SEARCH STUDENTS BY NAME OR ADMISSION NO..."
                                    value={studentSearch}
                                    onChange={(e) => setStudentSearch(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-purple-500/5 focus:border-[#7c32ff] outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredStudents.map(student => {
                                    const isSelected = selectedStudentIds.includes(student._id);
                                    return (
                                        <div
                                            key={student._id}
                                            onClick={() => toggleStudent(student._id)}
                                            className={`p-4 rounded-[20px] border-2 cursor-pointer transition-all flex items-center justify-between group ${isSelected
                                                    ? 'bg-purple-50 border-[#7c32ff] shadow-lg shadow-purple-500/5'
                                                    : 'bg-white border-slate-100 hover:border-slate-200'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${isSelected ? 'bg-[#7c32ff] text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                                                    }`}>
                                                    {student.firstName[0]}{student.lastName[0]}
                                                </div>
                                                <div>
                                                    <p className={`text-[11px] font-black uppercase italic ${isSelected ? 'text-[#7c32ff]' : 'text-slate-700'}`}>
                                                        {student.firstName} {student.lastName}
                                                    </p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                                        ADM: {student.admissionNumber} • {student.class?.name || 'UNASSIGNED'}
                                                    </p>
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <div className="w-5 h-5 bg-[#7c32ff] rounded-full flex items-center justify-center text-white">
                                                    <Check size={12} strokeWidth={4} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="p-8 bg-white border-t border-slate-50 sticky bottom-0 z-10 flex justify-end">
                            <Button
                                onClick={handleUpdateMembers}
                                disabled={updatingMembers}
                                className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-5 shadow-2xl shadow-purple-500/20 text-[11px] font-black uppercase tracking-[0.2em] italic flex items-center space-x-3 active:scale-95 transition-all"
                            >
                                <Save size={18} strokeWidth={3} />
                                <span>{updatingMembers ? 'UPDATING...' : 'UPDATE MEMBERS'}</span>
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default StudentGroup;

