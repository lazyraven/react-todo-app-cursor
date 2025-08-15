import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ 
  task, 
  onToggle, 
  onDelete, 
  onUpdate,
  isLoading = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdate(task.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''} ${isLoading ? 'loading' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="todo-checkbox"
          disabled={isLoading}
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyPress}
            className="todo-edit-input"
            autoFocus
            maxLength={100}
          />
        ) : (
          <span 
            className="todo-title"
            onDoubleClick={handleEdit}
          >
            {task.title}
          </span>
        )}
      </div>
      
      <div className="todo-actions">
        {!isEditing && (
          <button
            className="btn btn-icon edit-btn"
            onClick={handleEdit}
            disabled={isLoading}
            title="Edit task"
          >
            ✏️
          </button>
        )}
        <button
          className="btn btn-icon delete-btn"
          onClick={() => onDelete(task.id)}
          disabled={isLoading}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
