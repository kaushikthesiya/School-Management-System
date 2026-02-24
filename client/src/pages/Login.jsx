import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card } from '../components/SnowUI';
import { LogIn, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);
        if (result.success) {
            if (result.user.role === 'superadmin') navigate('/superadmin');
            else navigate(`/${result.user.school_slug || 'dashboard'}`);
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-snow-50 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-transparent to-transparent">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-snow-lg border border-slate-100 mb-4 animate-bounce">
                        <GraduationCap className="text-primary" size={32} />
                    </div>
                    <h1 className="text-4xl font-extrabold text-primary tracking-tight">Scolify</h1>
                    <p className="text-slate-500">Welcome back! Please enter your details.</p>
                </div>

                <Card className="p-8 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@school.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <Button type="submit" className="w-full py-3 text-lg" disabled={loading}>
                            {loading ? 'Signing in...' : (
                                <>
                                    <span>Sign in</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </Button>
                    </form>

                </Card>

                <p className="text-center text-sm text-slate-500">
                    Don't have an account? <span className="text-primary font-semibold cursor-pointer hover:underline">Contact Support</span>
                </p>
            </div>
        </div>
    );
};

// Need to import GraduationCap in the file
import { GraduationCap } from 'lucide-react';

export default Login;
