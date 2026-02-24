import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Button, Input, Card } from '../../components/SnowUI';
import { Plus, Check, ShieldCheck } from 'lucide-react';

const Plans = () => {
    const [plans, setPlans] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newPlan, setNewPlan] = useState({
        name: '',
        price: '',
        studentLimit: '',
        modules: [],
        description: '',
    });

    const availableModules = [
        'Student Management', 'Attendance', 'Fees', 'Examination',
        'Payroll', 'Inventory', 'Library', 'Transport'
    ];

    const fetchPlans = async () => {
        try {
            const { data } = await api.get('/api/plans');
            setPlans(data);
        } catch (error) {
            console.error('Error fetching plans');
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleToggleModule = (mod) => {
        setNewPlan(prev => ({
            ...prev,
            modules: prev.modules.includes(mod)
                ? prev.modules.filter(m => m !== mod)
                : [...prev.modules, mod]
        }));
    };

    const handleAddPlan = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/plans', newPlan);
            setShowAddModal(false);
            fetchPlans();
        } catch (error) {
            alert('Error creating plan');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Subscription Plans</h1>
                    <p className="text-slate-500">Configure plans and pricing for schools.</p>
                </div>
                <Button onClick={() => setShowAddModal(true)}>
                    <Plus size={20} />
                    <span>Create New Plan</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <Card key={plan._id} className="relative hover:border-slate-300 transition-all border-2 border-transparent">
                        {plan.isPopular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Most Popular
                            </div>
                        )}
                        <div className="text-center space-y-2 mb-6">
                            <h3 className="text-lg font-bold text-slate-800">{plan.name}</h3>
                            <div className="flex items-end justify-center">
                                <span className="text-3xl font-extrabold text-primary">₹{plan.price}</span>
                                <span className="text-slate-400 text-sm ml-1 mb-1">/month</span>
                            </div>
                            <p className="text-sm text-slate-500">{plan.description}</p>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                                <Check size={16} className="text-green-500" />
                                <span>Up to {plan.studentLimit} Students</span>
                            </div>
                            {plan.modules.slice(0, 4).map(mod => (
                                <div key={mod} className="flex items-center space-x-2 text-sm text-slate-600">
                                    <Check size={16} className="text-green-500" />
                                    <span>{mod}</span>
                                </div>
                            ))}
                            {plan.modules.length > 4 && (
                                <p className="text-xs text-slate-400 pl-6">+ {plan.modules.length - 4} more modules</p>
                            )}
                        </div>

                        <Button variant="outline" className="w-full">Edit Plan</Button>
                    </Card>
                ))}
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <Card className="w-full max-w-xl animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-bold mb-4">Create Subscription Plan</h2>
                        <form onSubmit={handleAddPlan} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Plan Name" value={newPlan.name} onChange={e => setNewPlan({ ...newPlan, name: e.target.value })} required />
                                <Input label="Price (per month)" type="number" value={newPlan.price} onChange={e => setNewPlan({ ...newPlan, price: e.target.value })} required />
                            </div>
                            <Input label="Student Limit" type="number" value={newPlan.studentLimit} onChange={e => setNewPlan({ ...newPlan, studentLimit: e.target.value })} required />

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-600">Included Modules</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {availableModules.map(mod => (
                                        <button
                                            key={mod}
                                            type="button"
                                            onClick={() => handleToggleModule(mod)}
                                            className={`text-xs p-2 rounded-lg border text-left flex items-center justify-between transition-all ${newPlan.modules.includes(mod)
                                                    ? 'bg-slate-100 border-primary text-primary font-medium'
                                                    : 'bg-white border-slate-200 text-slate-500'
                                                }`}
                                        >
                                            {mod}
                                            {newPlan.modules.includes(mod) && <ShieldCheck size={14} />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex space-x-3 pt-6">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>Cancel</Button>
                                <Button type="submit" className="flex-1">Save Plan</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Plans;
