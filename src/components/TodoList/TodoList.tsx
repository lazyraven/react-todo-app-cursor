import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';
import { Task, TodoUpdates } from '../../types';

interface TodoListProps {
    tasks: Task[];
    onToggle: (id: number) => void | Promise<void>;
    onDelete: (id: number) => void | Promise<void>;
    onUpdate: (id: number, updates: TodoUpdates) => void | Promise<void>;
    isLoading?: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onToggle, onDelete, onUpdate, isLoading = false }) => {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No tasks yet</h3>
                <p>Add a new task to get started!</p>
            </div>
        );
    }

    return (
        <div className="todo-list">
            {tasks.map(task => (
                <TodoItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    isLoading={isLoading}
                />
            ))}
        </div>
    );
};

export default TodoList;


