import React, { useState } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Search,
    Layout,
    ChevronDown,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeesCarryForward = () => {
    const navigate = useNavigate();

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1 italic">
            {children} {required && <span className="text-rose-500">*</span>}
        </label>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Fees Carry Forward</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span>Fees Collection</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Fees Carry Forward</span>
                </div>
            </div>

            {/* Select Criteria */}
            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-10">Select Criteria</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                        <Label required>CLASS</Label>
                        <div className="relative group">
                            <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none italic" required>
                                <option value="">Select Class *</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={14} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label required>SECTION</Label>
                        <div className="relative group">
                            <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none italic" required>
                                <option value="">Select Section *</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={14} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-12">
                    <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-12 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center space-x-2">
                        <Search size={14} strokeWidth={3} />
                        <span>SEARCH</span>
                    </Button>
                </div>

                {/* Basket Icon decorator */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-[#7c32ff] rounded-l-xl flex items-center justify-center">
                    <Layout className="text-white" size={18} />
                </div>
            </Card>
        </div>
    );
};

export default FeesCarryForward;
