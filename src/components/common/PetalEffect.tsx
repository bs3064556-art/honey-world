import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface PetalEffectProps {
  active?: boolean;
  count?: number;
}

const PETALS = ['🌸', '🌷', '🌺', '🌼', '🪷'];

export const PetalEffect: React.FC<PetalEffectProps> = ({ active = false, count = 20 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!active || prefersReduced || !containerRef.current) return;
    const container = containerRef.current;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
        const left = Math.random() * 100;
        const size = 10 + Math.random() * 14;
        const dur = 3 + Math.random() * 3;

        el.style.cssText = `
          position: fixed;
          left: ${left}%;
          top: -20px;
          font-size: ${size}px;
          pointer-events: none;
          z-index: 9998;
          animation: petalFall ${dur}s ease-in forwards;
          will-change: transform;
        `;
        container.appendChild(el);
        setTimeout(() => el.remove(), dur * 1000 + 100);
      }, i * 120);
    }
  }, [active, count, prefersReduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}
    />
  );
};
