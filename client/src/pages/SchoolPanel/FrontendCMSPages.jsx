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
    Laptop,
    Tablet,
    Smartphone,
    Monitor,
    Image as ImageIcon,
    Star,
    MessageCircle,
    BookOpen,
    Phone,
    User,
    Trash2,
    Clock,
    DollarSign,
    MapPin,
    Hash
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
    <div
        className="flex items-center space-x-3 cursor-pointer group"
        onClick={onChange}
    >
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${checked ? 'border-[#7c32ff] bg-[#7c32ff]' : 'border-slate-200 bg-white group-hover:border-slate-300'
            }`}>
            {checked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
        <span className={`text-[11px] font-bold tracking-tight transition-colors ${checked ? 'text-slate-700' : 'text-slate-400 group-hover:text-slate-500'
            }`}>{label}</span>
    </div>
);

// 1. Manage Theme (Theme Manager)
export const ManageTheme = () => {
    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Theme Manager" section="Frontend CMS" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Active Theme */}
                <Card className="p-0 border-none shadow-snow-lg bg-[#2d3e50] rounded-[2rem] overflow-hidden group">
                    <div className="p-12 pb-8">
                        <div className="aspect-[16/10] bg-white rounded-xl overflow-hidden shadow-2xl relative border-4 border-[#1e293b]">
                            {/* Browser Header Mockup */}
                            <div className="h-6 bg-slate-100 flex items-center px-3 space-x-1.5">
                                <div className="w-2 h-2 rounded-full bg-rose-400" />
                                <div className="w-2 h-2 rounded-full bg-amber-400" />
                                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            </div>
                            {/* Interior preview based on screenshot */}
                            <div className="p-4 space-y-4">
                                <div className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg border border-slate-50">
                                    <div className="w-16 h-4 bg-primary/10 rounded italic font-black text-[8px] flex items-center justify-center">INFIX</div>
                                    <div className="flex space-x-3">
                                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-8 h-2 bg-slate-100 rounded" />)}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="w-full h-32 bg-slate-50 rounded-lg flex items-center justify-center">
                                            <div className="w-12 h-12 bg-slate-100 rounded-full" />
                                        </div>
                                        <div className="h-3 w-3/4 bg-slate-100 rounded" />
                                        <div className="h-3 w-1/2 bg-slate-100 rounded" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-8 w-full bg-blue-500 rounded flex items-center px-2 text-[6px] text-white font-bold">Notice Board</div>
                                        <div className="space-y-2">
                                            <div className="h-4 w-full bg-slate-50 rounded-sm" />
                                            <div className="h-4 w-full bg-slate-50 rounded-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-12 py-8 bg-[#3c4b5f] flex justify-between items-center">
                        <span className="text-white text-lg font-black italic tracking-tighter uppercase">Active: Edulia</span>
                    </div>
                </Card>

                {/* Default Theme */}
                <Card className="p-0 border-none shadow-snow-lg bg-white rounded-[2rem] overflow-hidden border border-slate-100">
                    <div className="p-12 pb-8">
                        <div className="aspect-[16/10] bg-white rounded-xl overflow-hidden shadow-2xl relative border-4 border-slate-100">
                            {/* Interior preview based on screenshot */}
                            <div className="p-4 space-y-6">
                                <div className="flex justify-between items-center">
                                    <div className="w-16 h-4 bg-primary/20 rounded font-black italic text-[8px] flex items-center justify-center">INFIX</div>
                                    <div className="flex space-x-3">
                                        {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-2 bg-slate-50 rounded" />)}
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
                                    <div className="h-2 w-24 bg-primary/10 rounded" />
                                    <div className="text-4xl font-black italic tracking-tighter text-slate-800">INFIX</div>
                                    <div className="w-48 h-12 bg-slate-50 rounded-lg" />
                                    <div className="w-24 h-8 bg-[#7c32ff] rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-12 py-8 bg-slate-50 flex justify-between items-center">
                        <span className="text-primary text-sm font-black italic tracking-widest uppercase">Default</span>
                        <Button className="bg-[#506683] hover:bg-[#3c4b5f] text-white rounded-lg px-8 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-black/10 transition-all active:scale-95">
                            ACTIVE
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Float cart button from screenshot */}
            <div className="fixed right-6 bottom-32 w-12 h-12 bg-[#7c32ff] rounded-lg shadow-2xl shadow-primary/40 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-all z-50">
                <FileText size={20} />
            </div>
        </div>
    );
};

// 2. Home Slider
export const HomeSlider = () => {
    const sliders = [
        { sl: 1, image: "https://via.placeholder.com/80x45", link: "home" },
        { sl: 2, image: "https://via.placeholder.com/80x45", link: "home" },
        { sl: 3, image: "https://via.placeholder.com/80x45", link: "home" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Home Slider" section="Frontend CMS" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-3">
                    <Card className="p-8 border-none shadow-sm bg-white rounded-2xl">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-10">Home Slider</h2>
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <Label required>IMAGE</Label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Image *"
                                        className="flex-1 bg-white border border-slate-200 border-r-0 rounded-l-lg px-4 py-3 text-[12px] font-medium text-slate-400 outline-none focus:border-primary transition-all h-[42px]"
                                    />
                                    <Button className="bg-[#7c32ff] text-white rounded-r-lg px-6 py-2 text-[10px] font-black uppercase tracking-widest h-[42px]">
                                        BROWSE
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label>LINK</Label>
                                <input
                                    type="text"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[42px]"
                                />
                            </div>
                            <div className="pt-4 flex justify-center">
                                <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-10 py-2.5 text-[10px] font-black uppercase italic tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95">
                                    ADD
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Slider List */}
                <div className="lg:col-span-9">
                    <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <div className="p-8 pb-4 flex justify-between items-center">
                            <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Home Slider List</h2>
                            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2 w-64 border border-slate-100 group focus-within:border-primary/30 transition-all">
                                <Search size={16} className="text-slate-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="SEARCH"
                                    className="bg-transparent border-none outline-none text-[11px] font-bold text-slate-600 w-full placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <div className="p-2">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                            <div className="flex items-center space-x-1 cursor-pointer hover:text-primary transition-colors">
                                                <ArrowUpDown size={12} />
                                                <span>SL</span>
                                            </div>
                                        </th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                            <div className="flex items-center space-x-1 cursor-pointer hover:text-primary transition-colors">
                                                <ArrowUpDown size={12} />
                                                <span>Image</span>
                                            </div>
                                        </th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                            <div className="flex items-center space-x-1 cursor-pointer hover:text-primary transition-colors">
                                                <ArrowUpDown size={12} />
                                                <span>Link</span>
                                            </div>
                                        </th>
                                        <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                            <div className="flex items-center justify-center space-x-1 cursor-pointer hover:text-primary transition-colors">
                                                <ArrowUpDown size={12} />
                                                <span>Action</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sliders.map((slider, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/30 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{slider.sl}</td>
                                            <td className="px-8 py-6">
                                                <div className="w-20 h-12 rounded-lg bg-slate-100 overflow-hidden ring-1 ring-slate-100 group-hover:ring-primary/20 transition-all shadow-sm">
                                                    <img src={slider.image} alt="Slider" className="w-full h-full object-cover" />
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-[12px] font-bold text-slate-500 italic">{slider.link}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all active:scale-95 shadow-sm">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-8 py-10 flex justify-between items-center border-t border-slate-50 bg-slate-50/20">
                            <span className="text-[11px] font-bold text-slate-400 italic">Showing 1 to 3 of 3 entries</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed"><ChevronLeft size={16} /></div>
                                <div className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center text-[12px] font-black shadow-lg shadow-primary/40 active:scale-90 transition-all cursor-pointer">1</div>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed"><ChevronRight size={16} /></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// 3. Home Page (Home Page Update)
export const HomePageUpdate = () => {
    const permissions = [
        "About Page", "Image Banner", "Latest News", "Notice Board", "Event List", "Academics", "Testimonial", "Custom Links", "Social Icons",
        "About Page", "Image Banner", "Latest News", "Notice Board", "Event List", "Academics", "Testimonial", "Custom Links", "Social Icons"
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Home Settings Page" section="Front Settings" />

            <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[2rem] relative overflow-hidden">
                <div className="absolute top-10 right-10 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary rotate-12 opacity-50">
                    <ImageIcon size={24} />
                </div>

                <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12 border-l-4 border-primary pl-4">Home Page Update</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label>TITLE</Label>
                                <input
                                    type="text"
                                    defaultValue="THE ULTIMATE EDUCATION ERP"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all shadow-inner-sm"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label>HEADING</Label>
                                <input
                                    type="text"
                                    defaultValue="INFIX"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all shadow-inner-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label>SHORT DESCRIPTION</Label>
                            <textarea
                                rows={4}
                                defaultValue="Managing various administrative tasks in one place is now quite easy and time savior with this INFIX and Give your valued time to your institute that will increase next generation productivity for our society."
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all resize-none shadow-inner-sm"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="w-24 h-1 bg-slate-100/50 mb-6" />
                            <div className="flex items-center space-x-3 text-slate-300 mb-4 px-1">
                                <ImageIcon size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest italic">THE ULTIMATE EDUCATION ERP</span>
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Upload Background Image (1420x670)"
                                    className="flex-1 bg-slate-50 border border-slate-100 border-r-0 rounded-l-xl px-5 py-3.5 text-[12px] font-medium text-slate-400 outline-none focus:border-primary transition-all h-[52px] shadow-inner-sm"
                                />
                                <Button className="bg-[#7c32ff] text-white rounded-r-xl px-8 py-2 text-[11px] font-black uppercase tracking-widest h-[52px] shadow-lg shadow-primary/20">
                                    BROWSE
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 lg:pl-10">
                        <h3 className="text-[10px] font-black text-slate-300 tracking-[0.2em] uppercase italic mb-8 border-b border-slate-50 pb-4">Set Permission In Home</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            {permissions.map((perm, idx) => (
                                <div key={idx} className="flex items-center space-x-3 group cursor-pointer">
                                    <div className="w-5 h-5 rounded-full bg-[#7c32ff] flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-all">
                                        <Check size={12} strokeWidth={4} />
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors tracking-tight">{perm}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-24 flex justify-center">
                    <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl px-16 py-4 text-[12px] font-black uppercase tracking-[0.3em] italic shadow-2xl shadow-primary/40 transition-all active:scale-95 flex items-center space-x-3">
                        <Upload size={20} />
                        <span>UPDATE</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

// 4. Page List (Aora Page Builder)
export const PageList = () => {
    const pages = [
        { sl: 1, name: "Home", badge: "Home", url: "https://infixedu.ischooll.com/home", status: true },
        { sl: 2, name: "About", url: "https://infixedu.ischooll.com/about", status: true },
        { sl: 3, name: "About", url: "https://infixedu.ischooll.com/aboutus-page", status: true },
        { sl: 4, name: "Academic Calendar", url: "https://infixedu.ischooll.com/academic-calendars", status: true },
        { sl: 5, name: "Book a Visit", url: "https://infixedu.ischooll.com/book-a-visit", status: true },
        { sl: 6, name: "Class Routine", url: "https://infixedu.ischooll.com/class-routines", status: true },
        { sl: 7, name: "Contact Us", url: "https://infixedu.ischooll.com/contact-us", status: true },
        { sl: 8, name: "Course", url: "https://infixedu.ischooll.com/course", status: true },
        { sl: 9, name: "Donor List", url: "https://infixedu.ischooll.com/donor-list", status: true },
        { sl: 10, name: "Events", url: "https://infixedu.ischooll.com/events", status: true },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Page List" section="Frontend CMS" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-3">
                    <Card className="p-10 border-none shadow-sm bg-white rounded-2xl">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12">Add new page</h2>
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <Label required>PAGE NAME</Label>
                                <input type="text" placeholder="Page Name *" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-400 outline-none focus:border-primary transition-all h-[52px]" />
                            </div>
                            <div className="space-y-3">
                                <Label required>PAGE TITLE</Label>
                                <input type="text" placeholder="Page Title *" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-400 outline-none focus:border-primary transition-all h-[52px]" />
                            </div>
                            <div className="space-y-3">
                                <Label>PAGE DESCRIPTION</Label>
                                <textarea rows={2} placeholder="Page Description" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-4 text-[12px] font-medium text-slate-400 outline-none focus:border-primary transition-all resize-none shadow-sm" />
                            </div>
                            <div className="space-y-3">
                                <Label required>PAGE SLUG</Label>
                                <input type="text" placeholder="Page Slug *" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-400 outline-none focus:border-primary transition-all h-[52px]" />
                            </div>
                            <div className="flex items-center justify-between px-1">
                                <Label>MAKE HOME PAGE?</Label>
                                <div className="flex items-center space-x-3">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">NO</span>
                                    <div className="w-12 h-6 bg-slate-100 rounded-full relative p-1 cursor-pointer">
                                        <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 flex justify-center">
                                <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl px-12 py-4 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 transition-all active:scale-95">
                                    ADD NEW PAGE
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Page List */}
                <div className="lg:col-span-9">
                    <Card className="p-0 border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden">
                        <div className="p-10 pb-6">
                            <h2 className="text-base font-black text-slate-700 tracking-widest italic uppercase">Page List</h2>
                        </div>

                        <div className="p-2">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">SL</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">NAME</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">URL</th>
                                        <th className="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">STATUS</th>
                                        <th className="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pages.map((page, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/50 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{page.sl}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-[12px] font-black text-slate-700 tracking-tight italic">{page.name}</span>
                                                    {page.badge && (
                                                        <span className="bg-blue-500 text-white text-[9px] font-black px-2 py-0.5 rounded italic uppercase tracking-tighter">Home</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-[11px] font-medium text-slate-400 truncate max-w-[300px]">{page.url}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <div className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-all ${page.status ? 'bg-[#7c32ff]' : 'bg-slate-200'}`}>
                                                        <div className={`w-3 h-3 bg-white rounded-full shadow-md transition-all ${page.status ? 'translate-x-5' : 'translate-x-0'}`} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-10 py-12 flex justify-center space-x-2 bg-slate-50/20 items-center">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:bg-slate-50 transition-all"><ChevronLeft size={18} /></div>
                            <div className="w-10 h-10 rounded-xl bg-[#1e293b] text-white flex items-center justify-center text-[13px] font-black shadow-xl shadow-black/20">1</div>
                            <div className="w-10 h-10 rounded-xl bg-white text-slate-400 flex items-center justify-center text-[13px] font-black hover:bg-slate-50 transition-all cursor-pointer">2</div>
                            <div className="w-10 h-10 rounded-xl bg-white text-slate-400 flex items-center justify-center text-[13px] font-black hover:bg-slate-50 transition-all cursor-pointer">3</div>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:bg-slate-50 transition-all"><ChevronRight size={18} /></div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// 5. Expert Teacher (Expert Staff)
export const ExpertStaff = () => {
    const staffList = [
        { sl: 1, name: "Jaylon", designation: "Principal", image: "https://via.placeholder.com/40" },
        { sl: 2, name: "Mr. Olivia", designation: "Senior Assistant Teacher", image: "https://via.placeholder.com/40" },
        { sl: 3, name: "Mr. Ahmed", designation: "Senior Assistant Teacher", image: "https://via.placeholder.com/40" },
        { sl: 4, name: "Mr. Patel", designation: "Assistant Teacher", image: "https://via.placeholder.com/40" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Expert Staff" section="Frontend CMS" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-3">
                    <Card className="p-10 border-none shadow-sm bg-white rounded-2xl">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12">Add Expert Staff</h2>
                        <div className="space-y-10">
                            <div className="space-y-3">
                                <Label required>ROLE</Label>
                                <div className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3 text-[12px] font-medium text-slate-400 h-[52px] flex items-center justify-between group cursor-pointer hover:border-primary transition-all">
                                    <span>Select Role</span>
                                    <ChevronDown size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label required>STAFF</Label>
                                <div className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3 text-[12px] font-medium text-slate-400 h-[52px] flex items-center justify-between group cursor-pointer hover:border-primary transition-all">
                                    <span>Name *</span>
                                    <ChevronDown size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
                                </div>
                            </div>
                            <div className="pt-6 flex justify-center">
                                <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl px-12 py-4 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all">
                                    ADD
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Staff List */}
                <div className="lg:col-span-9">
                    <Card className="p-0 border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden">
                        <div className="p-10 pb-4 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-700 tracking-widest italic uppercase">Expert Staff List</h2>
                            <div className="flex items-center bg-slate-50 rounded-xl px-5 py-2.5 w-72 border border-slate-100 group focus-within:border-primary/30 transition-all shadow-inner-sm">
                                <Search size={18} className="text-slate-300 mr-2" />
                                <input
                                    type="text"
                                    placeholder="SEARCH"
                                    className="bg-transparent border-none outline-none text-[12px] font-black tracking-widest text-[#1e293b] w-full placeholder:text-slate-200 uppercase italic"
                                />
                            </div>
                        </div>

                        <div className="p-2">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />SL</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Name</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Designation</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Image</th>
                                        <th className="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffList.map((staff, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/50 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">
                                                <div className="flex items-center space-x-4">
                                                    <ArrowUpDown size={12} className="text-slate-200 group-hover:text-primary transition-colors cursor-move" />
                                                    <span>{staff.sl}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-[12px] font-black text-slate-700 italic tracking-tight uppercase">{staff.name}</td>
                                            <td className="px-8 py-6 text-[11px] font-bold text-slate-400 italic uppercase">{staff.designation}</td>
                                            <td className="px-8 py-6">
                                                <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden ring-4 ring-slate-50 group-hover:ring-primary/10 transition-all shadow-md">
                                                    <img src={staff.image} alt={staff.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-8 py-2 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-10 py-12 flex justify-between bg-slate-50/20 items-center">
                            <span className="text-[11px] font-bold text-slate-300 italic">Showing 1 to 4 of 4 entries</span>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-200 hover:bg-slate-100 transition-all"><ChevronLeft size={18} /></div>
                                <div className="w-10 h-10 rounded-xl bg-[#7c32ff] text-white flex items-center justify-center text-[14px] font-black shadow-primary-lg active:scale-95 transition-all">1</div>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-200 hover:bg-slate-100 transition-all"><ChevronRight size={18} /></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Float quick actions from screenshot */}
            <div className="fixed right-6 top-64 flex flex-col space-y-2 z-50">
                {[Printer, FileSpreadsheet, FileSpreadsheet, FileSpreadsheet, Plus].map((Icon, idx) => (
                    <div key={idx} className="w-10 h-10 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 rounded-lg flex items-center justify-center shadow-lg transition-all cursor-pointer">
                        <Icon size={18} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// 6. Photo Gallery
export const PhotoGallery = () => {
    const photos = [
        { sl: 1, name: "Empowering Students: Discovering Joy in Mathematics!", image: "https://via.placeholder.com/80x45" },
        { sl: 2, name: "Explore Your Academic Horizons: A Learning Fiesta for Everyone!", image: "https://via.placeholder.com/80x45" },
        { sl: 3, name: "Dive into the World of Words: Language and Literature Fiesta!", image: "https://via.placeholder.com/80x45" },
        { sl: 4, name: "Embrace Change: Environmental Awareness Day!", image: "https://via.placeholder.com/80x45" },
        { sl: 5, name: "Back-to-School Celebration: A Journey of Learning Begins!", image: "https://via.placeholder.com/80x45" },
        { sl: 6, name: "Exploring the Microscopic World: A Hands-On Science Workshop", image: "https://via.placeholder.com/80x45" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Photo Gallery" section="Frontend CMS" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-4">
                    <Card className="p-8 border-none shadow-sm bg-white rounded-2xl">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-10">Photo Gallery</h2>
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <Label required>NAME</Label>
                                <input type="text" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[42px]" />
                            </div>
                            <div className="space-y-3">
                                <Label required>DESCRIPTION</Label>
                                <div className="border border-slate-200 rounded-lg overflow-hidden">
                                    <div className="bg-slate-50 border-b border-slate-200 p-2 flex space-x-2">
                                        <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold">B</div>
                                        <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold italic">I</div>
                                        <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold underline">U</div>
                                    </div>
                                    <textarea rows={6} placeholder="Enter description here..." className="w-full px-4 py-3 text-[12px] font-medium text-slate-400 outline-none resize-none" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label required>FEATURE IMAGE</Label>
                                <div className="flex">
                                    <input type="text" placeholder="Feature image *" className="flex-1 bg-white border border-slate-200 border-r-0 rounded-l-lg px-4 py-3 text-[12px] font-medium text-slate-400 outline-none h-[42px]" />
                                    <Button className="bg-[#7c32ff] text-white rounded-r-lg px-6 py-2 text-[10px] font-black uppercase tracking-widest h-[42px]">BROWSE</Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between group cursor-pointer">
                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic group-hover:text-primary transition-colors">Add Gallery Photos</span>
                                <div className="w-8 h-8 rounded-full bg-[#7c32ff] text-white flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-all">
                                    <Plus size={16} />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-center">
                                <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-10 py-2.5 text-[10px] font-black uppercase italic tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95">
                                    ADD
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Photo Gallery List */}
                <div className="lg:col-span-8">
                    <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <div className="p-8 pb-4 flex justify-between items-center">
                            <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Photo Gallery List</h2>
                            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2 w-64 border border-slate-100 group focus-within:border-primary/30 transition-all shadow-inner-sm">
                                <Search size={16} className="text-slate-400 mr-2" />
                                <input type="text" placeholder="SEARCH" className="bg-transparent border-none outline-none text-[11px] font-bold text-slate-600 w-full placeholder:text-slate-300 uppercase italic" />
                            </div>
                        </div>

                        <div className="p-2">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />SL</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Name</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Image</th>
                                        <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {photos.map((pt, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/30 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">
                                                <div className="flex items-center space-x-3">
                                                    <ArrowUpDown size={12} className="text-slate-200 cursor-move" />
                                                    <span>{pt.sl}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-[11px] font-black text-slate-500 uppercase italic tracking-tight max-w-xs">{pt.name}</td>
                                            <td className="px-8 py-6">
                                                <div className="w-16 h-10 rounded bg-slate-100 overflow-hidden ring-1 ring-slate-100 shadow-sm border border-white">
                                                    <img src={pt.image} alt="Gallery" className="w-full h-full object-cover" />
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-8 py-10 flex justify-between items-center border-t border-slate-50 bg-slate-50/20">
                            <span className="text-[11px] font-bold text-slate-400 italic">Showing 1 to 6 of 6 entries</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronLeft size={16} /></div>
                                <div className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center text-[12px] font-black shadow-lg shadow-primary/40 active:scale-90 transition-all cursor-pointer">1</div>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronRight size={16} /></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Quick Actions at top right */}
            <div className="fixed right-6 top-64 flex flex-col space-y-2 z-50">
                {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                    <div key={idx} className="w-10 h-10 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 rounded-lg flex items-center justify-center shadow-lg transition-all cursor-pointer">
                        <Icon size={18} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// 7. Video Gallery
export const VideoGallery = () => {
    const videos = [
        { sl: 1, name: "Science Fair", desc: "A showcase of student experiments and scientific discoveries", thumb: "https://via.placeholder.com/80x45" },
        { sl: 2, name: "Cultural Carnival", desc: "A lively celebration of diverse traditions, arts, and festivities", thumb: "https://via.placeholder.com/80x45" },
        { sl: 3, name: "Student Leadership Summit", desc: "Empowering future leaders through collaboration and inspiration", thumb: "https://via.placeholder.com/80x45" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Video Gallery" section="Frontend CMS" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-4">
                    <Card className="p-8 border-none shadow-sm bg-white rounded-2xl">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-10">Video Gallery</h2>
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <Label required>NAME</Label>
                                <input type="text" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[42px]" />
                            </div>
                            <div className="space-y-3">
                                <Label required>DESCRIPTION</Label>
                                <textarea rows={4} className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all resize-none shadow-inner-sm" />
                            </div>
                            <div className="space-y-3">
                                <Label required>VIDEO LINK</Label>
                                <input type="text" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[42px]" />
                            </div>
                            <div className="pt-4 flex justify-center">
                                <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-10 py-2.5 text-[10px] font-black uppercase italic tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95">
                                    ADD
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Video Gallery List */}
                <div className="lg:col-span-8">
                    <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <div className="p-8 pb-4 flex justify-between items-center">
                            <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Video Gallery List</h2>
                            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2 w-64 border border-slate-100 group focus-within:border-primary/30 transition-all shadow-inner-sm">
                                <Search size={16} className="text-slate-400 mr-2" />
                                <input type="text" placeholder="SEARCH" className="bg-transparent border-none outline-none text-[11px] font-bold text-slate-600 w-full placeholder:text-slate-300 uppercase italic" />
                            </div>
                        </div>

                        <div className="p-2">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />SL</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Name</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Description</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Thumbnail</th>
                                        <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {videos.map((vid, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/30 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">
                                                <div className="flex items-center space-x-3">
                                                    <ArrowUpDown size={12} className="text-slate-200 cursor-move" />
                                                    <span>{vid.sl}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-[11px] font-black text-slate-500 uppercase italic tracking-tight">{vid.name}</td>
                                            <td className="px-8 py-6 text-[11px] font-bold text-slate-400 italic max-w-xs truncate">{vid.desc}</td>
                                            <td className="px-8 py-6">
                                                <div className="w-20 h-12 rounded bg-slate-100 overflow-hidden ring-1 ring-slate-100 shadow-sm border border-white">
                                                    <img src={vid.thumb} alt="Video" className="w-full h-full object-cover" />
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-8 py-10 flex justify-between items-center border-t border-slate-50 bg-slate-50/20">
                            <span className="text-[11px] font-bold text-slate-400 italic">Showing 1 to 3 of 3 entries</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronLeft size={16} /></div>
                                <div className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center text-[12px] font-black shadow-lg shadow-primary/40 active:scale-90 transition-all cursor-pointer">1</div>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronRight size={16} /></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="fixed right-6 top-64 flex flex-col space-y-2 z-50">
                {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                    <div key={idx} className="w-10 h-10 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 rounded-lg flex items-center justify-center shadow-lg transition-all cursor-pointer">
                        <Icon size={18} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// 8. Front Result
export const FrontResult = () => {
    const results = [
        { sl: 1, title: "Science", date: "02/22/2026" },
        { sl: 2, title: "Arts", date: "02/22/2026" },
        { sl: 3, title: "Commerce", date: "02/22/2026" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Front Result" section="Frontend CMS" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-4">
                    <Card className="p-8 border-none shadow-sm bg-white rounded-2xl">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-10">Front Result</h2>
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <Label required>TITLE</Label>
                                <input type="text" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[42px]" />
                            </div>
                            <div className="space-y-3">
                                <Label required>PUBLISH DATE</Label>
                                <div className="relative">
                                    <input type="text" defaultValue="02/23/2026" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[12px] font-medium text-slate-600 outline-none h-[42px]" />
                                    <Calendar size={16} className="absolute right-3 top-3.5 text-slate-400" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label>CONTENT TYPE</Label>
                                <div className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[12px] font-medium text-slate-400 h-[42px] flex items-center justify-between group cursor-pointer hover:border-primary transition-all">
                                    <span>Link</span>
                                    <ChevronDown size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label required>LINK</Label>
                                <input type="text" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[42px]" />
                            </div>
                            <div className="pt-4 flex justify-center">
                                <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-10 py-2.5 text-[10px] font-black uppercase italic tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95">
                                    ADD
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Front Result List */}
                <div className="lg:col-span-8">
                    <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <div className="p-8 pb-4 flex justify-between items-center">
                            <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Front Result List</h2>
                            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2 w-64 border border-slate-100 group focus-within:border-primary/30 transition-all shadow-inner-sm">
                                <Search size={16} className="text-slate-400 mr-2" />
                                <input type="text" placeholder="SEARCH" className="bg-transparent border-none outline-none text-[11px] font-bold text-slate-600 w-full placeholder:text-slate-300 uppercase italic" />
                            </div>
                        </div>

                        <div className="p-2">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />SL</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Title</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Date</th>
                                        <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((res, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/30 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{res.sl}</td>
                                            <td className="px-8 py-6 text-[11px] font-black text-slate-500 uppercase italic tracking-tight">{res.title}</td>
                                            <td className="px-8 py-6 text-[11px] font-bold text-slate-400 italic">{res.date}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-8 py-10 flex justify-between items-center border-t border-slate-50 bg-slate-50/20">
                            <span className="text-[11px] font-bold text-slate-400 italic">Showing 1 to 3 of 3 entries</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronLeft size={16} /></div>
                                <div className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center text-[12px] font-black shadow-lg shadow-primary/40 active:scale-90 transition-all cursor-pointer">1</div>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronRight size={16} /></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="fixed right-6 top-64 flex flex-col space-y-2 z-50">
                {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                    <div key={idx} className="w-10 h-10 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 rounded-lg flex items-center justify-center shadow-lg transition-all cursor-pointer">
                        <Icon size={18} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// 9. Class / Exam Routine Setup (Image 3)
export const ClassExamRoutineSetup = () => {
    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <div className="flex items-center space-x-2 mb-8 text-[11px] font-black tracking-widest uppercase italic">
                <span className="text-slate-400">Dashboard</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-400">Front Settings</span>
                <span className="text-slate-300">|</span>
                <span className="text-primary">Class/Exam Routine</span>
            </div>

            <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-10 right-10 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary rotate-12 opacity-50">
                    <ImageIcon size={24} />
                </div>

                <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12 border-l-4 border-primary pl-4">Class/Exam Routine</h2>

                <div className="space-y-10">
                    <div className="space-y-3">
                        <Label required>TITLE</Label>
                        <input
                            type="text"
                            defaultValue="Routine"
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all shadow-inner-sm"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label required>DESCRIPTION</Label>
                        <textarea
                            rows={4}
                            defaultValue="Lacus consequat sapien metus elit urna, facilisi. Nonummy rutrum eu lacinia platea a, ipsum parturient, orci tristique. Nisi diam natoque."
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all resize-none shadow-inner-sm"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label required>MAIN TITLE</Label>
                        <input
                            type="text"
                            defaultValue="Class/Exam Routine"
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all shadow-inner-sm"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label required>MAIN DESCRIPTION</Label>
                        <textarea
                            rows={4}
                            placeholder="Main Description *"
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all resize-none shadow-inner-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <Label required>BUTTON TEXT</Label>
                            <input
                                type="text"
                                defaultValue="Class/Exam Routine"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all shadow-inner-sm"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label required>BUTTON URL</Label>
                            <input
                                type="text"
                                defaultValue="class-exam-routine"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all shadow-inner-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label>Image(1420px*450px)</Label>
                            <div className="flex">
                                <input
                                    type="text"
                                    defaultValue="about.jpg"
                                    className="flex-1 bg-slate-50 border border-slate-100 border-r-0 rounded-l-xl px-5 py-3.5 text-[12px] font-medium text-slate-400 outline-none h-[52px] shadow-inner-sm"
                                />
                                <Button className="bg-[#7c32ff] text-white rounded-r-xl px-8 py-2 text-[10px] font-black uppercase tracking-widest h-[52px] shadow-lg shadow-primary/20">
                                    BROWSE
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label>Image(1420px*450px)</Label>
                            <div className="flex">
                                <input
                                    type="text"
                                    defaultValue="about-img.jpg"
                                    className="flex-1 bg-slate-50 border border-slate-100 border-r-0 rounded-l-xl px-5 py-3.5 text-[12px] font-medium text-slate-400 outline-none h-[52px] shadow-inner-sm"
                                />
                                <Button className="bg-[#7c32ff] text-white rounded-r-xl px-8 py-2 text-[10px] font-black uppercase tracking-widest h-[52px] shadow-lg shadow-primary/20">
                                    BROWSE
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="flex items-center space-x-12">
                            <Label>Class Routine</Label>
                            <div className="flex items-center space-x-12">
                                <RadioToggle label="Show" checked={true} onChange={() => { }} />
                                <RadioToggle label="Hide" checked={false} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="flex items-center space-x-12">
                            <Label>Exam Routine</Label>
                            <div className="flex items-center space-x-12">
                                <RadioToggle label="Show" checked={true} onChange={() => { }} />
                                <RadioToggle label="Hide" checked={false} onChange={() => { }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 flex justify-center">
                    <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl px-12 py-3 text-[11px] font-black uppercase tracking-widest italic shadow-2xl shadow-primary/40 transition-all active:scale-95">
                        UPDATE
                    </Button>
                </div>
            </Card>
        </div>
    );
};

// 10. Front Class Routine (Image 1)
export const FrontClassRoutine = () => {
    const routineList = [
        { sl: 1, title: "Class Routine - Class I - (A)", date: "02/22/2026" },
        { sl: 2, title: "Class Routine - Class I - (B)", date: "02/22/2026" },
        { sl: 3, title: "Class Routine - Class I - (C)", date: "02/22/2026" },
        { sl: 4, title: "Class Routine - Class I - (D)", date: "02/22/2026" },
        { sl: 5, title: "Class Routine - Class I - (E)", date: "02/22/2026" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Front Class Routine" section="Frontend CMS" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-4">
                    <Card className="p-10 border-none shadow-sm bg-white rounded-2xl">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12">Front Class Routine</h2>
                        <div className="space-y-10">
                            <div className="space-y-3">
                                <Label required>TITLE</Label>
                                <input type="text" placeholder="Title *" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                            </div>
                            <div className="space-y-3">
                                <Label required>PUBLISH DATE</Label>
                                <div className="relative">
                                    <input type="text" defaultValue="02/23/2026" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none h-[52px]" />
                                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label required>ROUTINE FILE</Label>
                                <div className="flex">
                                    <input type="text" placeholder="Routine File *" className="flex-1 bg-white border border-slate-200 border-r-0 rounded-l-lg px-4 py-3 text-[12px] font-medium text-slate-400 outline-none h-[52px]" />
                                    <Button className="bg-[#7c32ff] text-white rounded-r-lg px-6 py-2 text-[10px] font-black uppercase tracking-widest h-[52px]">BROWSE</Button>
                                </div>
                                <p className="text-[10px] text-primary italic font-medium">(Jpg,png,jpeg,pdf are allowed for upload)</p>
                            </div>
                            <div className="pt-6">
                                <Button className="w-32 bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl py-4 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all">
                                    ADD
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Routine List */}
                <div className="lg:col-span-8">
                    <Card className="p-0 border-none shadow-sm bg-white rounded-[2rem] overflow-hidden">
                        <div className="p-10 pb-4 flex justify-between items-center">
                            <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Front Class Routine list</h2>
                            <div className="flex space-x-4 items-center">
                                <div className="flex items-center bg-slate-50 rounded-xl px-5 py-2.5 w-64 border border-slate-100 focus-within:border-primary/30 transition-all shadow-inner-sm">
                                    <Search size={18} className="text-slate-300 mr-2" />
                                    <input type="text" placeholder="SEARCH" className="bg-transparent border-none outline-none text-[12px] font-black tracking-widest text-slate-700 w-full placeholder:text-slate-200 uppercase italic" />
                                </div>
                                <div className="flex items-center space-x-1 bg-white border border-primary/20 rounded-full px-4 py-2 shadow-sm">
                                    {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                                        <Icon key={idx} size={14} className="text-primary hover:scale-110 transition-transform cursor-pointer mx-1" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-2">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">
                                            <ArrowUpDown size={12} className="inline mr-2" />SL
                                        </th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">
                                            <ArrowUpDown size={12} className="inline mr-2" />Title
                                        </th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">
                                            <ArrowUpDown size={12} className="inline mr-2" />Date
                                        </th>
                                        <th className="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">
                                            <ArrowUpDown size={12} className="inline mr-2" />Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {routineList.map((routine, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/50 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{routine.sl}</td>
                                            <td className="px-8 py-6 text-[12px] font-black text-slate-500 italic tracking-tight uppercase">{routine.title}</td>
                                            <td className="px-8 py-6 text-[11px] font-bold text-slate-400 italic">{routine.date}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-10 flex justify-between items-center text-[11px] font-bold text-slate-400 italic border-t border-slate-50">
                            <span>Showing 1 to 5 of 5 entries</span>
                            <div className="flex space-x-2">
                                <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 hover:text-primary transition-all"><ChevronLeft size={16} /></button>
                                <button className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center font-black">1</button>
                                <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 hover:text-primary transition-all"><ChevronRight size={16} /></button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// 11. Front Exam Routine (Image 2)
export const FrontExamRoutine = () => {
    const routineList = [
        { sl: 1, title: "First Term Class 1 - (A)", date: "02/22/2026" },
        { sl: 2, title: "First Term Class 1 - (B)", date: "02/22/2026" },
        { sl: 3, title: "First Term Class 1 - (C)", date: "02/22/2026" },
        { sl: 4, title: "First Term Class 1 - (D)", date: "02/22/2026" },
        { sl: 5, title: "First Term Class 1 - (E)", date: "02/22/2026" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Front Exam Routine" section="Frontend CMS" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-4">
                    <Card className="p-10 border-none shadow-sm bg-white rounded-2xl">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12">Front Exam Routine</h2>
                        <div className="space-y-10">
                            <div className="space-y-3">
                                <Label required>TITLE</Label>
                                <input type="text" placeholder="Title *" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                            </div>
                            <div className="space-y-3">
                                <Label required>PUBLISH DATE</Label>
                                <div className="relative">
                                    <input type="text" defaultValue="02/23/2026" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none h-[52px]" />
                                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label required>ROUTINE FILE</Label>
                                <div className="flex">
                                    <input type="text" placeholder="Routine File *" className="flex-1 bg-white border border-slate-200 border-r-0 rounded-l-lg px-4 py-3 text-[12px] font-medium text-slate-400 outline-none h-[52px]" />
                                    <Button className="bg-[#7c32ff] text-white rounded-r-lg px-6 py-2 text-[10px] font-black uppercase tracking-widest h-[52px]">BROWSE</Button>
                                </div>
                                <p className="text-[10px] text-primary italic font-medium">(Jpg,png,jpeg,pdf are allowed for upload)</p>
                            </div>
                            <div className="pt-6">
                                <Button className="w-32 bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl py-4 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all">
                                    ADD
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Routine List */}
                <div className="lg:col-span-8">
                    <Card className="p-0 border-none shadow-sm bg-white rounded-[2rem] overflow-hidden">
                        <div className="p-10 pb-4 flex justify-between items-center">
                            <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Front Exam Routine list</h2>
                            <div className="flex space-x-4 items-center">
                                <div className="flex items-center bg-slate-50 rounded-xl px-5 py-2.5 w-64 border border-slate-100 focus-within:border-primary/30 transition-all shadow-inner-sm">
                                    <Search size={18} className="text-slate-300 mr-2" />
                                    <input type="text" placeholder="SEARCH" className="bg-transparent border-none outline-none text-[12px] font-black tracking-widest text-slate-700 w-full placeholder:text-slate-200 uppercase italic" />
                                </div>
                                <div className="flex items-center space-x-1 bg-white border border-primary/20 rounded-full px-4 py-2 shadow-sm">
                                    {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                                        <Icon key={idx} size={14} className="text-primary hover:scale-110 transition-transform cursor-pointer mx-1" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-2">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">
                                            <ArrowUpDown size={12} className="inline mr-2" />SL
                                        </th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">
                                            <ArrowUpDown size={12} className="inline mr-2" />Title
                                        </th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">
                                            <ArrowUpDown size={12} className="inline mr-2" />Date
                                        </th>
                                        <th className="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">
                                            <ArrowUpDown size={12} className="inline mr-2" />Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {routineList.map((routine, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/50 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{routine.sl}</td>
                                            <td className="px-8 py-6 text-[12px] font-black text-slate-500 italic tracking-tight uppercase">{routine.title}</td>
                                            <td className="px-8 py-6 text-[11px] font-bold text-slate-400 italic">{routine.date}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-10 flex justify-between items-center text-[11px] font-bold text-slate-400 italic border-t border-slate-50">
                            <span>Showing 1 to 5 of 5 entries</span>
                            <div className="flex space-x-2">
                                <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 hover:text-primary transition-all"><ChevronLeft size={16} /></button>
                                <button className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center font-black">1</button>
                                <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 hover:text-primary transition-all"><ChevronRight size={16} /></button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// 11. Academic Calendar
export const AcademicCalendar = () => {
    const events = [
        { sl: 1, title: "Annual Sports Day 2024", date: "02/22/2026" },
        { sl: 2, title: "Spring Break", date: "02/22/2026" },
        { sl: 3, title: "Final Examinations", date: "02/22/2026" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Academic Calendar" section="Front Settings" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-4">
                    <Card className="p-8 border-none shadow-sm bg-white rounded-2xl">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-10">Academic Calendar</h2>
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <Label required>TITLE</Label>
                                <input type="text" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[42px]" />
                            </div>
                            <div className="space-y-3">
                                <Label required>PUBLISH DATE</Label>
                                <div className="relative">
                                    <input type="text" defaultValue="02/23/2026" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[12px] font-medium text-slate-600 outline-none h-[42px]" />
                                    <Calendar size={16} className="absolute right-3 top-3.5 text-slate-400" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label required>CALENDAR FILE</Label>
                                <div className="flex">
                                    <input type="text" placeholder="Calendar File *" className="flex-1 bg-white border border-slate-200 border-r-0 rounded-l-lg px-4 py-3 text-[12px] font-medium text-slate-400 outline-none h-[42px]" />
                                    <Button className="bg-[#7c32ff] text-white rounded-r-lg px-6 py-2 text-[10px] font-black uppercase tracking-widest h-[42px]">BROWSE</Button>
                                </div>
                                <span className="text-[9px] font-bold text-slate-300 italic">(jpg,png,jpeg,pdf are allowed for upload)</span>
                            </div>
                            <div className="pt-4 flex justify-center">
                                <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-10 py-2.5 text-[10px] font-black uppercase italic tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95">
                                    ADD
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Event List */}
                <div className="lg:col-span-8">
                    <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <div className="p-8 pb-4 flex justify-between items-center">
                            <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Academic Calendar List</h2>
                            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2 w-64 border border-slate-100 group focus-within:border-primary/30 transition-all shadow-inner-sm">
                                <Search size={16} className="text-slate-400 mr-2" />
                                <input type="text" placeholder="SEARCH" className="bg-transparent border-none outline-none text-[11px] font-bold text-slate-600 w-full placeholder:text-slate-300 uppercase italic" />
                            </div>
                        </div>

                        <div className="p-2">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />SL</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Title</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Date</th>
                                        <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/30 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{event.sl}</td>
                                            <td className="px-8 py-6 text-[11px] font-black text-slate-500 uppercase italic tracking-tight">{event.title}</td>
                                            <td className="px-8 py-6 text-[11px] font-bold text-slate-400 italic">{event.date}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-8 py-10 flex justify-between items-center border-t border-slate-50 bg-slate-50/20">
                            <span className="text-[11px] font-bold text-slate-400 italic">Showing 1 to 3 of 3 entries</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronLeft size={16} /></div>
                                <div className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center text-[12px] font-black shadow-lg shadow-primary/40 active:scale-90 transition-all cursor-pointer">1</div>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronRight size={16} /></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="fixed right-6 top-64 flex flex-col space-y-2 z-50">
                {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                    <div key={idx} className="w-10 h-10 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 rounded-lg flex items-center justify-center shadow-lg transition-all cursor-pointer">
                        <Icon size={18} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// 12. Testimonial
export const Testimonial = () => {
    const testimonials = [
        { sl: 1, name: "Malala euhen", designation: "Chairman", institution: "Linkdin", rating: 4, image: "https://via.placeholder.com/40" },
        { sl: 2, name: "Tristique euhen", designation: "CEO", institution: "Google", rating: 5, image: "https://via.placeholder.com/40" },
    ];

    const [rating, setRating] = useState(0);

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Add Testimonial" section="Frontend CMS" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-3">
                    <Card className="p-10 border-none shadow-sm bg-white rounded-2xl">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12">Add Testimonial</h2>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <Label required>NAME</Label>
                                <input type="text" placeholder="Name *" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                            </div>
                            <div className="space-y-2">
                                <Label required>DESIGNATION</Label>
                                <input type="text" placeholder="Designation *" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                            </div>
                            <div className="space-y-2">
                                <Label required>INSTITUTION NAME</Label>
                                <input type="text" placeholder="Institution Name *" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[48px]" />
                            </div>
                            <div className="space-y-2">
                                <Label required>IMAGE</Label>
                                <div className="flex">
                                    <input type="text" placeholder="Image *" className="flex-1 bg-white border border-slate-200 border-r-0 rounded-l-lg px-4 py-3 text-[12px] font-medium text-slate-400 outline-none h-[48px]" />
                                    <Button className="bg-[#7c32ff] text-white rounded-r-lg px-6 py-2 text-[10px] font-black uppercase tracking-widest h-[48px]">BROWSE</Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label required>DESCRIPTION</Label>
                                <textarea rows={4} placeholder="Description *" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-4 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all resize-none shadow-sm" />
                            </div>
                            <div className="space-y-2">
                                <Label required>RATING</Label>
                                <div className="flex space-x-1 p-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={18}
                                            className={`cursor-pointer transition-colors ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                                            onClick={() => setRating(star)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="pt-6 flex justify-center">
                                <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-10 py-3 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all">
                                    FRONT_SETTINGS.SUBMIT
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Testimonial List */}
                <div className="lg:col-span-9">
                    <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <div className="p-8 pb-4 flex justify-between items-center">
                            <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Testimonial List</h2>
                            <div className="flex items-center bg-slate-50 rounded-xl px-5 py-2.5 w-64 border border-slate-100 focus-within:border-primary/30 transition-all shadow-inner-sm">
                                <Search size={18} className="text-slate-300 mr-2" />
                                <input type="text" placeholder="SEARCH" className="bg-transparent border-none outline-none text-[12px] font-black tracking-widest text-slate-700 w-full placeholder:text-slate-200 uppercase italic" />
                            </div>
                        </div>

                        <div className="p-2">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap"><ArrowUpDown size={12} className="inline mr-2" />Name</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap"><ArrowUpDown size={12} className="inline mr-2" />Designation</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap"><ArrowUpDown size={12} className="inline mr-2" />Institution Name</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap"><ArrowUpDown size={12} className="inline mr-2" />Rating</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap"><ArrowUpDown size={12} className="inline mr-2" />Image</th>
                                        <th className="px-8 py-5 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap"><ArrowUpDown size={12} className="inline mr-2" />Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testimonials.map((test, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/30 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{test.name}</td>
                                            <td className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase italic">{test.designation}</td>
                                            <td className="px-8 py-6 text-[11px] font-bold text-slate-400 italic">{test.institution}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex space-x-0.5">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star key={s} size={14} className={s <= test.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden ring-4 ring-slate-50 group-hover:ring-primary/10 transition-all">
                                                    <img src={test.image} alt={test.name} className="w-full h-full object-cover" />
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-8 py-10 flex justify-between items-center border-t border-slate-50 bg-slate-50/20">
                            <span className="text-[11px] font-bold text-slate-400 italic">Showing 1 to 2 of 2 entries</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronLeft size={16} /></div>
                                <div className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center text-[12px] font-black shadow-lg shadow-primary/40 active:scale-90 transition-all cursor-pointer">1</div>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-100 transition-all"><ChevronRight size={16} /></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="fixed right-6 top-64 flex flex-col space-y-2 z-50">
                {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                    <div key={idx} className="w-10 h-10 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 rounded-lg flex items-center justify-center shadow-lg transition-all cursor-pointer">
                        <Icon size={18} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// 13. News Category
export const NewsCategory = () => {
    const categories = [
        { sl: 1, category: "Academic" },
        { sl: 2, category: "Events" },
        { sl: 3, category: "General" },
        { sl: 4, category: "Notice" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="News Category" section="Front Settings" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-4">
                    <Card className="p-8 border-none shadow-sm bg-white rounded-2xl">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-10">Add News Category</h2>
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <Label required>CATEGORY NAME</Label>
                                <input type="text" placeholder="Category Name *" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[42px]" />
                            </div>
                            <div className="pt-4 flex justify-center">
                                <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-8 py-2.5 text-[10px] font-black uppercase italic tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center space-x-2">
                                    <Check size={14} />
                                    <span>SAVE CATEGORY</span>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Category List */}
                <div className="lg:col-span-8">
                    <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <div className="p-8 pb-4 flex justify-between items-center">
                            <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Category List</h2>
                            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2 w-64 border border-slate-100 group focus-within:border-primary/30 transition-all shadow-inner-sm">
                                <Search size={16} className="text-slate-400 mr-2" />
                                <input type="text" placeholder="SEARCH" className="bg-transparent border-none outline-none text-[11px] font-bold text-slate-600 w-full placeholder:text-slate-300 uppercase italic" />
                            </div>
                        </div>

                        <div className="p-2">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />SL</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Category Title</th>
                                        <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((cat, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/30 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{cat.sl}</td>
                                            <td className="px-8 py-6 text-[11px] font-black text-slate-500 uppercase italic tracking-tight">{cat.category}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-8 py-10 flex justify-between items-center border-t border-slate-50 bg-slate-50/20">
                            <span className="text-[11px] font-bold text-slate-400 italic">Showing 1 to 4 of 4 entries</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronLeft size={16} /></div>
                                <div className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center text-[12px] font-black shadow-lg shadow-primary/40 active:scale-90 transition-all cursor-pointer">1</div>
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronRight size={16} /></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="fixed right-6 top-64 flex flex-col space-y-2 z-50">
                {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                    <div key={idx} className="w-10 h-10 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 rounded-lg flex items-center justify-center shadow-lg transition-all cursor-pointer">
                        <Icon size={18} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// 14. News List
export const NewsList = () => {
    const news = [
        { sl: 1, title: "School Announces New Principal", category: "Academic", date: "02/22/2026", image: "https://via.placeholder.com/60x40" },
        { sl: 2, title: "Students Win National Science Fair", category: "Events", date: "02/22/2026", image: "https://via.placeholder.com/60x40" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="News List" section="Front Settings" />

            <div className="space-y-8">
                {/* Add Form */}
                <Card className="p-10 border-none shadow-sm bg-white rounded-2xl relative overflow-hidden">
                    <div className="absolute top-10 right-10 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary rotate-12 opacity-50">
                        <Plus size={24} />
                    </div>

                    <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12 border-l-4 border-primary pl-4">Add News</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-3 lg:col-span-2">
                            <Label required>TITLE</Label>
                            <input type="text" placeholder="News Title *" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all shadow-inner-sm" />
                        </div>
                        <div className="space-y-3">
                            <Label required>CATEGORY</Label>
                            <div className="relative">
                                <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all shadow-inner-sm appearance-none cursor-pointer">
                                    <option>Select Category *</option>
                                    <option>Academic</option>
                                    <option>Events</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label required>IMAGE</Label>
                            <div className="flex">
                                <input type="text" placeholder="Choose Image *" className="flex-1 bg-slate-50 border border-slate-100 border-r-0 rounded-l-xl px-5 py-3.5 text-[12px] font-medium text-slate-400 outline-none h-[52px] shadow-inner-sm" />
                                <Button className="bg-[#7c32ff] text-white rounded-r-xl px-8 py-2 text-[11px] font-black uppercase tracking-widest h-[52px] shadow-lg shadow-primary/20">
                                    BROWSE
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
                        <div className="lg:col-span-3 space-y-8">
                            <div className="space-y-3">
                                <Label required>PUBLISH DATE</Label>
                                <div className="relative">
                                    <input type="text" defaultValue="02/23/2026" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-[12px] font-medium text-slate-600 h-[52px] outline-none focus:border-primary transition-all shadow-inner-sm" />
                                    <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-12">
                                    <Label>Main Title</Label>
                                    <div className="flex items-center space-x-12">
                                        <RadioToggle label="Show" checked={true} onChange={() => { }} />
                                        <RadioToggle label="Hide" checked={false} onChange={() => { }} />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-12">
                                    <Label>Show On Default</Label>
                                    <div className="flex items-center space-x-12">
                                        <RadioToggle label="Show" checked={false} onChange={() => { }} />
                                        <RadioToggle label="Hide" checked={true} onChange={() => { }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-9 space-y-8">
                            <div className="space-y-3">
                                <Label required>NEWS SUMMARY</Label>
                                <textarea rows={2} placeholder="Summaries *" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all resize-none shadow-inner-sm" />
                            </div>
                            <div className="space-y-3">
                                <Label required>DESCRIPTION</Label>
                                <textarea rows={6} placeholder="Description *" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all resize-none shadow-inner-sm" />
                                <span className="text-[9px] font-bold text-slate-300 italic">(Rich Text Editor Simulation)</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 flex justify-center border-t border-slate-50 mt-8">
                        <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl px-12 py-3.5 text-[11px] font-black uppercase tracking-widest italic shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center space-x-2">
                            <Save size={16} />
                            <span>SAVE NEWS</span>
                        </Button>
                    </div>
                </Card>

                {/* News List */}
                <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                    <div className="p-8 pb-4 flex justify-between items-center">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase border-l-4 border-primary pl-4">News Articles List</h2>
                        <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2 w-64 border border-slate-100 group focus-within:border-primary/30 transition-all shadow-inner-sm">
                            <Search size={16} className="text-slate-400 mr-2" />
                            <input type="text" placeholder="SEARCH" className="bg-transparent border-none outline-none text-[11px] font-bold text-slate-600 w-full placeholder:text-slate-300 uppercase italic" />
                        </div>
                    </div>

                    <div className="p-2">
                        <table className="w-full border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />SL</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Title</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Publication Date</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Category</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Media</th>
                                    <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {news.map((item, idx) => (
                                    <tr key={idx} className="group hover:bg-slate-50/30 transition-all">
                                        <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{item.sl}</td>
                                        <td className="px-8 py-6 text-[11px] font-black text-slate-500 uppercase italic tracking-tight">{item.title}</td>
                                        <td className="px-8 py-6 text-[11px] font-bold text-slate-400 italic">{item.date}</td>
                                        <td className="px-8 py-6 text-[11px] font-bold text-rose-400 italic uppercase">{item.category}</td>
                                        <td className="px-8 py-6">
                                            <div className="w-16 h-10 rounded-lg bg-slate-100 overflow-hidden ring-1 ring-slate-100 shadow-sm">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center">
                                                <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                    <span>SELECT</span>
                                                    <ChevronDown size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-8 py-10 flex justify-between items-center border-t border-slate-50 bg-slate-50/20">
                        <span className="text-[11px] font-bold text-slate-400 italic">Showing 1 to 2 of 2 entries</span>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronLeft size={16} /></div>
                            <div className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center text-[12px] font-black shadow-lg shadow-primary/40 active:scale-90 transition-all cursor-pointer">1</div>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronRight size={16} /></div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="fixed right-6 top-64 flex flex-col space-y-2 z-50">
                {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                    <div key={idx} className="w-10 h-10 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 rounded-lg flex items-center justify-center shadow-lg transition-all cursor-pointer">
                        <Icon size={18} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// 15. News Comments
export const NewsComments = () => {
    const comments = [
        { sl: 1, author: "John Doe", comment: "Great news for the school!", inResponseTo: "School Announces New Principal", submittedOn: "02/22/2026" },
        { sl: 2, author: "Jane Smith", comment: "Congratulations to everyone!", inResponseTo: "Students Win National Science Fair", submittedOn: "02/22/2026" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <SectionHeader title="News Comment List" section="Front Settings" />
                <Button className="bg-[#ff4d4d] hover:bg-[#ff3333] text-white rounded-xl px-6 py-2.5 text-[10px] font-black uppercase tracking-widest italic shadow-xl shadow-rose-200 active:scale-95 transition-all">
                    RESET DATATABLE DATA
                </Button>
            </div>

            <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                <div className="p-8 pb-4 flex justify-between items-center border-l-4 border-primary ml-8 mt-4">
                    <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">News Comment List</h2>
                    <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2 w-64 border border-slate-100 group focus-within:border-primary/30 transition-all shadow-inner-sm">
                        <Search size={16} className="text-slate-400 mr-2" />
                        <input type="text" placeholder="SEARCH" className="bg-transparent border-none outline-none text-[11px] font-bold text-slate-600 w-full placeholder:text-slate-300 uppercase italic" />
                    </div>
                </div>

                <div className="p-2">
                    <table className="w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />SL</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Author</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Comment</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />In Response To</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Submitted On</th>
                                <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((comm, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50/30 transition-all">
                                    <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{comm.sl}</td>
                                    <td className="px-8 py-6 text-[11px] font-black text-slate-500 uppercase italic tracking-tight">{comm.author}</td>
                                    <td className="px-8 py-6 text-[11px] font-medium text-slate-500 italic max-w-xs truncate">{comm.comment}</td>
                                    <td className="px-8 py-6 text-[11px] font-bold text-primary italic uppercase tracking-tight">{comm.inResponseTo}</td>
                                    <td className="px-8 py-6 text-[11px] font-bold text-slate-400 italic">{comm.submittedOn}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-center">
                                            <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                <span>SELECT</span>
                                                <ChevronDown size={14} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-8 py-10 flex justify-between items-center border-t border-slate-50 bg-slate-50/20">
                    <span className="text-[11px] font-bold text-slate-400 italic">Showing 1 to 2 of 2 entries</span>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronLeft size={16} /></div>
                        <div className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center text-[12px] font-black shadow-lg shadow-primary/40 active:scale-90 transition-all cursor-pointer">1</div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronRight size={16} /></div>
                    </div>
                </div>
            </Card>

            <div className="fixed right-6 top-64 flex flex-col space-y-2 z-50">
                {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                    <div key={idx} className="w-10 h-10 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 rounded-lg flex items-center justify-center shadow-lg transition-all cursor-pointer">
                        <Icon size={18} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// 16. Course Category (Image 1)
export const CourseCategory = () => {
    const categories = [
        { sl: 1, title: "Academic", image: "https://via.placeholder.com/100x60" },
        { sl: 2, title: "Personal Development", image: "https://via.placeholder.com/100x60" },
        { sl: 3, title: "Professional Development", image: "https://via.placeholder.com/100x60" },
        { sl: 4, title: "Technical Skills", image: "https://via.placeholder.com/100x60" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Course Category" section="Frontend CMS" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-4">
                    <Card className="p-10 border-none shadow-sm bg-white rounded-2xl">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12">Add Category</h2>
                        <div className="space-y-10">
                            <div className="space-y-3">
                                <Label required>CATEGORY NAME</Label>
                                <input type="text" placeholder="Category Name *" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                            </div>
                            <div className="space-y-3">
                                <Label required>CATEGORY IMAGE</Label>
                                <div className="flex">
                                    <input type="text" placeholder="Image" className="flex-1 bg-white border border-slate-200 border-r-0 rounded-l-lg px-4 py-3 text-[12px] font-medium text-slate-400 outline-none h-[52px]" />
                                    <Button className="bg-[#7c32ff] text-white rounded-r-lg px-6 py-2 text-[10px] font-black uppercase tracking-widest h-[52px]">BROWSE</Button>
                                </div>
                            </div>
                            <div className="pt-6">
                                <Button className="w-24 bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl py-3 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center justify-center space-x-2">
                                    <Check size={14} />
                                    <span>SAVE</span>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Category List */}
                <div className="lg:col-span-8">
                    <Card className="p-0 border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden">
                        <div className="p-10 pb-4 flex justify-between items-center">
                            <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Course Category List</h2>
                            <div className="flex space-x-4 items-center">
                                <div className="flex items-center bg-slate-50 rounded-xl px-5 py-2.5 w-64 border border-slate-100 focus-within:border-primary/30 transition-all shadow-inner-sm">
                                    <Search size={18} className="text-slate-300 mr-2" />
                                    <input type="text" placeholder="SEARCH" className="bg-transparent border-none outline-none text-[12px] font-black tracking-widest text-slate-700 w-full placeholder:text-slate-200 uppercase italic" />
                                </div>
                                <div className="flex items-center space-x-1 bg-white border border-primary/20 rounded-full px-4 py-2 shadow-sm">
                                    {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                                        <Icon key={idx} size={14} className="text-primary hover:scale-110 transition-transform cursor-pointer mx-1" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-2">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">
                                            <ArrowUpDown size={12} className="inline mr-2" />Category Title
                                        </th>
                                        <th className="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">
                                            <ArrowUpDown size={12} className="inline mr-2" />Image
                                        </th>
                                        <th className="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">
                                            <ArrowUpDown size={12} className="inline mr-2" />Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((cat, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/50 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-black text-slate-500 italic tracking-tight uppercase">{cat.title}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <div className="w-16 h-10 rounded border border-slate-100 overflow-hidden bg-slate-50">
                                                        <ImageIcon className="w-full h-full p-2 text-slate-200" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-10 flex justify-between items-center text-[11px] font-bold text-slate-400 italic border-t border-slate-50">
                            <span>Showing 1 to 4 of 4 entries</span>
                            <div className="flex space-x-2">
                                <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 hover:text-primary transition-all"><ChevronLeft size={16} /></button>
                                <button className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center font-black">1</button>
                                <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 hover:text-primary transition-all"><ChevronRight size={16} /></button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// 17. Course List
export const CourseList = () => {
    const courses = [
        { sl: 1, name: "Advanced Mathematics", category: "Science", price: "$100", duration: "6 Months", image: "https://via.placeholder.com/60x40" },
        { sl: 2, name: "Modern History", category: "Arts", price: "$80", duration: "4 Months", image: "https://via.placeholder.com/60x40" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Course List" section="Frontend CMS" />

            <div className="space-y-8">
                {/* Add Form */}
                <Card className="p-10 border-none shadow-sm bg-white rounded-2xl">
                    <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12">Add Course</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <Label required>TITLE</Label>
                                <input type="text" placeholder="Course Title *" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] shadow-inner-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label required>CATEGORY</Label>
                                    <div className="relative">
                                        <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] shadow-inner-sm appearance-none">
                                            <option>Select Category *</option>
                                            <option>Science</option>
                                            <option>Arts</option>
                                        </select>
                                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label required>IMAGE</Label>
                                    <div className="flex">
                                        <input type="text" placeholder="Choose Image *" className="flex-1 bg-slate-50 border border-slate-100 border-r-0 rounded-l-xl px-5 py-3.5 text-[12px] font-medium text-slate-400 outline-none h-[52px] shadow-inner-sm" />
                                        <Button className="bg-[#7c32ff] text-white rounded-r-xl px-8 py-2 text-[11px] font-black uppercase tracking-widest h-[52px] shadow-lg shadow-primary/20">BROWSE</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label required>PRICE</Label>
                                    <div className="relative">
                                        <input type="text" placeholder="Price *" className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] shadow-inner-sm" />
                                        <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label required>DURATION</Label>
                                    <div className="relative">
                                        <input type="text" placeholder="Course Duration *" className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] shadow-inner-sm" />
                                        <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label required>SUMMARY</Label>
                                <textarea rows={4} placeholder="Short Summary *" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all resize-none shadow-sm shadow-inner-sm" />
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <Label required>DESCRIPTION</Label>
                                <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 min-h-[300px] shadow-inner-sm relative group overflow-hidden">
                                    {/* Mocking Rich Text Editor with stylized text */}
                                    <div className="flex space-x-2 pb-4 border-b border-slate-200 mb-4 items-center opacity-60 group-hover:opacity-100 transition-all">
                                        {[LayoutPanelLeft, Save, Edit, Printer].map((Icon, idx) => (
                                            <div key={idx} className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 cursor-pointer shadow-sm"><Icon size={14} /></div>
                                        ))}
                                    </div>
                                    <p className="text-[12px] font-medium text-slate-300 italic">Type course description here...</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label>OUTCOMES</Label>
                                    <textarea rows={3} placeholder="Course Outcomes" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all resize-none shadow-sm shadow-inner-sm h-[130px]" />
                                </div>
                                <div className="space-y-3">
                                    <Label>REQUIREMENTS</Label>
                                    <textarea rows={3} placeholder="Course Requirements" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all resize-none shadow-sm shadow-inner-sm h-[130px]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 flex justify-center">
                        <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl px-16 py-4 text-[12px] font-black uppercase tracking-[0.3em] italic shadow-2xl shadow-primary/40 transition-all active:scale-95 flex items-center space-x-3">
                            <Plus size={20} />
                            <span>SAVE COURSE</span>
                        </Button>
                    </div>
                </Card>

                {/* Course List */}
                <div className="lg:col-span-8">
                    <Card className="p-0 border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden">
                        <div className="p-10 pb-4 flex justify-between items-center">
                            <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Courses Offered</h2>
                            <div className="flex items-center bg-slate-50 rounded-xl px-5 py-2.5 w-64 border border-slate-100 focus-within:border-primary/30 transition-all shadow-inner-sm">
                                <Search size={18} className="text-slate-300 mr-2" />
                                <input type="text" placeholder="SEARCH" className="bg-transparent border-none outline-none text-[12px] font-black tracking-widest text-slate-700 w-full placeholder:text-slate-200 uppercase italic" />
                            </div>
                        </div>

                        <div className="p-2">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">SL</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">Title</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">Category</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">Price</th>
                                        <th className="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((item, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/50 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{item.sl}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-8 rounded bg-slate-100 overflow-hidden">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="text-[12px] font-black text-slate-700 italic tracking-tight uppercase line-clamp-1">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-[11px] font-bold text-slate-300 italic uppercase">{item.category}</td>
                                            <td className="px-8 py-6 text-[11px] font-black text-emerald-500 italic uppercase tracking-widest">{item.price}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// 18. Contact Message
export const ContactMessage = () => {
    const messages = [
        { name: "John Doe", email: "John@gmail.com", subject: "Scolify support", message: "Need help with integration", date: "22/02/2026" },
        { name: "Jane Smith", email: "Jane@gmail.com", subject: "Inquiry", message: "Fee structure query", date: "22/02/2026" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Contact Message" section="Frontend CMS" />

            <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden mt-8">
                <div className="p-8 pb-4 flex justify-between items-center border-l-4 border-primary ml-8 mt-4">
                    <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Contact Message</h2>
                    <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2 w-64 border border-slate-100 group focus-within:border-primary/30 transition-all shadow-inner-sm">
                        <Search size={16} className="text-slate-400 mr-2" />
                        <input type="text" placeholder="SEARCH" className="bg-transparent border-none outline-none text-[11px] font-bold text-slate-600 w-full placeholder:text-slate-300 uppercase italic" />
                    </div>
                </div>

                <div className="p-2">
                    <table className="w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Name</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Email</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Subject</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100"><ArrowUpDown size={12} className="inline mr-2" />Message</th>
                                <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((msg, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50/30 transition-all">
                                    <td className="px-8 py-6 text-[11px] font-black text-slate-500 uppercase italic tracking-tight">{msg.name}</td>
                                    <td className="px-8 py-6 text-[11px] font-medium text-slate-400 italic">{msg.email}</td>
                                    <td className="px-8 py-6 text-[11px] font-bold text-slate-500 italic uppercase tracking-tight">{msg.subject}</td>
                                    <td className="px-8 py-6 text-[11px] font-medium text-slate-500 italic max-w-xs truncate">{msg.message}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-center">
                                            <div className="w-8 h-8 rounded-full bg-[#7c32ff]/10 text-[#7c32ff] flex items-center justify-center hover:bg-[#7c32ff] hover:text-white transition-all cursor-pointer shadow-sm active:scale-90">
                                                <Edit size={14} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-8 py-10 flex justify-between items-center border-t border-slate-50 bg-slate-50/20">
                    <span className="text-[11px] font-bold text-slate-400 italic">Showing 1 to 2 of 2 entries</span>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronLeft size={16} /></div>
                        <div className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center text-[12px] font-black shadow-lg shadow-primary/40 active:scale-90 transition-all cursor-pointer">1</div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronRight size={16} /></div>
                    </div>
                </div>
            </Card>

            <div className="fixed right-6 top-64 flex flex-col space-y-2 z-50">
                {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                    <div key={idx} className="w-10 h-10 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 rounded-lg flex items-center justify-center shadow-lg transition-all cursor-pointer">
                        <Icon size={18} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// 19. Speech Slider (Image 2)
export const SpeechSlider = () => {
    const speeches = [
        { sl: 1, name: "Genoveva Lebeack", designation: "Principal", title: "A Heartfelt Message from the Principal: A Journey of Heart and Hope at infixEDU School", image: "https://via.placeholder.com/60x60" },
        { sl: 2, name: "Joseph Forster", designation: "Vice Principal", title: "A Message from the Vice Principal: Nurturing Brilliance, Inspiring Excellence at infixEDU School", image: "https://via.placeholder.com/60x60" },
        { sl: 3, name: "Jaydon Kunde", designation: "Founder", title: "A Message from Our Founder, Jaydon Kunde: Nurturing Dreams, Inspiring Futures", image: "https://via.placeholder.com/60x60" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Speech Slider" section="Front Settings" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-4">
                    <Card className="p-10 border-none shadow-sm bg-white rounded-2xl">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12">Speech Slider</h2>
                        <div className="space-y-10">
                            <div className="space-y-3">
                                <Label required>NAME</Label>
                                <input type="text" placeholder="Name *" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                            </div>
                            <div className="space-y-3">
                                <Label required>DESIGNATION</Label>
                                <input type="text" placeholder="Designation *" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                            </div>
                            <div className="space-y-3">
                                <Label>TITLE</Label>
                                <input type="text" placeholder="Title" className="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                            </div>
                            <div className="space-y-3">
                                <Label required>SPEECH</Label>
                                <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 min-h-[200px] shadow-inner-sm relative group overflow-hidden">
                                    <div className="flex space-x-2 pb-4 border-b border-slate-200 mb-4 items-center opacity-60">
                                        {[LayoutPanelLeft, Save, Edit, Printer].map((Icon, idx) => (
                                            <div key={idx} className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 cursor-pointer shadow-sm"><Icon size={14} /></div>
                                        ))}
                                    </div>
                                    <p className="text-[12px] font-medium text-slate-300 italic">Enter the speech content here...</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label required>IMAGE</Label>
                                <div className="flex">
                                    <input type="text" placeholder="Image *" className="flex-1 bg-white border border-slate-200 border-r-0 rounded-l-lg px-4 py-3 text-[12px] font-medium text-slate-400 outline-none h-[52px]" />
                                    <Button className="bg-[#7c32ff] text-white rounded-r-lg px-6 py-2 text-[10px] font-black uppercase tracking-widest h-[52px]">BROWSE</Button>
                                </div>
                                <p className="text-[10px] text-primary italic font-medium">(Jpg,png,jpeg,pdf are allowed for upload)</p>
                            </div>
                            <div className="pt-6">
                                <Button className="w-24 bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl py-3 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all">
                                    ADD
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Speech List */}
                <div className="lg:col-span-8">
                    <Card className="p-0 border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden">
                        <div className="p-10 pb-4 flex justify-between items-center">
                            <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase">Speech Slider List</h2>
                        </div>

                        <div className="p-2">
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">SL</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">Name</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">Designation</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">Title</th>
                                        <th className="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">Image</th>
                                        <th className="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {speeches.map((sp, idx) => (
                                        <tr key={idx} className="group hover:bg-slate-50/50 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{sp.sl}</td>
                                            <td className="px-8 py-6 text-[11px] font-black text-slate-500 italic uppercase tracking-tight">{sp.name}</td>
                                            <td className="px-8 py-6 text-[11px] font-bold text-slate-400 italic uppercase">{sp.designation}</td>
                                            <td className="px-8 py-6 text-[11px] font-medium text-slate-500 italic line-clamp-2 max-w-[200px]">{sp.title}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <div className="w-10 h-10 rounded shadow-sm border border-white overflow-hidden">
                                                        <img src={sp.image} alt={sp.name} className="w-full h-full object-cover" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-center">
                                                    <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// 20. Header Menu
export const HeaderMenu = () => {
    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Add Header Menu" section="Frontend CMS" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Accordion Section */}
                <div className="lg:col-span-4 space-y-4">
                    <Card className="p-6 border-none shadow-sm bg-white rounded-2xl">
                        <div className="flex justify-between items-center cursor-pointer group">
                            <h3 className="text-[11px] font-black text-slate-700 uppercase tracking-widest italic">Static Pages</h3>
                            <ChevronDown size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                        </div>
                    </Card>
                    <Card className="p-6 border-none shadow-sm bg-white rounded-2xl">
                        <div className="flex justify-between items-center cursor-pointer group">
                            <h3 className="text-[11px] font-black text-slate-700 uppercase tracking-widest italic">Custom Links</h3>
                            <Plus size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                        </div>
                    </Card>
                </div>

                {/* Right: Menu Tree Section */}
                <div className="lg:col-span-8">
                    <Card className="p-10 border-none shadow-sm bg-white rounded-2xl min-h-[600px]">
                        <h2 className="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12">Menu List</h2>
                        <div className="space-y-4">
                            {['ABOUT', 'ADMISSIONS', 'ACADEMICS', 'STUDENT LIFE'].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-xl group hover:border-primary/20 transition-all shadow-sm">
                                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest italic">{item}</span>
                                    <div className="flex space-x-2">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 cursor-pointer shadow-sm transition-all"><Edit size={14} /></div>
                                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-100 cursor-pointer shadow-sm transition-all"><Trash2 size={14} /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// 21. Pages (CMS Pages)
export const Pages = () => {
    const pageItems = [
        { title: "Privacy Policy", subtitle: "Last updated on 22/02/2026" },
        { title: "Terms and Conditions", subtitle: "Last updated on 22/02/2026" },
    ];

    return (
        <div className="p-6 bg-[#f8fafc] min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <SectionHeader title="Pages" section="Frontend CMS" />
                <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl px-8 py-2.5 text-[10px] font-black uppercase tracking-widest italic shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center space-x-2">
                    <Plus size={16} />
                    <span>ADD</span>
                </Button>
            </div>

            <Card className="p-0 border-none shadow-sm bg-white rounded-2xl overflow-hidden mt-8">
                <div className="p-2">
                    <table className="w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-12 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} className="inline mr-2" />Title</th>
                                <th className="px-12 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} className="inline mr-2" />Sub Title</th>
                                <th className="px-12 py-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageItems.map((item, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50/30 transition-all border-b border-slate-50">
                                    <td className="px-12 py-8 text-[12px] font-black text-slate-600 uppercase italic tracking-tight">{item.title}</td>
                                    <td className="px-12 py-8 text-[11px] font-bold text-slate-400 italic">{item.subtitle}</td>
                                    <td className="px-12 py-8">
                                        <div className="flex justify-center">
                                            <Button className="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-90">
                                                <span>SELECT</span>
                                                <ChevronDown size={14} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-12 py-10 flex justify-between items-center border-t border-slate-50 bg-slate-50/20">
                    <span className="text-[11px] font-bold text-slate-400 italic">Showing 1 to 2 of 2 entries</span>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronLeft size={16} /></div>
                        <div className="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center text-[12px] font-black shadow-lg shadow-primary/40 active:scale-90 transition-all cursor-pointer">1</div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed transition-all"><ChevronRight size={16} /></div>
                    </div>
                </div>
            </Card>

            <div class="fixed right-6 top-64 flex flex-col space-y-2 z-50">
                {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                    <div key={idx} class="w-10 h-10 bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 rounded-lg flex items-center justify-center shadow-lg transition-all cursor-pointer">
                        <Icon size={18} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// 22. Donor (Image 3)
export const Donor = () => {
    const donorList = [
        { sl: 1, name: "Abdur Rahman", profession: "Doctor", email: "abdurrahman@infixedu.com", mobile: "+88012345678", image: "https://via.placeholder.com/40x40" },
        { sl: 2, name: "Md Rahim", profession: "Farmer", email: "rahim@infixedu.com", mobile: "+88099887766", image: "https://via.placeholder.com/40x40" },
        { sl: 3, name: "Md Malek", profession: "Engineer", email: "malek@infixedu.com", mobile: "+88011223344", image: "https://via.placeholder.com/40x40" },
    ];

    return (
        <div class="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Donor" section="Front Settings" />

            <Card class="p-10 border-none shadow-sm bg-white rounded-[2rem] mb-12">
                <h2 class="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12">Donor</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                    <div class="space-y-3">
                        <Label required>NAME</Label>
                        <input type="text" placeholder="Name *" class="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                    </div>
                    <div class="space-y-3">
                        <Label>PROFESSION</Label>
                        <input type="text" placeholder="Profession" class="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                    </div>
                    <div class="space-y-3">
                        <Label>DATE OF BIRTH</Label>
                        <div class="relative">
                            <input type="text" placeholder="02/22/2026" class="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                            <Calendar size={18} class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        </div>
                    </div>
                    <div class="space-y-3">
                        <Label>EMAIL</Label>
                        <input type="email" placeholder="Email" class="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                    </div>
                    <div class="space-y-3">
                        <Label>MOBILE</Label>
                        <input type="text" placeholder="Mobile" class="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                    </div>
                    <div class="space-y-3">
                        <Label>PHOTO</Label>
                        <div class="flex">
                            <input type="text" placeholder="Photo" class="flex-1 bg-white border border-slate-200 border-r-0 rounded-l-lg px-4 py-3 text-[12px] font-medium text-slate-400 outline-none h-[52px]" />
                            <Button class="bg-[#7c32ff] text-white rounded-r-lg px-6 py-2 text-[10px] font-black uppercase tracking-widest h-[52px]">BROWSE</Button>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <Label>AGE</Label>
                        <input type="text" placeholder="Age" class="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                    </div>
                    <div class="space-y-3">
                        <Label>Show Public</Label>
                        <div class="flex space-x-6 h-[52px] items-center">
                            <RadioToggle label="Show Public" value="show" name="show_public" checked={false} onChange={() => { }} />
                            <RadioToggle label="Do Not Show Public" value="hide" name="show_public" checked={true} onChange={() => { }} />
                        </div>
                    </div>
                    <div class="space-y-3">
                        <Label>GENDER</Label>
                        <div class="relative">
                            <select class="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] appearance-none">
                                <option>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <ChevronDown size={18} class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        </div>
                    </div>
                    <div class="space-y-3">
                        <Label>BLOOD GROUP</Label>
                        <div class="relative">
                            <select class="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] appearance-none">
                                <option>Blood Group</option>
                                <option>A+</option>
                                <option>B+</option>
                            </select>
                            <ChevronDown size={18} class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        </div>
                    </div>
                    <div class="space-y-3 lg:col-span-1">
                        <Label>RELIGION</Label>
                        <div class="relative">
                            <select class="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] appearance-none">
                                <option>Religion</option>
                                <option>Islam</option>
                                <option>Christianity</option>
                            </select>
                            <ChevronDown size={18} class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        </div>
                    </div>
                    <div class="space-y-3 lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div class="space-y-3">
                            <Label>CURRENT ADDRESS</Label>
                            <textarea rows={3} placeholder="Current Address" class="w-full bg-white border border-slate-200 rounded-lg px-5 py-4 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all resize-none shadow-sm" />
                        </div>
                        <div class="space-y-3">
                            <Label>PERMANENT ADDRESS</Label>
                            <textarea rows={3} placeholder="Permanent Address" class="w-full bg-white border border-slate-200 rounded-lg px-5 py-4 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all resize-none shadow-sm" />
                        </div>
                    </div>
                </div>
                <div class="pt-8 flex justify-center">
                    <Button class="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl px-10 py-3 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all">
                        ADD
                    </Button>
                </div>
            </Card>

            <Card class="p-0 border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden">
                <div class="p-10 pb-4 flex justify-between items-center">
                    <h2 class="text-sm font-black text-slate-700 tracking-widest italic uppercase">Donor List</h2>
                    <div class="flex space-x-4 items-center">
                        <div class="flex items-center bg-slate-50 rounded-xl px-5 py-2.5 w-64 border border-slate-100 focus-within:border-primary/30 transition-all shadow-inner-sm">
                            <Search size={18} class="text-slate-300 mr-2" />
                            <input type="text" placeholder="SEARCH" class="bg-transparent border-none outline-none text-[12px] font-black tracking-widest text-slate-700 w-full placeholder:text-slate-200 uppercase italic" />
                        </div>
                        <div class="flex items-center space-x-1 bg-white border border-primary/20 rounded-full px-4 py-2 shadow-sm">
                            {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                                <Icon key={idx} size={14} class="text-primary hover:scale-110 transition-transform cursor-pointer mx-1" />
                            ))}
                        </div>
                    </div>
                </div>

                <div class="p-2">
                    <table class="w-full border-separate border-spacing-0">
                        <thead>
                            <tr class="bg-slate-50/50">
                                <th class="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} class="inline mr-2" />SL</th>
                                <th class="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} class="inline mr-2" />Name</th>
                                <th class="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} class="inline mr-2" />Profession</th>
                                <th class="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} class="inline mr-2" />Email</th>
                                <th class="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} class="inline mr-2" />Mobile</th>
                                <th class="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} class="inline mr-2" />Image</th>
                                <th class="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} class="inline mr-2" />Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donorList.map((item, idx) => (
                                <tr key={idx} class="group hover:bg-slate-50/50 transition-all">
                                    <td class="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{item.sl}</td>
                                    <td class="px-8 py-6 text-[11px] font-black text-slate-500 italic uppercase tracking-tight">{item.name}</td>
                                    <td class="px-8 py-6 text-[11px] font-bold text-slate-400 italic uppercase">{item.profession}</td>
                                    <td class="px-8 py-6 text-[11px] font-medium text-slate-400 italic">{item.email}</td>
                                    <td class="px-8 py-6 text-[11px] font-medium text-slate-500 italic">{item.mobile}</td>
                                    <td class="px-8 py-6">
                                        <div class="flex justify-center">
                                            <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                                                <img src={item.image} class="w-full h-full object-cover" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-8 py-6">
                                        <div class="flex justify-center">
                                            <Button class="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                <span>SELECT</span>
                                                <ChevronDown size={14} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div class="p-10 flex justify-between items-center text-[11px] font-bold text-slate-400 italic border-t border-slate-50 bg-slate-50/10">
                    <span>Showing 1 to 3 of 3 entries</span>
                    <div class="flex space-x-2">
                        <button class="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-primary hover:border-primary/20 transition-all"><ChevronLeft size={16} /></button>
                        <button class="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center font-black shadow-lg shadow-primary/20">1</button>
                        <button class="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-primary hover:border-primary/20 transition-all"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

// 23. Form Download (Image 4)
export const FormDownload = () => {
    const forms = [
        { sl: 1, title: "Exam Routine", desc: "Exam Routine", date: "02/22/2026", status: "SHOWN" },
        { sl: 2, title: "Class Routine", desc: "Class Routine", date: "02/22/2026", status: "SHOWN" },
        { sl: 3, title: "Open An Bank Account Routine", desc: "Open An Bank Account Routine", date: "02/22/2026", status: "SHOWN" },
    ];

    return (
        <div class="p-6 bg-[#f8fafc] min-h-screen">
            <SectionHeader title="Form Download" section="Front Settings" />

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Add Form */}
                <div class="lg:col-span-4">
                    <Card class="p-10 border-none shadow-sm bg-white rounded-2xl">
                        <h2 class="text-sm font-black text-slate-700 tracking-widest italic uppercase mb-12">Form Download</h2>
                        <div class="space-y-10">
                            <div class="space-y-3">
                                <Label required>TITLE</Label>
                                <input type="text" placeholder="Title *" class="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                            </div>
                            <div class="space-y-3">
                                <Label required>SHORT DESCRIPTION</Label>
                                <textarea rows={4} placeholder="Short Description *" class="w-full bg-white border border-slate-200 rounded-lg px-5 py-4 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all resize-none shadow-sm h-[120px]" />
                            </div>
                            <div class="space-y-3">
                                <Label required>PUBLISH DATE</Label>
                                <div class="relative">
                                    <input type="text" placeholder="02/23/2026" class="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                                    <Calendar size={18} class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                </div>
                            </div>
                            <div class="space-y-3">
                                <Label>CONTENT TYPE</Label>
                                <div class="relative">
                                    <select class="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px] appearance-none">
                                        <option>Link</option>
                                        <option>File Upload</option>
                                    </select>
                                    <ChevronDown size={18} class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                </div>
                            </div>
                            <div class="space-y-3">
                                <Label required>LINK</Label>
                                <input type="text" placeholder="Link *" class="w-full bg-white border border-slate-200 rounded-lg px-5 py-3.5 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[52px]" />
                            </div>
                            <div class="space-y-3">
                                <Label>Show Public</Label>
                                <div class="flex flex-col space-y-3 pt-2">
                                    <RadioToggle label="Show Public" value="show" name="show_public" checked={false} onChange={() => { }} />
                                    <RadioToggle label="Do Not Show Public" value="hide" name="show_public" checked={true} onChange={() => { }} />
                                </div>
                            </div>
                            <div class="pt-6">
                                <Button class="w-24 bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-xl py-3 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all">
                                    SAVE
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Form List */}
                <div class="lg:col-span-8">
                    <Card class="p-0 border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden">
                        <div class="p-10 pb-4 flex justify-between items-center">
                            <h2 class="text-sm font-black text-slate-700 tracking-widest italic uppercase">Form Download List</h2>
                            <div class="flex space-x-4 items-center">
                                <Search size={18} class="text-slate-300" />
                                <input type="text" placeholder="SEARCH" class="bg-transparent border-none outline-none text-[12px] font-black tracking-widest text-slate-700 w-full placeholder:text-slate-200 uppercase italic" />
                                <div class="flex items-center space-x-1 bg-white border border-primary/20 rounded-full px-4 py-2 shadow-sm">
                                    {[Copy, FileText, FileSpreadsheet, FileSpreadsheet, Printer, Monitor].map((Icon, idx) => (
                                        <Icon key={idx} size={14} class="text-primary hover:scale-110 transition-transform cursor-pointer mx-1" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div class="p-2">
                            <table class="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr class="bg-slate-50/50">
                                        <th class="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} class="inline mr-2" />SL</th>
                                        <th class="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} class="inline mr-2" />Title</th>
                                        <th class="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} class="inline mr-2" />Short Description</th>
                                        <th class="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} class="inline mr-2" />Publish Date</th>
                                        <th class="px-8 py-5 text-left text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} class="inline mr-2" />Show Public</th>
                                        <th class="px-8 py-5 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-100 italic"><ArrowUpDown size={12} class="inline mr-2" />Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {forms.map((item, idx) => (
                                        <tr key={idx} class="group hover:bg-slate-50/50 transition-all">
                                            <td class="px-8 py-6 text-[12px] font-bold text-slate-400 italic">{item.sl}</td>
                                            <td class="px-8 py-6 text-[11px] font-black text-slate-500 italic uppercase tracking-tight">{item.title}</td>
                                            <td class="px-8 py-6 text-[11px] font-medium text-slate-400 italic">{item.desc}</td>
                                            <td class="px-8 py-6 text-[11px] font-bold text-slate-400 italic uppercase">{item.date}</td>
                                            <td class="px-8 py-6 text-[11px] font-medium text-slate-500 italic uppercase tracking-tight">
                                                <span class="bg-emerald-500 text-white px-3 py-1 rounded text-[10px] font-black italic">{item.status}</span>
                                            </td>
                                            <td class="px-8 py-6">
                                                <div class="flex justify-center">
                                                    <Button class="bg-white border-2 border-[#7c32ff] text-[#7c32ff] hover:bg-[#7c32ff] hover:text-white rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-sm active:scale-95">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={14} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div class="p-10 flex justify-between items-center text-[11px] font-bold text-slate-400 italic border-t border-slate-50">
                            <span>Showing 1 to 3 of 3 entries</span>
                            <div class="flex space-x-2">
                                <button class="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-primary transition-all"><ChevronLeft size={16} /></button>
                                <button class="w-8 h-8 rounded-lg bg-[#7c32ff] text-white flex items-center justify-center font-black">1</button>
                                <button class="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-primary transition-all"><ChevronRight size={16} /></button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
