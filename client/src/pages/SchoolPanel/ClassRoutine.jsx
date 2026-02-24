import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card, Modal } from '../../components/SnowUI';
import TimePicker from '../../components/TimePicker';
import { Search, ChevronDown, Plus, Trash2, Clock, MapPin, User, BookOpen } from 'lucide-react';

const ClassRoutine = () => {
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(false);

    const [criteria, setCriteria] = useState({
        classId: '',
        sectionName: ''
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [editingPeriods, setEditingPeriods] = useState([]);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const fetchData = async () => {
        try {
            const [classRes, sectionRes, subjectRes, teacherRes] = await Promise.all([
                api.get('/api/academic/classes'),
                api.get('/api/academic/sections'),
                api.get('/api/academic/subjects'),
                api.get('/api/staff?role=Teacher')
            ]);
            setClasses(classRes.data);
            setSections(sectionRes.data);
            setSubjects(subjectRes.data);
            setTeachers(teacherRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchRoutines = async () => {
        if (!criteria.classId || !criteria.sectionName) {
            alert('Please select both Class and Section');
            return;
        }
        setLoading(true);
        try {
            const res = await api.get('/api/academic/routines', {
                params: { classId: criteria.classId, section: criteria.sectionName }
            });
            setRoutines(res.data);
        } catch (error) {
            console.error('Error fetching routines:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditDay = (day) => {
        const dayRoutine = routines.find(r => r.day === day);
        setEditingPeriods(dayRoutine ? dayRoutine.periods : []);
        setSelectedDay(day);
        setModalOpen(true);
    };

    const handleAddPeriod = () => {
        setEditingPeriods([...editingPeriods, { subject: '', teacher: '', startTime: '08:00', endTime: '09:00', roomNo: '' }]);
    };

    const handlePeriodChange = (index, field, value) => {
        const updated = [...editingPeriods];
        updated[index][field] = value;
        setEditingPeriods(updated);
    };

    const handleDeletePeriod = (index) => {
        const updated = editingPeriods.filter((_, i) => i !== index);
        setEditingPeriods(updated);
    };

    const handleSaveRoutine = async () => {
        try {
            await api.post('/api/academic/routines', {
                class: criteria.classId,
                section: criteria.sectionName,
                day: selectedDay,
                periods: editingPeriods
            });
            setModalOpen(false);
            fetchRoutines();
        } catch (error) {
            console.error('Error saving routine:', error);
        }
    };

    const getDayRoutine = (day) => routines.find(r => r.day === day);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Class Routine
                </h1>
                <div className="hidden md:flex space-x-4 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Academics</span>
                    <span>|</span>
                    <span className="text-primary/70">Class Routine</span>
                </div>
            </div>

            {/* Select Criteria Card */}
            <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-[#3E4D67] text-lg font-bold">Select Criteria</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Class *</label>
                        <div className="relative group">
                            <select
                                className="w-full bg-white border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                                value={criteria.classId}
                                onChange={(e) => setCriteria({ ...criteria, classId: e.target.value })}
                            >
                                <option value="">Select Class *</option>
                                {classes.map(cls => <option key={cls._id} value={cls._id}>{cls.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Section *</label>
                        <div className="relative group">
                            <select
                                className="w-full bg-white border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                                value={criteria.sectionName}
                                onChange={(e) => setCriteria({ ...criteria, sectionName: e.target.value })}
                            >
                                <option value="">Select Section *</option>
                                {sections.map(sec => <option key={sec._id} value={sec.name}>{sec.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-10">
                    <Button
                        onClick={fetchRoutines}
                        disabled={loading}
                        className="!bg-[#7c32ff] !rounded-lg flex items-center space-x-2 px-10 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all text-white font-black italic uppercase tracking-widest text-[11px]"
                    >
                        <Search size={16} />
                        <span>{loading ? 'Searching...' : 'Search'}</span>
                    </Button>
                </div>
            </Card>

            {/* Routine List */}
            <div className="grid grid-cols-1 gap-6">
                {days.map(day => {
                    const routine = getDayRoutine(day);
                    return (
                        <Card key={day} className="p-6 border-none shadow-snow-md rounded-[20px] bg-white group hover:shadow-snow-lg transition-all">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-black text-slate-700 uppercase italic tracking-tight flex items-center space-x-3">
                                    <span className="w-1.5 h-6 bg-[#7c32ff] rounded-full"></span>
                                    <span>{day}</span>
                                </h3>
                                <Button
                                    onClick={() => handleEditDay(day)}
                                    variant="ghost"
                                    className="!text-[#7c32ff] hover:bg-[#7c32ff]/5 uppercase text-[10px] tracking-widest"
                                >
                                    <Plus size={14} className="mr-1" />
                                    {routine ? 'Edit Routine' : 'Add Routine'}
                                </Button>
                            </div>

                            {routine && routine.periods.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {routine.periods.map((period, idx) => (
                                        <div key={idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 hover:border-[#7c32ff]/20 transition-all">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center space-x-2 text-[#7c32ff] font-black text-[10px] uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm">
                                                    <Clock size={12} />
                                                    <span>{period.startTime} - {period.endTime}</span>
                                                </div>
                                                {period.roomNo && (
                                                    <div className="flex items-center space-x-1 text-slate-400 text-[10px] font-bold uppercase">
                                                        <MapPin size={10} />
                                                        <span>Room {period.roomNo}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-1 pl-1">
                                                <div className="flex items-center space-x-2">
                                                    <BookOpen size={14} className="text-slate-400" />
                                                    <span className="text-sm font-bold text-slate-700 uppercase">{period.subject?.name || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <User size={14} className="text-slate-400" />
                                                    <span className="text-xs font-bold text-slate-500 italic">{period.teacher?.name || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-slate-300 text-xs font-bold italic uppercase tracking-widest bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                                    No Routine Added
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>

            {/* Edit Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={`Edit Routine - ${selectedDay}`}
                className="!max-w-5xl"
            >
                <div className="space-y-6">
                    <div className="flex justify-end">
                        <Button
                            onClick={handleAddPeriod}
                            className="!bg-[#7c32ff] !rounded-lg flex items-center space-x-2 px-4 py-2 shadow-md shadow-purple-500/20 active:scale-95 transition-all text-white font-black italic uppercase tracking-widest text-[10px]"
                        >
                            <Plus size={14} />
                            <span>Add Period</span>
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {editingPeriods.map((period, idx) => (
                            <div key={idx} className="grid grid-cols-12 gap-4 items-end bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <div className="col-span-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] appearance-none"
                                            value={period.subject?._id || period.subject}
                                            onChange={(e) => handlePeriodChange(idx, 'subject', e.target.value)}
                                        >
                                            <option value="">Select Subject</option>
                                            {subjects.map(s => <option key={s._id} value={s._id}>{s.name} ({s.code})</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Teacher</label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] appearance-none"
                                            value={period.teacher?._id || period.teacher}
                                            onChange={(e) => handlePeriodChange(idx, 'teacher', e.target.value)}
                                        >
                                            <option value="">Select Teacher</option>
                                            {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <TimePicker
                                        label="Start Time"
                                        value={period.startTime}
                                        onChange={(val) => handlePeriodChange(idx, 'startTime', val)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <TimePicker
                                        label="End Time"
                                        value={period.endTime}
                                        onChange={(val) => handlePeriodChange(idx, 'endTime', val)}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Room</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff]"
                                        value={period.roomNo}
                                        onChange={(e) => handlePeriodChange(idx, 'roomNo', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-1 flex justify-center pb-2">
                                    <button
                                        onClick={() => handleDeletePeriod(idx)}
                                        className="text-slate-300 hover:text-red-500 transition-colors p-2"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {editingPeriods.length === 0 && (
                            <div className="text-center py-10 text-slate-400 italic font-bold">
                                No periods added for this day.
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center pt-6">
                        <Button
                            onClick={handleSaveRoutine}
                            className="!bg-[#7c32ff] !rounded-lg flex items-center space-x-2 px-10 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all text-white font-black italic uppercase tracking-widest text-[11px]"
                        >
                            <span>Save Routine</span>
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ClassRoutine;
