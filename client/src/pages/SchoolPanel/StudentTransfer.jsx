import React, { useState } from 'react';
import { Card, Button, Input } from '../../components/SnowUI';
import {
    MoveRight,
    Search,
    ArrowLeft,
    School,
    FileText,
    CheckCircle2,
    AlertCircle,
    UserCheck,
    Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentTransfer = () => {
    const navigate = useNavigate();
    const [admissionNo, setAdmissionNo] = useState('');
    const [student, setStudent] = useState(null);
    const [searching, setSearching] = useState(false);
    const [transferring, setTransferring] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSearch = () => {
        if (!admissionNo) return;
        setSearching(true);
        // Fetch real data here
        setTimeout(() => {
            setStudent(null); // Or real result
            setSearching(false);
        }, 1000);
    };

    const handleTransfer = () => {
        setTransferring(true);
        setTimeout(() => {
            setTransferring(false);
            setSuccess(true);
            setStudent(null);
            setAdmissionNo('');
        }, 2000);
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
                        <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Student Transfer</h1>
                        <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                            <span>Dashboard</span>
                            <span>|</span>
                            <span>Student Info</span>
                            <span>|</span>
                            <span className="text-[#7c32ff]">Transfer Student</span>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100 shadow-sm">
                    <School size={16} className="text-blue-500" />
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">External Transfer Portal</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Search Panel */}
                <div className="lg:col-span-12">
                    <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none" />

                        <div className="flex flex-col md:flex-row md:items-end space-y-6 md:space-y-0 md:space-x-8 relative">
                            <div className="flex-1 space-y-2">
                                <Label required>Admission Number</Label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-focus-within:text-[#7c32ff] group-focus-within:bg-purple-50 transition-all">
                                        <Search size={16} strokeWidth={3} />
                                    </div>
                                    <Input
                                        value={admissionNo}
                                        onChange={(e) => setAdmissionNo(e.target.value)}
                                        placeholder="Enter Admission No to Transfer"
                                        className="pl-16 py-4 bg-slate-50/50 border-slate-100 rounded-2xl text-xs font-black placeholder:text-slate-300 focus:bg-white transition-all shadow-inner"
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={handleSearch}
                                disabled={searching}
                                className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] flex items-center space-x-3 shadow-2xl shadow-purple-500/20 active:scale-95 transition-all w-full md:w-auto group overflow-hidden"
                            >
                                {searching ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <Search size={18} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />
                                )}
                                <span className="italic uppercase">LOCATE STUDENT</span>
                            </Button>
                        </div>

                        {success && !student && (
                            <div className="mt-8 p-6 bg-green-50 rounded-3xl border border-green-100 animate-in zoom-in duration-500 flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-green-500">
                                    <CheckCircle2 size={24} strokeWidth={3} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-green-700 uppercase tracking-tight italic">Transfer Initiated Successfully!</p>
                                    <p className="text-[10px] font-bold text-green-600/70 uppercase tracking-widest mt-0.5">The student record has been updated and TC generated.</p>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Transfer Details Panel */}
                {student && (
                    <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-8 duration-500">

                        {/* Student Summary */}
                        <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] flex flex-col justify-between">
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-200">
                                            <UserCheck size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-slate-700 uppercase tracking-tight italic">{student.name}</h3>
                                            <div className="flex items-center space-x-2 text-[10px] font-black bg-purple-50 text-[#7c32ff] px-3 py-1 rounded-full w-fit uppercase tracking-widest mt-1">
                                                <span>{student.admissionNo}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Class</p>
                                        <p className="text-sm font-black text-slate-700">{student.class} ({student.section})</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 py-8 border-y border-slate-50 italic">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Father's Name</p>
                                        <p className="text-xs font-bold text-slate-600 uppercase tracking-tight">{student.parentName}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Account Status</p>
                                        <div className="flex items-center space-x-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <p className="text-xs font-black text-green-500 uppercase tracking-tight">{student.status}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 text-slate-400">
                                        <AlertCircle size={14} />
                                        <p className="text-[9px] font-bold uppercase tracking-widest">Ensure all dues are cleared before initiating transfer.</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Transfer Form */}
                        <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] border-l-8 border-l-[#7c32ff]">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-10 flex items-center space-x-3">
                                <MoveRight size={18} className="text-[#7c32ff]" />
                                <span>Transfer Credentials</span>
                            </h3>

                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <Label required>Reason for Transfer</Label>
                                    <Input
                                        className="bg-slate-50 border-slate-100 rounded-2xl py-4 text-xs font-bold"
                                        placeholder="e.g. Parental relocation, Higher studies..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label required>Date of Exit</Label>
                                        <div className="relative">
                                            <Input className="bg-slate-50 border-slate-100 rounded-2xl py-4 text-xs font-bold pl-12" type="date" />
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Generate TC #</Label>
                                        <div className="relative">
                                            <Input className="bg-slate-50 border-slate-100 rounded-2xl py-4 text-xs font-bold pl-12" placeholder="Auto-generated" />
                                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <Button
                                        onClick={handleTransfer}
                                        disabled={transferring}
                                        className="w-full bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl py-5 text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 shadow-2xl shadow-purple-500/20 active:scale-95 transition-all overflow-hidden relative group"
                                    >
                                        {transferring ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <MoveRight size={18} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                                                <span className="italic">COMPLETE TRANSFER & NOTIFY PARENTS</span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentTransfer;
