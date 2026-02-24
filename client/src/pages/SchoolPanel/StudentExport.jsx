import React from 'react';
import { Button, Card } from '../../components/SnowUI';
import {
    ArrowLeft,
    FileSpreadsheet,
    FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentExport = () => {
    const navigate = useNavigate();

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
                        <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Student Export</h1>
                        <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider text-right">
                            <span className="hover:text-[#7c32ff] cursor-pointer">Dashboard</span>
                            <span>|</span>
                            <span className="hover:text-[#7c32ff] cursor-pointer">Student Info</span>
                            <span>|</span>
                            <span className="text-[#7c32ff]">Student Export</span>
                        </div>
                    </div>
                </div>
            </div>

            <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden relative">
                <div className="p-8 border-b border-slate-50">
                    <h3 className="text-sm font-black text-[#6b25ea] uppercase tracking-widest">All Student Export</h3>
                </div>

                <div className="p-16 flex flex-col items-center justify-center space-y-10 relative">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -ml-32 -mb-32 opacity-50" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg relative z-10">
                        <Button
                            className="bg-[#28a745] hover:bg-[#218838] text-white rounded-xl py-4 flex items-center justify-center space-x-3 shadow-lg shadow-green-500/20 active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest"
                        >
                            <FileSpreadsheet size={16} strokeWidth={3} />
                            <span>EXPORT TO CSV</span>
                        </Button>
                        <Button
                            className="bg-[#28a745] hover:bg-[#218838] text-white rounded-xl py-4 flex items-center justify-center space-x-3 shadow-lg shadow-green-500/20 active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest"
                        >
                            <FileText size={16} strokeWidth={3} />
                            <span>EXPORT TO PDF</span>
                        </Button>
                    </div>
                </div>

                {/* Floating Action Button Placeholder (matching the purple icon in the photo) */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-20 bg-[#7c32ff] rounded-l-full flex items-center justify-center shadow-lg shadow-purple-500/40">
                    <div className="w-5 h-5 rounded-full border-2 border-white/30" />
                </div>
            </Card>
        </div>
    );
};

export default StudentExport;
