import React, { useState, useEffect } from 'react';
import {
    Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, ArrowUpRight, X, Check
} from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';
import api from '../../../api/api';

const Modal = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
            <Card className="w-full max-w-2xl p-8 bg-white rounded-[32px] shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-all">
                        <X size={20} strokeWidth={3} />
                    </button>
                </div>
                {children}
            </Card>
        </div>
    );
};

const IssueReturnBook = () => {
    const [activeTab, setActiveTab] = useState('issue'); // 'issue' | 'issued'
    const [searchTerm, setSearchTerm] = useState('');
    const [openActionId, setOpenActionId] = useState(null);
    const [members, setMembers] = useState([]);
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [books, setBooks] = useState([]);
    const [bookSearch, setBookSearch] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (activeTab === 'issue') {
            fetchMembers();
        } else {
            fetchIssuedBooks();
        }
    }, [activeTab]);

    const fetchMembers = async (search = '') => {
        setLoading(true);
        try {
            const res = await api.get(`/api/library/members?search=${search}`);
            setMembers(res.data);
        } catch (error) {
            console.error('Failed to fetch members');
        } finally {
            setLoading(false);
        }
    };

    const fetchIssuedBooks = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/library/issued');
            setIssuedBooks(res.data);
        } catch (error) {
            console.error('Failed to fetch issued books');
        } finally {
            setLoading(false);
        }
    };

    const fetchBooks = async (search = '') => {
        try {
            const res = await api.get(`/api/library/books?search=${search}`);
            // Filter only available books
            setBooks(res.data.filter(b => (b.availableQty || b.quantity || 1) > 0));
        } catch (error) {
            console.error('Failed to fetch books');
        }
    };

    const handleIssueBook = async () => {
        if (!selectedBook || !dueDate) return alert('Select a book and due date');
        try {
            await api.post(`/api/library/books/${selectedBook._id}/issue`, {
                memberId: selectedMember.memberId,
                memberName: selectedMember.name,
                memberType: selectedMember.type,
                dueDate
            });
            setIsModalOpen(false);
            setSelectedBook(null);
            fetchMembers(searchTerm);
            alert('Book issued successfully');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to issue book');
        }
    };

    const handleReturnBook = async (bookId) => {
        if (!window.confirm('Return this book?')) return;
        try {
            const res = await api.post(`/api/library/books/${bookId}/return`);
            fetchIssuedBooks();
            alert(`Book returned. Fine: ${res.data.fine || 0}`);
        } catch (error) {
            alert('Failed to return book');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Tabs & Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 gap-4">
                <div className="flex items-center p-1.5 bg-slate-100/50 rounded-2xl w-full md:w-auto">
                    <button
                        onClick={() => setActiveTab('issue')}
                        className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'issue' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Issue Book
                    </button>
                    <button
                        onClick={() => setActiveTab('issued')}
                        className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'issued' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Issued Books
                    </button>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Library</span>
                    <span>|</span>
                    <span className="text-slate-500">Issue Books</span>
                </div>
            </div>

            {/* List Card */}
            <div className="px-4">
                <Card className="p-8 border-none shadow-snow-lg bg-white rounded-3xl overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">
                            {activeTab === 'issue' ? 'Member List' : 'Issued Books List'}
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="relative group flex-1 md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={14} strokeWidth={3} />
                                <input
                                    type="text"
                                    placeholder="SEARCH"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        if (activeTab === 'issue') fetchMembers(e.target.value);
                                    }}
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
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    {activeTab === 'issue' ? (
                                        <>
                                            <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest first:rounded-l-2xl">↓ MEMBER ID</th>
                                            <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ FULL NAME</th>
                                            <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ MEMBER TYPE</th>
                                            <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest last:rounded-r-2xl">↓ ACTION</th>
                                        </>
                                    ) : (
                                        <>
                                            <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest first:rounded-l-2xl">↓ BOOK TITLE</th>
                                            <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ ISSUED TO</th>
                                            <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ DUE DATE</th>
                                            <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest last:rounded-r-2xl">↓ ACTION</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {activeTab === 'issue' ? (
                                    members.length > 0 ? members.map((member, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 px-6 font-bold text-slate-600 text-xs">{member.memberId}</td>
                                            <td className="py-6 px-6 font-bold text-slate-600 text-xs">{member.name}</td>
                                            <td className="py-6 px-6 text-slate-400 text-xs font-medium">{member.type}</td>
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
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedMember(member);
                                                                        setIsModalOpen(true);
                                                                        setOpenActionId(null);
                                                                        setSelectedBook(null);
                                                                        setDueDate('');
                                                                        setBookSearch('');
                                                                        fetchBooks();
                                                                    }}
                                                                    className="w-full px-5 py-3 text-left text-[10px] font-black text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors uppercase tracking-widest flex items-center space-x-3"
                                                                >
                                                                    <ArrowUpRight size={14} className="text-slate-300" />
                                                                    <span>Issue Book</span>
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="4" className="py-20 text-center text-xs font-black text-slate-300 uppercase tracking-widest">No Members Found</td></tr>
                                    )
                                ) : (
                                    issuedBooks.length > 0 ? issuedBooks.map((book, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 px-6 font-bold text-slate-600 text-xs">{book.title}</td>
                                            <td className="py-6 px-6">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-slate-600">{book.issuedTo?.memberName}</span>
                                                    <span className="text-[10px] font-medium text-slate-400">{book.issuedTo?.memberId}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 px-6 text-slate-400 text-xs font-medium">
                                                {new Date(book.dueDate).toLocaleDateString()}
                                            </td>
                                            <td className="py-6 px-6 text-right">
                                                <Button
                                                    onClick={() => handleReturnBook(book._id)}
                                                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6 py-2 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                                                >
                                                    Return
                                                </Button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="4" className="py-20 text-center text-xs font-black text-slate-300 uppercase tracking-widest">No Issued Books</td></tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10 px-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Showing {activeTab === 'issue' ? members.length : issuedBooks.length} entries
                        </p>
                        <div className="flex items-center space-x-3">
                            <button className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm active:scale-90 disabled:opacity-50" disabled>
                                <ChevronDown size={14} className="rotate-90" />
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm active:scale-90 disabled:opacity-50" disabled>
                                <ChevronDown size={14} className="-rotate-90" />
                            </button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Issue Book Modal */}
            <Modal
                title={`Issue Book to ${selectedMember?.name}`}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className="space-y-6">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Book</label>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={14} strokeWidth={3} />
                            <input
                                type="text"
                                placeholder="SEARCH BOOK BY TITLE, AUTHOR OR ISBN"
                                value={bookSearch}
                                onChange={(e) => {
                                    setBookSearch(e.target.value);
                                    fetchBooks(e.target.value);
                                }}
                                className="w-full bg-slate-50 border-none rounded-2xl pl-11 pr-4 py-3 text-[10px] font-black tracking-widest text-slate-600 focus:ring-2 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-300"
                            />
                        </div>

                        <div className="max-h-60 overflow-y-auto space-y-2 mt-4 pr-2 custom-scrollbar">
                            {books.length > 0 ? books.map(book => (
                                <button
                                    key={book._id}
                                    onClick={() => setSelectedBook(book)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${selectedBook?._id === book._id ? 'bg-primary/5 border-primary text-primary shadow-sm' : 'bg-white border-slate-100 text-slate-600 hover:border-primary/30'}`}
                                >
                                    <div className="text-left">
                                        <p className="text-xs font-bold">{book.title}</p>
                                        <p className="text-[10px] font-medium opacity-60 tracking-wider uppercase">{book.author} | {book.isbn}</p>
                                    </div>
                                    {selectedBook?._id === book._id && <Check size={16} strokeWidth={3} />}
                                </button>
                            )) : (
                                <p className="text-center py-10 text-[10px] font-black text-slate-300 uppercase tracking-widest">No Available Books Found</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-xs font-bold text-slate-600 focus:ring-2 focus:ring-primary/10 outline-none transition-all h-[50px]"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 px-8 py-4 rounded-2xl bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <Button
                            onClick={handleIssueBook}
                            className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-2xl py-4 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-primary/30 active:scale-95 transition-all"
                        >
                            Confirm Issue
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default IssueReturnBook;
