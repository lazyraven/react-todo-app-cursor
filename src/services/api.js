// API service for handling CRUD operations
// Using JSONPlaceholder for demo purposes and local storage as fallback

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Mock data for initial tasks
const mockTasks = [
  {
    id: 1,
    title: 'Complete React project',
    completed: false,
    userId: 1
  },
  {
    id: 2,
    title: 'Learn TypeScript',
    completed: true,
    userId: 1
  },
  {
    id: 3,
    title: 'Build portfolio website',
    completed: false,
    userId: 1
  },
  {
    id: 4,
    title: 'Study algorithms',
    completed: false,
    userId: 1
  },
  {
    id: 5,
    title: 'Practice coding challenges',
    completed: true,
    userId: 1
  }
];

// Local storage key
const STORAGE_KEY = 'todo_tasks';

// Helper function to get tasks from localStorage
const getTasksFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : mockTasks;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return mockTasks;
  }
};

// Helper function to save tasks to localStorage
const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// API service class
class TodoAPI {
  constructor() {
    this.tasks = getTasksFromStorage();
    this.nextId = Math.max(...this.tasks.map(task => task.id), 0) + 1;
  }

  // Get all tasks
  async getTasks() {
    try {
      // Try to fetch from JSONPlaceholder first
      const response = await fetch(`${API_BASE_URL}/todos?_limit=10`);
      if (response.ok) {
        const apiTasks = await response.json();
        // Merge with local tasks, avoiding duplicates
        const localTasks = this.tasks.filter(task => task.id > 100);
        this.tasks = [...apiTasks, ...localTasks];
        saveTasksToStorage(this.tasks);
        return this.tasks;
      }
    } catch (error) {
      console.warn('API fetch failed, using local data:', error);
    }
    
    // Return local tasks if API fails
    return this.tasks;
  }

  // Create a new task
  async createTask(title) {
    const newTask = {
      id: this.nextId++,
      title: title.trim(),
      completed: false,
      userId: 1
    };

    try {
      // Try to create on server
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const createdTask = await response.json();
        this.tasks.push(createdTask);
      } else {
        // If server creation fails, use local task
        this.tasks.push(newTask);
      }
    } catch (error) {
      console.warn('API create failed, using local storage:', error);
      this.tasks.push(newTask);
    }

    saveTasksToStorage(this.tasks);
    return newTask;
  }

  // Update a task
  async updateTask(id, updates) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    const updatedTask = { ...this.tasks[taskIndex], ...updates };

    try {
      // Try to update on server
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Server update failed');
      }
    } catch (error) {
      console.warn('API update failed, using local storage:', error);
    }

    // Update locally regardless of server response
    this.tasks[taskIndex] = updatedTask;
    saveTasksToStorage(this.tasks);
    return updatedTask;
  }

  // Delete a task
  async deleteTask(id) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    try {
      // Try to delete from server
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Server delete failed');
      }
    } catch (error) {
      console.warn('API delete failed, using local storage:', error);
    }

    // Remove locally regardless of server response
    const deletedTask = this.tasks.splice(taskIndex, 1)[0];
    saveTasksToStorage(this.tasks);
    return deletedTask;
  }

  // Toggle task completion
  async toggleTask(id) {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new Error('Task not found');
    }

    return await this.updateTask(id, { completed: !task.completed });
  }
}

// Export singleton instance
export default new TodoAPI();
