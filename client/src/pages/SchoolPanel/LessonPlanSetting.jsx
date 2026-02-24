import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Card } from '../../components/SnowUI';

const LessonPlanSetting = () => {
    const [settings, setSettings] = useState({
        enableSubTopic: true // Default to true or fetch from API
    });
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const res = await api.get('/api/lesson-plan/settings');
            // Assuming the backend returns an object that might contain enableSubTopic
            if (res.data) {
                setSettings(prev => ({ ...prev, ...res.data }));
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            await api.patch('/api/lesson-plan/settings', settings);
            // alert('Settings updated successfully'); // Replaced with custom toast or just silent success for now as per simple UI
            console.log('Settings updated');
        } catch (error) {
            console.error('Error saving settings:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-left">
            <div className="flex justify-between items-center px-2">
                <h1 className="text-xl font-bold text-slate-700 tracking-tight">
                    Lesson plan setting
                </h1>
                <div className="hidden md:flex space-x-2 text-[12px] text-slate-500">
                    <span>Dashboard</span>
                    <span>|</span>
                    <span>Lesson Plan</span>
                    <span>|</span>
                    <span className="text-slate-800 font-semibold">Lesson plan setting</span>
                </div>
            </div>

            <Card className="p-8 border-none shadow-sm rounded-lg bg-white min-h-[300px] flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-700 mb-8 border-b pb-4">Lesson plan setting</h2>

                    <div className="flex items-center space-x-12">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">LESSON PLAN SUBTOPIC</span>

                        <div className="flex items-center space-x-6">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${settings.enableSubTopic ? 'border-[#7c32ff]' : 'border-slate-300'}`}>
                                    {settings.enableSubTopic && <div className="w-2.5 h-2.5 rounded-full bg-[#7c32ff]" />}
                                </div>
                                <input
                                    type="radio"
                                    className="hidden"
                                    checked={settings.enableSubTopic}
                                    onChange={() => setSettings({ ...settings, enableSubTopic: true })}
                                />
                                <span className={`text-[13px] ${settings.enableSubTopic ? 'text-[#7c32ff] font-bold' : 'text-slate-500'}`}>Enable</span>
                            </label>

                            <label className="flex items-center space-x-2 cursor-pointer">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${!settings.enableSubTopic ? 'border-[#7c32ff]' : 'border-slate-300'}`}>
                                    {!settings.enableSubTopic && <div className="w-2.5 h-2.5 rounded-full bg-[#7c32ff]" />}
                                </div>
                                <input
                                    type="radio"
                                    className="hidden"
                                    checked={!settings.enableSubTopic}
                                    onChange={() => setSettings({ ...settings, enableSubTopic: false })}
                                />
                                <span className={`text-[13px] ${!settings.enableSubTopic ? 'text-[#7c32ff] font-bold' : 'text-slate-500'}`}>Disable</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-12">
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-[#7c32ff] hover:bg-[#6a2ae0] text-white px-10 py-2.5 rounded text-[11px] font-bold uppercase tracking-widest transition-all"
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default LessonPlanSetting;
