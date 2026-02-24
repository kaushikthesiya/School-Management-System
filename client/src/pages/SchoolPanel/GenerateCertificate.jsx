import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Card, Button } from '../../components/SnowUI';
import { Search, ChevronDown } from 'lucide-react';

const GenerateCertificate = () => {
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedCertificate, setSelectedCertificate] = useState('');

    const [students, setStudents] = useState([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        // Fetch classes, sections, and certificates for dropdowns
        const fetchData = async () => {
            try {
                const [classRes, certRes] = await Promise.all([
                    api.get('/api/academic/classes'),
                    api.get('/api/admin-section/certificates')
                ]);
                setClasses(Array.isArray(classRes.data) ? classRes.data : []);
                setCertificates(Array.isArray(certRes.data) ? certRes.data : []);
            } catch (error) {
                console.error('Error fetching criteria data:', error);
            }
        };
        fetchData();
    }, []);

    const handleClassChange = (classId) => {
        setSelectedClass(classId);
        const cls = classes.find(c => c._id === classId);
        setSections(cls ? cls.sections : []);
    };

    const handleSearch = async () => {
        if (!selectedClass || !selectedCertificate) {
            alert('Please select Class and Certificate');
            return;
        }
        setSearching(true);
        try {
            const { data } = await api.get('/api/admin-section/students/search', {
                params: { classId: selectedClass, section: selectedSection }
            });
            setStudents(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setSearching(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Generate Certificate
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Admin Section</span>
                    <span>|</span>
                    <span className="text-primary/70">Generate Certificate</span>
                </div>
            </div>

            <Card className="p-10 border-none shadow-snow-lg rounded-[40px] bg-white relative overflow-hidden group">
                {/* Decorative purple tab on the right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-20 bg-primary rounded-l-3xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all group-hover:w-10">
                    <div className="w-4 h-4 rounded-full border-2 border-white/40 animate-pulse"></div>
                </div>

                <h2 className="text-sm font-black text-slate-700 uppercase tracking-[0.3em] mb-12 flex items-center space-x-4">
                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                    <span>Select Criteria</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end pr-12 relative">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 block">Class *</label>
                        <div className="relative group/select">
                            <select
                                className="w-full bg-slate-50/50 border-b-2 border-slate-100 py-4 px-2 text-xs font-black text-slate-600 outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer uppercase tracking-wider"
                                value={selectedClass}
                                onChange={(e) => handleClassChange(e.target.value)}
                            >
                                <option value="">Select Class *</option>
                                {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within/select:text-primary group-focus-within/select:rotate-180 transition-all" size={16} strokeWidth={3} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 block">Section</label>
                        <div className="relative group/select">
                            <select
                                className="w-full bg-slate-50/50 border-b-2 border-slate-100 py-4 px-2 text-xs font-black text-slate-600 outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer uppercase tracking-wider"
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                            >
                                <option value="">Select Section</option>
                                {sections.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within/select:text-primary group-focus-within/select:rotate-180 transition-all" size={16} strokeWidth={3} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 block">Certificate *</label>
                        <div className="relative group/select">
                            <select
                                className="w-full bg-slate-50/50 border-b-2 border-slate-100 py-4 px-2 text-xs font-black text-slate-600 outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer uppercase tracking-wider"
                                value={selectedCertificate}
                                onChange={(e) => setSelectedCertificate(e.target.value)}
                            >
                                <option value="">Select Certificate *</option>
                                {certificates.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within/select:text-primary group-focus-within/select:rotate-180 transition-all" size={16} strokeWidth={3} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-12 pr-12">
                    <Button
                        onClick={handleSearch}
                        disabled={searching}
                        className="bg-primary hover:bg-primary-hover !rounded-2xl flex items-center space-x-3 px-10 py-4 shadow-2xl shadow-primary/30 active:scale-95 transition-all disabled:opacity-50 overflow-hidden relative group/btn"
                    >
                        {searching ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Search size={20} strokeWidth={3} className="group-hover/btn:rotate-12 transition-transform" />
                        )}
                        <span className="uppercase text-[11px] font-black tracking-[0.2em] italic underline decoration-white/20 underline-offset-4">{searching ? 'Searching...' : 'Search'}</span>
                    </Button>
                </div>
            </Card>

            {students.length > 0 && (
                <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white animate-in slide-in-from-bottom duration-500">
                    <div className="flex justify-between items-center mb-8 px-2">
                        <h2 className="text-lg font-bold text-[#3E4D67]">Student List</h2>
                        <Button className="!bg-[#7c32ff] !rounded-lg flex items-center space-x-2 px-6 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                            <span className="uppercase text-[11px] font-black tracking-widest">Generate</span>
                        </Button>
                    </div>

                    <div className="overflow-x-auto rounded-[20px]">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#F8FAFC] border-y border-slate-100">
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                        <input type="checkbox" className="w-4 h-4 accent-[#7c32ff]" defaultChecked />
                                    </th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Admission No</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Student Name</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Class (Section)</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Father Name</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Gender</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {students.map((student) => (
                                    <tr key={student._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <input type="checkbox" className="w-4 h-4 accent-[#7c32ff]" defaultChecked />
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-600">{student.admissionNo}</td>
                                        <td className="px-6 py-4 text-sm font-black text-slate-700 italic uppercase underline decoration-primary/5 decoration-4">{student.name}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-600 uppercase">{student.class?.name} ({student.section})</td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">{student.fatherName}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">{student.gender}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default GenerateCertificate;
