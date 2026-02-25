import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card } from '../../components/SnowUI';
import { Search, Printer, ChevronDown } from 'lucide-react';

const CertificateBulkPrint = () => {
    const [classes, setClasses] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [filters, setFilters] = useState({
        class: '',
        certificate: '',
        gridGap: ''
    });

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [classRes, certRes] = await Promise.all([
                    api.get('/api/academic/classes'),
                    api.get('/api/admin-section/certificates')
                ]);
                setClasses(classRes.data);
                setCertificates(certRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = async () => {
        if (!filters.class) {
            alert('Please select a class');
            return;
        }
        setLoading(true);
        try {
            const res = await api.get('/api/admin-section/students/search', {
                params: { classId: filters.class }
            });
            setStudents(res.data);
            setSelectedStudents([]);
        } catch (error) {
            console.error('Error searching students:', error);
            alert('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedStudents(students.map(s => s._id));
        } else {
            setSelectedStudents([]);
        }
    };

    const handleSelectStudent = (id) => {
        setSelectedStudents(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handlePrint = () => {
        if (selectedStudents.length === 0) {
            alert('Please select at least one student');
            return;
        }
        console.log('Printing certificates for:', selectedStudents, 'Template:', filters.certificate);
        window.print();
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Certificate
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Bulk Print</span>
                    <span>|</span>
                    <span className="text-primary/70">Certificate</span>
                </div>
            </div>

            <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white relative overflow-hidden">
                {/* Purple decorative dot */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-[#7c32ff] rounded-l-full flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white/30"></div>
                </div>

                <h2 className="text-[#3E4D67] text-lg font-bold mb-8">Select Criteria</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pr-10">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">SELECT CLASS</label>
                        <div className="relative group">
                            <select
                                className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                                value={filters.class}
                                onChange={(e) => setFilters({ ...filters, class: e.target.value })}
                            >
                                <option value="">Select</option>
                                {classes.map(c => <option key={c._id} value={c._id}>Class {c.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CERTIFICATE *</label>
                        <div className="relative group">
                            <select
                                className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                                value={filters.certificate}
                                onChange={(e) => setFilters({ ...filters, certificate: e.target.value })}
                            >
                                <option value="">Select Certificate *</option>
                                {certificates.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">GRID GAP(PX)</label>
                        <input
                            type="text"
                            className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                            value={filters.gridGap}
                            onChange={(e) => setFilters({ ...filters, gridGap: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-10 pr-10">
                    <Button
                        onClick={handleSearch}
                        disabled={loading}
                        className="!bg-[#7c32ff] !rounded-lg flex items-center space-x-2 px-8 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                    >
                        <Search size={18} />
                        <span className="uppercase text-[11px] font-black tracking-widest">{loading ? 'SEARCHING...' : 'SEARCH'}</span>
                    </Button>
                </div>
            </Card>

            {students.length > 0 && (
                <Card className="p-6 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden min-h-[300px]">
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-[#3E4D67]">Student List</h2>
                        <button
                            onClick={handlePrint}
                            className="flex items-center space-x-2 bg-slate-800 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all"
                        >
                            <Printer size={14} />
                            <span>Print Selected ({selectedStudents.length})</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-100">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#F8FAFC] border-b border-slate-100 uppercase tracking-widest text-[9px] font-black text-slate-400">
                                    <th className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={selectedStudents.length === students.length && students.length > 0}
                                            className="w-4 h-4 rounded border-slate-300 text-[#7c32ff] focus:ring-[#7c32ff] cursor-pointer"
                                        />
                                    </th>
                                    <th className="px-4 py-3">Admission No</th>
                                    <th className="px-4 py-3">Student Name</th>
                                    <th className="px-4 py-3">Class (Sec)</th>
                                    <th className="px-4 py-3">Father Name</th>
                                    <th className="px-4 py-3">Gender</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Mobile No</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-[11px] font-bold">
                                {students.map((student) => (
                                    <tr key={student._id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedStudents.includes(student._id)}
                                                onChange={() => handleSelectStudent(student._id)}
                                                className="w-4 h-4 rounded border-slate-300 text-[#7c32ff] focus:ring-[#7c32ff] cursor-pointer"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-slate-400">{student.admissionNumber}</td>
                                        <td className="px-4 py-3 text-slate-700">{student.firstName} {student.lastName}</td>
                                        <td className="px-4 py-3 text-slate-600">{student.class?.name} ({student.section})</td>
                                        <td className="px-4 py-3 text-slate-600">{student.fatherName}</td>
                                        <td className="px-4 py-3 text-slate-500">{student.gender}</td>
                                        <td className="px-4 py-3 text-slate-500">{student.category}</td>
                                        <td className="px-4 py-3 text-slate-600">{student.mobileNumber}</td>
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

export default CertificateBulkPrint;
