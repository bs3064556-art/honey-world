import React from 'react';
import './NextArrowButton.css';

interface NextArrowButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/** Modern circle arrow — used to go to the next page */
export const NextArrowButton: React.FC<NextArrowButtonProps> = ({
  onClick,
  label = 'Continue',
  disabled,
  className = '',
}) => (
  <button
    type="button"
    className={`next-arrow-btn ${className}`}
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
  >
    <span className="next-arrow-label">{label}</span>
    <span className="next-arrow-icon" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h12M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  </button>
);
