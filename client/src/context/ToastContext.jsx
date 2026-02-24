import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto dismiss after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center space-y-3 w-full max-w-sm px-4">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`
                            flex items-center space-x-3 w-full p-4 rounded-2xl shadow-snow-lg border animate-in slide-in-from-bottom-5 duration-300
                            ${toast.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
                                toast.type === 'error' ? 'bg-red-50 border-red-100 text-red-800' :
                                    'bg-indigo-50 border-indigo-100 text-indigo-800'}
                        `}
                    >
                        <div className={`p-2 rounded-xl bg-white shadow-sm`}>
                            {toast.type === 'success' && <CheckCircle size={18} className="text-emerald-500" />}
                            {toast.type === 'error' && <XCircle size={18} className="text-red-500" />}
                            {toast.type === 'info' && <Info size={18} className="text-indigo-500" />}
                        </div>
                        <p className="flex-1 text-sm font-bold tracking-tight">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                        >
                            <X size={16} className="opacity-40" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
