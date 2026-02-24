import React, { useState } from 'react';
import {
    LayoutDashboard, Menu, GripVertical, X, ChevronDown, ChevronUp,
    Edit2, Trash2, Plus, Search, RotateCcw, Briefcase, GraduationCap,
    Download, Calendar, Printer, Users, AlertCircle, CreditCard,
    BookOpen, Truck, Home, Settings, Globe, PieChart, Monitor,
    MessageSquare, Megaphone, Palette, Activity, Shield, Key, ChevronRight
} from 'lucide-react';

const SidebarManager = () => {
    const [selectedRole, setSelectedRole] = useState('Staff');
    const [expandedSections, setExpandedSections] = useState({
        dashboard: true,
        administration: true,
        student: true,
        exam: true,
        hr: true
    });

    const [menuData, setMenuData] = useState([
        {
            id: 'dashboard',
            title: 'Dashboard',
            items: [
                { id: 'dash', name: 'Dashboard', icon: <LayoutDashboard size={14} /> },
                { id: 'sidemanager', name: 'Sidebar Manager', icon: <Menu size={14} /> }
            ]
        },
        {
            id: 'administration',
            title: 'Administration',
            items: [
                { id: 'academics', name: 'Academics', icon: <GraduationCap size={14} /> },
                { id: 'adminsection', name: 'Admin Section', icon: <Briefcase size={14} /> },
                { id: 'studymaterial', name: 'Study Material', icon: <Download size={14} /> },
                { id: 'lessonplan', name: 'Lesson Plan', icon: <Calendar size={14} /> },
                { id: 'bulkprint', name: 'Bulk Print', icon: <Printer size={14} /> },
                { id: 'downloadcenter', name: 'Download Center', icon: <Download size={14} /> }
            ]
        },
        {
            id: 'student',
            title: 'Student',
            items: [
                { id: 'studentinfo', name: 'Student Info', icon: <Users size={14} /> },
                { id: 'behaviour', name: 'Behaviour Records', icon: <AlertCircle size={14} /> },
                { id: 'fees', name: 'Fees', icon: <CreditCard size={14} /> },
                { id: 'homework', name: 'Homework', icon: <BookOpen size={14} /> },
                { id: 'library', name: 'Library', icon: <BookOpen size={14} /> },
                { id: 'transport', name: 'Transport', icon: <Truck size={14} /> },
                { id: 'dormitory', name: 'Dormitory', icon: <Home size={14} /> }
            ]
        },
        {
            id: 'exam',
            title: 'Exam',
            items: [
                { id: 'exam1', name: 'Examination', icon: <Monitor size={14} /> },
                { id: 'examplan', name: 'Exam Plan', icon: <Calendar size={14} /> },
                { id: 'onlineexam', name: 'Online Exam', icon: <Monitor size={14} /> }
            ]
        },
        {
            id: 'hr',
            title: 'HR',
            items: [
                { id: 'hr1', name: 'Human Resource', icon: <Briefcase size={14} /> },
                { id: 'te', name: 'Teacher Evaluation', icon: <Users size={14} /> },
                { id: 'leave', name: 'Leave', icon: <Calendar size={14} /> },
                { id: 'roleperm', name: 'Role & Permission', icon: <Shield size={14} /> }
            ]
        },
        {
            id: 'accounts',
            title: 'Accounts',
            items: [
                { id: 'wallet_pending', name: 'Pending Deposit', icon: <CreditCard size={14} /> },
                { id: 'wallet_approve', name: 'Approve Deposit', icon: <CreditCard size={14} /> },
                { id: 'wallet_reject', name: 'Reject Deposit', icon: <CreditCard size={14} /> },
                { id: 'wallet_trans', name: 'Wallet Transaction', icon: <CreditCard size={14} /> },
                { id: 'wallet_refund', name: 'Refund Request', icon: <CreditCard size={14} /> },
                { id: 'acc_pl', name: 'Profit & Loss', icon: <PieChart size={14} /> },
                { id: 'acc_income', name: 'Income', icon: <Briefcase size={14} /> },
                { id: 'acc_expense', name: 'Expense', icon: <Briefcase size={14} /> },
                { id: 'acc_coa', name: 'Chart Of Account', icon: <Briefcase size={14} /> },
                { id: 'acc_bank', name: 'Bank Account', icon: <Briefcase size={14} /> },
                { id: 'acc_transfer', name: 'Fund Transfer', icon: <Briefcase size={14} /> },
                { id: 'inventory', name: 'Inventory', icon: <PieChart size={14} /> }
            ]
        },
        {
            id: 'utilities',
            title: 'Utilities',
            items: [
                { id: 'chat', name: 'Chat', icon: <MessageSquare size={14} /> },
                { id: 'comm', name: 'Communicate', icon: <Megaphone size={14} /> },
                { id: 'style', name: 'Style', icon: <Palette size={14} /> },
                { id: 'userlog', name: 'User Log', icon: <Users size={14} /> },
                { id: 'util', name: 'Utilities', icon: <Activity size={14} /> },
                { id: 'modmanager', name: 'Module Manager', icon: <Settings size={14} /> }
            ]
        }
    ]);

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
    };

    const removeModule = (sectionId, itemId) => {
        setMenuData(prev => prev.map(section => {
            if (section.id === sectionId) {
                return { ...section, items: section.items.filter(item => item.id !== itemId) };
            }
            return section;
        }));
    };

    return (
        <div className="flex flex-col h-full bg-[#EAEDF2] overflow-hidden">
            {/* Header */}
            <header className="bg-white px-8 py-5 flex items-center justify-between shrink-0 shadow-sm border-b border-slate-100 relative z-10">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Sidebar Manager</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Sidebar Manager</span>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#1C1C1C] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all duration-300 shadow-lg shadow-black/10 active:scale-95">
                    Reset to default
                </button>
            </header>

            <div className="flex p-8 gap-8 overflow-hidden flex-1">
                {/* Left Column: Role & Actions */}
                <div className="w-[340px] flex flex-col gap-6 shrink-0">
                    <div className="bg-white rounded-[2rem] border border-snow-100 p-8 space-y-8 shadow-sm">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-secondary/60 uppercase tracking-widest px-1 block">Role Name</label>
                            <div className="relative group">
                                <select
                                    className="w-full bg-snow-50 border border-snow-100 rounded-2xl px-5 py-3.5 text-xs font-bold text-[#2D3339] appearance-none focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                >
                                    <option>Staff</option>
                                    <option>Teacher</option>
                                    <option>Admin</option>
                                </select>
                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary/40 group-hover:text-primary transition-colors pointer-events-none" size={16} />
                            </div>
                        </div>

                        <div className="relative group">
                            <select className="w-full bg-snow-50 border border-snow-100 rounded-2xl px-5 py-3.5 text-xs font-bold text-[#2D3339] appearance-none focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all outline-none">
                                <option>Add Section</option>
                                <option>Administration</option>
                                <option>Human Resource</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary/40 group-hover:text-primary transition-colors pointer-events-none" size={16} />
                        </div>

                        <div className="pt-4 border-t border-snow-100">
                            <h4 className="text-xs font-black text-[#2D3339] mb-5 tracking-tight">Available menu items</h4>
                            <div className="relative mb-6">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/30" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search items..."
                                    className="w-full bg-snow-50 border border-snow-100 rounded-2xl pl-12 pr-5 py-3.5 text-xs font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                                />
                            </div>
                            {/* Empty state or list could go here */}
                        </div>
                    </div>
                </div>

                {/* Middle Column: Menu List (Reordering UI) */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex items-center justify-between mb-5 px-1 shrink-0">
                        <h2 className="text-[10px] font-black text-secondary/60 uppercase tracking-[0.2em]">Menu List</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto snow-scrollbar space-y-6 pr-4">
                        {menuData.map((section) => (
                            <div key={section.id} className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-snow-100 transition-all duration-300 hover:shadow-md group/section">
                                {/* Section Header */}
                                <div className="bg-[#2D3339] px-6 py-4 flex items-center justify-between relative">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/section:bg-primary transition-colors"></div>
                                        <h3 className="text-xs font-black text-white tracking-widest uppercase">{section.title}</h3>
                                    </div>
                                    <div className="flex items-center gap-5 text-white/40">
                                        <div className="p-1.5 hover:bg-white/10 rounded-lg cursor-pointer transition-colors group/edit">
                                            <Edit2 size={13} className="group-hover/edit:text-white" />
                                        </div>
                                        <div className="p-1.5 hover:bg-white/10 rounded-lg cursor-pointer transition-colors group/del">
                                            <X size={15} className="group-hover/del:text-red-400" />
                                        </div>
                                        <div
                                            onClick={() => toggleSection(section.id)}
                                            className={`p-1.5 hover:bg-white/10 rounded-lg cursor-pointer transition-all duration-300 ${expandedSections[section.id] ? 'rotate-180' : ''}`}
                                        >
                                            <ChevronDown size={15} className="text-white/60" />
                                        </div>
                                    </div>
                                </div>

                                {/* Section Items */}
                                <div className={`transition-all duration-500 ease-in-out ${expandedSections[section.id] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    <div className="p-5 bg-[#EDF2F9]/50 space-y-3">
                                        {section.items.map((item) => (
                                            <div key={item.id} className="bg-[#E4ECF4]/80 backdrop-blur-sm rounded-2xl px-5 py-3.5 flex items-center justify-between group transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
                                                <div className="flex items-center gap-4">
                                                    <div className="cursor-grab active:cursor-grabbing p-1">
                                                        <GripVertical size={14} className="text-secondary/20 group-hover:text-primary/40 transition-colors" />
                                                    </div>
                                                    <span className="text-[11px] font-bold text-[#2D3339]/80 group-hover:text-[#2D3339] transition-colors">{item.name}</span>
                                                </div>
                                                <div
                                                    onClick={() => removeModule(section.id, item.id)}
                                                    className="p-1.5 hover:bg-red-50 text-secondary/0 group-hover:text-red-400 rounded-lg cursor-pointer transition-all duration-300"
                                                >
                                                    <X size={13} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Live Preview */}
                <div className="w-[340px] flex flex-col shrink-0">
                    <div className="flex items-center justify-between mb-5 px-1 shrink-0">
                        <h2 className="text-[10px] font-black text-secondary/60 uppercase tracking-[0.2em]">Live Preview</h2>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-10 border border-snow-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex-1 overflow-y-auto snow-scrollbar relative">
                        <div className="space-y-10">
                            {menuData.map((section) => (
                                <div key={section.id} className="space-y-5">
                                    <h4 className="text-[9px] font-black text-secondary/30 uppercase tracking-[0.25em] pl-1">
                                        {section.title}
                                    </h4>
                                    <div className="space-y-4">
                                        {section.items.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between text-secondary/50 group cursor-pointer hover:text-primary transition-all duration-300 transform hover:translate-x-1">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-8 h-8 rounded-xl bg-snow-50 flex items-center justify-center group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                                                        {item.icon}
                                                    </div>
                                                    <span className="text-[11px] font-extrabold tracking-tight group-hover:text-navy-900 transition-colors">{item.name}</span>
                                                </div>
                                                <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* WhatsApp Floating (Integrated) */}
                        <div className="absolute bottom-10 right-10">
                            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl text-white cursor-pointer hover:scale-110 active:scale-95 transition-all">
                                <MessageSquare size={18} fill="currentColor" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarManager;
