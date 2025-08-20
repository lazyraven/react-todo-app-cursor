import React, { useState } from 'react';
import { AuthCredentials, SignupData } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

type Mode = 'login' | 'signup';

const initialCredentials: AuthCredentials = { email: '', password: '' };

const AuthForm: React.FC = () => {
    const { login, signup, initializing } = useAuth();
    const [mode, setMode] = useState<Mode>('login');
    const [name, setName] = useState<string>('');
    const [form, setForm] = useState<AuthCredentials>(initialCredentials);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            if (mode === 'login') {
                await login(form);
            } else {
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
        <div className="auth-container">
            <div className="auth-header">
                <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
                <p>Sign {mode === 'login' ? 'in' : 'up'} to manage your tasks</p>
            </div>
            <form className="auth-form" onSubmit={handleSubmit}>
                {mode === 'signup' && (
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                )}
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        required
                    />
                </div>

                {error && <div style={{ color: '#ef4444', fontSize: 14 }}>{error}</div>}

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
            </form>
        </div>
    );
};

export default AuthForm;


