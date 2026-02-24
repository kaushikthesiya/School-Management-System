import React, { useState } from 'react';
import { Card, Button, Input } from '../../../components/SnowUI';
import {
    CheckCircle2,
    Image as ImageIcon,
    Upload
} from 'lucide-react';

const WhatsAppSettings = () => {
    const [settings, setSettings] = useState({
        color: '#25D366',
        introductionText: 'Our customer support team is here to answer your questions. Ask us anything!',
        welcomeMessage: 'Hi, How can I help?',
        agentType: 'single',
        availability: 'both',
        showingPage: 'all',
        popupOpenInitially: 'no',
        showUnavailableInPopup: 'yes',
        homePageUrl: 'https://infixedu.ischooll.com',
        primaryNumber: '+96897002784',
        bubbleLogo: 'Image',
        layout: 'layout1'
    });

    const RadioGroup = ({ label, name, options, value, onChange }) => (
        <div className="flex flex-col space-y-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
            <div className="flex space-x-6 mt-2">
                {options.map((opt) => (
                    <label key={opt.value} className="flex items-center space-x-2 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                            <input
                                type="radio"
                                name={name}
                                value={opt.value}
                                checked={value === opt.value}
                                onChange={(e) => onChange(name, e.target.value)}
                                className="peer appearance-none w-4 h-4 rounded-full border-2 border-slate-200 checked:border-primary transition-all"
                            />
                            <div className="absolute w-2 h-2 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform" />
                        </div>
                        <span className={`text-[11px] font-bold transition-colors ${value === opt.value ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-600'}`}>
                            {opt.label}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );

    const handleUpdate = (section) => {
        console.log(`Updating ${section}...`);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-slate-50">
                <h1 className="text-xl font-black text-slate-800 tracking-tight">Settings</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">WhatsApp Support</span>
                    <span>|</span>
                    <span className="text-slate-500">Settings</span>
                </div>
            </div>

            {/* General Settings Section */}
            <Card className="p-8 border-none shadow-snow-lg bg-white rounded-2xl">
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest mb-8">Settings</h3>

                <div className="space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">COLOR</span>
                        <div className="w-full h-10 rounded-xl bg-[#25D366] border border-slate-100 shadow-inner" />
                    </div>

                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">INTRODUCTION TEXT</span>
                        <input
                            value={settings.introductionText}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:border-primary transition-all shadow-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WELCOME MESSAGE</span>
                        <input
                            value={settings.welcomeMessage}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:border-primary transition-all shadow-sm"
                        />
                    </div>

                    <Button className="bg-primary hover:bg-primary-dark text-white rounded-xl px-8 py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 active:scale-95 transition-all shadow-lg shadow-primary/20">
                        <CheckCircle2 size={14} />
                        <span>UPDATE</span>
                    </Button>
                </div>
            </Card>

            {/* Functional Settings Section */}
            <Card className="p-8 border-none shadow-snow-lg bg-white rounded-2xl">
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest mb-8">Functional Settings</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-20">
                    <RadioGroup
                        label="AGENT TYPE"
                        name="agentType"
                        value={settings.agentType}
                        options={[{ label: 'Multiple Agent', value: 'multiple' }, { label: 'Single Agent', value: 'single' }]}
                        onChange={(n, v) => setSettings(p => ({ ...p, [n]: v }))}
                    />
                    <RadioGroup
                        label="AVAILABILITY"
                        name="availability"
                        value={settings.availability}
                        options={[{ label: 'Only Mobile', value: 'mobile' }, { label: 'Only Desktop', value: 'desktop' }, { label: 'Both', value: 'both' }]}
                        onChange={(n, v) => setSettings(p => ({ ...p, [n]: v }))}
                    />
                    <RadioGroup
                        label="SHOWING PAGE"
                        name="showingPage"
                        value={settings.showingPage}
                        options={[{ label: 'Only Home Page', value: 'home' }, { label: 'All Page', value: 'all' }]}
                        onChange={(n, v) => setSettings(p => ({ ...p, [n]: v }))}
                    />
                    <RadioGroup
                        label="POPUP OPEN INITIALLY"
                        name="popupOpenInitially"
                        value={settings.popupOpenInitially}
                        options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]}
                        onChange={(n, v) => setSettings(p => ({ ...p, [n]: v }))}
                    />
                    <RadioGroup
                        label="SHOW UNAVAILABLE AGENT IN POPUP"
                        name="showUnavailableInPopup"
                        value={settings.showUnavailableInPopup}
                        options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]}
                        onChange={(n, v) => setSettings(p => ({ ...p, [n]: v }))}
                    />

                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">HOME PAGE URL</span>
                        <input
                            value={settings.homePageUrl}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:border-primary transition-all shadow-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PRIMARY NUMBER <span className="text-red-400">(WITH COUNTRY CODE IS MUST)</span></span>
                        <input
                            value={settings.primaryNumber}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:border-primary transition-all shadow-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WHATSAPP BUBBLE LOGO</span>
                        <div className="flex bg-slate-50/50 border border-slate-100 rounded-xl overflow-hidden shadow-inner font-bold">
                            <input
                                value={settings.bubbleLogo}
                                className="flex-1 bg-transparent px-4 py-3 text-xs font-medium text-slate-400 outline-none"
                                readOnly
                            />
                            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center space-x-2">
                                <span>BROWSE</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <Button className="bg-primary hover:bg-primary-dark text-white rounded-xl px-8 py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 active:scale-95 transition-all shadow-lg shadow-primary/20">
                        <CheckCircle2 size={14} />
                        <span>UPDATE</span>
                    </Button>
                </div>
            </Card>

            {/* Layout Setting Section */}
            <Card className="p-8 border-none shadow-snow-lg bg-white rounded-2xl">
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest mb-8">Layout Setting</h3>

                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-6">CHOOSE LAYOUT</span>

                <div className="flex flex-wrap gap-10">
                    {/* Layout Option 1 */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative cursor-pointer group" onClick={() => setSettings(p => ({ ...p, layout: 'layout1' }))}>
                            <div className={`w-48 h-64 border-2 rounded-2xl overflow-hidden shadow-sm transition-all flex flex-col ${settings.layout === 'layout1' ? 'border-primary ring-4 ring-primary/10' : 'border-slate-100 group-hover:border-slate-200'}`}>
                                <div className="h-2/5 bg-[#4ADE80] p-4 flex flex-col items-center justify-center space-y-2">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-sm">
                                        <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center">
                                            <ImageIcon size={16} className="text-slate-300" />
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-white font-bold text-center leading-tight">Our customer support team is here to answer your questions...</span>
                                </div>
                                <div className="p-4 space-y-4 flex-1 bg-white">
                                    <div className="bg-slate-50 rounded-lg p-2 mr-6 shadow-sm border border-slate-50">
                                        <div className="h-1 w-12 bg-yellow-400 rounded-full mb-1" />
                                        <div className="h-2 w-full bg-slate-200 rounded-full" />
                                    </div>
                                    <div className="mt-8 h-10 border border-slate-100 rounded-lg text-[10px] flex items-center px-2 text-slate-300 bg-slate-50/30">
                                        ...
                                    </div>
                                </div>
                            </div>
                            {settings.layout === 'layout1' && (
                                <div className="absolute top-2 left-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                    <CheckCircle2 size={12} className="text-white" />
                                </div>
                            )}
                        </div>
                        <input type="radio" checked={settings.layout === 'layout1'} readOnly className="appearance-none w-4 h-4 rounded-full border-2 border-slate-200 checked:border-primary transition-all relative after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:bg-primary after:rounded-full after:scale-0 checked:after:scale-100" />
                    </div>

                    {/* Layout Option 2 */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative cursor-pointer group" onClick={() => setSettings(p => ({ ...p, layout: 'layout2' }))}>
                            <div className={`w-48 h-64 border-2 rounded-2xl overflow-hidden shadow-sm transition-all flex flex-col bg-slate-50 ${settings.layout === 'layout2' ? 'border-primary ring-4 ring-primary/10' : 'border-slate-100 group-hover:border-slate-200'}`}>
                                <div className="m-4 bg-[#25D366] p-4 rounded-xl flex flex-col items-center justify-center space-y-2 shadow-md">
                                    <span className="text-[10px] text-white font-bold text-center leading-tight">Our customer support team is here...</span>
                                </div>
                                <div className="mx-4 p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                                    <div className="h-2 w-1/2 bg-slate-200 rounded-full" />
                                </div>
                                <div className="mt-auto m-4 h-10 border border-slate-100 rounded-xl text-[10px] flex items-center px-3 text-slate-300 bg-white shadow-sm">
                                    <div className="flex-1" />
                                    <div className="w-1 h-3 rotate-45 border-r border-b border-primary/40 mr-1" />
                                </div>
                            </div>
                            {settings.layout === 'layout2' && (
                                <div className="absolute top-2 left-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                    <CheckCircle2 size={12} className="text-white" />
                                </div>
                            )}
                        </div>
                        <input type="radio" checked={settings.layout === 'layout2'} readOnly className="appearance-none w-4 h-4 rounded-full border-2 border-slate-200 checked:border-primary transition-all relative after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:bg-primary after:rounded-full after:scale-0 checked:after:scale-100" />
                    </div>
                </div>

                <div className="mt-12">
                    <Button className="bg-primary hover:bg-primary-dark text-white rounded-xl px-8 py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 active:scale-95 transition-all shadow-lg shadow-primary/20">
                        <CheckCircle2 size={14} />
                        <span>UPDATE</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default WhatsAppSettings;
