import React, { useMemo, useState } from 'react';
import { AuthCredentials, SignupData } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import './AuthForm.css';

type Mode = 'login' | 'signup';

const initialCredentials: AuthCredentials = { email: '', password: '' };

const AuthForm: React.FC = () => {
    const { login, signup, initializing } = useAuth();
    const [mode, setMode] = useState<Mode>('signup');
    const [name, setName] = useState<string>('');
    const [form, setForm] = useState<AuthCredentials>(initialCredentials);
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const passwordStrength = useMemo(() => {
        const p = form.password || '';
        let score = 0;
        if (p.length >= 8) score++;
        if (/[A-Z]/.test(p)) score++;
        if (/[a-z]/.test(p)) score++;
        if (/[0-9]/.test(p)) score++;
        if (/[^A-Za-z0-9]/.test(p)) score++;
        return Math.min(score, 4);
    }, [form.password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            if (mode === 'login') {
                await login(form);
            } else {
                if (form.password !== confirmPassword) {
                    setError('Passwords do not match');
                    return;
                }
                const data: SignupData = { ...form, name };
                await signup(data);
            }
        } catch (err) {
            setError('Authentication failed. Please try again.');
            console.error('Auth error:', err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="auth-section">
            <div className="auth-header">
                <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
                <p>Sign {mode === 'login' ? 'in' : 'up'} to manage your tasks</p>
            </div>
            <div className="auth-card">
                <div className="auth-tabs">
                    <button className={`auth-tab ${mode === 'signup' ? 'active' : ''}`} type="button" onClick={() => setMode('signup')}>Sign up</button>
                    <button className={`auth-tab ${mode === 'login' ? 'active' : ''}`} type="button" onClick={() => setMode('login')}>Sign in</button>
                </div>
                <form className="auth-form" onSubmit={handleSubmit}>
                    {mode === 'signup' && (
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input id="name" className="input" type="text" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                    )}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            className="input"
                            type="email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group password-field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            className="input"
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required
                        />
                        <button type="button" className="toggle-visibility" onClick={() => setShowPassword(v => !v)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                        {mode === 'signup' && (
                            <div className="password-meter">
                                <span style={{ width: `${(passwordStrength + 1) * 20}%` }} />
                            </div>
                        )}
                    </div>
                    {mode === 'signup' && (
                        <div className="input-group">
                            <label htmlFor="confirm">Confirm Password</label>
                            <input
                                id="confirm"
                                className="input"
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {error && <div className="error-text">{error}</div>}

                    <div className="auth-actions">
                        <button className="btn btn-primary" type="submit" disabled={submitting || initializing}>
                            {submitting ? (mode === 'login' ? 'Signing in...' : 'Creating account...') : mode === 'login' ? 'Sign in' : 'Sign up'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                            disabled={submitting}
                        >
                            {mode === 'login' ? 'Create account' : 'Have an account? Sign in'}
                        </button>
                    </div>
                    <div className="helper">By continuing, you agree to our Terms and Privacy Policy.</div>
                </form>
            </div>
        </section>
    );
};

export default AuthForm;


