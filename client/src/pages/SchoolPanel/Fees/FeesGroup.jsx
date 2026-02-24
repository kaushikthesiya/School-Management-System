import React, { useState } from 'react';
import { Button, Card } from '../../../components/SnowUI';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Check,
    Copy,
    FileText,
    Download,
    Printer,
    Layout,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeesGroup = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const fetchGroups = async () => {
        try {
            const { data } = await api.get('/api/fees/groups');
            setGroups(data);
        } catch (error) {
            console.error('Error fetching fee groups:', error);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/api/fees/groups', formData);
            showToast('Fee Group added successfully!');
            setFormData({ name: '', description: '' });
            fetchGroups();
        } catch (error) {
            console.error('Error adding fee group:', error);
            showToast('Error adding fee group', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this fee group?')) return;
        try {
            await api.delete(`/api/fees/groups/${id}`);
            showToast('Fee Group deleted successfully!');
            fetchGroups();
        } catch (error) {
            console.error('Error deleting fee group:', error);
            showToast('Error deleting fee group', 'error');
        }
    };

    const ActionIcon = ({ Icon }) => (
        <button className="p-2 rounded-lg text-slate-400 hover:text-[#7c32ff] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
            <Icon size={14} />
        </button>
    );

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (group.description && group.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-12 text-slate-800">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Fees Group</h1>
                    <div className="flex space-x-2 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                        <span className="hover:text-[#1C1C1C] cursor-pointer" onClick={() => navigate('/school')}>Dashboard</span>
                        <span>|</span>
                        <span>Fees</span>
                        <span>|</span>
                        <span className="text-[#1C1C1C]">Fees Group</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                {/* Add Fees Group Form */}
                <Card className="p-8 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden sticky top-24">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8">Add Fees Group</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">
                                NAME <span className="text-rose-500">*</span>
                            </label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                required
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1 italic">
                                DESCRIPTION
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#7c32ff]/10 focus:border-[#7c32ff] transition-all min-h-[140px] resize-none"
                            />
                        </div>
                        <div className="flex justify-center pt-4">
                            <Button disabled={loading} className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-10 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center space-x-2">
                                <Check size={14} strokeWidth={3} />
                                <span>{loading ? 'SAVING...' : 'SAVE'}</span>
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Fees Group List */}
                <div className="lg:col-span-3">
                    <Card className="p-10 border-none shadow-3xl shadow-slate-100 bg-white rounded-[32px] overflow-hidden relative">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Fees Group List</h3>

                            <div className="flex items-center space-x-6">
                                <div className="relative group">
                                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7c32ff] transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder="SEARCH"
                                        className="bg-transparent border-b border-slate-100 py-2 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none focus:border-[#7c32ff] transition-all w-48"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center space-x-1 border border-purple-100 rounded-2xl p-1.5 bg-purple-50/30">
                                    <ActionIcon Icon={Copy} />
                                    <ActionIcon Icon={FileText} />
                                    <ActionIcon Icon={Download} />
                                    <ActionIcon Icon={Layout} />
                                    <ActionIcon Icon={Printer} />
                                    <ActionIcon Icon={Layout} />
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-50 italic">
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1"><span>↓Name</span></div>
                                        </th>
                                        <th className="text-left py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1"><span>↓Description</span></div>
                                        </th>
                                        <th className="text-right py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1 justify-end"><span>↓Action</span></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredGroups.map((group) => (
                                        <tr key={group._id} className="group hover:bg-slate-50/50 transition-all border-b border-slate-50 last:border-0">
                                            <td className="py-5 px-6 text-[11px] font-bold text-slate-600 italic">{group.name}</td>
                                            <td className="py-5 px-6 text-[11px] font-bold text-slate-400 italic">{group.description}</td>
                                            <td className="py-5 px-6 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button className="bg-white border-2 border-purple-100 text-[#7c32ff] rounded-full px-6 py-1.5 text-[9px] font-black uppercase tracking-widest hover:bg-[#7c32ff] hover:text-white hover:border-[#7c32ff] transition-all flex items-center space-x-2 inline-flex">
                                                        <span>SELECT</span>
                                                        <ChevronDown size={12} strokeWidth={3} />
                                                    </button>
                                                    <button onClick={() => handleDelete(group._id)} className="p-2 text-slate-300 hover:text-red-500 rounded-full transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredGroups.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="py-8 text-center text-xs text-slate-400 italic font-bold">No groups found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span>Showing {filteredGroups.length} entries</span>
                            {/* Pagination would go here if implemented */}
                        </div>

                        {/* Basket Icon decorator */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-[#7c32ff] rounded-l-xl flex items-center justify-center">
                            <Layout className="text-white" size={18} />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FeesGroup;
