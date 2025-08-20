export type TaskId = number;

export interface Task {
    id: TaskId;
    title: string;
    completed: boolean;
    userId: number;
}

export type FilterType = 'all' | 'pending' | 'completed';

export interface TodoUpdates {
    title?: string;
    completed?: boolean;
}


// Auth types
export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface SignupData extends AuthCredentials {
    name: string;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
}
