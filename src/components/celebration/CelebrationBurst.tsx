import React from 'react';
import { motion } from 'framer-motion';
import './CelebrationBurst.css';

interface CelebrationBurstProps {
  active: boolean;
}

const CRACKERS = Array.from({ length: 28 }, (_, i) => ({
  x: ((i * 47) % 100) - 50,
  y: -40 - ((i * 31) % 90),
  rot: (i * 53) % 360,
  delay: (i % 8) * 0.04,
  emoji: ['💥', '✨', '🎊', '⭐', '🎆', '💗', '🎉', '🌸'][i % 8],
  size: 0.9 + (i % 4) * 0.25,
}));

const BALLOONS = [
  { left: '6%', color: '#FF8FB1', delay: 0 },
  { left: '18%', color: '#D8C9F5', delay: 0.2 },
  { left: '78%', color: '#FFF0B5', delay: 0.1 },
  { left: '90%', color: '#C9DDC1', delay: 0.35 },
  { left: '30%', color: '#FFB7C5', delay: 0.45 },
  { left: '62%', color: '#F7B8CB', delay: 0.15 },
];

/** Patakha + balloon burst when the birthday dashboard / candle surprise hits */
export const CelebrationBurst: React.FC<CelebrationBurstProps> = ({ active }) => {
  if (!active) return null;

  return (
    <div className="cele-burst" aria-hidden="true">
      {CRACKERS.map((c, i) => (
        <motion.span
          key={i}
          className="cele-cracker"
          style={{ fontSize: `${c.size}rem` }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0.3, rotate: 0 }}
          animate={{
            opacity: [1, 1, 0],
            x: `${c.x}vw`,
            y: `${c.y}vh`,
            scale: 1.2,
            rotate: c.rot,
          }}
          transition={{ duration: 1.6 + (i % 5) * 0.12, delay: c.delay, ease: 'easeOut' }}
        >
          {c.emoji}
        </motion.span>
      ))}

      {BALLOONS.map((b, i) => (
        <motion.span
          key={`b${i}`}
          className="cele-balloon"
          style={{ left: b.left, background: b.color }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-20vh', opacity: 1 }}
          transition={{ duration: 4.5 + i * 0.3, delay: 0.2 + b.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};
