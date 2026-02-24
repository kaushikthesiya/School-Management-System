import React, { useState } from 'react';
import { Card, Button } from '../../../components/SnowUI';
import {
    Settings,
    Layout
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EvaluationSettings = () => {
    const navigate = useNavigate();

    const RadioOption = ({ label, selected, onClick }) => (
        <div
            onClick={onClick}
            className="flex items-center space-x-3 group cursor-pointer"
        >
            <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${selected ? 'border-[#7c32ff] bg-[#7c32ff]/5' : 'border-slate-200 group-hover:border-[#7c32ff]'}`}>
                <div className={`w-2.5 h-2.5 rounded-full bg-[#7c32ff] transition-all ${selected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
            </div>
            <span className={`text-[10px] font-bold uppercase italic transition-colors ${selected ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-600'}`}>{label}</span>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Teacher Evaluation Setting</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-[#7c32ff] cursor-pointer">Teacher Evaluation</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Settings</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Evaluation Settings Card */}
                <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative group">
                    <div className="space-y-10 relative">
                        <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2">
                            <Settings size={16} />
                            <span>Evaluation Settings</span>
                        </h3>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block italic">Evaluation</label>
                                <div className="flex items-center space-x-20">
                                    <RadioOption label="Enable" selected={true} onClick={() => { }} />
                                    <RadioOption label="Disable" selected={false} onClick={() => { }} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block italic">Evaluation Approval</label>
                                <div className="flex items-center space-x-20">
                                    <RadioOption label="Auto" selected={false} onClick={() => { }} />
                                    <RadioOption label="Manual" selected={true} onClick={() => { }} />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-12 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                                SAVE
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Submission Settings Card */}
                <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative group">
                    <div className="space-y-10 relative">
                        <h3 className="text-sm font-black text-[#7c32ff] uppercase tracking-widest italic flex items-center space-x-2">
                            <Layout size={16} />
                            <span>Submission Settings</span>
                        </h3>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block italic">Submitted By</label>
                                <div className="flex items-center space-x-20">
                                    <RadioOption label="Student" selected={true} onClick={() => { }} />
                                    <RadioOption label="Parent" selected={false} onClick={() => { }} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block italic">Submission Time</label>
                                <div className="flex items-center space-x-20">
                                    <RadioOption label="Any Time" selected={true} onClick={() => { }} />
                                    <RadioOption label="Fixed Time" selected={false} onClick={() => { }} />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-12 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                                SAVE
                            </Button>
                        </div>
                    </div>

                    {/* Basket Icon decorator */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-12 h-12 bg-[#7c32ff] rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/20 transform rotate-45 group-hover:rotate-90 transition-all duration-500">
                        <div className="-rotate-45">
                            <Settings size={20} className="text-white" />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default EvaluationSettings;
