import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Search,
    ChevronDown,
    Layout,
    Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const DueFeesLoginPermission = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [toggling, setToggling] = useState({});

    // Filter states
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [searchName, setSearchName] = useState('');
    const [admissionNo, setAdmissionNo] = useState('');

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const [classRes, sectionRes] = await Promise.all([
                    api.get('/api/academic/classes'),
                    api.get('/api/academic/sections')
                ]);
                setClasses(classRes.data);
                setSections(sectionRes.data);
            } catch (error) {
                console.error('Fetch Filters Error:', error);
                showToast('Failed to load filters', 'error');
            }
        };
        fetchFilters();
    }, []);

    const handleSearch = async () => {
        setSearching(true);
        try {
            const params = {
                classId: selectedClass,
                section: selectedSection,
                search: searchName || admissionNo
            };
            const { data } = await api.get('/api/students', { params });
            setStudents(data);
            if (data.length === 0) showToast('No students found', 'warning');
        } catch (error) {
            console.error('Search Error:', error);
            showToast('Failed to search students', 'error');
        } finally {
            setSearching(false);
        }
    };

    const handleToggle = async (studentId) => {
        setToggling(prev => ({ ...prev, [studentId]: true }));
        try {
            await api.patch(`/api/students/${studentId}/login-toggle`);
            setStudents(prev => prev.map(s => s._id === studentId ? { ...s, allowLogin: !s.allowLogin } : s));
            showToast('Status updated');
        } catch (error) {
            console.error('Toggle Error:', error);
            showToast('Failed to update status', 'error');
        } finally {
            setToggling(prev => ({ ...prev, [studentId]: false }));
        }
    };

    const Label = ({ children, required }) => (
        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 block px-1">
            {children} {required && <span className="text-rose-500">*</span>}
        </label>
    );

    return (
        <div className="animate-in fade-in duration-500 pb-12 text-slate-800 space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Fees Due User Login Permission</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span className="cursor-pointer hover:text-[#7c32ff] transition-colors" onClick={() => navigate('/school')}>Dashboard</span>
                        <span>|</span>
                        <span>Role Permission</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Fees Due User Login Permission</span>
                    </div>
                </div>
            </div>

            {/* Select Criteria */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl mb-6">
                <h3 className="text-sm font-black text-slate-700 mb-8 uppercase tracking-widest italic">Select Criteria</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-1 w-full">
                        <Label>CLASS</Label>
                        <div className="relative group/select">
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-[11px] font-medium text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                            >
                                <option value="">Select Class</option>
                                {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover/select:text-[#7c32ff] transition-colors" size={14} />
                        </div>
                    </div>

                    <div className="space-y-1 w-full">
                        <Label>SECTION</Label>
                        <div className="relative group/select">
                            <select
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-[11px] font-medium text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                            >
                                <option value="">Select Section</option>
                                {sections.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover/select:text-[#7c32ff] transition-colors" size={14} />
                        </div>
                    </div>

                    <div className="space-y-1 w-full">
                        <Label>SEARCH BY NAME</Label>
                        <input
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            placeholder="Name"
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-[11px] font-medium text-slate-600 outline-none focus:border-[#7c32ff] transition-all placeholder:text-slate-300"
                        />
                    </div>

                    <div className="space-y-1 w-full">
                        <Label>ADMISSION NO</Label>
                        <input
                            type="text"
                            value={admissionNo}
                            onChange={(e) => setAdmissionNo(e.target.value)}
                            placeholder="Admission No"
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-[11px] font-medium text-slate-600 outline-none focus:border-[#7c32ff] transition-all placeholder:text-slate-300"
                        />
                    </div>
                </div>
                <div className="flex justify-end pt-8">
                    <Button
                        onClick={handleSearch}
                        disabled={searching}
                        className="bg-[#1C1C1C] hover:bg-black text-white rounded-xl px-10 py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/10 active:scale-95 transition-all"
                    >
                        {searching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                        <span>SEARCH</span>
                    </Button>
                </div>
            </Card>

            {/* Student List */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl min-h-[200px]">
                <div className="flex items-center justify-between mb-8 px-2">
                    <h3 className="text-sm font-black text-navy-900 uppercase tracking-widest italic">Student List</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-snow-100">
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Admission No</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Student Name</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Class</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic">Father Name</th>
                                <th className="pb-4 text-[10px] font-black text-secondary uppercase tracking-widest px-6 italic text-right">Login Permission</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-snow-50">
                            {students.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        {searching ? 'Searching...' : 'Search to see students'}
                                    </td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr key={student._id} className="hover:bg-snow-50/50 transition-colors group">
                                        <td className="py-5 px-6 text-xs font-bold text-navy-700 italic">{student.admissionNumber}</td>
                                        <td className="py-5 px-6 text-xs font-bold text-navy-700 italic">{student.firstName} {student.lastName}</td>
                                        <td className="py-5 px-6 text-[11px] font-bold text-slate-500 italic">
                                            {student.class?.name} ({student.section})
                                        </td>
                                        <td className="py-5 px-6 text-[11px] font-bold text-slate-500 italic">{student.fatherName}</td>
                                        <td className="py-5 px-6 text-right">
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => handleToggle(student._id)}
                                                    disabled={toggling[student._id]}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${student.allowLogin ? 'bg-[#7c32ff]' : 'bg-slate-200'}`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${student.allowLogin ? 'translate-x-6' : 'translate-x-1'}`}
                                                    />
                                                    {toggling[student._id] && (
                                                        <Loader2 className="absolute inset-x-0 mx-auto text-white/50 animate-spin" size={12} />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Float Icon */}
            <div className="fixed bottom-12 right-12 w-10 h-10 bg-[#7c32ff] rounded shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-110 active:scale-95 transition-all">
                <Layout size={18} />
            </div>
        </div>
    );
};

export default DueFeesLoginPermission;
