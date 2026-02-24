import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Input, Card } from '../../components/SnowUI';
import { CreditCard, Plus, Receipt, History, Wallet, ArrowUpRight, TrendingUp, Search, User, X, CheckCircle, Smartphone } from 'lucide-react';

const FeesManagement = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [structures, setStructures] = useState([]);
    const [records, setRecords] = useState([]);
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [searchStudent, setSearchStudent] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [collectionModal, setCollectionModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    // New Fee State
    const [newFee, setNewFee] = useState({ name: '', amount: 0, frequency: 'Monthly', applicableTo: { class: '' } });

    // Collection State
    const [payment, setPayment] = useState({ amount: 0, method: 'Cash', remarks: '' });

    const fetchData = async () => {
        try {
            const [structRes, recRes, classRes] = await Promise.all([
                api.get('/api/fees/structures'),
                api.get('/api/fees/records'),
                api.get('/api/academic/classes')
            ]);
            setStructures(structRes.data);
            setRecords(recRes.data);
            setClasses(classRes.data);
        } catch (error) {
            console.error('Error fetching data');
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSearch = async () => {
        if (!searchStudent) return;
        try {
            const res = await api.get(`/api/students?q=${searchStudent}`);
            setStudents(res.data);
        } catch (error) {
            console.error('Error searching students');
        }
    };

    const handleCollect = async () => {
        try {
            await api.post('/api/fees/collect', {
                studentId: selectedStudent._id,
                ...payment
            });
            setCollectionModal(false);
            setPayment({ amount: 0, method: 'Cash', remarks: '' });
            fetchData();
            alert('Payment recorded successfully');
        } catch (error) {
            alert('Error recording payment');
        }
    };

    const handleCreateFee = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/fees/structures', newFee);
            setShowAddModal(false);
            setNewFee({ name: '', amount: 0, frequency: 'Monthly', applicableTo: { class: '' } });
            fetchData();
        } catch (error) {
            alert('Error creating fee structure');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Fees & Financials</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Fees</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Financials</span>
                    </div>
                </div>
                <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                    {['overview', 'collect', 'master', 'history'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-[#1C1C1C] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Collections', value: '₹4.2L', icon: <TrendingUp />, color: 'primary' },
                            { label: 'Pending Fees', value: '₹1.1L', icon: <History />, color: 'orange' },
                            { label: 'Online UPI', value: '142', icon: <Smartphone />, color: 'blue' },
                            { label: 'Defaulters', value: '18', icon: <User />, color: 'red' },
                        ].map((stat, i) => (
                            <Card key={i} className="border-none shadow-xl hover:-translate-y-1 transition-all group">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${stat.color === 'primary' ? 'bg-primary/5 text-primary' :
                                    stat.color === 'orange' ? 'bg-orange-50 text-orange-500' :
                                        stat.color === 'red' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                                    }`}>
                                    {stat.icon}
                                </div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                                <div className="text-2xl font-black text-slate-800 mt-1">{stat.value}</div>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="border-none shadow-2xl p-6">
                            <h3 className="font-bold text-slate-800 mb-6 flex items-center space-x-2">
                                <Receipt size={18} className="text-primary" />
                                <span>Recent Collections</span>
                            </h3>
                            <div className="space-y-4">
                                {records.slice(0, 5).map((rec, i) => (
                                    <div key={i} className="flex justify-between items-center group cursor-pointer">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                                <User size={14} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-700">{rec.student?.name}</div>
                                                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{rec.feeType?.name} • {rec.paymentMethod}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-black text-emerald-500">+₹{rec.amountPaid}</div>
                                            <div className="text-[9px] text-slate-300 font-bold">{new Date(rec.paymentDate).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="border-none shadow-2xl p-6 bg-slate-900 text-white">
                            <h3 className="font-bold mb-6 flex items-center space-x-2">
                                <Wallet size={18} className="text-primary" />
                                <span>Fee Structure Health</span>
                            </h3>
                            <div className="space-y-6">
                                {structures.slice(0, 3).map((f, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                                            <span>{f.name}</span>
                                            <span className="text-white">82%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: '82%' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            )}

            {activeTab === 'collect' && (
                <div className="space-y-6 animate-in slide-in-from-bottom duration-300">
                    <Card className="border-none shadow-2xl p-8">
                        <div className="max-w-xl mx-auto space-y-6 text-center">
                            <h2 className="text-2xl font-black text-slate-800 italic uppercase underline decoration-primary/20 decoration-8 underline-offset-4 mb-8">Search Student to Collect Fees</h2>
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                                <input
                                    className="w-full bg-slate-50 border-none rounded-3xl pl-16 pr-8 py-5 text-lg font-bold text-slate-700 focus:ring-8 focus:ring-primary/5 outline-none transition-all placeholder:text-slate-200"
                                    placeholder="Enter Admission No or Student Name..."
                                    value={searchStudent}
                                    onChange={e => setSearchStudent(e.target.value)}
                                    onKeyPress={e => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <Button className="w-full h-14 rounded-3xl font-black uppercase tracking-widest" onClick={handleSearch}>Find Student</Button>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {students.map(s => (
                            <Card key={s._id} className="border-none hover:shadow-xl transition-all p-6 group">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                        <User size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg">{s.name}</h3>
                                        <p className="text-xs font-bold text-primary/70 uppercase">ADM NO: {s.admissionNo} • Class {s.class?.name}</p>
                                    </div>
                                </div>
                                <Button className="w-full h-12 rounded-2xl font-bold" onClick={() => { setSelectedStudent(s); setCollectionModal(true); }}>Collect Payment</Button>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'master' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black text-slate-800 italic uppercase">Fee Master Setup</h2>
                        <Button onClick={() => setShowAddModal(true)}><Plus size={20} /><span>Add Fee Type</span></Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {structures.map(f => (
                            <Card key={f._id} className="border-none hover:shadow-xl transition-all group overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-bold text-slate-800 text-lg">{f.name}</h3>
                                        <span className="text-2xl font-black text-primary italic">₹{f.amount}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-xs font-bold text-slate-400 mb-6">
                                        <div className="bg-slate-50 px-2 py-1 rounded-md">{f.frequency}</div>
                                        <div className="bg-slate-50 px-2 py-1 rounded-md">CLASS {f.applicableTo?.class?.name || 'ALL'}</div>
                                    </div>
                                    <div className="flex space-x-2 pt-4 border-t border-slate-50">
                                        <Button variant="ghost" className="flex-1 text-[10px] font-black uppercase tracking-widest h-9">Edit</Button>
                                        <Button variant="ghost" className="flex-1 text-[10px] font-black uppercase tracking-widest h-9 text-red-400">Delete</Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Collection Modal */}
            {collectionModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-lg shadow-3xl border-none">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-slate-800 italic uppercase">Record Fee</h2>
                                <p className="text-xs font-bold text-primary">COLLECTING FOR: {selectedStudent?.name}</p>
                            </div>
                            <button onClick={() => setCollectionModal(false)} className="text-slate-300 hover:text-red-500"><X size={24} /></button>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Fee Type</label>
                                    <select className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-bold outline-none" onChange={e => {
                                        const f = structures.find(fs => fs._id === e.target.value);
                                        setPayment({ ...payment, amount: f?.amount || 0, feeType: e.target.value });
                                    }}>
                                        <option value="">Choose Structure</option>
                                        {structures.map(f => <option key={f._id} value={f._id}>{f.name} (₹{f.amount})</option>)}
                                    </select>
                                </div>
                                <Input label="Amount Paid" type="number" value={payment.amount} onChange={e => setPayment({ ...payment, amount: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Method</label>
                                    <select className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-bold outline-none" value={payment.method} onChange={e => setPayment({ ...payment, method: e.target.value })}>
                                        <option value="Cash">Cash</option>
                                        <option value="Online">Online (Manual)</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                    </select>
                                </div>
                                <Input label="Reference ID" placeholder="TXN123..." />
                            </div>
                            <Button className="w-full h-14 rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-primary/20" onClick={handleCollect}>Record Collection ✅</Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* Create Fee Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-primary">Setup Fee Type</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-red-500"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleCreateFee} className="space-y-4">
                            <Input label="Fee Name" placeholder="Tuition Fee Q1" value={newFee.name} onChange={e => setNewFee({ ...newFee, name: e.target.value })} required />
                            <Input label="Amount (₹)" type="number" value={newFee.amount} onChange={e => setNewFee({ ...newFee, amount: e.target.value })} required />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Frequency</label>
                                    <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm" value={newFee.frequency} onChange={e => setNewFee({ ...newFee, frequency: e.target.value })}>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Term">Term</option>
                                        <option value="Yearly">Yearly</option>
                                        <option value="One-time">One-time</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Applicable Class</label>
                                    <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm" value={newFee.applicableTo.class} onChange={e => setNewFee({ ...newFee, applicableTo: { class: e.target.value } })}>
                                        <option value="">All Classes</option>
                                        {classes.map(c => <option key={c._id} value={c._id}>Class {c.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <Button type="submit" className="w-full h-12 rounded-2xl font-bold mt-4 shadow-lg shadow-primary/20">Create Structure</Button>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default FeesManagement;
