import { useState, useCallback } from 'react';

/**
 * A hook that syncs state with localStorage.
 * Falls back gracefully if localStorage is unavailable.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setStoredValue(prev => {
        const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
        window.localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
    } catch {
      // Silently ignore storage errors
    }
  }, [key]);

  return [storedValue, setValue];
}
