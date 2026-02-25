import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, Calendar, ShoppingCart } from 'lucide-react';
import { Card, Button } from '../../../components/SnowUI';
import api from '../../../api/api';
import { useToast } from '../../../context/ToastContext';

const Input = ({ label, name, value, onChange, placeholder, required, type = "text", readonly = false }) => (
    <div className="space-y-2 group">
        {label && (
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readonly}
            className={`w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 h-[46px] ${readonly ? 'bg-slate-50 cursor-not-allowed' : ''}`}
        />
    </div>
);

const Select = ({ label, name, value, onChange, options, required, placeholder, className = "" }) => (
    <div className={`space-y-2 group ${className}`}>
        {label && (
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all appearance-none shadow-sm h-[46px]"
            >
                <option value="">{placeholder || 'Select Option'}</option>
                {options.map(opt => (
                    <option key={opt._id || opt} value={opt._id || opt}>{opt.name || opt}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-primary transition-colors" size={14} />
        </div>
    </div>
);

const Textarea = ({ label, name, value, onChange, placeholder }) => (
    <div className="space-y-2 group">
        {label && (
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label}
            </label>
        )}
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-slate-300 min-h-[80px] resize-none"
        />
    </div>
);

const ItemSell = () => {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [allItems, setAllItems] = useState([]);

    // Header Data
    const [headerData, setHeaderData] = useState({
        incomeHead: '',
        paymentMethod: '',
        sellTo: '',
        referenceNo: '',
        sellDate: new Date().toISOString().split('T')[0],
        description: ''
    });

    // Rows Data
    const [rows, setRows] = useState([
        { itemId: '', sellPrice: '', quantity: '', subTotal: 0 }
    ]);

    // Totals
    const [totalPaid, setTotalPaid] = useState(0);
    const [isFullPaid, setIsFullPaid] = useState(false);

    const grandTotal = rows.reduce((acc, row) => acc + (parseFloat(row.subTotal) || 0), 0);
    const totalDue = Math.max(0, grandTotal - totalPaid);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/api/inventory/item');
                setAllItems(res.data);
            } catch (error) {
                showToast('Error fetching items', 'error');
            }
        };
        fetchData();
    }, []);

    const handleHeaderChange = (e) => {
        const { name, value } = e.target;
        setHeaderData(prev => ({ ...prev, [name]: value }));
    };

    const handleRowChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;

        if (field === 'sellPrice' || field === 'quantity') {
            const price = parseFloat(newRows[index].sellPrice) || 0;
            const qty = parseFloat(newRows[index].quantity) || 0;
            newRows[index].subTotal = (price * qty).toFixed(2);
        }

        setRows(newRows);
    };

    const addRow = () => {
        setRows([...rows, { itemId: '', sellPrice: '', quantity: '', subTotal: 0 }]);
    };

    const removeRow = (index) => {
        if (rows.length > 1) {
            setRows(rows.filter((_, i) => i !== index));
        }
    };

    const handleSell = async () => {
        if (!headerData.incomeHead || !headerData.paymentMethod || rows.some(r => !r.itemId || !r.quantity || !r.sellPrice)) {
            return showToast('Please fill all required fields', 'warning');
        }

        setLoading(true);
        try {
            for (const row of rows) {
                await api.post('/api/inventory/transaction', {
                    item: row.itemId,
                    quantity: row.quantity,
                    price: row.sellPrice,
                    referenceNo: headerData.referenceNo,
                    date: headerData.sellDate,
                    note: headerData.description,
                    role: headerData.sellTo,
                    transactionHead: headerData.incomeHead,
                    paymentMethod: headerData.paymentMethod,
                    transactionType: 'Sell'
                });
            }

            showToast('Items sold successfully', 'success');
            setRows([{ itemId: '', sellPrice: '', quantity: '', subTotal: 0 }]);
            setTotalPaid(0);
            setIsFullPaid(false);
        } catch (error) {
            showToast('Error recording sale', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isFullPaid) {
            setTotalPaid(grandTotal);
        }
    }, [isFullPaid, grandTotal]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20 px-4 relative">
            {/* Floating Cart Icon */}
            <div className="absolute right-0 top-0 bg-[#7c32ff] text-white p-2 rounded-lg shadow-lg shadow-purple-500/30 cursor-pointer z-10 hover:scale-110 transition-transform">
                <ShoppingCart size={18} strokeWidth={2.5} />
            </div>

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase">Item Sell</h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
                    <span>|</span>
                    <span className="text-slate-500">Item Sell</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Section: Sell Details */}
                <Card className="lg:col-span-1 p-8 border-none shadow-snow-lg bg-white rounded-[32px] h-fit">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-8 border-l-4 border-primary pl-4">
                        Sell Details
                    </h3>
                    <div className="space-y-6">
                        <Select
                            label="INCOME HEAD"
                            name="incomeHead"
                            value={headerData.incomeHead}
                            onChange={handleHeaderChange}
                            options={['Retail Sale', 'Bulk Order', 'Stock Liquidation']}
                            placeholder="Income Head *"
                            required
                        />
                        <Select
                            label="PAYMENT METHOD"
                            name="paymentMethod"
                            value={headerData.paymentMethod}
                            onChange={handleHeaderChange}
                            options={['Cash', 'Bank Transfer', 'Cheque', 'Credit Card']}
                            placeholder="Payment Method *"
                            required
                        />
                        <Select
                            label="SELL TO"
                            name="sellTo"
                            value={headerData.sellTo}
                            onChange={handleHeaderChange}
                            options={['Student', 'Guardian', 'Staff', 'General Buyer']}
                            placeholder="Sell To *"
                            required
                        />
                        <Input
                            label="REFERENCE NO"
                            name="referenceNo"
                            value={headerData.referenceNo}
                            onChange={handleHeaderChange}
                            placeholder="Reference No"
                        />
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                SELL DATE *
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="sellDate"
                                    value={headerData.sellDate}
                                    onChange={handleHeaderChange}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-sm h-[46px]"
                                />
                                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-primary transition-colors" size={14} />
                            </div>
                        </div>
                        <Textarea
                            label="DESCRIPTION"
                            name="description"
                            value={headerData.description}
                            onChange={handleHeaderChange}
                            placeholder="Description"
                        />
                    </div>
                </Card>

                {/* Right Section: Item Sell Table */}
                <Card className="lg:col-span-2 p-8 border-none shadow-snow-lg bg-white rounded-[32px] flex flex-col min-h-[600px]">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest border-l-4 border-primary pl-4">
                            Item Sell
                        </h3>
                        <Button
                            onClick={addRow}
                            className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 shadow-xl shadow-purple-500/20 active:scale-95 transition-all"
                        >
                            <Plus size={14} strokeWidth={3} />
                            <span>ADD</span>
                        </Button>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-4">
                            <thead>
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="text-left px-4">PRODUCT NAME *</th>
                                    <th className="text-left px-4">SELL PRICE *</th>
                                    <th className="text-left px-4">QUANTITY *</th>
                                    <th className="text-left px-4">SUB TOTAL</th>
                                    <th className="px-4">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, idx) => (
                                    <tr key={idx} className="bg-slate-50/30 rounded-2xl">
                                        <td className="p-2 min-w-[200px]">
                                            <Select
                                                name="itemId"
                                                value={row.itemId}
                                                onChange={(e) => handleRowChange(idx, 'itemId', e.target.value)}
                                                options={allItems}
                                                placeholder="Select Item *"
                                            />
                                        </td>
                                        <td className="p-2 w-32">
                                            <input
                                                type="number"
                                                value={row.sellPrice}
                                                onChange={(e) => handleRowChange(idx, 'sellPrice', e.target.value)}
                                                placeholder="0.00"
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all h-[46px]"
                                            />
                                        </td>
                                        <td className="p-2 w-32">
                                            <input
                                                type="number"
                                                value={row.quantity}
                                                onChange={(e) => handleRowChange(idx, 'quantity', e.target.value)}
                                                placeholder="0"
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all h-[46px]"
                                            />
                                        </td>
                                        <td className="p-2 w-40">
                                            <input
                                                type="text"
                                                value={row.subTotal}
                                                readOnly
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-black text-slate-600 outline-none h-[46px]"
                                            />
                                        </td>
                                        <td className="p-2 text-center">
                                            <button
                                                onClick={() => removeRow(idx)}
                                                className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors active:scale-90"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex flex-col items-end space-y-4 mt-8 pt-8 border-t border-slate-50 px-4">
                            <div className="flex items-center space-x-12 w-full max-w-md">
                                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Total</span>
                                <div className="flex-1 flex gap-4">
                                    <input type="text" readOnly value="0.00" className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-black text-slate-600 h-[46px]" />
                                    <input type="text" readOnly value={grandTotal.toFixed(2)} className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-black text-slate-600 h-[46px]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-10 px-4">
                        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setIsFullPaid(!isFullPaid)}>
                            <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center transition-all ${isFullPaid ? 'border-primary bg-primary shadow-lg shadow-primary/20' : 'border-slate-200 bg-white group-hover:border-primary/50'}`}>
                                {isFullPaid && <div className="w-2 h-2 rounded-full bg-white shadow-inner" />}
                            </div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Paid</span>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 flex-1 max-w-2xl">
                            <Input
                                label="TOTAL PAID"
                                type="number"
                                value={totalPaid}
                                onChange={(e) => {
                                    setTotalPaid(parseFloat(e.target.value) || 0);
                                    setIsFullPaid(false);
                                }}
                                placeholder="0"
                            />
                            <Input
                                label="TOTAL DUE"
                                value={totalDue.toFixed(2)}
                                readonly
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center mt-12 mb-4">
                        <Button
                            onClick={handleSell}
                            disabled={loading}
                            className="bg-[#7c32ff] hover:bg-[#6b25ea] text-white rounded-2xl px-16 py-4 text-[10px] font-black uppercase tracking-widest flex items-center space-x-3 shadow-2xl shadow-purple-500/30 active:scale-95 transition-all"
                        >
                            <span>{loading ? 'PROCESSING...' : '✓ SELLS'}</span>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ItemSell;
