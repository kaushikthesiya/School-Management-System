import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Card } from '../../components/SnowUI';
import { Users, GraduationCap, Users2, UserSquare2, ChevronDown, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const chartData = [];

const SchoolDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        students: 0,
        teachers: 0,
        parents: 0,
        staffs: 0,
        income: 0,
        expense: 0,
        profit: 0,
        revenue: 0,
        walletBalance: 0
    });

    return (
        <div className="space-y-6 pb-12 animate-in fade-in duration-500">
            {/* Top Bar / Welcome */}
            <div className="text-slate-600 text-sm font-medium">
                Welcome - InfixEdu | School Admin
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#17C5CE] rounded-xl p-6 text-white flex justify-between items-center shadow-lg shadow-cyan-500/10">
                    <div className="space-y-1">
                        <div className="text-xl font-bold">Student</div>
                        <div className="text-xs opacity-80 font-medium">Total Students</div>
                    </div>
                    <div className="text-4xl font-black">{stats.students}</div>
                </div>
                <div className="bg-[#9F72FF] rounded-xl p-6 text-white flex justify-between items-center shadow-lg shadow-purple-500/10">
                    <div className="space-y-1">
                        <div className="text-xl font-bold">Teachers</div>
                        <div className="text-xs opacity-80 font-medium">Total Teachers</div>
                    </div>
                    <div className="text-4xl font-black">{stats.teachers}</div>
                </div>
                <div className="bg-[#5192E8] rounded-xl p-6 text-white flex justify-between items-center shadow-lg shadow-blue-500/10">
                    <div className="space-y-1">
                        <div className="text-xl font-bold">Parents</div>
                        <div className="text-xs opacity-80 font-medium">Total Parents</div>
                    </div>
                    <div className="text-4xl font-black">{stats.parents}</div>
                </div>
                <div className="bg-[#E458D5] rounded-xl p-6 text-white flex justify-between items-center shadow-lg shadow-pink-500/10">
                    <div className="space-y-1">
                        <div className="text-xl font-bold">Staffs</div>
                        <div className="text-xs opacity-80 font-medium">Total Staffs</div>
                    </div>
                    <div className="text-4xl font-black">{stats.staffs}</div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Chart */}
                <Card className="p-6 border-none shadow-snow rounded-[20px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[#3E4D67] font-bold text-lg">Income and Expenses for Feb 2026</h3>
                        <div className="flex space-x-2">
                            <button className="p-1.5 hover:bg-slate-50 border border-slate-100 rounded-lg text-slate-400">
                                <ChevronDown size={18} />
                            </button>
                            <button className="p-1.5 hover:bg-slate-50 border border-slate-100 rounded-lg text-slate-400">
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-8">
                        <div className="text-center">
                            <div className="text-xs font-bold text-[#3E4D67] whitespace-nowrap">($) {stats.income}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">Total Income</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-bold text-[#3E4D67] whitespace-nowrap">($) {stats.expense.toLocaleString()}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">Total Expenses</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-bold text-[#3E4D67] whitespace-nowrap">($) {stats.profit.toLocaleString()}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">Total Profit</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-bold text-[#3E4D67] whitespace-nowrap">($) {stats.revenue}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">Total Revenue</div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4318FF" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#4318FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F2F3" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A3AED0', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A3AED0', fontSize: 12 }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="income" stroke="#4318FF" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Yearly Chart */}
                <Card className="p-6 border-none shadow-snow rounded-[20px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[#3E4D67] font-bold text-lg">Income and Expenses for 2026</h3>
                        <div className="flex space-x-2">
                            <button className="p-1.5 hover:bg-slate-50 border border-slate-100 rounded-lg text-slate-400">
                                <ChevronDown size={18} />
                            </button>
                            <button className="p-1.5 hover:bg-slate-50 border border-slate-100 rounded-lg text-slate-400">
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-8">
                        <div className="text-center">
                            <div className="text-xs font-bold text-[#3E4D67] whitespace-nowrap">($) {stats.income}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">Total Income</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-bold text-[#3E4D67] whitespace-nowrap">($) {stats.expense.toLocaleString()}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">Total Expenses</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-bold text-[#3E4D67] whitespace-nowrap">($) {stats.profit.toLocaleString()}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">Total Profit</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-bold text-[#3E4D67] whitespace-nowrap">($) {stats.revenue}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">Total Revenue</div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#E458D5" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#E458D5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F2F3" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A3AED0', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A3AED0', fontSize: 12 }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="expense" stroke="#E458D5" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SchoolDashboard;
