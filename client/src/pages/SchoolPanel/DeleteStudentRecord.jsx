import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Card, Button, Input } from '../../components/SnowUI';
import { Search, Download, Printer, FileText, FileSpreadsheet, Copy, LayoutGrid, Trash2, UserX, ChevronDown, ArrowUpDown } from 'lucide-react';

const DeleteStudentRecord = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/students', {
                params: { search: searchTerm }
            });
            setStudents(res.data);
        } catch (error) {
            console.error('Failed to fetch students:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [searchTerm]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Delete Student Record
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Student Information</span>
                    <span>|</span>
                    <span className="text-primary/70">Delete Student Record</span>
                </div>
            </div>

            <Card className="p-0 border-none shadow-snow-lg rounded-[40px] overflow-hidden bg-white">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 relative">
                    {/* Decorative Tab */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-[60px] flex items-start justify-end p-6">
                        <UserX className="text-rose-200" size={32} />
                    </div>

                    <h2 className="text-lg font-black text-slate-800 italic uppercase flex items-center space-x-3">
                        <span className="w-2 h-8 bg-rose-500 rounded-full"></span>
                        <span>Student Record Management</span>
                    </h2>

                    <div className="flex items-center space-x-4 pr-16">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="QUICK SEARCH"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 w-48 group-hover:w-64 transition-all"
                            />
                        </div>
                        <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
                            {[Copy, FileSpreadsheet, FileText, Download, Printer, LayoutGrid].map((Icon, i) => (
                                <button key={i} className="p-2.5 hover:bg-white hover:text-primary hover:shadow-sm rounded-xl text-slate-400 transition-all">
                                    <Icon size={14} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Admission No</th>
                                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Student Name</th>
                                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Class</th>
                                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-center">Section</th>
                                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Roll No</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {students.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center text-slate-400 italic font-medium">
                                        No student records found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr key={student._id} className="group hover:bg-slate-50/30 transition-colors">
                                        <td className="px-8 py-5 text-sm font-black text-slate-700 italic uppercase underline decoration-primary/10 decoration-4 underline-offset-4">{student.admissionNumber}</td>
                                        <td className="px-6 py-5 text-sm font-black text-slate-700 italic uppercase">{student.firstName} {student.lastName}</td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-500">{student.class?.name}</td>
                                        <td className="px-6 py-5 text-center text-sm font-bold text-slate-500">{student.section}</td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-500">{student.roll}</td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end items-center space-x-3 transform group-hover:translate-x-0 translate-x-4 opacity-0 group-hover:opacity-100 transition-all">
                                                <button className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-rose-100" title="Delete Permanent">
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="flex items-center space-x-3 px-6 py-2.5 bg-white border-2 border-primary text-primary rounded-full text-[10px] font-black tracking-widest hover:bg-primary hover:text-white transition-all group shadow-lg shadow-primary/5 active:scale-95">
                                                    <span>SELECT</span>
                                                    <ChevronDown size={14} strokeWidth={3} className="group-hover:rotate-180 transition-transform" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 flex justify-between items-center px-4 pb-8">
                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase italic">Showing 0 to 0 of 0 entries</span>
                    <div className="flex space-x-2">
                        <ArrowUpDown className="text-slate-200 rotate-90" size={16} />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DeleteStudentRecord;
