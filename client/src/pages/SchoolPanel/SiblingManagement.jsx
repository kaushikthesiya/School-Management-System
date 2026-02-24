import React, { useState } from 'react';
import { Card, Button, Input } from '../../components/SnowUI';
import {
    Users,
    Search,
    Link as LinkIcon,
    UserPlus,
    ArrowLeft,
    Trash2,
    ExternalLink,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SiblingManagement = () => {
    const navigate = useNavigate();
    const [admissionNo, setAdmissionNo] = useState('');
    const [student, setStudent] = useState(null);
    const [siblings, setSiblings] = useState([]);
    const [searching, setSearching] = useState(false);

    const handleSearch = () => {
        if (!admissionNo) return;
        setSearching(true);
        // Fetch real data here
        setTimeout(() => {
            setStudent(null); // Or real result
            setSearching(false);
        }, 1000);
    };

    const addSibling = () => {
        if (!student) return;
        if (siblings.find(s => s.id === student.id)) return;
        setSiblings([...siblings, student]);
        setStudent(null);
        setAdmissionNo('');
    };

    const removeSibling = (id) => {
        setSiblings(siblings.filter(s => s.id !== id));
    };

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">

            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-[#7c32ff] hover:bg-slate-100 transition-all border border-slate-100"
                    >
                        <ArrowLeft size={18} strokeWidth={3} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Sibling Management</h1>
                        <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                            <span>Dashboard</span>
                            <span>|</span>
                            <span>Student Info</span>
                            <span>|</span>
                            <span className="text-[#7c32ff]">Sibling Management</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-3 bg-purple-50 px-4 py-2 rounded-2xl border border-purple-100 shadow-sm">
                    <CheckCircle2 size={16} className="text-[#7c32ff]" />
                    <span className="text-[10px] font-black text-[#7c32ff] uppercase tracking-widest">System Link Active</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Search and Attach Panel */}
                <div className="lg:col-span-12">
                    <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden relative">
                        {/* Decorative background circle */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none" />

                        <div className="flex flex-col md:flex-row md:items-end space-y-6 md:space-y-0 md:space-x-8 relative">
                            <div className="flex-1 space-y-2">
                                <Label required>Search Student by Admission No</Label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-focus-within:text-[#7c32ff] group-focus-within:bg-purple-50 transition-all">
                                        <Search size={16} strokeWidth={3} />
                                    </div>
                                    <Input
                                        value={admissionNo}
                                        onChange={(e) => setAdmissionNo(e.target.value)}
                                        placeholder="Enter Admission No (e.g. 88991)"
                                        className="pl-16 py-4 bg-slate-50/50 border-slate-100 rounded-2xl text-xs font-black placeholder:text-slate-300 focus:bg-white transition-all shadow-inner"
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={handleSearch}
                                disabled={searching}
                                className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] flex items-center space-x-3 shadow-2xl shadow-purple-500/20 active:scale-95 transition-all w-full md:w-auto overflow-hidden group"
                            >
                                {searching ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <Search size={18} strokeWidth={3} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                )}
                                <span className="italic uppercase italic">SEARCH STUDENT</span>
                            </Button>
                        </div>

                        {/* Search Result Preview */}
                        {student && (
                            <div className="mt-8 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-[#7c32ff]/20 animate-in slide-in-from-top-4 duration-500 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 relative">
                                <div className="flex items-center space-x-6">
                                    <div className="w-16 h-16 rounded-[20px] bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center text-slate-300 text-xl font-black italic uppercase overflow-hidden border border-slate-100">
                                        {student.photo ? <img src={student.photo} alt="Avatar" /> : student.name.charAt(0)}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-3">
                                            <h4 className="text-base font-black text-slate-700 tracking-tight italic uppercase underline decoration-[#7c32ff]/10 decoration-2 underline-offset-4">{student.name}</h4>
                                            <span className="text-[9px] font-black bg-[#7c32ff]/5 text-[#7c32ff] px-3 py-1 rounded-full uppercase tracking-widest italic">{student.admissionNo}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <span>{student.class} ({student.section})</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                                            <span>Father: {student.fatherName}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    onClick={addSibling}
                                    className="bg-white text-[#7c32ff] border border-purple-100 rounded-2xl px-8 py-4 text-[11px] font-black uppercase tracking-widest flex items-center space-x-3 hover:bg-[#7c32ff] hover:text-white transition-all shadow-sm hover:shadow-lg shadow-purple-500/10 active:scale-95 group"
                                >
                                    <UserPlus size={18} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />
                                    <span>LINK SIBLING</span>
                                </Button>
                            </div>
                        )}

                        {!student && !searching && (
                            <div className="mt-8 flex items-center space-x-3 text-slate-300 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                <AlertCircle size={14} strokeWidth={3} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Enter an admission number to find and link siblings.</span>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Sibling List Panel */}
                <div className="lg:col-span-12">
                    <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden min-h-[400px]">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#7c32ff]">
                                    <LinkIcon size={20} strokeWidth={3} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-700 uppercase tracking-tight italic tracking-widest">Linked Siblings</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 italic">All students linked in this family group</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 px-4 py-2 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">
                                Total Siblings: <span className="text-[#7c32ff]">{siblings.length}</span>
                            </div>
                        </div>

                        {siblings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                                {siblings.map((sib) => (
                                    <div key={sib.id} className="group bg-white rounded-3xl border border-slate-100 p-6 hover:border-[#7c32ff]/30 hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full blur-3xl -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                        <div className="flex items-center space-x-5 relative z-10">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 font-black italic uppercase text-lg group-hover:bg-[#7c32ff] group-hover:text-white transition-all duration-500 border border-slate-50 group-hover:border-transparent">
                                                {sib.name.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xs font-black text-slate-700 truncate uppercase tracking-tight group-hover:text-[#7c32ff] transition-colors">{sib.name}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest italic">{sib.admissionNo}</p>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between space-x-2 pt-6 border-t border-slate-50 relative z-10">
                                            <button className="flex items-center space-x-2 text-[10px] font-black text-slate-400 hover:text-[#7c32ff] transition-colors uppercase tracking-widest italic">
                                                <ExternalLink size={12} strokeWidth={3} />
                                                <span>View Profile</span>
                                            </button>
                                            <button
                                                onClick={() => removeSibling(sib.id)}
                                                className="w-10 h-10 rounded-xl bg-red-50 text-red-400 hover:bg-red-400 hover:text-white flex items-center justify-center transition-all active:scale-95"
                                            >
                                                <Trash2 size={16} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <div className="h-full min-h-[160px] border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center space-y-3 cursor-pointer hover:border-[#7c32ff]/30 hover:bg-slate-50/50 transition-all group">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-[#7c32ff] group-hover:bg-purple-50 transition-all">
                                        <Plus size={20} strokeWidth={3} />
                                    </div>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-[#7c32ff] transition-all">Link New Sibling</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-24 h-24 rounded-[40px] bg-slate-50 flex items-center justify-center text-slate-100 mb-6 rotate-12">
                                    <LinkIcon size={48} strokeWidth={2.5} />
                                </div>
                                <h4 className="text-lg font-black text-slate-300 uppercase tracking-widest italic">No Siblings Linked</h4>
                                <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest tracking-[0.2em] italic">Use the search above to start grouping family members.</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

const Plus = ({ size, strokeWidth, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

export default SiblingManagement;
