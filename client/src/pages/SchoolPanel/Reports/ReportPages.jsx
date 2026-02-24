import React from 'react';
import { Card, Button } from '../../../components/SnowUI';
import api from '../../../api/api';
import {
    Construction,
    ChevronLeft,
    ChevronDown,
    Download,
    Printer,
    Search,
    Filter,
    FileText,
    Users,
    TrendingUp,
    PieChart,
    Share2,
    User,
    Copy,
    FileSpreadsheet,
    FileBox,
    ArrowUpDown,
    ChevronRight,
    LayoutPanelLeft,
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

    // Handle click outside
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

const ReportHeader = ({ title, section }) => {
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

const CriteriaCard = ({ title = "Select Criteria", children, onSearch }) => (
    <Card className="p-8 border-none shadow-sm bg-white rounded-2xl space-y-6">
        <h2 className="text-lg font-bold text-[#1e293b]">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {children}
            <div className="md:col-start-4 flex justify-end">
                <Button
                    onClick={onSearch}
                    className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-8 py-2.5 text-[12px] font-black uppercase italic italic tracking-wider flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all active:scale-95 h-[42px]"
                >
                    <Search size={16} />
                    <span>SEARCH</span>
                </Button>
            </div>
        </div>
    </Card>
);

const AttendanceStatus = ({ status }) => {
    const styles = {
        P: "bg-[#22c55e] text-white",         // Emerald green
        A: "bg-[#ef4444] text-white",         // Red
        F: "bg-[#06b6d4] text-white",         // Cyan
        L: "bg-[#f59e0b] text-white",         // Amber/Orange
        W: "text-slate-400 font-bold",        // Weekend
        Le: "bg-[#3b82f6] text-white",        // Blue
        H: "bg-[#94a3b8] text-white"          // Slate grey
    };

    if (status === 'W' || status === '') return <span className={styles[status]}>{status}</span>;

    return (
        <div className="flex items-center justify-center space-x-1">
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black ${styles[status]}`}>
                {status}
            </span>
            <div className="w-1 h-1 rounded-full border border-slate-200"></div>
        </div>
    );
};

const AttendanceTable = ({ data = [] }) => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white sticky left-0 z-20">
                <div className="flex items-center space-x-4">
                    <h3 className="text-sm font-bold text-slate-700">Student Attendance Report
                        <span className="ml-2 text-[10px] font-bold">
                            <span className="text-[#22c55e]">P:17</span>
                            <span className="ml-1 text-[#f59e0b]">L:5</span>
                            <span className="ml-1 text-[#ef4444]">A:17</span>
                            <span className="ml-1 text-[#06b6d4]">F:6</span>
                            <span className="ml-1 text-[#94a3b8]">H:0</span>
                            <span className="ml-1 text-[#3b82f6]">Le:</span>
                        </span>
                    </h3>
                </div>
                <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-6 py-2 text-[10px] font-black uppercase italic tracking-widest flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all active:scale-95">
                    <Printer size={14} />
                    <span>PRINT</span>
                </Button>
            </div>

            <div className="p-4 px-6 bg-slate-50/30 border-b border-slate-50 flex space-x-6 overflow-x-auto scrollbar-none">
                <div className="flex items-center space-x-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    <span>Present:</span> <span className="text-[#22c55e] font-black">P</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    <span>Late:</span> <span className="text-[#f59e0b] font-black">L</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    <span>Absent:</span> <span className="text-[#ef4444] font-black">A</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    <span>Half Day:</span> <span className="text-[#06b6d4] font-black">F</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    <span>Holiday:</span> <span className="text-[#94a3b8] font-black">H</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    <span>Leave:</span> <span className="text-[#3b82f6] font-black">Le</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    <span>Weekend:</span> <span className="text-slate-400 font-black">W</span>
                </div>
            </div>

            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider sticky left-0 bg-slate-50 z-30 border-r border-slate-100 min-w-[150px]">Name</th>
                            <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider sticky left-[150px] bg-slate-50 z-30 border-r border-slate-100 min-w-[100px]">Admission No</th>
                            <th className="px-3 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">P</th>
                            <th className="px-3 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">L</th>
                            <th className="px-3 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">A</th>
                            <th className="px-3 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">F</th>
                            <th className="px-3 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">H</th>
                            <th className="px-3 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Le</th>
                            <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center border-r border-slate-100 font-black text-slate-600">%</th>
                            {days.map(d => (
                                <th key={d} className="px-2 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center min-w-[40px]">
                                    <div>{d}</div>
                                    <div className="text-[8px] font-medium opacity-60">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(d + 3) % 7]}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {data.map((student, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-4 py-4 text-[11px] font-bold text-slate-600 sticky left-0 bg-white z-10 border-r border-slate-100 whitespace-nowrap">{student.name}</td>
                                <td className="px-4 py-4 text-[11px] font-bold text-slate-500 sticky left-[150px] bg-white z-10 border-r border-slate-100 whitespace-nowrap">{student.admissionNo}</td>
                                <td className="px-3 py-4 text-[11px] font-bold text-slate-500 text-center">{student.p}</td>
                                <td className="px-3 py-4 text-[11px] font-bold text-slate-500 text-center">{student.l}</td>
                                <td className="px-3 py-4 text-[11px] font-bold text-slate-500 text-center">{student.a}</td>
                                <td className="px-3 py-4 text-[11px] font-bold text-slate-500 text-center">{student.f}</td>
                                <td className="px-3 py-4 text-[11px] font-bold text-slate-500 text-center">{student.h}</td>
                                <td className="px-3 py-4 text-[11px] font-bold text-slate-500 text-center">{student.le}</td>
                                <td className="px-4 py-4 text-[11px] font-black text-slate-700 text-center border-r border-slate-100">{student.percent}%</td>
                                {days.map(d => (
                                    <td key={d} className="px-2 py-4 text-center">
                                        <AttendanceStatus status={student.attendance[d - 1]} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

const DataTable = ({ title, columns = [], data = [], showAction = false }) => {
    return (
        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
                <h3 className="text-sm font-bold text-slate-700">{title}</h3>
                <div className="flex items-center space-x-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder="SEARCH"
                            className="bg-slate-50 border border-slate-100 rounded-lg pl-9 pr-4 py-2 text-[10px] font-black uppercase outline-none focus:border-primary w-[200px] transition-all"
                        />
                    </div>
                    <div className="flex border border-slate-100 rounded-lg overflow-hidden">
                        {[FileText, Download, Printer, Share2].map((Icon, i) => (
                            <button key={i} className="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-primary transition-colors border-r last:border-0 border-slate-100">
                                <Icon size={14} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50">
                            {columns.map((col, idx) => (
                                <th key={idx} className={`px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ${idx === 0 ? 'pl-8' : ''}`}>
                                    <div className="flex items-center space-x-1 cursor-pointer hover:text-primary transition-colors">
                                        <TrendingUp size={10} className="rotate-90" />
                                        <span>{col.label}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {data.map((row, rowIdx) => (
                            <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors group">
                                {columns.map((col, colIdx) => (
                                    <td key={colIdx} className={`px-6 py-5 text-[11px] font-bold text-slate-600 ${colIdx === 0 ? 'pl-8' : ''}`}>
                                        {col.key === 'action' ? (
                                            <Button className="bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary rounded-lg px-4 py-1.5 text-[10px] font-black uppercase flex items-center space-x-2 transition-all group-hover:shadow-sm">
                                                <span>SELECT</span>
                                                <ChevronDown size={14} />
                                            </Button>
                                        ) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-slate-50/30">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Showing 1 to {data.length} of {data.length} entries
                </p>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-primary transition-colors text-[10px] font-black">
                        &larr;
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-[10px] font-black shadow-lg shadow-primary/20">
                        1
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-primary transition-colors text-[10px] font-black">
                        &rarr;
                    </button>
                </div>
            </div>
        </Card>
    );
};

const ReportPlaceholder = ({ title, section }) => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">{title}</h1>
                        <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                            <span>Reports</span>
                            <span>|</span>
                            <span>{section}</span>
                            <span>|</span>
                            <span className="text-[#1C1C1C]">{title}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <Button className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all">
                        <Download size={14} />
                        <span>EXPORT</span>
                    </Button>
                    <Button className="bg-[#1C1C1C] hover:bg-black text-white rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-slate-200 active:scale-95 transition-all">
                        <Printer size={14} />
                        <span>PRINT</span>
                    </Button>
                </div>
            </div>

            {/* Content Placeholder */}
            <Card className="p-20 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                    <Construction size={240} />
                </div>

                <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center text-primary animate-pulse relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-[2rem] animate-ping opacity-20"></div>
                    <FileText size={40} />
                </div>

                <div className="max-w-md space-y-4">
                    <h2 className="text-2xl font-black text-slate-800 uppercase italic leading-tight tracking-tight">
                        Generating <span className="text-primary italic">Analytics</span> for {title}
                    </h2>
                    <p className="text-slate-400 font-medium leading-relaxed">
                        We are currently configuring the data pipelines and advanced analytics for the <b>{title}</b> module. This report will feature automated insights, bulk data processing, and premium PDF exporting.
                    </p>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center">
                                <Users size={16} className="text-slate-300" />
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Module scheduled for live deployment
                    </p>
                </div>
            </Card>

            {/* Feature Teasers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: <TrendingUp className="text-emerald-500" />, title: "Live Tracking", desc: "Real-time data synchronization across all school departments." },
                    { icon: <PieChart className="text-blue-500" />, title: "Smart Filters", desc: "Drill down into complex institutional data with custom query builders." },
                    { icon: <TrendingUp className="text-purple-500" />, title: "Automated Insights", desc: "AI-driven predictions and performance tracking for students and staff." }
                ].map((feature, idx) => (
                    <Card key={idx} className="p-8 border-none shadow-xl shadow-slate-100/50 bg-white rounded-2xl space-y-4 transition-transform hover:-translate-y-1 cursor-default">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                            {feature.icon}
                        </div>
                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">{feature.title}</h3>
                        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const useAcademicData = () => {
    const [classes, setClasses] = React.useState([]);
    const [sections] = React.useState([{ name: 'A' }, { name: 'B' }, { name: 'C' }]);

    React.useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await api.get('/academic/classes');
                setClasses(res.data);
            } catch (error) {
                console.error("Failed to fetch classes");
            }
        };
        fetchClasses();
    }, []);

    return { classes: classes.map(c => ({ value: c._id, name: c.name })), sections };
};

// Students Reports
export const StudentAttendanceReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', section: '', month: 'February', year: '2026' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const mockData = [
        { name: "Keely Altenwerth", admissionNo: "79651", p: 3, l: 1, a: 5, f: 0, h: 0, le: 0, percent: 44.44, attendance: Array(31).fill('').map((_, i) => i === 3 ? 'W' : i === 10 ? 'W' : i === 17 ? 'W' : i === 24 ? 'W' : i > 25 ? (i % 3 === 0 ? 'P' : i % 2 === 0 ? 'A' : 'L') : '') },
        { name: "Jamil Grant", admissionNo: "53401", p: 2, l: 1, a: 3, f: 3, h: 0, le: 0, percent: 66.67, attendance: Array(31).fill('').map((_, i) => i === 3 ? 'W' : i === 10 ? 'W' : i === 17 ? 'W' : i === 24 ? 'W' : i > 25 ? (i % 4 === 0 ? 'F' : i % 2 === 0 ? 'P' : i % 3 === 0 ? 'A' : 'L') : '') },
        { name: "Miracle Kunze", admissionNo: "52437", p: 4, l: 0, a: 5, f: 0, h: 0, le: 0, percent: 44.44, attendance: Array(31).fill('').map((_, i) => i === 3 ? 'W' : i === 10 ? 'W' : i === 17 ? 'W' : i === 24 ? 'W' : i > 25 ? (i % 2 === 0 ? 'P' : 'A') : '') },
        { name: "Mozell Lubowitz", admissionNo: "52164", p: 4, l: 2, a: 2, f: 1, h: 0, le: 0, percent: 77.78, attendance: Array(31).fill('').map((_, i) => i === 3 ? 'W' : i === 10 ? 'W' : i === 17 ? 'W' : i === 24 ? 'W' : i > 25 ? (i % 4 === 0 ? 'F' : i % 3 === 0 ? 'L' : i % 2 === 0 ? 'P' : 'A') : '') },
        { name: "Mellisa Ratke", admissionNo: "17527", p: 4, l: 1, a: 2, f: 2, h: 0, le: 0, percent: 77.78, attendance: Array(31).fill('').map((_, i) => i === 3 ? 'W' : i === 10 ? 'W' : i === 17 ? 'W' : i === 24 ? 'W' : i > 25 ? (i % 5 === 0 ? 'F' : i % 3 === 0 ? 'L' : i % 2 === 0 ? 'P' : 'A') : '') },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Student Attendance Report" section="Student Info" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>CLASS</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SELECT MONTH</Label>
                    <FormSelect name="month" value={formData.month} onChange={handleInputChange} options={[{ name: 'January' }, { name: 'February' }, { name: 'March' }]} placeholder="Select Month *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SELECT YEAR</Label>
                    <FormSelect name="year" value={formData.year} onChange={handleInputChange} options={[{ name: '2025' }, { name: '2026' }]} placeholder="Select Year *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <AttendanceTable data={mockData} />
                </div>
            )}
        </div>
    );
};

export const SubjectAttendanceReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', section: '', month: 'February', year: '2026' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const mockData = [
        { name: "John Doe", admissionNo: "12345", p: 0, l: 0, a: 0, f: 0, h: 0, le: 0, percent: "0/0 100", attendance: Array(31).fill('').map((_, i) => (i + 3) % 7 === 0 ? 'W' : '') },
        { name: "Jane Smith", admissionNo: "67890", p: 0, l: 0, a: 0, f: 0, h: 0, le: 0, percent: "0/0 100", attendance: Array(31).fill('').map((_, i) => (i + 3) % 7 === 0 ? 'W' : '') },
        { name: "Michael Johnson", admissionNo: "54321", p: 0, l: 0, a: 0, f: 0, h: 0, le: 0, percent: "0/0 100", attendance: Array(31).fill('').map((_, i) => (i + 3) % 7 === 0 ? 'W' : '') },
        { name: "Emily Brown", admissionNo: "98765", p: 0, l: 0, a: 0, f: 0, h: 0, le: 0, percent: "0/0 100", attendance: Array(31).fill('').map((_, i) => (i + 3) % 7 === 0 ? 'W' : '') },
        { name: "David Wilson", admissionNo: "13579", p: 0, l: 0, a: 0, f: 0, h: 0, le: 0, percent: "0/0 100", attendance: Array(31).fill('').map((_, i) => (i + 3) % 7 === 0 ? 'W' : '') },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Subject Attendance Report" section="Student Info" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SELECT MONTH *</Label>
                    <FormSelect name="month" value={formData.month} onChange={handleInputChange} options={[{ name: 'January' }, { name: 'February' }, { name: 'March' }]} placeholder="Select Month *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SELECT YEAR *</Label>
                    <FormSelect name="year" value={formData.year} onChange={handleInputChange} options={[{ name: '2025' }, { name: '2026' }]} placeholder="Select Year *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <AttendanceTable data={mockData} />
                </div>
            )}
        </div>
    );
};

export const HomeworkEvaluationReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', section: '', subject: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const columns = [
        { label: "Subject", key: "subject" },
        { label: "Homework Date", key: "homeworkDate" },
        { label: "Submission Date", key: "submissionDate" },
        { label: "Complete/Pending", key: "completePending" },
        { label: "Complete(%)", key: "completePercent" },
        { label: "Action", key: "action" }
    ];

    const mockData = [
        { subject: "Math", homeworkDate: "22nd Feb, 2026", submissionDate: "22nd Feb, 2026", completePending: "25/-20", completePercent: "-125.00" },
        { subject: "Math", homeworkDate: "22nd Feb, 2026", submissionDate: "22nd Feb, 2026", completePending: "25/-20", completePercent: "-125.00" }
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Homework Evaluation Report" section="HomeWork" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label>SECTION</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SUBJECT *</Label>
                    <FormSelect name="subject" value={formData.subject} onChange={handleInputChange} options={[]} placeholder="Select Subject *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <DataTable title="Homework Evaluation Report" columns={columns} data={mockData} />
                </div>
            )}
        </div>
    );
};

export const GuardianReports = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', section: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const columns = [
        { label: "Class", key: "class" },
        { label: "Section", key: "section" },
        { label: "Admission No", key: "admissionNo" },
        { label: "Name", key: "name" },
        { label: "Mobile", key: "mobile" },
        { label: "Guardians Name", key: "guardiansName" },
        { label: "Relation With Guardian", key: "relation" },
        { label: "Guardians Phone", key: "guardiansPhone" },
        { label: "Father Name", key: "fatherName" },
        { label: "Father Phone", key: "fatherPhone" },
        { label: "Mother Name", key: "motherName" }
    ];

    const mockData = [
        { class: "Class 1", section: "A", admissionNo: "52164", name: "Mozell Lubowitz", mobile: "+88012345671", guardiansName: "Xzavier", relation: "Father", guardiansPhone: "24276817", fatherName: "Lee", fatherPhone: "61946372", motherName: "Kendra" },
        { class: "Class 1", section: "A", admissionNo: "17527", name: "Melisa Ratke", mobile: "+88012345672", guardiansName: "Colby", relation: "Father", guardiansPhone: "82058263", fatherName: "Murphy", fatherPhone: "37821591", motherName: "Alaina" },
        { class: "Class 1", section: "A", admissionNo: "79651", name: "Keely Altenwerth", mobile: "+88012345673", guardiansName: "Lucas", relation: "Father", guardiansPhone: "38126622", fatherName: "Everett", fatherPhone: "57131583", motherName: "Julie" },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Guardian Reports" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label>SECTION</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 overflow-x-auto">
                    <DataTable title="Guardian Reports" columns={columns} data={mockData} />
                </div>
            )}
        </div>
    );
};

export const StudentHistoryReport = () => {
    const { classes } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', admissionYear: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const columns = [
        { label: "Admission No", key: "admissionNo" },
        { label: "Name", key: "name" },
        { label: "Admission Date", key: "admissionDate" },
        { label: "Class Start End", key: "classStartEnd" },
        { label: "Session Start End", key: "sessionStartEnd" },
        { label: "Mobile", key: "mobile" },
        { label: "Guardians Name", key: "guardiansName" },
        { label: "Guardians Phone", key: "guardiansPhone" }
    ];

    const mockData = [
        { admissionNo: "51734", name: "Margot Upton", admissionDate: "4th Nov, 1992", classStartEnd: "Class 1", sessionStartEnd: "-", mobile: "+88012345673", guardiansName: "Tobin", guardiansPhone: "14804346" },
        { admissionNo: "52164", name: "Mozell Lubowitz", admissionDate: "8th Jul, 1992", classStartEnd: "Class 1", sessionStartEnd: "-", mobile: "+88012345671", guardiansName: "Xzavier", guardiansPhone: "24276817" }
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Student History" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label>ADMISSION YEAR</Label>
                    <FormSelect name="admissionYear" value={formData.admissionYear} onChange={handleInputChange} options={[{ name: '1992' }, { name: '2025-26' }]} placeholder="Select admission Year" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <DataTable title="Student Report" columns={columns} data={mockData} />
                </div>
            )}
        </div>
    );
};

export const StudentLoginReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', section: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const mockData = [
        { sl: 1, admissionNo: "52164", name: "Mozell Lubowitz", studentEmail: "student_699b376c04ab0@infixedu.com", parentEmail: "guardian_1@infixedu.com" },
        { sl: 2, admissionNo: "17527", name: "Melisa Ratke", studentEmail: "student_699b376c04e87@infixedu.com", parentEmail: "guardian_2@infixedu.com" },
        { sl: 3, admissionNo: "79651", name: "Keely Altenwerth", studentEmail: "student_699b376c050a2@infixedu.com", parentEmail: "guardian_3@infixedu.com" },
        { sl: 4, admissionNo: "53401", name: "Jamil Grant", studentEmail: "student_699b376c051fe@infixedu.com", parentEmail: "guardian_4@infixedu.com" },
    ];

    const CredentialsCell = ({ email }) => (
        <div className="space-y-1.5 py-4">
            <p className="text-[10px] font-bold text-slate-400 lowercase tracking-tight">{email}</p>
            <div className="flex items-center space-x-2">
                <input
                    type="password"
                    placeholder="Enter Password"
                    className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-[10px] font-medium outline-none focus:border-[#7c32ff] w-[140px] transition-all"
                />
                <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-4 py-1.5 text-[9px] font-black uppercase shadow-lg shadow-primary/20 active:scale-95 transition-all">
                    UPDATE
                </Button>
            </div>
            <button className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-[#7c32ff] transition-colors block pl-1">
                RESET PASSWORD
            </button>
        </div>
    );

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Student Login Info" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label>SECTION</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
                            <h3 className="text-sm font-bold text-slate-700">Manage Login</h3>
                            <div className="flex items-center space-x-3">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={14} />
                                    <input type="text" placeholder="SEARCH" className="bg-slate-50 border border-slate-100 rounded-lg pl-9 pr-4 py-2 text-[10px] font-black uppercase outline-none focus:border-[#7c32ff] w-[200px] transition-all" />
                                </div>
                                <div className="flex border border-slate-100 rounded-lg overflow-hidden">
                                    {[FileText, Download, Printer, Share2].map((Icon, i) => (
                                        <button key={i} className="p-2.5 hover:bg-slate-50 text-slate-400 hover:text-[#7c32ff] transition-colors border-r last:border-0 border-slate-100">
                                            <Icon size={14} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest pl-8">
                                            <div className="flex items-center space-x-1 cursor-pointer hover:text-[#7c32ff] transition-colors">
                                                <TrendingUp size={10} className="rotate-90" />
                                                <span>SL</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1 cursor-pointer hover:text-[#7c32ff] transition-colors">
                                                <TrendingUp size={10} className="rotate-90" />
                                                <span>Admission No</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1 cursor-pointer hover:text-[#7c32ff] transition-colors">
                                                <TrendingUp size={10} className="rotate-90" />
                                                <span>Student Name</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1 cursor-pointer hover:text-[#7c32ff] transition-colors">
                                                <TrendingUp size={10} className="rotate-90" />
                                                <span>Email & Password</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest pr-8">
                                            <div className="flex items-center space-x-1 cursor-pointer hover:text-[#7c32ff] transition-colors">
                                                <TrendingUp size={10} className="rotate-90" />
                                                <span>Parent Email & Password</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {mockData.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-5 text-[11px] font-bold text-slate-600 pl-8">{row.sl}</td>
                                            <td className="px-6 py-5 text-[11px] font-bold text-slate-600">{row.admissionNo}</td>
                                            <td className="px-6 py-5 text-[11px] font-bold text-slate-600">{row.name}</td>
                                            <td className="px-6 py-0">
                                                <CredentialsCell email={row.studentEmail} />
                                            </td>
                                            <td className="px-6 py-0 pr-8">
                                                <CredentialsCell email={row.parentEmail} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-slate-50/30">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing 1 to 4 of 4 entries</p>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-[#7c32ff] transition-colors text-[10px] font-black">&larr;</button>
                                <button className="px-3 py-1.5 rounded-lg bg-[#7c32ff] text-white text-[10px] font-black shadow-lg shadow-primary/20">1</button>
                                <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-[#7c32ff] transition-colors text-[10px] font-black">&rarr;</button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};
export const ClassReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', section: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const subjectsMock = [
        { name: "Bangla", teacher: "Mr. Olivia" },
        { name: "Math", teacher: "Charley" },
        { name: "Algorithms", teacher: "Norwood" },
        { name: "Networking", teacher: "Wallace" },
        { name: "chemistry", teacher: "Gianni" },
        { name: "repellendus", teacher: "Raheem" },
        { name: "temporibus", teacher: "Murphy" },
        { name: "cumque", teacher: "Jasen" },
        { name: "et", teacher: "Vladimir" },
        { name: "rem", teacher: "Doyle" },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Class Report" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <Card className="p-8 border-none shadow-sm bg-white rounded-2xl space-y-8">
                        <div>
                            <h3 className="text-sm font-bold text-slate-700 tracking-tight">Class Report For Class Class 1, section (A)</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-x-20">
                            {/* Class Information */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">CLASS INFORMATION</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-1 border-b border-slate-50">
                                        <span className="text-[11px] font-bold text-slate-500">Number Of Student</span>
                                        <span className="text-[11px] font-bold text-slate-700">5</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-slate-50">
                                        <span className="text-[11px] font-bold text-slate-500">Total Subjects assigned</span>
                                        <span className="text-[11px] font-bold text-slate-700">10</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity column header - based on screenshot it seems to be aligned with the right side of subjects */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2 text-right invisible">QUANTITY</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-1 border-b border-slate-50 invisible">
                                        <span className="text-[11px] font-bold text-slate-500">_</span>
                                        <span className="text-[11px] font-bold text-slate-700">_</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-slate-50 invisible">
                                        <span className="text-[11px] font-bold text-slate-500">_</span>
                                        <span className="text-[11px] font-bold text-slate-700">_</span>
                                    </div>
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2 -mt-4">QUANTITY</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-1 invisible">
                                        <span>_</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Subjects & Teachers Table */}
                        <div className="grid grid-cols-2 gap-x-20">
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">SUBJECTS</h4>
                                <div className="divide-y divide-slate-50">
                                    {subjectsMock.map((s, i) => (
                                        <div key={i} className="py-3 px-1">
                                            <p className="text-[11px] font-bold text-slate-500 lowercase first-letter:uppercase">{s.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">TEACHER</h4>
                                <div className="divide-y divide-slate-50">
                                    {subjectsMock.map((s, i) => (
                                        <div key={i} className="py-3 px-1">
                                            <p className="text-[11px] font-bold text-slate-500">{s.teacher}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export const ClassRoutineReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', section: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const days = ['SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
    const mockRoutines = [
        { subject: "Bangla (ENG-123)", teacher: "Mr. Olivia", time: "09:00 AM - 09:45 AM" },
        { subject: "Math (CS-123)", teacher: "Charley", time: "09:00 AM - 09:45 AM" },
        { subject: "Algorithms (Dt-123)", teacher: "Norwood", time: "09:00 AM - 09:45 AM" },
        { subject: "Networking (GK-123)", teacher: "Wallace", time: "09:00 AM - 09:45 AM" },
        { subject: "chemistry (evaniat)", teacher: "Gianni", time: "09:00 AM - 09:45 AM" },
        { subject: "repellendus (qui)", teacher: "Raheem", time: "09:00 AM - 09:45 AM" },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Class Routine Report" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
                            <h3 className="text-sm font-bold text-slate-700">Class Routine</h3>
                            <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-6 py-2 text-[10px] font-black uppercase shadow-lg shadow-primary/20 flex items-center space-x-2 transition-all">
                                <Printer size={14} />
                                <span>PRINT</span>
                            </Button>
                        </div>

                        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                            <table className="w-full text-left border-collapse min-w-[1000px]">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        {days.map(day => (
                                            <th key={day} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100 last:border-0">{day}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {mockRoutines.map((routine, rIdx) => (
                                        <tr key={rIdx} className="divide-x divide-slate-100">
                                            {days.map(day => (
                                                <td key={day} className="px-6 py-4">
                                                    <div className="space-y-1 py-1">
                                                        <p className="text-[11px] font-bold text-slate-600">
                                                            <span className="text-slate-400">Subject: </span>{routine.subject}
                                                        </p>
                                                        <p className="text-[11px] font-bold text-slate-600">
                                                            <span className="text-slate-400">Teacher: </span>{routine.teacher}
                                                        </p>
                                                        <p className="text-[11px] font-bold text-slate-600">
                                                            <span className="text-slate-400">Time: </span>{routine.time}
                                                        </p>
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export const StudentGeneralReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', section: '', type: '', gender: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const columns = [
        { header: "Class", key: "class" },
        { header: "Section", key: "section" },
        { header: "Admission No", key: "admissionNo" },
        { header: "Name", key: "name" },
        { header: "Father Name", key: "fatherName" },
        { header: "Date Of Birth", key: "dob" },
        { header: "Gender", key: "gender" },
        { header: "Type", key: "type" },
        { header: "Phone", key: "phone" },
    ];

    const mockData = [
        { class: "Class 1", section: "A", admissionNo: "53401", name: "Jamil Grant", fatherName: "Diego", dob: "27th Sep, 2019", gender: "Male", type: "Normal", phone: "+88012345674" }
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Student Report" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label>SECTION</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label>TYPE</Label>
                    <FormSelect name="type" value={formData.type} onChange={handleInputChange} options={[{ name: 'Normal', value: 'Normal' }]} placeholder="Select Type" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label>GENDER</Label>
                    <FormSelect name="gender" value={formData.gender} onChange={handleInputChange} options={[{ name: 'Male', value: 'Male' }, { name: 'Female', value: 'Female' }]} placeholder="Select Gender" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <DataTable title="Student Report" columns={columns} data={mockData} />
                </div>
            )}
        </div>
    );
};

export const PreviousRecordReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ academicYear: '', class: '', section: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Previous Record" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>ACADEMIC YEAR *</Label>
                    <FormSelect name="academicYear" value={formData.academicYear} onChange={handleInputChange} options={[{ name: '2026(Jan-Dec)', value: '2026' }]} placeholder="Select Year *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>
            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <Card className="p-20 text-center border-none shadow-sm bg-white rounded-2xl">
                        <p className="text-slate-400 font-bold">Search results for previous academic records will appear here.</p>
                    </Card>
                </div>
            )}
        </div>
    );
};

export const StudentTransportReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', section: '', route: '', vehicle: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const columns = [
        { header: "Si", key: "si" },
        { header: "Admission No", key: "admissionNo" },
        { header: "Student Name", key: "name" },
        { header: "Mobile", key: "mobile" },
        { header: "Father Name", key: "fatherName" },
        { header: "Father Phone", key: "fatherPhone" },
        { header: "Route Title", key: "route" },
        { header: "Vehicle Number", key: "vehicleNo" },
        { header: "Driver Name", key: "driverName" },
        { header: "Driver Contact", key: "driverContact" },
        { header: "Fare($)", key: "fare" },
    ];

    const mockData = [
        { si: 1, admissionNo: "52164", name: "Mozell Lubowitz", mobile: "+88012345671", fatherName: "Lee", fatherPhone: "24276817", route: "-", vehicleNo: "INFIX-257", driverName: "-", driverContact: "-", fare: "-" },
        { si: 2, admissionNo: "17527", name: "Melisa Ratke", mobile: "+88012345672", fatherName: "Murphy", fatherPhone: "82058263", route: "-", vehicleNo: "INFIX-257", driverName: "-", driverContact: "-", fare: "-" },
        { si: 3, admissionNo: "79651", name: "Keely Altenwerth", mobile: "+88012345673", fatherName: "Everett", fatherPhone: "38126622", route: "-", vehicleNo: "INFIX-257", driverName: "-", driverContact: "-", fare: "-" },
        { si: 4, admissionNo: "53401", name: "Jamil Grant", mobile: "+88012345674", fatherName: "Diego", fatherPhone: "12286100", route: "-", vehicleNo: "INFIX-257", driverName: "-", driverContact: "-", fare: "-" },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Student Transport Report" section="Transport" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>ROUTE *</Label>
                    <FormSelect name="route" value={formData.route} onChange={handleInputChange} options={[{ name: 'Route 1', value: '1' }]} placeholder="Select Route *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>VEHICLE *</Label>
                    <FormSelect name="vehicle" value={formData.vehicle} onChange={handleInputChange} options={[{ name: 'Vehicle 1', value: '1' }]} placeholder="Select Vehicle *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <DataTable title="Student Transport Report" columns={columns} data={mockData} />
                </div>
            )}
        </div>
    );
};
export const StudentDormitoryReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', section: '', dormitory: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const columns = [
        { header: "Class (Section)", key: "classSection" },
        { header: "Admission No", key: "admissionNo" },
        { header: "Student Name", key: "name" },
        { header: "Mobile", key: "mobile" },
        { header: "Guardians Phone", key: "guardianPhone" },
        { header: "Dormitory Name", key: "dormitory" },
        { header: "Room Number", key: "roomNo" },
        { header: "Room Type", key: "roomType" },
        { header: "Cost Per Bed", key: "cost" },
    ];

    const mockData = [
        { classSection: "Class : Class 1(A)", admissionNo: "52164", name: "Mozell Lubowitz", mobile: "+88012345671", guardianPhone: "24276817", dormitory: "Sir Isaac Newton Hostel", roomNo: "Voluptas.", roomType: "Single", cost: "6008.00" },
        { classSection: "Class : Class 1(A)", admissionNo: "17527", name: "Melisa Ratke", mobile: "+88012345672", guardianPhone: "82058263", dormitory: "Sir Isaac Newton Hostel", roomNo: "Voluptas.", roomType: "Single", cost: "6008.00" },
        { classSection: "Class : Class 1(A)", admissionNo: "79651", name: "Keely Altenwerth", mobile: "+88012345673", guardianPhone: "38126622", dormitory: "Sir Isaac Newton Hostel", roomNo: "Voluptas.", roomType: "Single", cost: "6008.00" },
        { classSection: "Class : Class 1(A)", admissionNo: "53401", name: "Jamil Grant", mobile: "+88012345674", guardianPhone: "12286100", dormitory: "Sir Isaac Newton Hostel", roomNo: "Voluptas.", roomType: "Single", cost: "6008.00" },
        { classSection: "Class : Class 1(A)", admissionNo: "52437", name: "Miracle Kunze", mobile: "+88012345675", guardianPhone: "46628594", dormitory: "Sir Isaac Newton Hostel", roomNo: "Voluptas.", roomType: "Single", cost: "6008.00" },
        { classSection: "Class : Class 1(B)", admissionNo: "52528", name: "Ardella Gaylord", mobile: "+88012345671", guardianPhone: "68209248", dormitory: "Sir Isaac Newton Hostel", roomNo: "Voluptas.", roomType: "Single", cost: "6008.00" },
        { classSection: "Class : Class 1(B)", admissionNo: "67323", name: "America Ziemann", mobile: "+88012345672", guardianPhone: "41828927", dormitory: "Sir Isaac Newton Hostel", roomNo: "Voluptas.", roomType: "Single", cost: "6008.00" },
        { classSection: "Class : Class 1(B)", admissionNo: "56260", name: "Jayda Goodwin", mobile: "+88012345673", guardianPhone: "26755248", dormitory: "Sir Isaac Newton Hostel", roomNo: "Voluptas.", roomType: "Single", cost: "6008.00" },
        { classSection: "Class : Class 1(B)", admissionNo: "11695", name: "Terrance O'Hara", mobile: "+88012345674", guardianPhone: "20581273", dormitory: "Sir Isaac Newton Hostel", roomNo: "Voluptas.", roomType: "Single", cost: "6008.00" },
        { classSection: "Class : Class 1(B)", admissionNo: "32893", name: "Murphy Nolan", mobile: "+88012345675", guardianPhone: "96924309", dormitory: "Sir Isaac Newton Hostel", roomNo: "Voluptas.", roomType: "Single", cost: "6008.00" },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Student Dormitory Report" section="Dormitory" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label>DORMITORY</Label>
                    <FormSelect name="dormitory" value={formData.dormitory} onChange={handleInputChange} options={[{ name: 'Isaac Newton Hostel', value: '1' }]} placeholder="Select Dormitory" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <DataTable title="Student Dormitory Report" columns={columns} data={mockData} />
                </div>
            )}
        </div>
    );
};


// Exam Reports
export const ExamRoutineReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ exam: '', class: '', section: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const columns = [
        { header: "Date & Day", key: "dateDay" },
        { header: "Subject", key: "subject" },
        { header: "Class (Sec.)", key: "classSection" },
        { header: "Teacher", key: "teacher" },
        { header: "Time", key: "time" },
        { header: "Duration", key: "duration" },
        { header: "Room", key: "room" },
    ];

    const mockData = [
        { dateDay: "22nd Feb, 2026 Sunday", subject: "Bangla (ENG-123)", classSection: "Class 1 (A)", teacher: "Mr. Olivia", time: "09:00 AM - 09:45 AM", duration: "45 minutes", room: "99276462560497" },
        { dateDay: "22nd Feb, 2026 Sunday", subject: "Math (CS-123)", classSection: "Class 1 (A)", teacher: "Charley", time: "10:30 AM - 11:15 AM", duration: "45 minutes", room: "99276462560497" },
        { dateDay: "22nd Feb, 2026 Sunday", subject: "Algorithms (Dt-123)", classSection: "Class 1 (A)", teacher: "Norwood", time: "12:00 PM - 12:45 PM", duration: "45 minutes", room: "99276462560497" },
        { dateDay: "22nd Feb, 2026 Sunday", subject: "Networking (GK-123)", classSection: "Class 1 (A)", teacher: "Wallace", time: "02:00 PM - 02:45 PM", duration: "45 minutes", room: "99276462560497" },
        { dateDay: "22nd Feb, 2026 Sunday", subject: "chemistry (eveniet)", classSection: "Class 1 (A)", teacher: "Gianni", time: "03:39 PM - 04:39 PM", duration: "01 hours 00 minutes", room: "99276462560497" },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Exam Routine Report" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>EXAM *</Label>
                    <FormSelect name="exam" value={formData.exam} onChange={handleInputChange} options={[{ name: 'First Term', value: '1' }]} placeholder="Select Exam *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <DataTable title="Exam Routine" columns={columns} data={mockData} />
                </div>
            )}
        </div>
    );
};

export const MeritListReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ exam: '', class: '', section: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Merit List Report" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>EXAM *</Label>
                    <FormSelect name="exam" value={formData.exam} onChange={handleInputChange} options={[{ name: 'First Term', value: '1' }]} placeholder="Select Exam *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <Card className="p-20 text-center border-none shadow-sm bg-white rounded-2xl">
                        <p className="text-slate-400 font-bold">Merit list data will appear here.</p>
                    </Card>
                </div>
            )}
        </div>
    );
};

export const OnlineExamReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ exam: '', class: '', section: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Online Exam Report" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>EXAM *</Label>
                    <FormSelect name="exam" value={formData.exam} onChange={handleInputChange} options={[{ name: 'Online Test', value: '1' }]} placeholder="Select Exam *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <Card className="p-20 text-center border-none shadow-sm bg-white rounded-2xl">
                        <p className="text-slate-400 font-bold">Online exam results will appear here.</p>
                    </Card>
                </div>
            )}
        </div>
    );
};

export const SubjectWiseMarksheetReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ exam: '', class: '', section: '', subject: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Marksheet Report" section="Exam" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>EXAM *</Label>
                    <FormSelect name="exam" value={formData.exam} onChange={handleInputChange} options={[{ name: 'First Term', value: '1' }]} placeholder="Select Exam *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SUBJECT *</Label>
                    <FormSelect name="subject" value={formData.subject} onChange={handleInputChange} options={[{ name: 'Math', value: '1' }]} placeholder="Select Subject *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <Card className="p-20 text-center border-none shadow-sm bg-white rounded-2xl">
                        <p className="text-slate-400 font-bold">Subject-wise marksheet will appear here.</p>
                    </Card>
                </div>
            )}
        </div>
    );
};

export const TabulationSheetReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ exam: '', class: '', section: '', student: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Tabulation Sheet Report" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>EXAM *</Label>
                    <FormSelect name="exam" value={formData.exam} onChange={handleInputChange} options={[{ name: 'First Term', value: '1' }]} placeholder="Select Exam *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label>STUDENT</Label>
                    <FormSelect name="student" value={formData.student} onChange={handleInputChange} options={[{ name: 'Mozell Lubowitz', value: '1' }]} placeholder="Select Student" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-10">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="text-sm font-bold text-slate-700">Tabulation Sheet Report</h3>
                        <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-6 py-2 text-[10px] font-black uppercase shadow-lg shadow-primary/20 flex items-center space-x-2 transition-all">
                            <Printer size={14} />
                            <span>PRINT</span>
                        </Button>
                    </div>

                    <Card className="border border-slate-100 shadow-sm bg-white overflow-hidden p-0">
                        {/* Purple Banner Header */}
                        <div className="bg-gradient-to-r from-[#4b149b] to-[#7c32ff] p-8 text-white relative overflow-hidden flex justify-between items-start">
                            <div className="relative z-10 space-y-1">
                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl inline-block mb-2">
                                    <div className="text-2xl font-black italic tracking-tighter">INFIX</div>
                                    <div className="text-[7px] font-black uppercase tracking-[0.2em] opacity-80">Ultimate Education ERP</div>
                                </div>
                            </div>
                            <div className="text-right space-y-1 relative z-10">
                                <h2 className="text-xl font-black">InfixEdu</h2>
                                <p className="text-[10px] font-medium opacity-80">Al Khuwayr, Muscat, Oman</p>
                                <p className="text-[10px] font-medium opacity-80">Email: hello@aorasoft.com , Phone: +96897002784</p>
                            </div>
                            {/* Abstract background shapes */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-16 -mb-16 blur-2xl" />
                        </div>

                        {/* Report Title Section */}
                        <div className="border-y border-slate-100 py-3 bg-slate-50/50">
                            <h3 className="text-[11px] font-black text-slate-700 text-center uppercase tracking-widest">TABULATION SHEET OF FIRST TERM IN 2026</h3>
                        </div>

                        {/* Student Details Grid */}
                        <div className="p-8 grid grid-cols-2 gap-x-20 gap-y-1">
                            <div className="space-y-1">
                                <div className="flex text-[11px] font-bold">
                                    <span className="w-16 text-slate-400">Name</span>
                                    <span className="text-slate-700">: Mozell Lubowitz</span>
                                </div>
                                <div className="flex text-[11px] font-bold">
                                    <span className="w-16 text-slate-400">Class</span>
                                    <span className="text-slate-700">: Class 1</span>
                                </div>
                                <div className="flex text-[11px] font-bold">
                                    <span className="w-16 text-slate-400">Section</span>
                                    <span className="text-slate-700">: A</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex text-[11px] font-bold">
                                    <span className="w-32 text-slate-400">Roll No</span>
                                    <span className="text-slate-700">: 85822</span>
                                </div>
                                <div className="flex text-[11px] font-bold">
                                    <span className="w-32 text-slate-400">Admission No</span>
                                    <span className="text-slate-700">: 52164</span>
                                </div>
                                <div className="flex text-[11px] font-bold">
                                    <span className="w-32 text-slate-400">Exam</span>
                                    <span className="text-slate-700">: First Term</span>
                                </div>
                            </div>
                        </div>

                        {/* Result Table */}
                        <div className="px-8 pb-10">
                            <div className="border border-slate-100 rounded-lg overflow-hidden">
                                <table className="w-full text-center border-collapse text-[10px] font-bold">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100">
                                            <th rowSpan={2} className="border-r border-slate-100 py-3 uppercase tracking-wider text-slate-400">BANGLA</th>
                                            <th className="border-r border-slate-100 py-2 uppercase tracking-wider text-slate-400">TOTAL MARK</th>
                                            <th className="border-r border-slate-100 py-2 uppercase tracking-wider text-slate-400">GPA</th>
                                            <th className="border-r border-slate-100 py-2 uppercase tracking-wider text-slate-400">RESULT</th>
                                            <th className="py-2 uppercase tracking-wider text-slate-400">POSITION</th>
                                        </tr>
                                        <tr className="bg-slate-50/80 border-b border-slate-100">
                                            <th className="p-0 border-r border-slate-100">
                                                <div className="grid grid-cols-2 divide-x divide-slate-100">
                                                    <span className="py-2 uppercase tracking-tight text-slate-500">FIRST TERM EXAM (100)</span>
                                                    <span className="py-2 uppercase tracking-tight text-slate-500">RESULT</span>
                                                </div>
                                            </th>
                                            <th className="border-r border-slate-100"></th>
                                            <th className="border-r border-slate-100"></th>
                                            <th className="border-r border-slate-100"></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        <tr className="divide-x divide-slate-50">
                                            <td className="p-0 border-r border-slate-50">
                                                <div className="grid grid-cols-2 divide-x divide-slate-50">
                                                    <span className="py-4 text-slate-400">0</span>
                                                    <span className="py-4 text-slate-400">0</span>
                                                </div>
                                            </td>
                                            <td className="py-4 text-slate-400">0.00</td>
                                            <td className="py-4 text-slate-400"></td>
                                            <td className="py-4 text-slate-400"></td>
                                            <td className="py-4 text-slate-400"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-8 text-[11px] font-bold text-slate-500">Date of publication of result : 22nd Feb, 2026</p>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export const ProgressCardReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', section: '', student: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Progress Card Report" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>STUDENT *</Label>
                    <FormSelect name="student" value={formData.student} onChange={handleInputChange} options={[{ name: 'Mozell Lubowitz', value: '1' }]} placeholder="Select Student *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-10">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="text-sm font-bold text-slate-700">Progress Card Report</h3>
                        <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-6 py-2 text-[10px] font-black uppercase shadow-lg shadow-primary/20 flex items-center space-x-2 transition-all">
                            <Printer size={14} />
                            <span>PRINT</span>
                        </Button>
                    </div>

                    <Card className="border border-slate-100 shadow-sm bg-white overflow-hidden p-0">
                        {/* banner header */}
                        <div className="bg-gradient-to-r from-[#4b149b] to-[#7c32ff] p-8 text-white relative overflow-hidden flex justify-between items-start">
                            <div className="relative z-10 space-y-1">
                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl inline-block mb-2">
                                    <div className="text-2xl font-black italic tracking-tighter">INFIX</div>
                                    <div className="text-[7px] font-black uppercase tracking-[0.2em] opacity-80">Ultimate Education ERP</div>
                                </div>
                            </div>
                            <div className="text-right space-y-1 relative z-10">
                                <h2 className="text-xl font-black">InfixEdu</h2>
                                <p className="text-[10px] font-medium opacity-80">Al Khuwayr, Muscat, Oman</p>
                                <p className="text-[10px] font-medium opacity-80">Email: hello@aorasoft.com , Phone: +96897002784</p>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                        </div>

                        <div className="border-y border-slate-100 py-3 bg-slate-50/50">
                            <h3 className="text-[11px] font-black text-slate-700 text-center uppercase tracking-widest text-[#7c32ff] underline">Progress Report</h3>
                        </div>

                        <div className="p-8 flex justify-between items-start">
                            <div className="grid grid-cols-1 gap-1">
                                <div className="text-[15px] font-black text-[#5625bf] mb-2 uppercase">MOZELL LUBOWITZ</div>
                                <div className="space-y-1 text-[11px] font-bold">
                                    <div className="flex"><span className="w-32 text-slate-400">Academic Year</span><span className="text-slate-700">: 2026</span></div>
                                    <div className="flex"><span className="w-32 text-slate-400">Admission No</span><span className="text-slate-700">: 52164</span></div>
                                    <div className="flex"><span className="w-32 text-slate-400">Roll No</span><span className="text-slate-700">: 85822</span></div>
                                    <div className="flex"><span className="w-32 text-slate-400">Class</span><span className="text-slate-700">: Class 1</span></div>
                                    <div className="flex"><span className="w-32 text-slate-400">Section</span><span className="text-slate-700">: A</span></div>
                                </div>
                            </div>

                            <div className="border border-slate-100 rounded-lg overflow-hidden">
                                <table className="w-full text-[9px] font-bold border-collapse">
                                    <thead className="bg-slate-50/50 text-slate-400 uppercase">
                                        <tr>
                                            <th className="px-3 py-1 border-r border-slate-100">Starting</th>
                                            <th className="px-3 py-1 border-r border-slate-100">Ending</th>
                                            <th className="px-3 py-1 border-r border-slate-100">GPA</th>
                                            <th className="px-3 py-1 border-r border-slate-100">Grade</th>
                                            <th className="px-3 py-1">Evaluation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-600">
                                        {[
                                            { s: 80, e: 100, g: 5, gr: 'A+', ev: 'Outstanding !' },
                                            { s: 70, e: 79.99, g: 4, gr: 'A', ev: 'Very Good !' },
                                            { s: 60, e: 69.99, g: 3.5, gr: 'A-', ev: 'Good !' },
                                            { s: 50, e: 59.99, g: 3, gr: 'B', ev: 'Outstanding !' },
                                            { s: 40, e: 49.99, g: 2, gr: 'C', ev: 'Bad !' },
                                            { s: 33, e: 39.99, g: 1, gr: 'D', ev: 'Very Bad !' },
                                            { s: 0, e: 32.99, g: 0, gr: 'F', ev: 'Failed !' },
                                        ].map((r, i) => (
                                            <tr key={i} className="border-t border-slate-100">
                                                <td className="px-3 py-1 border-r border-slate-100">{r.s}</td>
                                                <td className="px-3 py-1 border-r border-slate-100">{r.e}</td>
                                                <td className="px-3 py-1 border-r border-slate-100">{r.g}</td>
                                                <td className="px-3 py-1 border-r border-slate-100">{r.gr}</td>
                                                <td className="px-3 py-1">{r.ev}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="px-8 pb-10">
                            <table className="w-full text-left text-[10px] font-bold border-collapse border border-slate-100">
                                <thead className="bg-slate-50/50 text-slate-400 uppercase border-b border-slate-100">
                                    <tr>
                                        <th className="px-4 py-2 border-r border-slate-100">SUBJECTS</th>
                                        <th className="px-4 py-2 border-r border-slate-100">FIRST TERM MARKS</th>
                                        <th className="px-4 py-2 border-r border-slate-100">TOTAL</th>
                                        <th className="px-4 py-2 border-r border-slate-100">AVERAGE</th>
                                        <th className="px-4 py-2">LETTER GRADE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-50">
                                        <td className="px-4 py-4 text-slate-700 border-r border-slate-50">Bangla</td>
                                        <td className="px-4 py-4 text-slate-400 border-r border-slate-50 text-center">100.00</td>
                                        <td className="px-4 py-4 text-slate-400 border-r border-slate-50 text-center">100.00</td>
                                        <td className="px-4 py-4 text-slate-400 border-r border-slate-50 text-center">100.00</td>
                                        <td className="px-4 py-4 text-slate-400 text-center">A+</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="mt-6 ml-auto w-72 space-y-0 border border-slate-100 rounded-lg overflow-hidden">
                                <div className="flex border-b border-slate-100 py-2 px-4 text-[10px] font-bold bg-slate-50/30">
                                    <span className="w-32 text-slate-400 uppercase">Total Marks</span>
                                    <span className="text-slate-700">100.00 out of 100</span>
                                </div>
                                <div className="flex border-b border-slate-100 py-2 px-4 text-[10px] font-bold">
                                    <span className="w-32 text-slate-400 uppercase">GPA</span>
                                    <span className="text-slate-700">5.00</span>
                                </div>
                                <div className="flex border-b border-slate-100 py-2 px-4 text-[10px] font-bold bg-slate-50/30">
                                    <span className="w-32 text-slate-400 uppercase">Grade</span>
                                    <span className="text-slate-700">A+</span>
                                </div>
                                <div className="flex py-2 px-4 text-[10px] font-bold">
                                    <span className="w-32 text-slate-400 uppercase">Evaluation</span>
                                    <span className="text-slate-700">Outstanding !</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export const ProgressCardReport100 = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', section: '', student: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Progress Card Report 100 Percent" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>STUDENT *</Label>
                    <FormSelect name="student" value={formData.student} onChange={handleInputChange} options={[{ name: 'Mozell Lubowitz', value: '1' }]} placeholder="Select Student *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-10">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="text-sm font-bold text-slate-700">Progress Card Report</h3>
                        <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-6 py-2 text-[10px] font-black uppercase shadow-lg shadow-primary/20 flex items-center space-x-2 transition-all">
                            <Printer size={14} />
                            <span>PRINT</span>
                        </Button>
                    </div>

                    <Card className="border border-slate-100 shadow-sm bg-white overflow-hidden p-0">
                        {/* banner header */}
                        <div className="bg-gradient-to-r from-[#4b149b] to-[#7c32ff] p-8 text-white relative overflow-hidden flex justify-between items-start">
                            <div className="relative z-10 space-y-1">
                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl inline-block mb-2">
                                    <div className="text-2xl font-black italic tracking-tighter">INFIX</div>
                                    <div className="text-[7px] font-black uppercase tracking-[0.2em] opacity-80">Ultimate Education ERP</div>
                                </div>
                            </div>
                            <div className="text-right space-y-1 relative z-10">
                                <h2 className="text-xl font-black">InfixEdu</h2>
                                <p className="text-[10px] font-medium opacity-80">Al Khuwayr, Muscat, Oman</p>
                                <p className="text-[10px] font-medium opacity-80">Email: hello@aorasoft.com , Phone: +96897002784</p>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                        </div>

                        <div className="border-y border-slate-100 py-3 bg-slate-50/50">
                            <h3 className="text-[11px] font-black text-slate-700 text-center uppercase tracking-widest text-[#7c32ff] underline">Progress Report</h3>
                        </div>

                        <div className="p-8 flex justify-between items-start">
                            <div className="grid grid-cols-1 gap-1">
                                <div className="text-[15px] font-black text-[#5625bf] mb-2 uppercase">MOZELL LUBOWITZ</div>
                                <div className="space-y-1 text-[11px] font-bold">
                                    <div className="flex"><span className="w-32 text-slate-400">Academic Year</span><span className="text-slate-700">: 2026</span></div>
                                    <div className="flex"><span className="w-32 text-slate-400">Admission No</span><span className="text-slate-700">: 52164</span></div>
                                    <div className="flex"><span className="w-32 text-slate-400">Roll No</span><span className="text-slate-700">: 85822</span></div>
                                    <div className="flex"><span className="w-32 text-slate-400">Class</span><span className="text-slate-700">: Class 1</span></div>
                                    <div className="flex"><span className="w-32 text-slate-400">Section</span><span className="text-slate-700">: A</span></div>
                                </div>
                            </div>

                            <div className="border border-slate-100 rounded-lg overflow-hidden scale-90 origin-top-right">
                                <table className="w-full text-[9px] font-bold border-collapse">
                                    <thead className="bg-slate-50/50 text-slate-400 uppercase">
                                        <tr>
                                            <th className="px-3 py-1 border-r border-slate-100">Starting</th>
                                            <th className="px-3 py-1 border-r border-slate-100">Ending</th>
                                            <th className="px-3 py-1 border-r border-slate-100">GPA</th>
                                            <th className="px-3 py-1 border-r border-slate-100">Grade</th>
                                            <th className="px-3 py-1">Evaluation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-600">
                                        {[
                                            { s: 80, e: 100, g: 5, gr: 'A+', ev: 'Outstanding !' },
                                            { s: 70, e: 79.99, g: 4, gr: 'A', ev: 'Very Good !' },
                                            { s: 60, e: 69.99, g: 3.5, gr: 'A-', ev: 'Good !' },
                                            { s: 50, e: 59.99, g: 3, gr: 'B', ev: 'Outstanding !' },
                                            { s: 40, e: 49.99, g: 2, gr: 'C', ev: 'Bad !' },
                                            { s: 33, e: 39.99, g: 1, gr: 'D', ev: 'Very Bad !' },
                                            { s: 0, e: 32.99, g: 0, gr: 'F', ev: 'Failed !' },
                                        ].map((r, i) => (
                                            <tr key={i} className="border-t border-slate-100">
                                                <td className="px-3 py-1 border-r border-slate-100">{r.s}</td>
                                                <td className="px-3 py-1 border-r border-slate-100">{r.e}</td>
                                                <td className="px-3 py-1 border-r border-slate-100">{r.g}</td>
                                                <td className="px-3 py-1 border-r border-slate-100">{r.gr}</td>
                                                <td className="px-3 py-1">{r.ev}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="px-8 pb-10">
                            <table className="w-full text-left text-[10px] font-bold border-collapse border border-slate-100">
                                <thead className="bg-slate-50/50 text-slate-400 uppercase border-b border-slate-100">
                                    <tr>
                                        <th className="px-4 py-2 border-r border-slate-100">SUBJECTS</th>
                                        <th className="px-4 py-2 border-r border-slate-100">FIRST TERM MARKS</th>
                                        <th className="px-4 py-2 border-r border-slate-100">TOTAL</th>
                                        <th className="px-4 py-2 border-r border-slate-100">AVERAGE</th>
                                        <th className="px-4 py-2">LETTER GRADE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-50">
                                        <td className="px-4 py-4 text-slate-700 border-r border-slate-50 uppercase">Bangla</td>
                                        <td className="px-4 py-4 text-slate-400 border-r border-slate-50 text-center">100.00</td>
                                        <td className="px-4 py-4 text-slate-400 border-r border-slate-50 text-center">100.00</td>
                                        <td className="px-4 py-4 text-slate-400 border-r border-slate-50 text-center">100.00</td>
                                        <td className="px-4 py-4 text-slate-400 text-center uppercase">A+</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="mt-6 ml-auto w-72 space-y-0 border border-slate-100 rounded-lg overflow-hidden">
                                <div className="flex border-b border-slate-100 py-2 px-4 text-[9px] font-bold bg-slate-50/30">
                                    <span className="w-32 text-slate-400 uppercase">Total Marks</span>
                                    <span className="text-slate-700">100.00 out of 100</span>
                                </div>
                                <div className="flex border-b border-slate-100 py-2 px-4 text-[9px] font-bold">
                                    <span className="w-32 text-slate-400 uppercase">GPA</span>
                                    <span className="text-slate-700">5.00</span>
                                </div>
                                <div className="flex border-b border-slate-100 py-2 px-4 text-[9px] font-bold bg-slate-50/30">
                                    <span className="w-32 text-slate-400 uppercase">Grade</span>
                                    <span className="text-slate-700">A+</span>
                                </div>
                                <div className="flex py-2 px-4 text-[10px] font-bold">
                                    <span className="w-32 text-slate-400 uppercase">Evaluation</span>
                                    <span className="text-slate-700">Outstanding !</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export const MarkSheetReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ exam: '', class: '', section: '', student: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Mark Sheet Report Student" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>EXAM *</Label>
                    <FormSelect name="exam" value={formData.exam} onChange={handleInputChange} options={[{ name: 'First Term', value: '1' }]} placeholder="Select Exam *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>STUDENT *</Label>
                    <FormSelect name="student" value={formData.student} onChange={handleInputChange} options={[{ name: 'Mozell Lubowitz', value: '1' }]} placeholder="Select Student *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-10">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="text-sm font-bold text-slate-700">Mark Sheet Report</h3>
                        <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-6 py-2 text-[10px] font-black uppercase shadow-lg shadow-primary/20 flex items-center space-x-2 transition-all">
                            <Printer size={14} />
                            <span>PRINT</span>
                        </Button>
                    </div>

                    <Card className="border border-slate-100 shadow-sm bg-white overflow-hidden p-0 relative">
                        {/* banner header */}
                        <div className="bg-gradient-to-r from-[#4b149b] to-[#7c32ff] p-8 text-white relative overflow-hidden flex justify-between items-center">
                            <div className="relative z-10 space-y-1">
                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl inline-block mb-2">
                                    <div className="text-2xl font-black italic tracking-tighter">INFIX</div>
                                    <div className="text-[7px] font-black uppercase tracking-[0.2em] opacity-80">Ultimate Education ERP</div>
                                </div>
                            </div>
                            <div className="text-center space-y-1 relative z-10 mr-20">
                                <h2 className="text-xl font-black">InfixEdu</h2>
                                <p className="text-[10px] font-medium opacity-80">Al Khuwayr, Muscat, Oman</p>
                                <p className="text-[10px] font-medium opacity-80">Email: hello@aorasoft.com , Phone: +96897002784</p>
                            </div>

                            {/* Student Photo Placeholder */}
                            <div className="relative z-10 w-20 h-20 rounded-lg border-2 border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                                <User className="text-white/40" size={40} />
                            </div>

                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                        </div>

                        <div className="p-8 flex justify-between items-start">
                            <div className="grid grid-cols-1 gap-1">
                                <div className="text-[15px] font-black text-[#5625bf] mb-2 uppercase">MOZELL LUBOWITZ</div>
                                <div className="space-y-1 text-[11px] font-bold">
                                    <div className="flex"><span className="w-32 text-slate-400">Academic Year</span><span className="text-slate-700">: 2026</span></div>
                                    <div className="flex"><span className="w-32 text-slate-400">Class</span><span className="text-slate-700">: Class 1</span></div>
                                    <div className="flex"><span className="w-32 text-slate-400">Section</span><span className="text-slate-700">: A</span></div>
                                    <div className="flex"><span className="w-32 text-slate-400">Admission No</span><span className="text-slate-700">: 52164</span></div>
                                    <div className="flex"><span className="w-32 text-slate-400">Roll No</span><span className="text-slate-700">: 85822</span></div>
                                    <div className="flex"><span className="w-32 text-slate-400">Date Of Birth</span><span className="text-slate-700">: 9th Apr, 1979</span></div>
                                </div>
                            </div>

                            <div className="border border-slate-100 rounded-lg overflow-hidden scale-90 origin-top-right">
                                <table className="w-full text-[9px] font-bold border-collapse">
                                    <thead className="bg-slate-50/50 text-slate-400 uppercase">
                                        <tr>
                                            <th className="px-3 py-1 border-r border-slate-100">Starting</th>
                                            <th className="px-3 py-1 border-r border-slate-100">Ending</th>
                                            <th className="px-3 py-1 border-r border-slate-100">GPA</th>
                                            <th className="px-3 py-1 border-r border-slate-100">Grade</th>
                                            <th className="px-3 py-1">Evaluation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-600">
                                        {[
                                            { s: 80, e: 100, g: 5, gr: 'A+', ev: 'Outstanding !' },
                                            { s: 70, e: 79.99, g: 4, gr: 'A', ev: 'Very Good !' },
                                            { s: 60, e: 69.99, g: 3.5, gr: 'A-', ev: 'Good !' },
                                            { s: 50, e: 59.99, g: 3, gr: 'B', ev: 'Outstanding !' },
                                            { s: 40, e: 49.99, g: 2, gr: 'C', ev: 'Bad !' },
                                            { s: 33, e: 39.99, g: 1, gr: 'D', ev: 'Very Bad !' },
                                            { s: 0, e: 32.99, g: 0, gr: 'F', ev: 'Failed !' },
                                        ].map((r, i) => (
                                            <tr key={i} className="border-t border-slate-100">
                                                <td className="px-3 py-1 border-r border-slate-100">{r.s}</td>
                                                <td className="px-3 py-1 border-r border-slate-100">{r.e}</td>
                                                <td className="px-3 py-1 border-r border-slate-100">{r.g}</td>
                                                <td className="px-3 py-1 border-r border-slate-100">{r.gr}</td>
                                                <td className="px-3 py-1">{r.ev}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="px-8 flex flex-col items-center mb-8">
                            <div className="text-[12px] font-black text-[#5625bf] uppercase">First Term</div>
                            <div className="text-[10px] font-bold text-slate-400 border-b border-[#5625bf] pb-1 px-4 mb-6">Mark sheet</div>

                            <table className="w-full text-left text-[10px] font-bold border-collapse border border-slate-100 mb-10">
                                <thead className="bg-slate-50/50 text-slate-400 uppercase border-b border-slate-100">
                                    <tr>
                                        <th className="px-4 py-2 border-r border-slate-100">SUBJECT NAME</th>
                                        <th className="px-4 py-2 border-r border-slate-100 text-center">TOTAL MARK</th>
                                        <th className="px-4 py-2 border-r border-slate-100 text-center">HIGHEST MARKS</th>
                                        <th className="px-4 py-2 border-r border-slate-100 text-center">OBTAINED MARKS</th>
                                        <th className="px-4 py-2 border-r border-slate-100 text-center">LETTER GRADE</th>
                                        <th className="px-4 py-2 text-center">REMARKS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-50">
                                        <td className="px-4 py-4 text-slate-700 border-r border-slate-50 uppercase">Bangla</td>
                                        <td className="px-4 py-4 text-slate-400 border-r border-slate-50 text-center">100</td>
                                        <td className="px-4 py-4 text-slate-400 border-r border-slate-50 text-center">100</td>
                                        <td className="px-4 py-4 text-slate-400 border-r border-slate-50 text-center">100</td>
                                        <td className="px-4 py-4 text-slate-400 border-r border-slate-50 text-center">A+</td>
                                        <td className="px-4 py-4 text-slate-400 text-center">Good</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="grid grid-cols-2 gap-x-20 w-full px-20">
                                <div className="space-y-0 border border-slate-100 rounded-lg overflow-hidden h-fit">
                                    {[
                                        { l: 'Attendance', v: '0 of 0' },
                                        { l: 'Average Mark', v: '100.00' },
                                        { l: 'Without Optional', v: '5.00' },
                                        { l: 'Grade', v: 'A+' }
                                    ].map((r, i) => (
                                        <div key={i} className={`flex border-b last:border-0 border-slate-100 py-2 px-4 text-[9px] font-bold ${i % 2 === 0 ? 'bg-slate-50/30' : ''}`}>
                                            <span className="w-32 text-slate-400 uppercase">{r.l}</span>
                                            <span className="text-slate-700">{r.v}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-0 border border-slate-100 rounded-lg overflow-hidden h-fit">
                                    {[
                                        { l: 'Total Mark', v: '100' },
                                        { l: 'GPA Above ()', v: '0' },
                                        { l: 'GPA', v: '5.00' },
                                        { l: 'Evaluation', v: 'Outstanding !' }
                                    ].map((r, i) => (
                                        <div key={i} className={`flex border-b last:border-0 border-slate-100 py-2 px-4 text-[9px] font-bold ${i % 2 === 0 ? 'bg-slate-50/30' : ''}`}>
                                            <span className="w-32 text-slate-400 uppercase">{r.l}</span>
                                            <span className="text-slate-700">{r.v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full text-center mt-6 text-[9px] font-bold text-slate-400 border-b border-dashed border-slate-100 pb-2">Position</div>
                        </div>

                        <div className="px-8 pb-8 flex justify-between items-end">
                            <div className="text-[9px] font-bold text-slate-400 italic">Date of Publication : 22nd Feb, 2026</div>
                            <div className="text-center">
                                <div className="text-[12px] font-black italic text-[#5625bf] leading-none">Infixedu</div>
                                <div className="text-[8px] font-black uppercase text-slate-400 mt-1">(Exam Controller)</div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};


export const PreviousResultReport = () => {
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ admissionNo: '' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Previous Result" section="Reports" />
            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>ADMISSION NUMBER *</Label>
                    <input
                        type="text"
                        name="admissionNo"
                        value={formData.admissionNo}
                        onChange={handleInputChange}
                        placeholder="Admission Number *"
                        className="w-full h-11 px-4 bg-slate-50 border border-slate-100 rounded-lg text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7c32ff]/20 focus:border-[#7c32ff] transition-all"
                    />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <Card className="p-20 text-center border-none shadow-sm bg-white rounded-2xl">
                        <p className="text-slate-400 font-bold">Previous results for Admission No: {formData.admissionNo} will appear here.</p>
                    </Card>
                </div>
            )}
        </div>
    );
};


// Staff Reports
export const StaffAttendanceReport = () => {
    const { classes, sections } = useAcademicData(); // Assuming roles might be fetched similarly or mock them
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ role: '', month: '', year: '2026' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const roles = [
        { name: 'Admin', value: '1' },
        { name: 'Teacher', value: '2' },
        { name: 'Accountant', value: '3' },
        { name: 'Receptionist', value: '4' },
        { name: 'Librarian', value: '5' },
    ];

    const months = [
        { name: 'January', value: '1' }, { name: 'February', value: '2' }, { name: 'March', value: '3' },
        { name: 'April', value: '4' }, { name: 'May', value: '5' }, { name: 'June', value: '6' },
        { name: 'July', value: '7' }, { name: 'August', value: '8' }, { name: 'September', value: '9' },
        { name: 'October', value: '10' }, { name: 'November', value: '11' }, { name: 'December', value: '12' },
    ];

    const years = [
        { name: '2024', value: '2024' }, { name: '2025', value: '2025' }, { name: '2026', value: '2026' },
    ];

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const weekDays = ['THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const mockData = [
        { name: 'Napoleon', no: '12', p: 1, l: 0, a: 4, h: 0, f: 4, le: 0, percentage: '55.56%', attendance: ['W', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', 'FO', 'PO', 'FO', 'PO', 'AO', 'AO', 'FO', 'AO', 'AO'] },
        { name: 'Boris', no: '13', p: 2, l: 3, a: 2, h: 0, f: 2, le: 0, percentage: '77.78%', attendance: ['W', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', 'LO', 'LO', 'LO', 'PO', 'PO', 'AO', 'AO', 'FO', 'FO'] },
        { name: 'Jean', no: '14', p: 4, l: 2, a: 1, h: 0, f: 2, le: 0, percentage: '88.89%', attendance: ['W', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', 'LO', 'FO', 'PO', 'FO', 'PO', 'PO', 'LO', 'AO', 'PO'] },
        { name: 'Timmathy', no: '15', p: 2, l: 4, a: 1, h: 0, f: 2, le: 0, percentage: '88.89%', attendance: ['W', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', 'FO', 'PO', 'LO', 'LO', 'LO', 'PO', 'FO', 'AO', 'LO'] },
        { name: 'Dock', no: '16', p: 3, l: 0, a: 2, h: 0, f: 4, le: 0, percentage: '77.78%', attendance: ['W', '', '', '', '', '', '', '', 'W', '', '', '', '', '', '', 'W', '', '', '', '', '', '', '', 'FO', 'PO', 'PO', 'AO', 'AO', 'FO', 'FO', 'PO', 'PO'] },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Staff Attendance Report" section="Human Resource" />

            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>ROLE *</Label>
                    <FormSelect name="role" value={formData.role} onChange={handleInputChange} options={roles} placeholder="Accountant" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SELECT MONTH *</Label>
                    <FormSelect name="month" value={formData.month} onChange={handleInputChange} options={months} placeholder="January" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SELECT YEAR *</Label>
                    <FormSelect name="year" value={formData.year} onChange={handleInputChange} options={years} placeholder="2026" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-6">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="text-sm font-bold text-slate-700">Staff Attendance Report</h3>
                        <Button className="bg-[#7c32ff] hover:bg-[#6b28eb] text-white rounded-lg px-6 py-2 text-[10px] font-black uppercase shadow-lg shadow-primary/20 flex items-center space-x-2 transition-all">
                            <Printer size={14} />
                            <span>PRINT</span>
                        </Button>
                    </div>

                    <Card className="border-none shadow-sm bg-white overflow-hidden p-0">
                        <div className="p-4 border-b border-slate-50 flex justify-end items-center space-x-4 text-[10px] font-bold">
                            <div className="flex items-center space-x-1"><span className="text-slate-400">Present :</span> <span className="text-blue-500">P</span></div>
                            <div className="flex items-center space-x-1"><span className="text-slate-400">Late :</span> <span className="text-orange-400">L</span></div>
                            <div className="flex items-center space-x-1"><span className="text-slate-400">Absent :</span> <span className="text-red-500">A</span></div>
                            <div className="flex items-center space-x-1"><span className="text-slate-400">Holiday :</span> <span className="text-blue-600">H</span></div>
                            <div className="flex items-center space-x-1"><span className="text-slate-400">Leave :</span> <span className="text-cyan-500">LE</span></div>
                            <div className="flex items-center space-x-1"><span className="text-slate-400">Half Day :</span> <span className="text-yellow-500">F</span></div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-[9px] font-bold">
                                <thead>
                                    <tr className="bg-slate-50/50 text-slate-400 uppercase">
                                        <th className="px-4 py-3 border-r border-slate-100 sticky left-0 bg-white z-20">Staff Name</th>
                                        <th className="px-3 py-3 border-r border-slate-100 sticky left-[100px] bg-white z-20">Staff No</th>
                                        <th className="px-2 py-3 border-r border-slate-100">P</th>
                                        <th className="px-2 py-3 border-r border-slate-100">L</th>
                                        <th className="px-2 py-3 border-r border-slate-100">A</th>
                                        <th className="px-2 py-3 border-r border-slate-100">H</th>
                                        <th className="px-2 py-3 border-r border-slate-100">F</th>
                                        <th className="px-2 py-3 border-r border-slate-100">LE</th>
                                        <th className="px-3 py-3 border-r border-slate-100">%</th>
                                        {days.map((d, i) => (
                                            <th key={d} className="px-2 py-1 border-r border-slate-100 text-center min-w-[35px]">
                                                <div>{d}</div>
                                                <div className="text-[7px] opacity-60 font-medium">{weekDays[i]}</div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockData.map((row, idx) => (
                                        <tr key={idx} className="border-t border-slate-50 hover:bg-slate-50/30 transition-colors">
                                            <td className="px-4 py-3 border-r border-slate-100 sticky left-0 bg-white z-10 text-slate-700">{row.name}</td>
                                            <td className="px-3 py-3 border-r border-slate-100 sticky left-[100px] bg-white z-10 text-slate-400">{row.no}</td>
                                            <td className="px-2 py-3 border-r border-slate-100 text-center text-slate-600">{row.p}</td>
                                            <td className="px-2 py-3 border-r border-slate-100 text-center text-slate-600">{row.l}</td>
                                            <td className="px-2 py-3 border-r border-slate-100 text-center text-slate-600">{row.a}</td>
                                            <td className="px-2 py-3 border-r border-slate-100 text-center text-slate-600">{row.h}</td>
                                            <td className="px-2 py-3 border-r border-slate-100 text-center text-slate-600">{row.f}</td>
                                            <td className="px-2 py-3 border-r border-slate-100 text-center text-slate-600">{row.le}</td>
                                            <td className="px-3 py-3 border-r border-slate-100 text-center text-slate-600">{row.percentage}</td>
                                            {row.attendance.map((status, i) => (
                                                <td key={i} className={`px-2 py-3 border-r border-slate-50 text-center min-w-[35px] ${status === 'W' ? 'text-slate-300' : ''}`}>
                                                    <span className={
                                                        status.startsWith('P') ? 'text-blue-500' :
                                                            status.startsWith('L') ? 'text-orange-400' :
                                                                status.startsWith('A') ? 'text-red-500' :
                                                                    status.startsWith('F') ? 'text-yellow-500' :
                                                                        status.startsWith('H') ? 'text-blue-600' :
                                                                            status === 'LE' ? 'text-cyan-500' : ''
                                                    }>
                                                        {status}
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export const StaffPayrollReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ role: '', month: '', year: '2026' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const roles = [
        { name: 'Admin', value: '1' },
        { name: 'Teacher', value: '2' },
        { name: 'Accountant', value: '3' },
        { name: 'Receptionist', value: '4' },
        { name: 'Librarian', value: '5' },
    ];

    const months = [
        { name: 'January', value: '1' }, { name: 'February', value: '2' }, { name: 'March', value: '3' },
        { name: 'April', value: '4' }, { name: 'May', value: '5' }, { name: 'June', value: '6' },
        { name: 'July', value: '7' }, { name: 'August', value: '8' }, { name: 'September', value: '9' },
        { name: 'October', value: '10' }, { name: 'November', value: '11' }, { name: 'December', value: '12' },
    ];

    const years = [
        { name: '2024', value: '2024' }, { name: '2025', value: '2025' }, { name: '2026', value: '2026' },
    ];

    const columns = [
        { header: "Staff Name", key: "name", sortable: true },
        { header: "Role", key: "role" },
        { header: "Description", key: "description" },
        { header: "Month - Year", key: "monthYear" },
        { header: "Payslip #", key: "payslip" },
        { header: "Basic Salary($)", key: "basic" },
        { header: "Earnings($)", key: "earnings" },
        { header: "Deductions($)", key: "deductions" },
        { header: "Leave Deductions($)", key: "leaveDeductions" },
        { header: "Gross Salary($)", key: "gross" },
        { header: "Tax($)", key: "tax" },
        { header: "Net Salary($)", key: "net" },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Payroll Report" section="Human Resource" />

            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>ROLE *</Label>
                    <FormSelect name="role" value={formData.role} onChange={handleInputChange} options={roles} placeholder="Accountant" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SELECT MONTH *</Label>
                    <FormSelect name="month" value={formData.month} onChange={handleInputChange} options={months} placeholder="January" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SELECT YEAR *</Label>
                    <FormSelect name="year" value={formData.year} onChange={handleInputChange} options={years} placeholder="2026" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-6">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="text-sm font-bold text-slate-700">Staff List</h3>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center border border-slate-100 rounded-lg px-3 py-1.5 bg-white shadow-sm">
                                <Search size={14} className="text-slate-300 mr-2" />
                                <input type="text" placeholder="SEARCH" className="text-[10px] font-bold outline-none w-40 bg-transparent placeholder:text-slate-300" />
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

                    <Card className="border-none shadow-sm bg-white overflow-hidden p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-[10px] font-bold">
                                <thead>
                                    <tr className="bg-slate-50/50 text-slate-400 uppercase">
                                        {columns.map((col, i) => (
                                            <th key={i} className="px-4 py-4 border-r border-slate-100 text-left whitespace-nowrap">
                                                <div className="flex items-center space-x-1">
                                                    <span>{col.header}</span>
                                                    {col.sortable && <ArrowUpDown size={10} className="text-slate-300" />}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t border-slate-50">
                                        <td colSpan={12} className="px-4 py-16 text-center text-slate-300 bg-slate-50/10">
                                            No Data Available In Table
                                        </td>
                                    </tr>
                                    <tr className="border-t border-slate-50 bg-slate-50/20">
                                        <td colSpan={5} className="px-4 py-4 text-center text-slate-500 uppercase tracking-wider">Grand Total</td>
                                        <td className="px-4 py-4 text-slate-700">$0.00</td>
                                        <td className="px-4 py-4 text-slate-700">$0.00</td>
                                        <td className="px-4 py-4 text-slate-700">$0.00</td>
                                        <td className="px-4 py-4 text-slate-700">$0.00</td>
                                        <td className="px-4 py-4 text-slate-700">$0.00</td>
                                        <td className="px-4 py-4 text-slate-700">$0.00</td>
                                        <td className="px-4 py-4 text-slate-700">$0.00</td>
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
            )}
        </div>
    );
};


// Fees Reports
export const FeesDueReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', section: '', student: '', dateRange: '02/16/2026 - 02/23/2026' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const columns = [
        { header: "Admission No", key: "admissionNo" },
        { header: "Roll No", key: "rollNo" },
        { header: "Name", key: "name" },
        { header: "Due Date", key: "dueDate" },
        { header: "Amount ($)", key: "amount" },
        { header: "Paid ($)", key: "paid" },
        { header: "Waiver ($)", key: "waiver" },
        { header: "Fine ($)", key: "fine" },
        { header: "Balance ($)", key: "balance" },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Fees Due" section="Fees" />

            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label>DATE RANGE</Label>
                    <div className="flex items-center border border-slate-100 rounded-lg px-3 py-2.5 bg-white shadow-sm">
                        <input type="text" name="dateRange" value={formData.dateRange} onChange={handleInputChange} className="text-[10px] font-bold outline-none w-full bg-transparent text-slate-700" />
                    </div>
                </div>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label>STUDENT</Label>
                    <FormSelect name="student" value={formData.student} onChange={handleInputChange} options={[{ name: 'Select Student', value: '' }]} placeholder="Select Student" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-6">
                    <div className="flex justify-between items-end px-2">
                        <div className="flex-1 max-w-sm">
                            <div className="flex items-center border-b border-slate-100 pb-1 group focus-within:border-[#7c32ff] transition-all">
                                <Search size={14} className="text-slate-300 mr-2 group-focus-within:text-[#7c32ff]" />
                                <input type="text" placeholder="QUICK SEARCH" className="text-[10px] font-bold outline-none w-full bg-transparent placeholder:text-slate-300" />
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
                            <table className="w-full border-collapse text-[10px] font-bold">
                                <thead>
                                    <tr className="bg-slate-50/50 text-slate-400 uppercase">
                                        {columns.map((col, i) => (
                                            <th key={i} className="px-4 py-4 border-r border-slate-100 text-left whitespace-nowrap">
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
                                        <td colSpan={9} className="px-4 py-8 text-center text-slate-400 bg-slate-50/10">
                                            <div className="flex flex-col items-center justify-center space-y-2 py-4">
                                                <div className="text-[11px] font-medium opacity-60">Loading...</div>
                                                <div className="text-[11px] font-medium opacity-60">Processing...</div>
                                            </div>
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
            )}
        </div>
    );
};

export const FineReport = () => <FeesReportLayout title="Fine Report" columnHeader="Fine ($)" section="Fees" reportName="Fine Report" />
export const PaymentReport = () => <FeesReportLayout title="Payment Report" columnHeader="Paid ($)" section="Fees" reportName="Payment Report" />
export const BalanceReport = () => <FeesReportLayout title="Balance Report" columnHeader="Balance ($)" section="Fees" reportName="Balance Report" />
export const WaiverReport = () => <FeesReportLayout title="Waiver Report" columnHeader="Waiver ($)" section="Fees" reportName="Waiver Report" />

const FeesReportLayout = ({ title, columnHeader, section, reportName }) => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ class: '', section: '', student: '', dateRange: '02/16/2026 - 02/23/2026' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const columns = [
        { header: "SL", key: "sl" },
        { header: "Admission No", key: "admissionNo" },
        { header: "Roll No", key: "rollNo" },
        { header: "Name", key: "name" },
        { header: "Due Date", key: "dueDate" },
        { header: columnHeader, key: "value" },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title={title} section={section} />

            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label>DATE RANGE</Label>
                    <div className="flex items-center border border-slate-100 rounded-lg px-3 py-2.5 bg-white shadow-sm">
                        <input type="text" name="dateRange" value={formData.dateRange} onChange={handleInputChange} className="text-[10px] font-bold outline-none w-full bg-transparent text-slate-700" />
                    </div>
                </div>
                <div className="space-y-1">
                    <Label required>CLASS *</Label>
                    <FormSelect name="class" value={formData.class} onChange={handleInputChange} options={classes} placeholder="Select Class *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>SECTION *</Label>
                    <FormSelect name="section" value={formData.section} onChange={handleInputChange} options={sections} placeholder="Select Section *" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label>STUDENT</Label>
                    <FormSelect name="student" value={formData.student} onChange={handleInputChange} options={[{ name: 'Select Student', value: '' }]} placeholder="Select Student" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-6">
                    <div className="flex justify-between items-end px-2">
                        <div className="flex-1 max-w-sm">
                            <div className="flex items-center border-b border-slate-100 pb-1 group focus-within:border-[#7c32ff] transition-all">
                                <Search size={14} className="text-slate-300 mr-2 group-focus-within:text-[#7c32ff]" />
                                <input type="text" placeholder="QUICK SEARCH" className="text-[10px] font-bold outline-none w-full bg-transparent placeholder:text-slate-300" />
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
                            <table className="w-full border-collapse text-[10px] font-bold">
                                <thead>
                                    <tr className="bg-slate-50/50 text-slate-400 uppercase">
                                        {columns.map((col, i) => (
                                            <th key={i} className="px-4 py-4 border-r border-slate-100 text-left whitespace-nowrap">
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
                                        <td colSpan={6} className="px-4 py-8 text-center text-slate-400 bg-slate-50/10">
                                            <div className="flex flex-col items-center justify-center space-y-2 py-4">
                                                <div className="text-[11px] font-medium opacity-60">Loading...</div>
                                                <div className="text-[11px] font-medium opacity-60">Processing...</div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-t border-slate-50 bg-slate-50/20">
                                        <td colSpan={5} className="px-4 py-4 text-right text-slate-500 uppercase tracking-wider text-[11px]">Total</td>
                                        <td className="px-4 py-4 text-slate-700 text-[11px]">0</td>
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
            )}
        </div>
    );
};

export const WalletReport = () => {
    const { classes, sections } = useAcademicData();
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ type: '', status: '', dateRange: '02/16/2026 - 02/23/2026' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const types = [
        { name: 'Deposite', value: '1' },
        { name: 'Refund', value: '2' },
    ];

    const statuses = [
        { name: 'Pending', value: 'pending' },
        { name: 'Approved', value: 'approved' },
        { name: 'Rejected', value: 'rejected' },
    ];

    const columns = [
        { header: "SL", key: "sl" },
        { header: "Name", key: "name" },
        { header: "Status", key: "status" },
        { header: "Apply Date", key: "applyDate" },
        { header: "Approve Date", key: "approveDate" },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Wallet Report" section="My Wallet" />

            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>DATE RANGE *</Label>
                    <div className="flex items-center border border-slate-100 rounded-lg px-3 py-2.5 bg-white shadow-sm">
                        <input type="text" name="dateRange" value={formData.dateRange} onChange={handleInputChange} className="text-[10px] font-bold outline-none w-full bg-transparent text-slate-700" />
                    </div>
                </div>
                <div className="space-y-1">
                    <Label required>TYPE *</Label>
                    <FormSelect name="type" value={formData.type} onChange={handleInputChange} options={types} placeholder="Select Type*" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label>STATUS</Label>
                    <FormSelect name="status" value={formData.status} onChange={handleInputChange} options={statuses} placeholder="Select Status" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-6">
                    <div className="flex justify-between items-end px-2">
                        <div className="flex-1 max-w-sm">
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
                            <table className="w-full border-collapse text-[10px] font-bold">
                                <thead>
                                    <tr className="bg-slate-50/50 text-slate-400 uppercase">
                                        {columns.map((col, i) => (
                                            <th key={i} className="px-4 py-4 border-r border-slate-100 text-left whitespace-nowrap">
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
                                        <td colSpan={5} className="px-4 py-16 text-center text-slate-300 bg-slate-50/10 uppercase tracking-widest">
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
            )}
        </div>
    );
};


// Accounts Reports
export const AccountsPayrollReport = () => {
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ dateRange: '02/16/2026 - 02/23/2026' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const columns = [
        { header: "Name", key: "name" },
        { header: "Expense Head", key: "expenseHead" },
        { header: "Payment Method", key: "paymentMethod" },
        { header: "Amount ($)", key: "amount" },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Payroll Report" section="Accounts" />

            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1 max-w-2xl mx-auto">
                    <div className="flex items-center border border-slate-100 rounded-lg px-3 py-2.5 bg-white shadow-sm focus-within:border-primary transition-all">
                        <input type="text" name="dateRange" value={formData.dateRange} onChange={handleInputChange} className="text-[12px] font-bold outline-none w-full bg-transparent text-slate-700 text-center" />
                    </div>
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-6">
                    <div className="flex justify-between items-end px-2">
                        <div className="flex-1 max-w-xs">
                            <h3 className="text-sm font-bold text-slate-700 mb-2">Payroll Report</h3>
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
                                            <th key={i} className="px-6 py-4 border-r border-slate-100 text-left whitespace-nowrap">
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
                                        <td colSpan={4} className="px-6 py-8 text-center text-slate-400 bg-slate-50/10 tracking-widest uppercase text-[10px]">
                                            No Data Available In Table
                                        </td>
                                    </tr>
                                    <tr className="border-t border-slate-50">
                                        <td colSpan={3} className="px-6 py-4 text-center text-slate-500 font-bold text-[12px]">Total</td>
                                        <td className="px-6 py-4 text-slate-400 font-bold text-[12px]"></td>
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
            )}
        </div>
    );
};

export const AccountsTransactionReport = () => {
    const [openSelect, setOpenSelect] = React.useState(null);
    const [formData, setFormData] = React.useState({ type: '', paymentMethod: 'Cash', dateRange: '02/16/2026 - 02/23/2026' });
    const [showReport, setShowReport] = React.useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const types = [
        { name: 'Income', value: 'income' },
        { name: 'Expense', value: 'expense' },
    ];

    const paymentMethods = [
        { name: 'Cash', value: 'Cash' },
        { name: 'Cheque', value: 'Cheque' },
        { name: 'Bank', value: 'Bank' },
    ];

    const columns = [
        { header: "Date", key: "date" },
        { header: "Name", key: "name" },
        { header: "Payroll", key: "payroll" },
        { header: "Payment Method", key: "paymentMethod" },
        { header: "Amount ($)", key: "amount" },
    ];

    return (
        <div className="p-6 space-y-6">
            <ReportHeader title="Transaction" section="Accounts" />

            <CriteriaCard onSearch={() => setShowReport(true)}>
                <div className="space-y-1">
                    <Label required>DATE RANGE *</Label>
                    <div className="flex items-center border border-slate-100 rounded-lg px-3 py-2.5 bg-white shadow-sm focus-within:border-primary transition-all">
                        <input type="text" name="dateRange" value={formData.dateRange} onChange={handleInputChange} className="text-[12px] font-bold outline-none w-full bg-transparent text-slate-700" />
                    </div>
                </div>
                <div className="space-y-1">
                    <Label required>TYPE *</Label>
                    <FormSelect name="type" value={formData.type} onChange={handleInputChange} options={types} placeholder="Search Type*" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
                <div className="space-y-1">
                    <Label required>PAYMENT METHOD *</Label>
                    <FormSelect name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} options={paymentMethods} placeholder="Cash" openSelect={openSelect} setOpenSelect={setOpenSelect} />
                </div>
            </CriteriaCard>

            {showReport && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-6">
                    <div className="flex justify-between items-end px-2">
                        <div className="flex-1 max-w-xs">
                            <h3 className="text-sm font-bold text-slate-700 mb-2">Income Result</h3>
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
                                            <th key={i} className="px-6 py-4 border-r border-slate-100 text-left whitespace-nowrap">
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
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-400 bg-slate-50/10 tracking-widest uppercase text-[10px]">
                                            No Data Available In Table
                                        </td>
                                    </tr>
                                    <tr className="border-t border-slate-50">
                                        <td colSpan={4} className="px-6 py-12 text-right text-slate-500 font-bold text-[12px]">Grand Total:</td>
                                        <td className="px-6 py-12 text-slate-400 font-bold text-[12px]"></td>
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
            )}
        </div>
    );
};

