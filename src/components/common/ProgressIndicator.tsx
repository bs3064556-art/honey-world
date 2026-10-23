import React, { useMemo } from 'react';
import { PAGES } from '../../data/birthdayContent';
import type { PageId } from '../../types/birthday';
import '../../styles/components/ProgressIndicator.css';

interface ProgressIndicatorProps {
  currentPage: PageId;
  onNavigate?: (pageId: PageId) => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentPage, onNavigate }) => {
  const currentIndex = useMemo(
    () => PAGES.findIndex(p => p.id === currentPage),
    [currentPage]
  );

  // Only show from unlock onward (skip welcome/curtain page)
  if (currentIndex < 1) return null;

  return (
    <nav
      aria-label="Journey progress"
      className="progress-indicator"
    >
      {PAGES.slice(1).map((page, i) => {
        const actualIndex = i + 1;
        const isDone = actualIndex < currentIndex;
        const isActive = actualIndex === currentIndex;
        const isClickable = Boolean(onNavigate && (isDone || isActive));
        return (
          <button
            key={page.id}
            type="button"
            onClick={() => isClickable && onNavigate?.(page.id)}
            disabled={!isClickable}
            className={`progress-dot ${isDone ? 'done' : ''} ${isActive ? 'active' : ''} ${isClickable ? 'clickable' : ''}`}
            aria-label={`${page.label} — ${isDone ? 'completed' : isActive ? 'current' : 'upcoming'}`}
            title={page.label}
            style={{ cursor: isClickable ? 'pointer' : 'default' }}
          >
            {isActive ? page.emoji : isDone ? '✓' : '·'}
          </button>
        );
      })}
    </nav>
  );
};
