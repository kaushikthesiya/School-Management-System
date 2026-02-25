import React, { useState, useEffect } from 'react';
import { Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, Trash2, Calendar, ShoppingCart } from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

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
                    <option key={opt._id || opt} value={opt._id || opt}>{opt.name || opt}</option>
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
        <div className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 h-[46px]"
            />
            {type === 'date' && <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-primary transition-colors" size={14} />}
        </div>
    </div>
);

const Textarea = ({ label, name, value, onChange, placeholder }) => (
    <div className="space-y-2 group">
        {label && (
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label}
            </label>
        )}
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 min-h-[100px] resize-none"
        />
    </div>
);

const IssueItem = () => {
    const { showToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [issuedItems, setIssuedItems] = useState([]);
    const [formData, setFormData] = useState({
        role: '',
        user: '', // This would be populated based on role
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date().toISOString().split('T')[0],
        category: '',
        item: '',
        quantity: '',
        note: ''
    });

    const fetchData = async () => {
        try {
            const [itemRes, catRes, transRes] = await Promise.all([
                api.get('/api/inventory/item').catch(e => ({ data: [], error: 'items' })),
                api.get('/api/inventory/category').catch(e => ({ data: [], error: 'categories' })),
                api.get('/api/inventory/transaction').catch(e => ({ data: [], error: 'transactions' }))
            ]);

            if (itemRes.error) showToast(`Error fetching ${itemRes.error}`, 'error');
            if (catRes.error) showToast(`Error fetching ${catRes.error}`, 'error');
            if (transRes.error) showToast(`Error fetching ${transRes.error}`, 'error');

            setItems(Array.isArray(itemRes.data) ? itemRes.data : []);
            setCategories(Array.isArray(catRes.data) ? catRes.data : []);
            setIssuedItems(Array.isArray(transRes.data) ? transRes.data.filter(t => t.transactionType === 'Issue') : []);
        } catch (error) {
            showToast('Error initializing data', 'error');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!formData.item || !formData.quantity || !formData.role) {
            return showToast('Please fill all required fields', 'warning');
        }
        setLoading(true);
        try {
            await api.post('/api/inventory/transaction', {
                item: formData.item,
                quantity: formData.quantity,
                role: formData.role,
                buyerName: formData.user, // Reusing buyerName for convenience
                date: formData.issueDate,
                dueDate: formData.dueDate,
                note: formData.note,
                transactionType: 'Issue',
                price: 0
            });
            showToast('Item issued successfully', 'success');
            setFormData({
                role: '',
                user: '',
                issueDate: new Date().toISOString().split('T')[0],
                dueDate: new Date().toISOString().split('T')[0],
                category: '',
                item: '',
                quantity: '',
                note: ''
            });
            fetchData();
        } catch (error) {
            showToast(error.response?.data?.message || 'Error issuing item', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20 px-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase">Issue Item List</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Inventory</span>
                    <span>|</span>
                    <span className="text-slate-500">Issue Item List</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
                {/* Floating Cart Icon */}
                <div className="absolute -right-2 top-0 bg-[#7c32ff] text-white p-2 rounded-lg shadow-lg shadow-purple-500/30 cursor-pointer z-10 hover:scale-110 transition-transform">
                    <ShoppingCart size={18} strokeWidth={2.5} />
                </div>

                {/* Left: Issue a Item Form */}
                <Card className="lg:col-span-1 p-8 border-none shadow-snow-lg bg-white rounded-[32px] h-fit">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">
                        Issue a Item
                    </h3>
                    <div className="space-y-6">
                        <Select
                            label="ROLE"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            placeholder="User Type *"
                            options={['Admin', 'Teacher', 'Student', 'Staff']}
                            required
                        />
                        <Input
                            label="ISSUE DATE"
                            name="issueDate"
                            value={formData.issueDate}
                            onChange={handleInputChange}
                            type="date"
                            required
                        />
                        <Input
                            label="DUE DATE"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleInputChange}
                            type="date"
                            required
                        />
                        <Select
                            label="CATEGORY"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            placeholder="Item Category *"
                            options={categories}
                            required
                        />
                        <Select
                            label="NAME"
                            name="item"
                            value={formData.item}
                            onChange={handleInputChange}
                            placeholder="Item Name *"
                            options={items.filter(i => !formData.category || i.category?._id === formData.category)}
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
                        <Textarea
                            label="NOTE"
                            name="note"
                            value={formData.note}
                            onChange={handleInputChange}
                            placeholder="Note"
                        />
                        <div className="flex justify-center pt-4">
                            <Button
                                onClick={handleSave}
                                disabled={loading}
                                className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-12 py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 shadow-xl shadow-purple-500/20 active:scale-95 transition-all w-fit"
                            >
                                <span>{loading ? 'SAVING...' : '✓ SAVE'}</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Right: Issued Item List Table */}
                <Card className="lg:col-span-3 p-8 border-none shadow-snow-lg bg-white rounded-[32px] overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest border-l-4 border-primary pl-4">
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
                            <div className="flex items-center p-1 bg-slate-50 border border-slate-100 rounded-2xl translate-y-[-10px]">
                                {[Download, Printer, FileText, FileText, Printer, LayoutGrid].map((Icon, i) => (
                                    <button key={i} className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-400 hover:text-primary transition-all border-r border-slate-100 last:border-none">
                                        <Icon size={12} strokeWidth={3} />
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
                                    <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Item Name</th>
                                    <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Item Category</th>
                                    <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Issue To</th>
                                    <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Issue Date</th>
                                    <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Return Date</th>
                                    <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Quantity</th>
                                    <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Status</th>
                                    <th className="text-right py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50/50">
                                {issuedItems.filter(t => t.item?.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item, idx) => (
                                    <tr key={item._id} className="group hover:bg-slate-50/30 transition-colors">
                                        <td className="py-4 px-4 text-xs font-bold text-slate-400">{idx + 1}</td>
                                        <td className="py-4 px-4 text-xs font-bold text-slate-600">{item.item?.name}</td>
                                        <td className="py-4 px-4 text-xs font-bold text-slate-400">{item.item?.category?.name}</td>
                                        <td className="py-4 px-4 text-xs font-bold text-slate-400">{item.role || 'User'}</td>
                                        <td className="py-4 px-4 text-xs font-bold text-slate-400">{new Date(item.date).toLocaleDateString()}</td>
                                        <td className="py-4 px-4 text-xs font-bold text-slate-400">{new Date(item.dueDate || item.date).toLocaleDateString()}</td>
                                        <td className="py-4 px-4 text-xs font-bold text-slate-600">{item.quantity}</td>
                                        <td className="py-4 px-4">
                                            <span className="px-3 py-1 bg-amber-50 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-wider">
                                                ISSUED
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <button className="text-slate-300 hover:text-primary transition-colors">
                                                <ChevronDown size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {issuedItems.length === 0 && (
                                    <tr>
                                        <td colSpan="9" className="py-20 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
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
                            Showing {issuedItems.length} to {issuedItems.length} of {issuedItems.length} entries
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
        </div>
    );
};

export default IssueItem;
