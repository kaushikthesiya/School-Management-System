import React from 'react';
import { Card, Button } from '../../../components/SnowUI';
import {
    DownloadCloud,
    ChevronDown,
    MoreHorizontal
} from 'lucide-react';

const BiometricSettings = () => {
    const settings = [
        {
            title: 'Infix Biometrics Time Settings',
            startTime: '09:00',
            considerStartTime: '09:30',
            exitTime: '16:00',
            sms: [
                'Send sms to student : No',
                'Send sms to parent : No',
                'Send sms to staff : No'
            ]
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Biometrics</h1>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Biometrics</span>
                    <span>|</span>
                    <span className="text-slate-500">Settings</span>
                </div>
            </div>

            {/* Actions */}
            <div className="px-4">
                <Button className="bg-primary hover:bg-primary-dark text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-3 shadow-lg shadow-primary/20 active:scale-95 transition-all">
                    <DownloadCloud size={16} strokeWidth={3} />
                    <span>IMPORT ATTENDANCE</span>
                </Button>
            </div>

            {/* Settings Table Card */}
            <div className="px-4">
                <Card className="p-0 border-none shadow-snow-lg bg-white rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-slate-50">
                        <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">
                            Biometrics settings
                        </h3>
                    </div>

                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">TITLE</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">START TIME</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">CONSIDER START TIME</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">EXIT TIME</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">SMS</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 text-right">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {settings.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-8 py-6 text-xs font-bold text-slate-400 tracking-tight">{item.title}</td>
                                        <td className="px-8 py-6 text-xs font-bold text-slate-600 uppercase tracking-widest">{item.startTime}</td>
                                        <td className="px-8 py-6 text-xs font-bold text-slate-600 uppercase tracking-widest">{item.considerStartTime}</td>
                                        <td className="px-8 py-6 text-xs font-bold text-slate-600 uppercase tracking-widest">{item.exitTime}</td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1">
                                                {item.sms.map((s, i) => (
                                                    <div key={i} className="text-[10px] font-bold text-slate-400 tracking-wide">{s}</div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end">
                                                <button className="px-4 py-2 border border-purple-100 rounded-full text-[10px] font-black text-primary uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center space-x-2">
                                                    <span>SELECT</span>
                                                    <ChevronDown size={12} />
                                                </button>
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
    );
};

export default BiometricSettings;
