import React, { useState, useEffect } from 'react';
import {
    Search, ChevronDown, Loader2, Trash2, Check
} from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';
import api from '../../../api/api';

const AssignVehicle = () => {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [filterClassId, setFilterClassId] = useState('');
    const [form, setForm] = useState({ routeId: '', stopName: '' });
    const [openActionId, setOpenActionId] = useState(null);

    // ── fetch master data
    const fetchMasterData = async () => {
        try {
            const [classRes, routeRes] = await Promise.all([
                api.get('/api/academic/classes'),
                api.get('/api/transport/routes')
            ]);
            setClasses(classRes.data);
            setRoutes(routeRes.data);
        } catch (err) {
            console.error('Error fetching master data:', err);
        }
    };

    // ── fetch students by class
    const fetchStudents = async () => {
        if (!filterClassId) { setStudents([]); return; }
        setLoading(true);
        try {
            const { data } = await api.get('/api/students', { params: { classId: filterClassId } });
            setStudents(data);
        } catch (err) {
            console.error('Fetch students error:', err);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    // ── fetch current assignments
    const fetchAssignments = async () => {
        try {
            const { data } = await api.get('/api/transport/assignments');
            setAssignments(data);
        } catch (err) {
            console.error('Fetch assignments error:', err);
        }
    };

    useEffect(() => { fetchMasterData(); fetchAssignments(); }, []);
    useEffect(() => { fetchStudents(); setSelectedStudent(null); }, [filterClassId]);

    const handleSubmit = async () => {
        if (!selectedStudent) { alert('Please select a student from the list'); return; }
        if (!form.routeId) { alert('Please select a transport route'); return; }
        setSaving(true);
        try {
            await api.post('/api/transport/assignments', {
                studentId: selectedStudent._id,
                routeId: form.routeId,
                stopName: form.stopName
            });
            setSelectedStudent(null);
            setForm({ routeId: '', stopName: '' });
            fetchAssignments();
            fetchStudents();
        } catch (err) {
            alert(err?.response?.data?.message || 'Failed to assign student');
        } finally {
            setSaving(false);
        }
    };

    const handleRemoveAssignment = async (studentId) => {
        if (!window.confirm('Remove this transport assignment?')) return;
        try {
            await api.delete(`/api/transport/assignments/${studentId}`);
            fetchAssignments();
            fetchStudents();
        } catch (err) {
            alert('Failed to remove assignment');
        }
        setOpenActionId(null);
    };

    const filteredStudents = students.filter(s =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.admissionNumber || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <h1 className="text-xl font-black text-slate-800 tracking-tight">Assign Vehicle (Student Transport)</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Transport</span>
                    <span>|</span>
                    <span className="text-slate-500">Assign Vehicle</span>
                </div>
            </div>

            <div className="px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Assignment form */}
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px] h-fit space-y-6">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Assign to Route</h3>

                    {/* selected student chip */}
                    {selectedStudent ? (
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Selected Student</p>
                            <p className="text-sm font-black text-slate-700">{selectedStudent.firstName} {selectedStudent.lastName}</p>
                            <p className="text-xs text-slate-400">{selectedStudent.admissionNumber}</p>
                            <button onClick={() => setSelectedStudent(null)} className="mt-2 text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest">× Clear</button>
                        </div>
                    ) : (
                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                            <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">← Select a student from the list</p>
                        </div>
                    )}

                    {/* Route select */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">SELECT ROUTE <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <select
                                value={form.routeId}
                                onChange={e => setForm(f => ({ ...f, routeId: e.target.value }))}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none shadow-sm h-[46px]"
                            >
                                <option value="">Select Route</option>
                                {routes.map(r => <option key={r._id} value={r._id}>{r.title || r.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                        </div>
                    </div>

                    {/* Stop name */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">STOP NAME</label>
                        <input
                            type="text"
                            value={form.stopName}
                            onChange={e => setForm(f => ({ ...f, stopName: e.target.value }))}
                            placeholder="Bus stop name"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 h-[46px]"
                        />
                    </div>

                    <Button
                        onClick={handleSubmit}
                        disabled={saving || !selectedStudent || !form.routeId}
                        className="w-full bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all disabled:opacity-40"
                    >
                        {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} strokeWidth={3} />}
                        <span>SAVE ASSIGNMENT</span>
                    </Button>
                </Card>

                {/* Right side — student picker + assigned list */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Student picker */}
                    <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px] overflow-visible">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Select Student</h3>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <select
                                        value={filterClassId}
                                        onChange={e => setFilterClassId(e.target.value)}
                                        className="bg-slate-50 border-none rounded-2xl px-4 py-2.5 text-[10px] font-black tracking-widest text-slate-600 outline-none appearance-none h-[38px] pr-8"
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={12} />
                                </div>
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={13} strokeWidth={3} />
                                    <input
                                        type="text"
                                        placeholder="SEARCH"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        className="w-full bg-slate-50 border-none rounded-2xl pl-10 pr-4 py-2.5 text-[10px] font-black tracking-widest text-slate-600 focus:ring-2 focus:ring-primary/10 outline-none placeholder:text-slate-300 h-[38px]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                            {loading ? (
                                <div className="flex justify-center py-10"><Loader2 className="animate-spin text-primary" size={20} /></div>
                            ) : !filterClassId ? (
                                <p className="py-10 text-center text-xs font-black text-slate-300 uppercase tracking-widest italic">Select a class to view students</p>
                            ) : filteredStudents.length === 0 ? (
                                <p className="py-10 text-center text-xs font-black text-slate-300 uppercase tracking-widest italic">No students found</p>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            {['↓ ADM NO', '↓ NAME', '↓ CURRENT ROUTE', '↓ SELECT'].map((h, i) => (
                                                <th key={i} className={`py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ${i === 3 ? 'text-center last:rounded-r-2xl' : 'text-left first:rounded-l-2xl'}`}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {filteredStudents.map(s => (
                                            <tr key={s._id} onClick={() => setSelectedStudent(s)} className={`cursor-pointer transition-colors ${selectedStudent?._id === s._id ? 'bg-primary/5' : 'hover:bg-slate-50/50'}`}>
                                                <td className="py-4 px-4 text-xs font-bold text-slate-600">{s.admissionNumber || '-'}</td>
                                                <td className="py-4 px-4 text-xs font-semibold text-slate-700">{s.firstName} {s.lastName}</td>
                                                <td className="py-4 px-4 text-xs text-slate-400">{s.transportRoute?.name || s.transportRoute?.title || <span className="text-slate-200 italic">None</span>}</td>
                                                <td className="py-4 px-4 text-center">
                                                    <div className={`w-5 h-5 rounded-full mx-auto border-2 transition-all flex items-center justify-center ${selectedStudent?._id === s._id ? 'bg-primary border-primary' : 'border-slate-200'}`}>
                                                        {selectedStudent?._id === s._id && <Check size={10} className="text-white" strokeWidth={4} />}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </Card>

                    {/* Assignment list */}
                    <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px] overflow-visible">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-6">Assigned Students</h3>
                        <div className="overflow-x-auto">
                            {assignments.length === 0 ? (
                                <p className="py-10 text-center text-xs font-black text-slate-300 uppercase tracking-widest italic">No assignments yet</p>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            {['↓ STUDENT', '↓ ADM NO', '↓ CLASS', '↓ ROUTE', '↓ STOP', '↓ ACTION'].map((h, i) => (
                                                <th key={i} className={`py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ${i === 5 ? 'text-right last:rounded-r-2xl' : 'text-left first:rounded-l-2xl'}`}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {assignments.map((s, idx) => (
                                            <tr key={s._id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 px-4 text-xs font-semibold text-slate-700">{s.firstName} {s.lastName}</td>
                                                <td className="py-4 px-4 text-xs text-slate-400">{s.admissionNumber || '-'}</td>
                                                <td className="py-4 px-4 text-xs text-slate-400">{s.class?.name || '-'}</td>
                                                <td className="py-4 px-4 text-xs text-slate-400">{s.transportRoute?.name || s.transportRoute?.title || '-'}</td>
                                                <td className="py-4 px-4 text-xs text-slate-400">{s.transportStop || '-'}</td>
                                                <td className="py-4 px-4 text-right">
                                                    <div className="relative inline-block">
                                                        <button
                                                            onClick={() => setOpenActionId(openActionId === idx ? null : idx)}
                                                            className={`flex items-center space-x-2 bg-white border border-slate-200 rounded-full pl-5 pr-2 py-1.5 text-[10px] font-black transition-all shadow-sm active:scale-95 ${openActionId === idx ? 'text-primary border-primary' : 'text-slate-400 hover:text-primary hover:border-primary'}`}
                                                        >
                                                            <span className="uppercase tracking-widest">SELECT</span>
                                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${openActionId === idx ? 'bg-primary text-white' : 'bg-slate-50'}`}>
                                                                <ChevronDown size={12} className={`transition-transform duration-300 ${openActionId === idx ? 'rotate-180' : ''}`} />
                                                            </div>
                                                        </button>
                                                        {openActionId === idx && (
                                                            <>
                                                                <div className="fixed inset-0 z-10" onClick={() => setOpenActionId(null)} />
                                                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-50 py-2 z-20 animate-in zoom-in-95 duration-200 origin-top-right">
                                                                    <button onClick={() => handleRemoveAssignment(s._id)} className="w-full px-5 py-3 text-left text-[10px] font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
                                                                        <Trash2 size={14} className="text-red-300" />
                                                                        <span>Remove</span>
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AssignVehicle;
