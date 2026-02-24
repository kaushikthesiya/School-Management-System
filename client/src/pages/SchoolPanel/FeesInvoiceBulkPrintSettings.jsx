import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card } from '../../components/SnowUI';
import { Save, Settings } from 'lucide-react';

const FeesInvoiceBulkPrintSettings = () => {
    const [settings, setSettings] = useState({
        invoiceType: 'invoice'
    });
    const [loading, setLoading] = useState(false);

    // Mock fetch settings
    useEffect(() => {
        // In real app: const res = await api.get('/api/fees/settings');
        // setSettings(res.data);
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            // await api.patch('/api/fees/settings', settings);
            setTimeout(() => {
                alert('Settings updated successfully');
                setLoading(false);
            }, 800);
        } catch (error) {
            console.error('Error saving settings:', error);
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
                    Fees Invoice Settings
                </h1>
                <div className="hidden md:flex space-x-2 text-[10px] font-bold text-slate-400">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Bulk Print</span>
                    <span>|</span>
                    <span className="text-primary/70">Settings</span>
                </div>
            </div>

            <Card className="p-10 border-none shadow-snow-lg rounded-[20px] bg-white relative overflow-hidden">
                {/* Purple decorative dot */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-[#7c32ff] rounded-l-full flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white/30"></div>
                </div>

                <h2 className="text-[#3E4D67] text-lg font-bold mb-8 text-center bg-transparent">Fees invoice Settings</h2>

                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-10">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">INVOICE TYPE</label>

                        <div className="flex items-center gap-12 flex-1 justify-center">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${settings.invoiceType === 'invoice' ? 'border-[#7c32ff] bg-[#7c32ff]' : 'border-slate-300'}`}>
                                    {settings.invoiceType === 'invoice' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                </div>
                                <span className={`text-sm font-bold uppercase ${settings.invoiceType === 'invoice' ? 'text-[#7c32ff]' : 'text-slate-500'} group-hover:text-[#7c32ff] transition-colors`}>invoice</span>
                                <input
                                    type="radio"
                                    name="invoiceType"
                                    className="hidden"
                                    checked={settings.invoiceType === 'invoice'}
                                    onChange={() => setSettings({ ...settings, invoiceType: 'invoice' })}
                                />
                            </label>

                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${settings.invoiceType === 'slip' ? 'border-[#7c32ff] bg-[#7c32ff]' : 'border-slate-300'}`}>
                                    {settings.invoiceType === 'slip' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                </div>
                                <span className={`text-sm font-bold uppercase ${settings.invoiceType === 'slip' ? 'text-[#7c32ff]' : 'text-slate-500'} group-hover:text-[#7c32ff] transition-colors`}>slip</span>
                                <input
                                    type="radio"
                                    name="invoiceType"
                                    className="hidden"
                                    checked={settings.invoiceType === 'slip'}
                                    onChange={() => setSettings({ ...settings, invoiceType: 'slip' })}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <Button
                            onClick={handleSave}
                            disabled={loading}
                            className="px-12 !bg-[#7c32ff] !rounded-lg flex items-center justify-center space-x-2 py-3 shadow-lg shadow-purple-500/20 active:scale-95 transition-all w-40"
                        >
                            <span className="uppercase text-[11px] font-black tracking-widest text-white">{loading ? 'UPDATING...' : 'UPDATE'}</span>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default FeesInvoiceBulkPrintSettings;
