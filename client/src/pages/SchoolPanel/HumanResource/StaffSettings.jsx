import React, { useState } from 'react';
import { Card } from '../../../components/SnowUI';
import {
    Layout,
    Save
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StaffSettings = () => {
    const navigate = useNavigate();

    const [settings, setSettings] = useState({
        "Staff No": { edit: false, required: true },
        "Role": { edit: false, required: true },
        "Department": { edit: false, required: true },
        "Designation": { edit: false, required: false },
        "First Name": { edit: true, required: true },
        "Last Name": { edit: true, required: false },
        "Fathers Name": { edit: true, required: false },
        "Mother Name": { edit: true, required: false },
        "Email": { edit: false, required: true },
        "Gender": { edit: true, required: false },
        "Date Of Birth": { edit: true, required: false },
        "Date of Joining": { edit: false, required: false },
        "Mobile": { edit: true, required: false },
        "Marital Status": { edit: false, required: false },
        "Emergency Mobile": { edit: false, required: false },
        "Driving License": { edit: false, required: false },
        "Current Address": { edit: true, required: false },
        "Permanent Address": { edit: true, required: false },
        "Qualification": { edit: false, required: false },
        "Experience": { edit: false, required: false },
        "EPF NO": { edit: false, required: false },
        "Basic Salary": { edit: false, required: false },
        "Contract Type": { edit: false, required: false },
        "Location": { edit: false, required: false },
        "Bank Account Name": { edit: false, required: false },
        "Bank Account No": { edit: false, required: false },
        "Bank Name": { edit: false, required: false },
        "Bank Branch": { edit: false, required: false },
        "Facebook": { edit: true, required: false },
        "Twitter": { edit: true, required: false },
        "Linkedin": { edit: true, required: false },
        "Instagram": { edit: true, required: false },
        "Staff Photo": { edit: true, required: false },
        "Resume": { edit: false, required: false },
        "Joining Letter": { edit: false, required: false },
        "Other Document": { edit: false, required: false },
        "Custom fields": { edit: false, required: false },
    });

    const fields = Object.keys(settings);
    const midPoint = Math.ceil(fields.length / 2);
    const leftColumn = fields.slice(0, midPoint);
    const rightColumn = fields.slice(midPoint);

    const Toggle = ({ active }) => (
        <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-all ${active ? 'bg-[#7c32ff]' : 'bg-slate-200'}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${active ? 'right-0.5' : 'left-0.5 shadow-sm'}`} />
        </div>
    );

    const SettingsTable = ({ columnFields }) => (
        <table className="w-full">
            <thead>
                <tr className="border-b border-slate-100">
                    <th className="text-left py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest w-1/2">REGISTRATION FIELD</th>
                    <th className="text-center py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">STAFF EDIT</th>
                    <th className="text-center py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">REQUIRED</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {columnFields.map((field) => (
                    <tr key={field} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 text-[11px] font-medium text-slate-600">{field}</td>
                        <td className="py-3 px-4 flex justify-center">
                            <Toggle active={settings[field].edit} />
                        </td>
                        <td className="py-3">
                            <div className="flex justify-center">
                                <Toggle active={settings[field].required} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="animate-in fade-in duration-500 pb-12 text-slate-800">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-3 px-6 rounded-xl shadow-sm border border-slate-100 mb-6">
                <h1 className="text-sm font-medium text-slate-600">Settings</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="cursor-pointer hover:text-[#7c32ff]" onClick={() => navigate('/school')}>Dashboard</span>
                    <span>|</span>
                    <span>Human Resource</span>
                    <span>|</span>
                    <span className="text-slate-500">Settings</span>
                </div>
            </div>

            {/* Staff Information Field Section */}
            <Card className="p-0 border-none shadow-sm bg-white rounded-lg overflow-hidden mb-8">
                <div className="p-4 border-b border-slate-50 flex justify-center">
                    <h3 className="text-sm font-medium text-slate-700">Staff Information Field</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 px-8 pb-8">
                    <div className="overflow-x-auto">
                        <SettingsTable columnFields={leftColumn} />
                    </div>
                    <div className="overflow-x-auto">
                        <SettingsTable columnFields={rightColumn} />
                    </div>
                </div>
            </Card>

            {/* Teacher Information View Section */}
            <Card className="p-0 border-none shadow-sm bg-white rounded-lg overflow-hidden">
                <div className="p-4 border-b border-slate-50 flex justify-center">
                    <h3 className="text-sm font-medium text-slate-700">Teacher Information View</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 px-8 pb-8">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="text-left py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest w-1/2">FIELD</th>
                                <th className="text-center py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">VIEW</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-50">
                                <td className="py-3 text-[11px] font-medium text-slate-600">Email</td>
                                <td className="py-3 flex justify-center items-center">
                                    <Toggle active={true} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="text-left py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest w-1/2">FIELD</th>
                                <th className="text-center py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">VIEW</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-50">
                                <td className="py-3 text-[11px] font-medium text-slate-600">Phone</td>
                                <td className="py-3 flex justify-center items-center">
                                    <Toggle active={true} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Float Icon */}
            <div className="fixed bottom-12 right-12 w-10 h-10 bg-[#7c32ff] rounded shadow-lg flex items-center justify-center text-white cursor-pointer hover:scale-110 active:scale-95 transition-all">
                <Layout size={18} />
            </div>
        </div>
    );
};

export default StaffSettings;
