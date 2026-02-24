import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Card, Button } from '../../components/SnowUI';
import {
    GraduationCap,
    CreditCard,
    Clock,
    Bell,
    ChevronRight,
    BookOpen,
    Calendar,
    User,
    Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ParentDashboard = () => {
    const { user } = useAuth();
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        attendance: 92,
        pendingFees: 1200,
        homework: 4,
        nextExam: 'March 15'
    });

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const { data } = await api.get('/api/students/my-children');
                setChildren(data);
            } catch (error) {
                console.error('Error fetching children:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchChildren();
    }, []);

    const selectedChild = children[0]; // Default to first child for now

    const announcements = [
        { id: 1, title: 'Annual Sports Day', date: 'Feb 25, 2026', type: 'Event' },
        { id: 2, title: 'Parent-Teacher Meeting', date: 'Feb 28, 2026', type: 'Meeting' },
    ];

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-700">
            {/* Header section with Welcome and Child Profile Quick View */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-navy-900 tracking-tight">
                        Hello, <span className="text-primary">{user?.name?.split(' ')[0]}</span> 👋
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Here is a quick overview of your child's progress.</p>
                </div>
                <div className="flex items-center space-x-4 bg-white p-2 pr-6 rounded-3xl border border-snow-100 shadow-snow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <User size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Child</p>
                        <p className="text-sm font-bold text-navy-900">
                            {loading ? 'Loading...' : (selectedChild ? `${selectedChild.firstName} ${selectedChild.lastName}` : 'No student found')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6 border-none shadow-snow-lg group hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                            <Clock size={24} />
                        </div>
                        <span className="text-2xl font-black text-navy-900">{stats.attendance}%</span>
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Attendance</p>
                    <p className="text-[10px] text-emerald-500 mt-1 font-bold">Above Average</p>
                </Card>

                <Card className="p-6 border-none shadow-snow-lg group hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                            <CreditCard size={24} />
                        </div>
                        <span className="text-2xl font-black text-navy-900">${stats.pendingFees}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Due Fees</p>
                    <p className="text-[10px] text-amber-500 mt-1 font-bold italic underline cursor-pointer">Pay Now</p>
                </Card>

                <Card className="p-6 border-none shadow-snow-lg group hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                            <BookOpen size={24} />
                        </div>
                        <span className="text-2xl font-black text-navy-900">{stats.homework}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Homework</p>
                    <p className="text-[10px] text-blue-500 mt-1 font-bold italic">Pending Tasks</p>
                </Card>

                <Card className="p-6 border-none shadow-snow-lg group hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center">
                            <Calendar size={24} />
                        </div>
                        <div className="text-right">
                            <span className="block text-sm font-black text-navy-900 leading-tight">{stats.nextExam}</span>
                        </div>
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Next Exam</p>
                    <p className="text-[10px] text-purple-500 mt-1 font-bold italic">Term Assessment</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Academic Performance Chart */}
                <Card className="lg:col-span-2 p-8 border-none shadow-snow-lg rounded-[32px]">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-black text-navy-900 italic tracking-tight uppercase underline decoration-primary/10 decoration-8 underline-offset-4">Performance graph</h3>
                            <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Monthly Exam Progress</p>
                        </div>
                        <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-primary">Details</Button>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[
                                { name: 'Sep', score: 82 },
                                { name: 'Oct', score: 85 },
                                { name: 'Nov', score: 78 },
                                { name: 'Dec', score: 90 },
                                { name: 'Jan', score: 88 },
                                { name: 'Feb', score: 92 },
                            ]}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4318FF" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#4318FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F2F3" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A3AED0', fontSize: 12, fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A3AED0', fontSize: 12, fontWeight: 'bold' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="score" stroke="#4318FF" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Announcements Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xl font-black text-navy-900 italic tracking-tight uppercase underline decoration-primary/10 decoration-8 underline-offset-4">Notice Board</h3>
                        <Bell className="text-primary animate-ring" size={20} />
                    </div>

                    <div className="space-y-4">
                        {announcements.map((item) => (
                            <Card key={item.id} className="p-5 border-none shadow-snow-sm hover:shadow-snow-lg transition-all cursor-pointer group rounded-3xl">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary transition-colors group-hover:text-white">
                                        <Megaphone size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{item.type}</span>
                                            <span className="text-[10px] font-bold text-slate-400">{item.date}</span>
                                        </div>
                                        <h4 className="text-sm font-black text-navy-900 mt-1 group-hover:text-primary transition-colors">{item.title}</h4>
                                    </div>
                                </div>
                            </Card>
                        ))}

                        <Button className="w-full py-6 rounded-3xl shadow-snow-lg group">
                            <span>View All Notices</span>
                            <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    {/* Quick Links Card */}
                    <Card className="bg-primary p-8 rounded-[32px] text-white relative overflow-hidden shadow-2xl shadow-primary/40">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <h4 className="text-xl font-black italic uppercase tracking-tight">Need Help?</h4>
                                <p className="text-white/70 text-xs font-bold mt-2">Contact school support for any assistance regarding your child's data.</p>
                            </div>
                            <Button className="bg-white text-primary hover:bg-white/90 border-none font-black mt-6 rounded-2xl text-xs py-4">
                                Contact Support
                            </Button>
                        </div>
                        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-[-20%] left-[-10%] w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// Simple Megaphone icon for notice board items
const Megaphone = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m3 11 18-5v12L3 13v-2Z" /><path d="M11.6 16.8 a3 3 0 1 1-5.8-1.6" />
    </svg>
);

export default ParentDashboard;
