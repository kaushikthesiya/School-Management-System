import React, { useState, useEffect } from 'react';
import { ChevronDown, Check, Loader2 } from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';
import api from '../../../api/api';

const Select = ({ label, name, value, onChange, options, placeholder, required }) => (
    <div className="space-y-2 group">
        {label && (
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none shadow-sm h-[46px]"
            >
                <option value="">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-primary transition-colors" size={14} />
        </div>
    </div>
);

const Input = ({ label, name, value, onChange, placeholder, required, type = "text" }) => (
    <div className="space-y-2 group">
        {label && (
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 h-[46px]"
        />
    </div>
);

const AddHomework = () => {
    const [saving, setSaving] = useState(false);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [formData, setFormData] = useState({
        class: '',
        section: '',
        subject: '',
        topic: '',
        description: '',
        assignDate: '',
        dueDate: '',
        evaluationDate: '',
        maxMarks: ''
    });

    useEffect(() => {
        Promise.all([
            api.get('/api/academic/classes').catch(() => ({ data: [] })),
            api.get('/api/academic/subjects').catch(() => ({ data: [] }))
        ]).then(([classRes, subjectRes]) => {
            setClasses(classRes.data);
            setSubjects(subjectRes.data);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.class || !formData.section || !formData.subject || !formData.topic || !formData.dueDate) {
            alert('Class, Section, Subject, Topic, and Due Date are required');
            return;
        }
        setSaving(true);
        try {
            await api.post('/api/homework', {
                class: formData.class,
                section: formData.section,
                subject: formData.subject,
                topic: formData.topic,
                description: formData.description,
                assignDate: formData.assignDate || undefined,
                dueDate: formData.dueDate,
                maxMarks: formData.maxMarks || undefined
            });
            alert('Homework saved successfully!');
            setFormData({
                class: '', section: '', subject: '', topic: '',
                description: '', assignDate: '', dueDate: '', evaluationDate: '', maxMarks: ''
            });
        } catch (err) {
            alert(err?.response?.data?.message || 'Failed to save homework');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <h1 className="text-xl font-black text-slate-800 tracking-tight">Add Homework</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Homework</span>
                    <span>|</span>
                    <span className="text-slate-500">Add Homework</span>
                </div>
            </div>

            <div className="px-4">
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px]">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">Homework Information</h3>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Class / Section / Subject Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Select
                                label="CLASS"
                                name="class"
                                value={formData.class}
                                onChange={handleChange}
                                placeholder="Select Class *"
                                options={classes.map(c => ({ value: c._id, label: c.name }))}
                                required
                            />
                            <Select
                                label="SECTION"
                                name="section"
                                value={formData.section}
                                onChange={handleChange}
                                placeholder="Select Section *"
                                options={['A', 'B', 'C', 'D', 'E'].map(s => ({ value: s, label: s }))}
                                required
                            />
                            <Select
                                label="SUBJECT"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Select Subject *"
                                options={subjects.map(s => ({ value: s._id, label: s.name }))}
                                required
                            />
                        </div>

                        {/* Topic */}
                        <Input label="TOPIC" name="topic" value={formData.topic} onChange={handleChange} placeholder="Homework Topic *" required />

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Input label="ASSIGN DATE" name="assignDate" value={formData.assignDate} onChange={handleChange} placeholder="Assign Date" type="date" />
                            <Input label="DUE DATE" name="dueDate" value={formData.dueDate} onChange={handleChange} placeholder="Due Date *" type="date" required />
                            <Input label="EVALUATION DATE" name="evaluationDate" value={formData.evaluationDate} onChange={handleChange} placeholder="Evaluation Date" type="date" />
                        </div>

                        {/* Marks */}
                        <Input label="MAX MARKS" name="maxMarks" value={formData.maxMarks} onChange={handleChange} placeholder="Maximum Marks" type="number" />

                        {/* Description */}
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">DESCRIPTION</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Homework description or instructions…"
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 min-h-[120px] resize-none"
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex justify-center pt-4">
                            <Button
                                type="submit"
                                disabled={saving}
                                className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-16 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} strokeWidth={3} />}
                                <span>SAVE HOMEWORK</span>
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AddHomework;
