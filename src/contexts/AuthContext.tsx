import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthCredentials, AuthState, SignupData } from '../types';
import * as authService from '../services/auth';
import todoAPI from '../services/api';

interface AuthContextValue extends AuthState {
    login: (credentials: AuthCredentials) => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    logout: () => Promise<void>;
    initializing: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>(() => authService.getStoredAuth());
    const [initializing, setInitializing] = useState<boolean>(true);

    useEffect(() => {
        // Sync API auth state whenever it changes
        todoAPI.setAuthState(state);
        authService.setStoredAuth(state);
    }, [state]);

    useEffect(() => {
        // Simulate loading stored auth
        setInitializing(false);
    }, []);

    const login = useCallback(async (credentials: AuthCredentials) => {
        const next = await authService.login(credentials);
        setState(next);
    }, []);

    const signup = useCallback(async (data: SignupData) => {
        const next = await authService.signup(data);
        setState(next);
    }, []);

    const logout = useCallback(async () => {
        await authService.logout();
        setState({ user: null, token: null });
    }, []);

    const value = useMemo<AuthContextValue>(() => ({
        ...state,
        login,
        signup,
        logout,
        initializing,
    }), [state, login, signup, logout, initializing]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
};


