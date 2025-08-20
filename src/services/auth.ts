import { AuthCredentials, AuthState, AuthUser, SignupData } from '../types';

const AUTH_STORAGE_KEY = 'auth_state';

const generateMockToken = (userId: number) => `mock-token-${userId}-${Date.now()}`;

const inferNameFromEmail = (email: string): string => {
    const [namePart] = email.split('@');
    return namePart
        .replace(/\./g, ' ')
        .replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
};

export const getStoredAuth = (): AuthState => {
    try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);
        return raw ? (JSON.parse(raw) as AuthState) : { user: null, token: null };
    } catch (error) {
        console.error('Error reading auth from localStorage:', error);
        return { user: null, token: null };
    }
};

export const setStoredAuth = (auth: AuthState) => {
    try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    } catch (error) {
        console.error('Error saving auth to localStorage:', error);
    }
};

export async function login(credentials: AuthCredentials): Promise<AuthState> {
    // Mock: accept any email/password and return a user
    const existing = getStoredAuth();
    const user: AuthUser = existing.user?.email === credentials.email
        ? existing.user
        : {
            id: existing.user?.id ?? Math.floor(Math.random() * 10000) + 2,
            name: inferNameFromEmail(credentials.email),
            email: credentials.email,
        };
    const token = generateMockToken(user.id);
    const state: AuthState = { user, token };
    setStoredAuth(state);
    return new Promise(resolve => setTimeout(() => resolve(state), 400));
}

export async function signup(data: SignupData): Promise<AuthState> {
    // Mock: create a new user and return auth state
    const user: AuthUser = {
        id: Math.floor(Math.random() * 10000) + 2,
        name: data.name.trim() || inferNameFromEmail(data.email),
        email: data.email,
    };
    const token = generateMockToken(user.id);
    const state: AuthState = { user, token };
    setStoredAuth(state);
    return new Promise(resolve => setTimeout(() => resolve(state), 500));
}

export async function logout(): Promise<void> {
    setStoredAuth({ user: null, token: null });
    return Promise.resolve();
}


