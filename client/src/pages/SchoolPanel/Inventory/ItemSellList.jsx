import React, { useState, useEffect } from 'react';
import { Search, Download, Printer, FileText, LayoutGrid, Plus, ChevronDown } from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const ItemSellList = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openActionId, setOpenActionId] = useState(null);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/inventory/transaction');
            // Filter only "Sell" type for this page
            setTransactions(res.data.filter(t => t.transactionType === 'Sell'));
        } catch (error) {
            showToast('Error fetching transactions', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20 px-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase">Item Sell List</h1>
                <div className="flex flex-col items-end space-y-4">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                        <span>|</span>
                        <span className="hover:text-primary cursor-pointer transition-colors">Inventory</span>
                        <span>|</span>
                        <span className="text-slate-500">Item Sell List</span>
                    </div>
                    <Button
                        onClick={() => navigate('../inventory-sell')}
                        className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-6 py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-xl shadow-purple-500/20 active:scale-95 transition-all"
                    >
                        <Plus size={14} strokeWidth={3} />
                        <span>NEW ITEM SELL</span>
                    </Button>
                </div>
            </div>

            <Card className="p-8 border-none shadow-snow-lg bg-white rounded-[32px] overflow-visible">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest border-l-4 border-primary pl-4">
                        Item Sell List
                    </h3>
                    <div className="flex items-center gap-4">
                        <div className="relative group flex-1 md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={14} strokeWidth={3} />
                            <input
                                type="text"
                                placeholder="SEARCH"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border-none rounded-2xl pl-11 pr-4 py-3 text-[10px] font-black tracking-widest text-slate-600 focus:ring-2 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-300"
                            />
                        </div>
                        <div className="flex items-center p-1 bg-slate-50 border border-slate-100 rounded-2xl translate-y-[-10px]">
                            {[Plus, Plus, Plus, Plus, Plus, LayoutGrid].map((Icon, i) => (
                                <button key={i} className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-400 hover:text-primary transition-all border-r border-slate-100 last:border-none">
                                    <FileText size={12} strokeWidth={3} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ SL</th>
                                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Reference No</th>
                                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Role Name</th>
                                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Buyer Name</th>
                                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Date</th>
                                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Grand Total</th>
                                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Total Quantity</th>
                                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Paid</th>
                                <th className="text-left py-4 px-4 text-[10px) font-black text-slate-400 uppercase tracking-widest">↓ Balance ($)</th>
                                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Status</th>
                                <th className="text-right py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50/50">
                            {transactions.filter(t => t.referenceNo?.toLowerCase().includes(searchTerm.toLowerCase())).map((t, idx) => (
                                <tr key={t._id} className="group hover:bg-slate-50/30 transition-colors">
                                    <td className="py-4 px-4 text-xs font-bold text-slate-400">{idx + 1}</td>
                                    <td className="py-4 px-4 text-xs font-bold text-slate-600">{t.referenceNo || '-'}</td>
                                    <td className="py-4 px-4 text-xs font-bold text-slate-400">{t.role || 'Visitor'}</td>
                                    <td className="py-4 px-4 text-xs font-bold text-slate-400">General Buyer</td>
                                    <td className="py-4 px-4 text-xs font-bold text-slate-400">{new Date(t.date).toLocaleDateString()}</td>
                                    <td className="py-4 px-4 text-xs font-bold text-slate-600">₹{t.price * t.quantity}</td>
                                    <td className="py-4 px-4 text-xs font-bold text-slate-600">{t.quantity}</td>
                                    <td className="py-4 px-4 text-xs font-bold text-emerald-500">₹{t.price * t.quantity}</td>
                                    <td className="py-4 px-4 text-xs font-bold text-slate-400">0.00</td>
                                    <td className="py-4 px-4">
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-wider">
                                            PAID
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <div className="relative inline-block">
                                            <button
                                                onClick={() => setOpenActionId(openActionId === t._id ? null : t._id)}
                                                className={`flex items-center space-x-2 bg-white border border-slate-200 rounded-full pl-6 pr-2 py-1.5 text-[10px] font-black transition-all group/btn shadow-sm active:scale-95 ${openActionId === t._id ? 'text-primary border-primary ring-4 ring-primary/5' : 'text-slate-400 hover:text-primary hover:border-primary'}`}
                                            >
                                                <span className="uppercase tracking-widest">SELECT</span>
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${openActionId === t._id ? 'bg-primary text-white' : 'bg-slate-50 group-hover/btn:bg-primary/5'}`}>
                                                    <ChevronDown size={14} className={`transition-transform duration-300 ${openActionId === t._id ? 'rotate-180' : ''}`} />
                                                </div>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {transactions.length === 0 && (
                                <tr>
                                    <td colSpan="11" className="py-20 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                                        No Data Available In Table
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10 px-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        Showing {transactions.length} to {transactions.length} of {transactions.length} entries
                    </p>
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm active:scale-90" disabled>
                            <ChevronDown size={14} className="rotate-90" />
                        </button>
                        <button className="w-10 h-10 rounded-2xl bg-primary text-white text-[10px] font-black shadow-xl shadow-primary/30 active:scale-90 transition-all">
                            1
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm active:scale-90" disabled>
                            <ChevronDown size={14} className="-rotate-90" />
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ItemSellList;
