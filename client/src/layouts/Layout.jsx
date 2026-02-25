import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, Users, GraduationCap, CreditCard, Settings,
    LogOut, Clock, Shield, Award, Bell, PhoneCall, BookOpen as Book,
    AlertCircle, ChevronDown, ChevronRight, FileText, Download,
    Calendar, Printer, Briefcase, Truck, Home, Wallet,
    Landmark, Package, MessageSquare, Megaphone, Palette,
    Activity, Plug, BarChart3, PieChart, TrendingUp,
    ClipboardList, Banknote, Monitor, Sliders, Globe,
    User, Key, Menu, Video, UserPlus, QrCode, Fingerprint,
    Tv, MessageCircle, Bot, ScrollText, Smartphone, MonitorPlay,
    Box // Added for Inventory
} from 'lucide-react';
import { NavLink, useNavigate, useParams, useLocation } from 'react-router-dom';

const SidebarItem = ({ item, prefix, currentPath }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    // Check if current path matches item or any subItems
    const isActive = item.path === currentPath ||
        (hasSubItems && item.subItems.some(sub => currentPath === sub.path));

    const activeLinkClass = "text-primary bg-transparent font-bold";
    const inactiveLinkClass = "text-secondary hover:text-primary transition-all duration-300";

    if (!hasSubItems) {
        return (
            <div className="relative group px-4">
                <NavLink
                    to={item.path}
                    className={({ isActive: linkActive }) =>
                        `flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 ${linkActive ? activeLinkClass : inactiveLinkClass
                        }`
                    }
                >
                    <span className={`transition-colors duration-300 ${isActive ? 'text-primary' : 'text-secondary'}`}>
                        {item.icon && React.cloneElement(item.icon, { size: 20 })}
                    </span>
                    <span className="text-sm tracking-tight">{item.name}</span>
                    {item.addon && (
                        <div className="flex items-center gap-2 ml-auto shrink-0">
                            <span className="px-1.5 py-0.5 bg-[#6E49E9] text-white text-[8px] font-black rounded-lg uppercase tracking-wider">Addon</span>
                            <ChevronRight size={14} className="text-secondary/40" />
                        </div>
                    )}
                </NavLink>
                {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full shadow-[0_0_10px_rgba(67,24,255,0.4)]" />
                )}
            </div>
        );
    }

    return (
        <div className="relative group px-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${isActive ? 'text-primary font-bold' : 'text-secondary hover:text-primary'
                    }`}
            >
                <div className="flex items-center space-x-4">
                    <span className={`transition-colors duration-300 ${isActive ? 'text-primary' : 'text-secondary'}`}>
                        {item.icon && React.cloneElement(item.icon, { size: 20 })}
                    </span>
                    <span className="text-sm tracking-tight">{item.name}</span>
                    {item.addon && (
                        <div className="flex items-center gap-2 ml-2 shrink-0">
                            <span className="px-1.5 py-0.5 bg-[#6E49E9] text-white text-[8px] font-black rounded-lg uppercase tracking-wider">Addon</span>
                        </div>
                    )}
                </div>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={14} />
                </div>
            </button>
            {isActive && !isOpen && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full shadow-[0_0_10px_rgba(67,24,255,0.4)]" />
            )}

            {isOpen && (
                <div className="mt-1 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-300">
                    {item.subItems.map((sub, idx) => (
                        <NavLink
                            key={idx}
                            to={sub.path}
                            className={({ isActive: subActive }) =>
                                `flex items-center space-x-3 px-6 py-2 rounded-xl text-xs font-bold transition-all duration-300 relative ${subActive
                                    ? 'text-primary'
                                    : 'text-secondary hover:text-primary'
                                }`
                            }
                        >
                            {({ isActive: subActive }) => (
                                <>
                                    {subActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary" />
                                    )}
                                    <span>{sub.name}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
};

const Layout = ({ children, role = 'school' }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { school_slug } = useParams();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [myChildren, setMyChildren] = useState([]);
    const [schoolInfo, setSchoolInfo] = useState(null);

    useEffect(() => {
        if (user?.role === 'parent') {
            const fetchChildren = async () => {
                try {
                    const { data } = await api.get('/api/students/my-children');
                    setMyChildren(data);
                } catch (error) {
                    console.error('Error fetching children in layout:', error);
                }
            };
            fetchChildren();
        }
    }, [user]);

    useEffect(() => {
        const fetchSchoolInfo = async () => {
            try {
                const { data } = await api.get('/api/school/info');
                setSchoolInfo(data);
            } catch (error) {
                console.error('Error fetching school info:', error);
            }
        };
        fetchSchoolInfo();
    }, [school_slug]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getMenuItems = () => {
        if (role === 'superadmin') {
            return [
                { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/superadmin' },
                { name: 'Schools', icon: <Users size={20} />, path: '/superadmin/schools' },
                { name: 'Create School Admin', icon: <Shield size={20} />, path: '/superadmin/create-school-admin' },
                { name: 'Subscriptions', icon: <CreditCard size={20} />, path: '/superadmin/plans' },
                { name: 'Settings', icon: <Settings size={20} />, path: '/superadmin/settings' },
            ];
        }

        // 👨‍👩‍👦 Parent Specific Menu
        if (user?.role === 'parent') {
            const prefix = `/${school_slug}`;
            return [
                {
                    section: 'Parent Portal',
                    items: [
                        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: `${prefix}/` },
                        {
                            name: 'Child Profile',
                            icon: <User size={20} />,
                            path: myChildren.length > 0
                                ? `${prefix}/student-profile/${myChildren[0]._id}`
                                : `${prefix}/`
                        },
                        { name: 'Fees Payment', icon: <CreditCard size={20} />, path: `${prefix}/fees` },
                        { name: 'Homework', icon: <Book size={20} />, path: `${prefix}/homework` },
                        { name: 'Attendance', icon: <Clock size={20} />, path: `${prefix}/attendance` },
                    ]
                }
            ];
        }

        const hasPermission = (moduleName, subModuleName = null) => {
            if (!user) return false;
            if (user?.role === 'schooladmin' || user?.role === 'superadmin') return true;
            if (!user?.permissions || !Array.isArray(user.permissions)) return false;

            const modPerm = user.permissions.find(p =>
                p?.module && p.module.toLowerCase() === moduleName.toLowerCase()
            );

            if (!modPerm) return false;
            if (!subModuleName) return true;
            if (!modPerm.actions || !Array.isArray(modPerm.actions)) return false;

            return modPerm.actions.some(a =>
                a && typeof a === 'string' && a.toLowerCase().startsWith(subModuleName.toLowerCase())
            );
        };

        const prefix = `/${school_slug}`;
        const sections = [
            {
                section: 'Dashboard',
                items: [
                    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: `${prefix}/`, permission: 'Dashboard' },
                    { name: 'Sidebar Manager', icon: <Menu size={20} />, path: `${prefix}/sidebar-manager`, permission: 'Dashboard', subPermission: 'Sidebar Manager' },
                ].filter(i => hasPermission(i.permission, i.subPermission))
            },
            {
                section: 'Administration',
                items: [
                    {
                        name: 'Admin Section',
                        icon: <Briefcase size={20} />,
                        permission: 'Admin section',
                        subItems: [
                            { name: 'Admission Query', path: `${prefix}/admission-query`, subPermission: 'Admission Query' },
                            { name: 'Visitor Book', path: `${prefix}/visitors`, subPermission: 'Visitor Book' },
                            { name: 'Complaint', path: `${prefix}/complaints`, subPermission: 'Complaint' },
                            { name: 'Postal Receive', path: `${prefix}/postal-receive`, subPermission: 'Postal Receive' },
                            { name: 'Postal Dispatch', path: `${prefix}/postal-dispatch`, subPermission: 'Postal Dispatch' },
                            { name: 'Phone Call Log', path: `${prefix}/call-log`, subPermission: 'Phone Call Log' },
                            { name: 'Admin Setup', path: `${prefix}/settings`, subPermission: 'Admin Setup' },
                            { name: 'ID Card', path: `${prefix}/id-cards`, subPermission: 'ID Card' },
                            { name: 'Certificate', path: `${prefix}/certificates`, subPermission: 'Certificate' },
                            { name: 'Generate Certificate', path: `${prefix}/generate-certificate`, subPermission: 'Generate Certificate' },
                            { name: 'Generate ID Card', path: `${prefix}/generate-id-card`, subPermission: 'Generate ID Card' },
                        ].filter(s => hasPermission('Admin section', s.subPermission))
                    },
                    {
                        name: 'Academics',
                        icon: <GraduationCap size={20} />,
                        permission: 'Academics',
                        subItems: [
                            { name: 'Optional Subject', path: `${prefix}/optional-subject`, subPermission: 'Optional Subject' },
                            { name: 'Section', path: `${prefix}/sections`, subPermission: 'Section' },
                            { name: 'Class', path: `${prefix}/classes`, subPermission: 'Class' },
                            { name: 'Subjects', path: `${prefix}/subjects`, subPermission: 'Subjects' },
                            { name: 'Assign Class Teacher', path: `${prefix}/assign-teacher`, subPermission: 'Assign Class Teacher' },
                            { name: 'Assign Subject', path: `${prefix}/assign-subject`, subPermission: 'Assign Subject' },
                            { name: 'Class Room', path: `${prefix}/class-rooms`, subPermission: 'Class Room' },
                            { name: 'Class Routine', path: `${prefix}/class-routine`, subPermission: 'Class Routine' },
                            { name: 'Academic Management', path: `${prefix}/academic-management`, subPermission: 'Academic Management' },
                        ].filter(s => hasPermission('Academics', s.subPermission))
                    },
                    {
                        name: 'Study Material',
                        icon: <Download size={20} />,
                        permission: 'study material',
                        subItems: [
                            { name: 'Upload Content', path: `${prefix}/upload-content`, subPermission: 'Upload Content' },
                            { name: 'Assignment', path: `${prefix}/assignments?type=Assignment`, subPermission: 'Assignment' },
                            { name: 'Syllabus', path: `${prefix}/syllabus?type=Syllabus`, subPermission: 'Syllabus' },
                            { name: 'Other Downloads', path: `${prefix}/other-downloads?type=Other Downloads`, subPermission: 'Other Downloads' },
                        ].filter(s => hasPermission('study material', s.subPermission))
                    },
                    {
                        name: 'Lesson Plan',
                        icon: <Calendar size={20} />,
                        permission: 'Lesson plan',
                        subItems: [
                            { name: 'Lesson', path: `${prefix}/lessons`, subPermission: 'Lesson' },
                            { name: 'Topic', path: `${prefix}/topics`, subPermission: 'Topic' },
                            { name: 'Topic Overview', path: `${prefix}/topic-overview`, subPermission: 'Topic Overview' },
                            { name: 'Lesson Plan', path: `${prefix}/lesson-plan`, subPermission: 'Lesson Plan' },
                            { name: 'Lesson Plan Overview', path: `${prefix}/lesson-plan-overview`, subPermission: 'Lesson Plan Overview' },
                            { name: 'Lesson Plan Setting', path: `${prefix}/lesson-plan-setting`, subPermission: 'Lesson Plan Setting' },
                        ].filter(s => hasPermission('Lesson plan', s.subPermission))
                    },
                    {
                        name: 'Bulk Print',
                        icon: <Printer size={20} />,
                        permission: 'bulk print',
                        subItems: [
                            { name: 'ID Card', path: `${prefix}/generate-id-card`, subPermission: 'ID Card' },
                            { name: 'Certificate', path: `${prefix}/bulk-certificate`, subPermission: 'Certificate' },
                            { name: 'Payroll Bulk Print', path: `${prefix}/bulk-payroll`, subPermission: 'Payroll Bulk Print' },
                            { name: 'Fees Invoice Bulk Print', path: `${prefix}/bulk-invoice`, subPermission: 'Fees Invoice Bulk Print' },
                            { name: 'Fees Invoice Bulk Print Settings', path: `${prefix}/bulk-invoice-settings`, subPermission: 'Fees Invoice Bulk Print Settings' },
                        ].filter(s => hasPermission('bulk print', s.subPermission))
                    },
                ].filter(i => hasPermission(i.permission))
            },
            {
                section: 'Student',
                items: [
                    {
                        name: 'Student Info',
                        icon: <Users size={20} />,
                        permission: 'student info',
                        subItems: [
                            { name: 'Student Category', path: `${prefix}/student-category`, subPermission: 'Student Category' },
                            { name: 'Add Student', path: `${prefix}/add-student`, subPermission: 'Add Student' },
                            { name: 'Student List', path: `${prefix}/student-list`, subPermission: 'Student List' },
                            { name: 'Multi Class Student', path: `${prefix}/multi-class-student`, subPermission: 'Multi Class Student' },
                            { name: 'Delete Student Record', path: `${prefix}/delete-student-record`, subPermission: 'Delete Student Record' },
                            { name: 'Unassigned Student', path: `${prefix}/unassigned-student`, subPermission: 'Unassigned Student' },
                            { name: 'Student Attendance', path: `${prefix}/student-attendance`, subPermission: 'Student Attendance' },
                            { name: 'Student Group', path: `${prefix}/student-group`, subPermission: 'Student Group' },
                            { name: 'Student Promote', path: `${prefix}/student-promote`, subPermission: 'Student Promote' },
                            { name: 'Disabled Students', path: `${prefix}/disabled-students`, subPermission: 'Disabled Students' },
                            { name: 'Subject Wise Attendance', path: `${prefix}/subject-wise-attendance`, subPermission: 'Subject Wise Attendance' },
                            { name: 'Student Export', path: `${prefix}/student-export`, subPermission: 'Student Export' },
                            { name: 'SMS Sending Time', path: `${prefix}/sms-sending-time`, subPermission: 'SMS Sending Time' },
                            { name: 'Student Settings', path: `${prefix}/student-settings`, subPermission: 'Student Settings' },
                        ].filter(s => hasPermission('student info', s.subPermission))
                    },
                    {
                        name: 'Behaviour Records',
                        icon: <AlertCircle size={20} />,
                        permission: 'behaviour records',
                        subItems: [
                            { name: 'Incidents', path: `${prefix}/incidents`, subPermission: 'Incidents' },
                            { name: 'Assign Incident', path: `${prefix}/assign-incident`, subPermission: 'Assign Incident' },
                            { name: 'Student Incident Report', path: `${prefix}/student-incident-report`, subPermission: 'Student Incident Report' },
                            { name: 'Student Behaviour Rank Report', path: `${prefix}/behaviour-report`, subPermission: 'Behaviour Report' },
                            { name: 'Class Section Wise Rank Report', path: `${prefix}/class-section-report`, subPermission: 'Class Section Report' },
                            { name: 'Incident Wise Report', path: `${prefix}/incident-wise-report`, subPermission: 'Incident Wise Report' },
                            { name: 'Settings', path: `${prefix}/behaviour-settings`, subPermission: 'Settings' },
                        ].filter(s => hasPermission('behaviour records', s.subPermission))
                    },
                    {
                        name: 'Fees',
                        icon: <CreditCard size={20} />,
                        permission: 'fees',
                        subItems: [
                            { name: 'Fees Group', path: `${prefix}/fees-group`, subPermission: 'Fees Group' },
                            { name: 'Fees Type', path: `${prefix}/fees-type`, subPermission: 'Fees Type' },
                            { name: 'Fees Invoice', path: `${prefix}/fees-invoice`, subPermission: 'Fees Invoice' },
                            { name: 'Bank Payment', path: `${prefix}/bank-payment`, subPermission: 'Bank Payment' },
                            { name: 'Fees Carry Forward', path: `${prefix}/fees-carry-forward`, subPermission: 'Fees Carry Forward' },
                        ].filter(s => hasPermission('fees', s.subPermission))
                    },
                    {
                        name: 'Homework',
                        icon: <Book size={20} />,
                        permission: 'HomeWork',
                        subItems: [
                            { name: 'Add Homework', path: `${prefix}/add-homework`, subPermission: 'Add Homework' },
                            { name: 'Homework List', path: `${prefix}/homework-list`, subPermission: 'Homework List' },
                            { name: 'Homework Evaluation', path: `${prefix}/homework-evaluation`, subPermission: 'Homework Evaluation' },
                        ].filter(s => hasPermission('HomeWork', s.subPermission))
                    },
                    {
                        name: 'Library',
                        icon: <Book size={20} />,
                        permission: 'Library',
                        subItems: [
                            { name: 'Add Book', path: `${prefix}/add-book`, subPermission: 'Add Book' },
                            { name: 'Book List', path: `${prefix}/book-list`, subPermission: 'Book List' },
                            { name: 'Book Categories', path: `${prefix}/book-categories`, subPermission: 'Book Categories' },
                            { name: 'Add Member', path: `${prefix}/add-member`, subPermission: 'Add Member' },
                            { name: 'Issue/Return Book', path: `${prefix}/library-issue`, subPermission: 'Issue/Return Book' },
                            { name: 'All Issued Book', path: `${prefix}/all-issued-book`, subPermission: 'All Issued Book' },
                            { name: 'Subject', path: `${prefix}/library-subjects`, subPermission: 'Subject' },
                        ].filter(s => hasPermission('Library', s.subPermission))
                    },
                    {
                        name: 'Transport',
                        icon: <Truck size={20} />,
                        permission: 'transport',
                        subItems: [
                            { name: 'Vehicle', path: `${prefix}/transport-vehicle`, subPermission: 'Vehicle' },
                            { name: 'Route', path: `${prefix}/transport-route`, subPermission: 'Routes' },
                            { name: 'Assignment', path: `${prefix}/transport-assign`, subPermission: 'Assign Vehicle' },
                        ].filter(s => hasPermission('transport', s.subPermission))
                    },
                    {
                        name: 'Dormitory',
                        icon: <Home size={20} />,
                        permission: 'dormitory',
                        subItems: [
                            { name: 'Dormitory Rooms', path: `${prefix}/dormitory-rooms`, subPermission: 'Dormitory Rooms' },
                            { name: 'Dormitory', path: `${prefix}/dormitory-list`, subPermission: 'Dormitory' },
                            { name: 'Room Type', path: `${prefix}/room-type`, subPermission: 'Room Type' },
                        ].filter(s => hasPermission('dormitory', s.subPermission))
                    },
                ].filter(i => hasPermission(i.permission))
            },
            {
                section: 'Exam',
                items: [
                    {
                        name: 'Examination',
                        icon: <Award size={20} />,
                        permission: 'examination',
                        subItems: [
                            { name: 'Exam Type', path: `${prefix}/exam-type`, subPermission: 'Exam Type' },
                            { name: 'Exam Setup', path: `${prefix}/exam-setup`, subPermission: 'Exam Setup' },
                            { name: 'Exam Schedule', path: `${prefix}/exam-schedule`, subPermission: 'Exam Schedule' },
                            { name: 'Exam Attendance', path: `${prefix}/exam-attendance`, subPermission: 'Exam Attendance' },
                            { name: 'Marks Register', path: `${prefix}/marks-register`, subPermission: 'Marks Register' },
                            { name: 'Marks Grade', path: `${prefix}/marks-grade`, subPermission: 'Marks Grade' },
                            { name: 'Send Marks By Sms', path: `${prefix}/send-marks-sms`, subPermission: 'Send Marks By Sms' },
                        ].filter(s => hasPermission('examination', s.subPermission))
                    },
                    {
                        name: 'Exam Plan',
                        icon: <FileText size={20} />,
                        permission: 'exam plan',
                        subItems: [
                            { name: 'Admit Card', path: `${prefix}/exam-admit-card`, subPermission: 'Admit Card' },
                            { name: 'Seat Plan', path: `${prefix}/exam-seat-plan`, subPermission: 'Seat Plan' },
                        ].filter(s => hasPermission('exam plan', s.subPermission))
                    },
                ].filter(i => hasPermission(i.permission))
            },
            {
                section: 'HR',
                items: [
                    {
                        name: 'Human Resource',
                        icon: <Users size={20} />,
                        permission: 'human resource',
                        subItems: [
                            { name: 'Designation', path: `${prefix}/designation`, subPermission: 'Designation' },
                            { name: 'Department', path: `${prefix}/department`, subPermission: 'Department' },
                            { name: 'Add Staff', path: `${prefix}/add-staff`, subPermission: 'Add Staff' },
                            { name: 'Staff Directory', path: `${prefix}/staff-directory`, subPermission: 'Staff Directory' },
                            { name: 'Staff Attendance', path: `${prefix}/staff-attendance`, subPermission: 'Staff Attendance' },
                            { name: 'Payroll', path: `${prefix}/payroll`, subPermission: 'Payroll' },
                            { name: 'Staff Settings', path: `${prefix}/staff-settings`, subPermission: 'Staff Settings' },
                        ].filter(s => hasPermission('human resource', s.subPermission))
                    },
                    {
                        name: 'Teacher Evaluation',
                        icon: <Award size={20} />,
                        permission: 'teacher evaluation',
                        subItems: [
                            { name: 'Approved Report', path: `${prefix}/teacher-evaluation/approved-report`, subPermission: 'Approved Report' },
                            { name: 'Pending Report', path: `${prefix}/teacher-evaluation/pending-report`, subPermission: 'Pending Report' },
                            { name: 'Teacher Wise Report', path: `${prefix}/teacher-evaluation/teacher-wise-report`, subPermission: 'Teacher Wise Report' },
                            { name: 'Settings', path: `${prefix}/teacher-evaluation/settings`, subPermission: 'Settings' },
                        ].filter(s => hasPermission('teacher evaluation', s.subPermission))
                    },
                    {
                        name: 'Leave',
                        icon: <Clock size={20} />,
                        permission: 'leave',
                        subItems: [
                            { name: 'Apply Leave', path: `${prefix}/leave/apply`, subPermission: 'Apply Leave' },
                            { name: 'Approve Leave Request', path: `${prefix}/leave/approve`, subPermission: 'Approve Leave Request' },
                            { name: 'Pending Leave Request', path: `${prefix}/leave/pending`, subPermission: 'Pending Leave Request' },
                            { name: 'Leave Define', path: `${prefix}/leave/define`, subPermission: 'Leave Define' },
                            { name: 'Leave Type', path: `${prefix}/leave/type`, subPermission: 'Leave Type' },
                        ].filter(s => hasPermission('leave', s.subPermission))
                    },
                    {
                        name: 'Role & Permission',
                        icon: <Shield size={20} />,
                        permission: 'Role & Permission',
                        subItems: [
                            { name: 'Login Permission', path: `${prefix}/login-permission`, subPermission: 'Login Permission' },
                            { name: 'Role', path: `${prefix}/role`, subPermission: 'Role' },
                            { name: 'Due Fees Login Permission', path: `${prefix}/due-fees-login-permission`, subPermission: 'Due Fees Login Permission' },
                        ].filter(s => hasPermission('Role & Permission', s.subPermission))
                    },
                ].filter(i => hasPermission(i.permission))
            },
            {
                section: 'Accounts',
                items: [
                    {
                        name: 'Wallet',
                        icon: <Wallet size={20} />,
                        permission: 'wallet',
                        subItems: [
                            { name: 'Pending Deposit', path: `${prefix}/wallet/pending`, subPermission: 'Pending Deposit' },
                            { name: 'Approve Deposit', path: `${prefix}/wallet/approve`, subPermission: 'Approve Deposit' },
                            { name: 'Reject Deposit', path: `${prefix}/wallet/reject`, subPermission: 'Reject Deposit' },
                            { name: 'Wallet Transaction', path: `${prefix}/wallet/transactions`, subPermission: 'Wallet Transaction' },
                            { name: 'Refund Request', path: `${prefix}/wallet/refund-request`, subPermission: 'Refund Request' },
                        ].filter(s => hasPermission('wallet', s.subPermission))
                    },
                    {
                        name: 'Accounts',
                        icon: <Landmark size={20} />,
                        permission: 'accounts',
                        subItems: [
                            { name: 'Profit & Loss', path: `${prefix}/accounts/profit-loss`, subPermission: 'Profit & Loss' },
                            { name: 'Income', path: `${prefix}/accounts/income`, subPermission: 'Income' },
                            { name: 'Expense', path: `${prefix}/accounts/expense`, subPermission: 'Expense' },
                            { name: 'Chart Of Account', path: `${prefix}/accounts/chart-of-account`, subPermission: 'Chart Of Account' },
                            { name: 'Bank Account', path: `${prefix}/accounts/bank-account`, subPermission: 'Bank Account' },
                            { name: 'Fund Transfer', path: `${prefix}/accounts/fund-transfer`, subPermission: 'Fund Transfer' },
                        ].filter(s => hasPermission('accounts', s.subPermission))
                    },
                    {
                        name: 'Inventory',
                        icon: <Box size={20} />,
                        permission: 'inventory',
                        subItems: [
                            { name: 'Item Category', path: `${prefix}/inventory-category`, subPermission: 'Item Category' },
                            { name: 'Item List', path: `${prefix}/inventory-list`, subPermission: 'Item List' },
                            { name: 'Item Store', path: `${prefix}/inventory-store`, subPermission: 'Item Store' },
                            { name: 'Supplier', path: `${prefix}/inventory-supplier`, subPermission: 'Supplier' },
                            { name: 'Item Receive', path: `${prefix}/inventory-receive`, subPermission: 'Item Receive' },
                            { name: 'Item Receive List', path: `${prefix}/inventory-receive-list`, subPermission: 'Item Receive List' },
                            { name: 'Item Sell', path: `${prefix}/inventory-sell-list`, subPermission: 'Item Sell' },
                            { name: 'Item Issue', path: `${prefix}/issue-inventory`, subPermission: 'Issue Item' },
                        ].filter(s => hasPermission('inventory', s.subPermission))
                    },
                ].filter(i => hasPermission(i.permission))
            },
            {
                section: 'Utilities',
                items: [
                    {
                        name: 'Chat',
                        icon: <MessageSquare size={20} />,
                        permission: 'chat',
                        subItems: [
                            { name: 'Chat Box', path: `${prefix}/chat`, subPermission: 'Chat Box' },
                        ].filter(s => hasPermission('chat', s.subPermission))
                    },
                    {
                        name: 'Communicate',
                        icon: <Megaphone size={20} />,
                        permission: 'communicate',
                        subItems: [
                            { name: 'Notice Board', path: `${prefix}/announcements`, subPermission: 'Notice Board' },
                            { name: 'Email/SMS Log', path: `${prefix}/comm-logs`, subPermission: 'Email / SMS Log' },
                        ].filter(s => hasPermission('communicate', s.subPermission))
                    },
                    {
                        name: 'Style',
                        icon: <Palette size={20} />,
                        permission: 'Style',
                        subItems: [
                            { name: 'Theme Setup', path: `${prefix}/style`, subPermission: 'Color Theme' },
                        ].filter(s => hasPermission('Style', s.subPermission))
                    },
                    {
                        name: 'Utilities',
                        icon: <Settings size={20} />,
                        permission: 'general setting',
                        subItems: [
                            { name: 'System Setup', path: `${prefix}/settings`, subPermission: 'General Settings' },
                            { name: 'Backup/Restore', path: `${prefix}/backup`, subPermission: 'Backup' },
                        ].filter(s => hasPermission('general setting', s.subPermission))
                    },
                ].filter(i => hasPermission(i.permission))
            },
            {
                section: 'REPORT SECTION',
                items: [
                    {
                        name: 'Students Report',
                        icon: <Users size={20} />,
                        permission: 'student report',
                        subItems: [
                            { name: 'Student Attendance Report', path: `${prefix}/student-attendance-report`, subPermission: 'Student Attendance Report' },
                            { name: 'Subject Attendance Report', path: `${prefix}/subject-attendance-report`, subPermission: 'Subject Attendance Report' },
                            { name: 'Homework Evaluation Report', path: `${prefix}/homework-evaluation-report`, subPermission: 'Homework Evaluation Report' },
                            { name: 'Guardian Reports', path: `${prefix}/guardian-reports`, subPermission: 'Guardian Reports' },
                            { name: 'Student History', path: `${prefix}/student-history`, subPermission: 'Student History' },
                            { name: 'Student Login Report', path: `${prefix}/student-login-report`, subPermission: 'Student Login Report' },
                            { name: 'Class Report', path: `${prefix}/class-report`, subPermission: 'Class Report' },
                            { name: 'Class Routine', path: `${prefix}/class-routine-report`, subPermission: 'Class Routine' },
                            { name: 'Student Report', path: `${prefix}/student-report`, subPermission: 'Student Report' },
                            { name: 'Previous Record', path: `${prefix}/previous-record-report`, subPermission: 'Previous Record' },
                            { name: 'Student Transport Report', path: `${prefix}/student-transport-report`, subPermission: 'Student Transport Report' },
                            { name: 'Student Dormitory Report', path: `${prefix}/student-dormitory-report`, subPermission: 'Student Dormitory Report' },
                        ].filter(s => hasPermission('student report', s.subPermission))
                    },
                    {
                        name: 'Exam Report',
                        icon: <Book size={20} />,
                        permission: 'exam report',
                        subItems: [
                            { name: 'Exam Routine', path: `${prefix}/exam-routine-report`, subPermission: 'Exam Routine' },
                            { name: 'Merit List Report', path: `${prefix}/merit-list-report`, subPermission: 'Merit List Report' },
                            { name: 'Online Exam Report', path: `${prefix}/online-exam-report`, subPermission: 'Online Exam Report' },
                            { name: 'Subject Wise Marksheet Report', path: `${prefix}/subject-wise-marksheet-report`, subPermission: 'Subject Wise Marksheet Report' },
                            { name: 'Tabulation Sheet Report', path: `${prefix}/tabulation-sheet-report`, subPermission: 'Tabulation Sheet Report' },
                            { name: 'Progress Card Report', path: `${prefix}/progress-card-report`, subPermission: 'Progress Card Report' },
                            { name: 'Mark Sheet Report', path: `${prefix}/mark-sheet-report`, subPermission: 'Mark Sheet Report' },
                            { name: 'Progress Card Report 100 Percent', path: `${prefix}/progress-card-report-100`, subPermission: 'Progress Card Report 100 Percent' },
                            { name: 'Previous Result', path: `${prefix}/previous-result-report`, subPermission: 'Previous Result' },
                        ].filter(s => hasPermission('exam report', s.subPermission))
                    },
                    {
                        name: 'Staff Report',
                        icon: <TrendingUp size={20} />,
                        permission: 'staff report',
                        subItems: [
                            { name: 'Staff Attendance Report', path: `${prefix}/staff-attendance-report`, subPermission: 'Staff Attendance Report' },
                            { name: 'Payroll Report', path: `${prefix}/staff-payroll-report`, subPermission: 'Payroll Report' },
                        ].filter(s => hasPermission('staff report', s.subPermission))
                    },
                    {
                        name: 'Fees Report',
                        icon: <PieChart size={20} />,
                        permission: 'fees report',
                        subItems: [
                            { name: 'Fees Due Report', path: `${prefix}/fees-due-report`, subPermission: 'Fees Due Report' },
                            { name: 'Fine Report', path: `${prefix}/fine-report`, subPermission: 'Fine Report' },
                            { name: 'Payment Report', path: `${prefix}/payment-report`, subPermission: 'Payment Report' },
                            { name: 'Balance Report', path: `${prefix}/balance-report`, subPermission: 'Balance Report' },
                            { name: 'Waiver Report', path: `${prefix}/waiver-report`, subPermission: 'Waiver Report' },
                            { name: 'Wallet Report', path: `${prefix}/wallet-report`, subPermission: 'Wallet Report' },
                        ].filter(s => hasPermission('fees report', s.subPermission))
                    },
                    {
                        name: 'Accounts Report',
                        icon: <Banknote size={20} />,
                        permission: 'accounts report',
                        subItems: [
                            { name: 'Payroll Report', path: `${prefix}/accounts-payroll-report`, subPermission: 'Payroll Report' },
                            { name: 'Transaction', path: `${prefix}/accounts-transaction-report`, subPermission: 'Transaction' },
                        ].filter(s => hasPermission('accounts report', s.subPermission))
                    },
                ].filter(i => hasPermission(i.permission))
            },
            {
                section: 'SETTINGS SECTION',
                items: [
                    {
                        name: 'Custom Field',
                        icon: <Sliders size={20} />,
                        permission: 'Custom Field',
                        subItems: [
                            { name: 'Student Registration', path: `${prefix}/custom-fields-student`, subPermission: 'Student Registration' },
                            { name: 'Staff Registration', path: `${prefix}/custom-fields-staff`, subPermission: 'Staff Registration' },
                        ].filter(s => hasPermission('Custom Field', s.subPermission))
                    },
                    {
                        name: 'General Settings',
                        icon: <Settings size={20} />,
                        permission: 'general setting',
                        subItems: [
                            { name: 'Two Factor Setting', path: `${prefix}/two-factor-setting`, subPermission: 'General Settings' },
                            { name: 'General Settings', path: `${prefix}/general-settings-setup`, subPermission: 'General Settings' },
                            { name: 'Optional Subject', path: `${prefix}/assign-optional-subject`, subPermission: 'General Settings' },
                            { name: 'Academic Year', path: `${prefix}/academic-year`, subPermission: 'Academic Year' },
                            { name: 'Holiday', path: `${prefix}/holiday`, subPermission: 'General Settings' },
                            { name: 'Notification Setting', path: `${prefix}/notification-setting`, subPermission: 'General Settings' },
                            { name: 'Tawk To Chat', path: `${prefix}/tawk-to-chat`, subPermission: 'General Settings' },
                            { name: 'Messenger Chat', path: `${prefix}/messenger-chat`, subPermission: 'General Settings' },
                            { name: 'Manage Currency', path: `${prefix}/manage-currency`, subPermission: 'General Settings' },
                            { name: 'Email Settings', path: `${prefix}/email-settings`, subPermission: 'General Settings' },
                            { name: 'Payment Settings', path: `${prefix}/payment-settings`, subPermission: 'General Settings' },
                            { name: 'Base Setup', path: `${prefix}/base-setup`, subPermission: 'General Settings' },
                            { name: 'Sms Settings', path: `${prefix}/sms-settings`, subPermission: 'General Settings' },
                            { name: 'Weekend', path: `${prefix}/weekend`, subPermission: 'General Settings' },
                            { name: 'Language Settings', path: `${prefix}/language-settings`, subPermission: 'General Settings' },
                            { name: 'Backup', path: `${prefix}/backup`, subPermission: 'Backup' },
                            { name: 'Dashboard', path: `${prefix}/dashboard-settings`, subPermission: 'General Settings' },
                            { name: 'About & Update', path: `${prefix}/about-update`, subPermission: 'General Settings' },
                            { name: 'Api Permission', path: `${prefix}/api-permission`, subPermission: 'General Settings' },
                            { name: 'Language', path: `${prefix}/language`, subPermission: 'General Settings' },
                            { name: 'Preloader Settings', path: `${prefix}/preloader-settings`, subPermission: 'General Settings' },
                            { name: 'Cron Job', path: `${prefix}/cron-job`, subPermission: 'General Settings' },
                        ].filter(s => hasPermission('general setting', s.subPermission))
                    },
                    {
                        name: 'Frontend CMS',
                        icon: <Globe size={20} />,
                        permission: 'frontend cms',
                        subItems: [
                            { name: 'Manage Theme', path: `${prefix}/manage-theme`, subPermission: 'Home Page' },
                            { name: 'Home Slider', path: `${prefix}/home-slider`, subPermission: 'Home Page' },
                            { name: 'Home Page', path: `${prefix}/frontend-cms`, subPermission: 'Home Page' },
                            { name: 'Aora Pagebuilder', path: `${prefix}/aora-pagebuilder`, subPermission: 'Home Page' },
                            { name: 'Expert Teacher', path: `${prefix}/expert-teacher`, subPermission: 'Home Page' },
                            { name: 'Photo Gallery', path: `${prefix}/photo-gallery`, subPermission: 'Home Page' },
                            { name: 'Video Gallery', path: `${prefix}/video-gallery`, subPermission: 'Home Page' },
                            { name: 'Result', path: `${prefix}/result-cms`, subPermission: 'Home Page' },
                            { name: 'Class Routine', path: `${prefix}/class-routine-cms`, subPermission: 'Home Page' },
                            { name: 'Exam Routine', path: `${prefix}/exam-routine-cms`, subPermission: 'Home Page' },
                            { name: 'Class/Exam Routine', path: `${prefix}/class-exam-routine-cms`, subPermission: 'Home Page' },
                            { name: 'Academic Calendar', path: `${prefix}/academic-calendar-cms`, subPermission: 'Home Page' },
                            { name: 'Header Content', path: `${prefix}/header-content`, subPermission: 'Home Page' },
                            { name: 'Footer Content', path: `${prefix}/footer-content`, subPermission: 'Home Page' },
                            { name: 'News List', path: `${prefix}/news-list`, subPermission: 'Home Page' },
                            { name: 'News Category', path: `${prefix}/news-category`, subPermission: 'Home Page' },
                            { name: 'News Comments', path: `${prefix}/news-comments`, subPermission: 'Home Page' },
                            { name: 'Testimonial', path: `${prefix}/testimonial`, subPermission: 'Home Page' },
                            { name: 'Course List', path: `${prefix}/course-list`, subPermission: 'Home Page' },
                            { name: 'Contact Message', path: `${prefix}/contact-message`, subPermission: 'Home Page' },
                            { name: 'Menu', path: `${prefix}/menu-cms`, subPermission: 'Home Page' },
                            { name: 'Pages', path: `${prefix}/pages-cms`, subPermission: 'Home Page' },
                            { name: 'Course Category', path: `${prefix}/course-category`, subPermission: 'Home Page' },
                            { name: 'Speech Slider', path: `${prefix}/speech-slider`, subPermission: 'Home Page' },
                            { name: 'Donor', path: `${prefix}/donor`, subPermission: 'Home Page' },
                            { name: 'Form Download', path: `${prefix}/form-download`, subPermission: 'Home Page' },
                        ].filter(s => hasPermission('frontend cms', s.subPermission))
                    },
                    {
                        name: 'Fees Settings',
                        icon: <Settings size={20} />,
                        permission: 'fees',
                        subItems: [
                            { name: 'Fees Settings', path: `${prefix}/fees-settings`, subPermission: 'Fees Group' },
                        ].filter(s => hasPermission('fees', s.subPermission))
                    },
                    {
                        name: 'Exam Settings',
                        icon: <Settings size={20} />,
                        permission: 'examination',
                        subItems: [
                            { name: 'Exam Settings', path: `${prefix}/exam-settings`, subPermission: 'Exam Setup' },
                        ].filter(s => hasPermission('examination', s.subPermission))
                    },
                ].filter(i => hasPermission(i.permission))
            },
            {
                section: 'MODULE',
                items: [
                    {
                        name: 'Registration',
                        icon: <UserPlus size={20} />,
                        addon: true,
                        permission: 'registration',
                        subItems: [
                            { name: 'Student List', path: `${prefix}/registration/student-list`, subPermission: 'Student List' },
                            { name: 'Settings', path: `${prefix}/registration/settings`, subPermission: 'Settings' },
                        ].filter(s => hasPermission('registration', s.subPermission))
                    },
                ].filter(i => hasPermission(i.permission))
            },
        ];

        return sections.filter(s => s.items.length > 0);
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            {/* Sidebar */}
            <aside className="w-72 bg-white flex flex-col h-full overflow-hidden border-r border-snow-100 relative z-20">
                <div className="p-8 pb-10">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                            <GraduationCap className="text-white" size={24} />
                        </div>
                        <h1 className="text-2xl font-black text-navy-900 tracking-tighter">SCOLIFY</h1>
                    </div>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto snow-scrollbar pb-10">
                    {getMenuItems().map((item, idx) => {
                        if (item.section) {
                            return (
                                <div key={idx} className="space-y-1 px-4">
                                    <div className="px-4 pt-6 pb-2 text-[10px] font-black text-secondary uppercase tracking-[0.2em] opacity-80">
                                        {item.section}
                                    </div>
                                    {item.items.map(subItem => (
                                        <SidebarItem key={subItem.name} item={subItem} prefix={`/${school_slug}`} currentPath={location.pathname} />
                                    ))}
                                </div>
                            );
                        }
                        return <SidebarItem key={item.name} item={item} prefix={`/${school_slug}`} currentPath={location.pathname} />;
                    })}
                </nav>

                {/* School Logo at Bottom */}
                {schoolInfo?.logo && (
                    <div className="p-8 border-t border-snow-100 mt-auto bg-snow-50/30">
                        <div className="flex items-center space-x-4 group cursor-pointer hover:opacity-80 transition-all">
                            <div className="w-12 h-12 rounded-[1.25rem] bg-white border border-snow-100 flex items-center justify-center p-2.5 shadow-snow-sm group-hover:shadow-snow-md group-hover:border-primary/20 transition-all">
                                <img src={schoolInfo.logo} alt="School Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] leading-none mb-1.5 italic">Managed by</span>
                                <span className="text-[13px] font-black text-navy-900 tracking-tight truncate group-hover:text-primary transition-colors">{schoolInfo.name}</span>
                            </div>
                        </div>
                    </div>
                )}

            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative scroll-smooth bg-snow-50">
                <header className="h-20 bg-white/70 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-[50]">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">System Online</span>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center p-1 hover:bg-slate-50 rounded-full transition-all"
                            >
                                <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 transition-colors">
                                    <User size={22} />
                                </div>
                            </button>

                            {isProfileOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsProfileOpen(false)}
                                    ></div>
                                    <div className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-snow-lg border border-snow-100 py-6 z-[60] animate-in fade-in zoom-in duration-200">
                                        <div className="px-6 mb-4">
                                            <p className="text-[11px] font-bold text-secondary mb-1 lowercase">{user?.email || 'admin@infixedu.com'}</p>
                                            <p className="text-lg font-black text-navy-900 tracking-tight">{user?.name?.toLowerCase() || 'admin'}</p>
                                        </div>

                                        <div className="h-px bg-slate-100 mb-4 px-6 mx-6"></div>

                                        <div className="px-2 space-y-1">
                                            <button
                                                onClick={() => {
                                                    const path = user.role === 'superadmin' ? '/superadmin/profile' : `/${school_slug}/profile`;
                                                    navigate(path);
                                                    setIsProfileOpen(false);
                                                }}
                                                className="flex items-center space-x-4 px-6 py-3 w-full text-left text-navy-700 hover:bg-slate-50 rounded-2xl transition-all group"
                                            >
                                                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                                    <User size={18} className="text-slate-400 group-hover:text-primary" />
                                                </div>
                                                <span className="text-sm font-bold">View Profile</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const path = user.role === 'superadmin' ? '/superadmin/change-password' : `/${school_slug}/change-password`;
                                                    navigate(path);
                                                    setIsProfileOpen(false);
                                                }}
                                                className="flex items-center space-x-4 px-6 py-3 w-full text-left text-navy-700 hover:bg-slate-50 rounded-2xl transition-all group"
                                            >
                                                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                                    <Key size={18} className="text-slate-400 group-hover:text-primary" />
                                                </div>
                                                <span className="text-sm font-bold">Password</span>
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center space-x-4 px-6 py-3 w-full text-left text-red-500 hover:bg-red-50 transition-all group"
                                            >
                                                <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                                    <LogOut size={18} className="text-red-400" />
                                                </div>
                                                <span className="text-sm font-bold">Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <div className="p-10">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
