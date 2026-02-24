import React, { useEffect, useState } from 'react';
import { ChevronDown, Clock } from 'lucide-react';

const TimePicker = ({ value, onChange, label }) => {
    // Parse initial 24h value to 12h format
    const parseTime = (timeStr) => {
        if (!timeStr) return { hour: '12', minute: '00', ampm: 'AM' };
        const [h, m] = timeStr.split(':');
        let hourInt = parseInt(h);
        const ampm = hourInt >= 12 ? 'PM' : 'AM';
        const hour = hourInt % 12 || 12;
        return {
            hour: hour.toString().padStart(2, '0'),
            minute: m,
            ampm
        };
    };

    const [time, setTime] = useState(parseTime(value));

    useEffect(() => {
        setTime(parseTime(value));
    }, [value]);

    const handleChange = (field, val) => {
        const newTime = { ...time, [field]: val };
        setTime(newTime);

        // Convert back to 24h for parent
        let h = parseInt(newTime.hour);
        if (newTime.ampm === 'PM' && h !== 12) h += 12;
        if (newTime.ampm === 'AM' && h === 12) h = 0;

        const timeStr = `${h.toString().padStart(2, '0')}:${newTime.minute}`;
        onChange(timeStr);
    };

    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0')); // 5 min steps for cleaner UI, or use 60 for full precision

    return (
        <div className="space-y-2 w-full">
            {label && <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>}
            <div className="flex bg-white border border-slate-200 rounded-xl px-2 py-2 items-center space-x-2 shadow-sm focus-within:ring-4 focus-within:ring-[#7c32ff]/10 focus-within:border-[#7c32ff] transition-all">
                <Clock size={16} className="text-slate-300 ml-2" />

                {/* Hour */}
                <div className="relative group flex-1">
                    <select
                        className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none appearance-none text-center cursor-pointer py-1"
                        value={time.hour}
                        onChange={(e) => handleChange('hour', e.target.value)}
                    >
                        {hours.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                </div>

                <span className="text-slate-300 font-bold">:</span>

                {/* Minute */}
                <div className="relative group flex-1">
                    <select
                        className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none appearance-none text-center cursor-pointer py-1"
                        value={time.minute}
                        onChange={(e) => handleChange('minute', e.target.value)}
                    >
                        {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                {/* AM/PM */}
                <div className="flex bg-slate-50 rounded-lg p-0.5 border border-slate-100">
                    <button
                        type="button"
                        onClick={() => handleChange('ampm', 'AM')}
                        className={`px-2 py-1 rounded-md text-[9px] font-black transition-all ${time.ampm === 'AM' ? 'bg-white text-[#7c32ff] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        AM
                    </button>
                    <button
                        type="button"
                        onClick={() => handleChange('ampm', 'PM')}
                        className={`px-2 py-1 rounded-md text-[9px] font-black transition-all ${time.ampm === 'PM' ? 'bg-white text-[#7c32ff] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        PM
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimePicker;
