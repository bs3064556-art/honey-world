import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface FloatingHeartsProps {
  count?: number;
  trigger?: boolean; // when true, spawn extra burst
}

const HEARTS_POOL = ['💗', '💕', '💖', '🌸', '💓', '✨', '🌷'];

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 8, trigger = false }) => {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const spawnHeart = (container: HTMLDivElement) => {
    const el = document.createElement('div');
    const heart = HEARTS_POOL[Math.floor(Math.random() * HEARTS_POOL.length)];
    el.textContent = heart;
    const size = 12 + Math.random() * 16;
    const left = 5 + Math.random() * 90;
    const duration = 2.5 + Math.random() * 2.5;
    const delay = Math.random() * 0.5;

    el.style.cssText = `
      position: absolute;
      left: ${left}%;
      bottom: -20px;
      font-size: ${size}px;
      pointer-events: none;
      animation: floatUp ${duration}s ${delay}s ease-out forwards;
      will-change: transform, opacity;
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), (duration + delay) * 1000 + 100);
  };

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;
    const container = containerRef.current;

    // Ambient hearts
    let i = 0;
    const interval = setInterval(() => {
      if (i < count) { spawnHeart(container); i++; }
      else { clearInterval(interval); }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [count, prefersReduced]);

  useEffect(() => {
    if (!trigger || prefersReduced || !containerRef.current) return;
    const container = containerRef.current;
    for (let i = 0; i < 15; i++) {
      setTimeout(() => spawnHeart(container), i * 80);
    }
  }, [trigger, prefersReduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    />
  );
};
