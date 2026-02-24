import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card } from '../../components/SnowUI';
import { Search, Plus, Trash2, MoreVertical, CheckCircle2, Layout, User } from 'lucide-react';

const ClassRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        roomNo: '',
        capacity: ''
    });

    const fetchRooms = async () => {
        try {
            const res = await api.get('/api/academic/class-rooms');
            setRooms(res.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.roomNo || !formData.capacity) {
            alert('Please fill all fields');
            return;
        }
        setLoading(true);
        try {
            await api.post('/api/academic/class-rooms', formData);
            setFormData({ roomNo: '', capacity: '' });
            fetchRooms();
        } catch (error) {
            console.error('Error adding room:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this room?')) return;
        try {
            await api.delete(`/api/academic/class-rooms/${id}`);
            fetchRooms();
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Class Room
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Academics</span>
                    <span>|</span>
                    <span className="text-primary/70">Class Room</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Add Form */}
                <div className="lg:col-span-1">
                    <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white sticky top-24">
                        <h2 className="text-[#3E4D67] text-lg font-bold mb-8">Add Class Room</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Room No *</label>
                                <input
                                    className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all placeholder:text-slate-200"
                                    type="text"
                                    placeholder="Enter Room Number"
                                    value={formData.roomNo}
                                    onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Capacity *</label>
                                <input
                                    className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all placeholder:text-slate-200"
                                    type="number"
                                    placeholder="Enter Capacity"
                                    value={formData.capacity}
                                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="flex justify-center pt-6">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="!bg-[#7c32ff] !rounded-lg flex items-center space-x-2 px-8 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all text-white font-black italic uppercase tracking-widest text-[11px]"
                                >
                                    <CheckCircle2 size={16} />
                                    <span>{loading ? 'Saving...' : 'Save Class Room'}</span>
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Right Column: Room List */}
                <div className="lg:col-span-3">
                    <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden">
                        <div className="flex justify-between items-center mb-8 px-2">
                            <h2 className="text-lg font-bold text-[#3E4D67]">Class Room List</h2>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="SEARCH"
                                    className="bg-slate-50 border-none rounded-full py-2 px-10 text-[11px] font-black text-slate-400 focus:ring-2 focus:ring-[#7c32ff]/20 transition-all outline-none w-48 group-hover:w-64 duration-300"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-[20px]">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#F8FAFC] border-y border-slate-100 uppercase tracking-widest text-[11px] font-black text-slate-400">
                                        <th className="px-6 py-4">↓ Room No</th>
                                        <th className="px-6 py-4">↓ Capacity</th>
                                        <th className="px-6 py-4 text-right">↓ Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-[13px] font-bold">
                                    {rooms.map((room) => (
                                        <tr key={room._id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-slate-700 uppercase italic underline decoration-primary/5 decoration-4">
                                                {room.roomNo}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-[#F8FAFC] text-[#7c32ff] px-3 py-1 rounded-md text-[10px] font-black tracking-widest border border-slate-100 uppercase">
                                                    {room.capacity}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleDelete(room._id)}
                                                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <button className="border border-slate-200 rounded-full px-4 py-1.5 flex items-center space-x-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-[#7c32ff] hover:text-[#7c32ff] transition-all bg-white overflow-hidden shadow-sm">
                                                        <span>Select</span>
                                                        <MoreVertical size={12} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {rooms.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-20 text-center text-slate-400 italic font-medium">
                                                No Data Available In Table
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

export default ClassRooms;
