import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Card, Button, Input, Badge } from '../../components/SnowUI';
import { Search, Plus, Download, Printer, FileText, FileSpreadsheet, Copy, LayoutGrid, Trash2, Edit3, Check, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '../../context/ToastContext';

const PostalReceive = () => {
    const { showToast } = useToast();
    const [receives, setReceives] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        fromTitle: '',
        referenceNo: '',
        address: '',
        note: '',
        toTitle: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        file: null,
        type: 'Receive'
    });

    const fetchReceives = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin-section/postals/receive');
            setReceives(data);
        } catch (error) {
            console.error('Fetch Postal Receive Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReceives();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'file' && formData[key]) {
                    data.append('file', formData[key]);
                } else {
                    data.append(key, formData[key]);
                }
            });

            await api.post('/api/admin-section/postals', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            showToast('Postal receive record saved successfully!');
            setFormData({
                fromTitle: '',
                referenceNo: '',
                address: '',
                note: '',
                toTitle: '',
                date: format(new Date(), 'yyyy-MM-dd'),
                file: null,
                type: 'Receive'
            });
            fetchReceives();
        } catch (error) {
            showToast('Error saving postal receive record', 'error');
            console.error('Add Postal Receive Error:', error);
        }
    };

    const filteredReceives = receives.filter(item =>
        item.fromTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.referenceNo?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Postal Receive
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Admin Section</span>
                    <span>|</span>
                    <span className="text-primary/70">Postal Receive</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Add Postal Receive Form */}
                <Card className="lg:col-span-4 p-8 border-none shadow-snow-lg rounded-[20px] bg-white">
                    <h2 className="text-[#3E4D67] text-lg font-bold mb-8">Add Postal Receive</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <Input
                                label="FROM TITLE *"
                                className="!rounded-lg !px-4 !py-3 !border-slate-200"
                                value={formData.fromTitle}
                                onChange={e => setFormData({ ...formData, fromTitle: e.target.value })}
                                required
                            />

                            <Input
                                label="REFERENCE NO *"
                                className="!rounded-lg !px-4 !py-3 !border-slate-200"
                                value={formData.referenceNo}
                                onChange={e => setFormData({ ...formData, referenceNo: e.target.value })}
                                required
                            />

                            <Input
                                label="ADDRESS *"
                                className="!rounded-lg !px-4 !py-3 !border-slate-200"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                required
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy-700 ml-1 uppercase text-[#A3AED0] text-[11px]">NOTE</label>
                                <textarea
                                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-navy-700 h-24 resize-none"
                                    value={formData.note}
                                    onChange={e => setFormData({ ...formData, note: e.target.value })}
                                />
                            </div>

                            <Input
                                label="TO TITLE *"
                                className="!rounded-lg !px-4 !py-3 !border-slate-200"
                                value={formData.toTitle}
                                onChange={e => setFormData({ ...formData, toTitle: e.target.value })}
                                required
                            />

                            <Input
                                label="DATE"
                                type="date"
                                className="!rounded-lg !px-4 !py-3 !border-slate-200"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />

                            {/* Custom File Input */}
                            <div className="relative">
                                <div className="flex items-center border border-slate-200 rounded-lg p-1 bg-white">
                                    <input
                                        type="text"
                                        readOnly
                                        placeholder="File"
                                        value={formData.file ? formData.file.name : ''}
                                        className="flex-1 px-4 py-2 border-none focus:ring-0 text-slate-500 text-sm"
                                    />
                                    <label className="bg-[#7c32ff] text-white px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-opacity-90 transition-all">
                                        Browse
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={e => setFormData({ ...formData, file: e.target.files[0] })}
                                        />
                                    </label>
                                </div>
                                <p className="text-[10px] text-[#7c32ff] mt-2 font-medium">
                                    (PDF,DOC,DOCX,JPG,JPEG,PNG,TXT are allowed for upload)
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            <Button type="submit" className="!bg-[#7c32ff] !rounded-lg w-full flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                                <Check size={18} />
                                <span className="uppercase text-xs font-bold tracking-widest">Save Postal Receive</span>
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Postal Receive List */}
                <Card className="lg:col-span-8 p-0 border-none shadow-snow rounded-[20px] overflow-hidden bg-white min-h-[600px]">
                    <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
                        <h2 className="text-lg font-bold text-[#3E4D67]">Postal Receive List</h2>

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
                            <div className="flex p-1 bg-slate-50 rounded-lg border border-slate-100">
                                {[Copy, FileSpreadsheet, FileText, Download, Printer, LayoutGrid].map((Icon, i) => (
                                    <button key={i} className="p-2 hover:bg-white hover:text-primary hover:shadow-sm rounded-md text-slate-400 transition-all">
                                        <Icon size={14} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">From Title</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Reference No</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Address</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">To Title</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Date</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-20 text-center">
                                            <div className="w-10 h-10 border-4 border-primary/10 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Fetching records...</span>
                                        </td>
                                    </tr>
                                ) : filteredReceives.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-20 text-center text-slate-400 italic font-medium">
                                            No postal received records found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredReceives.map((item) => (
                                        <tr key={item._id} className="group hover:bg-slate-50/30 transition-colors">
                                            <td className="px-8 py-5 text-sm font-black text-slate-700 italic uppercase">{item.fromTitle}</td>
                                            <td className="px-6 py-5 text-sm font-bold text-slate-500">{item.referenceNo}</td>
                                            <td className="px-6 py-5 text-sm font-bold text-slate-500 max-w-[200px] truncate">{item.address}</td>
                                            <td className="px-6 py-5 text-sm font-black text-slate-700 italic uppercase">{item.toTitle}</td>
                                            <td className="px-6 py-5 text-sm font-bold text-slate-500">
                                                {item.date ? format(new Date(item.date), 'do MMM, yyyy') : '-'}
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex justify-end">
                                                    <button className="flex items-center space-x-2 px-4 py-1.5 border border-purple-200 text-[#7c32ff] text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#7c32ff] hover:text-white transition-all group/btn">
                                                        <span>Select</span>
                                                        <ChevronDown size={14} className="group-hover/btn:translate-y-0.5 transition-transform" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PostalReceive;
