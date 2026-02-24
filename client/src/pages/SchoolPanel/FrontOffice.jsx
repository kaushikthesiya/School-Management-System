import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Input, Card } from '../../components/SnowUI';
import { Plus, Search, Filter, Phone, Mail, Calendar, User, MoreHorizontal, X, CheckCircle } from 'lucide-react';

const FrontOffice = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [classes, setClasses] = useState([]);
    const [newEnquiry, setNewEnquiry] = useState({
        name: '', phone: '', email: '', class: '', source: 'Walk-in', notes: ''
    });

    const fetchData = async () => {
        try {
            const [enqRes, classRes] = await Promise.all([
                api.get('/api/enquiries'),
                api.get('/api/academic/classes')
            ]);
            setEnquiries(enqRes.data);
            setClasses(classRes.data);
        } catch (error) {
            console.error('Error fetching enquiries');
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/enquiries', newEnquiry);
            setShowAddModal(false);
            setNewEnquiry({ name: '', phone: '', email: '', class: '', source: 'Walk-in', notes: '' });
            fetchData();
        } catch (error) {
            alert('Error adding enquiry');
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.patch(`/api/enquiries/${id}`, { status });
            fetchData();
        } catch (error) {
            alert('Error updating status');
        }
    };

    const filteredEnquiries = enquiries.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.phone.includes(search)
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Front Office</h1>
                    <p className="text-slate-500">Manage admission enquiries and lead tracking.</p>
                </div>
                <div className="flex space-x-3">
                    <Button variant="outline"><Filter size={20} /><span>Filter</span></Button>
                    <Button onClick={() => setShowAddModal(true)}><Plus size={20} /><span>Add Enquiry</span></Button>
                </div>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search by name or phone..."
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-slate-100"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEnquiries.map(enq => (
                    <Card key={enq._id} className="hover:shadow-lg transition-all border-none">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {enq.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{enq.name}</h3>
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{enq.source}</p>
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${enq.status === 'Open' ? 'bg-blue-50 text-blue-500' :
                                    enq.status === 'Following Up' ? 'bg-amber-50 text-amber-500' :
                                        enq.status === 'Admitted' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-400'
                                }`}>
                                {enq.status}
                            </span>
                        </div>

                        <div className="space-y-2.5 mb-6">
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                                <Phone size={14} className="text-slate-400" />
                                <span>{enq.phone}</span>
                            </div>
                            {enq.email && (
                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                    <Mail size={14} className="text-slate-400" />
                                    <span>{enq.email}</span>
                                </div>
                            )}
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                                <Calendar size={14} className="text-slate-400" />
                                <span>Intersted in: {enq.class?.name || 'Any'}</span>
                            </div>
                        </div>

                        <div className="flex space-x-2 border-t border-slate-50 pt-4">
                            {enq.status !== 'Admitted' && (
                                <>
                                    <Button variant="ghost" className="flex-1 text-xs h-9" onClick={() => updateStatus(enq._id, 'Following Up')}>Follow Up</Button>
                                    <Button variant="ghost" className="flex-1 text-xs h-9 text-emerald-500 hover:text-emerald-600" onClick={() => updateStatus(enq._id, 'Admitted')}>Admit</Button>
                                </>
                            )}
                            {enq.status === 'Admitted' && (
                                <div className="flex-1 flex items-center justify-center text-emerald-500 text-xs font-bold space-x-1">
                                    <CheckCircle size={14} />
                                    <span>Converted to Student</span>
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-primary">Add Enquiry</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-red-500"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input label="Name" value={newEnquiry.name} onChange={e => setNewEnquiry({ ...newEnquiry, name: e.target.value })} required />
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Phone" value={newEnquiry.phone} onChange={e => setNewEnquiry({ ...newEnquiry, phone: e.target.value })} required />
                                <Input label="Email" value={newEnquiry.email} onChange={e => setNewEnquiry({ ...newEnquiry, email: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Interested Class</label>
                                    <select
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-slate-100"
                                        value={newEnquiry.class}
                                        onChange={e => setNewEnquiry({ ...newEnquiry, class: e.target.value })}
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map(c => <option key={c._id} value={c._id}>Class {c.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Source</label>
                                    <select
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-slate-100"
                                        value={newEnquiry.source}
                                        onChange={e => setNewEnquiry({ ...newEnquiry, source: e.target.value })}
                                    >
                                        <option value="Walk-in">Walk-in</option>
                                        <option value="Website">Website</option>
                                        <option value="Referral">Referral</option>
                                        <option value="Social Media">Social Media</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Notes</label>
                                <textarea
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-slate-100"
                                    rows="3"
                                    value={newEnquiry.notes}
                                    onChange={e => setNewEnquiry({ ...newEnquiry, notes: e.target.value })}
                                ></textarea>
                            </div>
                            <Button type="submit" className="w-full h-12 rounded-2xl font-bold mt-4">Save Enquiry</Button>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default FrontOffice;
