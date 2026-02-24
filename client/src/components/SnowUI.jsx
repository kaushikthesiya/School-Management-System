import React from 'react';

export const Button = ({ children, className = '', variant = 'primary', ...props }) => {
    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-hover shadow-snow shadow-primary/20',
        outline: 'bg-white border border-slate-200 text-navy-700 hover:bg-slate-50',
        ghost: 'bg-transparent text-secondary hover:bg-snow-100 hover:text-primary',
    };

    return (
        <button
            className={`px-6 py-3 rounded-2xl transition-all duration-200 font-bold active:scale-95 flex items-center justify-center space-x-2 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export const Input = ({ label, error, className = '', ...props }) => {
    return (
        <div className="space-y-2 w-full">
            {label && <label className="text-sm font-bold text-navy-700 ml-1">{label}</label>}
            <input
                className={`w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-secondary text-navy-700 ${error ? 'border-red-400' : ''} ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-red-500 font-medium ml-1">{error}</p>}
        </div>
    );
};

export const Card = ({ children, className = '', highlight = false, ...props }) => {
    return (
        <div
            className={`bg-white rounded-[30px] shadow-snow p-6 transition-all duration-300 ${highlight ? 'hover:shadow-snow-lg translate-y-[-4px]' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export const Select = ({ label, options = [], value, onChange, className = '', ...props }) => {
    return (
        <div className="space-y-2 w-full">
            {label && <label className="text-sm font-bold text-navy-700 ml-1">{label}</label>}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-navy-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%23A3AED0%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_1.25rem_center] bg-no-repeat ${className}`}
                {...props}
            >
                {options.map((opt, i) => {
                    const val = typeof opt === 'object' ? opt.value : opt;
                    const text = typeof opt === 'object' ? opt.label : opt;
                    return <option key={val || i} value={val}>{text}</option>;
                })}
            </select>
        </div>
    );
};

export const Badge = ({ children, variant = 'primary', className = '' }) => {
    const variants = {
        primary: 'bg-primary/10 text-primary',
        success: 'bg-emerald-50 text-emerald-500',
        warning: 'bg-amber-50 text-amber-500',
        error: 'bg-red-50 text-red-500',
        neutral: 'bg-slate-50 text-slate-500',
    };

    return (
        <span className={`px-4 py-1.5 rounded-xl text-xs font-black italic uppercase tracking-wider ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export const Modal = ({ isOpen, onClose, title, children, className = '' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className={`w-full max-w-4xl bg-white rounded-[40px] shadow-3xl shadow-navy-900/10 relative overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh] ${className}`}
            >
                {/* Header */}
                <div className="bg-primary px-8 py-6 flex justify-between items-center shadow-lg shadow-primary/20 shrink-0">
                    <h2 className="text-xl font-black text-white italic uppercase tracking-tight">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all group active:scale-95"
                    >
                        <span className="text-2xl font-black leading-none group-hover:rotate-90 transition-transform">&times;</span>
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
};
