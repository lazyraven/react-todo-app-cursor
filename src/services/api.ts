import { Task, TodoUpdates, AuthState } from '../types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const mockTasks: Task[] = [
    { id: 1, title: 'Complete React project', completed: false, userId: 1 },
    { id: 2, title: 'Learn TypeScript', completed: true, userId: 1 },
    { id: 3, title: 'Build portfolio website', completed: false, userId: 1 },
    { id: 4, title: 'Study algorithms', completed: false, userId: 1 },
    { id: 5, title: 'Practice coding challenges', completed: true, userId: 1 },
];

const STORAGE_KEY = 'todo_tasks';
const AUTH_STORAGE_KEY = 'auth_state';

const getTasksFromStorage = (): Task[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? (JSON.parse(stored) as Task[]) : mockTasks;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return mockTasks;
    }
};

const saveTasksToStorage = (tasks: Task[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

class TodoAPI {
    private tasks: Task[];
    private nextId: number;
    private auth: AuthState;

    constructor() {
        this.tasks = getTasksFromStorage();
        this.nextId = Math.max(...this.tasks.map(task => task.id), 0) + 1;
        this.auth = this.getAuthFromStorage();
    }

    private getAuthFromStorage(): AuthState {
        try {
            const raw = localStorage.getItem(AUTH_STORAGE_KEY);
            return raw ? (JSON.parse(raw) as AuthState) : { user: null, token: null };
        } catch (error) {
            console.error('Error reading auth from localStorage:', error);
            return { user: null, token: null };
        }
    }

    private saveAuthToStorage(auth: AuthState): void {
        try {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
        } catch (error) {
            console.error('Error saving auth to localStorage:', error);
        }
    }

    setAuthState(auth: AuthState) {
        this.auth = auth;
        this.saveAuthToStorage(auth);
    }

    async getTasks(): Promise<Task[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/todos?_limit=10`, {
                headers: {
                    ...(this.auth.token ? { Authorization: `Bearer ${this.auth.token}` } : {}),
                },
            });
            if (response.ok) {
                const apiTasks: Task[] = await response.json();
                const localTasks = this.tasks.filter(task => task.id > 100);
                this.tasks = [...apiTasks, ...localTasks];
                saveTasksToStorage(this.tasks);
                return this.tasks;
            }
        } catch (error) {
            console.warn('API fetch failed, using local data:', error);
        }
        return this.tasks;
    }

    async createTask(title: string): Promise<Task> {
        const newTask: Task = {
            id: this.nextId++,
            title: title.trim(),
            completed: false,
            userId: this.auth.user?.id ?? 1,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(this.auth.token ? { Authorization: `Bearer ${this.auth.token}` } : {}),
                },
                body: JSON.stringify(newTask),
            });
            if (response.ok) {
                const createdTask: Task = await response.json();
                this.tasks.push(createdTask);
            } else {
                this.tasks.push(newTask);
            }
        } catch (error) {
            console.warn('API create failed, using local storage:', error);
            this.tasks.push(newTask);
        }

        saveTasksToStorage(this.tasks);
        return newTask;
    }

    async updateTask(id: number, updates: TodoUpdates): Promise<Task> {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            throw new Error('Task not found');
        }
        const updatedTask: Task = { ...this.tasks[taskIndex], ...updates };
        try {
            const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(this.auth.token ? { Authorization: `Bearer ${this.auth.token}` } : {}),
                },
                body: JSON.stringify(updatedTask),
            });
            if (!response.ok) {
                throw new Error('Server update failed');
            }
        } catch (error) {
            console.warn('API update failed, using local storage:', error);
        }
        this.tasks[taskIndex] = updatedTask;
        saveTasksToStorage(this.tasks);
        return updatedTask;
    }

    async deleteTask(id: number): Promise<Task> {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            throw new Error('Task not found');
        }
        try {
            const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    ...(this.auth.token ? { Authorization: `Bearer ${this.auth.token}` } : {}),
                },
            });
            if (!response.ok) {
                throw new Error('Server delete failed');
            }
        } catch (error) {
            console.warn('API delete failed, using local storage:', error);
        }
        const [deletedTask] = this.tasks.splice(taskIndex, 1);
        saveTasksToStorage(this.tasks);
        return deletedTask;
    }

    async toggleTask(id: number): Promise<Task> {
        const task = this.tasks.find(t => t.id === id);
        if (!task) {
            throw new Error('Task not found');
        }
        return await this.updateTask(id, { completed: !task.completed });
    }
}

export default new TodoAPI();


