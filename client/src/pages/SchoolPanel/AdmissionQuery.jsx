import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import { Card, Button, Input, Select, Badge, Modal } from '../../components/SnowUI';
import { Search, Plus, Download, Printer, FileText, FileSpreadsheet, Copy, LayoutGrid, MoreHorizontal, Calendar, Phone, User, Share2, X, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

const AdmissionQuery = () => {
    const navigate = useNavigate();
    const { school_slug } = useParams();
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [classes, setClasses] = useState([]);
    const [filters, setFilters] = useState({
        dateFrom: format(new Date(), 'yyyy-MM-01'),
        dateTo: format(new Date(), 'yyyy-MM-dd'),
        source: 'All',
        status: 'All'
    });

    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
    const [followUpData, setFollowUpData] = useState({
        note: '',
        status: '',
        nextFollowUp: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd')
    });

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        description: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        nextFollowUp: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'),
        assigned: '',
        reference: '',
        source: '',
        classId: '',
        noOfChild: ''
    });

    const sources = ['Website', 'Walk-in', 'Phone Call', 'Social Media', 'Referral'];
    const statuses = ['All', 'Open', 'Following Up', 'Admitted', 'Closed'];
    const references = ['Newspaper', 'Radio', 'Television', 'Online', 'Other'];

    const fetchQueries = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
            if (filters.dateTo) params.append('dateTo', filters.dateTo);
            if (filters.source !== 'All') params.append('source', filters.source);
            if (filters.status !== 'All') params.append('status', filters.status);

            const { data } = await api.get(`/api/online-admission/enquiries?${params.toString()}`);
            setQueries(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Fetch Queries Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchClasses = async () => {
        try {
            const { data } = await api.get('/api/academic/classes');
            setClasses(Array.isArray(data) ? data.map(c => ({ value: c._id, label: c.name })) : []);
        } catch (error) {
            console.error('Fetch Classes Error:', error);
        }
    };

    useEffect(() => {
        fetchQueries();
        fetchClasses();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchQueries();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, assignedName: formData.assigned };
            if (formData._id) {
                await api.put(`/api/online-admission/enquiries/${formData._id}`, payload);
            } else {
                await api.post('/api/online-admission/enquiries', payload);
            }
            setIsModalOpen(false);
            fetchQueries();
            // Reset form
            setFormData({
                name: '',
                phone: '',
                email: '',
                address: '',
                description: '',
                date: format(new Date(), 'yyyy-MM-dd'),
                nextFollowUp: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'),
                assigned: '',
                reference: '',
                source: '',
                classId: '',
                noOfChild: ''
            });
        } catch (error) {
            console.error('Submit Enquiry Error:', error);
        }
    };

    const openAddModal = () => {
        setFormData({
            name: '',
            phone: '',
            email: '',
            address: '',
            description: '',
            date: format(new Date(), 'yyyy-MM-dd'),
            nextFollowUp: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'),
            assigned: '',
            reference: '',
            source: '',
            classId: '',
            noOfChild: ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this enquiry?')) {
            try {
                await api.delete(`/api/online-admission/enquiries/${id}`);
                fetchQueries();
            } catch (error) {
                console.error('Delete Enquiry Error:', error);
            }
        }
    };

    const handleFollowUpSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/api/online-admission/enquiries/${selectedQuery._id}/follow-up`, followUpData);
            setIsFollowUpModalOpen(false);
            fetchQueries();
            setFollowUpData({
                note: '',
                status: '',
                nextFollowUp: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd')
            });
        } catch (error) {
            console.error('Follow up Error:', error);
        }
    };

    const openEditModal = (item) => {
        setFormData({
            ...item,
            classId: item.class?._id || item.class || '',
            assigned: item.assignedName || ''
        });
        setIsModalOpen(true);
        setOpenDropdownId(null);
    };

    const openFollowUpModal = (item) => {
        setSelectedQuery(item);
        setFollowUpData({
            note: '',
            status: item.status,
            nextFollowUp: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd')
        });
        setIsFollowUpModalOpen(true);
        setOpenDropdownId(null);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Admission Query</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Admin Section</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Admission Query</span>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <Button
                        onClick={openAddModal}
                        className="bg-[#1C1C1C] hover:bg-black text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                    >
                        <Plus size={14} strokeWidth={3} />
                        <span>ADD QUERY</span>
                    </Button>
                </div>
            </div>

            {/* Select Criteria Section */}
            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl">
                <h2 className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-[0.2em] mb-8 flex items-center space-x-3">
                    <span className="w-8 h-[1px] bg-[#1C1C1C]/20"></span>
                    <span>Select Criteria</span>
                </h2>

                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <Input
                        label="Date From *"
                        type="date"
                        value={filters.dateFrom}
                        onChange={e => setFilters({ ...filters, dateFrom: e.target.value })}
                        required
                    />
                    <Input
                        label="Date To *"
                        type="date"
                        value={filters.dateTo}
                        onChange={e => setFilters({ ...filters, dateTo: e.target.value })}
                        required
                    />
                    <Select
                        label="Source"
                        options={sources}
                        value={filters.source}
                        onChange={value => setFilters({ ...filters, source: value })}
                    />
                    <div className="flex space-x-3">
                        <div className="flex-1">
                            <Select
                                label="Status *"
                                options={statuses}
                                value={filters.status}
                                onChange={value => setFilters({ ...filters, status: value })}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="h-14 bg-[#1a1a1a] hover:bg-black text-white px-10 rounded-2xl flex items-center space-x-3 shadow-2xl shadow-black/10 active:scale-95 transition-all group"
                        >
                            <Search size={20} strokeWidth={4} className="group-hover:rotate-12 transition-transform" />
                            <span className="font-black italic uppercase tracking-[0.2em] text-[11px]">Search</span>
                        </Button>
                    </div>
                </form>
            </Card>

            {/* Query List Section */}
            <Card className="p-0 border-none shadow-3xl shadow-slate-100 overflow-hidden bg-white">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <h2 className="text-lg font-black text-slate-800 italic uppercase flex items-center space-x-3">
                        <span className="w-2 h-8 bg-emerald-400 rounded-full"></span>
                        <span>Query List</span>
                    </h2>

                    <div className="flex items-center space-x-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="QUICK SEARCH"
                                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 w-64 transition-all"
                            />
                        </div>

                        <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
                            {[Copy, FileSpreadsheet, FileText, Download, Printer, LayoutGrid].map((Icon, i) => (
                                <button key={i} className="p-2 hover:bg-white hover:text-primary hover:shadow-sm rounded-xl text-slate-400 transition-all">
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
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">SL</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Name</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Phone</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Source</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Query Date</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Last Follow Up Date</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Next Follow Up Date</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="w-10 h-10 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Processing...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : queries.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-8 py-20 text-center text-slate-400 italic font-medium">
                                        No queries found matching the criteria.
                                    </td>
                                </tr>
                            ) : (
                                queries.map((item, index) => (
                                    <tr key={item._id} className="group hover:bg-slate-50/30 transition-colors">
                                        <td className="px-8 py-5 text-sm font-bold text-slate-500">{index + 1}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-black italic text-xs">
                                                    {item.name.charAt(0)}
                                                </div>
                                                <span className="text-sm font-black text-slate-700 italic uppercase">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-600">{item.phone}</td>
                                        <td className="px-6 py-5">
                                            <span className="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-500 rounded-lg uppercase tracking-wider">
                                                {item.source || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-500">
                                            {format(new Date(item.createdAt), 'dd MMM, yyyy')}
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-500">
                                            {item.lastFollowUpDate ? format(new Date(item.lastFollowUpDate), 'dd MMM, yyyy') : '-'}
                                        </td>
                                        <td className="px-6 py-5">
                                            {item.nextFollowUp ? (
                                                <div className="flex items-center space-x-2 text-primary">
                                                    <Calendar size={14} />
                                                    <span className="text-sm font-black italic">{format(new Date(item.nextFollowUp), 'dd MMM, yyyy')}</span>
                                                </div>
                                            ) : '-'}
                                        </td>
                                        <td className="px-8 py-5 text-right relative">
                                            <div className="flex justify-end space-x-4">
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setOpenDropdownId(openDropdownId === item._id ? null : item._id)}
                                                        className="flex items-center space-x-3 px-6 py-2.5 bg-white border-2 border-primary text-primary rounded-full text-[10px] font-black tracking-widest hover:bg-primary hover:text-white transition-all group shadow-lg shadow-primary/5 active:scale-95"
                                                    >
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} strokeWidth={3} className={`${openDropdownId === item._id ? 'rotate-180' : ''} transition-transform`} />
                                                    </button>

                                                    {openDropdownId === item._id && (
                                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                                            <button
                                                                onClick={() => navigate(`/${school_slug}/add-student?enquiry=${item._id}`)}
                                                                className="w-full text-left px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors flex items-center space-x-2"
                                                            >
                                                                <UserPlus size={14} />
                                                                <span>Admit Student</span>
                                                            </button>
                                                            <button
                                                                onClick={() => openFollowUpModal(item)}
                                                                className="w-full text-left px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-emerald-500 transition-colors flex items-center space-x-2"
                                                            >
                                                                <Share2 size={14} />
                                                                <span>Follow Up</span>
                                                            </button>
                                                            <button
                                                                onClick={() => openEditModal(item)}
                                                                className="w-full text-left px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-indigo-500 transition-colors flex items-center space-x-2"
                                                            >
                                                                <FileText size={14} />
                                                                <span>Edit</span>
                                                            </button>
                                                            <div className="h-[1px] bg-slate-100 my-1 mx-4"></div>
                                                            <button
                                                                onClick={() => handleDelete(item._id)}
                                                                className="w-full text-left px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors flex items-center space-x-2"
                                                            >
                                                                <X size={14} />
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <a
                                                    href={`tel:${item.phone}`}
                                                    className="p-2.5 text-slate-300 hover:text-indigo-500 hover:bg-indigo-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-indigo-100"
                                                    title="Call"
                                                >
                                                    <Phone size={16} />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Add Admission Query Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Admission Query"
            >
                <form onSubmit={handleSubmit} className="space-y-8 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            label="Name *"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter Name"
                            required
                        />
                        <Input
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                        />
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email Address"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-navy-700 ml-1 italic uppercase tracking-wider">Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-5 text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none h-24"
                                placeholder="Enter Address"
                            ></textarea>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-navy-700 ml-1 italic uppercase tracking-wider">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-5 text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none h-24"
                                placeholder="Enter Description"
                            ></textarea>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            label="Date From *"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            label="Next Follow Up Date *"
                            name="nextFollowUp"
                            type="date"
                            value={formData.nextFollowUp}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            label="Assigned *"
                            name="assigned"
                            value={formData.assigned}
                            onChange={handleInputChange}
                            placeholder="Assigned Staff"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Select
                            label="Reference *"
                            options={['Select Reference', ...references]}
                            value={formData.reference}
                            onChange={val => setFormData(prev => ({ ...prev, reference: val }))}
                            required
                        />
                        <Select
                            label="Source *"
                            options={['Select Source', ...sources]}
                            value={formData.source}
                            onChange={val => setFormData(prev => ({ ...prev, source: val }))}
                            required
                        />
                        <Select
                            label="Class *"
                            options={[{ value: '', label: 'Select Class' }, ...classes]}
                            value={formData.classId}
                            onChange={val => setFormData(prev => ({ ...prev, classId: val }))}
                            required
                        />
                        <Input
                            label="Number of Child *"
                            name="noOfChild"
                            type="number"
                            value={formData.noOfChild}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            className="px-10 border-indigo-500 text-indigo-500 hover:bg-indigo-50 rounded-xl font-black italic uppercase tracking-widest text-[11px]"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="px-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black italic uppercase tracking-widest text-[11px] shadow-lg shadow-indigo-200"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Follow Up Modal */}
            <Modal
                isOpen={isFollowUpModalOpen}
                onClose={() => setIsFollowUpModalOpen(false)}
                title="Add Follow Up"
            >
                <form onSubmit={handleFollowUpSubmit} className="space-y-8 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select
                            label="Status *"
                            options={statuses.filter(s => s !== 'All')}
                            value={followUpData.status}
                            onChange={val => setFollowUpData(prev => ({ ...prev, status: val }))}
                            required
                        />
                        <Input
                            label="Next Follow Up Date *"
                            type="date"
                            value={followUpData.nextFollowUp}
                            onChange={e => setFollowUpData(prev => ({ ...prev, nextFollowUp: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-navy-700 ml-1 italic uppercase tracking-wider">Note *</label>
                        <textarea
                            value={followUpData.note}
                            onChange={e => setFollowUpData(prev => ({ ...prev, note: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-5 text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none h-32"
                            placeholder="Enter follow up note..."
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-between items-center pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            className="px-10 border-slate-200 text-slate-500 hover:bg-slate-50 rounded-xl font-black italic uppercase tracking-widest text-[11px]"
                            onClick={() => setIsFollowUpModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="px-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black italic uppercase tracking-widest text-[11px] shadow-lg shadow-emerald-200"
                        >
                            Save Follow Up
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AdmissionQuery;
