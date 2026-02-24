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
    Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BankPayment = () => {
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

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Bank Payment</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span>Fees Collection</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Bank Payment</span>
                </div>
            </div>

            {/* Select Criteria */}
            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-10">Select Criteria</h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-2">
                        <Label>DATE RANGE</Label>
                        <div className="relative group">
                            <input
                                type="text"
                                defaultValue="02/11/2026 - 02/18/2026"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>CLASS</Label>
                        <div className="relative group">
                            <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none italic">
                                <option>Select Class</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={14} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>SECTION</Label>
                        <div className="relative group">
                            <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none italic">
                                <option>Select Section</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={14} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>STATUS</Label>
                        <div className="relative group">
                            <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none italic">
                                <option>Status</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#7c32ff] transition-colors" size={14} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-10 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center space-x-2">
                        <Search size={14} strokeWidth={3} />
                        <span>SEARCH</span>
                    </Button>
                </div>
            </Card>

            {/* Bank Payment List */}
            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Bank Payment List</h3>

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
                            <ActionIcon Icon={FileText} />
                            <ActionIcon Icon={Download} />
                            <ActionIcon Icon={Layout} />
                            <ActionIcon Icon={Printer} />
                            <ActionIcon Icon={Layout} />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-50 italic text-slate-400">
                                <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">
                                    <div className="flex items-center space-x-1"><span>↓Student Name</span></div>
                                </th>
                                <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">
                                    <div className="flex items-center space-x-1"><span>↓View Transaction</span></div>
                                </th>
                                <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">
                                    <div className="flex items-center space-x-1"><span>↓Date</span></div>
                                </th>
                                <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">
                                    <div className="flex items-center space-x-1"><span>↓Amount</span></div>
                                </th>
                                <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">
                                    <div className="flex items-center space-x-1"><span>↓Note</span></div>
                                </th>
                                <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">
                                    <div className="flex items-center space-x-1"><span>↓File</span></div>
                                </th>
                                <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">
                                    <div className="flex items-center space-x-1"><span>↓Status</span></div>
                                </th>
                                <th className="text-right py-5 px-6 text-[10px] font-black uppercase tracking-widest">
                                    <div className="flex items-center space-x-1 justify-end"><span>↓Actions</span></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                <td colSpan="8" className="py-20 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">
                                    No Data Available In Table
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Showing 0 to 0 of 0 entries</span>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-xl text-slate-300 hover:text-[#7c32ff] transition-all disabled:opacity-30">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="p-2 rounded-xl text-slate-300 hover:text-[#7c32ff] transition-all disabled:opacity-30">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Basket Icon decorator */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-[#7c32ff] rounded-l-xl flex items-center justify-center">
                    <Layout className="text-white" size={18} />
                </div>
            </Card>
        </div>
    );
};

export default BankPayment;
