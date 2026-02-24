import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Card, Button, Input } from '../../components/SnowUI';
import {
    Search,
    ChevronDown,
    CreditCard,
    ArrowLeft,
    Filter,
    ArrowUpDown,
    CheckCircle2,
    Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GenerateIDCard = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [idCards, setIdCards] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedIDCard, setSelectedIDCard] = useState('');
    const [gridGap, setGridGap] = useState('');

    const [results, setResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const idRes = await api.get('/api/admin-section/id-cards');
                setIdCards(Array.isArray(idRes.data) ? idRes.data : []);
                setRoles(['Student', 'Staff', 'Admin']);
            } catch (error) {
                console.error('Error fetching criteria data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = async () => {
        if (!selectedRole || !selectedIDCard) {
            alert('Please select Role and ID Card');
            return;
        }
        setSearching(true);
        try {
            const endpoint = selectedRole === 'Student' ? '/api/admin-section/students/search' : '/api/admin-section/staff/search';
            const { data } = await api.get(endpoint, {
                params: { role: selectedRole }
            });
            const resultsData = Array.isArray(data) ? data : [];
            setResults(resultsData);
            // Default select all
            setSelectedUsers(resultsData.map(u => u._id));
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setSearching(false);
        }
    };

    const toggleUser = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const toggleAll = () => {
        if (selectedUsers.length === results.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(results.map(u => u._id));
        }
    };

    const handleGenerate = () => {
        if (selectedUsers.length === 0) {
            alert('Please select at least one candidate');
            return;
        }
        // Navigate with basic info, we'll fetch full template in the bulk print page
        const schoolSlug = window.location.pathname.split('/')[1];
        navigate(`/${schoolSlug}/id-card-bulk-print`, {
            state: {
                templateId: selectedIDCard,
                userIds: selectedUsers,
                role: selectedRole,
                gridGap: gridGap || 20
            }
        });
    };

    const Label = ({ children, required }) => (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block ml-1 text-shadow-sm">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );

    const SelectField = ({ value, onChange, options, placeholder, required }) => (
        <div className="relative group/select">
            <select
                value={value}
                onChange={onChange}
                required={required}
                className="w-full bg-slate-50/50 border-b-2 border-slate-100 py-4 px-2 text-xs font-black text-slate-600 outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer uppercase tracking-wider"
            >
                <option value="">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt._id || opt} value={opt._id || opt}>{opt.title || opt.name || opt}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within/select:text-primary group-focus-within/select:rotate-180 transition-all" size={16} strokeWidth={3} />
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12">

            {/* Page Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-[30px] shadow-snow border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
                <div className="flex items-center space-x-6 relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 rounded-2xl bg-white text-slate-400 hover:text-primary transition-all border border-slate-100 shadow-sm active:scale-95 group"
                    >
                        <ArrowLeft size={20} strokeWidth={4} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase leading-none">Generate Id Card</h1>
                        <div className="flex space-x-2 text-[10px] font-black text-slate-300 mt-2 uppercase tracking-[0.2em]">
                            <span>Dashboard</span>
                            <span className="text-slate-100">|</span>
                            <span>Student Info</span>
                            <span className="text-slate-100">|</span>
                            <span className="text-primary italic">Generate Id Card</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Select Criteria Card */}
            <Card className="p-12 border-none shadow-snow-lg bg-white rounded-[40px] overflow-hidden relative group">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-20 bg-primary rounded-l-3xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all group-hover:w-10">
                    <div className="w-4 h-4 rounded-full border-2 border-white/40 animate-pulse"></div>
                </div>

                <h3 className="text-sm font-black text-slate-700 uppercase tracking-[0.3em] mb-12 flex items-center space-x-4 relative">
                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                    <span>Select Criteria</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative pr-12">
                    <div className="space-y-1">
                        <Label required>Role</Label>
                        <SelectField
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            options={roles}
                            placeholder="Select Role *"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <Label required>Id Card</Label>
                        <SelectField
                            value={selectedIDCard}
                            onChange={(e) => setSelectedIDCard(e.target.value)}
                            options={idCards}
                            placeholder="Select Id Card *"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <Label required>Grid Gap (PX)</Label>
                        <Input
                            className="bg-slate-50/50 border-0 border-b-2 border-slate-100 rounded-none text-xs font-black py-4 px-2 focus:border-primary focus:bg-white transition-all uppercase tracking-wider"
                            placeholder="Enter gap e.g. 20"
                            value={gridGap}
                            onChange={(e) => setGridGap(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-12 pr-12 relative">
                    <Button
                        onClick={handleSearch}
                        disabled={searching}
                        className="bg-primary hover:bg-primary-hover text-white !rounded-2xl px-12 py-4.5 text-[11px] font-black uppercase tracking-[0.3em] flex items-center space-x-4 shadow-2xl shadow-primary/30 active:scale-95 transition-all group/btn overflow-hidden relative"
                    >
                        {searching ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Search size={22} strokeWidth={4} className="group-hover/btn:rotate-12 transition-transform" />
                        )}
                        <span className="italic underline decoration-white/20 underline-offset-8 decoration-2">{searching ? 'Searching...' : 'Search'}</span>
                    </Button>
                </div>
            </Card>

            {/* Results Section */}
            {results.length > 0 && (
                <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-3xl animate-in slide-in-from-bottom-8 duration-500 overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-[#7c32ff]">
                                <Users size={18} strokeWidth={3} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Candidate List</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 italic">Select users to generate cards</p>
                            </div>
                        </div>

                        <Button
                            onClick={handleGenerate}
                            className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] flex items-center space-x-3 shadow-2xl shadow-purple-500/20 active:scale-95 transition-all group"
                        >
                            <CreditCard size={18} strokeWidth={3} />
                            <span className="italic underline decoration-white/30 decoration-2 underline-offset-4">GENERATE CARDS</span>
                        </Button>
                    </div>

                    <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-50">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 uppercase tracking-widest">
                                    <th className="px-6 py-5 text-[10px] font-black text-slate-400 border-b border-slate-50 w-16">
                                        <div className="flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 accent-[#7c32ff] rounded cursor-pointer transition-all"
                                                checked={results.length > 0 && selectedUsers.length === results.length}
                                                onChange={toggleAll}
                                            />
                                        </div>
                                    </th>
                                    {['Admission No', 'Full Name', 'Class / Section', 'Father Name', 'Gender'].map((header, idx) => (
                                        <th key={idx} className="px-6 py-5 text-[10px] font-black text-slate-400 border-b border-slate-50">
                                            <div className="flex items-center space-x-2">
                                                <span>{header}</span>
                                                <ArrowUpDown size={10} className="text-slate-300" />
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {results.map((item) => (
                                    <tr key={item._id} className="hover:bg-slate-50/30 transition-all group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center text-xs">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 accent-[#7c32ff] rounded cursor-pointer transition-all"
                                                    checked={selectedUsers.includes(item._id)}
                                                    onChange={() => toggleUser(item._id)}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-xs font-black text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl w-fit">{item.admissionNo}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-xs font-black text-slate-700 italic uppercase underline decoration-[#7c32ff]/10 decoration-2 underline-offset-4">{item.name}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-2">
                                                {selectedRole === 'Student' ? (
                                                    <>
                                                        <span className="text-xs font-bold text-slate-500 uppercase">{item.class?.name}</span>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                                        <span className="text-xs font-black text-[#7c32ff] uppercase italic tracking-widest">{item.section}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="text-xs font-bold text-slate-500 uppercase">{item.department}</span>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                                        <span className="text-xs font-black text-[#7c32ff] uppercase italic tracking-widest">{item.designation}</span>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-xs font-bold text-slate-500 uppercase italic tracking-tight">{item.fatherName}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 rounded-full ${item.gender === 'Male' ? 'bg-blue-400' : 'bg-pink-400'}`} />
                                                <span className="text-xs font-bold text-slate-500 uppercase">{item.gender}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 flex justify-between items-center px-4">
                        <p className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest leading-loose">
                            Showing {results.length} results based on your selection. <br />
                            Templates are auto-filled using system records.
                        </p>
                        <div className="text-[10px] font-black text-[#7c32ff] uppercase tracking-widest bg-purple-50 px-4 py-2 rounded-full border border-purple-100 flex items-center space-x-2">
                            <CheckCircle2 size={12} />
                            <span>All Records Validated</span>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default GenerateIDCard;
