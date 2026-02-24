import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Card, Button, Input } from '../../components/SnowUI';
import { Search, Plus, Trash2, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminSetup = () => {
    const { showToast } = useToast();
    const [setups, setSetups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
    const [typeSearch, setTypeSearch] = useState('');
    const [formData, setFormData] = useState({
        type: 'Type *',
        name: '',
        description: ''
    });

    const [expandedCategories, setExpandedCategories] = useState(['Complaint Type']);

    const types = ['Purpose', 'Complaint Type', 'Source', 'Reference'];

    const fetchSetups = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin-section/admin-setup');
            setSetups(data);
        } catch (error) {
            console.error('Fetch Admin Setup Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSetups();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.type === 'Type *') {
            showToast('Please select a type', 'error');
            return;
        }
        try {
            await api.post('/api/admin-section/admin-setup', formData);
            showToast('Setup saved successfully!');
            setFormData({
                type: 'Type *',
                name: '',
                description: ''
            });
            fetchSetups();
        } catch (error) {
            showToast('Error saving setup', 'error');
            console.error('Add Setup Error:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/admin-section/admin-setup/${id}`);
            showToast('Setup deleted successfully!');
            fetchSetups();
        } catch (error) {
            showToast('Error deleting setup', 'error');
        }
    };

    const toggleCategory = (cat) => {
        if (expandedCategories.includes(cat)) {
            setExpandedCategories(expandedCategories.filter(c => c !== cat));
        } else {
            setExpandedCategories([...expandedCategories, cat]);
        }
    };

    const filteredTypes = types.filter(t => t.toLowerCase().includes(typeSearch.toLowerCase()));

    const groupedSetups = types.reduce((acc, type) => {
        acc[type] = setups.filter(s => s.type === type && (
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.description?.toLowerCase().includes(searchQuery.toLowerCase())
        ));
        return acc;
    }, {});

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Admin Setup</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Admin Section</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Admin Setup</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Add Admin Setup Form */}
                <div className="lg:col-span-4">
                    <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white overflow-hidden rounded-3xl">
                        <div className="bg-slate-50/50 p-6 border-b border-slate-50">
                            <h2 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] flex items-center space-x-3">
                                <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                                <span>Add Admin Setup</span>
                            </h2>
                        </div>
                        <div className="p-8">

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-4">
                                    {/* Searchable Dropdown */}
                                    <div className="space-y-2 relative">
                                        <label className="text-sm font-bold text-navy-700 ml-1 uppercase text-[#A3AED0] text-[11px]">TYPE *</label>
                                        <div
                                            className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-3 cursor-pointer hover:border-primary transition-all"
                                            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                                        >
                                            <span className={`text-sm ${formData.type === 'Type *' ? 'text-slate-400' : 'text-slate-700'}`}>{formData.type}</span>
                                            <ChevronDown size={16} className={`text-slate-400 transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
                                        </div>

                                        {isTypeDropdownOpen && (
                                            <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-snow-lg animate-in slide-in-from-top-2 duration-200 p-2">
                                                <div className="relative mb-2">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                                    <input
                                                        type="text"
                                                        placeholder="Search..."
                                                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-xs outline-none"
                                                        value={typeSearch}
                                                        onChange={e => setTypeSearch(e.target.value)}
                                                        onClick={e => e.stopPropagation()}
                                                    />
                                                </div>
                                                <div className="max-h-48 overflow-y-auto">
                                                    {filteredTypes.map(type => (
                                                        <div
                                                            key={type}
                                                            className={`px-4 py-2.5 text-xs font-medium rounded-lg cursor-pointer transition-colors ${formData.type === type ? 'bg-primary/5 text-primary' : 'hover:bg-slate-50 text-slate-600'}`}
                                                            onClick={() => {
                                                                setFormData({ ...formData, type });
                                                                setIsTypeDropdownOpen(false);
                                                                setTypeSearch('');
                                                            }}
                                                        >
                                                            {type}
                                                        </div>
                                                    ))}
                                                    {filteredTypes.length === 0 && (
                                                        <div className="px-4 py-3 text-[10px] text-slate-400 italic text-center uppercase tracking-widest">No types found</div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <Input
                                        label="NAME *"
                                        className="!rounded-lg !px-4 !py-3 !border-slate-200"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy-700 ml-1 uppercase text-[#A3AED0] text-[11px]">DESCRIPTION</label>
                                        <textarea
                                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-navy-700 h-24 resize-none"
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-center pt-4">
                                    <Button type="submit" className="!bg-[#7c32ff] !rounded-lg w-full flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                                        <Check size={18} />
                                        <span className="uppercase text-xs font-bold tracking-widest">Save Setup</span>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>

                {/* Admin Setup List */}
                <Card className="lg:col-span-8 p-8 border-none shadow-snow rounded-[20px] bg-white min-h-[600px]">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 text-center md:text-left">
                        <h2 className="text-lg font-bold text-[#3E4D67]">Admin Setup List</h2>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                <input
                                    type="text"
                                    placeholder="QUICK SEARCH"
                                    className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-[10px] font-black tracking-widest text-slate-500 focus:ring-2 focus:ring-primary/10 w-48 transition-all"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            <div className="py-20 text-center">
                                <div className="w-10 h-10 border-4 border-primary/10 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Loading data...</span>
                            </div>
                        ) : (
                            types.map(type => (
                                <div key={type} className="rounded-xl overflow-hidden border border-slate-50 shadow-sm">
                                    <div
                                        className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-all ${expandedCategories.includes(type) ? 'bg-[#7c32ff] text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                                        onClick={() => toggleCategory(type)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${expandedCategories.includes(type) ? 'border-white/30' : 'border-slate-200'}`}>
                                                <div className={`w-2 h-2 rounded-full ${expandedCategories.includes(type) ? 'bg-white' : 'bg-slate-200'}`}></div>
                                            </div>
                                            <span className="text-sm font-bold tracking-tight uppercase">{type}</span>
                                        </div>
                                        <Plus size={20} className={`transition-transform duration-300 ${expandedCategories.includes(type) ? 'rotate-45' : ''}`} />
                                    </div>

                                    {expandedCategories.includes(type) && (
                                        <div className="p-4 bg-white divide-y divide-slate-50 animate-in slide-in-from-top-2 duration-300">
                                            {groupedSetups[type].length === 0 ? (
                                                <p className="py-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[2px]">No data available in {type}</p>
                                            ) : (
                                                groupedSetups[type].map(item => (
                                                    <div key={item._id} className="flex justify-between items-center py-4 px-4 hover:bg-slate-50/50 rounded-lg group transition-colors">
                                                        <div>
                                                            <p className="text-sm font-black text-slate-700 italic uppercase">{item.name}</p>
                                                            {item.description && <p className="text-xs text-slate-400 mt-1 font-medium">{item.description}</p>}
                                                        </div>
                                                        <button
                                                            onClick={() => handleDelete(item._id)}
                                                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminSetup;
