import React from 'react';
import { Card } from '../../components/SnowUI';
import { Construction } from 'lucide-react';

const PlaceholderPage = ({ title }) => (
    <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase underline decoration-primary/10 decoration-8 underline-offset-4">{title}</h1>
                <p className="text-slate-400 font-bold mt-2">This module is ready for your institutional records.</p>
            </div>
        </div>

        <Card className="p-20 border-none shadow-3xl shadow-slate-100 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center text-primary animate-pulse">
                <Construction size={48} />
            </div>
            <div className="max-w-md">
                <h2 className="text-xl font-black text-slate-800 uppercase italic">Under Construction</h2>
                <p className="text-slate-400 font-medium mt-2">
                    We are building a premium experience for <b>{title}</b>. This module will allow you to manage and track institutional data with advanced analytics and bulk operations.
                </p>
            </div>
        </Card>
    </div>
);

export const Visitors = () => <PlaceholderPage title="Visitor Book" />;
export const IDCards = () => <PlaceholderPage title="ID Cards" />;
export const Certificates = () => <PlaceholderPage title="Certificates" />;
export const Downloads = () => <PlaceholderPage title="Download Center" />;
export const LessonPlan = () => <PlaceholderPage title="Lesson Plan" />;
export const Topics = () => <PlaceholderPage title="Topic Management" />;
export const Library = () => <PlaceholderPage title="Library Management" />;
export const Transport = () => <PlaceholderPage title="Transport Management" />;
export const Dormitory = () => <PlaceholderPage title="Dormitory Management" />;
export const ExamPlan = () => <PlaceholderPage title="Exam Plan Management" />;
export const OnlineExam = () => <PlaceholderPage title="Online Examination" />;
export const TeacherEvaluation = () => <PlaceholderPage title="Teacher Evaluation" />;
export const RolePermission = () => <PlaceholderPage title="Role & Permission Management" />;
export const Wallet = () => <PlaceholderPage title="Wallet Management" />;
export const Accounts = () => <PlaceholderPage title="Accounts & Financials" />;
export const Inventory = () => <PlaceholderPage title="Inventory Management" />;
export const Chat = () => <PlaceholderPage title="Staff & Parent Chat" />;
export const Style = () => <PlaceholderPage title="Theme & Style Setup" />;
export const UserLogs = () => <PlaceholderPage title="System User Logs" />;
export const ModuleManager = () => <PlaceholderPage title="Module Manager" />;

// Report Section
export const StudentsReport = () => <PlaceholderPage title="Students Report" />;
export const ExamReport = () => <PlaceholderPage title="Exam Report" />;
export const StaffReport = () => <div className="p-10 text-2xl font-bold text-red-500">STAFF REPORT DEBUG VIEW</div>;
export const FeesReport = () => <PlaceholderPage title="Fees Report" />;
export const AccountsReport = () => <PlaceholderPage title="Accounts Report" />;

// Settings Section
export const StudentCustomField = () => <PlaceholderPage title="Student Registration Custom Fields" />;
export const StaffCustomField = () => <PlaceholderPage title="Staff Registration Custom Fields" />;
export const GeneralSettings = () => <PlaceholderPage title="General Settings" />;
export const FrontendCMS = () => <PlaceholderPage title="Frontend CMS" />;
export const FeesSettings = () => <PlaceholderPage title="Fees Settings" />;
export const ExamSettings = () => <PlaceholderPage title="Exam Settings" />;
