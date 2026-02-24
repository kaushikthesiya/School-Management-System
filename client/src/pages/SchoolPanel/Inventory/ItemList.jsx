import React, { useState } from 'react';
import { Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, Trash2, Eye, Plus } from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';
import { useNavigate } from 'react-router-dom';

const ItemList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [openActionId, setOpenActionId] = useState(null);

    // Mock data for items
    const [items] = useState([
        {
            id: 1,
            name: 'Ball Point Pen',
            category: 'Stationery',
            supplier: 'Office Depot',
            store: 'Main Store',
            quantity: 500,
            price: 15,
            date: '2024-02-15',
            status: 'Available'
        },
        {
            id: 2,
            name: 'A4 Paper Ream',
            category: 'Stationery',
            supplier: 'Paper Co.',
            store: 'Main Store',
            quantity: 100,
            price: 250,
            date: '2024-02-10',
            status: 'Low Stock'
        },
        {
            id: 3,
            name: 'Student Desk',
            category: 'Furniture',
            supplier: 'School Furnishings',
            store: 'Warehouse A',
            quantity: 50,
            price: 2500,
            date: '2024-01-20',
            status: 'Available'
        }
    ]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Item List</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Inventory</span>
                    <span>|</span>
                    <span className="text-slate-500">Item List</span>
                </div>
            </div>

            {/* List Card */}
            <div className="px-4">
                <Card className="p-8 border-none shadow-snow-lg bg-white rounded-3xl overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div className="flex-1 max-w-md relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={14} strokeWidth={3} />
                            <input
                                type="text"
                                placeholder="QUICK SEARCH ITEM"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border-none rounded-2xl pl-11 pr-4 py-3 text-[10px] font-black tracking-widest text-slate-600 focus:ring-2 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-300"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={() => navigate('/add-inventory')}
                                className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                            >
                                <Plus size={16} strokeWidth={3} />
                                <span>ADD ITEM</span>
                            </Button>
                            <div className="flex items-center p-1 bg-slate-50 rounded-2xl">
                                {[Download, Printer, FileText, LayoutGrid].map((Icon, i) => (
                                    <button key={i} className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-400 hover:text-primary transition-all">
                                        <Icon size={14} strokeWidth={3} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest first:rounded-l-2xl">
                                        ↓ NAME
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ CATEGORY
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ SUPPLIER
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ STORE
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ QTY
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ PRICE
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ DATE
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ STATUS
                                    </th>
                                    <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest last:rounded-r-2xl">
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {items.length > 0 ? items.map((item) => (
                                    <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-bold text-slate-600">{item.name}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-medium text-slate-500">{item.category}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-medium text-slate-400">{item.supplier}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-medium text-slate-400">{item.store}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className={`text-xs font-black ${item.quantity < 100 ? 'text-red-500' : 'text-slate-600'}`}>{item.quantity}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-bold text-slate-600">₹{item.price}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-medium text-slate-400">{item.date}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.status === 'Available' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-6 px-6 text-right relative">
                                            <div className="relative inline-block">
                                                <button
                                                    onClick={() => setOpenActionId(openActionId === item.id ? null : item.id)}
                                                    className={`flex items-center space-x-2 bg-white border border-slate-200 rounded-full pl-6 pr-2 py-1.5 text-[10px] font-black transition-all group/btn shadow-sm active:scale-95 ${openActionId === item.id ? 'text-primary border-primary ring-4 ring-primary/5' : 'text-slate-400 hover:text-primary hover:border-primary'}`}
                                                >
                                                    <span className="uppercase tracking-widest">SELECT</span>
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${openActionId === item.id ? 'bg-primary text-white' : 'bg-slate-50 group-hover/btn:bg-primary/5'}`}>
                                                        <ChevronDown size={14} className={`transition-transform duration-300 ${openActionId === item.id ? 'rotate-180' : ''}`} />
                                                    </div>
                                                </button>

                                                {openActionId === item.id && (
                                                    <>
                                                        <div className="fixed inset-0 z-10" onClick={() => setOpenActionId(null)} />
                                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-50 py-2 z-20 animate-in zoom-in-95 duration-200 origin-top-right">
                                                            <button className="w-full px-5 py-3 text-left text-[10px] font-black text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
                                                                <Eye size={14} className="text-slate-300" />
                                                                <span>View</span>
                                                            </button>
                                                            <button className="w-full px-5 py-3 text-left text-[10px] font-black text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
                                                                <Edit size={14} className="text-slate-300" />
                                                                <span>Edit</span>
                                                            </button>
                                                            <button className="w-full px-5 py-3 text-left text-[10px] font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
                                                                <Trash2 size={14} className="text-red-300" />
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="9" className="py-20 text-center text-xs font-black text-slate-300 uppercase tracking-widest">
                                            No Data Available In Table
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination - Reused snow style */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10 px-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Showing {items.length} to {items.length} of {items.length} entries
                        </p>
                        <div className="flex items-center space-x-3">
                            <button className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm active:scale-90 disabled:opacity-50" disabled>
                                <ChevronDown size={14} className="rotate-90" />
                            </button>
                            <button className="w-10 h-10 rounded-2xl bg-primary text-white text-[10px] font-black shadow-xl shadow-primary/30 active:scale-90 transition-all">
                                1
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm active:scale-90 disabled:opacity-50" disabled>
                                <ChevronDown size={14} className="-rotate-90" />
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ItemList;
