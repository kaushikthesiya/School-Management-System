import React, { useState, useEffect } from 'react';
import { Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, Trash2 } from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const Input = ({ label, name, value, onChange, placeholder, required }) => (
    <div className="space-y-2 group">
        {label && (
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 h-[46px]"
        />
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

const Supplier = () => {
    const { showToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [openActionId, setOpenActionId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        description: ''
    });
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSuppliers = async () => {
        try {
            const res = await api.get('/api/inventory/supplier');
            setSuppliers(res.data);
        } catch (error) {
            showToast('Error fetching suppliers', 'error');
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!formData.name) return showToast('Company Name is required', 'warning');
        setLoading(true);
        try {
            await api.post('/api/inventory/supplier', formData);
            showToast('Supplier saved successfully', 'success');
            setFormData({ name: '', contactPerson: '', email: '', phone: '', address: '', description: '' });
            fetchSuppliers();
        } catch (error) {
            showToast('Error saving supplier', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Supplier List</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Inventory</span>
                    <span>|</span>
                    <span className="text-slate-500">Supplier List</span>
                </div>
            </div>

            <div className="px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left: Add Supplier Form */}
                <Card className="lg:col-span-1 p-8 border-none shadow-snow-lg bg-white rounded-[32px] h-fit">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">
                        Add Supplier
                    </h3>
                    <div className="space-y-6">
                        <Input
                            label="Company Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Company Name *"
                            required
                        />
                        <Input
                            label="Company Address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Company Address *"
                            required
                        />
                        <Input
                            label="CONTACT PERSON NAME"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleInputChange}
                            placeholder="CONTACT PERSON NAME *"
                            required
                        />
                        <Input
                            label="CONTACT PERSON MOBILE"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="CONTACT PERSON MOBILE *"
                            required
                        />
                        <Input
                            label="CONTACT PERSON EMAIL"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="CONTACT PERSON EMAIL"
                        />
                        <Textarea
                            label="DESCRIPTION"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="DESCRIPTION"
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

                {/* Right: Supplier Table */}
                <Card className="lg:col-span-3 p-8 border-none shadow-snow-lg bg-white rounded-[32px] overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">
                            Supplier List
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="relative group flex-1 md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={14} strokeWidth={3} />
                                <input
                                    type="text"
                                    placeholder="SEARCH"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-2xl pl-11 pr-4 py-3 text-[10px] font-black tracking-widest text-slate-600 outline-none transition-all placeholder:text-slate-300"
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
                                    <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Supplier Name</th>
                                    <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Company Name</th>
                                    <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Company Address</th>
                                    <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Email</th>
                                    <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">↓ Mobile</th>
                                    <th className="text-right py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50/50">
                                {suppliers.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((supplier) => (
                                    <tr key={supplier._id} className="group hover:bg-slate-50/30 transition-colors">
                                        <td className="py-4 px-4 text-xs font-bold text-slate-600">{supplier.contactPerson}</td>
                                        <td className="py-4 px-4 text-xs font-bold text-slate-400">{supplier.name}</td>
                                        <td className="py-4 px-4 text-xs font-bold text-slate-400">{supplier.address}</td>
                                        <td className="py-4 px-4 text-xs font-bold text-slate-400 text-blue-500">{supplier.email}</td>
                                        <td className="py-4 px-4 text-xs font-bold text-slate-400">{supplier.phone}</td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="relative inline-block">
                                                <button
                                                    onClick={() => setOpenActionId(openActionId === supplier._id ? null : supplier._id)}
                                                    className={`flex items-center space-x-2 bg-white border border-slate-200 rounded-full pl-6 pr-2 py-1.5 text-[10px] font-black transition-all group/btn shadow-sm active:scale-95 ${openActionId === supplier._id ? 'text-primary border-primary ring-4 ring-primary/5' : 'text-slate-400 hover:text-primary hover:border-primary'}`}
                                                >
                                                    <span className="uppercase tracking-widest">SELECT</span>
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${openActionId === supplier._id ? 'bg-primary text-white' : 'bg-slate-50 group-hover/btn:bg-primary/5'}`}>
                                                        <ChevronDown size={14} className={`transition-transform duration-300 ${openActionId === supplier._id ? 'rotate-180' : ''}`} />
                                                    </div>
                                                </button>
                                                {openActionId === supplier._id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-50 py-2 z-20 animate-in zoom-in-95 duration-200 origin-top-right">
                                                        <button className="w-full px-5 py-3 text-left text-[10px] font-black text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
                                                            <Edit size={14} className="text-slate-300" />
                                                            <span>Edit</span>
                                                        </button>
                                                        <button className="w-full px-5 py-3 text-left text-[10px] font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
                                                            <Trash2 size={14} className="text-red-300" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
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

export default Supplier;
