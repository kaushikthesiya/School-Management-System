import React, { useState } from 'react';
import { Button, Card } from '../../components/SnowUI';
import {
    ArrowLeft,
    FileSpreadsheet,
    FileText,
    Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useToast } from '../../context/ToastContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StudentExport = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(null); // 'csv' or 'pdf'

    const fetchAllStudents = async () => {
        try {
            const res = await api.get('/api/students');
            return res.data;
        } catch (error) {
            showToast("Failed to fetch students for export", "error");
            return null;
        }
    };

    const exportToCSV = async () => {
        setLoading('csv');
        const students = await fetchAllStudents();
        if (!students || students.length === 0) {
            setLoading(null);
            return;
        }

        try {
            const headers = [
                'Admission No',
                'Roll No',
                'First Name',
                'Last Name',
                'Class',
                'Section',
                'Gender',
                'DOB',
                'Guardian Name',
                'Phone'
            ];

            const rows = students.map(s => [
                s.admissionNumber || '',
                s.roll || '',
                s.firstName || '',
                s.lastName || '',
                s.class?.name || '',
                s.section || '',
                s.gender || '',
                s.dob ? new Date(s.dob).toLocaleDateString() : '',
                s.guardianName || '',
                s.phone || ''
            ]);

            const csvContent = [
                headers.join(','),
                ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `student_list_${new Date().toLocaleDateString()}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast("CSV Exported successfully");
        } catch (error) {
            showToast("CSV Export failed", "error");
        } finally {
            setLoading(null);
        }
    };

    const exportToPDF = async () => {
        setLoading('pdf');
        const students = await fetchAllStudents();
        if (!students || students.length === 0) {
            setLoading(null);
            return;
        }

        try {
            const doc = new jsPDF();

            // Add Title
            doc.setFontSize(18);
            doc.text("Student List", 14, 22);
            doc.setFontSize(11);
            doc.setTextColor(100);
            doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

            const tableColumn = ["Admn No", "Name", "Class", "Section", "Gender", "Phone"];
            const tableRows = students.map(s => [
                s.admissionNumber,
                `${s.firstName} ${s.lastName}`,
                s.class?.name,
                s.section,
                s.gender,
                s.phone
            ]);

            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 40,
                theme: 'striped',
                headStyles: { fillColor: [124, 50, 255] }, // Purple matching Snow UI
                styles: { fontSize: 9 }
            });

            doc.save(`student_list_${new Date().toLocaleDateString()}.pdf`);
            showToast("PDF Exported successfully");
        } catch (error) {
            showToast("PDF Export failed", "error");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-[#7c32ff] hover:bg-slate-100 transition-all border border-slate-100"
                    >
                        <ArrowLeft size={18} strokeWidth={3} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Student Export</h1>
                        <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                            <span>Dashboard</span>
                            <span>|</span>
                            <span>Student Info</span>
                            <span>|</span>
                            <span className="text-[#7c32ff]">Student Export</span>
                        </div>
                    </div>
                </div>
            </div>

            <Card className="p-0 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl overflow-hidden relative">
                <div className="p-8 border-b border-slate-50">
                    <h3 className="text-sm font-black text-[#6b25ea] uppercase tracking-widest flex items-center space-x-3">
                        <FileText size={16} />
                        <span>All Student Export</span>
                    </h3>
                </div>

                <div className="p-16 flex flex-col items-center justify-center space-y-10 relative">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -ml-32 -mb-32 opacity-50" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg relative z-10">
                        <Button
                            onClick={exportToCSV}
                            disabled={loading !== null}
                            className={`bg-[#28a745] hover:bg-[#218838] text-white rounded-xl py-4 flex items-center justify-center space-x-3 shadow-lg shadow-green-500/20 active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest ${loading === 'csv' ? 'opacity-70' : ''}`}
                        >
                            {loading === 'csv' ? <Loader2 size={16} className="animate-spin" /> : <FileSpreadsheet size={16} strokeWidth={3} />}
                            <span>{loading === 'csv' ? 'EXPORTING...' : 'EXPORT TO CSV'}</span>
                        </Button>
                        <Button
                            onClick={exportToPDF}
                            disabled={loading !== null}
                            className={`bg-[#ff3b30] hover:bg-[#d92d20] text-white rounded-xl py-4 flex items-center justify-center space-x-3 shadow-lg shadow-red-500/20 active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest ${loading === 'pdf' ? 'opacity-70' : ''}`}
                        >
                            {loading === 'pdf' ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} strokeWidth={3} />}
                            <span>{loading === 'pdf' ? 'EXPORTING...' : 'EXPORT TO PDF'}</span>
                        </Button>
                    </div>
                </div>

                {/* Decorative Floating Icon */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-20 bg-[#7c32ff] rounded-l-full flex items-center justify-center shadow-lg shadow-purple-500/40">
                    <div className="w-5 h-5 rounded-full border-2 border-white/30" />
                </div>
            </Card>
        </div>
    );
};

export default StudentExport;
