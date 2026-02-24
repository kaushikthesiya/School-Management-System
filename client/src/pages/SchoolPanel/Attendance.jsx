import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card, Input } from '../../components/SnowUI';
import { Calendar, CheckCircle, XCircle, Clock, Search, Filter, TrendingUp, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const Attendance = () => {
    const [activeTab, setActiveTab] = useState('marking');
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({}); // studentId: status
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    // Reports State
    const [reportMonth, setReportMonth] = useState(new Date().getMonth() + 1);
    const [reportYear, setReportYear] = useState(new Date().getFullYear());
    const [monthlyData, setMonthlyData] = useState([]);

    const fetchData = async () => {
        try {
            const classRes = await api.get('/api/academic/classes');
            setClasses(classRes.data);
            if (classRes.data.length > 0) setSelectedClass(classRes.data[0]._id);
        } catch (error) {
            console.error('Error fetching classes');
        }
    };

    useEffect(() => { fetchData(); }, []);

    const fetchStudents = async () => {
        if (!selectedClass) return;
        try {
            const [studRes, attRes] = await Promise.all([
                api.get(`/api/students?classId=${selectedClass}`),
                api.get(`/api/attendance?classId=${selectedClass}&date=${date}`)
            ]);
            setStudents(studRes.data);

            const existingAtt = {};
            attRes.data.forEach(a => existingAtt[a.student._id || a.student] = a.status);
            setAttendance(existingAtt);
        } catch (error) {
            console.error('Error fetching students');
        }
    };

    useEffect(() => { fetchStudents(); }, [selectedClass, date]);

    const handleMark = (studentId, status) => {
        setAttendance({ ...attendance, [studentId]: status });
    };

    const saveAttendance = async () => {
        try {
            const records = Object.entries(attendance).map(([student, status]) => ({
                student,
                status,
                date,
                class: selectedClass
            }));
            await api.post('/api/attendance/bulk', { records });
            alert('Attendance saved successfully');
        } catch (error) {
            alert('Error saving attendance');
        }
    };

    const fetchMonthlyReport = async () => {
        try {
            const res = await api.get(`/api/attendance/report?classId=${selectedClass}&month=${reportMonth}&year=${reportYear}`);
            setMonthlyData(res.data);
        } catch (error) {
            console.error('Error fetching report');
        }
    };

    useEffect(() => { if (activeTab === 'report') fetchMonthlyReport(); }, [activeTab, reportMonth, selectedClass]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Student Attendance</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Student Information</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Attendance</span>
                    </div>
                </div>
                <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                    {['marking', 'report'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-[#1C1C1C] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab === 'marking' ? 'Mark Attendance' : 'Attendance Report'}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'marking' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                    <Card className="border-none shadow-xl p-6 flex flex-wrap items-end gap-4">
                        <div className="space-y-1 flex-1 min-w-[200px]">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Class</label>
                            <select className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-sm font-bold outline-none" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                                {classes.map(c => <option key={c._id} value={c._id}>Class {c.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1 flex-1 min-w-[200px]">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Date</label>
                            <input type="date" className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold outline-none h-[42px]" value={date} onChange={e => setDate(e.target.value)} />
                        </div>
                        <Button onClick={saveAttendance} className="h-[42px] px-8 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/20">Save Attendance</Button>
                    </Card>

                    <Card className="border-none shadow-2xl p-0 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Adm No</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Student</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {students.map(s => (
                                    <tr key={s._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-400">#{s.admissionNo}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800">{s.name}</div>
                                            <div className="text-[9px] text-slate-400 uppercase font-black tracking-tighter">Roll: {s.rollNo || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => handleMark(s._id, 'Present')}
                                                    className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${attendance[s._id] === 'Present' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-50 text-slate-400 hover:bg-emerald-50'}`}
                                                >P</button>
                                                <button
                                                    onClick={() => handleMark(s._id, 'Absent')}
                                                    className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${attendance[s._id] === 'Absent' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-slate-50 text-slate-400 hover:bg-rose-50'}`}
                                                >A</button>
                                                <button
                                                    onClick={() => handleMark(s._id, 'Late')}
                                                    className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${attendance[s._id] === 'Late' ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' : 'bg-slate-50 text-slate-400 hover:bg-amber-50'}`}
                                                >L</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            )}

            {activeTab === 'report' && (
                <div className="space-y-6 animate-in slide-in-from-right duration-500">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-4 items-center">
                            <h2 className="text-xl font-bold text-slate-800 uppercase italic">Monthly Report</h2>
                            <div className="flex items-center bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                                <button className="p-2 hover:bg-slate-50" onClick={() => setReportMonth(m => m === 1 ? 12 : m - 1)}><ChevronLeft size={16} /></button>
                                <span className="px-4 py-1 text-sm font-black text-primary uppercase">{new Date(2024, reportMonth - 1).toLocaleString('default', { month: 'long' })}</span>
                                <button className="p-2 hover:bg-slate-50" onClick={() => setReportMonth(m => m === 12 ? 1 : m + 1)}><ChevronRight size={16} /></button>
                            </div>
                        </div>
                        <Button variant="outline"><TrendingUp size={18} /><span>Export PDF</span></Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: 'Avg Attendance', value: '92.4%', icon: <Users />, color: 'primary' },
                            { label: 'Top Performers', value: '248', icon: <CheckCircle />, color: 'emerald' },
                            { label: 'Frequent Absents', value: '12', icon: <XCircle />, color: 'rose' },
                        ].map((stat, i) => (
                            <Card key={i} className="border-none shadow-xl p-6">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${stat.color === 'primary' ? 'bg-primary/5 text-primary' :
                                    stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'
                                    }`}>
                                    {stat.icon}
                                </div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                                <div className="text-2xl font-black text-slate-800 mt-1">{stat.value}</div>
                            </Card>
                        ))}
                    </div>

                    <Card className="border-none shadow-2xl p-0 overflow-hidden overflow-x-auto">
                        <table className="w-full text-left min-w-[800px]">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 sticky left-0 bg-slate-50 shadow-sm">Student</th>
                                    {[...Array(30)].map((_, i) => (
                                        <th key={i} className="px-2 py-4 text-[9px] font-black uppercase tracking-tighter text-slate-300 text-center">{i + 1}</th>
                                    ))}
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-primary text-center">%</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {students.map(s => (
                                    <tr key={s._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 sticky left-0 bg-white group-hover:bg-slate-50 shadow-sm border-r border-slate-50">
                                            <div className="font-bold text-xs text-slate-800">{s.name}</div>
                                        </td>
                                        {[...Array(30)].map((_, i) => (
                                            <td key={i} className="px-1 py-4">
                                                <div className={`w-4 h-4 rounded-md mx-auto ${i % 7 === 0 ? 'bg-slate-100' : (Math.random() > 0.1 ? 'bg-emerald-400' : 'bg-rose-400')} opacity-40 hover:opacity-100 transition-opacity`}></div>
                                            </td>
                                        ))}
                                        <td className="px-6 py-4 text-center text-xs font-black text-primary">94%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Attendance;
