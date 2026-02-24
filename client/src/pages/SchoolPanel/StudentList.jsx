import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Input, Modal } from '../../components/SnowUI';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Search,
    Plus,
    FileText,
    Download,
    Printer,
    Columns,
    ChevronDown,
    UserPlus,
    X,
    Filter,
    ArrowUpDown,
    Copy,
    FileSpreadsheet,
    FileCode,
    MoreVertical,
    Eye,
    Edit2,
    Trash2,
    Layers
} from 'lucide-react';
import api from '../../api/api';
import { useToast } from '../../context/ToastContext';

const StudentList = () => {
    const navigate = useNavigate();
    const { school_slug } = useParams();
    const { showToast } = useToast();
    const [classes, setClasses] = useState([]);
    const [filters, setFilters] = useState({
        academicYear: '2024|Jan-Dec|',
        class: '',
        section: '',
        name: '',
        roll: ''
    });

    const [openDropdownId, setOpenDropdownId] = useState(null);
    const dropdownRef = useRef(null);

    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [assignData, setAssignData] = useState({ class: '', section: '' });
    const [savingAssign, setSavingAssign] = useState(false);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await api.get('/api/academic/classes');
                setClasses(res.data);
            } catch (error) {
                console.error("Failed to fetch classes");
            }
        };
        fetchClasses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

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
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none"
            >
                <option value="">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={14} />
        </div>
    );

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const params = {
                classId: filters.class,
                section: filters.section,
                search: filters.name || filters.roll
            };
            const res = await api.get('/api/students', { params });
            setStudents(res.data);
        } catch (error) {
            console.error("Failed to fetch students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchStudents();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student record permanently?")) return;
        try {
            await api.delete(`/api/students/${id}`);
            showToast("Student deleted successfully");
            fetchStudents();
        } catch (error) {
            showToast("Error deleting student", "error");
        }
    };

    const handleAssignClass = async () => {
        if (!assignData.class || !assignData.section) {
            showToast("Please select class and section", "warning");
            return;
        }

        setSavingAssign(true);
        try {
            await api.put(`/api/students/${selectedStudent._id}`, {
                class: assignData.class,
                section: assignData.section
            });
            showToast("Class assigned successfully");
            setShowAssignModal(false);
            fetchStudents();
        } catch (error) {
            showToast("Error assigning class", "error");
        } finally {
            setSavingAssign(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">

            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Manage Student</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Student Info</span>
                        <span>|</span>
                        <span className="text-[#7c32ff]">Student List</span>
                    </div>
                </div>
                <Button
                    onClick={() => window.location.href = '/school/add-student'}
                    className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                >
                    <Plus size={14} strokeWidth={3} />
                    <span>ADD STUDENT</span>
                </Button>
            </div>

            {/* Select Criteria Card */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl">
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8 flex items-center space-x-3">
                    <Filter size={16} className="text-[#7c32ff]" />
                    <span>Select Criteria</span>
                </h3>

                <form onSubmit={handleSearch}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-1.5">
                            <Label required>Academic Year</Label>
                            <Select name="academicYear" value={filters.academicYear} onChange={handleChange} options={['2024|Jan-Dec|']} placeholder="Select Year" required />
                        </div>
                        <div className="space-y-1.5">
                            <Label required>Class</Label>
                            <Select name="class" value={filters.class} onChange={handleChange} options={classes.map(c => ({ value: c._id, label: c.name }))} placeholder="Select Class" required />
                        </div>
                        <div className="space-y-1.5">
                            <Label required>Section</Label>
                            <Select name="section" value={filters.section} onChange={handleChange} options={['A', 'B', 'C']} placeholder="Select Section" required />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Search By Name</Label>
                            <Input name="name" value={filters.name} onChange={handleChange} placeholder="Name" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Search By Roll</Label>
                            <Input name="roll" value={filters.roll} onChange={handleChange} placeholder="Roll" className="bg-slate-50 border-slate-100 rounded-xl text-xs font-bold" />
                        </div>
                    </div>

                    <div className="flex justify-end mt-8">
                        <Button type="submit" disabled={loading} className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                            <Search size={14} strokeWidth={3} />
                            <span>{loading ? 'SEARCHING...' : 'SEARCH'}</span>
                        </Button>
                    </div>
                </form>
            </Card>

            {/* Student List Table Card */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Student List</h3>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                            <input
                                type="text"
                                placeholder="QUICK SEARCH"
                                onChange={(e) => {
                                    const val = e.target.value.toLowerCase();
                                    // Local filter for quick search
                                    if (val === '') {
                                        fetchStudents();
                                    } else {
                                        setStudents(prev => prev.filter(s =>
                                            s.firstName?.toLowerCase().includes(val) ||
                                            s.lastName?.toLowerCase().includes(val) ||
                                            s.admissionNumber?.toLowerCase().includes(val)
                                        ));
                                    }
                                }}
                                className="pl-10 pr-4 py-2 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-500 outline-none focus:border-[#7c32ff] transition-all w-64 tracking-widest"
                            />
                        </div>

                        <div className="flex border border-purple-100 rounded-xl overflow-hidden shadow-sm">
                            <button className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors border-r border-purple-50"><Copy size={16} /></button>
                            <button className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors border-r border-purple-50"><FileSpreadsheet size={16} /></button>
                            <button className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors border-r border-purple-50"><FileText size={16} /></button>
                            <button className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors border-r border-purple-50"><FileCode size={16} /></button>
                            <button className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors border-r border-purple-50"><Printer size={16} /></button>
                            <button className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors"><Columns size={16} /></button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                {['Admission No', 'Name', 'Father Name', 'Date Of Birth', 'Class (Sec.)', 'Gender', 'Type', 'Phone', 'Actions'].map((header, idx) => (
                                    <th key={idx} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                        <div className="flex items-center space-x-2 cursor-pointer hover:text-[#7c32ff] transition-colors">
                                            <span>{header}</span>
                                            {header !== 'Actions' && <ArrowUpDown size={10} />}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {students.length > 0 ? students.map((student, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-6 py-5 text-xs font-bold text-slate-500 tracking-tight">{student.admissionNumber}</td>
                                    <td className="px-6 py-5 text-xs font-black text-slate-700">{student.firstName} {student.lastName}</td>
                                    <td className="px-6 py-5 text-xs font-bold text-slate-500">{student.fatherName || 'N/A'}</td>
                                    <td className="px-6 py-5 text-xs font-bold text-slate-500">{student.dob ? new Date(student.dob).toLocaleDateString() : 'N/A'}</td>
                                    <td className="px-6 py-5 text-xs font-bold text-slate-500">{student.class?.name} ({student.section})</td>
                                    <td className="px-6 py-5 text-xs font-bold text-slate-500">{student.gender}</td>
                                    <td className="px-6 py-5 text-xs font-bold text-slate-500">{student.category || 'Regular'}</td>
                                    <td className="px-6 py-5 text-xs font-bold text-slate-500">{student.phone || 'N/A'}</td>
                                    <td className="px-6 py-5">
                                        <div className="relative">
                                            <button
                                                onClick={() => setOpenDropdownId(openDropdownId === student._id ? null : student._id)}
                                                className={`px-4 py-2 border rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center space-x-2 ${openDropdownId === student._id ? 'bg-[#7c32ff] text-white border-[#7c32ff]' : 'border-purple-100 text-[#7c32ff] hover:bg-slate-50'}`}
                                            >
                                                <span>SELECT</span>
                                                <ChevronDown size={12} className={`transition-transform duration-200 ${openDropdownId === student._id ? 'rotate-180' : ''}`} />
                                            </button>

                                            {openDropdownId === student._id && (
                                                <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[100] py-2 animate-in fade-in zoom-in-95 duration-200">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedStudent(student);
                                                            setAssignData({ class: student.class?._id || '', section: student.section || '' });
                                                            setShowAssignModal(true);
                                                            setOpenDropdownId(null);
                                                        }}
                                                        className="w-full px-4 py-2.5 text-left text-[11px] font-bold text-slate-600 hover:bg-slate-50 flex items-center space-x-3 transition-colors"
                                                    >
                                                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                                                            <Layers size={14} />
                                                        </div>
                                                        <span>Assign Class</span>
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/${school_slug}/student-profile/${student._id}`)}
                                                        className="w-full px-4 py-2.5 text-left text-[11px] font-bold text-slate-600 hover:bg-slate-50 flex items-center space-x-3 transition-colors"
                                                    >
                                                        <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#7c32ff] flex items-center justify-center">
                                                            <Eye size={14} />
                                                        </div>
                                                        <span>View</span>
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/${school_slug}/edit-student/${student._id}`)}
                                                        className="w-full px-4 py-2.5 text-left text-[11px] font-bold text-slate-600 hover:bg-slate-50 flex items-center space-x-3 transition-colors"
                                                    >
                                                        <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
                                                            <Edit2 size={14} />
                                                        </div>
                                                        <span>Edit</span>
                                                    </button>
                                                    <div className="my-1 border-t border-slate-50" />
                                                    <button
                                                        onClick={() => {
                                                            handleDelete(student._id);
                                                            setOpenDropdownId(null);
                                                        }}
                                                        className="w-full px-4 py-2.5 text-left text-[11px] font-bold text-red-500 hover:bg-red-50 flex items-center space-x-3 transition-colors"
                                                    >
                                                        <div className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                                                            <Trash2 size={14} />
                                                        </div>
                                                        <span>Delete</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="9" className="px-6 py-10 text-center text-xs font-bold text-slate-400 italic">
                                        {loading ? 'Loading students...' : 'No students found matching your criteria'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 flex justify-between items-center px-4">
                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase italic">Showing {students.length} records</span>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 text-[10px] font-black text-slate-400 hover:text-[#7c32ff] transition-colors tracking-widest uppercase">Previous</button>
                        <button className="w-8 h-8 rounded-full bg-[#7c32ff] text-white text-[10px] font-black shadow-lg shadow-purple-500/20">1</button>
                        <button className="px-4 py-2 text-[10px] font-black text-slate-400 hover:text-[#7c32ff] transition-colors tracking-widest uppercase">Next</button>
                    </div>
                </div>
            </Card>

            {/* Assign Class Modal */}
            <Modal
                isOpen={showAssignModal}
                onClose={() => setShowAssignModal(false)}
                title="Assign Class / Section"
                className="max-w-md"
            >
                <div className="space-y-6 py-4">
                    <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#7c32ff] shadow-sm">
                            <Layers size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-slate-800 italic uppercase">
                                {selectedStudent?.firstName} {selectedStudent?.lastName}
                            </h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                Adm: {selectedStudent?.admissionNumber}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Select
                            label="Target Class"
                            name="class"
                            value={assignData.class}
                            onChange={(val) => setAssignData({ ...assignData, class: val })}
                            options={classes.map(c => ({ value: c._id, label: c.name }))}
                            placeholder="Select Class"
                            required
                        />
                        <Select
                            label="Target Section"
                            name="section"
                            value={assignData.section}
                            onChange={(val) => setAssignData({ ...assignData, section: val })}
                            options={['A', 'B', 'C', 'D']}
                            placeholder="Select Section"
                            required
                        />
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <Button
                            variant="outline"
                            className="flex-1 rounded-xl py-3 text-[10px] font-black uppercase tracking-widest"
                            onClick={() => setShowAssignModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={savingAssign}
                            className="flex-1 bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl py-3 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                            onClick={handleAssignClass}
                        >
                            <span>{savingAssign ? 'SAVING...' : 'SAVE CHANGES'}</span>
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default StudentList;
