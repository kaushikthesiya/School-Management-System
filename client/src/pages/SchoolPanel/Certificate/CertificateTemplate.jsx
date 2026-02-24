import React, { useState } from 'react';
import {
    Plus, ChevronDown, LayoutGrid, Trash2, Edit, Printer, FileText, Download, Search, Image as ImageIcon,
    Settings, Eye, RotateCcw, Palette
} from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';

// --- Sub-Components ---

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
    <div className="space-y-2">
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

const FileUpload = ({ label, required, helpText }) => (
    <div className="space-y-2">
        {label && (
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <div className="flex items-center space-x-2">
            <div className="flex-1 bg-white border border-slate-200 rounded-xl px-4 h-[46px] flex items-center text-xs text-slate-300 italic shadow-sm">
                No File Chosen
            </div>
            <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                BROWSE
            </Button>
        </div>
        {helpText && <p className="text-[9px] text-slate-400 italic mt-1 ml-1">{helpText}</p>}
    </div>
);

// --- Main Pages ---

const ListView = ({ templates, onAdd, onEdit, onDesign, onDelete }) => {
    const [openActionId, setOpenActionId] = useState(null);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Certificate Templates</h1>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                        <span>|</span>
                        <span className="hover:text-primary cursor-pointer transition-colors">Certificate</span>
                        <span>|</span>
                        <span className="text-slate-500">Certificate Templates</span>
                    </div>
                    <Button
                        onClick={onAdd}
                        className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-6 py-2 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
                    >
                        <Plus size={14} strokeWidth={3} />
                        <span>ADD</span>
                    </Button>
                </div>
            </div>

            {/* Content Card */}
            <div className="px-4 pb-20">
                <Card className="p-8 border-none shadow-snow-lg bg-white rounded-3xl overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">
                            Certificate Templates List
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="relative group flex-1 md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={14} strokeWidth={3} />
                                <input
                                    type="text"
                                    placeholder="SEARCH"
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
                                        ↓ NAME
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ USER TYPE
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ PAGE LAYOUT
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ BACKGROUND
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ STATUS
                                    </th>
                                    <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest last:rounded-r-2xl">
                                        ↓ ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {templates.map((template) => (
                                    <tr key={template.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-bold text-slate-600">{template.name}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-medium text-slate-400">{template.userType}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className="text-xs font-medium text-slate-400">{template.layout}</span>
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="w-20 h-12 rounded-lg border border-slate-200 overflow-hidden shadow-sm bg-slate-50 flex items-center justify-center p-1">
                                                <img
                                                    src={template.bg}
                                                    alt="Template"
                                                    className="w-full h-full object-cover rounded-md opacity-80"
                                                />
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 cursor-pointer ${template.status ? 'bg-primary' : 'bg-slate-200'}`}>
                                                <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${template.status ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </div>
                                        </td>
                                        <td className="py-6 px-6 text-right relative">
                                            <div className="relative inline-block">
                                                <button
                                                    onClick={() => setOpenActionId(openActionId === template.id ? null : template.id)}
                                                    className={`flex items-center space-x-2 bg-white border border-slate-200 rounded-full pl-6 pr-2 py-1.5 text-[10px] font-black transition-all group/btn shadow-sm active:scale-95 ${openActionId === template.id ? 'text-primary border-primary ring-4 ring-primary/5' : 'text-slate-400 hover:text-primary hover:border-primary'}`}
                                                >
                                                    <span className="uppercase tracking-widest">SELECT</span>
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${openActionId === template.id ? 'bg-primary text-white' : 'bg-slate-50 group-hover/btn:bg-primary/5'}`}>
                                                        <ChevronDown size={14} className={`transition-transform duration-300 ${openActionId === template.id ? 'rotate-180' : ''}`} />
                                                    </div>
                                                </button>

                                                {openActionId === template.id && (
                                                    <>
                                                        <div className="fixed inset-0 z-10" onClick={() => setOpenActionId(null)} />
                                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-50 py-2 z-20 animate-in zoom-in-95 duration-200 origin-top-right">
                                                            <button
                                                                onClick={() => { onEdit(template); setOpenActionId(null); }}
                                                                className="w-full px-5 py-3 text-left text-[10px] font-black text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors uppercase tracking-widest flex items-center space-x-3"
                                                            >
                                                                <Edit size={14} className="text-slate-300" />
                                                                <span>Edit</span>
                                                            </button>
                                                            <button
                                                                onClick={() => { onDesign(template); setOpenActionId(null); }}
                                                                className="w-full px-5 py-3 text-left text-[10px] font-black text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors uppercase tracking-widest flex items-center space-x-3"
                                                            >
                                                                <Palette size={14} className="text-slate-300" />
                                                                <span>Design</span>
                                                            </button>
                                                            <button
                                                                onClick={() => { onDelete(template.id); setOpenActionId(null); }}
                                                                className="w-full px-5 py-3 text-left text-[10px] font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest flex items-center space-x-3"
                                                            >
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

                    {/* Pagination */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10 px-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Showing 1 to 4 of 4 entries
                        </p>
                        <div className="flex items-center space-x-3">
                            <button className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm active:scale-90 disabled:opacity-50" disabled>
                                <ChevronDown size={14} className="rotate-90" />
                            </button>
                            <button className="w-10 h-10 rounded-2xl bg-primary text-white text-[10px] font-black shadow-xl shadow-primary/30 active:scale-90 transition-all">
                                1
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm active:scale-90 disabled:opacity-50" disabled>
                                <ChevronDown size={14} className="-rotate-90" />
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const CreateEditView = ({ template, onBack }) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">
                        {template ? 'Edit Certificate Template' : 'Create Certificate Template'}
                    </h1>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                        <span>|</span>
                        <span className="hover:text-primary cursor-pointer transition-colors">Certificate</span>
                        <span>|</span>
                        <span className="text-slate-500">Create Template</span>
                    </div>
                    <Button
                        onClick={onBack}
                        className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
                    >
                        <span>CERTIFICATE LIST</span>
                    </Button>
                </div>
            </div>

            <div className="px-4">
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px]">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-10">
                        Certificate Templates
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Input label="Name" placeholder="Certificate Name" required />
                        <Select
                            label="CERTIFICATE TYPE"
                            placeholder="Certificate Type"
                            options={['Student', 'Employee']}
                            required
                        />
                        <Select
                            label="PAGE LAYOUT"
                            placeholder="Page Layout"
                            options={['A4 (Landscape)', 'A4 (Portrait)', 'Custom']}
                            required
                        />

                        <Input label="Height(mm)" placeholder="Enter Height (mm)" required type="number" />
                        <Input label="Width(mm)" placeholder="Enter Width (mm)" required type="number" />
                        <Select
                            label="STATUS"
                            placeholder="Select Status"
                            options={['Active', 'Inactive']}
                            required
                        />

                        <Select
                            label="USER IMAGE SHAPE"
                            placeholder="User Image Shape"
                            options={['No Photo', 'Circular', 'Square']}
                        />
                        <Input label="User Image Size" placeholder="Photo Size (px)" type="number" />
                        <Input label="QR Code Size" placeholder="QR Code Size (px)" type="number" />

                        <FileUpload label="Background Image" required helpText="(3M,278,136px) are allowed for upload" />
                        <FileUpload label="Signature Image" helpText="(3M,278,136px) are allowed for upload" />
                        <FileUpload label="Logo Image" helpText="(3M,278,136px) are allowed for upload" />
                    </div>

                    <div className="mt-10 space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            BODY CONTENT <span className="text-red-500">*</span>
                        </label>
                        <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                            <div className="bg-slate-50/50 border-b border-slate-200 p-4 flex flex-wrap gap-4">
                                {['B', 'I', 'U', 'S'].map(text => (
                                    <button key={text} className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 hover:text-primary transition-colors">{text}</button>
                                ))}
                                <div className="w-px h-8 bg-slate-200" />
                                <Select placeholder="Poppins" options={['Poppins', 'Inter', 'Roboto']} className="h-8 py-0" />
                                <Select placeholder="13" options={['12', '13', '14', '16']} />
                            </div>
                            <textarea
                                className="w-full h-80 p-8 outline-none text-sm text-slate-600 resize-none font-medium leading-relaxed"
                                placeholder="Write certificate body content here..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex justify-center mt-12">
                        <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all">
                            <span>✓ SAVE TEMPLATE</span>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const DesignView = ({ template, onBack }) => {
    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Design Certificate Template</h1>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                        <span>|</span>
                        <span className="hover:text-primary cursor-pointer transition-colors">Certificate</span>
                        <span>|</span>
                        <span className="text-slate-500">Design Template</span>
                    </div>
                    <Button
                        onClick={onBack}
                        className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
                    >
                        <span>CERTIFICATE LIST</span>
                    </Button>
                </div>
            </div>

            <div className="px-4 grid grid-cols-1 gap-6">
                <div className="flex justify-between items-start px-2">
                    <div className="space-y-1">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Certificate Templates</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">A4 (Landscape) - (1122.52 x 793.70) px</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button className="bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl px-5 py-2 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all">
                            <Settings size={14} />
                            <span>ELEMENT STYLE</span>
                        </Button>
                        <Button className="bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl px-5 py-2 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all">
                            <RotateCcw size={14} />
                            <span>RESET DESIGN</span>
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-5 py-2 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all">
                            <Eye size={14} />
                            <span>PREVIEW</span>
                        </Button>
                    </div>
                </div>

                <div className="flex justify-center bg-slate-50 rounded-[40px] p-20 border-2 border-dashed border-slate-200">
                    <div className="relative bg-white shadow-2xl rounded-lg overflow-hidden w-[800px] h-[560px] border-[15px] border-slate-800">
                        {/* Mock Certificate Content */}
                        <div className="absolute inset-4 border-[2px] border-slate-200">
                            <div className="h-full w-full flex flex-col items-center py-12 px-20 text-center">
                                {/* Logo placeholder */}
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                    <ImageIcon size={24} className="text-slate-300" />
                                </div>
                                <h2 className="text-4xl font-serif text-slate-800 tracking-widest uppercase mb-1">CERTIFICATE</h2>
                                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-[0.4em] mb-12">OF APPRECIATION</h3>

                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>
                                <div className="w-full h-px bg-slate-100 mb-6" />
                                <h4 className="text-3xl font-bold bg-primary/10 text-primary px-10 py-3 rounded-2xl mb-8">Annual Exam Certificate</h4>

                                <p className="text-sm text-slate-500 leading-loose italic max-w-lg mb-12">
                                    This Is To Certify That <span className="text-primary font-bold">{"{name}"}</span> And Of He/She Is Gender As <span className="font-bold">{"{gender}"}</span>
                                    Son/Daughter Of <span className="font-bold">{"{father_name}"}</span> & <span className="font-bold">{"{mother_name}"}</span>. Bearing Roll <span className="font-bold">{"{roll_no}"}</span>
                                    In Class <span className="font-bold">{"{class}"}</span> Duly Passed The <span className="font-bold">{"{exam}"}</span> And His/Her Date Of Birth
                                    As Recorded Is <span className="font-bold">{"{dob}"}</span> Obtained G.P.A <span className="font-bold">{"{gpa}"}</span>.
                                </p>

                                <div className="mt-auto w-full flex justify-between px-10 items-end">
                                    <div className="text-center">
                                        <div className="bg-primary/10 text-primary font-bold px-4 py-1 rounded text-[10px] mb-2">{"{issue_date}"}</div>
                                        <div className="w-32 h-px bg-slate-200 mx-auto mb-2" />
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DATE</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-slate-100 rounded flex items-center justify-center mb-2 mx-auto">
                                            <ImageIcon size={20} className="text-slate-300" />
                                        </div>
                                        <div className="w-32 h-px bg-slate-200 mx-auto mb-2" />
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SIGNATURE</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all">
                        <span>✓ UPDATE DESIGN</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

const CertificateTemplate = () => {
    const [view, setView] = useState('list'); // 'list', 'create', 'edit', 'design'
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const [templates] = useState([
        {
            id: 1,
            name: 'Annual Exam Certificate',
            userType: 'Student',
            layout: 'A4 (Landscape)',
            bg: 'https://via.placeholder.com/80x50?text=Cert',
            status: true
        },
        {
            id: 2,
            name: 'Character Certificate',
            userType: 'Student',
            layout: 'A4 (Landscape)',
            bg: 'https://via.placeholder.com/80x50?text=Cert',
            status: true
        },
        {
            id: 3,
            name: 'Character Certificate [Staff]',
            userType: 'Employee',
            layout: 'A4 (Landscape)',
            bg: 'https://via.placeholder.com/80x50?text=Cert',
            status: true
        },
        {
            id: 4,
            name: 'Transfer Certificate',
            userType: 'Student',
            layout: 'A4 (Landscape)',
            bg: 'https://via.placeholder.com/80x50?text=Cert',
            status: true
        },
    ]);

    const handleAdd = () => {
        setSelectedTemplate(null);
        setView('create');
    };

    const handleEdit = (template) => {
        setSelectedTemplate(template);
        setView('edit');
    };

    const handleDesign = (template) => {
        setSelectedTemplate(template);
        setView('design');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this template?')) {
            console.log('Deleting template:', id);
        }
    };

    const handleBack = () => {
        setView('list');
        setSelectedTemplate(null);
    };

    if (view === 'create' || view === 'edit') {
        return <CreateEditView template={selectedTemplate} onBack={handleBack} />;
    }

    if (view === 'design') {
        return <DesignView template={selectedTemplate} onBack={handleBack} />;
    }

    return (
        <ListView
            templates={templates}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDesign={handleDesign}
            onDelete={handleDelete}
        />
    );
};

export default CertificateTemplate;
