import React, { useState } from 'react';
import {
    Search, Download, Printer, FileText, LayoutGrid, ChevronDown, Edit, Trash2
} from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';

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

const QuestionGroup = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openActionId, setOpenActionId] = useState(null);
    const [formData, setFormData] = useState({
        title: ''
    });

    const [groups] = useState([
        { name: 'dolor' },
        { name: 'eos' },
        { name: 'eos' },
        { name: 'et' },
        { name: 'modi' },
        { name: 'nulla' },
        { name: 'omnis' },
        { name: 'placeat' },
        { name: 'qui' },
        { name: 'quia' },
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic">Offline Exam Group</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Offline Exam</span>
                    <span>|</span>
                    <span className="text-slate-500 italic">Offline Exam Group</span>
                </div>
            </div>

            <div className="px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Group Card */}
                <Card className="lg:col-span-4 p-10 border-none shadow-snow-lg bg-white rounded-[40px] h-fit">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8 italic">
                        Add Offline Exam Group
                    </h3>
                    <div className="space-y-6">
                        <Input
                            label="TITLE *"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="TITLE *"
                            required
                        />
                        <div className="flex justify-center pt-6">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all w-full">
                                <span>✓ SAVE GROUP</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Group List Card */}
                <Card className="lg:col-span-2 p-10 border-none shadow-snow-lg bg-white rounded-[40px] overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest italic">
                            Offline Exam Group List
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

                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest first:rounded-l-2xl">
                                        ↓ Title
                                    </th>
                                    <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest last:rounded-r-2xl">
                                        ↓ Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {groups.map((group, idx) => (
                                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 px-6 text-slate-400 text-xs">{group.name}</td>
                                        <td className="py-6 px-6 text-right relative">
                                            <div className="relative inline-block">
                                                <button
                                                    onClick={() => setOpenActionId(openActionId === idx ? null : idx)}
                                                    className={`flex items-center space-x-2 bg-white border-2 border-[#7c32ff]/20 text-[#7c32ff] rounded-full px-6 py-1.5 text-[10px] font-black transition-all group/btn hover:border-[#7c32ff] active:scale-95 ${openActionId === idx ? 'bg-[#7c32ff] text-white' : ''}`}
                                                >
                                                    <span className="uppercase tracking-widest">SELECT ↓</span>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Placeholder */}
                    <div className="mt-8 flex justify-center items-center space-x-4">
                        <div className="w-8 h-8 rounded-xl bg-[#7c32ff] text-white flex items-center justify-center text-[10px] font-black shadow-lg shadow-purple-500/20">1</div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default QuestionGroup;
