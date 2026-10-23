import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  el: HTMLDivElement;
}

const HEARTS = ['💕', '💗', '💖', '💓', '🌸', '✨'];
const MAX_HEARTS = 12;
const THROTTLE_MS = 80;

/**
 * Attaches a lightweight cursor/touch heart trail to the document.
 * Returns a ref to attach to a container element, or uses document body.
 */
export function useHeartTrail(enabled: boolean = true) {
  const containerRef = useRef<HTMLElement | null>(null);
  const lastTime = useRef<number>(0);
  const counter = useRef<number>(0);
  const particles = useRef<HeartParticle[]>([]);
  const prefersReduced = useReducedMotion();

  const spawnHeart = useCallback((x: number, y: number) => {
    if (!enabled || prefersReduced) return;
    const now = Date.now();
    if (now - lastTime.current < THROTTLE_MS) return;
    lastTime.current = now;

    if (particles.current.length >= MAX_HEARTS) {
      const old = particles.current.shift();
      old?.el.remove();
    }

    const el = document.createElement('div');
    el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    el.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: ${10 + Math.random() * 10}px;
      pointer-events: none;
      z-index: 9999;
      user-select: none;
      will-change: transform, opacity;
      animation: floatUp 0.9s ease forwards;
      transform: translateX(${(Math.random() - 0.5) * 30}px);
    `;

    document.body.appendChild(el);
    const particle: HeartParticle = { id: ++counter.current, x, y, el };
    particles.current.push(particle);

    setTimeout(() => {
      el.remove();
      particles.current = particles.current.filter(p => p.id !== particle.id);
    }, 900);
  }, [enabled, prefersReduced]);

  useEffect(() => {
    if (!enabled || prefersReduced) return;

    const onMouseMove = (e: MouseEvent) => spawnHeart(e.clientX, e.clientY);
    const onTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      if (touch) spawnHeart(touch.clientX, touch.clientY);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchend', onTouchEnd);
      particles.current.forEach(p => p.el.remove());
      particles.current = [];
    };
  }, [enabled, prefersReduced, spawnHeart]);

  return containerRef;
}
