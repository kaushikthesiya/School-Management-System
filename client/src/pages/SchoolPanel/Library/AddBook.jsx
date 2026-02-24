import React, { useState, useEffect } from 'react';
import { ChevronDown, Check, Loader2 } from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';
import api from '../../../api/api';

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

const AddBook = () => {
    const [saving, setSaving] = useState(false);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        isbn: '',
        author: '',
        category: '',
        subject: '',
        shelf: '',
        publisher: '',
        publishDate: '',
        copies: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        api.get('/api/library/categories')
            .then(({ data }) => setCategories(Array.isArray(data) ? data : []))
            .catch(err => console.error('Fetch categories error:', err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title) {
            alert('Book title is required');
            return;
        }
        setSaving(true);
        try {
            await api.post('/api/library/books', formData);
            alert('Book saved successfully!');
            setFormData({
                title: '', isbn: '', author: '', category: '', subject: '',
                shelf: '', publisher: '', publishDate: '', copies: '', price: '', description: ''
            });
        } catch (err) {
            alert(err?.response?.data?.message || 'Failed to save book');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Add Book</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Library</span>
                    <span>|</span>
                    <span className="text-slate-500">Add Book</span>
                </div>
            </div>

            <div className="px-4">
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px]">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">Book Information</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Input label="BOOK TITLE" name="title" value={formData.title} onChange={handleInputChange} placeholder="Book Title *" required />
                            <Input label="ISBN" name="isbn" value={formData.isbn} onChange={handleInputChange} placeholder="ISBN No." />
                            <Input label="AUTHOR" name="author" value={formData.author} onChange={handleInputChange} placeholder="Author Name" />
                            <Select
                                label="CATEGORY"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder="Select Category"
                                options={categories.map(c => ({ value: c, label: c }))}
                            />
                            <Input label="SUBJECT" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" />
                            <Input label="SHELF" name="shelf" value={formData.shelf} onChange={handleInputChange} placeholder="Shelf No." />
                            <Input label="PUBLISHER" name="publisher" value={formData.publisher} onChange={handleInputChange} placeholder="Publisher" />
                            <Input label="PUBLISH DATE" name="publishDate" value={formData.publishDate} onChange={handleInputChange} placeholder="Publish Date" type="date" />
                            <Input label="COPIES" name="copies" value={formData.copies} onChange={handleInputChange} placeholder="Number of Copies" type="number" />
                            <Input label="PRICE" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" type="number" />
                        </div>
                        <div className="mt-6 space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">DESCRIPTION</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 min-h-[100px] resize-none"
                            />
                        </div>
                        <div className="flex justify-center pt-8">
                            <Button
                                type="submit"
                                disabled={saving}
                                className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-16 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} strokeWidth={3} />}
                                <span>SAVE BOOK</span>
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AddBook;
