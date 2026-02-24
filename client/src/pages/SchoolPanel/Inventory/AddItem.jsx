import React, { useState } from 'react';
import { Card, Button } from '../../../components/SnowUI';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

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

const AddItem = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        supplier: '',
        store: '',
        quantity: '',
        price: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Add Item</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Inventory</span>
                    <span>|</span>
                    <span className="text-slate-500">Add Item</span>
                </div>
            </div>

            <div className="px-4">
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px]">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">
                        Item Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Input
                            label="ITEM NAME"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter Item Name"
                            required
                        />
                        <Select
                            label="ITEM CATEGORY"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            placeholder="Select Category"
                            options={['Stationery', 'Furniture', 'Electronics', 'Sports']}
                            required
                        />
                        <Input
                            label="ITEM SUPPLYER"
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleInputChange}
                            placeholder="Enter Supplier Name"
                        />
                        <Input
                            label="ITEM STORE"
                            name="store"
                            value={formData.store}
                            onChange={handleInputChange}
                            placeholder="Enter Store Name"
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
                        <Input
                            label="UNIT PRICE"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Enter Price"
                            type="number"
                        />
                        <div className="md:col-span-3">
                            <Textarea
                                label="DESCRIPTION"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter Description"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-8">
                        <Button
                            onClick={() => navigate('/book-list')}
                            className="bg-white border-2 border-slate-100 text-slate-400 hover:text-slate-600 hover:border-slate-200 rounded-2xl px-8 py-4 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                        >
                            CANCEL
                        </Button>
                        <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all">
                            <span>✓ SAVE ITEM</span>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AddItem;
