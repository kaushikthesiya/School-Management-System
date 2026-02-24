import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Button } from '../../components/SnowUI';
import { Printer, ArrowLeft, Loader2 } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

const IDCardBulkPrint = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const printRef = useRef();

    const { templateId, userIds, role, gridGap } = location.state || {};

    const [template, setTemplate] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `ID_Cards_${role || 'Export'}`,
    });

    useEffect(() => {
        if (!templateId || !userIds || !role) {
            navigate(-1);
            return;
        }

        const fetchData = async () => {
            try {
                const userEndpoint = role === 'Student' ? '/api/students/bulk-fetch' : '/api/staff/bulk-fetch';

                const [tempRes, userRes] = await Promise.all([
                    api.get(`/api/admin-section/id-cards/${templateId}`),
                    api.post(userEndpoint, { ids: userIds })
                ]);
                setTemplate(tempRes.data);
                setUsers(userRes.data);
            } catch (error) {
                console.error('Error fetching print data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [templateId, userIds, role, navigate]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" strokeWidth={3} />
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Preparing ID Cards...</p>
            </div>
        );
    }

    if (!template) return null;

    return (
        <div className="space-y-8 pb-20">
            {/* Control Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-[30px] border border-slate-100 shadow-snow no-print">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-primary transition-all active:scale-95"
                    >
                        <ArrowLeft size={20} strokeWidth={4} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-slate-800 uppercase italic tracking-tight leading-tight">Print Preview</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{users.length} Cards Selected</p>
                    </div>
                </div>

                <Button
                    onClick={handlePrint}
                    className="bg-primary hover:bg-primary-hover text-white rounded-2xl px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] flex items-center space-x-3 shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95"
                >
                    <Printer size={18} strokeWidth={3} />
                    <span className="italic underline decoration-white/30 decoration-2 underline-offset-4">PRINT CARDS</span>
                </Button>
            </div>

            {/* Printable Area */}
            <div className="bg-slate-50/50 p-8 rounded-[40px] border border-dashed border-slate-200 min-h-[80vh] flex justify-center overflow-x-auto">
                <div
                    ref={printRef}
                    className="bg-white p-4"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(auto-fill, ${template.pageLayoutWidth}mm)`,
                        gap: `${gridGap || 20}px`,
                        padding: '10mm',
                        width: 'fit-content',
                        justifyContent: 'center'
                    }}
                >
                    {users.map((user) => (
                        <IDCardItem key={user._id} user={user} template={template} role={role} />
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; margin: 0 !important; padding: 0 !important; }
                    .bg-slate-50\\/50 { background: transparent !important; }
                    .border-dashed { border: none !important; }
                    .p-8 { padding: 0 !important; }
                    .shadow-2xl { shadow: none !important; }
                }
            ` }} />
        </div>
    );
};

const IDCardItem = ({ user, template, role }) => {
    // Dynamic data mapping
    const getField = (field) => {
        if (field === 'name') return `${user.firstName || ''} ${user.lastName || user.name || ''}`.trim();
        if (field === 'id') return user.admissionNo || user.staffId || user.admissionNumber;
        if (field === 'admissionNo') return user.admissionNo || user.admissionNumber;
        if (field === 'class') return user.class?.name || 'N/A';
        if (field === 'section') return user.section || 'N/A';
        if (field === 'rollNo') return user.roll || 'N/A';
        if (field === 'fatherName') return user.fatherName || 'N/A';
        if (field === 'dob') return user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A';
        if (field === 'bloodGroup') return user.bloodGroup || 'N/A';
        if (field === 'phone') return user.phone || user.guardianPhone || 'N/A';
        if (field === 'email') return user.email || 'N/A';
        if (field === 'address') return user.currentAddress || user.permanentAddress || 'N/A';
        if (field === 'department') return user.department || 'N/A';
        if (field === 'designation') return user.designation || 'N/A';
        return user[field] || 'N/A';
    };

    const isHorizontal = template.adminLayout === 'Horizontal';
    const baseUrl = 'http://localhost:5000';

    const getFullUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const normalized = path.replace(/\\/g, '/');
        const sep = normalized.startsWith('/') ? '' : '/';
        return `${baseUrl}${sep}${normalized}`;
    };

    const logoUrl = getFullUrl(template.schoolLogo);
    const signatureUrl = getFullUrl(template.signature);
    const backgroundUrl = getFullUrl(template.backgroundImage);
    const photoUrl = user.photo || user.profilePhoto || user.profileImage;
    const finalPhotoUrl = photoUrl ? getFullUrl(photoUrl) : (role === 'Student' ? 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' : 'https://cdn-icons-png.flaticon.com/512/3135/3135823.png');

    const photoStyles = {
        width: `${template.userPhotoSizeWidth || 21}mm`,
        height: `${template.userPhotoSizeHeight || 21}mm`,
        borderRadius: template.userPhotoStyle === 'Circle' ? '50%' : template.userPhotoStyle === 'Rounded' ? '4mm' : '0'
    };

    const spacing = {
        top: parseFloat(template.layoutSpacingTop) || 0,
        bottom: parseFloat(template.layoutSpacingBottom) || 0,
        left: parseFloat(template.layoutSpacingLeft) || 0,
        right: parseFloat(template.layoutSpacingRight) || 0
    };

    return (
        <div
            className="id-card-item relative overflow-hidden shadow-sm"
            style={{
                width: `${template.pageLayoutWidth}mm`,
                height: `${template.pageLayoutHeight}mm`,
                backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'none',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundColor: '#fff',
                fontFamily: "Inter, 'Plus Jakarta Sans', sans-serif",
                pageBreakInside: 'avoid'
            }}
        >
            <div
                className="flex flex-col h-full relative z-10"
                style={{
                    paddingTop: `${spacing.top}mm`,
                    paddingBottom: `${spacing.bottom}mm`,
                    paddingLeft: `${spacing.left}mm`,
                    paddingRight: `${spacing.right}mm`
                }}
            >
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                        {logoUrl && (
                            <div className="bg-white/90 p-0.5 rounded shadow-sm border border-slate-100">
                                <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
                            </div>
                        )}
                        <div className="flex flex-col">
                            <h4 className="text-[10px] font-black uppercase tracking-tight text-slate-800 leading-tight max-w-[140px]">
                                {template.title || 'SCHOOL NAME'}
                            </h4>
                        </div>
                    </div>
                </div>

                <div className={`flex ${isHorizontal ? 'flex-row items-center space-x-4' : 'flex-col items-center space-y-3'} flex-grow`}>
                    {template.showPhoto && (
                        <div
                            className="flex-shrink-0 border-2 border-slate-100 p-[0.2mm] bg-white shadow-sm"
                            style={{ borderRadius: photoStyles.borderRadius }}
                        >
                            <img
                                src={finalPhotoUrl}
                                alt="Profile"
                                className="object-cover"
                                style={photoStyles}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = role === 'Student' ? 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' : 'https://cdn-icons-png.flaticon.com/512/3135/3135823.png'
                                }}
                            />
                        </div>
                    )}

                    <div className={`flex-grow ${isHorizontal ? 'text-left' : 'text-center'} space-y-0.5 min-w-0`}>
                        {template.showName && (
                            <h5 className="text-[11px] font-black uppercase text-[#1C1C1C] leading-none mb-1 tracking-tight truncate">
                                {getField('name')}
                            </h5>
                        )}

                        <div className="grid grid-cols-1 gap-[1px]">
                            {template.showAdmissionNo && (
                                <div className="flex items-center space-x-1 leading-none">
                                    <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">ID:</span>
                                    <span className="text-[9px] font-black text-slate-700 tracking-tight">{getField('id')}</span>
                                </div>
                            )}

                            {role === 'Student' && template.showClass && (
                                <div className="flex items-center space-x-1 leading-none">
                                    <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">CLASS:</span>
                                    <span className="text-[9px] font-black text-purple-600 tracking-tight">{getField('class')}</span>
                                </div>
                            )}

                            {template.showPhone && (
                                <div className="flex items-center space-x-1 leading-none">
                                    <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">PH:</span>
                                    <span className="text-[9px] font-bold text-slate-600 tracking-tighter">{getField('phone')}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-auto flex justify-between items-end min-h-[10mm]">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-primary/40 italic uppercase tracking-widest">ID CARD</span>
                    </div>

                    {template.showSignature && signatureUrl && (
                        <div className="text-center min-w-[25mm]">
                            <img src={signatureUrl} alt="Signature" className="h-4 w-auto object-contain mx-auto" />
                            <p className="text-[5px] font-black text-slate-400 uppercase tracking-widest mt-0.5 border-t border-slate-100 pt-0.5">Authorised Signatory</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IDCardBulkPrint;
