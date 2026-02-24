import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card, Input } from '../../components/SnowUI';
import { Search, Plus, Trash2, MoreVertical, CheckCircle2, ChevronDown, Calendar, FileText, Globe, Upload } from 'lucide-react';
import { format } from 'date-fns';

const UploadContent = () => {
    const [contents, setContents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        type: '',
        availableFor: 'Student',
        classId: '',
        sectionName: '',
        uploadDate: format(new Date(), 'yyyy-MM-dd'),
        description: '',
        sourceUrl: '',
        file: null
    });

    const fetchData = async () => {
        try {
            const [contentRes, classRes, sectionRes] = await Promise.all([
                api.get('/api/academic/content'),
                api.get('/api/academic/classes'),
                api.get('/api/academic/sections')
            ]);
            setContents(contentRes.data);
            setClasses(classRes.data);
            setSections(sectionRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('type', formData.type);
        data.append('availableFor', formData.availableFor);
        data.append('class', formData.classId);
        data.append('section', formData.sectionName);
        data.append('uploadDate', formData.uploadDate);
        data.append('description', formData.description);
        data.append('sourceUrl', formData.sourceUrl);
        if (formData.file) {
            data.append('file', formData.file);
        }

        try {
            await api.post('/api/academic/content', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData({
                title: '',
                type: '',
                availableFor: 'Student',
                classId: '',
                sectionName: '',
                uploadDate: format(new Date(), 'yyyy-MM-dd'),
                description: '',
                sourceUrl: '',
                file: null
            });
            fetchData();
        } catch (error) {
            console.error('Error uploading content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this content?')) return;
        try {
            await api.delete(`/api/academic/content/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting content:', error);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Upload Content List
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Study Material</span>
                    <span>|</span>
                    <span className="text-primary/70">Upload Content List</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Form */}
                <div className="lg:col-span-1">
                    <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white">
                        <h2 className="text-[#3E4D67] text-lg font-bold mb-8">Upload Content</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Content Title *</label>
                                <input
                                    className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Content Type *</label>
                                <div className="relative group">
                                    <select
                                        className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        required
                                    >
                                        <option value="">Content Type *</option>
                                        <option value="Assignment">Assignment</option>
                                        <option value="Syllabus">Syllabus</option>
                                        <option value="Other Downloads">Other Downloads</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Available For *</label>
                                <div className="space-y-2">
                                    {['All Admin', 'Student', 'Available for all classes'].map((option) => (
                                        <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                                            <div
                                                onClick={() => setFormData({ ...formData, availableFor: option })}
                                                className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${formData.availableFor === option ? 'bg-[#7c32ff] border-[#7c32ff]' : 'border-slate-200 group-hover:border-[#7c32ff]'}`}
                                            >
                                                {formData.availableFor === option && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                            </div>
                                            <span className="text-xs font-bold text-slate-500 uppercase italic tracking-wide group-hover:text-slate-800">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Class</label>
                                <div className="relative group">
                                    <select
                                        className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                                        value={formData.classId}
                                        onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map(cls => <option key={cls._id} value={cls._id}>{cls.name}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                                </div>
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Section</label>
                                <div className="relative group">
                                    <select
                                        className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none cursor-pointer"
                                        value={formData.sectionName}
                                        onChange={(e) => setFormData({ ...formData, sectionName: e.target.value })}
                                    >
                                        <option value="">Select Section</option>
                                        {sections.map(sec => <option key={sec._id} value={sec.name}>{sec.name}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                                </div>
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date *</label>
                                <div className="relative group">
                                    <input
                                        className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all appearance-none"
                                        type="date"
                                        value={formData.uploadDate}
                                        onChange={(e) => setFormData({ ...formData, uploadDate: e.target.value })}
                                        required
                                    />
                                    <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7c32ff] transition-colors" size={16} />
                                </div>
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all min-h-[100px] resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Source URL</label>
                                <input
                                    className="w-full bg-white border-b-2 border-slate-100 py-3 px-1 text-sm font-bold text-slate-600 outline-none focus:border-[#7c32ff] transition-all"
                                    type="text"
                                    value={formData.sourceUrl}
                                    onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2 text-left">
                                <div className="relative group border-2 border-dashed border-slate-100 rounded-xl p-4 hover:border-[#7c32ff] transition-all cursor-pointer">
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleFileChange}
                                    />
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                            {formData.file ? formData.file.name : 'Select File'}
                                        </span>
                                        <div className="bg-[#7c32ff] text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                            Browse
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold ml-1 italic">(jpg, png, jpeg, pdf, doc, docx, mp4, mp3, txt are allowed for upload)</p>
                            </div>

                            <div className="flex justify-center pt-6">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="!bg-[#7c32ff] !rounded-lg flex items-center space-x-2 px-8 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all text-white font-black italic uppercase tracking-widest text-[11px]"
                                >
                                    <CheckCircle2 size={16} />
                                    <span>{loading ? 'Saving...' : 'Save Content'}</span>
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Right Column: List */}
                <div className="lg:col-span-3">
                    <Card className="p-8 border-none shadow-snow-lg rounded-[20px] bg-white overflow-hidden">
                        <div className="flex justify-between items-center mb-8 px-2">
                            <h2 className="text-lg font-bold text-[#3E4D67]">Upload Content List</h2>
                        </div>

                        <div className="overflow-x-auto rounded-[20px]">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#F8FAFC] border-y border-slate-100 uppercase tracking-widest text-[10px] font-black text-slate-400">
                                        <th className="px-6 py-4">SL</th>
                                        <th className="px-6 py-4">Content Title</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Available For</th>
                                        <th className="px-6 py-4">Class (Sec.)</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-[12px] font-bold">
                                    {contents.map((item, index) => (
                                        <tr key={item._id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-slate-400">{index + 1}</td>
                                            <td className="px-6 py-4 text-[#7c32ff] uppercase italic tracking-wide">{item.title}</td>
                                            <td className="px-6 py-4 text-slate-500">{item.type}</td>
                                            <td className="px-6 py-4 text-slate-500">
                                                {format(new Date(item.uploadDate), 'dd MMM, yyyy')}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{item.availableFor}</td>
                                            <td className="px-6 py-4 text-slate-500">
                                                {item.class?.name} {item.section ? `(${item.section})` : ''}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
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
                                    {contents.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-20 text-center text-slate-400 italic font-medium">
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

export default UploadContent;
