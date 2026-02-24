import React, { useState } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Layout,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BehaviourSettings = () => {
    const navigate = useNavigate();

    const SettingCard = ({ title, options, label }) => (
        <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[24px] overflow-hidden relative flex-1">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#7c32ff] rounded-l-full opacity-20" />

            <h3 className="text-[15px] font-black text-slate-700 tracking-tight mb-8">{title}</h3>

            <div className="space-y-3 mb-10">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
                <div className="flex items-center space-x-12 pt-2">
                    {options.map((opt, idx) => (
                        <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input type="radio" name={title} className="peer sr-only" defaultChecked={idx === 0} />
                                <div className="w-5 h-5 rounded-full border-2 border-slate-200 peer-checked:border-[#7c32ff] transition-all" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#7c32ff] absolute opacity-0 peer-checked:opacity-100 transition-all scale-0 peer-checked:scale-100" />
                            </div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-[#7c32ff] transition-colors">{opt}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-center">
                <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-10 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                    SAVE
                </Button>
            </div>
        </Card>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />

                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Setting</h1>

                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span>Behaviour Records</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Setting</span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 relative">
                <SettingCard
                    title="Incident Comment Setting"
                    label="Comment Option"
                    options={["Student Comment", "Parent Comment"]}
                />
                <SettingCard
                    title="Incident View Setting"
                    label="View Option"
                    options={["Student View", "Parent View"]}
                />

                {/* Basket Icon decorator (absolute to the right card container) */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-1 z-10 w-10 h-10 bg-[#7c32ff] rounded-l-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <Layout className="text-white" size={18} />
                </div>
            </div>
        </div>
    );
};

export default BehaviourSettings;
