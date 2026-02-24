import React, { useState, useEffect } from 'react';
import {
    Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, Trash2, Loader2
} from 'lucide-react';
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

const Textarea = ({ label, name, value, onChange, placeholder, required }) => (
    <div className="space-y-2 group">
        {label && (
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label} {required && <span className="text-red-500">*</span>}
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

const Vehicle = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openActionId, setOpenActionId] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editId, setEditId] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [formData, setFormData] = useState({
        vehicleNumber: '',
        type: '',
        vehicleModel: '',
        yearMade: '',
        driverName: '',
        driverLicense: '',
        driverPhone: '',
        capacity: '',
        route: '',
        note: ''
    });

    const fetchMasterData = async () => {
        try {
            const { data } = await api.get('/api/transport/routes');
            setRoutes(data);
        } catch (err) {
            console.error('Fetch routes error:', err);
        }
    };

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/transport/vehicles');
            setVehicles(data);
        } catch (err) {
            console.error('Fetch vehicles error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
        fetchMasterData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            vehicleNumber: '',
            type: '',
            vehicleModel: '',
            yearMade: '',
            driverName: '',
            driverLicense: '',
            driverPhone: '',
            capacity: '',
            route: '',
            note: ''
        });
        setEditId(null);
    };

    const handleSubmit = async () => {
        if (!formData.vehicleNumber || !formData.type) {
            alert('Vehicle Number and Type are required');
            return;
        }
        setSaving(true);
        try {
            if (editId) {
                await api.put(`/api/transport/vehicles/${editId}`, formData);
            } else {
                await api.post('/api/transport/vehicles', formData);
            }
            resetForm();
            fetchVehicles();
        } catch (err) {
            alert(err?.response?.data?.message || 'Failed to save vehicle');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (v) => {
        setEditId(v._id);
        setFormData({
            vehicleNumber: v.vehicleNumber || '',
            type: v.type || '',
            vehicleModel: v.vehicleModel || '',
            yearMade: v.yearMade || '',
            driverName: v.driverName || '',
            driverLicense: v.driverLicense || '',
            driverPhone: v.driverPhone || '',
            capacity: v.capacity || '',
            route: v.route || '',
            note: v.note || ''
        });
        setOpenActionId(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
        try {
            await api.delete(`/api/transport/vehicles/${id}`);
            fetchVehicles();
        } catch (err) {
            alert('Failed to delete vehicle');
        }
        setOpenActionId(null);
    };

    const filtered = vehicles.filter(v =>
        (v.vehicleNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (v.driverName || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Vehicle</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Transport</span>
                    <span>|</span>
                    <span className="text-slate-500">Vehicle</span>
                </div>
            </div>

            <div className="px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add/Edit Vehicle Card */}
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px] h-fit">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">
                        {editId ? 'Edit Vehicle' : 'Add Vehicle'}
                    </h3>
                    <div className="space-y-6">
                        <Input label="VEHICLE NUMBER" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleInputChange} placeholder="Vehicle Number *" required />
                        <Input label="VEHICLE TYPE" name="type" value={formData.type} onChange={handleInputChange} placeholder="Type (e.g. Bus, Van) *" required />
                        <Input label="VEHICLE MODEL" name="vehicleModel" value={formData.vehicleModel} onChange={handleInputChange} placeholder="Vehicle Model" />
                        <Input label="YEAR MADE" name="yearMade" value={formData.yearMade} onChange={handleInputChange} placeholder="Year Made" />
                        <Input label="DRIVER NAME" name="driverName" value={formData.driverName} onChange={handleInputChange} placeholder="Driver Name" />
                        <Input label="DRIVER LICENSE" name="driverLicense" value={formData.driverLicense} onChange={handleInputChange} placeholder="Driver License No." />
                        <Input label="DRIVER PHONE" name="driverPhone" value={formData.driverPhone} onChange={handleInputChange} placeholder="Driver Phone" />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="CAPACITY" name="capacity" value={formData.capacity} onChange={handleInputChange} placeholder="Capacity" type="number" />
                            <Select
                                label="ASSIGN ROUTE"
                                name="route"
                                value={formData.route}
                                onChange={handleInputChange}
                                options={routes.map(r => ({ value: r._id, label: r.title }))}
                                placeholder="Select Route"
                            />
                        </div>
                        <Textarea label="NOTE" name="note" value={formData.note} onChange={handleInputChange} placeholder="Note" />
                        <div className="flex gap-3 pt-2">
                            {editId && (
                                <button onClick={resetForm} className="flex-1 border border-slate-200 rounded-2xl py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">
                                    CANCEL
                                </button>
                            )}
                            <Button
                                onClick={handleSubmit}
                                disabled={saving}
                                className="flex-1 bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {saving ? <Loader2 size={14} className="animate-spin" /> : <span>✓ {editId ? 'UPDATE' : 'SAVE VEHICLE'}</span>}
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Vehicle List Card */}
                <Card className="lg:col-span-2 p-10 border-none shadow-snow-lg bg-white rounded-[40px] overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Vehicle List</h3>
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
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="animate-spin text-primary" size={24} />
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        {['↓ VEHICLE NO', '↓ TYPE', '↓ MODEL NO', '↓ YEAR MADE', '↓ DRIVER NAME', '↓ DRIVER LICENSE', '↓ PHONE', '↓ CAPACITY', '↓ ROUTE', '↓ ACTION'].map((h, i) => (
                                            <th key={i} className={`py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest ${i === 9 ? 'text-right last:rounded-r-2xl' : 'text-left first:rounded-l-2xl'}`}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filtered.length > 0 ? filtered.map((v, idx) => (
                                        <tr key={v._id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 px-6 font-bold text-slate-600 text-xs">{v.vehicleNumber}</td>
                                            <td className="py-6 px-6 text-slate-400 text-xs">{v.type || '-'}</td>
                                            <td className="py-6 px-6 text-slate-400 text-xs">{v.vehicleModel || '-'}</td>
                                            <td className="py-6 px-6 text-slate-400 text-xs">{v.yearMade || '-'}</td>
                                            <td className="py-6 px-6 text-slate-400 text-xs">{v.driverName || '-'}</td>
                                            <td className="py-6 px-6 text-slate-400 text-xs">{v.driverLicense || '-'}</td>
                                            <td className="py-6 px-6 text-slate-400 text-xs">{v.driverPhone || '-'}</td>
                                            <td className="py-6 px-6 text-slate-400 text-xs">{v.capacity || '-'}</td>
                                            <td className="py-6 px-6 text-slate-400 text-xs">{routes.find(r => r._id === v.route)?.title || '-'}</td>
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
                                                                <button onClick={() => handleEdit(v)} className="w-full px-5 py-3 text-left text-[10px] font-black text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
                                                                    <Edit size={14} className="text-slate-300" />
                                                                    <span>Edit</span>
                                                                </button>
                                                                <button onClick={() => handleDelete(v._id)} className="w-full px-5 py-3 text-left text-[10px] font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
                                                                    <Trash2 size={14} className="text-red-300" />
                                                                    <span>Delete</span>
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="11" className="py-20 text-center text-xs font-black text-slate-300 uppercase tracking-widest">
                                                No Vehicles Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-10 px-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Total {filtered.length} entries
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Vehicle;
