import React, { useState } from 'react';
import { Card } from '../../components/SnowUI';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const StudentSettings = () => {
    const navigate = useNavigate();

    const admissionFields = [
        "Session", "Class", "Section", "Roll Number", "Admission Number", "First Name", "Last Name",
        "Gender", "Date Of Birth", "Blood Group", "Email Address", "Caste", "Phone Number", "Religion",
        "Admission Date", "Category", "Group", "Height", "Weight", "Photo", "Father's Name",
        "Father Occupation", "Fathers Phone", "Fathers Photo", "Mother's Name", "Mothers Occupation",
        "Mother Phone", "Mothers Photo", "Guardian Name", "Guardian Email", "Guardian Photo",
        "Guardian Phone", "Guardian Occupation", "Guardian Address", "Current Address",
        "Permanent Address", "Route", "Vehicle", "Dormitory Name", "Room Number", "National Id Number",
        "Local Id Number", "Bank Account Number", "Bank Name", "Previous School Details",
        "Additional Notes", "IFSC Code", "Document file 1", "Document file 2", "Document file 3",
        "Document file 4", "Custom Field"
    ];

    const [fieldSettings, setFieldSettings] = useState(
        admissionFields.reduce((acc, field) => {
            acc[field] = {
                show: true,
                studentEdit: false,
                parentEdit: false,
                required: false
            };
            // Matching some default states from the photo
            if (field === "Roll Number") acc[field].studentEdit = true;
            if (field === "Guardian Email") acc[field].required = true;
            if (["First Name", "Last Name", "Gender", "Date Of Birth", "Email Address", "Phone Number", "Father's Name", "Father Occupation", "Fathers Phone"].includes(field)) {
                acc[field].studentEdit = true;
                acc[field].parentEdit = true;
            }
            if (field === "Session" || field === "Class" || field === "Section" || field === "Admission Number" || field === "First Name" || field === "Last Name" || field === "Gender" || field === "Date Of Birth" || field === "Guardian Email") {
                acc[field].required = true;
            }
            return acc;
        }, {})
    );

    const Toggle = ({ checked, onChange }) => (
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
            <div className="w-10 h-5 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#7c32ff]"></div>
        </label>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-[#7c32ff] hover:bg-slate-100 transition-all border border-slate-100"
                    >
                        <ArrowLeft size={18} strokeWidth={3} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Settings</h1>
                        <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                            <span>Dashboard</span>
                            <span>|</span>
                            <span>Student Info</span>
                            <span>|</span>
                            <span className="text-[#7c32ff]">Settings</span>
                        </div>
                    </div>
                </div>
            </div>

            <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden relative">
                <div className="p-8 border-b border-slate-50 text-center relative">
                    <h3 className="text-sm font-black text-[#6b25ea] uppercase tracking-widest">Student Admission Field</h3>

                    {/* Floating Purple Side Icon */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-20 bg-[#7c32ff] rounded-l-full flex items-center justify-center shadow-lg shadow-purple-500/40">
                        <div className="w-5 h-5 rounded-full border-2 border-white/30" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50/50">
                            <tr className="border-b border-slate-100">
                                <th className="text-left py-4 px-8 text-[9px] font-black text-slate-400 uppercase tracking-widest w-[30%]">REGISTRATION FIELD</th>
                                <th className="text-center py-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest w-[17.5%]">SHOW</th>
                                <th className="text-center py-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest w-[17.5%]">STUDENT EDIT</th>
                                <th className="text-center py-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest w-[17.5%]">PARENT EDIT</th>
                                <th className="text-center py-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest w-[17.5%]">REQUIRED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admissionFields.map((field) => (
                                <tr key={field} className="group hover:bg-slate-50/30 transition-all border-b border-slate-50 last:border-0">
                                    <td className="py-4 px-8 text-[11px] font-bold text-slate-600 uppercase tracking-tight italic">{field}</td>
                                    <td className="py-4 px-4 text-center">
                                        <Toggle
                                            checked={fieldSettings[field].show}
                                            onChange={() => setFieldSettings({
                                                ...fieldSettings,
                                                [field]: { ...fieldSettings[field], show: !fieldSettings[field].show }
                                            })}
                                        />
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <Toggle
                                            checked={fieldSettings[field].studentEdit}
                                            onChange={() => setFieldSettings({
                                                ...fieldSettings,
                                                [field]: { ...fieldSettings[field], studentEdit: !fieldSettings[field].studentEdit }
                                            })}
                                        />
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <Toggle
                                            checked={fieldSettings[field].parentEdit}
                                            onChange={() => setFieldSettings({
                                                ...fieldSettings,
                                                [field]: { ...fieldSettings[field], parentEdit: !fieldSettings[field].parentEdit }
                                            })}
                                        />
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <Toggle
                                            checked={fieldSettings[field].required}
                                            onChange={() => setFieldSettings({
                                                ...fieldSettings,
                                                [field]: { ...fieldSettings[field], required: !fieldSettings[field].required }
                                            })}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 border-t border-slate-50 text-center">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">
                        Copyright © 2026 InfixEdu. All rights reserved | Codethemes made with this application
                    </p>
                </div>
            </Card>

            {/* WhatsApp Floating Button (matching photo) */}
            <div className="fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 cursor-pointer hover:scale-110 active:scale-95 transition-all z-50">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            </div>
        </div>
    );
};

export default StudentSettings;
