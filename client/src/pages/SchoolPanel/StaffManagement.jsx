import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Input, Card } from '../../components/SnowUI';
import { Users, Plus, Search, Mail, Phone, Briefcase, DollarSign, FileText, X, CheckCircle, Clock } from 'lucide-react';

const StaffManagement = () => {
    const [activeTab, setActiveTab] = useState('directory');
    const [staff, setStaff] = useState([]);
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [leaves, setLeaves] = useState([]);
    const [newStaff, setNewStaff] = useState({
        name: '', staffId: '', role: 'Teacher', email: '', contactNo: '', salary: 0, department: ''
    });

    const fetchData = async () => {
        try {
            const [staffRes, leaveRes] = await Promise.all([
                api.get('/api/staff'),
                api.get('/api/staff/leaves')
            ]);
            setStaff(staffRes.data);
            setLeaves(leaveRes.data || []);
        } catch (error) {
            console.error('Error fetching staff data');
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleAddStaff = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/staff', newStaff);
            setShowAddModal(false);
            setNewStaff({ name: '', staffId: '', role: 'Teacher', email: '', contactNo: '', salary: 0, department: '' });
            fetchData();
        } catch (error) {
            alert('Error adding staff');
        }
    };

    const updateLeaveStatus = async (id, status) => {
        try {
            await api.patch(`/api/staff/leaves/${id}`, { status });
            fetchData();
        } catch (error) {
            alert('Error updating leave');
        }
    };

    const filteredStaff = staff.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.staffId.includes(search));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-primary italic tracking-tight underline decoration-primary/20 underline-offset-8">Staff & HR Management</h1>
                    <p className="text-slate-400 font-medium mt-1">Manage employee profiles, payroll, and academic faculty roles.</p>
                </div>
                <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
                    {['directory', 'payroll', 'leaves'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-primary'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'directory' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="flex justify-between items-center">
                        <div className="relative max-w-md w-full">
                            <Search className="absolute left-3 top-2.5 text-slate-300" size={18} />
                            <input
                                type="text"
                                placeholder="Search staff..."
                                className="w-full bg-white border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 outline-none shadow-sm font-medium"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <Button onClick={() => setShowAddModal(true)}><Plus size={20} /><span>Add Employee</span></Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStaff.map(s => (
                            <Card key={s._id} className="border-none hover:shadow-2xl hover:-translate-y-1 transition-all group overflow-hidden">
                                <div className="absolute top-0 right-0 p-4">
                                    <span className="px-2 py-1 rounded-lg bg-primary/5 text-primary text-[10px] font-black uppercase tracking-tighter">
                                        {s.role}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all">
                                        <Users size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-800 italic uppercase">{s.name}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">{s.department || 'Academic'} • ID: {s.staffId}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 text-xs font-bold text-slate-500">
                                        <Mail size={14} className="text-slate-200" />
                                        <span>{s.email || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-xs font-bold text-slate-500">
                                        <Phone size={14} className="text-slate-200" />
                                        <span>{s.contactNo}</span>
                                    </div>
                                </div>
                                <div className="mt-6 flex border-t border-slate-50">
                                    <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition-colors">Profile</button>
                                    <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-colors border-l border-slate-50">Attendance</button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'payroll' && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">Monthly Payroll Management</h2>
                        <Button variant="outline"><FileText size={18} /><span>Bulk Payslips</span></Button>
                    </div>
                    <Card className="border-none shadow-xl p-0 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Employee</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Base Salary</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Total Deductions</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Net Payable</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {staff.map(s => (
                                    <tr key={s._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-700">{s.name}</div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{s.role}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-black text-slate-600">₹{s.salary.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-red-400">-₹0</td>
                                        <td className="px-6 py-4 text-sm font-black text-primary">₹{s.salary.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Button size="sm" variant="ghost" className="text-xs h-8">Generate Payslip</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            )}

            {activeTab === 'leaves' && (
                <div className="space-y-6 animate-in slide-in-from-left duration-300">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">Leave Requests</h2>
                        <div className="flex space-x-2">
                            <span className="px-3 py-1 bg-amber-50 text-amber-500 rounded-full text-[10px] font-black uppercase">Pending: {leaves.filter(l => l.status === 'Pending').length}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {leaves.map(l => (
                            <Card key={l._id} className="border-none shadow-xl p-6 relative overflow-hidden">
                                <div className={`absolute top-0 right-0 px-3 py-1 text-[9px] font-black uppercase tracking-widest ${l.status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                                    l.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                                    }`}>
                                    {l.status}
                                </div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">{l.staff?.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{l.type}</p>
                                    </div>
                                </div>
                                <p className="text-xs font-medium text-slate-500 bg-slate-50 p-3 rounded-xl mb-4 italic">" {l.reason} "</p>
                                <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase mb-6">
                                    <span>From: {new Date(l.startDate).toLocaleDateString()}</span>
                                    <span>To: {new Date(l.endDate).toLocaleDateString()}</span>
                                </div>
                                {l.status === 'Pending' && (
                                    <div className="flex space-x-2">
                                        <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 border-none h-10 text-[10px] uppercase font-black tracking-widest" onClick={() => updateLeaveStatus(l._id, 'Approved')}>Approve</Button>
                                        <Button variant="outline" className="flex-1 h-10 text-[10px] uppercase font-black tracking-widest text-red-500 border-red-100 hover:bg-red-50" onClick={() => updateLeaveStatus(l._id, 'Rejected')}>Reject</Button>
                                    </div>
                                )}
                            </Card>
                        ))}
                        {leaves.length === 0 && (
                            <div className="col-span-2 py-12 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100 text-slate-400">
                                No active leave requests.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modals */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-xl shadow-3xl border-none animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black text-slate-800 italic uppercase">Onboard Employee</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-red-500"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleAddStaff} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Full Name" placeholder="Full Name" value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })} required />
                                <Input label="Staff ID" placeholder="STF-101" value={newStaff.staffId} onChange={e => setNewStaff({ ...newStaff, staffId: e.target.value })} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Designation</label>
                                    <select className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-bold outline-none" value={newStaff.role} onChange={e => setNewStaff({ ...newStaff, role: e.target.value })} required>
                                        <option value="Teacher">Teacher</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Librarian">Librarian</option>
                                        <option value="Accountant">Accountant</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
                                    <select className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-bold outline-none" value={newStaff.department} onChange={e => setNewStaff({ ...newStaff, department: e.target.value })}>
                                        <option value="Academic">Academic</option>
                                        <option value="Accounts">Accounts</option>
                                        <option value="General Admin">General Admin</option>
                                        <option value="Science Dept">Science Dept</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Email" type="email" value={newStaff.email} onChange={e => setNewStaff({ ...newStaff, email: e.target.value })} />
                                <Input label="Basic Salary (₹)" type="number" value={newStaff.salary} onChange={e => setNewStaff({ ...newStaff, salary: e.target.value })} required />
                            </div>
                            <Button type="submit" className="w-full h-14 rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-primary/20 mt-6 text-white">Complete Onboarding ✅</Button>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default StaffManagement;
