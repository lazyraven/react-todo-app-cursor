import React, { useState } from 'react';
import './TodoForm.css';

interface TodoFormProps {
    onAddTask: (title: string) => void | Promise<void>;
    isLoading?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTask, isLoading = false }) => {
    const [title, setTitle] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.trim()) {
            onAddTask(title);
            setTitle('');
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className="todo-input"
                    disabled={isLoading}
                    maxLength={100}
                />
                <button
                    type="submit"
                    className="btn btn-primary add-btn"
                    disabled={!title.trim() || isLoading}
                >
                    {isLoading ? (
                        <span className="loading-text">Adding...</span>
                    ) : (
                        <span>Add Task</span>
                    )}
                </button>
            </div>
        </form>
    );
};

export default TodoForm;


