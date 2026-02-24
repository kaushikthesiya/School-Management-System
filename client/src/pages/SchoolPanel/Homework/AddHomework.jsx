import React, { useState } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Plus,
    Calendar,
    Upload,
    FileText,
    ChevronDown,
    Layout,
    Check,
    CloudUpload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddHomework = () => {
    const navigate = useNavigate();
    const [dragActive, setDragActive] = useState(false);

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1 italic">
            {children} {required && <span className="text-rose-500">*</span>}
        </label>
    );

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Add Homework</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span>Homework</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Add Homework</span>
                </div>
            </div>

            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[40px] overflow-hidden relative">
                <div className="mb-10 flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest italic">Assign New Homework</h3>
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-[#7c32ff]">
                        <Plus size={20} />
                    </div>
                </div>

                <form className="space-y-10">
                    {/* Top Row: Dropdowns & Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-1">
                            <Label required>Class</Label>
                            <div className="relative group">
                                <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none cursor-pointer italic">
                                    <option value="">Select Class *</option>
                                    <option>Class 5</option>
                                    <option>Class 6</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label required>Section</Label>
                            <div className="relative group">
                                <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none cursor-pointer italic">
                                    <option value="">Select Section *</option>
                                    <option>A</option>
                                    <option>B</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label required>Subject</Label>
                            <div className="relative group">
                                <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none cursor-pointer italic">
                                    <option value="">Select Subject *</option>
                                    <option>English</option>
                                    <option>Mathematics</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label required>Homework Date</Label>
                            <div className="relative group">
                                <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all italic" />
                                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-1">
                            <Label required>Submission Date</Label>
                            <div className="relative group">
                                <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all italic" />
                                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label required>Marks</Label>
                            <input
                                type="text"
                                placeholder="Enter Marks"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all italic placeholder:text-slate-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label required>Description</Label>
                        <textarea
                            rows="4"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all min-h-[160px] resize-none italic"
                            placeholder="Homework details..."
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Attach File</Label>
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            className={`w-full border-2 border-dashed rounded-[32px] p-12 transition-all flex flex-col items-center justify-center space-y-4 group cursor-pointer ${dragActive ? 'bg-purple-50 border-[#7c32ff]' : 'bg-slate-50/50 border-slate-100 hover:border-purple-200'}`}
                        >
                            <div className={`p-5 rounded-3xl transition-all ${dragActive ? 'bg-[#7c32ff] text-white scale-110' : 'bg-white text-[#7c32ff] shadow-sm shadow-purple-500/5 group-hover:scale-110'}`}>
                                <CloudUpload size={32} />
                            </div>
                            <div className="text-center">
                                <p className="text-[11px] font-black text-slate-600 uppercase tracking-widest italic group-hover:text-[#7c32ff] transition-colors">Browse File</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">Or Drag & Drop File Here (100 Mb max file size)</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center pt-6">
                        <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-4 text-[11px] font-black uppercase tracking-[0.25em] shadow-xl shadow-purple-500/20 active:scale-95 transition-all flex items-center space-x-3">
                            <Check size={16} strokeWidth={3} />
                            <span>SAVE HOMEWORK</span>
                        </Button>
                    </div>
                </form>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-[#7c32ff] rounded-l-xl flex items-center justify-center">
                    <Layout className="text-white" size={18} />
                </div>
            </Card>
        </div>
    );
};

export default AddHomework;
