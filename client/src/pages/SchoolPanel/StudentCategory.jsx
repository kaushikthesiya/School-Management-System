import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card, Input } from '../../components/SnowUI';
import { Save, Search, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const StudentCategory = () => {
    const { showToast } = useToast();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ category: '' });
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/api/academic/student-categories');
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching categories:', error);
            showToast('Error fetching categories', 'error');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/api/academic/student-categories', formData);
            setFormData({ category: '' });
            showToast('Category added successfully!');
            fetchCategories();
        } catch (error) {
            console.error('Error saving category:', error);
            showToast('Error saving category', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        try {
            await api.delete(`/api/academic/student-categories/${id}`);
            showToast('Category deleted successfully!');
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            showToast('Error deleting category', 'error');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Student Category
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Student Info</span>
                    <span>|</span>
                    <span className="text-primary/70">Student Category</span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column: Form */}
                <div className="w-full lg:w-1/3">
                    <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white overflow-hidden rounded-3xl">
                        <div className="bg-slate-50/50 p-6 border-b border-slate-50">
                            <h2 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] flex items-center space-x-3">
                                <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                <span>Add Student Category</span>
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">Category Name *</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#1C1C1C]/10 focus:border-[#1C1C1C] transition-all"
                                    placeholder="Enter Category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#1C1C1C] hover:bg-black text-white rounded-xl w-full py-3.5 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all text-[11px] font-black italic uppercase tracking-[0.2em]"
                                >
                                    <Save size={18} strokeWidth={3} />
                                    <span>{loading ? 'Saving...' : 'Save Category'}</span>
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Right Column: List */}
                <div className="w-full lg:w-2/3">
                    <Card className="p-6 border-none shadow-snow-lg rounded-[20px] bg-white">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-[#3E4D67]">Category List</h2>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Quick Search..."
                                    className="w-full bg-slate-50 border-none rounded-full py-2 pl-10 pr-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/20 transition-all"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-slate-100">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#F8FAFC] border-b border-slate-100 uppercase tracking-widest text-[9px] font-black text-slate-400">
                                        <th className="px-6 py-4">ID</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-[11px] font-bold">
                                    {categories.map((item) => (
                                        <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 text-slate-400">#{item._id}</td>
                                            <td className="px-6 py-4 text-slate-700">{item.category}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button className="p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-[#7c32ff] hover:border-[#7c32ff] transition-all">
                                                        <Edit2 size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-red-500 hover:border-red-500 transition-all"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {categories.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-8 text-center text-xs font-bold text-slate-400 italic">
                                                No categories found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StudentCategory;
