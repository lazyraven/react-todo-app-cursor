import React from 'react';
import './LoadingSpinner.css';

type SpinnerSize = 'small' | 'medium' | 'large';

interface LoadingSpinnerProps {
    size?: SpinnerSize;
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', message = 'Loading...' }) => {
    return (
        <div className="loading-container">
            <div className={`spinner spinner-${size}`}></div>
            <p className="loading-message">{message}</p>
        </div>
    );
};

export default LoadingSpinner;


