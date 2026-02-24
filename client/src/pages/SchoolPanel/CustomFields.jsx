import React from 'react';
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
    Save
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Label = ({ children, required }) => (
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 block px-1">
        {children} {required && <span className="text-rose-500">*</span>}
    </label>
);

const FormSelect = ({ options = [], name, value, onChange, placeholder, required, openSelect, setOpenSelect }) => {
    const isOpen = openSelect === name;
    const selectedOption = options.find(o => (o.value || o.name) === value);

    React.useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e) => {
            if (!e.target.closest(`.select-container-${name}`)) {
                setOpenSelect(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, name, setOpenSelect]);

    return (
        <div className={`relative select-container-${name} w-full`}>
            <div
                onClick={() => setOpenSelect(isOpen ? null : name)}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all cursor-pointer flex justify-between items-center h-[42px]"
            >
                <span className={!selectedOption ? 'text-slate-300' : ''}>
                    {selectedOption ? (selectedOption.label || selectedOption.name) : placeholder}
                </span>
                <ChevronDown className={`text-slate-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} size={16} />
            </div>

            {isOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-100 rounded-xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="max-h-[224px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                        {options.map((opt, idx) => (
                            <div
                                key={idx}
                                onClick={() => {
                                    onChange({ target: { name, value: opt.value || opt.name } });
                                    setOpenSelect(null);
                                }}
                                className={`px-4 py-3 text-[12px] font-bold transition-colors cursor-pointer hover:bg-slate-50 hover:text-primary ${value === (opt.value || opt.name) ? 'bg-primary/5 text-primary' : 'text-slate-500'}`}
                            >
                                {opt.label || opt.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const CustomFieldHeader = ({ title, section }) => {
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

const CustomFieldLayout = ({ title, isStudent = false }) => {
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({
        label: '',
        type: '',
        required: false,
        onlineRegistration: false
    });

    const types = [
        { name: 'Text Input', value: 'text' },
        { name: 'Text Area', value: 'textarea' },
        { name: 'Dropdown', value: 'dropdown' },
        { name: 'Checkbox', value: 'checkbox' },
        { name: 'Radio', value: 'radio' },
        { name: 'Date', value: 'date' },
    ];

    const columns = [
        { header: "SL", width: "w-16" },
        { header: "Label" },
        { header: "Type" },
        { header: "Width" },
        { header: "Required" },
        { header: "Value" },
        ...(isStudent ? [{ header: "Available For Online Registration" }] : []),
        { header: "Actions", width: "w-24" }
    ];

    return (
        <div className="p-6 space-y-6 bg-[#f8fafc] min-h-screen">
            <CustomFieldHeader title={title} section="Custom Field" />

            <Card className="p-8 border-none shadow-sm bg-white rounded-2xl">
                <h2 className="text-lg font-bold text-[#1e293b] mb-8">Add Custom Field</h2>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 space-y-2 w-full">
                        <Label required>LABEL *</Label>
                        <input
                            type="text"
                            placeholder=""
                            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-[12px] font-medium text-slate-600 outline-none focus:border-primary transition-all h-[42px]"
                        />
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                        <Label required>TYPE *</Label>
                        <FormSelect
                            name="type"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            options={types}
                            placeholder="Type *"
                            openSelect={openSelect}
                            setOpenSelect={setOpenSelect}
                        />
                    </div>
                    <div className="flex flex-col space-y-4 pt-8 shrink-0">
                        <RadioToggle
                            label="Required"
                            checked={formData.required}
                            onChange={() => setFormData({ ...formData, required: !formData.required })}
                        />
                        {isStudent && (
                            <RadioToggle
                                label="Available For Online Registration"
                                checked={formData.onlineRegistration}
                                onChange={() => setFormData({ ...formData, onlineRegistration: !formData.onlineRegistration })}
                            />
                        )}
                    </div>
                    <div className="md:self-end pb-1 ml-auto">
                        <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-8 py-2.5 text-[12px] font-black uppercase italic tracking-wider flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all active:scale-95 h-[42px]">
                            <Save size={16} />
                            <span>SAVE</span>
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="space-y-6">
                <div className="flex justify-between items-end px-2">
                    <div className="flex-1 max-w-xs">
                        <h3 className="text-sm font-bold text-slate-700 mb-2">Custom Field List</h3>
                        <div className="flex items-center border-b border-slate-100 pb-1 group focus-within:border-[#7c32ff] transition-all">
                            <Search size={14} className="text-slate-300 mr-2 group-focus-within:text-[#7c32ff]" />
                            <input type="text" placeholder="SEARCH" className="text-[10px] font-bold outline-none w-full bg-transparent placeholder:text-slate-300" />
                        </div>
                    </div>
                    <div className="flex border border-[#7c32ff]/20 rounded-lg overflow-hidden shadow-sm shadow-primary/5 ml-4">
                        {[Copy, FileText, FileSpreadsheet, FileBox, Printer, LayoutPanelLeft].map((Icon, i) => (
                            <button key={i} className="p-2 bg-white hover:bg-slate-50 border-r last:border-0 border-slate-100 transition-colors">
                                <Icon size={14} className="text-[#7c32ff]/60" />
                            </button>
                        ))}
                    </div>
                </div>

                <Card className="border-none shadow-sm bg-white overflow-hidden p-0 relative">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-[11px] font-bold">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 uppercase">
                                    {columns.map((col, i) => (
                                        <th key={i} className={`px-6 py-4 border-r border-slate-100 text-left whitespace-nowrap ${col.width || ''}`}>
                                            <div className="flex items-center space-x-1">
                                                <ArrowUpDown size={10} className="text-slate-300 rotate-180" />
                                                <span>{col.header}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-slate-50">
                                    <td colSpan={columns.length} className="px-6 py-16 text-center text-slate-300 bg-slate-50/10 tracking-widest uppercase text-[10px]">
                                        No Data Available In Table
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-400">
                        <span>Showing 0 to 0 of 0 entries</span>
                        <div className="flex items-center space-x-4">
                            <ChevronLeft size={16} className="cursor-not-allowed opacity-30" />
                            <ChevronRight size={16} className="cursor-not-allowed opacity-30" />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export const StudentCustomField = () => <CustomFieldLayout title="Student Registration" isStudent={true} />;
export const StaffCustomField = () => <CustomFieldLayout title="Staff Registration" isStudent={false} />;
