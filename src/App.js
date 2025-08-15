import React, { useState, useEffect, useMemo } from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import TodoFilters from './components/TodoFilters/TodoFilters';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal';
import todoAPI from './services/api';
import './App.css';

function App() {
  // State management
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Load tasks from API
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

  // Add new task
  const handleAddTask = async (title) => {
    try {
      setActionLoading(true);
      const newTask = await todoAPI.createTask(title);
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle task completion
  const handleToggleTask = async (id) => {
    try {
      setActionLoading(true);
      const updatedTask = await todoAPI.toggleTask(id);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id ? updatedTask : task
        )
      );
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error toggling task:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Update task title
  const handleUpdateTask = async (id, updates) => {
    try {
      setActionLoading(true);
      const updatedTask = await todoAPI.updateTask(id, updates);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id ? updatedTask : task
        )
      );
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Show delete confirmation
  const handleDeleteClick = (id) => {
    const task = tasks.find(t => t.id === id);
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      setActionLoading(true);
      await todoAPI.deleteTask(taskToDelete.id);
      setTasks(prevTasks => 
        prevTasks.filter(task => task.id !== taskToDelete.id)
      );
      setShowDeleteModal(false);
      setTaskToDelete(null);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    switch (filter) {
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      case 'pending':
        filtered = filtered.filter(task => !task.completed);
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    return filtered;
  }, [tasks, filter, searchTerm]);

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  // Show error message
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

        {/* Delete Confirmation Modal */}
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
