import React from 'react';
import './TodoFilters.css';
import { FilterType } from '../../types';

interface TodoFiltersProps {
    filter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    totalTasks: number;
    completedTasks: number;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
    filter,
    onFilterChange,
    searchTerm,
    onSearchChange,
    totalTasks,
    completedTasks,
}) => {
    const pendingTasks = totalTasks - completedTasks;

    return (
        <div className="todo-filters">
            <div className="filters-row">
                <div className="search-container">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search tasks..."
                        className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>

                <div className="filter-buttons">
                    <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => onFilterChange('all')}>
                        All ({totalTasks})
                    </button>
                    <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => onFilterChange('pending')}>
                        Pending ({pendingTasks})
                    </button>
                    <button className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} onClick={() => onFilterChange('completed')}>
                        Completed ({completedTasks})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoFilters;


