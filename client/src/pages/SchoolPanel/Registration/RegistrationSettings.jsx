import React, { useState } from 'react';
import { Card, Button, Input } from '../../../components/SnowUI';
import {
    ChevronDown,
    Calendar,
    Save,
    Edit3,
    CheckCircle2
} from 'lucide-react';

const RegistrationSettings = () => {
    const [settings, setSettings] = useState({
        registration: 'enable',
        afterRegistrationMail: 'yes',
        afterApproveMail: 'yes',
        recaptcha: 'disable',
        nocaptchaSitekey: '',
        nocaptcha: '',
        alwaysOpen: 'no',
        startDate: '02/01/2026',
        endDate: '12/31/2026',
        beforeStartMsg: 'Registration start on {START_DATE} and end on {END_DATE}',
        afterEndMsg: 'Registration date is over. Thank you for your query.',
        registrationUrl: 'https://infixedu.ischooll.com/online/',
        registrationSlug: 'registration',
        footerNote: 'If you want to register your another child please contact with school.'
    });

    const [fieldDisplay, setFieldDisplay] = useState({
        session: true,
        class: true,
        section: true,
        firstName: true,
        lastName: true,
        email: true,
        gender: true,
        dob: true,
        age: true,
        bloodGroup: true,
        religion: true,
        caste: true,
        phoneNumber: true,
        idNumber: true,
        category: true,
        group: true,
        height: true,
        weight: true,
        photo: true,
        fatherName: true,
        fatherOccupation: true,
        fathersPhone: true,
        fathersPhoto: true,
        mothersName: true,
        mothersOccupation: true,
        mothersPhoto: true,
        guardianName: true,
        relation: true,
        guardianEmail: true,
        guardianPhoto: true,
        guardianPhone: true,
        guardianOccupation: true,
        guardianAddress: true,
        currentAddress: true,
        permanentAddress: true,
        route: true,
        vehicle: true,
        dormitoryName: true,
        roomNumber: true,
        nationalId: true,
        localId: true,
        bankAccount: true,
        bankName: true,
        prevSchool: true,
        additionalNotes: true,
        ifscCode: true,
        doc1: true,
        doc2: true,
        doc3: true,
        doc4: true,
        customField: true
    });

    const RadioGroup = ({ label, name, options, value, onChange }) => (
        <div className="flex flex-col space-y-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
            <div className="flex space-x-8 mt-2">
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

    const FieldToggle = ({ label, name, status, required }) => (
        <div className="flex items-center justify-between py-3 border-b border-slate-50 group hover:bg-slate-50/30 px-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-slate-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </span>
                <Edit3 size={12} className="text-primary/40 cursor-pointer hover:text-primary transition-colors" />
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={status}
                    onChange={() => setFieldDisplay(prev => ({ ...prev, [name]: !prev[name] }))}
                    className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary shadow-sm"></div>
            </label>
        </div>
    );

    const leftFields = Object.keys(fieldDisplay).slice(0, 26);
    const rightFields = Object.keys(fieldDisplay).slice(26);

    const fieldLabels = {
        session: 'Session', class: 'Class', section: 'Section', firstName: 'First Name', lastName: 'Last Name',
        email: 'Email', gender: 'Gender', dob: 'Date Of Birth', age: 'Age', bloodGroup: 'Blood Group',
        religion: 'Religion', caste: 'Caste', phoneNumber: 'Phone Number', idNumber: 'ID Number',
        category: 'Category', group: 'Group', height: 'Height', weight: 'Weight', photo: 'Photo',
        fatherName: 'Father Name', fatherOccupation: 'Father Occupation', fathersPhone: 'Fathers Phone',
        fathersPhoto: 'Fathers Photo', mothersName: 'Mothers Name', mothersOccupation: 'Mothers Occupation',
        mothersPhoto: 'Mothers Photo', guardianName: 'Guardian Name', relation: 'Relation',
        guardianEmail: 'Guardian Email', guardianPhoto: 'Guardian Photo', guardianPhone: 'Guardian Phone',
        guardianOccupation: 'Guardian Occupation', guardianAddress: 'Guardian Address',
        currentAddress: 'Current Address', permanentAddress: 'Permanent Address', route: 'Route',
        vehicle: 'Vehicle', dormitoryName: 'Dormitory Name', roomNumber: 'Room Number',
        nationalId: 'National Id Number', localId: 'Local Id Number', bankAccount: 'Bank Account Number',
        bankName: 'Bank Name', prevSchool: 'Previous School Details', additionalNotes: 'Additional Notes',
        ifscCode: 'IFSC Code', doc1: 'Document file 1', doc2: 'Document file 2', doc3: 'Document file 3',
        doc4: 'Document file 4', customField: 'Custom Field'
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2">
                <h1 className="text-xl font-black text-slate-800 tracking-tight">Registration Settings</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Registration</span>
                    <span>|</span>
                    <span className="text-slate-500">Settings</span>
                </div>
            </div>

            {/* System Settings Section */}
            <Card className="p-10 border-none shadow-snow-lg bg-white rounded-2xl relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-2 rounded-full shadow-sm border border-slate-50">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-[0.2em]">Registration Settings</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 mt-6">
                    <RadioGroup
                        label="REGISTRATION"
                        name="registration"
                        value={settings.registration}
                        onChange={(n, v) => setSettings(p => ({ ...p, [n]: v }))}
                        options={[{ label: 'Enable', value: 'enable' }, { label: 'Disable', value: 'disable' }]}
                    />
                    <RadioGroup
                        label="AFTER REGISTRATION MAIL SEND"
                        name="afterRegistrationMail"
                        value={settings.afterRegistrationMail}
                        onChange={(n, v) => setSettings(p => ({ ...p, [n]: v }))}
                        options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]}
                    />
                    <RadioGroup
                        label="AFTER REGISTRATION APPROVE MAIL SEND"
                        name="afterApproveMail"
                        value={settings.afterApproveMail}
                        onChange={(n, v) => setSettings(p => ({ ...p, [n]: v }))}
                        options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]}
                    />
                    <RadioGroup
                        label="RECAPTCHA"
                        name="recaptcha"
                        value={settings.recaptcha}
                        onChange={(n, v) => setSettings(p => ({ ...p, [n]: v }))}
                        options={[{ label: 'Enable', value: 'enable' }, { label: 'Disable', value: 'disable' }]}
                    />
                </div>

                <div className="mt-8 text-[10px] font-bold text-primary hover:underline cursor-pointer tracking-widest uppercase">
                    Click For Recaptcha Create
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">NOCAPTCHA SITEKEY</span>
                        <input className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">NOCAPTCHA</span>
                        <input className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-primary transition-all" />
                    </div>
                </div>

                <div className="mt-10">
                    <RadioGroup
                        label="REGISTRATION ALWAYS OPEN"
                        name="alwaysOpen"
                        value={settings.alwaysOpen}
                        onChange={(n, v) => setSettings(p => ({ ...p, [n]: v }))}
                        options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                    <div className="space-y-2 relative">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">START DATE</span>
                        <div className="relative">
                            <input
                                value={settings.startDate}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-primary transition-all shadow-sm"
                            />
                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
                        </div>
                    </div>
                    <div className="space-y-2 relative">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">END DATE</span>
                        <div className="relative">
                            <input
                                value={settings.endDate}
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-primary transition-all shadow-sm"
                            />
                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                    <div className="space-y-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Before Start Msg</span>
                        <textarea
                            value={settings.beforeStartMsg}
                            className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-xs font-medium outline-none focus:border-primary transition-all shadow-sm min-h-[100px]"
                        />
                        <p className="text-[9px] text-slate-400 italic">You can use &#123;START_DATE&#125;, &#123;END_DATE&#125; as variable for show dynamic date on message</p>
                    </div>
                    <div className="space-y-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">After End Msg</span>
                        <textarea
                            value={settings.afterEndMsg}
                            className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-xs font-medium outline-none focus:border-primary transition-all shadow-sm min-h-[100px]"
                        />
                        <p className="text-[9px] text-slate-400 italic">You can use &#123;START_DATE&#125;, &#123;END_DATE&#125; as variable for show dynamic date on message</p>
                    </div>
                </div>

                <div className="mt-8 flex items-center bg-slate-50/50 border border-slate-100 rounded-xl overflow-hidden shadow-inner">
                    <span className="px-5 py-4 text-xs font-medium text-slate-400 border-r border-slate-100">{settings.registrationUrl}</span>
                    <input
                        value={settings.registrationSlug}
                        className="flex-1 bg-transparent px-5 py-4 text-xs font-black text-slate-700 outline-none"
                    />
                </div>

                <div className="mt-10 space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Footer Note</span>
                    <textarea
                        value={settings.footerNote}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-xs font-medium outline-none focus:border-primary transition-all shadow-sm min-h-[80px]"
                    />
                </div>

                <div className="flex justify-center mt-12">
                    <Button className="bg-primary hover:bg-primary-dark text-white rounded-xl px-12 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center space-x-3 shadow-xl shadow-primary/20 active:scale-95 transition-all">
                        <CheckCircle2 size={16} />
                        <span>SAVE</span>
                    </Button>
                </div>
            </Card>

            {/* Field Display Toggles Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <Card className="p-6 border-none shadow-snow bg-white rounded-2xl">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-50">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">ONLINE STUDENT REGISTRATION DISPLAY</span>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">STATUS</span>
                    </div>
                    {leftFields.map(key => (
                        <FieldToggle
                            key={key}
                            name={key}
                            label={fieldLabels[key]}
                            status={fieldDisplay[key]}
                            required={['session', 'class', 'firstName', 'lastName', 'gender', 'dob', 'phoneNumber', 'relation'].includes(key)}
                        />
                    ))}
                </Card>

                <Card className="p-6 border-none shadow-snow bg-white rounded-2xl">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-50">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">ONLINE STUDENT REGISTRATION DISPLAY</span>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">STATUS</span>
                    </div>
                    {rightFields.map(key => (
                        <FieldToggle
                            key={key}
                            name={key}
                            label={fieldLabels[key]}
                            status={fieldDisplay[key]}
                        />
                    ))}
                </Card>
            </div>
        </div>
    );
};

export default RegistrationSettings;
