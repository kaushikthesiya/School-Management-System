import React, { useState } from 'react';
import {
    Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, ArrowUpRight
} from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';

const Select = ({ label, name, value, onChange, options, placeholder, required }) => (
    <div className="space-y-2 group">
        {label && (
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none shadow-sm h-[46px]"
            >
                <option value="">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-primary transition-colors" size={14} />
        </div>
    </div>
);

const Input = ({ label, name, value, onChange, placeholder, required, type = "text" }) => (
    <div className="space-y-2 group">
        {label && (
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 h-[46px]"
        />
    </div>
);

const AllIssuedBooks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openActionId, setOpenActionId] = useState(null);
    const [criteria, setCriteria] = useState({
        book: '',
        bookId: '',
        subject: ''
    });

    const [issuedBooks] = useState([]);

    const handleCriteriaChange = (e) => {
        const { name, value } = e.target;
        setCriteria(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Issued Book List</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Library</span>
                    <span>|</span>
                    <span className="text-slate-500">Issued Book List</span>
                </div>
            </div>

            {/* Select Criteria Card */}
            <div className="px-4">
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px]">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">
                        Select Criteria
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                        <Select
                            label="BOOK"
                            name="book"
                            value={criteria.book}
                            onChange={handleCriteriaChange}
                            placeholder="Select Book Name"
                            options={['The Great Gatsby', 'To Kill a Mockingbird']}
                        />
                        <Input
                            label="SEARCH BY BOOK ID"
                            name="bookId"
                            value={criteria.bookId}
                            onChange={handleCriteriaChange}
                            placeholder="Search by Book ID"
                        />
                        <Select
                            label="SUBJECT"
                            name="subject"
                            value={criteria.subject}
                            onChange={handleCriteriaChange}
                            placeholder="Select Subjects"
                            options={['Physics', 'Chemistry', 'Mathematics']}
                        />
                    </div>
                    <div className="flex justify-end mt-8">
                        <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-10 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all">
                            <Search size={14} strokeWidth={3} />
                            <span>SEARCH</span>
                        </Button>
                    </div>
                </Card>
            </div>

            {/* List Card */}
            <div className="px-4">
                <Card className="p-8 border-none shadow-snow-lg bg-white rounded-[40px] overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">
                            All Issued Book
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="relative group flex-1 md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={14} strokeWidth={3} />
                                <input
                                    type="text"
                                    placeholder="QUICK SEARCH"
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
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest first:rounded-l-2xl">
                                        ↓ BOOK TITLE
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ BOOK NO
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ ISBN NO
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ MEMBER NAME
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ AUTHOR
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ SUBJECT
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ ISSUE DATE
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ RETURN DATE
                                    </th>
                                    <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest last:rounded-r-2xl">
                                        STATUS
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {issuedBooks.length > 0 ? issuedBooks.map((item, idx) => (
                                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 px-6 font-bold text-slate-600 text-xs">{item.bookTitle}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs">{item.bookNo}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs">{item.isbnNo}</td>
                                        <td className="py-6 px-6 font-bold text-slate-600 text-xs">{item.memberName}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs">{item.author}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs">{item.subject}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs">{item.issueDate}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs">{item.returnDate}</td>
                                        <td className="py-6 px-6 text-right">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === 'Issued' ? 'bg-primary/10 text-primary' : 'bg-green-500/10 text-green-500'}`}>
                                                {item.status}
                                            </span>
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

                    {/* Pagination */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10 px-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Showing 0 to 0 of 0 entries
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
        </div>
    );
};

export default AllIssuedBooks;
