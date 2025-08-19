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

