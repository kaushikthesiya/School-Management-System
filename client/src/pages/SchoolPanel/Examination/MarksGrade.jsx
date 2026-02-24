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

const MarksGrade = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openActionId, setOpenActionId] = useState(null);
    const [formData, setFormData] = useState({
        gradeName: '',
        gpa: '',
        percentFrom: '',
        percentTo: '',
        description: ''
    });

    const [grades] = useState([
        { name: 'A+', gpa: '5.00', from: '80', to: '100', desc: 'Outstanding' },
        { name: 'A', gpa: '4.00', from: '70', to: '79', desc: 'Very Good' },
        { name: 'B', gpa: '3.00', from: '60', to: '69', desc: 'Good' },
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
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Marks Grade</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Examination</span>
                    <span>|</span>
                    <span className="text-slate-500">Marks Grade</span>
                </div>
            </div>

            <div className="px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Grade Card */}
                <Card className="p-10 border-none shadow-snow-lg bg-white rounded-[40px] h-fit">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">
                        Add Marks Grade
                    </h3>
                    <div className="space-y-6">
                        <Input
                            label="GRADE NAME"
                            name="gradeName"
                            value={formData.gradeName}
                            onChange={handleInputChange}
                            placeholder="Grade Name *"
                            required
                        />
                        <Input
                            label="GPA"
                            name="gpa"
                            value={formData.gpa}
                            onChange={handleInputChange}
                            placeholder="GPA *"
                            required
                        />
                        <Input
                            label="PERCENT FROM"
                            name="percentFrom"
                            value={formData.percentFrom}
                            onChange={handleInputChange}
                            placeholder="Percent From *"
                            required
                        />
                        <Input
                            label="PERCENT TO"
                            name="percentTo"
                            value={formData.percentTo}
                            onChange={handleInputChange}
                            placeholder="Percent To *"
                            required
                        />
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                DESCRIPTION
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 min-h-[100px] resize-none"
                            />
                        </div>
                        <div className="flex justify-center pt-6">
                            <Button className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-12 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all w-full">
                                <span>✓ SAVE MARKS GRADE</span>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Grade List Card */}
                <Card className="lg:col-span-2 p-10 border-none shadow-snow-lg bg-white rounded-[40px] overflow-visible">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">
                            Marks Grade List
                        </h3>
                        {/* Search and export buttons pattern */}
                    </div>

                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest first:rounded-l-2xl">
                                        ↓ SL
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ GRADE NAME
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ GPA
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ PERCENT (FROM-TO)
                                    </th>
                                    <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        ↓ DESCRIPTION
                                    </th>
                                    <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest last:rounded-r-2xl">
                                        ↓ ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {grades.map((grade, idx) => (
                                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 px-6 font-bold text-slate-600 text-xs">{idx + 1}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs">{grade.name}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs">{grade.gpa}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs">{grade.from}-{grade.to}</td>
                                        <td className="py-6 px-6 text-slate-400 text-xs">{grade.desc}</td>
                                        <td className="py-6 px-6 text-right relative">
                                            {/* Action Select Dropdown pattern */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MarksGrade;
