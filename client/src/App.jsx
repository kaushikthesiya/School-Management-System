import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import api from './api/api'; // Assuming api is in src/api based on common project structure
import { Card } from './components/SnowUI';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './layouts/Layout';
import Login from './pages/Login';
// import OnlineRegistrationForm from './pages/OnlineRegistrationForm';
import Schools from './pages/SuperAdmin/Schools';
import CreateSchoolAdmin from './pages/SuperAdmin/CreateSchoolAdmin';
import Plans from './pages/SuperAdmin/Plans';
import SuperAdminProfile from './pages/SuperAdmin/SuperAdminProfile';
import PostalDispatch from './pages/SchoolPanel/PostalDispatch';
import PostalReceive from './pages/SchoolPanel/PostalReceive';
import PhoneCallLog from './pages/SchoolPanel/PhoneCallLog';
import AdminSetup from './pages/SchoolPanel/AdminSetup';
import Certificate from './pages/SchoolPanel/Certificate';
import IDCard from './pages/SchoolPanel/IDCard';
import GenerateCertificate from './pages/SchoolPanel/GenerateCertificate';
import GenerateIDCard from './pages/SchoolPanel/GenerateIDCard';
import RoleManagement from './pages/SchoolPanel/RoleManagement';
import Role from './pages/SchoolPanel/RolePermission/Role';
import LoginPermission from './pages/SchoolPanel/RolePermission/LoginPermission';
import DueFeesLoginPermission from './pages/SchoolPanel/RolePermission/DueFeesLoginPermission';
import AssignPermission from './pages/SchoolPanel/RolePermission/AssignPermission';
import AcademicSetup from './pages/SchoolPanel/AcademicSetup';
import StudentDirectory from './pages/SchoolPanel/StudentDirectory';
import FrontOffice from './pages/SchoolPanel/FrontOffice';
import Timetable from './pages/SchoolPanel/Timetable';
import Homework from './pages/SchoolPanel/Homework';
import Incidents from './pages/SchoolPanel/BehaviourRecords/Incidents';
import AssignIncident from './pages/SchoolPanel/BehaviourRecords/AssignIncident';
import StudentIncidentReport from './pages/SchoolPanel/BehaviourRecords/StudentIncidentReport';
import BehaviourReport from './pages/SchoolPanel/BehaviourRecords/BehaviourReport';
import ClassSectionReport from './pages/SchoolPanel/BehaviourRecords/ClassSectionReport';
import IncidentWiseReport from './pages/SchoolPanel/BehaviourRecords/IncidentWiseReport';
import BehaviourSettings from './pages/SchoolPanel/BehaviourRecords/BehaviourSettings';
import Attendance from './pages/SchoolPanel/Attendance';
import FeesManagement from './pages/SchoolPanel/FeesManagement';
import FeesGroup from './pages/SchoolPanel/Fees/FeesGroup';
import FeesType from './pages/SchoolPanel/Fees/FeesType';
import FeesInvoice from './pages/SchoolPanel/Fees/FeesInvoice';
import BankPayment from './pages/SchoolPanel/Fees/BankPayment';
import FeesCarryForward from './pages/SchoolPanel/Fees/FeesCarryForward';
import FeesInstallment from './pages/SchoolPanel/Fees/FeesInstallment';
import FeesDiscount from './pages/SchoolPanel/Fees/FeesDiscount';
import CashPayment from './pages/SchoolPanel/Fees/CashPayment';
import AddHomework from './pages/SchoolPanel/Homework/AddHomework';
import HomeworkList from './pages/SchoolPanel/Homework/HomeworkList';
import HomeworkEvaluation from './pages/SchoolPanel/Homework/HomeworkEvaluation';

// Human Resource
import Designation from './pages/SchoolPanel/HumanResource/Designation';
import Department from './pages/SchoolPanel/HumanResource/Department';
import AddStaff from './pages/SchoolPanel/HumanResource/AddStaff';
import StaffDirectory from './pages/SchoolPanel/HumanResource/StaffDirectory';
import StaffAttendance from './pages/SchoolPanel/HumanResource/StaffAttendance';
import Payroll from './pages/SchoolPanel/HumanResource/Payroll';
import StaffSettings from './pages/SchoolPanel/HumanResource/StaffSettings';

// Leave
import ApplyLeave from './pages/SchoolPanel/HumanResource/Leave/ApplyLeave';
import ApproveLeaveRequest from './pages/SchoolPanel/HumanResource/Leave/ApproveLeaveRequest';
import PendingLeaveRequest from './pages/SchoolPanel/HumanResource/Leave/PendingLeaveRequest';
import LeaveDefine from './pages/SchoolPanel/HumanResource/Leave/LeaveDefine';
import LeaveType from './pages/SchoolPanel/HumanResource/Leave/LeaveType';

// Teacher Evaluation
import ApprovedReport from './pages/SchoolPanel/TeacherEvaluation/ApprovedReport';
import PendingReport from './pages/SchoolPanel/TeacherEvaluation/PendingReport';
import TeacherWiseReport from './pages/SchoolPanel/TeacherEvaluation/TeacherWiseReport';
import EvaluationSettings from './pages/SchoolPanel/TeacherEvaluation/EvaluationSettings';

import Examination from './pages/SchoolPanel/Examination';
import StaffManagement from './pages/SchoolPanel/StaffManagement';
import Announcements from './pages/SchoolPanel/Announcements';
import SchoolDashboard from './pages/SchoolPanel/SchoolDashboard';
import AdmissionQuery from './pages/SchoolPanel/AdmissionQuery';
import Complaints from './pages/SchoolPanel/Complaints';
import OptionalSubjectAcademics from './pages/SchoolPanel/OptionalSubject';
import Sections from './pages/SchoolPanel/Sections';
import Classes from './pages/SchoolPanel/Classes';
import Subjects from './pages/SchoolPanel/Subjects';
import Visitors from './pages/SchoolPanel/Visitors';
import AssignClassTeacher from './pages/SchoolPanel/AssignClassTeacher';
import AssignSubject from './pages/SchoolPanel/AssignSubject';
import ClassRooms from './pages/SchoolPanel/ClassRooms';
import ClassRoutine from './pages/SchoolPanel/ClassRoutine';
import UploadContent from './pages/SchoolPanel/UploadContent';
import StudyMaterialList from './pages/SchoolPanel/StudyMaterialList';
import AcademicManagement from './pages/SchoolPanel/AcademicManagement';
import AcademicConfiguration from './pages/SchoolPanel/AcademicConfiguration';
import Lessons from './pages/SchoolPanel/Lessons';
import Topics from './pages/SchoolPanel/Topics';
import TopicOverview from './pages/SchoolPanel/TopicOverview';
import LessonPlan from './pages/SchoolPanel/LessonPlan';
import LessonPlanOverview from './pages/SchoolPanel/LessonPlanOverview';
import LessonPlanSetting from './pages/SchoolPanel/LessonPlanSetting';
import PayrollBulkPrint from './pages/SchoolPanel/PayrollBulkPrint';
import FeesInvoiceBulkPrint from './pages/SchoolPanel/FeesInvoiceBulkPrint';
import FeesInvoiceBulkPrintSettings from './pages/SchoolPanel/FeesInvoiceBulkPrintSettings';
import StudentCategory from './pages/SchoolPanel/StudentCategory';
import MultiClassStudent from './pages/SchoolPanel/MultiClassStudent';
import DeleteStudentRecord from './pages/SchoolPanel/DeleteStudentRecord';
import UnassignedStudent from './pages/SchoolPanel/UnassignedStudent';
import StudentPromote from './pages/SchoolPanel/StudentPromote';
import DisabledStudents from './pages/SchoolPanel/DisabledStudents';
import SubjectWiseAttendance from './pages/SchoolPanel/SubjectWiseAttendance';
import StudentExport from './pages/SchoolPanel/StudentExport';
import SmsSendingTime from './pages/SchoolPanel/SmsSendingTime';
import StudentSettings from './pages/SchoolPanel/StudentSettings';
import StudentGroup from './pages/SchoolPanel/StudentGroup';
import StudentProfile from './pages/SchoolPanel/StudentProfile';
import AddStudent from './pages/SchoolPanel/AddStudent';
import StudentList from './pages/SchoolPanel/StudentList';
import StudentAttendance from './pages/SchoolPanel/StudentAttendance';
import SiblingManagement from './pages/SchoolPanel/SiblingManagement';
import StudentTransfer from './pages/SchoolPanel/StudentTransfer';
import CertificateBulkPrint from './pages/SchoolPanel/CertificateBulkPrint';
import IDCardBulkPrint from './pages/SchoolPanel/IDCardBulkPrint';
import {
  Downloads,
  Dormitory, ExamPlan,
  TeacherEvaluation, RolePermission, Wallet, Accounts,
  Chat, Style, UserLogs, ModuleManager, StudentsReport,
  StaffReport, FeesReport, AccountsReport,
  GeneralSettings, FrontendCMS, FeesSettings,
  ExamSettings
} from './pages/SchoolPanel/Placeholders';
import { StudentCustomField, StaffCustomField } from './pages/SchoolPanel/CustomFields';
import { TwoFactorSetting, GeneralSettingsMain, OptionalSubject as OptionalSubjectSettings, AcademicYear, Holiday, TawkToChatSetting, MessengerChatSetting, ManageCurrency, PaymentMethodSettings, BaseSetup, SMSSettings, Weekend, LanguageSettings, Backup, HeaderOption, LanguageManagement, NotificationSetting, EmailSettings, ApiPermission, CronJob } from './pages/SchoolPanel/GeneralSettingsPages';
import {
  ManageTheme, HomeSlider, HomePageUpdate, PageList, ExpertStaff, PhotoGallery,
  VideoGallery, FrontResult, FrontClassRoutine, FrontExamRoutine, ClassExamRoutineSetup,
  AcademicCalendar, Testimonial, NewsCategory, NewsList, NewsComments, CourseCategory,
  CourseList, ContactMessage, SpeechSlider, HeaderMenu, Pages, Donor, FormDownload
} from './pages/SchoolPanel/FrontendCMSPages';
import SidebarManager from './pages/SchoolPanel/SidebarManager';
import ManageStudent from './pages/SchoolPanel/Registration/ManageStudent';
import RegistrationSettings from './pages/SchoolPanel/Registration/RegistrationSettings';
import ParentDashboard from './pages/ParentPanel/ParentDashboard';
import ParentProfile from './pages/ParentPanel/ParentProfile';
import ChangePassword from './pages/ChangePassword';
import BiometricSettings from './pages/SchoolPanel/Biometrics/BiometricSettings';
import StaffAttendanceReport from './pages/SchoolPanel/Biometrics/StaffAttendanceReport';
import StudentAttendanceReport from './pages/SchoolPanel/Biometrics/StudentAttendanceReport';
import UserIds from './pages/SchoolPanel/Biometrics/UserIds';
import WhatsAppSettings from './pages/SchoolPanel/WhatsAppSupport/WhatsAppSettings';
import WhatsAppAgents from './pages/SchoolPanel/WhatsAppSupport/WhatsAppAgents';
import WhatsAppAnalytics from './pages/SchoolPanel/WhatsAppSupport/WhatsAppAnalytics';
import CertificateType from './pages/SchoolPanel/Certificate/CertificateType';
import CertificateTemplate from './pages/SchoolPanel/Certificate/CertificateTemplate';
import StudentCertificate from './pages/SchoolPanel/Certificate/StudentCertificate';
import StaffCertificate from './pages/SchoolPanel/Certificate/StaffCertificate';
import CertificateRecord from './pages/SchoolPanel/Certificate/CertificateRecord';
import CertificateSettings from './pages/SchoolPanel/Certificate/CertificateSettings';
import AddBook from './pages/SchoolPanel/Library/AddBook';
import BookList from './pages/SchoolPanel/Library/BookList';
import BookCategories from './pages/SchoolPanel/Library/BookCategories';
import AddMember from './pages/SchoolPanel/Library/AddMember';
import IssueReturnBook from './pages/SchoolPanel/Library/IssueReturnBook';
import AllIssuedBooks from './pages/SchoolPanel/Library/AllIssuedBooks';
import LibrarySubject from './pages/SchoolPanel/Library/LibrarySubject';
import Vehicle from './pages/SchoolPanel/Transport/Vehicle';
import TransportRoute from './pages/SchoolPanel/Transport/TransportRoute';
import AssignVehicle from './pages/SchoolPanel/Transport/AssignVehicle';
import DormitoryRooms from './pages/SchoolPanel/Dormitory/DormitoryRooms';
import DormitoryList from './pages/SchoolPanel/Dormitory/DormitoryList';
import RoomType from './pages/SchoolPanel/Dormitory/RoomType';
import ExamType from './pages/SchoolPanel/Examination/ExamType';
import ExamSetup from './pages/SchoolPanel/Examination/ExamSetup';
import ExamSchedule from './pages/SchoolPanel/Examination/ExamSchedule';
import ExamAttendance from './pages/SchoolPanel/Examination/ExamAttendance';
import MarksRegister from './pages/SchoolPanel/Examination/MarksRegister';
import MarksGrade from './pages/SchoolPanel/Examination/MarksGrade';
import SendMarksSms from './pages/SchoolPanel/Examination/SendMarksSms';
import ExamAdmitCard from './pages/SchoolPanel/Examination/ExamAdmitCard';
import ExamSeatPlan from './pages/SchoolPanel/Examination/ExamSeatPlan';
import ExamReport from './pages/SchoolPanel/Examination/ExamReport';
import QuestionGroup from './pages/SchoolPanel/OnlineExam/QuestionGroup';
import QuestionBank from './pages/SchoolPanel/OnlineExam/QuestionBank';
import OnlineExam from './pages/SchoolPanel/OnlineExam/OnlineExam';
import ItemCategory from './pages/SchoolPanel/Inventory/ItemCategory';
import ItemList from './pages/SchoolPanel/Inventory/ItemList';
import AddItem from './pages/SchoolPanel/Inventory/AddItem';
import IssueItem from './pages/SchoolPanel/Inventory/IssueItem';
import StaffDetails from './pages/SchoolPanel/HumanResource/StaffDetails';
import {
  StudentAttendanceReport as StudentAttendanceReportView,
  SubjectAttendanceReport,
  HomeworkEvaluationReport,
  GuardianReports,
  StudentHistoryReport,
  StudentLoginReport,
  ClassReport,
  ClassRoutineReport,
  StudentGeneralReport,
  PreviousRecordReport,
  StudentTransportReport,
  StudentDormitoryReport,
  ExamRoutineReport,
  MeritListReport,
  OnlineExamReport,
  SubjectWiseMarksheetReport,
  TabulationSheetReport,
  ProgressCardReport,
  MarkSheetReport,
  ProgressCardReport100,
  PreviousResultReport,
  StaffAttendanceReport as StaffAttendanceReportView,
  StaffPayrollReport,
  FeesDueReport,
  FineReport,
  PaymentReport,
  BalanceReport,
  WaiverReport,
  WalletReport,
  AccountsPayrollReport,
  AccountsTransactionReport
} from './pages/SchoolPanel/Reports/ReportPages';

// Wallet
import PendingDeposit from './pages/SchoolPanel/Wallet/PendingDeposit';
import ApproveDeposit from './pages/SchoolPanel/Wallet/ApproveDeposit';
import RejectDeposit from './pages/SchoolPanel/Wallet/RejectDeposit';
import WalletTransaction from './pages/SchoolPanel/Wallet/WalletTransaction';
import RefundRequest from './pages/SchoolPanel/Wallet/RefundRequest';

// Accounts
import ProfitAndLoss from './pages/SchoolPanel/Accounts/ProfitAndLoss';
import Income from './pages/SchoolPanel/Accounts/Income';
import Expense from './pages/SchoolPanel/Accounts/Expense';
import ChartOfAccount from './pages/SchoolPanel/Accounts/ChartOfAccount';
import BankAccount from './pages/SchoolPanel/Accounts/BankAccount';
import FundTransfer from './pages/SchoolPanel/Accounts/FundTransfer';



// Placeholder Pages
const SuperAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSchools: 0,
    monthlyRevenue: 0,
    activeSubscriptions: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/superadmin/dashboard-stats');
        setStats({ ...res.data, loading: false });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };
    fetchStats();
  }, []);

  if (stats.loading) return <div className="p-4">Loading stats...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">Super Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <p className="text-slate-500 text-sm font-medium">Total Schools</p>
          <h3 className="text-3xl font-bold text-primary">{stats.totalSchools}</h3>
        </Card>
        <Card>
          <p className="text-slate-500 text-sm font-medium">Monthly Revenue</p>
          <h3 className="text-3xl font-bold text-primary">₹{stats.monthlyRevenue.toLocaleString()}</h3>
        </Card>
        <Card>
          <p className="text-slate-500 text-sm font-medium">Active Subscriptions</p>
          <h3 className="text-3xl font-bold text-primary">{stats.activeSubscriptions}</h3>
        </Card>
      </div>
    </div>
  );
};

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};



const ProfileDispatcher = () => {
  const { user } = useAuth();
  if (user?.role === 'student') return <StudentProfile />;
  if (user?.role === 'parent') return <ParentProfile />;
  if (user?.role === 'superadmin') return <SuperAdminProfile />;
  return <StaffDetails />;
};

const SchoolRoot = () => {
  const { user } = useAuth();
  if (user?.role === 'parent') return <ParentDashboard />;
  return <SchoolDashboard />;
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            {/* <Route path="/:school_slug/online-registration" element={<OnlineRegistrationForm />} /> */}

            {/* Super Admin Routes */}
            <Route path="/superadmin/*" element={
              <PrivateRoute role="superadmin">
                <Layout role="superadmin">
                  <Routes>
                    <Route path="/" element={<SuperAdminDashboard />} />
                    <Route path="/schools" element={<Schools />} />
                    <Route path="/create-school-admin" element={<CreateSchoolAdmin />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/profile" element={<SuperAdminProfile />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            } />

            {/* School/Tenant Routes */}
            <Route path="/:school_slug/*" element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<SchoolRoot />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/sidebar-manager" element={<SidebarManager />} />
                    <Route path="/front-office" element={<FrontOffice />} />
                    <Route path="admission-query" element={<AdmissionQuery />} />
                    <Route path="complaints" element={<Complaints />} />
                    <Route path="students" element={<StudentDirectory />} />
                    <Route path="roles" element={<RoleManagement />} />
                    <Route path="academic-year" element={<AcademicConfiguration />} />
                    <Route path="timetable" element={<Timetable />} />
                    <Route path="homework" element={<Homework />} />
                    <Route path="student-category" element={<StudentCategory />} />
                    <Route path="student-list" element={<StudentList />} />
                    <Route path="student-attendance" element={<StudentAttendance />} />
                    <Route path="add-student" element={<AddStudent />} />
                    <Route path="edit-student/:id" element={<AddStudent />} />
                    <Route path="student-group" element={<StudentGroup />} />
                    <Route path="multi-class-student" element={<MultiClassStudent />} />
                    <Route path="delete-student-record" element={<DeleteStudentRecord />} />
                    <Route path="unassigned-student" element={<UnassignedStudent />} />
                    <Route path="student-promote" element={<StudentPromote />} />
                    <Route path="disabled-students" element={<DisabledStudents />} />
                    <Route path="subject-wise-attendance" element={<SubjectWiseAttendance />} />
                    <Route path="student-export" element={<StudentExport />} />
                    <Route path="student-profile/:id" element={<StudentProfile />} />
                    <Route path="sms-sending-time" element={<SmsSendingTime />} />
                    <Route path="student-settings" element={<StudentSettings />} />
                    <Route path="sibling-management" element={<SiblingManagement />} />
                    <Route path="student-transfer" element={<StudentTransfer />} />
                    <Route path="incidents" element={<Incidents />} />
                    <Route path="assign-incident" element={<AssignIncident />} />
                    <Route path="student-incident-report" element={<StudentIncidentReport />} />
                    <Route path="behaviour-report" element={<BehaviourReport />} />
                    <Route path="class-section-report" element={<ClassSectionReport />} />
                    <Route path="incident-wise-report" element={<IncidentWiseReport />} />
                    <Route path="behaviour-settings" element={<BehaviourSettings />} />
                    <Route path="biometrics/settings" element={<BiometricSettings />} />
                    <Route path="biometrics/staff-attendance" element={<StaffAttendanceReport />} />
                    <Route path="biometrics/student-attendance" element={<StudentAttendanceReport />} />
                    <Route path="biometrics/user-id" element={<UserIds />} />
                    <Route path="attendance" element={<Attendance />} />
                    <Route path="fees" element={<FeesManagement />} />
                    <Route path="fees-group" element={<FeesGroup />} />
                    <Route path="fees-type" element={<FeesType />} />
                    <Route path="fees-invoice" element={<FeesInvoice />} />
                    <Route path="bank-payment" element={<BankPayment />} />
                    <Route path="fees-carry-forward" element={<FeesCarryForward />} />
                    <Route path="fees-installment" element={<FeesInstallment />} />
                    <Route path="fees-discount" element={<FeesDiscount />} />
                    <Route path="cash-payment" element={<CashPayment />} />
                    <Route path="add-homework" element={<AddHomework />} />
                    <Route path="homework-list" element={<HomeworkList />} />
                    <Route path="homework-evaluation" element={<HomeworkEvaluation />} />

                    {/* Human Resource */}
                    <Route path="designation" element={<Designation />} />
                    <Route path="department" element={<Department />} />
                    <Route path="add-staff" element={<AddStaff />} />
                    <Route path="staff-directory" element={<StaffDirectory />} />
                    <Route path="staff-details/:id" element={<StaffDetails />} />
                    <Route path="profile" element={<ProfileDispatcher />} />
                    <Route path="staff-attendance" element={<StaffAttendance />} />
                    <Route path="payroll" element={<Payroll />} />
                    <Route path="staff-settings" element={<StaffSettings />} />
                    <Route path="exams" element={<Examination />} />
                    <Route path="staff" element={<StaffManagement />} />
                    <Route path="announcements" element={<Announcements />} />
                    <Route path="registration/student-list" element={<ManageStudent />} />
                    <Route path="registration/settings" element={<RegistrationSettings />} />

                    {/* New Sidebar Modules */}
                    <Route path="visitors" element={<Visitors />} />
                    <Route path="postal-receive" element={<PostalReceive />} />
                    <Route path="postal-dispatch" element={<PostalDispatch />} />
                    <Route path="call-log" element={<PhoneCallLog />} />
                    <Route path="settings" element={<AdminSetup />} />
                    <Route path="id-cards" element={<IDCard />} />
                    <Route path="certificates" element={<Certificate />} />
                    <Route path="certificate/types" element={<CertificateType />} />
                    <Route path="certificate/templates" element={<CertificateTemplate />} />
                    <Route path="certificate/student" element={<StudentCertificate />} />
                    <Route path="certificate/staff" element={<StaffCertificate />} />
                    <Route path="certificate/records" element={<CertificateRecord />} />
                    <Route path="certificate/settings" element={<CertificateSettings />} />
                    <Route path="generate-certificate" element={<GenerateCertificate />} />
                    <Route path="generate-id-card" element={<GenerateIDCard />} />
                    {/* Academics Section */}
                    <Route path="optional-subject" element={<OptionalSubjectAcademics />} />
                    <Route path="sections" element={<Sections />} />
                    <Route path="classes" element={<Classes />} />
                    <Route path="subjects" element={<Subjects />} />
                    <Route path="assign-teacher" element={<AssignClassTeacher />} />
                    <Route path="assign-subject" element={<AssignSubject />} />
                    <Route path="class-rooms" element={<ClassRooms />} />
                    <Route path="class-routine" element={<ClassRoutine />} />

                    <Route path="upload-content" element={<UploadContent />} />
                    <Route path="assignments" element={<StudyMaterialList />} />
                    <Route path="simple-syllabus" element={<StudyMaterialList />} />
                    <Route path="other-downloads" element={<StudyMaterialList />} />
                    <Route path="academic-management" element={<AcademicManagement />} />
                    <Route path="lessons" element={<Lessons />} />
                    <Route path="topics" element={<Topics />} />
                    <Route path="topic-overview" element={<TopicOverview />} />
                    <Route path="lesson-plan" element={<LessonPlan />} />
                    <Route path="lesson-plan-overview" element={<LessonPlanOverview />} />
                    <Route path="lesson-plan-setting" element={<LessonPlanSetting />} />
                    <Route path="bulk-payroll" element={<PayrollBulkPrint />} />
                    <Route path="bulk-certificate" element={<CertificateBulkPrint />} />
                    <Route path="id-card-bulk-print" element={<IDCardBulkPrint />} />
                    <Route path="bulk-invoice" element={<FeesInvoiceBulkPrint />} />
                    <Route path="bulk-invoice-settings" element={<FeesInvoiceBulkPrintSettings />} />
                    <Route path="add-book" element={<AddBook />} />
                    <Route path="book-list" element={<BookList />} />
                    <Route path="book-categories" element={<BookCategories />} />
                    <Route path="add-member" element={<AddMember />} />
                    <Route path="library-issue" element={<IssueReturnBook />} />
                    <Route path="all-issued-book" element={<AllIssuedBooks />} />
                    <Route path="library-subjects" element={<LibrarySubject />} />
                    <Route path="transport-vehicle" element={<Vehicle />} />
                    <Route path="transport-route" element={<TransportRoute />} />
                    <Route path="transport-assign" element={<AssignVehicle />} />
                    <Route path="dormitory-rooms" element={<DormitoryRooms />} />
                    <Route path="dormitory-list" element={<DormitoryList />} />
                    <Route path="room-type" element={<RoomType />} />
                    <Route path="exam-type" element={<ExamType />} />
                    <Route path="exam-setup" element={<ExamSetup />} />
                    <Route path="exam-schedule" element={<ExamSchedule />} />
                    <Route path="exam-attendance" element={<ExamAttendance />} />
                    <Route path="marks-register" element={<MarksRegister />} />
                    <Route path="marks-grade" element={<MarksGrade />} />
                    <Route path="send-marks-sms" element={<SendMarksSms />} />
                    <Route path="exam-admit-card" element={<ExamAdmitCard />} />
                    <Route path="exam-seat-plan" element={<ExamSeatPlan />} />
                    <Route path="question-group" element={<QuestionGroup />} />
                    <Route path="question-bank" element={<QuestionBank />} />
                    <Route path="online-exam" element={<OnlineExam />} />

                    {/* Teacher Evaluation */}
                    <Route path="/teacher-evaluation/approved-report" element={<ApprovedReport />} />
                    <Route path="/teacher-evaluation/pending-report" element={<PendingReport />} />
                    <Route path="/teacher-evaluation/teacher-wise-report" element={<TeacherWiseReport />} />
                    <Route path="/teacher-evaluation/settings" element={<EvaluationSettings />} />

                    {/* Leave */}
                    <Route path="leave/apply" element={<ApplyLeave />} />
                    <Route path="leave/approve" element={<ApproveLeaveRequest />} />
                    <Route path="leave/pending" element={<PendingLeaveRequest />} />
                    <Route path="leave/define" element={<LeaveDefine />} />
                    <Route path="leave/type" element={<LeaveType />} />

                    <Route path="/teacher-evaluation" element={<TeacherEvaluation />} />
                    <Route path="/role" element={<Role />} />
                    <Route path="/login-permission" element={<LoginPermission />} />
                    <Route path="/due-fees-login-permission" element={<DueFeesLoginPermission />} />
                    <Route path="/assign-permission/:roleId" element={<AssignPermission />} />
                    <Route path="/whatsapp/settings" element={<WhatsAppSettings />} />
                    <Route path="/whatsapp/agents" element={<WhatsAppAgents />} />
                    <Route path="/whatsapp/analytics" element={<WhatsAppAnalytics />} />

                    {/* Wallet */}
                    <Route path="wallet/pending" element={<PendingDeposit />} />
                    <Route path="wallet/approve" element={<ApproveDeposit />} />
                    <Route path="wallet/reject" element={<RejectDeposit />} />
                    <Route path="wallet/transactions" element={<WalletTransaction />} />
                    <Route path="wallet/refund-request" element={<RefundRequest />} />

                    {/* Accounts */}
                    <Route path="accounts/profit-loss" element={<ProfitAndLoss />} />
                    <Route path="accounts/income" element={<Income />} />
                    <Route path="accounts/expense" element={<Expense />} />
                    <Route path="accounts/chart-of-account" element={<ChartOfAccount />} />
                    <Route path="accounts/bank-account" element={<BankAccount />} />
                    <Route path="accounts/fund-transfer" element={<FundTransfer />} />

                    <Route path="wallet" element={<Wallet />} />
                    <Route path="expenses" element={<Accounts />} />
                    <Route path="financial-reports" element={<Accounts />} />
                    <Route path="inventory-category" element={<ItemCategory />} />
                    <Route path="inventory-list" element={<ItemList />} />
                    <Route path="add-inventory" element={<AddItem />} />
                    <Route path="issue-inventory" element={<IssueItem />} />
                    <Route path="chat" element={<Chat />} />
                    <Route path="style" element={<Style />} />
                    <Route path="user-logs" element={<UserLogs />} />
                    <Route path="module-manager" element={<ModuleManager />} />
                    <Route path="comm-logs" element={<UserLogs />} />
                    <Route path="backup" element={<ModuleManager />} />

                    {/* Report Section */}
                    {/* Student Reports */}
                    <Route path="student-attendance-report" element={<StudentAttendanceReportView />} />
                    <Route path="subject-attendance-report" element={<SubjectAttendanceReport />} />
                    <Route path="homework-evaluation-report" element={<HomeworkEvaluationReport />} />
                    <Route path="guardian-reports" element={<GuardianReports />} />
                    <Route path="student-history" element={<StudentHistoryReport />} />
                    <Route path="student-login-report" element={<StudentLoginReport />} />
                    <Route path="class-report" element={<ClassReport />} />
                    <Route path="class-routine-report" element={<ClassRoutineReport />} />
                    <Route path="student-report" element={<StudentGeneralReport />} />
                    <Route path="previous-record-report" element={<PreviousRecordReport />} />
                    <Route path="student-transport-report" element={<StudentTransportReport />} />
                    <Route path="student-dormitory-report" element={<StudentDormitoryReport />} />

                    {/* Exam Reports */}
                    <Route path="exam-routine-report" element={<ExamRoutineReport />} />
                    <Route path="merit-list-report" element={<MeritListReport />} />
                    <Route path="online-exam-report" element={<OnlineExamReport />} />
                    <Route path="subject-wise-marksheet-report" element={<SubjectWiseMarksheetReport />} />
                    <Route path="tabulation-sheet-report" element={<TabulationSheetReport />} />
                    <Route path="progress-card-report" element={<ProgressCardReport />} />
                    <Route path="mark-sheet-report" element={<MarkSheetReport />} />
                    <Route path="progress-card-report-100" element={<ProgressCardReport100 />} />
                    <Route path="previous-result-report" element={<PreviousResultReport />} />

                    {/* Staff Reports */}
                    <Route path="staff-attendance-report" element={<StaffAttendanceReportView />} />
                    <Route path="staff-payroll-report" element={<StaffPayrollReport />} />

                    {/* Fees Reports */}
                    <Route path="fees-due-report" element={<FeesDueReport />} />
                    <Route path="fine-report" element={<FineReport />} />
                    <Route path="payment-report" element={<PaymentReport />} />
                    <Route path="balance-report" element={<BalanceReport />} />
                    <Route path="waiver-report" element={<WaiverReport />} />
                    <Route path="wallet-report" element={<WalletReport />} />

                    {/* Accounts Reports */}
                    <Route path="accounts-payroll-report" element={<AccountsPayrollReport />} />
                    <Route path="accounts-transaction-report" element={<AccountsTransactionReport />} />

                    <Route path="/student-report-old" element={<StudentsReport />} />
                    <Route path="/exam-report-old" element={<ExamReport />} />
                    <Route path="/staff-report-old" element={<StaffReport />} />
                    <Route path="/fees-report-old" element={<FeesReport />} />
                    <Route path="/accounts-report-old" element={<AccountsReport />} />

                    {/* Settings Section */}
                    <Route path="custom-fields-student" element={<StudentCustomField />} />
                    <Route path="custom-fields-staff" element={<StaffCustomField />} />
                    <Route path="general-settings-setup" element={<GeneralSettingsMain />} />
                    <Route path="frontend-cms" element={<FrontendCMS />} />
                    <Route path="fees-settings" element={<FeesSettings />} />
                    <Route path="exam-settings" element={<ExamSettings />} />

                    {/* General Settings Sub-routes */}
                    <Route path="two-factor-setting" element={<TwoFactorSetting />} />
                    <Route path="holiday" element={<Holiday />} />
                    <Route path="notification-setting" element={<NotificationSetting />} />
                    <Route path="tawk-to-chat" element={<TawkToChatSetting />} />
                    <Route path="messenger-chat" element={<MessengerChatSetting />} />
                    <Route path="manage-currency" element={<ManageCurrency />} />
                    <Route path="email-settings" element={<EmailSettings />} />
                    <Route path="payment-settings" element={<PaymentMethodSettings />} />
                    <Route path="base-setup" element={<BaseSetup />} />
                    <Route path="sms-settings" element={<SMSSettings />} />
                    <Route path="weekend" element={<Weekend />} />
                    <Route path="language-settings" element={<LanguageSettings />} />
                    <Route path="dashboard-settings" element={<HeaderOption />} />
                    <Route path="about-update" element={<GeneralSettings />} />
                    <Route path="api-permission" element={<ApiPermission />} />
                    <Route path="language" element={<LanguageManagement />} />
                    <Route path="backup-settings" element={<Backup />} />
                    <Route path="preloader-settings" element={<GeneralSettings />} />
                    <Route path="cron-job" element={<CronJob />} />
                    <Route path="assign-optional-subject" element={<OptionalSubjectSettings />} />
                    <Route path="academic-year" element={<AcademicYear />} />

                    {/* Frontend CMS Sub-routes */}
                    <Route path="manage-theme" element={<ManageTheme />} />
                    <Route path="home-slider" element={<HomeSlider />} />
                    <Route path="home-page" element={<HomePageUpdate />} />
                    <Route path="aora-pagebuilder" element={<PageList />} />
                    <Route path="expert-teacher" element={<ExpertStaff />} />
                    <Route path="photo-gallery" element={<PhotoGallery />} />
                    <Route path="video-gallery" element={<VideoGallery />} />
                    <Route path="result-cms" element={<FrontResult />} />
                    <Route path="class-routine-cms" element={<FrontClassRoutine />} />
                    <Route path="exam-routine-cms" element={<FrontExamRoutine />} />
                    <Route path="academic-calendar-cms" element={<AcademicCalendar />} />
                    <Route path="news-list" element={<NewsList />} />
                    <Route path="news-category" element={<NewsCategory />} />
                    <Route path="news-comments" element={<NewsComments />} />
                    <Route path="testimonial" element={<Testimonial />} />
                    <Route path="course-list" element={<CourseList />} />
                    <Route path="course-category" element={<CourseCategory />} />
                    <Route path="contact-message" element={<ContactMessage />} />
                    <Route path="speech-slider" element={<SpeechSlider />} />
                    <Route path="class-exam-routine-cms" element={<ClassExamRoutineSetup />} />
                    <Route path="header-content" element={<HeaderMenu />} />
                    <Route path="footer-content" element={<FrontendCMS />} />
                    <Route path="menu-cms" element={<HeaderMenu />} />
                    <Route path="pages-cms" element={<Pages />} />
                    <Route path="donor" element={<Donor />} />
                    <Route path="form-download" element={<FormDownload />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            } />

            {/* Catch-all */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
