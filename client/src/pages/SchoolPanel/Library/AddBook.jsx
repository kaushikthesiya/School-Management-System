import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
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
    <div className="space-y-2">
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
    const [formData, setFormData] = useState({
        bookTitle: '',
        category: '',
        subject: '',
        bookNo: '',
        isbnNo: '',
        publisherName: '',
        authorName: '',
        rackNumber: '',
        quantity: '',
        bookPrice: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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

            {/* Form Card */}
            <div className="px-4">
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px]">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-10">
                        Add Book
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <Input
                            label="BOOK TITLE"
                            name="bookTitle"
                            value={formData.bookTitle}
                            onChange={handleChange}
                            placeholder="Book Title"
                            required
                        />
                        <Select
                            label="BOOK CATEGORIES"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Select Book Category"
                            options={['Fiction', 'Science', 'History']}
                            required
                        />
                        <Select
                            label="SUBJECT"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Select Subjects"
                            options={['Physics', 'Chemistry', 'Mathematics']}
                            required
                        />
                        <Input
                            label="BOOK NO"
                            name="bookNo"
                            value={formData.bookNo}
                            onChange={handleChange}
                            placeholder="Book No"
                        />

                        <Input
                            label="ISBN NO"
                            name="isbnNo"
                            value={formData.isbnNo}
                            onChange={handleChange}
                            placeholder="ISBN No"
                        />
                        <Input
                            label="PUBLISHER NAME"
                            name="publisherName"
                            value={formData.publisherName}
                            onChange={handleChange}
                            placeholder="Publisher Name"
                        />
                        <Input
                            label="AUTHOR NAME"
                            name="authorName"
                            value={formData.authorName}
                            onChange={handleChange}
                            placeholder="Author Name"
                        />
                        <Input
                            label="RACK NUMBER"
                            name="rackNumber"
                            value={formData.rackNumber}
                            onChange={handleChange}
                            placeholder="Rack Number"
                        />

                        <Input
                            label="QUANTITY"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Quantity"
                            type="number"
                        />
                        <Input
                            label="BOOK PRICE"
                            name="bookPrice"
                            value={formData.bookPrice}
                            onChange={handleChange}
                            placeholder="Book Price"
                            type="number"
                        />
                    </div>

                    <div className="mt-10 space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            DESCRIPTION
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full h-32 p-6 bg-white border border-slate-200 rounded-3xl outline-none text-xs font-medium text-slate-600 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 resize-none"
                            placeholder="Write description here..."
                        ></textarea>
                    </div>

                    <div className="flex justify-center mt-12">
                        <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all">
                            <span>✓ SAVE BOOK</span>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AddBook;
