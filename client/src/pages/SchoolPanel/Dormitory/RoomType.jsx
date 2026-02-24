import React, { useState, useEffect } from 'react';
import {
    Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, Trash2
} from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';
import api from '../../../api/api';

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

const RoomType = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openActionId, setOpenActionId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const [types, setTypes] = useState([]);

    useEffect(() => {
        fetchRoomTypes();
    }, []);

    const fetchRoomTypes = async () => {
        try {
            const res = await api.get('/api/dormitory/room-types');
            setTypes(res.data);
        } catch (error) {
            console.error('Failed to fetch room types');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.name) return alert('Room type name is required');
        try {
            await api.post('/api/dormitory/room-types', formData);
            setFormData({ name: '', description: '' });
            fetchRoomTypes();
        } catch (error) {
            alert('Failed to save room type');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this room type?')) return;
        try {
            await api.delete(`/api/dormitory/room-types/${id}`);
            fetchRoomTypes();
        } catch (error) {
            alert('Failed to delete room type');
        }
    };

    const filteredTypes = types.filter(type =>
        type.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Room Type</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Dormitory</span>
                    <span>|</span>
                    <span className="text-slate-500">Room Type</span>
                </div>
            </div>

            <div className="px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Room Type Card */}
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px] h-fit">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">
                        Add Room Type
                    </h3>
                    <div className="space-y-6">
                        <Input
                            label="ROOM TYPE *"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Room Type *"
                            required
                        />
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                DESCRIPTION
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 min-h-[100px] resize-none"
                            />
                        </div>
                        <div className="flex justify-center pt-6">
                            <Button
                                onClick={handleSubmit}
                                className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all w-full"
                            >
                                <span>✓ SAVE ROOM TYPE</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Room Type List Card */}
                <Card className="lg:col-span-2 p-10 border-none shadow-snow-lg bg-white rounded-[40px] overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">
                            Room Type List
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
                                        ↓ SL
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ Room Type
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ Description
                                    </th>
                                    <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest last:rounded-r-2xl">
                                        ↓ Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredTypes.map((type, idx) => (
                                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 px-6 font-bold text-slate-600 text-xs">{idx + 1}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs">{type.name}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs">{type.description}</td>
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
                                                            <button className="w-full px-5 py-3 text-left text-[10px] font-black text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
                                                                <Edit size={14} className="text-slate-300" />
                                                                <span>Edit</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(type._id)}
                                                                className="w-full px-5 py-3 text-left text-[10px] font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest flex items-center space-x-3"
                                                            >
                                                                <Trash2 size={14} className="text-red-300" />
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10 px-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Showing 1 to 6 of 6 entries
                        </p>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center text-[10px] font-black shadow-lg shadow-primary/20">1</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default RoomType;
