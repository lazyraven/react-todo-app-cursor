import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ 
  tasks, 
  onToggle, 
  onDelete, 
  onUpdate,
  isLoading = false 
}) => {
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
      {tasks.map((task) => (
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
