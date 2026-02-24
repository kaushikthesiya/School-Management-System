import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card, Input } from '../../components/SnowUI';
import { Layers, Clock, Bookmark, Plus, X, GraduationCap, Trash2 } from 'lucide-react';

const AcademicConfiguration = () => {
    const [structure, setStructure] = useState({ mediums: [], shifts: [], streams: [], departments: [] });
    const [newItem, setNewItem] = useState('');
    const [openModal, setOpenModal] = useState(null); // 'medium', 'shift', 'stream', 'department'

    const fetchStructure = async () => {
        try {
            const { data } = await api.get('/api/academic/structure');
            setStructure(data || { mediums: [], shifts: [], streams: [], departments: [] });
        } catch (error) {
            console.error('Error fetching structure', error);
        }
    };

    useEffect(() => {
        fetchStructure();
    }, []);

    const updateStructure = async (updatedData) => {
        try {
            const { data } = await api.patch('/api/academic/structure', updatedData);
            setStructure(data);
        } catch (error) {
            alert('Error updating structure');
        }
    };

    const handleAdd = async () => {
        if (!newItem) return;
        const field = openModal === 'medium' ? 'mediums' : openModal === 'shift' ? 'shifts' : openModal === 'stream' ? 'streams' : 'departments';
        const updated = { ...structure, [field]: [...(structure[field] || []), newItem] };
        await updateStructure(updated);
        setNewItem('');
        setOpenModal(null);
    };

    const handleRemove = async (field, index) => {
        if (!confirm('Are you sure you want to remove this item?')) return;
        const updated = { ...structure, [field]: structure[field].filter((_, i) => i !== index) };
        await updateStructure(updated);
    };

    const ConfigurationCard = ({ title, icon: Icon, data, type }) => (
        <Card className="p-8 border-none shadow-snow-lg rounded-[30px] bg-white h-full relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />

            <div className="flex justify-between items-center mb-6 relative z-10">
                <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-2xl bg-purple-50 text-[#7c32ff]">
                        <Icon size={20} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-lg font-black text-slate-700 uppercase tracking-tight italic">{title}</h3>
                </div>
                <button
                    onClick={() => setOpenModal(type)}
                    className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#7c32ff] hover:text-white flex items-center justify-center transition-all shadow-sm"
                >
                    <Plus size={18} />
                </button>
            </div>

            <div className="flex flex-wrap gap-3 relative z-10">
                {data && data.length > 0 ? (
                    data.map((item, i) => (
                        <div key={i} className="group/item flex items-center space-x-2 bg-slate-50 border border-slate-100 pl-4 pr-2 py-2 rounded-xl text-xs font-black text-slate-600 uppercase tracking-widest hover:border-purple-200 transition-colors">
                            <span>{typeof item === 'object' ? item.name : item}</span>
                            <button
                                onClick={() => handleRemove(type === 'medium' ? 'mediums' : type === 'shift' ? 'shifts' : type === 'stream' ? 'streams' : 'departments', i)}
                                className="p-1 rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="w-full py-8 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest italic">
                        No {title} Configured
                    </div>
                )}
            </div>
        </Card>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">Academic Configuration</h1>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Master Data Setup</p>
                </div>
                <div className="flex space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Admin Setup</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Configuration</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ConfigurationCard title="Medium" icon={Layers} data={structure.mediums} type="medium" />
                <ConfigurationCard title="Stream" icon={Bookmark} data={structure.streams} type="stream" />
                <ConfigurationCard title="Shift" icon={Clock} data={structure.shifts} type="shift" />
                <ConfigurationCard title="Department" icon={GraduationCap} data={structure.departments} type="department" />
            </div>

            {/* Simple Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <Card className="w-full max-w-sm p-8 rounded-[40px] shadow-2xl bg-white border-2 border-white animate-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight italic mb-6">
                            Add New {openModal}
                        </h3>
                        <div className="space-y-6">
                            <Input
                                placeholder={`Enter ${openModal} Name`}
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                autoFocus
                            />
                            <div className="flex space-x-4">
                                <Button
                                    onClick={() => { setOpenModal(null); setNewItem(''); }}
                                    className="flex-1 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-2xl py-4 font-black text-[10px] uppercase tracking-widest"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleAdd}
                                    className="flex-1 bg-[#7c32ff] text-white hover:bg-[#6b25ea] rounded-2xl py-4 font-black text-[10px] uppercase tracking-widest shadow-xl shadow-purple-500/20"
                                >
                                    Add Item
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AcademicConfiguration;
