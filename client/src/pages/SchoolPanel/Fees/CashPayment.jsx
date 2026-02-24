import React, { useState } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Search,
    Layout,
    ChevronDown,
    Save,
    Check,
    Printer,
    Coins,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ArrowDownLeft,
    Plus,
    CreditCard,
    DollarSign,
    User,
    Calendar,
    FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CashPayment = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const recentCollections = [
        { id: 1, student: 'Destiney Gulgowski', admission: '60032', amount: 1821, date: '18th Feb, 2026', ref: 'CASH_992' },
        { id: 2, student: 'Buddy Corkery', admission: '58053', amount: 1200, date: '18th Feb, 2026', ref: 'CASH_991' },
        { id: 3, student: 'Alphonso Corwin', admission: '70398', amount: 4500, date: '17th Feb, 2026', ref: 'CASH_990' },
        { id: 4, student: 'Junius Kohler', admission: '65886', amount: 850, date: '17th Feb, 2026', ref: 'CASH_989' },
    ];

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
                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Cash Payment (Counter)</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span>Fees</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Cash Payment</span>
                </div>
            </div>

            {/* Collection Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative group hover:scale-[1.02] transition-all">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 group-hover:rotate-12 transition-all">
                            <Coins size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Today's Cash Collection</p>
                            <h3 className="text-2xl font-black text-slate-800 italic mt-1">₹8,371</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative group hover:scale-[1.02] transition-all">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-[#7c32ff] group-hover:rotate-12 transition-all">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Total Transactions</p>
                            <h3 className="text-2xl font-black text-slate-800 italic mt-1">42 Today</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-[#1e1e2d] rounded-[32px] overflow-hidden relative group hover:scale-[1.02] transition-all">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:rotate-12 transition-all">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-100/40 uppercase tracking-widest italic tracking-wider">Counter Status</p>
                            <h3 className="text-xl font-black text-emerald-400 italic mt-1 uppercase tracking-widest">OPEN</h3>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                {/* Record Payment Form */}
                <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden sticky top-24">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">Record New Payment</h3>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label required>ADMISSION NO</Label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                                <input
                                    type="text"
                                    placeholder="60032"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all italic"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label required>AMOUNT COLLECTED</Label>
                            <div className="relative group">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all tabular-nums"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label required>DATE</Label>
                            <div className="relative group">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                                <input
                                    type="date"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>REMARKS</Label>
                            <textarea
                                placeholder="Payment notes..."
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all min-h-[100px] resize-none"
                            />
                        </div>
                        <div className="flex justify-center pt-4">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-10 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center space-x-2 w-full justify-center">
                                <Check size={14} strokeWidth={3} />
                                <span>RECORD PAYMENT</span>
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Recent Collections List */}
                <div className="lg:col-span-3">
                    <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Recent Cash Collections</h3>

                            <div className="relative group">
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                                <input
                                    type="text"
                                    placeholder="SEARCH TRANSACTION"
                                    className="bg-transparent border-b border-slate-100 py-2 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:border-[#7c32ff] transition-all w-64"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-50 italic text-slate-400">
                                        <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">Student</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">Adm No</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">Ref No</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">Amount</th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black uppercase tracking-widest">Date</th>
                                        <th className="text-right py-5 px-6 text-[10px] font-black uppercase tracking-widest">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentCollections.map((rec) => (
                                        <tr key={rec.id} className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                            <td className="py-5 px-6 text-[11px] font-bold text-slate-600 italic uppercase">{rec.student}</td>
                                            <td className="py-5 px-6 text-[11px] font-bold text-slate-400 italic tabular-nums">{rec.admission}</td>
                                            <td className="py-5 px-6 text-[10px] font-bold text-[#7c32ff] font-mono tracking-tighter">{rec.ref}</td>
                                            <td className="py-5 px-6 text-[11px] font-black text-slate-600 italic tabular-nums">₹{rec.amount.toLocaleString()}</td>
                                            <td className="py-5 px-6 text-[10px] font-bold text-slate-400 italic uppercase">{rec.date}</td>
                                            <td className="py-5 px-6 text-right">
                                                <button className="bg-white border-2 border-purple-100 text-[#7c32ff] rounded-full px-5 py-1.5 text-[9px] font-black uppercase tracking-widest hover:bg-[#7c32ff] hover:text-white hover:border-[#7c32ff] transition-all flex items-center space-x-2 inline-flex">
                                                    <Printer size={12} />
                                                    <span>RECEIPT</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Basket Icon decorator */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-[#7c32ff] rounded-l-xl flex items-center justify-center">
                            <DollarSign className="text-white" size={18} />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CashPayment;
