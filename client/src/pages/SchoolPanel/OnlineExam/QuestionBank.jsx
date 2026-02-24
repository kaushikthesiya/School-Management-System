import React, { useState } from 'react';
import {
    Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, Trash2, Plus
} from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';

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

const QuestionBank = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openActionId, setOpenActionId] = useState(null);
    const [formData, setFormData] = useState({
        group: '',
        class: '',
        section: '',
        questionType: '',
        question: '',
        marks: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic">Offline Exam Question</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Offline Exam</span>
                    <span>|</span>
                    <span className="text-slate-500 italic">Offline Question</span>
                </div>
            </div>

            <div className="px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Question Bank Card */}
                <Card className="lg:col-span-4 p-10 border-none shadow-snow-lg bg-white rounded-[40px] h-fit">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8 italic">
                        Add Offline Exam Question
                    </h3>
                    <div className="space-y-6">
                        <Select
                            label="GROUP *"
                            name="group"
                            value={formData.group}
                            onChange={handleInputChange}
                            placeholder="Select Group *"
                            options={['Mathematics', 'Physics']}
                            required
                        />
                        <Select
                            label="CLASS *"
                            name="class"
                            value={formData.class}
                            onChange={handleInputChange}
                            placeholder="Select Class *"
                            options={['Class 1', 'Class 2']}
                            required
                        />
                        <Select
                            label="SECTION *"
                            name="section"
                            value={formData.section}
                            onChange={handleInputChange}
                            placeholder="Select"
                            options={['A', 'B']}
                            required
                        />
                        <Select
                            label="QUESTION TYPE *"
                            name="questionType"
                            value={formData.questionType}
                            onChange={handleInputChange}
                            placeholder="Question Type *"
                            options={['Multiple Choice', 'True/False']}
                            required
                        />

                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                QUESTION *
                            </label>
                            <textarea
                                name="question"
                                value={formData.question}
                                onChange={handleInputChange}
                                placeholder="Question *"
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 min-h-[100px] resize-none"
                                required
                            />
                        </div>

                        <Input
                            label="MARKS *"
                            name="marks"
                            value={formData.marks}
                            onChange={handleInputChange}
                            placeholder="Marks *"
                            required
                        />

                        <div className="flex justify-center pt-6">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all w-full">
                                <span>✓ SAVE QUESTION</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Question Bank List Card */}
                <Card className="lg:col-span-8 p-10 border-none shadow-snow-lg bg-white rounded-[40px] overflow-visible min-h-[500px]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest italic">
                            Offline Question List
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="relative group flex-1 md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={14} strokeWidth={3} />
                                <input
                                    type="text"
                                    placeholder="SEARCH"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-2xl pl-11 pr-4 py-3 text-[10px] font-black tracking-widest text-slate-600 focus:ring-2 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-300"
                                />
                            </div>
                            <div className="flex items-center p-1 bg-slate-50 rounded-2xl">
                                {[Download, Printer, FileText, LayoutGrid].map((Icon, i) => (
                                    <button key={i} className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-400 hover:text-primary transition-all">
                                        <Icon size={14} strokeWidth={3} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest first:rounded-l-2xl whitespace-nowrap">
                                        ↓ Group
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                        ↓ Class (section)
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                        ↓ Question
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                        ↓ Type
                                    </th>
                                    <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest last:rounded-r-2xl whitespace-nowrap">
                                        ↓ Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="py-10 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                        No Data Available In Table
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default QuestionBank;
