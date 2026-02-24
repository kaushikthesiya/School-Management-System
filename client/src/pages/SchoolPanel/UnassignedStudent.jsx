import React, { useState } from 'react';
import { Card, Input } from '../../components/SnowUI';
import {
    Search,
    Printer,
    Columns,
    ArrowUpDown,
    Copy,
    FileSpreadsheet,
    FileText,
    FileCode
} from 'lucide-react';

const UnassignedStudent = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">

            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Unassigned Student List</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span>Dashboard</span>
                        <span>|</span>
                        <span>Student Info</span>
                        <span>|</span>
                        <span className="text-[#7c32ff]">Unassigned Student List</span>
                    </div>
                </div>
            </div>

            {/* Unassigned Student Table Card */}
            <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                        <input
                            type="text"
                            placeholder="QUICK SEARCH"
                            className="pl-10 pr-4 py-2 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-500 outline-none focus:border-[#7c32ff] transition-all w-64 tracking-widest uppercase"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex border border-purple-100 rounded-xl overflow-hidden shadow-sm">
                            <button className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors border-r border-purple-50"><Copy size={16} /></button>
                            <button className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors border-r border-purple-50"><FileSpreadsheet size={16} /></button>
                            <button className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors border-r border-purple-50"><FileText size={16} /></button>
                            <button className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors border-r border-purple-50"><FileCode size={16} /></button>
                            <button className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors border-r border-purple-50"><Printer size={16} /></button>
                            <button className="p-2.5 bg-white text-slate-400 hover:text-[#7c32ff] transition-colors"><Columns size={16} /></button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                {['Admission No', 'Roll No', 'Name', 'Father Name', 'Date Of Birth', 'Gender', 'Type', 'Phone', 'Actions'].map((header, idx) => (
                                    <th key={idx} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                        <div className="flex items-center space-x-2">
                                            <span>{header}</span>
                                            {header !== 'Actions' && <ArrowUpDown size={10} />}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="9" className="px-6 py-12 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest italic tracking-tight">
                                    Processing...
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default UnassignedStudent;
