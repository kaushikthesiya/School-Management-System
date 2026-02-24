import React, { useState } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Search,
    Copy,
    Download,
    FileText,
    Printer,
    Layout,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ArrowDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssignIncident = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const ActionIcon = ({ Icon }) => (
        <button className="p-2 rounded-lg text-slate-400 hover:text-[#7c32ff] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
            <Icon size={14} />
        </button>
    );

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1 italic">
            {children} {required && <span className="text-rose-500">*</span>}
        </label>
    );

    const students = [
        { adm: '10079', roll: '47882', name: 'Vidal Kovacek', class: 'Class 5(B)', gender: 'Female', phone: '+88012345672', points: 0, incidents: 0 },
        { adm: '10441', roll: '58458', name: 'Amaya Weissnat', class: 'Class 2(E)', gender: 'Female', phone: '+88012345675', points: 0, incidents: 0 },
        { adm: '12150', roll: '81288', name: 'Carole Hagenes', class: 'Class 2(D)', gender: 'Female', phone: '+88012345674', points: 0, incidents: 0 },
        { adm: '13328', roll: '41254', name: 'Scarlett Pfeiffer', class: 'Class 4(B)', gender: 'Female', phone: '+88012345672', points: 0, incidents: 0 },
        { adm: '14871', roll: '42078', name: 'Jenifer Kris', class: 'Class 1(C)', gender: 'Male', phone: '+88012345671', points: 0, incidents: 0 },
        { adm: '15383', roll: '10766', name: 'Ubaldo Pfannerstill', class: 'Class 1(E)', gender: 'Male', phone: '+88012345673', points: 0, incidents: 0 },
        { adm: '16057', roll: '85561', name: 'Louie Littel', class: 'Class 4(D)', gender: 'Female', phone: '+88012345672', points: 0, incidents: 0 },
        { adm: '16994', roll: '53771', name: 'Hermina Rutherford', class: 'Class 3(D)', gender: 'Male', phone: '+88012345672', points: 0, incidents: 0 },
        { adm: '17030', roll: '75830', name: 'Ross Reinger', class: 'Class 1(D)', gender: 'Male', phone: '+88012345674', points: 0, incidents: 0 },
        { adm: '17253', roll: '53001', name: 'Bryce Douglas', class: 'Class 4(A)', gender: 'Female', phone: '+88012345673', points: 0, incidents: 0 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#7c32ff] rounded-l-full" />

                <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Assign Incident</h1>

                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-[#7c32ff] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span>Behaviour Records</span>
                    <span>|</span>
                    <span className="text-[#7c32ff]">Assign Incident</span>
                </div>
            </div>

            {/* Select Criteria Card */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden">
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">Select Criteria</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label required>ACADEMIC YEAR</Label>
                        <div className="relative">
                            <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none">
                                <option>2026(Jan-Dec)</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>CLASS</Label>
                        <div className="relative">
                            <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none">
                                <option>Select Class</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>SECTION</Label>
                        <div className="relative">
                            <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all appearance-none">
                                <option>Select Section</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>SEARCH BY NAME</Label>
                        <input
                            type="text"
                            placeholder="NAME"
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>SEARCH BY ROLL</Label>
                        <input
                            type="text"
                            placeholder="ROLL"
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all"
                        />
                    </div>
                    <div className="flex items-end pb-0.5">
                        <Button className="w-full lg:w-32 ml-auto bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl py-3.5 shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2 active:scale-95 transition-all text-[10px] font-black uppercase tracking-widest">
                            <Search size={14} strokeWidth={3} />
                            <span>SEARCH</span>
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Student List Table */}
            <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Assign Incident List</h3>

                    <div className="flex items-center space-x-6">
                        <div className="relative group">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="QUICK SEARCH"
                                className="bg-transparent border-b border-slate-100 py-2 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:border-[#7c32ff] transition-all w-48"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-1 border border-purple-100 rounded-2xl p-1.5 bg-purple-50/30">
                            <ActionIcon Icon={Copy} />
                            <ActionIcon Icon={FileText} />
                            <ActionIcon Icon={Download} />
                            <ActionIcon Icon={Layout} />
                            <ActionIcon Icon={Printer} />
                            <ActionIcon Icon={Layout} />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="text-left py-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                                    <div className="flex items-center space-x-1"><span>↓ Admission No.</span></div>
                                </th>
                                <th className="text-left py-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                                    <div className="flex items-center space-x-1"><span>↓ Roll No</span></div>
                                </th>
                                <th className="text-left py-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                                    <div className="flex items-center space-x-1"><span>↓ Student Name</span></div>
                                </th>
                                <th className="text-left py-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                                    <div className="flex items-center space-x-1"><span>↓ Class (Sec.)</span></div>
                                </th>
                                <th className="text-left py-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                                    <div className="flex items-center space-x-1"><span>↓ Gender</span></div>
                                </th>
                                <th className="text-left py-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                                    <div className="flex items-center space-x-1"><span>↓ Phone</span></div>
                                </th>
                                <th className="text-left py-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                                    <div className="flex items-center space-x-1"><span>Total Points</span></div>
                                </th>
                                <th className="text-left py-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                                    <div className="flex items-center space-x-1"><span>Total Incidents</span></div>
                                </th>
                                <th className="text-right py-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                                    <div className="flex items-center space-x-1 justify-end"><span>Actions</span></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                    <td className="py-4 px-4 text-[10px] font-bold text-slate-600 tabular-nums">{student.adm}</td>
                                    <td className="py-4 px-4 text-[10px] font-bold text-slate-600 tabular-nums">{student.roll}</td>
                                    <td className="py-4 px-4 text-[10px] font-bold text-slate-600 italic uppercase">{student.name}</td>
                                    <td className="py-4 px-4 text-[10px] font-bold text-slate-600 italic uppercase">{student.class}</td>
                                    <td className="py-4 px-4 text-[10px] font-bold text-slate-600 italic uppercase">{student.gender}</td>
                                    <td className="py-4 px-4 text-[10px] font-bold text-slate-600 tabular-nums">{student.phone}</td>
                                    <td className="py-4 px-4 text-[10px] font-bold text-slate-600 tabular-nums">{student.points}</td>
                                    <td className="py-4 px-4 text-[10px] font-bold text-slate-600 tabular-nums">{student.incidents}</td>
                                    <td className="py-4 px-4 text-right">
                                        <button className="bg-white hover:bg-[#7c32ff] text-slate-400 hover:text-white border border-slate-200 hover:border-[#7c32ff] rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all flex items-center space-x-2 ml-auto shadow-sm active:scale-95">
                                            <span>SELECT</span>
                                            <ChevronDown size={12} strokeWidth={3} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-10 pt-10 border-t border-slate-50 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Showing 1 to 10 of 125 entries</span>
                    <div className="flex items-center space-x-2">
                        <button className="p-2.5 rounded-xl border border-slate-100 text-slate-300 hover:text-[#7c32ff] transition-all"><ChevronLeft size={16} /></button>
                        <div className="flex items-center space-x-1 px-1">
                            <span className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center italic">1</span>
                            <span className="w-8 h-8 rounded-lg text-slate-400 flex items-center justify-center hover:bg-slate-50 cursor-pointer">2</span>
                            <span className="w-8 h-8 rounded-lg text-slate-400 flex items-center justify-center hover:bg-slate-50 cursor-pointer">3</span>
                            <span className="text-slate-300">...</span>
                            <span className="w-8 h-8 rounded-lg text-slate-400 flex items-center justify-center hover:bg-slate-50 cursor-pointer">13</span>
                        </div>
                        <button className="p-2.5 rounded-xl border border-slate-100 text-slate-300 hover:text-[#7c32ff] transition-all"><ChevronRight size={16} /></button>
                    </div>
                </div>

                {/* WhatsApp Floating Button (as seen in photo) */}
                <div className="fixed bottom-10 right-10 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 cursor-pointer hover:scale-110 active:scale-95 transition-all z-50">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                </div>

                {/* Basket/Icon decorator (seen in photo) */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-[#7c32ff] rounded-l-xl flex items-center justify-center">
                    <Layout className="text-white" size={18} />
                </div>
            </Card>
        </div>
    );
};

export default AssignIncident;
