import React from 'react';
import { RomanticDecor } from './RomanticDecor';

// Reusable decorative background flowers for all pages
export const FlowerBg: React.FC = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 0,
    }}
  >
    <RomanticDecor />
    {/* Corner flowers */}
    <span style={{ position: 'absolute', top: 12, left: 12, fontSize: '1.8rem', opacity: 0.25, animation: 'sway 4s ease-in-out infinite' }}>🌸</span>
    <span style={{ position: 'absolute', top: 12, right: 12, fontSize: '1.5rem', opacity: 0.20, animation: 'sway 3.5s ease-in-out infinite reverse' }}>🌷</span>
    <span style={{ position: 'absolute', bottom: 60, left: 16, fontSize: '1.4rem', opacity: 0.20, animation: 'sway 5s ease-in-out infinite' }}>🌼</span>
    <span style={{ position: 'absolute', bottom: 60, right: 16, fontSize: '1.6rem', opacity: 0.22, animation: 'sway 4.5s ease-in-out infinite reverse' }}>🌺</span>
    {/* Stars */}
    <span style={{ position: 'absolute', top: '30%', left: 8, fontSize: '0.9rem', opacity: 0.20, animation: 'twinkle 3s ease-in-out infinite' }}>✨</span>
    <span style={{ position: 'absolute', top: '50%', right: 10, fontSize: '0.8rem', opacity: 0.18, animation: 'twinkle 2.5s ease-in-out infinite 1s' }}>⭐</span>
    <span style={{ position: 'absolute', top: '20%', right: 40, fontSize: '0.9rem', opacity: 0.15, animation: 'twinkle 4s ease-in-out infinite 0.5s' }}>💫</span>
    {/* Tiny hearts */}
    <span style={{ position: 'absolute', top: '40%', left: 20, fontSize: '0.8rem', opacity: 0.18, animation: 'gentleFloat 6s ease-in-out infinite' }}>💕</span>
    <span style={{ position: 'absolute', top: '70%', right: 30, fontSize: '0.8rem', opacity: 0.15, animation: 'gentleFloat 5s ease-in-out infinite 1s' }}>💗</span>
  </div>
);
