import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Card, Button, Input } from '../../components/SnowUI';
import { Search, Plus, Trash2, Printer, Copy, FileText, LayoutGrid, ChevronDown, Calendar, Check, Upload } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Certificate = () => {
    const { showToast } = useToast();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        headerLeft: '',
        date: new Date().toISOString().split('T')[0],
        body: '',
        bodyFont: 'Inter',
        fontSize: '14px',
        footerLeft: '',
        footerCenter: '',
        footerRight: '',
        pageLayout: 'Portrait',
        height: '',
        width: '',
        studentPhoto: true
    });
    const [bgImage, setBgImage] = useState(null);

    const fetchCertificates = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/admin-section/certificates');
            setCertificates(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Fetch Certificates Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (bgImage) data.append('backgroundImage', bgImage);

        try {
            await api.post('/api/admin-section/certificates', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            showToast('Certificate saved successfully!');
            setFormData({
                name: '', headerLeft: '', date: new Date().toISOString().split('T')[0],
                body: '', bodyFont: 'Inter', fontSize: '14px',
                footerLeft: '', footerCenter: '', footerRight: '',
                pageLayout: 'Portrait', height: '', width: '', studentPhoto: true
            });
            setBgImage(null);
            fetchCertificates();
        } catch (error) {
            showToast('Error saving certificate', 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/admin-section/certificates/${id}`);
            showToast('Certificate deleted successfully!');
            fetchCertificates();
        } catch (error) {
            showToast('Error deleting certificate', 'error');
        }
    };

    const variables = [
        '[name]', '[dob]', '[present_address]', '[guardian]', '[created_at]',
        '[admission_no]', '[roll_no]', '[gender]', '[admission_date]', '[category]',
        '[cast]', '[father_name]', '[mother_name]', '[religion]', '[email]',
        '[phone]', '[course_name]', '[class]', '[section]'
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Certificate
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Admin Section</span>
                    <span>|</span>
                    <span className="text-primary/70">Certificate</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Form Column */}
                <Card className="lg:col-span-4 p-8 border-none shadow-snow-lg rounded-[30px] bg-white">
                    <h2 className="text-[#3E4D67] text-lg font-bold mb-8">Add Certificate</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Certificate Name *"
                            className="!rounded-xl border-slate-100 bg-slate-50/30"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <Input
                            label="Header left text"
                            className="!rounded-xl border-slate-100 bg-slate-50/30"
                            value={formData.headerLeft}
                            onChange={e => setFormData({ ...formData, headerLeft: e.target.value })}
                        />
                        <div className="space-y-2 relative">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
                            <div className="relative group">
                                <input
                                    type="date"
                                    className="w-full bg-slate-50/30 border border-slate-100 rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold text-slate-600 appearance-none"
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                                <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Body (Max Character lenght 500)</label>
                            <textarea
                                className="w-full bg-slate-50/30 border border-slate-100 rounded-xl px-4 py-4 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-navy-700 h-32 resize-none text-sm font-medium"
                                value={formData.body}
                                onChange={e => setFormData({ ...formData, body: e.target.value })}
                            />
                            <div className="flex flex-wrap gap-2 mt-3 p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                {variables.map(v => (
                                    <span key={v} className="text-[9px] text-primary/60 font-black tracking-tighter hover:text-primary cursor-pointer transition-colors bg-white px-1.5 py-0.5 rounded shadow-sm border border-slate-100">{v}</span>
                                ))}
                            </div>
                            <p className="text-[9px] text-red-500 font-black italic uppercase mt-2 pl-1 leading-relaxed">For lrs Certificate make take the [name] and <br /> [course_name] variable</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Body Font</label>
                                <div className="relative group">
                                    <select
                                        className="w-full bg-slate-50/30 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-600 outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                                        value={formData.bodyFont}
                                        onChange={e => setFormData({ ...formData, bodyFont: e.target.value })}
                                    >
                                        <option>Body Font</option>
                                        <option>Inter</option>
                                        <option>Roboto</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                                </div>
                            </div>
                            <Input
                                label="Font Size *"
                                className="!rounded-xl border-slate-100 bg-slate-50/30"
                                placeholder="Ex: 2em"
                                value={formData.fontSize}
                                onChange={e => setFormData({ ...formData, fontSize: e.target.value })}
                                required
                            />
                        </div>

                        <Input
                            label="Footer left text"
                            className="!rounded-xl border-slate-100 bg-slate-50/30"
                            value={formData.footerLeft}
                            onChange={e => setFormData({ ...formData, footerLeft: e.target.value })}
                        />
                        <Input
                            label="Footer Center text"
                            className="!rounded-xl border-slate-100 bg-slate-50/30"
                            value={formData.footerCenter}
                            onChange={e => setFormData({ ...formData, footerCenter: e.target.value })}
                        />
                        <Input
                            label="Footer Right text"
                            className="!rounded-xl border-slate-100 bg-slate-50/30"
                            value={formData.footerRight}
                            onChange={e => setFormData({ ...formData, footerRight: e.target.value })}
                        />

                        <div className="space-y-6 pt-2">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">PAGE LAYOUT *</label>
                                <div className="relative group">
                                    <select
                                        className="w-full bg-slate-50/30 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-600 outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                                        value={formData.pageLayout}
                                        onChange={e => setFormData({ ...formData, pageLayout: e.target.value })}
                                        required
                                    >
                                        <option value="">Page layout *</option>
                                        <option value="Portrait">Portrait</option>
                                        <option value="Landscape">Landscape</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <Input label="Height (mm)*" className="!rounded-xl border-slate-100 bg-slate-50/30" type="number" placeholder="Height" value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })} />
                                <Input label="Width (mm)*" className="!rounded-xl border-slate-100 bg-slate-50/30" type="number" placeholder="Width" value={formData.width} onChange={e => setFormData({ ...formData, width: e.target.value })} />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">STUDENT PHOTO</label>
                                <div className="flex items-center space-x-8 pl-1">
                                    <label className="flex items-center space-x-3 cursor-pointer group">
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.studentPhoto ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' : 'border-slate-200 group-hover:border-slate-300'}`}
                                            onClick={() => setFormData({ ...formData, studentPhoto: true })}
                                        >
                                            {formData.studentPhoto && <div className="w-2 h-2 rounded-full bg-primary animate-in zoom-in duration-200"></div>}
                                        </div>
                                        <span className={`text-[11px] font-black uppercase tracking-wider ${formData.studentPhoto ? 'text-slate-700' : 'text-slate-400'}`}>Yes</span>
                                    </label>
                                    <label className="flex items-center space-x-3 cursor-pointer group">
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${!formData.studentPhoto ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' : 'border-slate-200 group-hover:border-slate-300'}`}
                                            onClick={() => setFormData({ ...formData, studentPhoto: false })}
                                        >
                                            {!formData.studentPhoto && <div className="w-2 h-2 rounded-full bg-primary animate-in zoom-in duration-200"></div>}
                                        </div>
                                        <span className={`text-[11px] font-black uppercase tracking-wider ${!formData.studentPhoto ? 'text-slate-700' : 'text-slate-400'}`}>None</span>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image (1100 x 850)px *</label>
                                <div className="flex items-center space-x-0 group">
                                    <div className="flex-1 bg-slate-50/30 border border-slate-100 border-r-0 rounded-l-xl px-4 py-3.5 text-xs text-slate-400 font-medium truncate italic tracking-tight">
                                        {bgImage ? bgImage.name : 'Image (1100 x 850)px *'}
                                    </div>
                                    <label className="bg-primary text-white border border-primary px-8 py-3.5 rounded-r-xl text-[10px] font-black tracking-[0.2em] uppercase cursor-pointer hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all flex items-center space-x-2 active:scale-95 shrink-0">
                                        <span>BROWSE</span>
                                        <input type="file" className="hidden" onChange={e => setBgImage(e.target.files[0])} />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button type="submit" className="bg-primary hover:bg-primary-hover !rounded-2xl w-full py-4.5 flex items-center justify-center space-x-3 shadow-2xl shadow-primary/30 active:scale-95 transition-all group overflow-hidden relative">
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <Check size={18} strokeWidth={4} className="group-hover:scale-125 transition-transform" />
                                <span className="uppercase text-[11px] font-black tracking-[0.3em] italic">Save Certificate</span>
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* List Column */}
                <Card className="lg:col-span-8 p-8 border-none shadow-snow-lg rounded-[30px] bg-white min-h-[600px]">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
                        <h2 className="text-lg font-bold text-[#3E4D67]">Certificate List</h2>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                <input
                                    type="text"
                                    placeholder="SEARCH"
                                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black tracking-widest text-slate-500 focus:ring-2 focus:ring-primary/10 w-64 transition-all outline-none"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex p-0.5 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                                <button className="p-2 hover:bg-white hover:text-primary hover:shadow-sm rounded-lg text-slate-400 transition-all"><Copy size={16} /></button>
                                <button className="p-2 hover:bg-white hover:text-primary hover:shadow-sm rounded-lg text-slate-400 transition-all"><FileText size={16} /></button>
                                <button className="p-2 hover:bg-white hover:text-primary hover:shadow-sm rounded-lg text-slate-400 transition-all"><Printer size={16} /></button>
                                <button className="p-2 hover:bg-white hover:text-primary hover:shadow-sm rounded-lg text-slate-400 transition-all"><LayoutGrid size={16} /></button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-[20px] border border-slate-50">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">↓Name</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center border-b border-slate-50">↓Background Image</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">↓Default for</th>
                                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right border-b border-slate-50">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    <tr><td colSpan="4" className="py-20 text-center text-slate-400 font-bold italic">Loading...</td></tr>
                                ) : certificates.length === 0 ? (
                                    <tr><td colSpan="4" className="py-20 text-center text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] italic">No Data Available</td></tr>
                                ) : (
                                    certificates.map(cert => (
                                        <tr key={cert._id} className="hover:bg-slate-50/30 transition-all group">
                                            <td className="px-6 py-6 text-xs font-black text-primary italic uppercase underline decoration-primary/10 underline-offset-4 decoration-2">{cert.name}</td>
                                            <td className="px-6 py-6 text-center">
                                                <div className="w-16 h-10 mx-auto bg-slate-50 rounded-xl overflow-hidden border border-slate-200 shadow-sm flex items-center justify-center p-0.5">
                                                    {cert.backgroundImage ? (
                                                        <img src={`/api/admin-section/uploads/${cert.backgroundImage.split('/').pop()}`} alt="bg" className="w-full h-full object-cover rounded-lg" />
                                                    ) : <FileText size={16} className="text-slate-200" />}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-slate-400 italic text-[10px] font-bold uppercase tracking-wider">Not set</td>
                                            <td className="px-6 py-6 text-right">
                                                <div className="flex items-center justify-end space-x-4">
                                                    <button className="flex items-center space-x-3 px-6 py-2.5 bg-white border-2 border-primary text-primary rounded-full text-[10px] font-black tracking-widest hover:bg-primary hover:text-white transition-all group shadow-lg shadow-primary/5 active:scale-95">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} strokeWidth={3} className="group-hover:rotate-180 transition-transform" />
                                                    </button>
                                                    <button onClick={() => handleDelete(cert._id)} className="p-2.5 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-red-100">
                                                        <Trash2 size={16} />
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

export default Certificate;
