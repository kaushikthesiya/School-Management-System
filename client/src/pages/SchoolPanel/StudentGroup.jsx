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
    Trash2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const StudentGroup = () => {
    const { showToast } = useToast();
    const [groupName, setGroupName] = useState('');
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchGroups = async () => {
        try {
            const { data } = await api.get('/api/academic/student-groups');
            setGroups(data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleSubmit = async () => {
        if (!groupName) return;
        setLoading(true);
        try {
            await api.post('/api/academic/student-groups', { name: groupName });
            setGroupName('');
            showToast('Student Group added successfully!');
            fetchGroups();
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
            fetchGroups();
        } catch (error) {
            console.error('Error deleting group:', error);
            showToast('Error deleting group', 'error');
        }
    };

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
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
                    <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Student Group List</h3>

                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                    <input
                                        type="text"
                                        placeholder="SEARCH"
                                        className="pl-10 pr-4 py-2 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-500 outline-none focus:border-[#7c32ff] transition-all w-48 tracking-widest uppercase"
                                    />
                                </div>

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
                                        <tr key={group._id} className="hover:bg-slate-50/30 transition-colors group">
                                            <td className="px-6 py-5 text-xs font-bold text-slate-500">{group.name}</td>
                                            <td className="px-6 py-5 text-xs font-bold text-slate-500">
                                                {group.students?.length || 0}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center space-x-2">
                                                    <button className="px-4 py-2 border border-purple-100 rounded-full text-[10px] font-black text-[#7c32ff] uppercase tracking-widest hover:bg-[#7c32ff] hover:text-white hover:border-[#7c32ff] transition-all flex items-center space-x-2">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={12} />
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
                                            <td colSpan="3" className="px-6 py-8 text-center text-xs font-bold text-slate-400 italic mix-blend-multiply">
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
        </div>
    );
};

export default StudentGroup;
