import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Input, Card } from '../../components/SnowUI';
import { Plus, X, GraduationCap, Clock, Layers, Bookmark } from 'lucide-react';

const AcademicSetup = () => {
    const [structure, setStructure] = useState({ mediums: [], shifts: [], streams: [], semesters: [], departments: [] });
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [activeTab, setActiveTab] = useState('structure');
    const [showClassModal, setShowClassModal] = useState(false);
    const [showSubjectModal, setShowSubjectModal] = useState(false);
    const [newClass, setNewClass] = useState({ name: '', sections: [] });
    const [newSubject, setNewSubject] = useState({ name: '', code: '', type: 'Theory' });
    const [tempSection, setTempSection] = useState('');

    const fetchData = async () => {
        try {
            const structRes = await api.get('/api/academic/structure');
            const classRes = await api.get('/api/academic/classes');
            const subjectRes = await api.get('/api/academic/subjects');
            setStructure(structRes.data);
            setClasses(classRes.data);
            setSubjects(subjectRes.data);
        } catch (error) {
            console.error('Error fetching data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateStructure = async (updated) => {
        try {
            const { data } = await api.patch('/api/academic/structure', updated);
            setStructure(data);
        } catch (error) {
            alert('Error updating structure');
        }
    };

    const handleAddItem = (field, value) => {
        if (!value) return;
        const newItem = field === 'shifts' ? { name: value } : value;
        const updated = { ...structure, [field]: [...structure[field], newItem] };
        updateStructure(updated);
    };

    const handleRemoveItem = (field, index) => {
        const updated = { ...structure, [field]: structure[field].filter((_, i) => i !== index) };
        updateStructure(updated);
    };

    const handleCreateClass = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/academic/classes', newClass);
            setShowClassModal(false);
            setNewClass({ name: '', sections: [] });
            fetchData();
        } catch (error) {
            alert('Error creating class');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Academic Structure</h1>
                    <p className="text-slate-500">Configure mediums, shifts, and class structure.</p>
                </div>
                <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100">
                    <button
                        onClick={() => setActiveTab('structure')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'structure' ? 'bg-primary text-white' : 'text-slate-500 hover:text-primary'}`}
                    >
                        Foundation
                    </button>
                    <button
                        onClick={() => setActiveTab('classes')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'classes' ? 'bg-primary text-white' : 'text-slate-500 hover:text-primary'}`}
                    >
                        Classes & Sections
                    </button>
                    <button
                        onClick={() => setActiveTab('subjects')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'subjects' ? 'bg-primary text-white' : 'text-slate-500 hover:text-primary'}`}
                    >
                        Subjects
                    </button>
                </div>
            </div>

            {activeTab === 'structure' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="space-y-4">
                        <div className="flex items-center space-x-2 text-primary font-bold">
                            <Layers size={20} />
                            <span>Mediums (e.g., English, Hindi)</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {structure.mediums.map((m, i) => (
                                <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm flex items-center space-x-2">
                                    <span>{m}</span>
                                    <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveItem('mediums', i)} />
                                </span>
                            ))}
                            <button
                                onClick={() => handleAddItem('mediums', prompt('Enter Medium Name:'))}
                                className="border-2 border-dashed border-slate-200 text-slate-400 px-3 py-1 rounded-lg text-sm hover:border-primary hover:text-primary transition-all"
                            >
                                + Add Medium
                            </button>
                        </div>
                    </Card>

                    <Card className="space-y-4">
                        <div className="flex items-center space-x-2 text-primary font-bold">
                            <Clock size={20} />
                            <span>Shifts (e.g., Morning, Evening)</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {structure.shifts.map((s, i) => (
                                <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm flex items-center space-x-2">
                                    <span>{s.name || s}</span>
                                    <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveItem('shifts', i)} />
                                </span>
                            ))}
                            <button
                                onClick={() => handleAddItem('shifts', prompt('Enter Shift Name:'))}
                                className="border-2 border-dashed border-slate-200 text-slate-400 px-3 py-1 rounded-lg text-sm hover:border-primary hover:text-primary transition-all"
                            >
                                + Add Shift
                            </button>
                        </div>
                    </Card>

                    <Card className="space-y-4">
                        <div className="flex items-center space-x-2 text-primary font-bold">
                            <Bookmark size={20} />
                            <span>Streams (Science, Commerce)</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {structure.streams.map((s, i) => (
                                <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm flex items-center space-x-2">
                                    <span>{s}</span>
                                    <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveItem('streams', i)} />
                                </span>
                            ))}
                            <button
                                onClick={() => handleAddItem('streams', prompt('Enter Stream Name:'))}
                                className="border-2 border-dashed border-slate-200 text-slate-400 px-3 py-1 rounded-lg text-sm hover:border-primary hover:text-primary transition-all"
                            >
                                + Add Stream
                            </button>
                        </div>
                    </Card>

                    <Card className="space-y-4">
                        <div className="flex items-center space-x-2 text-primary font-bold">
                            <Layers size={20} />
                            <span>Departments (Primary, Admin)</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {structure.departments?.map((d, i) => (
                                <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm flex items-center space-x-2">
                                    <span>{d}</span>
                                    <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveItem('departments', i)} />
                                </span>
                            ))}
                            <button
                                onClick={() => handleAddItem('departments', prompt('Enter Department Name:'))}
                                className="border-2 border-dashed border-slate-200 text-slate-400 px-3 py-1 rounded-lg text-sm hover:border-primary hover:text-primary transition-all"
                            >
                                + Add Dept
                            </button>
                        </div>
                    </Card>
                </div>
            ) : activeTab === 'classes' ? (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-primary">Class Directory</h2>
                        <Button onClick={() => setShowClassModal(true)}>
                            <Plus size={20} />
                            <span>Add Class</span>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {classes.map((cls) => (
                            <Card key={cls._id} className="hover:scale-[1.02] transition-transform cursor-pointer group">
                                <div className="flex items-start justify-between">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                                        <GraduationCap size={24} />
                                    </div>
                                    <div className="text-right">
                                        <h3 className="text-lg font-bold text-primary">Class {cls.name}</h3>
                                        <p className="text-xs text-slate-400">{cls.sections.length} Sections</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-1">
                                    {cls.sections.map(sec => (
                                        <span key={sec} className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 text-[10px] font-bold border border-slate-100">
                                            SEC {sec}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-primary">Subject Directory</h2>
                        <Button onClick={() => setShowSubjectModal(true)}>
                            <Plus size={20} />
                            <span>Add Subject</span>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {subjects.map((sub) => (
                            <Card key={sub._id} className="p-4 flex flex-col justify-between">
                                <div>
                                    <div className="text-xs font-bold text-primary/60 mb-1">{sub.code || 'NO CODE'}</div>
                                    <h3 className="text-lg font-bold text-slate-800">{sub.name}</h3>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${sub.type === 'Practical' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'}`}>
                                        {sub.type?.toUpperCase()}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {showClassModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md animate-in slide-in-from-bottom duration-300">
                        <h2 className="text-2xl font-bold text-primary mb-6">Create Class</h2>
                        <form onSubmit={handleCreateClass} className="space-y-6">
                            <Input
                                label="Class Name (e.g. 10, Primary)"
                                placeholder="10"
                                value={newClass.name}
                                onChange={e => setNewClass({ ...newClass, name: e.target.value })}
                                required
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-600 ml-1">Sections</label>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Add section (e.g. A)"
                                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-4 focus:ring-slate-100"
                                        value={tempSection}
                                        onChange={e => setTempSection(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), setNewClass(prev => ({ ...prev, sections: [...prev.sections, tempSection] })), setTempSection(''))}
                                    />
                                    <Button type="button" onClick={() => (setNewClass(prev => ({ ...prev, sections: [...prev.sections, tempSection] })), setTempSection(''))}>Add</Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {newClass.sections.map((s, i) => (
                                        <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs flex items-center space-x-1">
                                            <span>{s}</span>
                                            <X size={12} className="cursor-pointer" onClick={() => setNewClass(prev => ({ ...prev, sections: prev.sections.filter((_, idx) => idx !== i) }))} />
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowClassModal(false)}>Cancel</Button>
                                <Button type="submit" className="flex-1">Create Class</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}

            {showSubjectModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md animate-in slide-in-from-bottom duration-300">
                        <h2 className="text-2xl font-bold text-primary mb-6">Create Subject</h2>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            try {
                                await api.post('/api/academic/subjects', newSubject);
                                setShowSubjectModal(false);
                                setNewSubject({ name: '', code: '', type: 'Theory' });
                                fetchData();
                            } catch (error) {
                                alert('Error creating subject');
                            }
                        }} className="space-y-6">
                            <Input
                                label="Subject Name"
                                placeholder="Mathematics"
                                value={newSubject.name}
                                onChange={e => setNewSubject({ ...newSubject, name: e.target.value })}
                                required
                            />
                            <Input
                                label="Subject Code"
                                placeholder="MATH101"
                                value={newSubject.code}
                                onChange={e => setNewSubject({ ...newSubject, code: e.target.value })}
                            />
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Type</label>
                                <select
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-slate-100"
                                    value={newSubject.type}
                                    onChange={e => setNewSubject({ ...newSubject, type: e.target.value })}
                                >
                                    <option value="Theory">Theory</option>
                                    <option value="Practical">Practical</option>
                                    <option value="Theory + Practical">Theory + Practical</option>
                                </select>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowSubjectModal(false)}>Cancel</Button>
                                <Button type="submit" className="flex-1">Create Subject</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AcademicSetup;
