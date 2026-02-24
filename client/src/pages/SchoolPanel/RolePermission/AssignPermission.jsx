import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Check,
    ChevronDown,
    Save,
    RotateCcw,
    Plus,
    Minus,
    Loader2,
    ChevronRight,
    ArrowLeft
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const AssignPermission = () => {
    const navigate = useNavigate();
    const { roleId, school_slug } = useParams();
    const { showToast } = useToast();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [expandedModules, setExpandedModules] = useState({});

    // Comprehensive list of modules and sub-modules typical for InfixEdu style system
    // Flattened structure to match the photo's two-column individual accordion style
    // List of modules provided by the user for full granular control
    const initialPermissions = [
        {
            name: 'Dashboard',
            subItems: [
                'Number Of Student',
                'Number Of Teacher',
                'Number Of Parents',
                'Number Of Staff',
                'Current Month Income And Expense Chart',
                'Current Year Income And Expense Chart',
                'Notice Board',
                'Calendar Section',
                'Sidebar Manager',
                'To Do List'
            ],
            permissions: {
                'Number Of Student': false,
                'Number Of Teacher': false,
                'Number Of Parents': false,
                'Number Of Staff': false,
                'Current Month Income And Expense Chart': false,
                'Current Year Income And Expense Chart': false,
                'Notice Board': false,
                'Calendar Section': false,
                'Sidebar Manager': false,
                'To Do List': false
            }
        },
        {
            name: 'registration',
            subModules: [
                { name: 'Student List', actions: ['View', 'Approve', 'Delete'] },
                { name: 'Settings', actions: ['Update'] }
            ],
            permissions: {}
        },
        {
            name: 'Admin section',
            subModules: [
                { name: 'Admission Query', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Visitor Book', actions: ['Add', 'Download', 'Edit', 'Delete'] },
                { name: 'Complaint', actions: ['Add', 'Download', 'Edit', 'View', 'Delete'] },
                { name: 'Postal Receive', actions: ['Add', 'Download', 'Edit', 'Delete'] },
                { name: 'Postal Dispatch', actions: ['Add', 'Download', 'Edit', 'Delete'] },
                { name: 'Phone Call Log', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Admin Setup', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'ID Card', actions: ['Add', 'Preview', 'Edit', 'Delete'] },
                { name: 'Certificate', actions: ['Add', 'Preview', 'Edit', 'Delete'] },
                { name: 'Generate Certificate', actions: [] },
                { name: 'Generate ID Card', actions: [] }
            ],
            permissions: {} // Initialized in useEffect or constructor
        },
        {
            name: 'student info',
            subModules: [
                { name: 'Student Category', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Add Student', actions: ['Import Student'] },
                { name: 'Student List', actions: ['Add', 'Edit', 'Delete', 'Assign Class', 'Show All Student', 'View'] },
                { name: 'Multi Class Student', actions: [] },
                { name: 'Delete Student Record', actions: ['Restore'] },
                { name: 'Unassigned Student', actions: [] },
                { name: 'Student Attendance', actions: ['Add'] },
                { name: 'Student Group', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Student Promote', actions: ['Add'] },
                { name: 'Disabled Students', actions: ['Search', 'Enable', 'Delete'] },
                { name: 'Subject Wise Attendance', actions: ['Save'] },
                { name: 'Student Export', actions: ['Export To CSV', 'Export To PDF'] },
                { name: 'SMS Sending Time', actions: [] },
                { name: 'Student Settings', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'Academics',
            subModules: [
                { name: 'Optional Subject', actions: [] },
                { name: 'Section', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Class', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Subjects', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Assign Class Teacher', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Assign Subject', actions: ['Add', 'View', 'Import'] },
                { name: 'Class Room', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Class Routine', actions: ['Add', 'Delete'] },
                { name: 'Teacher Class Routine', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'study material',
            subModules: [
                { name: 'Upload Content', actions: ['Add', 'Download', 'Delete', 'Edit', 'View'] },
                { name: 'Assignment', actions: ['Edit', 'Download', 'Delete', 'View'] },
                { name: 'Syllabus', actions: ['Edit', 'Delete', 'Download', 'View'] },
                { name: 'Other Downloads', actions: ['Download', 'Delete', 'Edit', 'View'] }
            ],
            permissions: {}
        },
        {
            name: 'Lesson plan',
            subModules: [
                { name: 'Lesson', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Topic', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Topic Overview', actions: [] },
                { name: 'Lesson Plan', actions: ['Add', 'View', 'Edit', 'Delete'] },
                { name: 'My Lesson Plan', actions: [] },
                { name: 'My Lesson Plan Overview', actions: [] },
                { name: 'Lesson Plan Overview', actions: [] },
                { name: 'Lesson Plan Setting', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'fees report',
            subItems: [
                'Fees Due Report',
                'Fine Report',
                'Payment Report',
                'Balance Report',
                'Waiver Report',
                'Wallet Report'
            ],
            permissions: {}
        },
        {
            name: 'staff report',
            subItems: [
                'Staff Attendance Report',
                'Payroll Report'
            ],
            permissions: {}
        },
        {
            name: 'exam report',
            subModules: [
                { name: 'Subject Wise Marksheet Report', actions: ['Print'] },
                { name: 'Exam Routine', actions: [] },
                { name: 'Merit List Report', actions: [] },
                { name: 'Online Exam Report', actions: [] },
                { name: 'Mark Sheet Report', actions: [] },
                { name: 'Tabulation Sheet Report', actions: [] },
                { name: 'Progress Card Report', actions: [] },
                { name: 'Progress Card Report 100 Percent', actions: [] },
                { name: 'Previous Result', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'student report',
            subModules: [
                { name: 'Student Attendance Report', actions: [] },
                { name: 'Subject Attendance Report', actions: ['Print'] },
                { name: 'Homework Evaluation Report', actions: ['View'] },
                { name: 'Guardian Reports', actions: [] },
                { name: 'Student History', actions: [] },
                { name: 'Student Login Report', actions: ['Update'] },
                { name: 'Class Report', actions: [] },
                { name: 'Class Routine', actions: [] },
                { name: 'User Log', actions: [] },
                { name: 'Student Report', actions: [] },
                { name: 'Previous Record', actions: [] },
                { name: 'Student Transport Report', actions: [] },
                { name: 'Student Dormitory Report', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'fees setting',
            subModules: [
                { name: 'Fees Invoice Settings', actions: ['Update'] },
                { name: 'Bulk Invoice Settings', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'accounts report',
            subItems: [
                'Payroll Report',
                'Transaction'
            ],
            permissions: {}
        },
        {
            name: 'fees',
            subModules: [
                { name: 'Fees Group', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Fees Type', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Fees Invoice', actions: ['Add', 'Add Payment', 'Edit', 'View', 'Delete', 'View Payment'] },
                { name: 'Bank Payment', actions: ['Search', 'Approve Payment', 'Reject Payment'] },
                { name: 'Fees Invoice Settings', actions: ['Update'] },
                { name: 'Report', actions: [] },
                { name: 'Fees Carry Forward', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'wallet',
            subModules: [
                { name: 'Pending Deposit', actions: [] },
                { name: 'Approve Deposit', actions: [] },
                { name: 'Reject Deposit', actions: [] },
                { name: 'Wallet Transaction', actions: [] },
                { name: 'Refund Request', actions: ['Approve', 'Reject', 'Download'] }
            ],
            permissions: {}
        },
        {
            name: 'bulk print',
            subItems: [
                'ID Card',
                'Certificate',
                'Payroll Bulk Print',
                'Fees Invoice Bulk Print',
                'Fees Invoice Bulk Print Settings'
            ],
            permissions: {}
        },
        {
            name: 'accounts',
            subModules: [
                { name: 'Profit & Loss', actions: [] },
                { name: 'Income', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Expense', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Chart Of Account', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Bank Account', actions: ['Add', 'Bank Transaction', 'Delete'] },
                { name: 'Fund Transfer', actions: ['Transfer'] }
            ],
            permissions: {}
        },
        {
            name: 'human resource',
            subModules: [
                { name: 'Designation', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Department', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Add Staff', actions: [] },
                { name: 'Staff Directory', actions: ['Edit', 'Delete', 'View Staff'] },
                { name: 'Staff Attendance', actions: ['Add', 'Mark As Holiday Staff'] },
                { name: 'Payroll', actions: ['Search', 'Generate Payroll', 'Create', 'Proceed To Pay', 'View Payslip'] },
                { name: 'Staff Settings', actions: [] },
                { name: 'Fees::En.FeesModule.Import-Staff', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'leave',
            subModules: [
                { name: 'Apply Leave', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Approve Leave Request', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Pending Leave Request', actions: ['View', 'Delete'] },
                { name: 'Leave Define', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Leave Type', actions: ['Add', 'Edit', 'Delete'] }
            ],
            permissions: {}
        },
        {
            name: 'module manager',
            subModules: [
                { name: 'Verify', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'teacher evaluation',
            subModules: [
                { name: 'Approved Report', actions: ['Delete'] },
                { name: 'Pending Report', actions: ['Add', 'Delete'] },
                { name: 'Teacher Wise Report', actions: ['Delete'] },
                { name: 'Settings', actions: ['Edit'] },
                { name: 'My Report', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'Custom Field',
            subModules: [
                { name: 'Student Registration', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Staff Registration', actions: ['Add', 'Edit', 'Delete'] }
            ],
            permissions: {}
        },
        {
            name: 'chat',
            subItems: [
                'Chat Box',
                'Invitation',
                'Blocked User',
                'Chat Settings'
            ],
            permissions: {}
        },
        {
            name: 'examination',
            subModules: [
                { name: 'Exam Type', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Exam Setup', actions: ['Add', 'Delete', 'Exam Setup Edit'] },
                { name: 'Exam Schedule', actions: ['Add', 'Print', 'Create Exam Schedule'] },
                { name: 'Exam Attendance', actions: ['Add'] },
                { name: 'Marks Register', actions: ['Create', 'Import'] },
                { name: 'Marks Grade', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Send Marks By Sms', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'exam plan',
            subModules: [
                { name: 'Admit Card', actions: ['Generate'] },
                { name: 'Seat Plan', actions: ['Generate'] }
            ],
            permissions: {}
        },
        {
            name: 'certificate',
            subModules: [
                { name: 'Types', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Templates', actions: ['Add', 'Delete', 'Edit', 'Design'] },
                { name: 'Student Certificate', actions: [] },
                { name: 'Staff Certificate', actions: [] },
                { name: 'Certificate Records', actions: ['Rolepermission::Permissions.Record Delete'] },
                { name: 'Settings', actions: ['Update'] }
            ],
            permissions: {}
        },
        {
            name: 'behaviour records',
            subModules: [
                { name: 'Incidents', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Assign Incident', actions: ['Assign / View', 'Delete'] },
                { name: 'Student Incident Report', actions: [] },
                { name: 'Behaviour Report', actions: [] },
                { name: 'Class Section Report', actions: [] },
                { name: 'Incident Wise Report', actions: [] },
                { name: 'Incident Comment', actions: ['Add'] },
                { name: 'Settings', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'exam setting',
            subModules: [
                { name: 'Format Settings', actions: ['Save Exam Settings', 'Delete Content', 'Update Exam Content'] },
                { name: 'Setup Exam Rule', actions: [] },
                { name: 'Position', actions: [] },
                { name: 'All Exam Position', actions: [] },
                { name: 'Exam Signature Settings', actions: [] },
                { name: 'Admit Card Setting', actions: [] },
                { name: 'Seat Plan Setting', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'HomeWork',
            subModules: [
                { name: 'Add Homework', actions: ['Add'] },
                { name: 'Homework List', actions: ['Evaluation', 'Edit', 'Delete'] },
                { name: 'Homework Report', actions: ['View', 'Search'] }
            ],
            permissions: {}
        },
        {
            name: 'communicate',
            subModules: [
                { name: 'Notice Board', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Send Email / SMS', actions: ['Send'] },
                { name: 'Email / SMS Log', actions: [] },
                { name: 'Event', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Calendar', actions: ['Calendar Settings View', 'Calendar Settings'] },
                { name: 'Email Template', actions: [] },
                { name: 'SMS Template', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'Library',
            subModules: [
                { name: 'Add Book', actions: ['Add'] },
                { name: 'Book List', actions: ['Edit', 'Delete'] },
                { name: 'Book Categories', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Add Member', actions: ['Add', 'Cancel'] },
                { name: 'Issue/Return Book', actions: ['Issue', 'Return'] },
                { name: 'All Issued Book', actions: [] },
                { name: 'Subject', actions: ['Add', 'Edit', 'Delete'] }
            ],
            permissions: {}
        },
        {
            name: 'inventory',
            subModules: [
                { name: 'Item Category', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Item List', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Item Store', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Supplier', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Item Receive', actions: ['Add'] },
                { name: 'Item Receive List', actions: ['Edit', 'View', 'Cancel'] },
                { name: 'Item Sell', actions: ['Add', 'Add Payment', 'Edit', 'View Payment', 'Delete'] },
                { name: 'Item Issue', actions: ['Add', 'Return'] }
            ],
            permissions: {}
        },
        {
            name: 'transport',
            subModules: [
                { name: 'Routes', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Vehicle', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Assign Vehicle', actions: ['Add', 'Edit', 'Delete'] }
            ],
            permissions: {}
        },
        {
            name: 'dormitory',
            subModules: [
                { name: 'Dormitory Rooms', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Dormitory', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Room Type', actions: ['Add', 'Edit', 'Delete'] }
            ],
            permissions: {}
        },
        {
            name: 'Role & Permission',
            subModules: [
                { name: 'Login Permission', actions: ['On', 'Off'] },
                { name: 'Role', actions: ['Add', 'Edit', 'Delete', 'Assign Permission'] },
                { name: 'Due Fees Login Permission', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'general setting',
            subModules: [
                { name: 'Theme Setting', actions: [] },
                { name: 'General Settings', actions: ['Logo Change', 'Frontend Change', 'Update', 'Update General Settings Data'] },
                { name: 'Optional Subject', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Academic Year', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Holiday', actions: ['Add', 'Edit', 'Delete', 'Delete Holiday'] },
                { name: 'Notification Settings', actions: [] },
                { name: 'Twilio To Chat', actions: [] },
                { name: 'Messenger Chat', actions: [] },
                { name: 'Manage Currency', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Email Settings', actions: ['Update'] },
                { name: 'Payment Settings', actions: ['Gateway Update', 'Gateway Info Update'] },
                { name: 'Role Setup', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Sms Settings', actions: ['Select SMS Service', 'Twilio Update', 'MSG91 Update'] },
                { name: 'Weekend', actions: [] },
                { name: 'Language Settings', actions: ['Add', 'Make Default', 'Setup', 'Remove'] },
                { name: 'Backup', actions: ['Add', 'Download', 'Delete', 'Image', 'Database'] },
                { name: 'Dashboard', actions: ['Custom URL Updater', 'Status Changer', 'Website Off', 'Dashboard On', 'Dashboard Off', 'Report On', 'Report Off', 'Language On', 'Language Off'] },
                { name: 'About & Update', actions: ['Add'] },
                { name: 'Api Permission', actions: [] },
                { name: 'Languages', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Preloader Settings', actions: [] },
                { name: 'Utilities', actions: [] },
                { name: 'Custom Weekend-Event', actions: [] },
                { name: 'Cron Jobs', actions: [] }
            ],
            permissions: {}
        },
        {
            name: 'Style',
            subModules: [
                { name: 'BackGround Settings', actions: ['Add', 'Delete', 'Make Default'] },
                { name: 'Color Theme', actions: ['Make Default', 'Make Default Theme', 'Theme Create', 'Theme Store', 'Theme Copy'] }
            ],
            permissions: {}
        },
        {
            name: 'frontend cms',
            subModules: [
                { name: 'Manage Theme', actions: ['Upload Theme'] },
                { name: 'Home Slider', actions: ['Store', 'Edit', 'Update', 'Delete'] },
                { name: 'Auto Page Loader', actions: [] },
                { name: 'Report Teacher', actions: ['Store', 'Edit', 'Update', 'Delete'] },
                { name: 'Photo Gallery', actions: ['Store', 'Edit', 'Update', 'Delete', 'View Photos'] },
                { name: 'Video Gallery', actions: ['Store', 'Edit', 'Update', 'Delete', 'View Videos'] },
                { name: 'Result', actions: ['Store', 'Edit', 'Update', 'Delete'] },
                { name: 'Class Routine', actions: ['Store', 'Edit', 'Update', 'Delete'] },
                { name: 'Exam Routine', actions: ['Store', 'Edit', 'Update', 'Delete'] },
                { name: 'Academic Calendar', actions: ['Store', 'Edit', 'Update', 'Delete'] },
                { name: 'Header Content', actions: [] },
                { name: 'Footer Content', actions: [] },
                { name: 'Home Page', actions: ['Update'] },
                { name: 'News List', actions: ['View', 'Add', 'Edit', 'Delete'] },
                { name: 'News Category', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'News Comments', actions: ['Change News Status', 'Delete Comment'] },
                { name: 'Testimonial', actions: ['View', 'Add', 'Edit', 'Delete'] },
                { name: 'Course List', actions: ['View', 'Add', 'Edit', 'Delete'] },
                { name: 'Contact Message', actions: ['Delete'] },
                { name: 'Menu', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Pages', actions: ['View', 'Add', 'Edit', 'Delete', 'Download'] },
                { name: 'Course Category', actions: ['Add', 'Edit', 'Delete'] },
                { name: 'Speech Slider', actions: ['Store', 'Edit', 'Update', 'Delete'] },
                { name: 'Donor', actions: ['Store', 'Edit', 'Update', 'Delete'] },
                { name: 'Front Download', actions: ['Store', 'Show', 'Update', 'Delete'] }
            ],
            permissions: {}
        },
    ];

    const [modules, setModules] = useState(initialPermissions);

    useEffect(() => {
        const fetchRolePermissions = async () => {
            setLoading(true);
            try {
                // In a real scenario, we might have a specific route for a single role
                // For now, let's fetch all and filter or assume there's a route
                const { data } = await api.get('/api/school/rbac/roles');
                const currentRole = data.find(r => r._id === roleId);

                if (currentRole) {
                    setRole(currentRole);
                    // Map existing permissions to our UI structure
                    if (currentRole.permissions && currentRole.permissions.length > 0) {
                        const updatedModules = initialPermissions.map(mod => {
                            const roleMod = currentRole.permissions.find(p => p.module === mod.name);
                            if (roleMod) {
                                const defaults = mod.subItems
                                    ? mod.subItems.reduce((a, st) => { a[st] = false; return a; }, {})
                                    : mod.subModules
                                        ? mod.subModules.reduce((a, sm) => {
                                            sm.actions.forEach(act => { a[`${sm.name}:${act}`] = false; });
                                            if (sm.actions.length === 0) a[sm.name] = false;
                                            return a;
                                        }, {})
                                        : { view: false, add: false, edit: false, delete: false };

                                const subPerms = roleMod.actions.reduce((acc, action) => {
                                    acc[action] = true;
                                    return acc;
                                }, defaults);
                                return { ...mod, permissions: subPerms };
                            }
                            return mod;
                        });
                        setModules(updatedModules);
                    }
                }
            } catch (error) {
                console.error('Fetch Role Permissions Error:', error);
                showToast('Failed to load permissions', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchRolePermissions();
    }, [roleId]);

    const togglePermission = (modIdx, perm) => {
        const newModules = [...modules];
        const mod = newModules[modIdx];

        // If it's a sub-module action (e.g., "Admission Query:Add")
        if (perm.includes(':')) {
            mod.permissions[perm] = !mod.permissions[perm];
        }
        // If it's a whole sub-module toggle (e.g., "Admission Query")
        else if (mod.subModules && mod.subModules.find(sm => sm.name === perm)) {
            const sm = mod.subModules.find(sm => sm.name === perm);
            // If any action is checked, uncheck all. Otherwise check all.
            const currentlyChecked = sm.actions.some(a => mod.permissions[`${sm.name}:${a}`]);
            const newState = !currentlyChecked;

            sm.actions.forEach(a => {
                mod.permissions[`${sm.name}:${a}`] = newState;
            });
            mod.permissions[perm] = newState; // Master check
        }
        // Standard view/add/edit/delete toggle
        else {
            mod.permissions[perm] = !mod.permissions[perm];
        }

        setModules(newModules);
    };

    const toggleAccordion = (modIdx) => {
        setExpandedModules(prev => ({
            ...prev,
            [modIdx]: !prev[modIdx]
        }));
    };

    const handleSavePermissions = async () => {
        setSaving(true);
        try {
            // Transform UI data back to backend model
            const transformedPermissions = modules.map(mod => ({
                module: mod.name,
                actions: Object.entries(mod.permissions)
                    .filter(([_, val]) => val)
                    .map(([key, _]) => key)
            })).filter(p => p.actions.length > 0);

            await api.post('/api/school/rbac/roles', {
                name: role.name,
                permissions: transformedPermissions
            });

            showToast('Permissions saved successfully!');
            navigate(`/${school_slug}/role`);
        } catch (error) {
            console.error('Save Permissions Error:', error);
            showToast('Failed to save permissions', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-vh-100 bg-slate-50 text-slate-400">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
                <p className="font-black uppercase tracking-[0.2em] text-[10px] animate-pulse">Initializing Security Grid...</p>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-700 pb-20 bg-[#F8FAFC]/50 min-h-screen">
            {/* Page Header */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 mb-10 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all active:scale-95 flex items-center justify-center group"
                        >
                            <ArrowLeft size={20} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center">
                                Assign Permission
                                <span className="ml-3 px-3 py-1 bg-primary/10 text-primary text-[10px] not-italic rounded-lg">ID: {roleId.slice(-6)}</span>
                            </h1>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Configuring access for <span className="text-primary italic animate-pulse">{role?.name}</span></p>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center space-x-4">
                        <div className="flex flex-col items-end mr-6 pr-6 border-r border-slate-100">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Modules</span>
                            <span className="text-sm font-black text-slate-700 italic">{modules.length}</span>
                        </div>
                        <Button
                            onClick={() => navigate(`/${school_slug}/role`)}
                            className="bg-slate-800 hover:bg-slate-900 text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-xl shadow-slate-200"
                        >
                            <RotateCcw size={16} />
                            <span>CANCEL</span>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {modules.map((mod, modIdx) => (
                        <div
                            key={modIdx}
                            className="animate-in slide-in-from-bottom-8 duration-700"
                            style={{ animationDelay: `${modIdx * 30}ms` }}
                        >
                            <div
                                onClick={() => toggleAccordion(modIdx)}
                                className={`group flex items-center justify-between p-5 bg-[#7c32ff] text-white rounded-2xl shadow-xl shadow-purple-500/10 cursor-pointer hover:bg-[#6b25ea] transition-all relative overflow-hidden ${expandedModules[modIdx] ? 'rounded-b-none ring-4 ring-primary/20 scale-[1.01]' : 'hover:scale-[1.02]'}`}
                            >
                                {/* Decorative elements */}
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
                                <div className="absolute right-12 top-1/2 -translate-y-1/2 w-40 h-2 bg-white/5 skew-x-[45deg] transition-transform group-hover:translate-x-4" />

                                <div className="flex items-center space-x-5 relative z-10">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${expandedModules[modIdx] ? 'bg-white text-primary' : 'bg-white/20'}`}>
                                        {expandedModules[modIdx] ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black uppercase tracking-[0.15em] italic">{mod.name}</span>
                                        <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">
                                            {Object.values(mod.permissions).filter(Boolean).length} Active Permits
                                        </span>
                                    </div>
                                </div>
                                <ChevronRight size={20} className={`transition-transform duration-500 relative z-10 ${expandedModules[modIdx] ? 'rotate-90' : 'opacity-30'}`} />
                            </div>

                            {expandedModules[modIdx] && (
                                <div className="bg-white border-x border-b border-slate-100 rounded-b-2xl shadow-[0_20px_50px_rgba(124,50,255,0.1)] animate-in slide-in-from-top-4 duration-500 overflow-hidden relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />

                                    {mod.subItems ? (
                                        <div className="flex flex-col w-full border-t border-slate-100">
                                            {mod.subItems.map((sub, sIdx) => (
                                                <div
                                                    key={sIdx}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        togglePermission(modIdx, sub);
                                                    }}
                                                    className="flex items-center justify-between px-10 py-5 border-b border-slate-50 hover:bg-slate-50 transition-all cursor-pointer group"
                                                >
                                                    <div className="flex items-center space-x-6">
                                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${mod.permissions[sub]
                                                            ? 'bg-primary/10 text-primary border-primary/20'
                                                            : 'bg-white border border-slate-200 text-slate-200'
                                                            } border-2`}>
                                                            {mod.permissions[sub] && <Check size={14} strokeWidth={4} />}
                                                        </div>
                                                        <div className="flex items-center space-x-3">
                                                            <span className="text-[12px] text-primary font-black opacity-30">→</span>
                                                            <span className={`text-[12px] font-black tracking-tight transition-colors ${mod.permissions[sub] ? 'text-primary' : 'text-slate-500'}`}>
                                                                {sub}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight size={14} className={`transition-all ${mod.permissions[sub] ? 'text-primary' : 'text-slate-200'}`} />
                                                </div>
                                            ))}
                                        </div>
                                    ) : mod.subModules ? (
                                        <div className="flex flex-col w-full border-t border-slate-100 p-6 space-y-6">
                                            {mod.subModules.map((sm, smIdx) => (
                                                <div key={smIdx} className="space-y-4 pb-4 border-b border-slate-50 last:border-0">
                                                    <div
                                                        className="flex items-center space-x-3 cursor-pointer group w-fit"
                                                        onClick={() => togglePermission(modIdx, sm.name)}
                                                    >
                                                        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all border-2 ${sm.actions.some(a => mod.permissions[`${sm.name}:${a}`]) || mod.permissions[sm.name]
                                                            ? 'bg-primary/10 text-primary border-primary/20'
                                                            : 'bg-white border-slate-200 text-slate-200'
                                                            }`}>
                                                            {(sm.actions.some(a => mod.permissions[`${sm.name}:${a}`]) || mod.permissions[sm.name]) && <Check size={12} strokeWidth={4} />}
                                                        </div>
                                                        <span className="text-[13px] font-black text-primary opacity-80 italic">{sm.name}</span>
                                                    </div>

                                                    {sm.actions.length > 0 && (
                                                        <div className="grid grid-cols-3 gap-6 pl-8">
                                                            {sm.actions.map(action => (
                                                                <div
                                                                    key={action}
                                                                    onClick={() => togglePermission(modIdx, `${sm.name}:${action}`)}
                                                                    className="flex items-center space-x-3 cursor-pointer group"
                                                                >
                                                                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all border-2 ${mod.permissions[`${sm.name}:${action}`]
                                                                        ? 'bg-primary/10 text-primary border-primary/20'
                                                                        : 'bg-white border-slate-200 text-slate-200'
                                                                        }`}>
                                                                        {mod.permissions[`${sm.name}:${action}`] && <Check size={12} strokeWidth={4} />}
                                                                    </div>
                                                                    <span className={`text-[11px] font-bold ${mod.permissions[`${sm.name}:${action}`] ? 'text-slate-700' : 'text-slate-400'}`}>
                                                                        {action}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-6 grid grid-cols-2 gap-4">
                                            {['view', 'add', 'edit', 'delete'].map(perm => (
                                                <div
                                                    key={perm}
                                                    onClick={() => togglePermission(modIdx, perm)}
                                                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer group ${mod.permissions[perm]
                                                        ? 'bg-primary/5 border-primary/20 ring-4 ring-primary/5'
                                                        : 'bg-slate-50 border-transparent hover:border-slate-200'
                                                        }`}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${mod.permissions[perm]
                                                            ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30'
                                                            : 'bg-white border border-slate-200 text-slate-300'
                                                            }`}>
                                                            {mod.permissions[perm] && <Check size={14} strokeWidth={4} />}
                                                        </div>
                                                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${mod.permissions[perm] ? 'text-primary' : 'text-slate-400'}`}>
                                                            {perm}
                                                        </span>
                                                    </div>
                                                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${mod.permissions[perm] ? 'bg-primary animate-ping' : 'bg-slate-200'}`} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-20 flex flex-col items-center space-y-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center">
                        <span className="w-12 h-[1px] bg-slate-200 mr-4" />
                        Finalize Security Clearance
                        <span className="w-12 h-[1px] bg-slate-200 ml-4" />
                    </p>
                    <Button
                        onClick={handleSavePermissions}
                        disabled={saving}
                        className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-[2rem] px-24 py-6 font-black uppercase tracking-[0.4em] italic text-[14px] flex items-center space-x-6 shadow-[0_20px_50px_rgba(124,50,255,0.4)] active:scale-95 transition-all group overflow-hidden relative"
                    >
                        {/* High-end decorative shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-700 transition-transform skew-x-[30deg]" />

                        {saving ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} strokeWidth={3} />}
                        <span>SUBMIT PERMISSIONS</span>
                    </Button>
                    <span className="text-[9px] font-bold text-slate-300 uppercase italic">Your changes will be audited and logged system-wide</span>
                </div>
            </div>
        </div>
    );
};

export default AssignPermission;
