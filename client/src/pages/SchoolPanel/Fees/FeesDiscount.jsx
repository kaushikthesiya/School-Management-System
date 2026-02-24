import React, { useState } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Search,
    Copy,
    Layout,
    ChevronDown,
    Save,
    Check,
    Printer,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeesDiscount = () => {
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

    const discounts = [
        { id: 1, name: 'Sibling Discount', code: 'SIB10', type: 'Percentage', amount: '10%' },
        { id: 2, name: 'Early Bird', code: 'EB500', type: 'Fixed', amount: '₹500' },
        { id: 3, name: 'Staff Child', code: 'STF50', type: 'Percentage', amount: '50%' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Fees Discount</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span className="hover:text-[#1C1C1C] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                        <span>|</span>
                        <span>Fees</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Fees Discount</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                {/* Add Discount Form */}
                <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden sticky top-24">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">Add Discount</h3>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label required>NAME</Label>
                            <input
                                type="text"
                                placeholder="Discount Name"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label required>DISCOUNT CODE</Label>
                            <input
                                type="text"
                                placeholder="SIB10"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label required>TYPE</Label>
                            <div className="relative group">
                                <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none italic" required>
                                    <option value="percentage">Percentage (%)</option>
                                    <option value="fixed">Fixed (₹)</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={14} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label required>AMOUNT/VALUE</Label>
                            <input
                                type="number"
                                placeholder="Value"
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

                {/* Discount List */}
                <div className="lg:col-span-3">
                    <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Discount List</h3>

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
                                        <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">Code</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">Type</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">Amount</th>
                                        <th className="text-right py-5 px-6 text-[10px] font-black uppercase tracking-widest">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {discounts.map((disc) => (
                                        <tr key={disc.id} className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                            <td className="py-5 px-6 text-[11px] font-bold text-slate-600 uppercase italic">{disc.name}</td>
                                            <td className="py-5 px-6 text-[11px] font-bold text-slate-500 italic uppercase">{disc.code}</td>
                                            <td className="py-5 px-6 text-[11px] font-bold text-slate-400 italic uppercase">{disc.type}</td>
                                            <td className="py-5 px-6 text-[11px] font-bold text-[#7c32ff] tabular-nums">{disc.amount}</td>
                                            <td className="py-5 px-6 text-right">
                                                <button className="bg-white border-2 border-purple-100 text-[#7c32ff] rounded-full px-6 py-1.5 text-[9px] font-black uppercase tracking-widest hover:bg-[#7c32ff] hover:text-white hover:border-[#7c32ff] transition-all flex items-center space-x-2 inline-flex">
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

export default FeesDiscount;
