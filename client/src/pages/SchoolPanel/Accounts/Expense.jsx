import React from 'react';
import { Card } from '../../../components/SnowUI';
import { ArrowDownRight } from 'lucide-react';

const Expense = () => (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12 text-slate-800">
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-l-full" />
            <h1 className="text-xl font-black text-navy-900 tracking-tight italic uppercase">Expense</h1>
            <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Dashboard</span>
                <span className="text-slate-200">|</span>
                <span>Accounts</span>
                <span className="text-slate-200">|</span>
                <span className="text-primary">Expense</span>
            </div>
        </div>

        <Card className="p-20 border border-snow-100 shadow-snow-sm flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 animate-pulse">
                <ArrowDownRight size={48} />
            </div>
            <div className="max-w-md">
                <h2 className="text-xl font-black text-navy-900 uppercase italic">Institutional Expenses</h2>
                <p className="text-slate-400 font-bold mt-2">
                    Monitor and record institutional expenses for accurate financial tracking.
                </p>
            </div>
        </Card>
    </div>
);

export default Expense;
