import React, { useState } from 'react';
import { Card, Button } from '../../components/SnowUI';
import {
    ChevronLeft,
    ChevronDown,
    Search,
    Copy,
    FileText,
    FileSpreadsheet,
    FileBox,
    Printer,
    ArrowUpDown,
    ChevronRight,
    LayoutPanelLeft,
    Save,
    Upload,
    Edit,
    Plus,
    Calendar,
    Paperclip,
    Check,
    Mail,
    Globe,
    Lock,
    ShieldCheck,
    Terminal,
    Activity,
    Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Reusable Components
const Label = ({ children, required }) => (
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 block px-1">
        {children} {required && <span className="text-rose-500">*</span>}
    </label>
);

const SectionHeader = ({ title, section }) => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-[#1e293b]">{title}</h1>
            <div className="flex items-center space-x-2 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/dashboard')}>Dashboard</span>
                <span>|</span>
                <span>{section}</span>
                <span>|</span>
                <span className="text-primary">{title}</span>
            </div>
        </div>
    );
};

const RadioToggle = ({ label, checked, onChange }) => (
    <div className="flex items-center space-x-3 cursor-pointer group" onClick={onChange}>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${checked ? 'border-[#7c32ff] shadow-sm shadow-[#7c32ff]/20' : 'border-slate-200 group-hover:border-slate-300'}`}>
            {checked && <div className="w-2.5 h-2.5 rounded-full bg-[#7c32ff] animate-in zoom-in duration-300" />}
        </div>
        <span className={`text-[12px] font-bold transition-colors ${checked ? 'text-slate-700' : 'text-slate-400 group-hover:text-slate-500'}`}>{label}</span>
    </div>
);

// 1. Two Factor Setting
export const TwoFactorSetting = () => {
    const [settings, setSettings] = React.useState({
        otp: 'disable',
        sendVia: 'email',
        applicable: { admin: true, student: true, parent: true, teacher: true, staff: true },
        lifetime: 300
    });

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Two Factor Setting" section="General Settings" />
            <Card className="p-12 border-none shadow-sm bg-white rounded-2xl max-w-7xl mx-auto overflow-visible relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                <h2 className="text-center text-lg font-bold text-[#1e293b] mb-12">Two Factor Setting</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
                    {/* Two Factor OTP */}
                    <div className="flex items-center justify-between group">
                        <Label>TWO FACTOR OTP <i className="ml-1 text-slate-300 not-italic">ⓘ</i></Label>
                        <div className="flex items-center space-x-8">
                            <RadioToggle label="Enable" checked={settings.otp === 'enable'} onChange={() => setSettings({ ...settings, otp: 'enable' })} />
                            <RadioToggle label="Disable" checked={settings.otp === 'disable'} onChange={() => setSettings({ ...settings, otp: 'disable' })} />
                        </div>
                    </div>

                    {/* Send Code Via */}
                    <div className="flex items-center justify-between group">
                        <Label>SEND CODE VIA <i className="ml-1 text-slate-300 not-italic">ⓘ</i></Label>
                        <div className="flex items-center space-x-8">
                            <RadioToggle label="SMS" checked={settings.sendVia === 'sms'} onChange={() => setSettings({ ...settings, sendVia: 'sms' })} />
                            <RadioToggle label="Email" checked={settings.sendVia === 'email'} onChange={() => setSettings({ ...settings, sendVia: 'email' })} />
                        </div>
                    </div>

                    {/* Applicable For */}
                    <div className="flex items-start justify-between group col-span-1 md:col-span-1">
                        <Label>APPLICABLE FOR <i className="ml-1 text-slate-300 not-italic">ⓘ</i></Label>
                        <div className="flex flex-wrap gap-6 max-w-[400px]">
                            {['Admin', 'Student', 'Parent', 'Teacher', 'Staff'].map(role => (
                                <RadioToggle
                                    key={role}
                                    label={role}
                                    checked={settings.applicable[role.toLowerCase()]}
                                    onChange={() => setSettings({
                                        ...settings,
                                        applicable: { ...settings.applicable, [role.toLowerCase()]: !settings.applicable[role.toLowerCase()] }
                                    })}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Code Lifetime */}
                    <div className="flex items-center justify-between group">
                        <Label>CODE LIFETIME (SECOND)</Label>
                        <input
                            type="number"
                            value={settings.lifetime}
                            onChange={(e) => setSettings({ ...settings, lifetime: e.target.value })}
                            className="w-full max-w-[400px] bg-white border border-slate-200 rounded-lg px-4 py-2 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[42px]"
                        />
                    </div>
                </div>

                <div className="mt-16 flex justify-center">
                    <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-12 py-3 text-[12px] font-black uppercase italic tracking-wider flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                        <Upload size={16} className="rotate-180" />
                        <span>UPDATE</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

// 2. General Settings (Main)
export const GeneralSettingsMain = () => {
    const [isEditing, setIsEditing] = useState(false);
    const info = [
        { label: "School Name", value: "InfixEdu" },
        { label: "Site Title", value: "Ultimate Education ERP" },
        { label: "Address", value: "Al Khuwair, Muscat, Oman" },
        { label: "Phone Number", value: "+96897002764" },
        { label: "Email Address", value: "hello@aorasoft.com" },
        { label: "Fees Income Head", value: "Fees Collection" },
        { label: "School Code", value: "12345678" },
        { label: "Academic Year", value: "2026 - [ Jan-Dec ]" },
        { label: "Language", value: "English" },
        { label: "Date Format", value: "17th May, 2016" },
        { label: "Week Start Day", value: "Monday" },
        { label: "Time Zone", value: "Asia/Dhaka" },
        { label: "Currency", value: "USD" },
        { label: "Currency Symbol", value: "$" },
        { label: "Max Upload File Size", value: "102400 MB" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen text-[#5c6d9a] font-black italic uppercase tracking-tighter">
            <SectionHeader title="General Settings" section="System Settings" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Side: Logo/Favicon (Always Visible) */}
                <div className="lg:col-span-3 space-y-6">
                    <Card className="p-8 border-none shadow-sm bg-white rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                        <h3 className="text-[10px] font-black text-slate-400 mb-8 tracking-widest uppercase italic">Change Logo</h3>
                        <div className="py-12 flex flex-col items-center">
                            <div className="mb-10 transform group-hover:scale-105 transition-all">
                                <span className="text-5xl font-black italic tracking-tighter text-slate-300 opacity-40">INFIX</span>
                            </div>
                            <div className="space-y-4 w-full">
                                <Button className="w-full bg-[#1e293b] text-white rounded-lg py-3 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-black/10 active:scale-95 transition-all">UPLOAD</Button>
                                <Button className="w-full bg-slate-50 text-slate-300 rounded-lg py-3 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100">CHANGE LOGO</Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-8 border-none shadow-sm bg-white rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                        <h3 className="text-[10px] font-black text-slate-400 mb-8 tracking-widest uppercase italic">Change Favicon</h3>
                        <div className="py-12 flex flex-col items-center">
                            <div className="mb-10 transform group-hover:scale-105 transition-all">
                                <span className="text-5xl font-black italic tracking-tighter text-rose-500 opacity-20">M</span>
                            </div>
                            <div className="space-y-4 w-full">
                                <Button className="w-full bg-[#1e293b] text-white rounded-lg py-3 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-black/10 active:scale-95 transition-all">UPLOAD</Button>
                                <Button className="w-full bg-slate-50 text-slate-300 rounded-lg py-3 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100">CHANGE FAVICON</Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Side: View or Edit Form */}
                <div className="lg:col-span-9">
                    {!isEditing ? (
                        <Card className="p-0 border-none shadow-sm bg-white rounded-[2rem] overflow-hidden">
                            <div className="p-10 border-b border-slate-50 flex justify-between items-center">
                                <h2 className="text-sm font-black text-slate-700 tracking-widest italic">General Settings View</h2>
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-xl px-8 py-3.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-xl shadow-black/20 active:scale-95 transition-all"
                                >
                                    <Edit size={16} />
                                    <span>EDIT</span>
                                </Button>
                            </div>
                            <div className="p-2">
                                <table className="w-full border-separate border-spacing-0">
                                    <tbody>
                                        {info.map((item, idx) => (
                                            <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="px-10 py-5 text-[11px] font-black text-slate-400 w-[35%] tracking-widest uppercase italic border-r border-slate-50">{item.label}</td>
                                                <td className="px-10 py-5 text-[11px] font-bold text-[#1e293b] tracking-tight">{item.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    ) : (
                        <Card className="p-10 border-none shadow-sm bg-white rounded-[2rem] space-y-12">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-sm border-l-4 border-primary pl-4 tracking-widest font-black italic text-slate-700">Edit General Settings</h2>
                                <Button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-slate-50 text-slate-400 hover:bg-slate-100 rounded-lg px-6 py-2 text-[9px] font-black uppercase tracking-widest transition-all"
                                >
                                    CANCEL
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                                <div className="space-y-3">
                                    <Label required>School Name</Label>
                                    <input type="text" defaultValue="InfixEdu" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <Label required>Site Title</Label>
                                    <input type="text" defaultValue="Ultimate Education ERP" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <Label required>Address</Label>
                                    <input type="text" defaultValue="Al Khuwair, Muscat, Oman" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <Label required>Phone Number</Label>
                                    <input type="text" defaultValue="+96897002764" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <Label required>Email Address</Label>
                                    <input type="text" defaultValue="hello@aorasoft.com" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <Label required>Fees Income Head</Label>
                                    <div className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-400 h-[52px] flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                                        <span>Select Fees Income Head</span>
                                        <ChevronDown size={16} className="text-slate-300" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label required>School Code</Label>
                                    <input type="text" defaultValue="12345678" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all" />
                                </div>
                                <div className="space-y-3 text-slate-50/0 select-none">.</div> {/* Spacer for alignment */}

                                <div className="space-y-3">
                                    <Label required>Academic Year</Label>
                                    <div className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-400 h-[52px] flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                                        <span>Select Academic Year</span>
                                        <ChevronDown size={16} className="text-slate-300" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label required>Language</Label>
                                    <div className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-400 h-[52px] flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                                        <span>Select Language</span>
                                        <ChevronDown size={16} className="text-slate-300" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label required>Date Format</Label>
                                    <div className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-400 h-[52px] flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                                        <span>Select Date Format</span>
                                        <ChevronDown size={16} className="text-slate-300" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label required>Time Zone</Label>
                                    <div className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-400 h-[52px] flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                                        <span>Select Time Zone</span>
                                        <ChevronDown size={16} className="text-slate-300" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label required>Currency</Label>
                                    <div className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-400 h-[52px] flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                                        <span>Select Currency</span>
                                        <ChevronDown size={16} className="text-slate-300" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label required>Currency Symbol</Label>
                                    <input type="text" defaultValue="$" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <Label required>Week Start Day</Label>
                                    <div className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-400 h-[52px] flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                                        <span>Select Week Start Day</span>
                                        <ChevronDown size={16} className="text-slate-300" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label required>Max Upload File Size (MB)</Label>
                                    <input type="number" defaultValue={102400} className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all" />
                                </div>
                            </div>

                            <div className="pt-12 flex justify-center">
                                <Button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] italic flex items-center space-x-3 shadow-2xl shadow-primary/30 transition-all active:scale-95"
                                >
                                    <Check size={20} />
                                    <span>SAVE GENERAL SETTINGS</span>
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

// 3. Optional Subject
export const OptionalSubject = () => {
    const [selectedClass, setSelectedClass] = useState('Class 1');
    const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'All Select'];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Assign Optional Subject" section="System Settings" />

            <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[2rem] mb-10 overflow-visible relative">
                {/* Decorative purple element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-16 bg-[#7c32ff] rounded-l-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 shadow-[0_0_8px_white]" />
                </div>

                <h2 className="text-lg font-bold text-[#1e293b] mb-10 border-l-4 border-[#7c32ff] pl-5 uppercase tracking-wide">Assign Optional Subject</h2>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Select Class Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <Label required>SELECT CLASS</Label>
                        <div className="space-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                            {classes.map(cls => (
                                <div
                                    key={cls}
                                    onClick={() => setSelectedClass(cls)}
                                    className="flex items-center space-x-3 cursor-pointer group hover:translate-x-1 transition-transform"
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedClass === cls ? 'border-[#7c32ff] shadow-sm shadow-[#7c32ff]/20' : 'border-slate-300'}`}>
                                        {selectedClass === cls && <div className="w-2.5 h-2.5 rounded-full bg-[#7c32ff] animate-in zoom-in duration-300" />}
                                    </div>
                                    <span className={`text-[12px] font-bold ${selectedClass === cls ? 'text-slate-700' : 'text-slate-400'}`}>{cls}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* GPA Column */}
                    <div className="lg:col-span-8 flex flex-col justify-start space-y-8">
                        <div className="w-full max-w-xl">
                            <Label required>GPA ABOVE</Label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="number"
                                    defaultValue={0}
                                    className="flex-1 bg-white border border-slate-200 rounded-xl px-6 py-3.5 text-[14px] font-bold text-slate-600 outline-none focus:border-[#7c32ff] focus:ring-4 focus:ring-[#7c32ff]/10 transition-all shadow-sm"
                                />
                                <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl px-12 py-3.5 text-[11px] font-black uppercase italic tracking-[0.15em] shadow-xl shadow-purple-500/20 active:scale-95 transition-all">
                                    SAVE
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="space-y-6 mt-12">
                <div className="flex justify-between items-center px-4">
                    <h3 className="text-[13px] font-black text-slate-700 uppercase tracking-widest italic border-b-2 border-[#7c32ff] pb-1">Optional Subject</h3>
                    <div className="flex items-center space-x-6">
                        <div className="relative group">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" />
                            <input
                                type="text"
                                placeholder="SEARCH"
                                className="pl-11 pr-6 py-2.5 bg-white border border-slate-100 rounded-full text-[10px] font-black tracking-widest focus:ring-2 focus:ring-[#7c32ff]/20 outline-none w-64 shadow-sm transition-all"
                            />
                        </div>
                        <div className="flex border border-slate-100 rounded-xl overflow-hidden shadow-sm bg-white">
                            {[Copy, FileText, FileSpreadsheet, FileBox, Printer, LayoutPanelLeft].map((Icon, i) => (
                                <button key={i} className="p-3 hover:bg-slate-50 border-r last:border-0 border-slate-50 transition-colors group">
                                    <Icon size={14} className="text-slate-400 group-hover:text-[#7c32ff]" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <Card className="border-none shadow-snow-lg bg-white rounded-[2rem] overflow-hidden p-0 relative">
                    <table className="w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-left border-b border-r border-slate-100 w-24">
                                    <div className="flex items-center space-x-2 cursor-pointer hover:text-slate-600">
                                        <span>SL</span>
                                        <ArrowUpDown size={12} />
                                    </div>
                                </th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-left border-b border-r border-slate-100">
                                    <div className="flex items-center space-x-2 cursor-pointer hover:text-slate-600">
                                        <span>Class Name</span>
                                        <ArrowUpDown size={12} />
                                    </div>
                                </th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-left border-b border-r border-slate-100">
                                    <div className="flex items-center space-x-2 cursor-pointer hover:text-slate-600">
                                        <span>GPA Above</span>
                                        <ArrowUpDown size={12} />
                                    </div>
                                </th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic text-left border-b border-slate-100 w-32 text-center">
                                    <div className="flex items-center justify-center space-x-2 cursor-pointer hover:text-slate-600">
                                        <span>Action</span>
                                        <ArrowUpDown size={12} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={4} className="px-8 py-24 text-center">
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                            <FileBox size={32} className="text-slate-200" />
                                        </div>
                                        <span className="text-slate-300 font-black tracking-[0.3em] uppercase text-[10px] italic">No Data Available In Table</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="p-6 bg-slate-50/30 border-t border-slate-50 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span className="italic">Showing 0 to 0 of 0 entries</span>
                        <div className="flex space-x-2">
                            <button className="p-2 bg-white border border-slate-100 rounded-lg hover:text-[#7c32ff] transition-colors"><ChevronLeft size={16} /></button>
                            <button className="p-2 bg-white border border-slate-100 rounded-lg hover:text-[#7c32ff] transition-colors"><ChevronRight size={16} /></button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

// 4. Academic Year
export const AcademicYear = () => {
    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Academic Year" section="System Settings" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="lg:col-span-4 p-8 border-none shadow-sm bg-white rounded-2xl self-start">
                    <h2 className="text-sm font-bold text-slate-700 mb-8 border-l-4 border-primary pl-4">Add Academic Year</h2>
                    <div className="space-y-6">
                        <div>
                            <Label required>YEAR *</Label>
                            <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-lg px-4 py-2 text-[12px] font-medium text-slate-600 focus:border-primary outline-none h-[42px]" />
                        </div>
                        <div>
                            <Label required>YEAR TITLE *</Label>
                            <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-lg px-4 py-2 text-[12px] font-medium text-slate-600 focus:border-primary outline-none h-[42px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label required>STARTING DATE *</Label>
                                <div className="relative">
                                    <input type="text" defaultValue="01/01/2026" className="w-full bg-slate-50/50 border border-slate-100 rounded-lg px-4 py-2 text-[12px] font-medium text-slate-600 h-[42px]" />
                                    <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                </div>
                            </div>
                            <div>
                                <Label required>ENDING DATE *</Label>
                                <div className="relative">
                                    <input type="text" defaultValue="12/31/2026" className="w-full bg-slate-50/50 border border-slate-100 rounded-lg px-4 py-2 text-[12px] font-medium text-slate-600 h-[42px]" />
                                    <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label>COPY WITH ACADEMIC YEAR</Label>
                            <div className="w-full bg-slate-50/50 border border-slate-100 rounded-lg px-4 py-2 text-[12px] font-medium text-slate-300 h-[42px] flex items-center justify-between">
                                <span>Select</span>
                                <ChevronDown size={14} />
                            </div>
                        </div>
                        <div className="pt-4 flex justify-center">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-12 py-3 text-[11px] font-black uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-primary/20">
                                <Plus size={16} />
                                <span>SAVE</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                <div className="lg:col-span-8 space-y-6">
                    <div className="flex justify-between items-end px-2">
                        <h3 className="text-sm font-bold text-slate-700">Academic Year List</h3>
                        <div className="flex border border-[#7c32ff]/20 rounded-lg overflow-hidden shadow-sm shadow-primary/5">
                            {[Copy, FileText, FileSpreadsheet, FileBox, Printer, LayoutPanelLeft].map((Icon, i) => (
                                <button key={i} className="p-2 bg-white hover:bg-slate-50 border-r last:border-0 border-slate-100 transition-colors">
                                    <Icon size={14} className="text-[#7c32ff]/60" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <table className="w-full text-[11px] font-bold">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 uppercase italic">
                                    <th className="px-6 py-4 border-r border-slate-100 text-left">Year</th>
                                    <th className="px-6 py-4 border-r border-slate-100 text-left">Title</th>
                                    <th className="px-6 py-4 border-r border-slate-100 text-left whitespace-nowrap">Starting Date</th>
                                    <th className="px-6 py-4 border-r border-slate-100 text-left whitespace-nowrap">Ending Date</th>
                                    <th className="px-6 py-4 text-left w-24">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <tr className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 text-slate-600">2026</td>
                                    <td className="px-6 py-4 text-slate-600">Jan-Dec</td>
                                    <td className="px-6 py-4 text-slate-600">1st Jan, 2026</td>
                                    <td className="px-6 py-4 text-slate-600">31st Dec, 2026</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2 bg-primary/5 text-primary rounded-lg px-3 py-1.5 w-max cursor-pointer hover:bg-primary/10 transition-colors font-black uppercase text-[9px] tracking-widest italic group">
                                            <span>SELECT</span>
                                            <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// 5. Holiday
export const Holiday = () => {
    const list = [
        { id: 1, title: 'Winter Vacation', from: '22nd Jan, 2023', to: '28th Jan, 2023', days: '7 days' },
        { id: 2, title: 'Summer Vacation', from: '2nd May, 2023', to: '8th May, 2023', days: '7 days' },
        { id: 3, title: 'Public Holiday', from: '10th May, 2023', to: '11th May, 2023', days: '2 days' },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Holiday List" section="System Settings" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="lg:col-span-4 p-8 border-none shadow-sm bg-white rounded-2xl self-start">
                    <h2 className="text-sm font-bold text-slate-700 mb-8 border-l-4 border-primary pl-4">Add Holiday</h2>
                    <div className="space-y-6">
                        <div>
                            <Label required>HOLIDAY TITLE *</Label>
                            <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-lg px-4 py-2 text-[12px] font-medium text-slate-600 focus:border-primary outline-none h-[42px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label required>FROM DATE *</Label>
                                <div className="relative">
                                    <input type="text" defaultValue="02/23/2026" className="w-full bg-slate-50/50 border border-slate-100 rounded-lg px-4 py-2 text-[12px] font-medium text-slate-600 h-[42px]" />
                                    <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                </div>
                            </div>
                            <div>
                                <Label required>TO DATE *</Label>
                                <div className="relative">
                                    <input type="text" defaultValue="02/23/2026" className="w-full bg-slate-50/50 border border-slate-100 rounded-lg px-4 py-2 text-[12px] font-medium text-slate-600 h-[42px]" />
                                    <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label required>DESCRIPTION *</Label>
                            <textarea className="w-full bg-slate-50/50 border border-slate-100 rounded-lg px-4 py-3 text-[12px] font-medium text-slate-600 focus:border-primary outline-none h-32 resize-none" />
                        </div>
                        <div className="p-1.5 border border-dashed border-slate-100 rounded-xl bg-slate-50/30">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 ml-4 italic">Attach File</span>
                                <Button className="bg-[#7c32ff] text-white rounded-lg px-6 py-2 text-[9px] font-black uppercase tracking-widest shadow-md">BROWSE</Button>
                            </div>
                        </div>
                        <p className="text-[9px] text-slate-300 italic font-medium">(PDF,DOC,DOCX,JPG,JPEG,PNG,TXT are allowed for upload)</p>
                        <div className="pt-4 flex justify-center">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-12 py-3 text-[11px] font-black uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                                <Plus size={16} />
                                <span>SAVE</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                <div className="lg:col-span-8 space-y-6">
                    <div className="flex justify-between items-end px-2">
                        <h3 className="text-sm font-bold text-slate-700">Holiday List</h3>
                        <div className="flex border border-[#7c32ff]/20 rounded-lg overflow-hidden shadow-sm shadow-primary/5">
                            {[Copy, FileText, FileSpreadsheet, FileBox, Printer, LayoutPanelLeft].map((Icon, i) => (
                                <button key={i} className="p-2 bg-white hover:bg-slate-50 border-r last:border-0 border-slate-100 transition-colors">
                                    <Icon size={14} className="text-[#7c32ff]/60" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <table className="w-full text-[11px] font-bold">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 uppercase italic">
                                    <th className="px-6 py-4 border-r border-slate-100 text-left w-12 text-slate-300">#</th>
                                    <th className="px-6 py-4 border-r border-slate-100 text-left">Holiday Title</th>
                                    <th className="px-6 py-4 border-r border-slate-100 text-left whitespace-nowrap">From Date</th>
                                    <th className="px-6 py-4 border-r border-slate-100 text-left whitespace-nowrap">To Date</th>
                                    <th className="px-6 py-4 border-r border-slate-100 text-left">Days</th>
                                    <th className="px-6 py-4 border-r border-slate-100 text-left">Details</th>
                                    <th className="px-6 py-4 text-left w-24">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-[10px]">
                                {list.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-6 py-4 text-slate-300 italic">{item.id}</td>
                                        <td className="px-6 py-4 text-slate-600 font-black">{item.title}</td>
                                        <td className="px-6 py-4 text-slate-400 italic font-medium">{item.from}</td>
                                        <td className="px-6 py-4 text-slate-400 italic font-medium">{item.to}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.days}</td>
                                        <td className="px-6 py-4">
                                            <Paperclip size={14} className="text-slate-200" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2 bg-primary/5 text-primary rounded-lg px-3 py-1.5 w-max cursor-pointer hover:bg-primary/10 transition-colors font-black uppercase text-[9px] tracking-widest italic group-action">
                                                <span>SELECT</span>
                                                <ChevronDown size={12} className="group-action-hover:rotate-180 transition-transform duration-300" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// 6. Tawk To Chat Setting
export const TawkToChatSetting = () => {
    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Tawk To Chat Setting" section="General Settings" />
            <Card className="p-12 border-none shadow-sm bg-white rounded-2xl max-w-7xl mx-auto overflow-visible relative">
                <h2 className="text-center text-lg font-bold text-[#1e293b] mb-2 uppercase tracking-tight">Tawk To Chat Setting</h2>
                <p className="text-center text-[10px] text-primary font-bold mb-12 hover:underline cursor-pointer tracking-wider italic">https://dashboard.tawk.to/login</p>

                <div className="space-y-12">
                    <div className="flex items-center group">
                        <div className="w-1/4">
                            <Label>TAWK TO CHAT</Label>
                        </div>
                        <div className="flex items-center space-x-8">
                            <RadioToggle label="Enable" checked={false} onChange={() => { }} />
                            <RadioToggle label="Disable" checked={true} onChange={() => { }} />
                        </div>
                    </div>

                    <div className="flex items-start group">
                        <div className="w-1/4">
                            <Label>APPLICABLE FOR</Label>
                        </div>
                        <div className="flex flex-wrap gap-x-10 gap-y-6 flex-1">
                            {['Student', 'Parents', 'Teacher', 'Admin', 'Accountant', 'Receptionist', 'Librarian', 'Driver'].map(role => (
                                <RadioToggle key={role} label={role} checked={false} onChange={() => { }} />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-24 gap-y-12">
                        <div className="flex items-center justify-between">
                            <Label>SHOW ON ADMIN PANEL</Label>
                            <div className="flex items-center space-x-8">
                                <RadioToggle label="Yes" checked={false} onChange={() => { }} />
                                <RadioToggle label="No" checked={true} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>AVAILABILITY</Label>
                            <div className="flex items-center space-x-8">
                                <RadioToggle label="Mobile" checked={false} onChange={() => { }} />
                                <RadioToggle label="Only Desktop" checked={false} onChange={() => { }} />
                                <RadioToggle label="Both" checked={true} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>SHOW ON FRONTEND</Label>
                            <div className="flex items-center space-x-8">
                                <RadioToggle label="Yes" checked={true} onChange={() => { }} />
                                <RadioToggle label="No" checked={false} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>SHOWING PAGE</Label>
                            <div className="flex items-center space-x-8">
                                <RadioToggle label="Only homepage" checked={false} onChange={() => { }} />
                                <RadioToggle label="All page" checked={true} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>POSITION</Label>
                            <div className="flex items-center space-x-8">
                                <RadioToggle label="Left Side" checked={true} onChange={() => { }} />
                                <RadioToggle label="Right Side" checked={false} onChange={() => { }} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label>SHORT CODE</Label>
                        <textarea className="w-full bg-white border border-slate-200 rounded-xl px-6 py-4 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-32 resize-none shadow-inner shadow-slate-50" />
                        <p className="text-[10px] text-slate-300 italic">Please put the unique code of Direct Chat Link on here except the : <span className="text-primary hover:underline cursor-pointer">https://tawk.to/chat/</span></p>
                    </div>
                </div>

                <div className="mt-16 flex justify-center">
                    <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-12 py-3 text-[11px] font-black uppercase italic tracking-wider flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                        <Upload size={16} className="rotate-180" />
                        <span>UPDATE</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

// 7. Messenger Chat Setting
export const MessengerChatSetting = () => {
    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Messenger Chat Setting" section="General Settings" />
            <Card className="p-12 border-none shadow-sm bg-white rounded-2xl max-w-7xl mx-auto overflow-visible relative">
                <h2 className="text-center text-lg font-bold text-[#1e293b] mb-12 uppercase tracking-tight">Messenger Chat Setting</h2>

                <div className="space-y-12">
                    <div className="flex items-center group">
                        <div className="w-1/4">
                            <Label>MESSENGER CHAT</Label>
                        </div>
                        <div className="flex items-center space-x-8">
                            <RadioToggle label="Enable" checked={false} onChange={() => { }} />
                            <RadioToggle label="Disable" checked={true} onChange={() => { }} />
                        </div>
                    </div>

                    <div className="flex items-start group">
                        <div className="w-1/4">
                            <Label>APPLICABLE FOR</Label>
                        </div>
                        <div className="flex flex-wrap gap-x-10 gap-y-6 flex-1">
                            {['Student', 'Parents', 'Teacher', 'Admin', 'Accountant', 'Receptionist', 'Librarian', 'Driver'].map(role => (
                                <RadioToggle key={role} label={role} checked={false} onChange={() => { }} />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-24 gap-y-12">
                        <div className="flex items-center justify-between">
                            <Label>SHOW ON ADMIN PANEL</Label>
                            <div className="flex items-center space-x-8">
                                <RadioToggle label="Yes" checked={false} onChange={() => { }} />
                                <RadioToggle label="No" checked={true} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>AVAILABILITY</Label>
                            <div className="flex items-center space-x-8">
                                <RadioToggle label="Mobile" checked={false} onChange={() => { }} />
                                <RadioToggle label="Only Desktop" checked={false} onChange={() => { }} />
                                <RadioToggle label="Both" checked={true} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>SHOW ON FRONTEND</Label>
                            <div className="flex items-center space-x-8">
                                <RadioToggle label="Yes" checked={true} onChange={() => { }} />
                                <RadioToggle label="No" checked={false} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>SHOWING PAGE</Label>
                            <div className="flex items-center space-x-8">
                                <RadioToggle label="Only homepage" checked={false} onChange={() => { }} />
                                <RadioToggle label="All page" checked={true} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>POSITION</Label>
                            <div className="flex items-center space-x-8">
                                <RadioToggle label="Left Side" checked={true} onChange={() => { }} />
                                <RadioToggle label="Right Side" checked={false} onChange={() => { }} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label>SHORT CODE</Label>
                        <textarea className="w-full bg-white border border-slate-200 rounded-xl px-6 py-4 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-32 resize-none shadow-inner shadow-slate-50" />
                    </div>
                </div>

                <div className="mt-16 flex justify-center">
                    <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-12 py-3 text-[11px] font-black uppercase italic tracking-wider flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                        <Upload size={16} className="rotate-180" />
                        <span>UPDATE</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

// 8. Manage Currency
export const ManageCurrency = () => {
    const list = [
        { sl: 1, name: 'Leke', code: 'ALL', symbol: 'Lek', type: 'Symbol', pos: 'Suffix', space: 'Yes', digit: 2, sep: '.', thousand: ',' },
        { sl: 2, name: 'Dollars', code: 'USD', symbol: '$', type: 'Symbol', pos: 'Suffix', space: 'Yes', digit: 2, sep: '.', thousand: ',', active: true },
        { sl: 3, name: 'Afghanis', code: 'AFN', symbol: '؋', type: 'Symbol', pos: 'Suffix', space: 'Yes', digit: 2, sep: '.', thousand: ',' },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-[#1e293b]">Currency</h1>
                <div className="flex items-center space-x-2 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Currency</span>
                    <span>|</span>
                    <span className="text-primary">Manage Currency</span>
                </div>
            </div>

            <div className="flex justify-end mb-6">
                <Button className="bg-[#7c32ff] text-white rounded-lg px-6 py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-primary/20">
                    <Plus size={14} />
                    <span>ADD</span>
                </Button>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-end px-2">
                    <h3 className="text-sm font-bold text-slate-700 font-black italic uppercase tracking-tighter">Currency List</h3>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                            <input
                                type="text"
                                placeholder="SEARCH"
                                className="bg-white border border-slate-100 rounded-lg pl-10 pr-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary w-64 shadow-sm"
                            />
                        </div>
                        <div className="flex border border-[#7c32ff]/20 rounded-lg overflow-hidden shadow-sm shadow-primary/5">
                            {[Copy, FileText, FileSpreadsheet, FileBox, Printer, LayoutPanelLeft].map((Icon, i) => (
                                <button key={i} className="p-2 bg-white hover:bg-slate-50 border-r last:border-0 border-slate-100 transition-colors">
                                    <Icon size={14} className="text-[#7c32ff]/60" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden text-[#5c6d9a] font-black italic uppercase tracking-tighter">
                    <table className="w-full text-[10px]">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-400 border-b border-slate-100">
                                <th className="px-6 py-4 text-left w-12"><div className="flex items-center space-x-1"><ArrowUpDown size={10} /><span>SL</span></div></th>
                                <th className="px-6 py-4 text-left"><div className="flex items-center space-x-1"><ArrowUpDown size={10} /><span>Name</span></div></th>
                                <th className="px-6 py-4 text-left"><div className="flex items-center space-x-1"><ArrowUpDown size={10} /><span>Code</span></div></th>
                                <th className="px-6 py-4 text-left"><div className="flex items-center space-x-1"><ArrowUpDown size={10} /><span>Symbol</span></div></th>
                                <th className="px-6 py-4 text-left"><div className="flex items-center space-x-1"><ArrowUpDown size={10} /><span>Type</span></div></th>
                                <th className="px-6 py-4 text-left"><div className="flex items-center space-x-1"><ArrowUpDown size={10} /><span>Currency Position</span></div></th>
                                <th className="px-6 py-4 text-left"><div className="flex items-center space-x-1"><ArrowUpDown size={10} /><span>Space</span></div></th>
                                <th className="px-6 py-4 text-left"><div className="flex items-center space-x-1"><ArrowUpDown size={10} /><span>Decimal Digit</span></div></th>
                                <th className="px-6 py-4 text-left text-xs">.</th>
                                <th className="px-6 py-4 text-left text-xs">,</th>
                                <th className="px-6 py-4 text-left w-24"><div className="flex items-center space-x-1"><ArrowUpDown size={10} /><span>Action</span></div></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {list.map((item) => (
                                <tr key={item.sl} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-6 py-4 text-slate-300">{item.sl}</td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <div className="flex items-center space-x-2">
                                            <span>{item.name}</span>
                                            {item.active && <span className="bg-[#7c32ff] text-white px-2 py-0.5 rounded-full text-[8px] italic tracking-widest font-black">Active</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 font-bold tracking-widest">{item.code}</td>
                                    <td className="px-6 py-4 text-slate-600 font-serif">{item.symbol}</td>
                                    <td className="px-6 py-4 text-slate-400">{item.type}</td>
                                    <td className="px-6 py-4 text-slate-400">{item.pos}</td>
                                    <td className="px-6 py-4 text-slate-400">{item.space}</td>
                                    <td className="px-6 py-4 text-slate-600">{item.digit}</td>
                                    <td className="px-6 py-4 text-slate-400 font-black text-xs">.</td>
                                    <td className="px-6 py-4 text-slate-400 font-black text-xs">,</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2 bg-primary/5 text-primary rounded-lg px-3 py-1.5 w-max cursor-pointer hover:bg-primary/10 transition-colors font-black uppercase text-[9px] tracking-widest italic group-action">
                                            <span>SELECT</span>
                                            <ChevronDown size={12} className="group-action-hover:rotate-180 transition-transform duration-300" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-6 bg-slate-50/30 flex justify-between items-center text-[10px] font-black uppercase tracking-widest italic text-slate-400">
                        <span>Showing 1 to 10 of 120 entries</span>
                        <div className="flex items-center space-x-3">
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 bg-white hover:bg-slate-50"><ChevronLeft size={14} /></button>
                            <span className="w-8 h-8 flex items-center justify-center bg-[#7c32ff] text-white rounded-lg shadow-lg shadow-primary/20">1</span>
                            {[2, 3, 4, 5, '...', 12].map((p, i) => (
                                <button key={i} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 bg-white hover:bg-slate-50">{p}</button>
                            ))}
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 bg-white hover:bg-slate-50"><ChevronRight size={14} /></button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

// 9. Payment Method Settings
export const PaymentMethodSettings = () => {
    const gateways = ['Cash', 'Cheque', 'Bank', 'PayPal', 'Stripe', 'Paystack', 'Xendit', 'Wallet', 'Khalti', 'Raudhahpay', 'MercadoPago', 'PhonePe'];
    const [activeTab, setActiveTab] = React.useState('PAYPAL');

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen font-black italic uppercase tracking-tighter">
            <SectionHeader title="Payment Method Settings" section="General Settings" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Gateway Selector (Left) */}
                <Card className="lg:col-span-3 p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden self-start">
                    <div className="p-6 border-b border-slate-50">
                        <h2 className="text-sm font-bold text-slate-700">Select A Payment Gateway</h2>
                    </div>
                    <div className="p-4 space-y-1">
                        {gateways.map(g => (
                            <div key={g} className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-50/80 transition-all cursor-pointer group">
                                <div className="w-5 h-5 rounded-md border-2 border-primary/30 flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 transition-colors">
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-primary scale-100" />
                                </div>
                                <span className="text-[11px] font-bold text-slate-600 group-hover:text-primary transition-colors">{g}</span>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 text-center border-t border-slate-50">
                        <Button className="bg-[#7c32ff] text-white rounded-lg px-8 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95">UPDATE</Button>
                    </div>
                </Card>

                {/* Gateway Settings (Right) */}
                <Card className="lg:col-span-9 p-8 border-none shadow-sm bg-white rounded-2xl overflow-visible relative">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-sm font-bold text-slate-700">Gateway Setting</h2>
                        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                            {['PAYPAL', 'STRIPE', 'PAYSTACK', 'BANK', 'CHEQUE', 'XENDIT', 'KHALTI', 'RAUDHAHPAY', 'MERCADOPAGO', 'PHONEPE'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-[8px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === tab ? 'bg-white shadow-md text-primary scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-6">
                        <div>
                            <Label>Gateway Name</Label>
                            <input type="text" defaultValue="PayPal" className="w-full bg-slate-50/30 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                        </div>
                        <div>
                            <Label>Gateway Username</Label>
                            <input type="text" defaultValue="demo@paypal.com" className="w-full bg-slate-50/30 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                        </div>
                        <div>
                            <Label>Gateway Password</Label>
                            <input type="password" defaultValue="12334589" className="w-full bg-slate-50/30 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                        </div>
                        <div>
                            <Label>Gateway Signature</Label>
                            <input type="text" className="w-full bg-slate-50/30 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                        </div>
                        <div>
                            <Label>Gateway Client Id</Label>
                            <input type="text" defaultValue="AaCPtpouHZEXCa3v00bn6bYhYfFD0HIX-dlgYWIsb0fdoFqpVToATuUbT43VuUE6pAxgvSbTpKBqAF0x" className="w-full bg-slate-50/30 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                        </div>
                        <div>
                            <Label>Gateway Mode (sandbox or live)</Label>
                            <input type="text" className="w-full bg-slate-50/30 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                        </div>
                        <div>
                            <Label>Gateway Secret Key</Label>
                            <input type="text" defaultValue="EJ6q4h8w00amY0TWKtNba8o8suDg6PKUkhNKv-T6F4APDiq2el9OZf7DfpL5u0IeZJ__AMgeE0L2PtTEj" className="w-full bg-slate-50/30 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                        </div>
                        <div className="flex items-center space-x-3 pt-4">
                            <div className="w-5 h-5 rounded-full border-2 border-slate-200" />
                            <Label>Service Charge</Label>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-12 py-3 text-[11px] font-black uppercase italic tracking-wider flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                            <Plus size={16} className="rotate-45" />
                            <span>UPDATE</span>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

// 10. Base Setup
export const BaseSetup = () => {
    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen text-[#5c6d9a] font-black italic uppercase tracking-tighter">
            <SectionHeader title="Base Setup" section="General Settings" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="lg:col-span-4 p-8 border-none shadow-sm bg-white rounded-2xl self-start">
                    <h2 className="text-sm text-slate-700 mb-8 border-l-4 border-primary pl-4">Add Base Setup</h2>
                    <div className="space-y-6">
                        <div>
                            <Label required>BASE GROUP *</Label>
                            <div className="w-full bg-slate-50/50 border border-slate-100 rounded-lg px-4 py-2.5 text-[11px] font-bold text-slate-300 h-[46px] flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-colors">
                                <span>Base Group *</span>
                                <ChevronDown size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                            </div>
                        </div>
                        <div>
                            <Label required>NAME *</Label>
                            <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-lg px-4 py-2.5 text-[12px] font-medium text-slate-600 focus:border-primary outline-none h-[46px]" />
                        </div>
                        <div className="pt-4 flex justify-center">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                                <Plus size={16} />
                                <span>SAVE BASE SETUP</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                <div className="lg:col-span-8 space-y-6">
                    <div className="flex justify-between items-end px-2">
                        <h3 className="text-sm">Base Setup List</h3>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                <input placeholder="SEARCH" className="bg-white border border-slate-100 rounded-lg pl-10 pr-4 py-1.5 text-[9px] font-black uppercase tracking-widest outline-none focus:border-primary w-48 shadow-sm" />
                            </div>
                            <div className="flex border border-[#7c32ff]/20 rounded-lg overflow-hidden shadow-sm shadow-primary/5">
                                {[Copy, FileText, FileSpreadsheet, FileBox, Printer, LayoutPanelLeft].map((Icon, i) => (
                                    <button key={i} className="p-2 bg-white hover:bg-slate-50 border-r last:border-0 border-slate-100 transition-colors"><Icon size={12} className="text-[#7c32ff]/60" /></button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <table className="w-full text-[10px]">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 border-b border-slate-100">
                                    <th className="px-6 py-4 text-left"><div className="flex items-center space-x-1"><ArrowUpDown size={10} /><span>Base Type</span></div></th>
                                    <th className="px-6 py-4 text-left"><div className="flex items-center space-x-1"><ArrowUpDown size={10} /><span>Label</span></div></th>
                                    <th className="px-6 py-4 text-left w-24"><div className="flex items-center space-x-1"><ArrowUpDown size={10} /><span>Action</span></div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Gender Group */}
                                <tr className="bg-[#5c6d9a] text-white/90">
                                    <td className="px-6 py-3 font-bold tracking-widest">Gender</td>
                                    <td className="px-6 py-3"></td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="inline-flex border border-white/20 rounded-full p-1 cursor-pointer hover:bg-white/10 transition-colors">
                                            <ChevronDown size={14} className="rotate-180" />
                                        </div>
                                    </td>
                                </tr>
                                {['Male', 'Female', 'Others'].map((label, idx) => (
                                    <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-6 py-4"></td>
                                        <td className="px-6 py-4 text-slate-400 font-bold tracking-widest text-[#5c6d9a]/60">{label}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2 bg-primary/5 text-primary rounded-lg px-3 py-1.5 w-max cursor-pointer hover:bg-primary/10 transition-colors font-black uppercase text-[8px] tracking-widest italic group-action">
                                                <span>SELECT</span>
                                                <ChevronDown size={10} className="group-action-hover:rotate-180 transition-transform duration-300" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {/* Religion Group */}
                                <tr className="bg-[#5c6d9a] text-white/90">
                                    <td className="px-6 py-3 font-bold tracking-widest">Religion</td>
                                    <td className="px-6 py-3"></td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="inline-flex border border-white/20 rounded-full p-1 cursor-pointer hover:bg-white/10 transition-colors text-white/60">
                                            <ChevronDown size={14} />
                                        </div>
                                    </td>
                                </tr>
                                {/* Blood Group */}
                                <tr className="bg-[#5c6d9a] text-white/90 border-t border-white/10">
                                    <td className="px-6 py-3 font-bold tracking-widest text-white/60">Blood Group</td>
                                    <td className="px-6 py-3"></td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="inline-flex border border-white/20 rounded-full p-1 cursor-pointer hover:bg-white/10 transition-colors text-white/60">
                                            <ChevronDown size={14} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="p-6 bg-slate-50/30 flex justify-between items-center text-[10px] text-slate-400">
                            <span>Showing 1 to 1 of 1 entries</span>
                            <div className="flex items-center space-x-3">
                                <ChevronLeft size={12} className="text-slate-200" />
                                <span className="w-7 h-7 flex items-center justify-center bg-[#7c32ff] text-white rounded-lg shadow-md shadow-primary/20">1</span>
                                <ChevronRight size={12} className="text-slate-200" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// 11. SMS Settings
export const SMSSettings = () => {
    const [activeTab, setActiveTab] = useState('SELECT A SMS SERVICE');
    const navigate = useNavigate();

    const tabs = ['SELECT A SMS SERVICE', 'TWILIO', 'MSG91', 'TEXTLOCAL', 'AFRICATALKING', 'MOBILE SMS', 'CUSTOM SMS'];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen text-[#5c6d9a] font-black italic uppercase tracking-tighter">
            <SectionHeader title="Sms Settings" section="System Settings" />

            <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-visible relative min-h-[400px]">
                {/* Tabs */}
                <div className="flex bg-[#e2e8f0]/40 p-0 border-b border-slate-100 rounded-t-2xl overflow-hidden">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-5 text-[10px] font-black uppercase tracking-widest transition-all relative border-r border-[#e2e8f0]/30 last:border-r-0 ${activeTab === tab
                                ? 'bg-white text-primary shadow-[0_-4px_10px_rgba(124,50,255,0.05)] z-10'
                                : 'text-slate-400 hover:bg-slate-50/50'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute top-0 left-0 w-full h-[3px] bg-primary rounded-full" />}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-12">
                    {activeTab === 'SELECT A SMS SERVICE' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                            <div className="lg:col-span-5">
                                <Label required>SELECT A SMS SERVICE *</Label>
                                <div className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-400 h-[52px] flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all shadow-sm">
                                    <span>Select a SMS Service</span>
                                    <ChevronDown size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                                </div>
                            </div>
                            <div className="lg:col-span-5">
                                <Label>RECIVER NUMBER</Label>
                                <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] shadow-sm" />
                            </div>
                            <div className="lg:col-span-2">
                                <Button className="w-full bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl h-[52px] text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95">
                                    SEND TEST SMS
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'TWILIO' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            <div className="lg:col-span-6 space-y-6">
                                <div>
                                    <Label required>TWILIO ACCOUNT SID *</Label>
                                    <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] shadow-sm" />
                                </div>
                                <div>
                                    <Label required>AUTHENTICATION TOKEN *</Label>
                                    <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] shadow-sm" />
                                </div>
                                <div>
                                    <Label required>REGISTERED PHONE NUMBER *</Label>
                                    <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] shadow-sm" />
                                </div>
                            </div>
                            <div className="lg:col-span-6 flex justify-center items-center h-full pt-8">
                                <div className="flex flex-col items-center space-y-2 opacity-80 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                                            <div className="grid grid-cols-2 gap-0.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                            </div>
                                        </div>
                                        <span className="text-3xl font-bold text-[#f22f46] tracking-tighter italic capitalize normal-case">twilio</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'MSG91' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            <div className="lg:col-span-6 space-y-6">
                                <div>
                                    <Label required>AUTHENTICATION KEY SID *</Label>
                                    <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] shadow-sm" />
                                </div>
                                <div>
                                    <Label required>SENDER ID *</Label>
                                    <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] shadow-sm" />
                                </div>
                                <div>
                                    <Label required>ROUTE *</Label>
                                    <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] shadow-sm" />
                                </div>
                                <div>
                                    <Label required>COUNTRY CODE *</Label>
                                    <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] shadow-sm" />
                                </div>
                            </div>
                            <div className="lg:col-span-6 flex justify-center items-center h-full pt-8">
                                <div className="border-2 border-slate-100 p-8 rounded-2xl flex flex-col items-center space-y-4 shadow-xl shadow-slate-200/50 hover:border-primary/20 transition-all duration-500 hover:scale-105">
                                    <div className="w-24 h-24 bg-[#0071C1] rounded-lg flex flex-col items-center justify-center p-2 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 rotate-45 translate-x-4 -translate-y-4" />
                                        <div className="bg-white rounded-sm w-full h-8 flex items-center px-1 mb-1">
                                            <div className="w-4 h-4 text-[#0071C1]"><Mail size={16} /></div>
                                            <span className="text-[12px] font-black italic ml-1 mb-0.5 text-[#0071C1]">MSG91</span>
                                        </div>
                                        <div className="text-[10px] text-white/90 font-black tracking-widest mt-1">SMS PARTNER</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'MOBILE SMS' && (
                        <div className="flex flex-col items-center justify-center py-20 space-y-6">
                            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center border-4 border-white shadow-inner">
                                <Smartphone size={32} className="text-slate-200 animate-pulse" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-slate-300 text-sm tracking-widest font-black italic">No Device Connected !</h3>
                                <p className="text-[10px] text-slate-200 italic lowercase font-medium italic">Please connect your android device to use mobile sms gateway</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'CUSTOM SMS' && (
                        <div className="space-y-6">
                            <div className="flex justify-end">
                                <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all active:scale-95 h-[46px]">
                                    <Plus size={16} />
                                    <span>ADD NEW GATEWAY</span>
                                </Button>
                            </div>

                            <Card className="p-0 border border-slate-100 shadow-sm bg-white rounded-2xl overflow-hidden">
                                <table className="w-full text-[10px]">
                                    <thead>
                                        <tr className="bg-slate-50/50 text-slate-400 border-b border-slate-100">
                                            <th className="px-8 py-5 text-left font-black uppercase tracking-widest">STATUS</th>
                                            <th className="px-8 py-5 text-center font-black uppercase tracking-widest">GATEWAY NAME</th>
                                            <th className="px-8 py-5 text-right font-black uppercase tracking-widest">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-slate-50 last:border-0">
                                            <td colSpan="3" className="px-8 py-12 text-center text-slate-200 italic font-black uppercase tracking-tighter opacity-50">
                                                No Custom Gateways Found
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Card>
                        </div>
                    )}

                    {(activeTab === 'TWILIO' || activeTab === 'MSG91' || activeTab === 'TEXTLOCAL' || activeTab === 'AFRICATALKING') && (
                        <div className="mt-12 flex justify-center">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl px-12 py-3.5 text-[11px] font-black uppercase italic tracking-widest flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all active:scale-95 group">
                                <Check size={16} className="group-hover:scale-110 transition-transform" />
                                <span>UPDATE</span>
                            </Button>
                        </div>
                    )}
                </div>
            </Card>

            {/* Shopping cart fab from screenshot */}
            <div className="fixed bottom-10 right-10 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/40 cursor-pointer hover:scale-110 active:scale-95 transition-all z-50">
                <ShoppingCart size={20} />
            </div>
        </div>
    );
};

// 12. Weekend
export const Weekend = () => {
    const days = [
        { name: 'Saturday', weekend: false },
        { name: 'Sunday', weekend: false },
        { name: 'Monday', weekend: false },
        { name: 'Tuesday', weekend: false },
        { name: 'Wednesday', weekend: false },
        { name: 'Thursday', weekend: false },
        { name: 'Friday', weekend: true },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen text-[#5c6d9a] font-black italic uppercase tracking-tighter">
            <SectionHeader title="Weekend" section="System Settings" />

            <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                <div className="p-8 border-b border-slate-50">
                    <h2 className="text-sm font-black text-slate-700 tracking-widest italic">Day list</h2>
                </div>
                <table className="w-full text-[10px]">
                    <thead>
                        <tr className="bg-slate-50/50 text-slate-400 border-b border-slate-100 uppercase tracking-widest">
                            <th className="px-8 py-5 text-left font-black">NAME</th>
                            <th className="px-8 py-5 text-center font-black">WEEKEND</th>
                            <th className="px-8 py-5 text-right font-black">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {days.map((day, idx) => (
                            <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors group">
                                <td className="px-8 py-5 text-slate-400 font-bold tracking-widest">{day.name}</td>
                                <td className="px-8 py-5 text-center">
                                    {day.weekend ? (
                                        <div className="inline-flex bg-[#7c32ff] text-white px-4 py-1 rounded-md text-[8px] font-black uppercase tracking-widest shadow-sm shadow-primary/20">YES</div>
                                    ) : (
                                        <span className="text-slate-300 font-black">No</span>
                                    )}
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className={`inline-flex w-10 h-5 rounded-full p-1 cursor-pointer transition-all ${day.weekend ? 'bg-primary' : 'bg-slate-100'}`}>
                                        <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-all ${day.weekend ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            {/* Shopping cart fab */}
            <div className="fixed bottom-10 right-10 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/40 cursor-pointer hover:scale-110 active:scale-95 transition-all z-50">
                <ShoppingCart size={20} />
            </div>
        </div>
    );
};

// 13. Language Settings
export const LanguageSettings = () => {
    const languages = [
        { sl: 1, name: 'English', native: 'English', code: 'en', status: 'Active', isDefault: true },
        { sl: 2, name: 'Bengali', native: 'বাংলা', code: 'bn', status: 'In Active', isDefault: false },
        { sl: 3, name: 'Spanish', native: 'Español', code: 'es', status: 'In Active', isDefault: false },
        { sl: 4, name: 'French', native: 'Français', code: 'fr', status: 'In Active', isDefault: false },
        { sl: 5, name: 'Arabic', native: 'العربية', code: 'ar', status: 'In Active', isDefault: false },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen text-[#5c6d9a] font-black italic uppercase tracking-tighter">
            <SectionHeader title="Language Settings" section="System Settings" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Add Language (Left) */}
                <Card className="lg:col-span-3 p-8 border-none shadow-sm bg-white rounded-2xl self-start">
                    <h2 className="text-sm text-slate-700 mb-8 border-l-4 border-primary pl-4 tracking-widest font-black italic">Add Language</h2>
                    <div className="space-y-6">
                        <div>
                            <Label required>Select Language *</Label>
                            <div className="w-full bg-slate-50/50 border border-slate-100 rounded-lg px-4 py-2.5 text-[11px] font-bold text-slate-300 h-[46px] flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-colors">
                                <span>Select Language *</span>
                                <ChevronDown size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                            </div>
                        </div>
                        <div className="pt-4 flex justify-center">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                                <Check size={16} />
                                <span>SAVE LANGUAGE</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Language List (Right) */}
                <div className="lg:col-span-9 space-y-6">
                    <div className="flex justify-between items-end px-2">
                        <h3 className="text-sm font-black tracking-widest italic">Language List</h3>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                <input placeholder="SEARCH" className="bg-white border border-slate-100 rounded-lg pl-10 pr-4 py-1.5 text-[9px] font-black uppercase tracking-widest outline-none focus:border-primary w-48 shadow-sm" />
                            </div>
                            <div className="flex border border-[#7c32ff]/20 rounded-lg overflow-hidden shadow-sm shadow-primary/5">
                                {[Copy, FileText, FileSpreadsheet, FileBox, Printer, LayoutPanelLeft].map((Icon, i) => (
                                    <button key={i} className="p-2 bg-white hover:bg-slate-50 border-r last:border-0 border-slate-100 transition-colors"><Icon size={12} className="text-[#7c32ff]/60" /></button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <table className="w-full text-[10px]">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 border-b border-slate-100">
                                    <th className="px-6 py-4 text-left font-black uppercase tracking-widest">SL</th>
                                    <th className="px-6 py-4 text-left font-black uppercase tracking-widest">LANGUAGE</th>
                                    <th className="px-6 py-4 text-left font-black uppercase tracking-widest">NATIVE</th>
                                    <th className="px-6 py-4 text-left font-black uppercase tracking-widest">UNIVERSAL</th>
                                    <th className="px-6 py-4 text-left font-black uppercase tracking-widest">STATUS</th>
                                    <th className="px-6 py-4 text-left font-black uppercase tracking-widest">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {languages.map((lang, idx) => (
                                    <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-6 py-4 text-slate-400 font-bold">{lang.sl}</td>
                                        <td className="px-6 py-4 text-slate-400 font-bold">{lang.name}</td>
                                        <td className="px-6 py-4 text-slate-400 font-bold">{lang.native}</td>
                                        <td className="px-6 py-4 text-slate-400 font-bold">{lang.code}</td>
                                        <td className="px-6 py-4">
                                            <span className={`font-black italic ${lang.status === 'Active' ? 'text-green-500/70' : 'text-slate-300'}`}>{lang.status}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-2">
                                                {lang.isDefault ? (
                                                    <div className="bg-[#7c32ff] text-white px-3 py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center space-x-1 shadow-md shadow-primary/20">
                                                        <Check size={10} />
                                                        <span>DEFAULT</span>
                                                    </div>
                                                ) : (
                                                    <div className="border border-primary text-primary px-3 py-1.5 rounded-md text-[8px) font-black uppercase tracking-widest flex items-center space-x-1 hover:bg-primary/5 transition-all cursor-pointer">
                                                        <Check size={10} />
                                                        <span>MAKE DEFAULT</span>
                                                    </div>
                                                )}
                                                <div className="border border-primary text-primary px-3 py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center space-x-1 hover:bg-primary/5 transition-all cursor-pointer">
                                                    <Settings size={10} />
                                                    <span>SETUP</span>
                                                </div>
                                                <div className="border border-primary text-primary px-3 py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center space-x-1 hover:bg-primary/5 transition-all cursor-pointer">
                                                    <Download size={10} />
                                                    <span>EXPORT</span>
                                                </div>
                                                <div className="border border-primary text-primary px-3 py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center space-x-1 hover:bg-primary/5 transition-all cursor-pointer">
                                                    <Upload size={10} />
                                                    <span>IMPORT</span>
                                                </div>
                                                {!lang.isDefault && (
                                                    <div className="border border-primary text-primary px-3 py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center space-x-1 hover:bg-primary/5 transition-all cursor-pointer">
                                                        <X size={10} />
                                                        <span>REMOVE</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-6 bg-slate-50/30 flex justify-between items-center text-[10px] text-slate-400">
                            <span>Showing 1 to 5 of 5 entries</span>
                            <div className="flex items-center space-x-3">
                                <ChevronLeft size={12} className="text-slate-300 cursor-pointer" />
                                <span className="w-7 h-7 flex items-center justify-center bg-[#7c32ff] text-white rounded-lg shadow-md shadow-primary/20">1</span>
                                <ChevronRight size={12} className="text-slate-300 cursor-pointer" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// 14. Backup
export const Backup = () => {
    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen text-[#5c6d9a] font-black italic uppercase tracking-tighter">
            <SectionHeader title="Backup" section="System Settings" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Upload (Left) */}
                <Card className="lg:col-span-4 p-8 border-none shadow-sm bg-white rounded-2xl self-start">
                    <h2 className="text-sm text-slate-700 mb-8 border-l-4 border-primary pl-4 tracking-widest font-black italic">Upload From Local Directory</h2>
                    <div className="space-y-6">
                        <div className="relative group">
                            <input type="text" placeholder="Attach File*" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-400 h-[52px] outline-none" readOnly />
                            <button className="absolute right-2 top-2 bottom-2 bg-[#7c32ff] text-white px-6 rounded-lg text-[9px] font-black tracking-widest active:scale-95 transition-all">BROWSE</button>
                        </div>
                        <div className="pt-4 flex justify-center">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-8 py-3.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                                <Check size={16} />
                                <span>UPDATE FILE</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Backup List (Right) */}
                <Card className="lg:col-span-8 p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden self-start">
                    <div className="p-8 flex justify-between items-center border-b border-slate-50">
                        <h2 className="text-sm font-black tracking-widest italic text-slate-700">Database Backup List</h2>
                        <div className="flex space-x-3">
                            <Button className="bg-[#7c32ff] text-white px-6 py-2.5 rounded-lg text-[9px] font-black tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all">UPLOAD FILE BACKUP</Button>
                            <Button className="bg-[#7c32ff] text-white px-6 py-2.5 rounded-lg text-[9px] font-black tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all">DATABASE BACKUP</Button>
                        </div>
                    </div>
                    <table className="w-full text-[10px]">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-400 border-b border-slate-100 uppercase tracking-widest text-[9px]">
                                <th className="px-8 py-5 text-left font-black">SIZE</th>
                                <th className="px-8 py-5 text-center font-black">CREATED DATE TIME</th>
                                <th className="px-8 py-5 text-center font-black">BACKUP FILES</th>
                                <th className="px-8 py-5 text-center font-black">FILE TYPE</th>
                                <th className="px-8 py-5 text-right font-black">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors">
                                <td colSpan="5" className="px-8 py-16 text-center text-slate-200 italic font-black uppercase tracking-widest opacity-40">
                                    No Backups Found
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
};

// 15. Header Option (Dashboard Settings)
export const HeaderOption = () => {
    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen text-[#5c6d9a] font-black italic uppercase tracking-tighter">
            <SectionHeader title="Header Option" section="System Settings" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Website Settings (Left) */}
                <Card className="lg:col-span-6 p-8 border-none shadow-sm bg-white rounded-2xl flex flex-col justify-between min-h-[220px]">
                    <div className="flex justify-between items-center mb-10">
                        <span className="text-[12px] font-bold tracking-widest text-slate-400">Website</span>
                        <div className="inline-flex w-10 h-5 rounded-full p-1 cursor-pointer transition-all bg-primary">
                            <div className="w-3 h-3 rounded-full bg-white shadow-sm transition-all translate-x-5" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Label>Custom URL</Label>
                        <div className="flex gap-4">
                            <input type="text" defaultValue="https://infixedu.ischooll.com/home" className="flex-1 bg-white border border-slate-100 rounded-xl px-5 py-3 text-[11px] font-medium text-slate-400 h-[52px] outline-none lowercase focus:border-primary transition-all" />
                            <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95 h-[52px]">
                                UPDATE
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Dashboard Options (Right) */}
                <Card className="lg:col-span-6 p-8 border-none shadow-sm bg-white rounded-2xl flex flex-col justify-center space-y-12 min-h-[220px]">
                    <div className="flex justify-between items-center px-12">
                        <span className="text-[12px] font-bold tracking-widest text-slate-400">Dashboard</span>
                        <div className="inline-flex w-10 h-5 rounded-full p-1 cursor-pointer transition-all bg-primary">
                            <div className="w-3 h-3 rounded-full bg-white shadow-sm transition-all translate-x-5" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-12">
                        <span className="text-[12px] font-bold tracking-widest text-slate-400">Language</span>
                        <div className="inline-flex w-10 h-5 rounded-full p-1 cursor-pointer transition-all bg-primary">
                            <div className="w-3 h-3 rounded-full bg-white shadow-sm transition-all translate-x-5" />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

// 16. Language (Detailed Management)
export const LanguageManagement = () => {
    const languages = [
        { sl: 1, name: 'Afrikaans', code: 'af', native: 'Afrikaans', alignment: 'LTR' },
        { sl: 2, name: 'Amharic', code: 'am', native: 'አማርኛ', alignment: 'LTR' },
        { sl: 3, name: 'Arabic', code: 'ar', native: 'العربية', alignment: 'RTL' },
        { sl: 4, name: 'Aymara', code: 'ay', native: 'Aymar', alignment: 'LTR' },
        { sl: 5, name: 'Azerbaijani', code: 'az', native: 'Azərbaycanca / آذربایجان', alignment: 'LTR' },
        { sl: 6, name: 'Belarusian', code: 'be', native: 'Беларуская', alignment: 'LTR' },
        { sl: 7, name: 'Bulgarian', code: 'bg', native: 'Български', alignment: 'LTR' },
        { sl: 8, name: 'Bislama', code: 'bi', native: 'Bislama', alignment: 'LTR' },
        { sl: 9, name: 'Bengali', code: 'bn', native: 'বাংলা', alignment: 'LTR' },
        { sl: 10, name: 'Bosnian', code: 'bs', native: 'Bosanski', alignment: 'LTR' },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen text-[#5c6d9a] font-black italic uppercase tracking-tighter">
            <SectionHeader title="Language" section="System Settings" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Add Language (Left) */}
                <Card className="lg:col-span-3 p-8 border-none shadow-sm bg-white rounded-2xl self-start">
                    <h2 className="text-sm text-slate-700 mb-8 border-l-4 border-primary pl-4 tracking-widest font-black italic">Add Language</h2>
                    <div className="space-y-6">
                        <div>
                            <Label required>NAME *</Label>
                            <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2 text-[11px] font-bold text-slate-600 h-[46px] outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                            <Label required>CODE *</Label>
                            <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2 text-[11px] font-bold text-slate-600 h-[46px] outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                            <Label required>NATIVE *</Label>
                            <input type="text" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2 text-[11px] font-bold text-slate-600 h-[46px] outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                            <Label required>TEXT ALIGNMENT *</Label>
                            <div className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-2 text-[11px] font-bold text-slate-400 h-[46px] flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-colors">
                                <span>LTR</span>
                                <ChevronDown size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                            </div>
                        </div>
                        <div className="pt-4 flex justify-center">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                                <Check size={16} />
                                <span>SAVE LANGUAGE</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Language List (Right) */}
                <div className="lg:col-span-9 space-y-6">
                    <div className="flex justify-between items-end px-2">
                        <h3 className="text-sm font-black tracking-widest italic text-slate-700">Language List</h3>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                <input placeholder="SEARCH" className="bg-white border border-slate-100 rounded-lg pl-10 pr-4 py-1.5 text-[9px] font-black uppercase tracking-widest outline-none focus:border-primary w-48 shadow-sm" />
                            </div>
                            <div className="flex border border-[#7c32ff]/20 rounded-lg overflow-hidden shadow-sm shadow-primary/5">
                                {[Copy, FileText, FileSpreadsheet, FileBox, Printer, LayoutPanelLeft].map((Icon, i) => (
                                    <button key={i} className="p-2 bg-white hover:bg-slate-50 border-r last:border-0 border-slate-100 transition-colors"><Icon size={12} className="text-[#7c32ff]/60" /></button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <table className="w-full text-[10px]">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 border-b border-slate-100">
                                    <th className="px-6 py-5 text-left font-black uppercase tracking-widest">SL</th>
                                    <th className="px-6 py-5 text-left font-black uppercase tracking-widest">NAME</th>
                                    <th className="px-6 py-5 text-left font-black uppercase tracking-widest">CODE</th>
                                    <th className="px-6 py-5 text-left font-black uppercase tracking-widest">NATIVE</th>
                                    <th className="px-6 py-5 text-left font-black uppercase tracking-widest">TEXT ALIGNMENT</th>
                                    <th className="px-6 py-5 text-right font-black uppercase tracking-widest">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {languages.map((lang, idx) => (
                                    <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-6 py-5 text-slate-400 font-bold">{lang.sl}</td>
                                        <td className="px-6 py-5 text-slate-400 font-bold">{lang.name}</td>
                                        <td className="px-6 py-5 text-slate-400 font-bold">{lang.code}</td>
                                        <td className="px-6 py-5 text-slate-400 font-bold">{lang.native}</td>
                                        <td className="px-6 py-5 text-slate-400 font-bold">{lang.alignment}</td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="inline-flex items-center space-x-2 border border-primary text-primary px-4 py-1.5 rounded-lg text-[8px] font-black tracking-widest hover:bg-primary/5 transition-all cursor-pointer group-hover:shadow-sm">
                                                <span>SELECT</span>
                                                <ChevronDown size={12} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-6 bg-slate-50/30 flex justify-between items-center text-[10px] text-slate-400">
                            <span className="font-bold">Showing 1 to 10 of 114 entries</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-300 hover:text-primary transition-colors cursor-pointer"><ChevronLeft size={14} /></div>
                                <div className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg shadow-md shadow-primary/20">1</div>
                                <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors cursor-pointer">2</div>
                                <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors cursor-pointer">3</div>
                                <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors cursor-pointer">4</div>
                                <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors cursor-pointer">5</div>
                                <div className="px-2 font-bold opacity-30">...</div>
                                <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors cursor-pointer">12</div>
                                <div className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-300 hover:text-primary transition-colors cursor-pointer"><ChevronLeft size={14} className="rotate-180" /></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// 17. Notification Setting
export const NotificationSetting = () => {
    const notificationTypes = [
        { sl: 1, type: "Registration Support", email: true, sms: false, app: true },
        { sl: 2, type: "Exam Marks Support", email: true, sms: true, app: false },
        { sl: 3, type: "Attendance Support", email: false, sms: true, app: true },
        { sl: 4, type: "Online Ticket Support", email: true, sms: false, app: true },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Notification Setting" section="General Settings" />

            <Card className="p-0 border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden mt-8">
                <div className="p-10 pb-4">
                    <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Notification Matrix</h2>
                </div>

                <div className="p-2">
                    <table className="w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 uppercase italic">SL</th>
                                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 uppercase italic">Notification Type</th>
                                <th className="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 uppercase italic">Email</th>
                                <th className="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 uppercase italic">SMS</th>
                                <th className="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 uppercase italic">App</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notificationTypes.map((notif, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50/50 transition-all">
                                    <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{notif.sl}</td>
                                    <td className="px-8 py-6 text-[12px] font-black text-slate-700 italic tracking-tight uppercase tracking-tight">{notif.type}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-center">
                                            <RadioToggle checked={notif.email} />
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-center">
                                            <RadioToggle checked={notif.sms} />
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-center">
                                            <RadioToggle checked={notif.app} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

// 18. Email Settings
export const EmailSettings = () => {
    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Email Settings" section="General Settings" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <Card className="p-10 border-none shadow-sm bg-white rounded-2xl">
                    <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12">SMTP Configuration</h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label required>MAIL HOST</Label>
                                <div className="relative">
                                    <input type="text" placeholder="smtp.gmail.com" className="w-full bg-white border border-slate-200 rounded-lg pl-11 pr-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                                    <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label required>MAIL PORT</Label>
                                <div className="relative">
                                    <input type="text" placeholder="587" className="w-full bg-white border border-slate-200 rounded-lg pl-11 pr-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                                    <LayoutPanelLeft size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label required>MAIL USERNAME</Label>
                            <div className="relative">
                                <input type="text" placeholder="your-email@gmail.com" className="w-full bg-white border border-slate-200 rounded-lg pl-11 pr-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label required>MAIL PASSWORD</Label>
                            <div className="relative">
                                <input type="password" placeholder="••••••••••••" className="w-full bg-white border border-slate-200 rounded-lg pl-11 pr-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label required>ENCRYPTION</Label>
                                <div className="relative">
                                    <select className="w-full bg-white border border-slate-200 rounded-lg pl-11 pr-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px] appearance-none">
                                        <option>TLS</option>
                                        <option>SSL</option>
                                    </select>
                                    <ShieldCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button className="w-full bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl py-4 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all">
                                UPDATE SMTP SETTINGS
                            </Button>
                        </div>
                    </div>
                </Card>

                <Card className="p-10 border-none shadow-sm bg-white rounded-2xl">
                    <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12">Send Test Email</h2>
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label required>TEST EMAIL ADDRESS</Label>
                            <div className="relative">
                                <input type="text" placeholder="receiver@example.com" className="w-full bg-white border border-slate-200 rounded-lg pl-11 pr-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                            </div>
                        </div>
                        <div className="pt-6">
                            <Button className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-xl py-4 text-[11px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                                SEND TEST EMAIL
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

// 19. Api Permission
export const ApiPermission = () => {
    const endpoints = [
        { sl: 1, name: "Student List API", endpoint: "/api/student-list", status: true },
        { sl: 2, name: "Attendance Update API", endpoint: "/api/attendance-update", status: false },
        { sl: 3, name: "Fees Payment API", endpoint: "/api/fees-payment", status: true },
        { sl: 4, name: "Exam Results API", endpoint: "/api/exam-results", status: true },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Api Permission" section="General Settings" />

            <Card className="p-0 border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden mt-8">
                <div className="p-10 pb-4">
                    <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Endpoint Access Control</h2>
                </div>

                <div className="p-2">
                    <table className="w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic">SL</th>
                                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic">API Name</th>
                                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic">Endpoint</th>
                                <th className="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic">Enable/Disable</th>
                            </tr>
                        </thead>
                        <tbody>
                            {endpoints.map((api, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50/50 transition-all">
                                    <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{api.sl}</td>
                                    <td className="px-8 py-6 text-[12px] font-black text-slate-700 italic tracking-tight uppercase tracking-tight">{api.name}</td>
                                    <td className="px-8 py-6 text-[11px] font-bold text-primary italic lowercase font-mono bg-slate-50/50 rounded-lg m-2 px-3 py-1 inline-block">{api.endpoint}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-center">
                                            <RadioToggle checked={api.status} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

// 20. Cron Job
export const CronJob = () => {
    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Cron Job" section="General Settings" />

            <div className="grid grid-cols-1 gap-8 mt-8">
                <Card className="p-10 border-none shadow-sm bg-white rounded-[2.5rem]">
                    <div className="flex items-center space-x-6 mb-12">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Activity className="text-primary" size={32} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-slate-700 italic uppercase">Cron Job Status</h2>
                            <p className="text-[11px] font-bold text-slate-400 italic uppercase tracking-widest mt-1">Automated Task Runner Configuration</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner-sm">
                            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 flex items-center">
                                <Terminal size={12} className="mr-2" /> CRON URL
                            </div>
                            <div className="text-[12px] font-black text-slate-700 font-mono break-all line-clamp-1 italic uppercase tracking-tight">https://school-erp.com/api/cron-runner</div>
                            <Button className="mt-6 text-[9px] font-black uppercase tracking-widest text-primary border border-primary/20 bg-white hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition-all shadow-sm">
                                COPY URL
                            </Button>
                        </div>

                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner-sm">
                            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 flex items-center">
                                <Check size={12} className="mr-2" /> LAST RUN
                            </div>
                            <div className="text-[12px] font-black text-slate-700 italic uppercase tracking-tight line-clamp-1">2 hours ago (10:30 AM)</div>
                            <div className="mt-6 flex items-center text-[9px] font-black uppercase tracking-[0.1em] text-emerald-500">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
                                RUNNING SMOOTHLY
                            </div>
                        </div>

                        <div className="p-8 bg-[#7c32ff]/[0.03] rounded-3xl border border-[#7c32ff]/10 shadow-inner-sm">
                            <div className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] mb-4 flex items-center">
                                <ArrowUpDown size={12} className="mr-2" /> ACTIONS
                            </div>
                            <Button className="w-full bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl py-4 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all">
                                RUN MANUALLY NOW
                            </Button>
                        </div>
                    </div>

                    <div className="mt-12 p-8 bg-amber-50 rounded-3xl border border-amber-100">
                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-amber-200 rounded-lg mt-1">
                                <Activity size={16} className="text-amber-700" />
                            </div>
                            <div>
                                <h4 className="text-[12px] font-black text-amber-900 uppercase italic tracking-tight mb-2">Important Note</h4>
                                <p className="text-[11px] font-medium text-amber-700 leading-relaxed italic">
                                    Cron jobs are essential for automated tasks like generating invoices, sending notifications, and weekly backups.
                                    Please ensure your server's crontab is configured to hit the Cron URL every hour.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
