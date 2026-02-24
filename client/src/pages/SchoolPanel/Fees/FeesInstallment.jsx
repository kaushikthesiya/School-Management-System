import React, { useState } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Search,
    Copy,
    FileText,
    Download,
    Printer,
    Layout,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    ChevronDown,
    Save,
    Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeesInstallment = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const ActionIcon = ({ Icon }) => (
        <button className="p-2 rounded-lg text-slate-400 hover:text-[#7c32ff] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
            <Icon size={14} />
        </button>
    );

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1 italic">
            {children} {required && <span className="text-rose-500">*</span>}
        </label>
    );

    const installments = [
        { id: 1, name: '1st Installment', dueDate: '15th Apr, 2026', amount: '25%' },
        { id: 2, name: '2nd Installment', dueDate: '15th Jul, 2026', amount: '25%' },
        { id: 3, name: '3rd Installment', dueDate: '15th Oct, 2026', amount: '25%' },
        { id: 4, name: '4th Installment', dueDate: '15th Jan, 2027', amount: '25%' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Fees Installment</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span>Fees</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Fees Installment</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                {/* Add Installment Form */}
                <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden sticky top-24">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">Set Installment</h3>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label required>NAME</Label>
                            <input
                                type="text"
                                placeholder="e.g. 1st Installment"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label required>DUE DATE</Label>
                            <input
                                type="date"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label required>AMOUNT (%)</Label>
                            <input
                                type="number"
                                placeholder="Percentage"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all"
                                required
                            />
                        </div>
                        <div className="flex justify-center pt-4">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-10 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center space-x-2">
                                <Check size={14} strokeWidth={3} />
                                <span>SAVE</span>
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Installment List */}
                <div className="lg:col-span-3">
                    <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Installment List</h3>

                            <div className="flex items-center space-x-6">
                                <div className="relative group">
                                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder="SEARCH"
                                        className="bg-transparent border-b border-slate-100 py-2 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:border-[#7c32ff] transition-all w-48"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center space-x-1 border border-purple-100 rounded-2xl p-1.5 bg-purple-50/30">
                                    <ActionIcon Icon={Copy} />
                                    <ActionIcon Icon={Printer} />
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-50 italic text-slate-400">
                                        <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">Name</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">Due Date</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">Amount (%)</th>
                                        <th className="text-right py-5 px-6 text-[10px] font-black uppercase tracking-widest">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {installments.map((inst) => (
                                        <tr key={inst.id} className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                            <td className="py-5 px-6 text-[11px] font-bold text-slate-600 uppercase italic">{inst.name}</td>
                                            <td className="py-5 px-6 text-[11px] font-bold text-slate-500 italic uppercase">{inst.dueDate}</td>
                                            <td className="py-5 px-6 text-[11px] font-bold text-slate-400 tabular-nums">{inst.amount}</td>
                                            <td className="py-5 px-6 text-right">
                                                <button className="bg-white border-2 border-purple-100 text-[#7c32ff] rounded-full px-6 py-1.5 text-[9px] font-black uppercase tracking-widest hover:bg-[#7c32ff] hover:text-white hover:border-[#7c32ff] transition-all flex items-center space-x-2 inline-flex uppercase tracking-widest">
                                                    <span>SELECT</span>
                                                    <ChevronDown size={12} strokeWidth={3} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Basket Icon decorator */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-[#7c32ff] rounded-l-xl flex items-center justify-center">
                            <Layout className="text-white" size={18} />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FeesInstallment;
