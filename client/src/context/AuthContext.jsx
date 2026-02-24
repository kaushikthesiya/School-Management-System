import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    console.log('AuthProvider rendering...');
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('user');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    });
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const { data } = await api.post('/api/auth/login', { email, password });
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return { success: true, user: data };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
