import React, { useEffect, useMemo, useState } from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import TodoFilters from './components/TodoFilters/TodoFilters';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal';
import todoAPI from './services/api';
import { FilterType, Task, TodoUpdates } from './types';
import './App.css';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterType>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
    const [actionLoading, setActionLoading] = useState<boolean>(false);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedTasks = await todoAPI.getTasks();
            setTasks(fetchedTasks);
        } catch (err) {
            setError('Failed to load tasks. Please try again.');
            console.error('Error loading tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (title: string) => {
        try {
            setActionLoading(true);
            const newTask = await todoAPI.createTask(title);
            setTasks(previous => [...previous, newTask]);
        } catch (err) {
            setError('Failed to add task. Please try again.');
            console.error('Error adding task:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleToggleTask = async (id: number) => {
        try {
            setActionLoading(true);
            const updatedTask = await todoAPI.toggleTask(id);
            setTasks(previous => previous.map(task => (task.id === id ? updatedTask : task)));
        } catch (err) {
            setError('Failed to update task. Please try again.');
            console.error('Error toggling task:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleUpdateTask = async (id: number, updates: TodoUpdates) => {
        try {
            setActionLoading(true);
            const updatedTask = await todoAPI.updateTask(id, updates);
            setTasks(previous => previous.map(task => (task.id === id ? updatedTask : task)));
        } catch (err) {
            setError('Failed to update task. Please try again.');
            console.error('Error updating task:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteClick = (id: number) => {
        const task = tasks.find(t => t.id === id) || null;
        setTaskToDelete(task);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!taskToDelete) return;
        try {
            setActionLoading(true);
            await todoAPI.deleteTask(taskToDelete.id);
            setTasks(previous => previous.filter(task => task.id !== taskToDelete.id));
            setShowDeleteModal(false);
            setTaskToDelete(null);
        } catch (err) {
            setError('Failed to delete task. Please try again.');
            console.error('Error deleting task:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setTaskToDelete(null);
    };

    const filteredTasks = useMemo(() => {
        let filtered = tasks;
        if (searchTerm.trim()) {
            filtered = filtered.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        switch (filter) {
            case 'completed':
                filtered = filtered.filter(task => task.completed);
                break;
            case 'pending':
                filtered = filtered.filter(task => !task.completed);
                break;
            default:
                break;
        }
        return filtered;
    }, [tasks, filter, searchTerm]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    if (error) {
        return (
            <div className="app">
                <div className="container">
                    <div className="error-message">
                        <h2>Something went wrong</h2>
                        <p>{error}</p>
                        <button className="btn btn-primary" onClick={loadTasks}>
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <div className="container">
                <header className="app-header">
                    <h1>📋 Todo List</h1>
                    <p>Stay organized and boost your productivity</p>
                </header>

                <main className="app-main">
                    <TodoForm onAddTask={handleAddTask} isLoading={actionLoading} />
                    {loading ? (
                        <LoadingSpinner message="Loading your tasks..." />
                    ) : (
                        <>
                            <TodoFilters
                                filter={filter}
                                onFilterChange={setFilter}
                                searchTerm={searchTerm}
                                onSearchChange={setSearchTerm}
                                totalTasks={totalTasks}
                                completedTasks={completedTasks}
                            />
                            <TodoList
                                tasks={filteredTasks}
                                onToggle={handleToggleTask}
                                onDelete={handleDeleteClick}
                                onUpdate={handleUpdateTask}
                                isLoading={actionLoading}
                            />
                        </>
                    )}
                </main>

                <ConfirmationModal
                    isOpen={showDeleteModal}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    title="Delete Task"
                    message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
                    confirmText="Delete"
                    cancelText="Cancel"
                />
            </div>
        </div>
    );
}

export default App;


