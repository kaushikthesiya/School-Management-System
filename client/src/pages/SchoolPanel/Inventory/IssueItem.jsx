import React, { useState } from 'react';
import { Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, Trash2, Plus } from 'lucide-react';
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

const IssueItem = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [issueRole, setIssueRole] = useState('');
    const [formData, setFormData] = useState({
        userType: '',
        userName: '',
        issueDate: '',
        returnDate: '',
        itemCategory: '',
        item: '',
        quantity: ''
    });

    const [issuedItems] = useState([
        { id: 1, item: 'Ball Point Pen', category: 'Stationery', user: 'John Doe (Teacher)', date: '2024-02-18', return: '2024-02-25', qty: 5, status: 'Issued' },
        { id: 2, item: 'Projector', category: 'Electronics', user: 'Class 1-A (Student)', date: '2024-02-18', return: '2024-02-18', qty: 1, status: 'Returned' },
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Issue Item</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Inventory</span>
                    <span>|</span>
                    <span className="text-slate-500">Issue Item</span>
                </div>
            </div>

            <div className="px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Issue Form */}
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px] h-fit">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">
                        Issue Item
                    </h3>
                    <div className="space-y-6">
                        <Select
                            label="USER TYPE"
                            name="userType"
                            value={formData.userType}
                            onChange={handleInputChange}
                            placeholder="Select User Role"
                            options={['Admin', 'Teacher', 'Student', 'Staff']}
                            required
                        />
                        <Select
                            label="ISSUE TO"
                            name="userName"
                            value={formData.userName}
                            onChange={handleInputChange}
                            placeholder="Select User"
                            options={['John Doe', 'Jane Smith']}
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="ISSUE DATE"
                                name="issueDate"
                                value={formData.issueDate}
                                onChange={handleInputChange}
                                type="date"
                                required
                            />
                            <Input
                                label="RETURN DATE"
                                name="returnDate"
                                value={formData.returnDate}
                                onChange={handleInputChange}
                                type="date"
                                required
                            />
                        </div>
                        <Select
                            label="ITEM CATEGORY"
                            name="itemCategory"
                            value={formData.itemCategory}
                            onChange={handleInputChange}
                            placeholder="Select Category"
                            options={['Stationery', 'Furniture', 'Electronics']}
                            required
                        />
                        <Select
                            label="ITEM"
                            name="item"
                            value={formData.item}
                            onChange={handleInputChange}
                            placeholder="Select Item"
                            options={['Pen', 'Paper', 'Desk']}
                            required
                        />
                        <Input
                            label="QUANTITY"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            placeholder="Enter Quantity"
                            type="number"
                            required
                        />

                        <div className="flex justify-center pt-6">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all w-full">
                                <span>✓ ISSUE ITEM</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Issued List */}
                <Card className="lg:col-span-2 p-10 border-none shadow-snow-lg bg-white rounded-[40px] overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">
                            Issued Item List
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
                        </div>
                    </div>

                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest first:rounded-l-2xl">
                                        ↓ ITEM
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ CATEGORY
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ ISSUE TO
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ DATE
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ RETURN
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ QTY
                                    </th>
                                    <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest last:rounded-r-2xl">
                                        STATUS
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {issuedItems.map((item, idx) => (
                                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 px-6 font-bold text-slate-600 text-xs">{item.item}</td>
                                        <td className="py-6 px-6 text-slate-500 text-xs">{item.category}</td>
                                        <td className="py-6 px-6 text-slate-500 text-xs">{item.user}</td>
                                        <td className="py-6 px-6 text-slate-500 text-xs">{item.date}</td>
                                        <td className="py-6 px-6 text-slate-500 text-xs">{item.return}</td>
                                        <td className="py-6 px-6 text-slate-600 text-xs font-bold">{item.qty}</td>
                                        <td className="py-6 px-6 text-right">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.status === 'Issued' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default IssueItem;
