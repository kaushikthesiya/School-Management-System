import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card, Input } from '../../components/SnowUI';
import { Plus, Clock, User, BookOpen, Trash2, Save, ChevronLeft, ChevronRight, Calendar, Settings2, X, GraduationCap } from 'lucide-react';
import { formatTimeTo12Hour } from '../../utils/timeFormat';
import TimePicker from '../../components/TimePicker';

const TimetableModal = ({ show, onClose, classId, section, day, onSave, existingPeriods = [] }) => {
    const [periods, setPeriods] = useState(existingPeriods.length > 0 ? existingPeriods : [
        { subject: '', teacher: '', startTime: '', endTime: '', roomNo: '' }
    ]);
    const [subjects, setSubjects] = useState([]);
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        const fetchRefs = async () => {
            try {
                const [subRes, staffRes] = await Promise.all([
                    api.get('/api/academic/subjects'),
                    api.get('/api/staff')
                ]);
                setSubjects(Array.isArray(subRes.data) ? subRes.data : []);
                setStaff(Array.isArray(staffRes.data) ? staffRes.data : []);
            } catch (error) {
                console.error('Error fetching refs');
            }
        };
        if (show) fetchRefs();
    }, [show]);

    useEffect(() => {
        if (show) {
            setPeriods(existingPeriods.length > 0 ? existingPeriods : [
                { subject: '', teacher: '', startTime: '', endTime: '', roomNo: '' }
            ]);
        }
    }, [show, existingPeriods]);

    if (!show) return null;

    const addPeriod = () => setPeriods([...periods, { subject: '', teacher: '', startTime: '', endTime: '', roomNo: '' }]);
    const removePeriod = (index) => setPeriods(periods.filter((_, i) => i !== index));
    const handlePeriodChange = (index, field, value) => {
        const newPeriods = [...periods];
        newPeriods[index][field] = value;
        setPeriods(newPeriods);
    };

    return (
        <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6 animate-in fade-in duration-300">
            <Card className="w-full max-w-5xl bg-white rounded-[40px] shadow-3xl shadow-navy-900/20 relative overflow-hidden flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="bg-primary px-8 py-6 flex justify-between items-center shadow-lg shadow-primary/20 shrink-0">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                            <Calendar className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white italic uppercase tracking-tight">MANAGE SCHEDULE</h2>
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">{day}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all active:scale-95 group"
                    >
                        <X size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        {periods.map((period, index) => (
                            <div key={index} className="group relative bg-slate-50/50 hover:bg-white border border-slate-100 rounded-[30px] p-6 transition-all hover:shadow-xl hover:shadow-slate-200/50 flex flex-wrap lg:flex-nowrap items-end gap-6">
                                <div className="space-y-2 flex-1 min-w-[200px]">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                                    <select
                                        className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%23A3AED0%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_1.25rem_center] bg-no-repeat"
                                        value={period.subject}
                                        onChange={e => handlePeriodChange(index, 'subject', e.target.value)}
                                    >
                                        <option value="">Select Subject</option>
                                        {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-2 flex-1 min-w-[200px]">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Teacher</label>
                                    <select
                                        className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%23A3AED0%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_1.25rem_center] bg-no-repeat"
                                        value={period.teacher}
                                        onChange={e => handlePeriodChange(index, 'teacher', e.target.value)}
                                    >
                                        <option value="">Select Teacher</option>
                                        {staff.map(s => <option key={s._id} value={s._id}>{s.name || s.fullName}</option>)}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4 w-full lg:w-[320px]">
                                    <div className="space-y-2">
                                        <TimePicker
                                            label="Start Time"
                                            value={period.startTime}
                                            onChange={(val) => handlePeriodChange(index, 'startTime', val)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <TimePicker
                                            label="End Time"
                                            value={period.endTime}
                                            onChange={(val) => handlePeriodChange(index, 'endTime', val)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 w-full lg:w-24">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Room</label>
                                    <input
                                        type="text"
                                        placeholder="No."
                                        className="w-full bg-white border border-slate-100 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-primary transition-all text-center"
                                        value={period.roomNo}
                                        onChange={e => handlePeriodChange(index, 'roomNo', e.target.value)}
                                    />
                                </div>

                                <button
                                    onClick={() => removePeriod(index)}
                                    className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all active:scale-95"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center pt-4">
                        <button
                            onClick={addPeriod}
                            className="flex items-center space-x-3 px-8 py-4 bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400 rounded-[30px] font-black italic uppercase tracking-widest text-[11px] hover:border-primary hover:text-primary hover:bg-primary/5 transition-all w-full max-w-xs justify-center"
                        >
                            <Plus size={18} strokeWidth={3} />
                            <span>Add New Period</span>
                        </button>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex justify-end items-center space-x-6 shrink-0">
                    <button
                        onClick={onClose}
                        className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                    >
                        Cancel Changes
                    </button>
                    <Button
                        onClick={() => onSave(periods)}
                        className="!px-10 !py-4 shadow-xl shadow-primary/20"
                    >
                        <Save size={18} className="mr-2" />
                        <span className="font-black italic uppercase tracking-widest text-[11px]">Save Timetable</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

const Timetable = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('A');
    const [timetable, setTimetable] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalDay, setModalDay] = useState('');

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        const fetchClasses = async () => {
            const res = await api.get('/api/academic/classes');
            setClasses(Array.isArray(res.data) ? res.data : []);
            if (res.data?.length > 0) setSelectedClass(res.data[0]._id);
        };
        fetchClasses();
    }, []);

    const fetchTimetable = async () => {
        if (!selectedClass || !selectedSection) return;
        try {
            const res = await api.get(`/api/timetable?classId=${selectedClass}&section=${selectedSection}`);
            const mapped = {};
            res.data.forEach(item => mapped[item.day] = item.periods);
            setTimetable(mapped);
        } catch (error) {
            console.error('Error fetching timetable');
        }
    };

    useEffect(() => { fetchTimetable(); }, [selectedClass, selectedSection]);

    const handleSave = async (periods) => {
        try {
            await api.post('/api/timetable', {
                classId: selectedClass,
                section: selectedSection,
                day: modalDay,
                periods
            });
            setShowModal(false);
            fetchTimetable();
        } catch (error) {
            alert('Error saving timetable');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-2 space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                        Class Timetable
                    </h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                        <span>Academic</span>
                        <span>|</span>
                        <span className="text-primary/70">Timetable Management</span>
                    </div>
                </div>

                <div className="flex items-center space-x-3 bg-white p-2 rounded-[25px] border border-slate-100 shadow-snow-sm">
                    <div className="relative">
                        <select
                            className="bg-slate-50 border-none rounded-[20px] px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-slate-600 focus:ring-2 focus:ring-primary/20 appearance-none min-w-[140px]"
                            value={selectedClass}
                            onChange={e => setSelectedClass(e.target.value)}
                        >
                            {classes.map(c => <option key={c._id} value={c._id}>Class {c.name}</option>)}
                        </select>
                    </div>
                    <div className="w-1 h-6 bg-slate-100 rounded-full"></div>
                    <div className="relative">
                        <select
                            className="bg-slate-50 border-none rounded-[20px] px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-slate-600 focus:ring-2 focus:ring-primary/20 appearance-none min-w-[100px]"
                            value={selectedSection}
                            onChange={e => setSelectedSection(e.target.value)}
                        >
                            {['A', 'B', 'C', 'D'].map(s => <option key={s} value={s}>Sec {s}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {days.map(day => (
                    <Card key={day} className="p-0 border-none shadow-snow-lg rounded-[40px] bg-white overflow-hidden group">
                        <div className="p-8 border-b border-slate-50 bg-white flex justify-between items-center group-hover:bg-slate-50/30 transition-colors">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-[20px] bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                                    <Calendar className="text-primary group-hover:text-white transition-colors" size={20} />
                                </div>
                                <h3 className="text-lg font-black text-slate-800 italic uppercase flex items-center space-x-3">
                                    <span>{day}</span>
                                </h3>
                            </div>

                            <button
                                onClick={() => { setModalDay(day); setShowModal(true); }}
                                className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-full text-[10px] font-black tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/5 active:scale-95"
                            >
                                <Settings2 size={16} />
                                <span>EDIT SCHEDULE</span>
                            </button>
                        </div>

                        <div className="p-8 bg-white">
                            <div className="flex flex-wrap gap-6">
                                {timetable[day]?.length > 0 ? (
                                    timetable[day].map((p, i) => (
                                        <div key={i} className="relative bg-slate-50/50 hover:bg-white border border-slate-100 rounded-[30px] p-6 min-w-[220px] flex-1 lg:flex-none transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                                            {/* Room Badge */}
                                            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-xl text-[9px] font-black text-primary border border-primary/10 uppercase tracking-widest">
                                                RM {p.roomNo || 'N/A'}
                                            </div>

                                            <div className="flex items-center space-x-2 text-[10px] font-black text-primary/60 uppercase tracking-widest mb-3">
                                                <Clock size={12} className="text-primary" />
                                                <span>{formatTimeTo12Hour(p.startTime)} - {formatTimeTo12Hour(p.endTime)}</span>
                                            </div>

                                            <div className="text-sm font-black text-slate-800 italic uppercase mb-4 decoration-primary/20 underline decoration-4 underline-offset-4 decoration-skip-ink">
                                                {p.subject?.name || 'Subject'}
                                            </div>

                                            <div className="flex items-center space-x-3 pt-3 border-t border-slate-100">
                                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                                                    <GraduationCap size={14} className="text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Instructor</span>
                                                    <span className="text-[11px] font-black text-slate-600 italic uppercase">{p.teacher?.name || 'Assigned Staff'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[30px] bg-slate-50/30">
                                        <Calendar className="text-slate-200 mb-4" size={40} strokeWidth={1} />
                                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">No periods assigned for this day</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <TimetableModal
                show={showModal}
                onClose={() => setShowModal(false)}
                day={modalDay}
                onSave={handleSave}
                existingPeriods={timetable[modalDay]}
            />
        </div>
    );
};

export default Timetable;
