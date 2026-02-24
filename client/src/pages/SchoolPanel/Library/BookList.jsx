import React, { useState, useEffect } from 'react';
import {
    Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Eye, Edit, Trash2, Loader2
} from 'lucide-react';
import { Card } from '../../../components/SnowUI';
import api from '../../../api/api';

const BookList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openActionId, setOpenActionId] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/library/books');
            setBooks(data);
        } catch (err) {
            console.error('Fetch books error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBooks(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        try {
            await api.delete(`/api/library/books/${id}`);
            fetchBooks();
        } catch (err) {
            alert('Failed to delete book');
        }
        setOpenActionId(null);
    };

    const filtered = books.filter(b =>
        (b.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.author || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.isbn || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Book List</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Library</span>
                    <span>|</span>
                    <span className="text-slate-500">Book List</span>
                </div>
            </div>

            <div className="px-4">
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px] overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Book List</h3>
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
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="animate-spin text-primary" size={24} />
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        {['↓ SL', '↓ BOOK TITLE', '↓ ISBN', '↓ AUTHOR', '↓ CATEGORY', '↓ COPIES', '↓ AVAILABLE', '↓ ACTION'].map((h, i) => (
                                            <th key={i} className={`py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest ${i === 7 ? 'text-right last:rounded-r-2xl' : 'text-left first:rounded-l-2xl'}`}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filtered.length > 0 ? filtered.map((b, idx) => (
                                        <tr key={b._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 px-6 font-bold text-slate-600 text-xs">{idx + 1}</td>
                                            <td className="py-6 px-6 text-slate-700 text-xs font-semibold">{b.title}</td>
                                            <td className="py-6 px-6 text-slate-400 text-xs">{b.isbn || '-'}</td>
                                            <td className="py-6 px-6 text-slate-400 text-xs">{b.author || '-'}</td>
                                            <td className="py-6 px-6 text-slate-400 text-xs">{b.category?.name || b.category || '-'}</td>
                                            <td className="py-6 px-6 text-slate-400 text-xs">{b.copies ?? '-'}</td>
                                            <td className="py-6 px-6 text-xs">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black ${(b.availableCopies ?? b.copies) > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                                    {b.availableCopies ?? b.copies ?? '-'}
                                                </span>
                                            </td>
                                            <td className="py-6 px-6 text-right relative">
                                                <div className="relative inline-block">
                                                    <button
                                                        onClick={() => setOpenActionId(openActionId === idx ? null : idx)}
                                                        className={`flex items-center space-x-2 bg-white border border-slate-200 rounded-full pl-6 pr-2 py-1.5 text-[10px] font-black transition-all group/btn shadow-sm active:scale-95 ${openActionId === idx ? 'text-primary border-primary ring-4 ring-primary/5' : 'text-slate-400 hover:text-primary hover:border-primary'}`}
                                                    >
                                                        <span className="uppercase tracking-widest">SELECT</span>
                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${openActionId === idx ? 'bg-primary text-white' : 'bg-slate-50 group-hover/btn:bg-primary/5'}`}>
                                                            <ChevronDown size={14} className={`transition-transform duration-300 ${openActionId === idx ? 'rotate-180' : ''}`} />
                                                        </div>
                                                    </button>
                                                    {openActionId === idx && (
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
                                                                <button onClick={() => handleDelete(b._id)} className="w-full px-5 py-3 text-left text-[10px] font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
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
                                            <td colSpan="8" className="py-20 text-center text-xs font-black text-slate-300 uppercase tracking-widest">
                                                No Books Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-10 px-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Total {filtered.length} entries
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default BookList;
