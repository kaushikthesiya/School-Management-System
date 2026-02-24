import React, { useState } from 'react';
import {
    Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, Trash2, UserPlus
} from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';

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

const AddMember = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [memberType, setMemberType] = useState('');
    const [memberId, setMemberId] = useState('');
    const [openActionId, setOpenActionId] = useState(null);

    const [members] = useState([]); // Empty state as per Photo 4

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Add Member</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Library</span>
                    <span>|</span>
                    <span className="text-slate-500">Add Member</span>
                </div>
            </div>

            <div className="px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Member Form */}
                <Card className="p-8 border-none shadow-snow-lg bg-white rounded-3xl h-fit">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">
                        Add Member
                    </h3>
                    <div className="space-y-6">
                        <Select
                            label="MEMBER TYPE"
                            name="memberType"
                            value={memberType}
                            onChange={(e) => setMemberType(e.target.value)}
                            placeholder="Member Type *"
                            options={['Student', 'Teacher', 'Staff']}
                            required
                        />
                        <Input
                            label="MEMBER ID"
                            name="memberId"
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                            placeholder="Member ID *"
                            required
                        />
                        <div className="flex justify-center pt-4">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-10 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all">
                                <span>✓ SAVE MEMBER</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Member List */}
                <Card className="lg:col-span-2 p-8 border-none shadow-snow-lg bg-white rounded-3xl overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">
                            Member List
                        </h3>
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

                    <div className="overflow-x-auto min-h-[300px]">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest first:rounded-l-2xl">
                                        ↓ SL
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ NAME
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ MEMBER TYPE
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ MEMBER ID
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ EMAIL
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ MOBILE
                                    </th>
                                    <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest last:rounded-r-2xl">
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {members.length > 0 ? members.map((member, idx) => (
                                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-bold text-slate-600">{idx + 1}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-bold text-slate-600">{member.name}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-medium text-slate-400">{member.type}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-medium text-slate-400">{member.memberId}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-medium text-slate-400">{member.email}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-medium text-slate-400">{member.mobile}</span>
                                        </td>
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
                                                            <button className="w-full px-5 py-3 text-left text-[10px] font-black text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
                                                                <Edit size={14} className="text-slate-300" />
                                                                <span>Edit</span>
                                                            </button>
                                                            <button className="w-full px-5 py-3 text-left text-[10px] font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest flex items-center space-x-3">
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
                                        <td colSpan="7" className="py-20 text-center text-xs font-black text-slate-300 uppercase tracking-widest">
                                            No Data Available In Table
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10 px-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            showing 0 to 0 of 0 entries
                        </p>
                        <div className="flex items-center space-x-3">
                            <button className="flex items-center justify-center w-8 h-8 rounded-xl bg-white border border-slate-100 text-slate-400 transition-all opacity-50" disabled>
                                <ChevronDown size={12} className="rotate-90" />
                            </button>
                            <button className="flex items-center justify-center w-8 h-8 rounded-xl bg-white border border-slate-100 text-slate-400 transition-all opacity-50" disabled>
                                <ChevronDown size={12} className="-rotate-90" />
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AddMember;
