import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TeddyKissEnd.css';

const LOVE_LINES = [
  'I love you, aamar shona',
  'I hug you',
  'I kiss you',
  'I like you',
  'I love you, aamar shona',
  'I adore you',
  'I choose you',
  'Forever yours',
];

interface BurstItem {
  id: number;
  kind: 'heart' | 'kiss';
  x: number;
  y: number;
  rot: number;
  size: number;
  delay: number;
}

/** End screen — single heart floating at its origin; tap → love burst */
export const TeddyKissEnd: React.FC = () => {
  const [tapped, setTapped] = useState(false);
  const [burst, setBurst] = useState<BurstItem[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [showLine, setShowLine] = useState(false);

  const onTap = () => {
    setTapped(true);
    spawnBurst(tapped ? 12 : 18);
    setLineIndex(i => (tapped ? (i + 1) % LOVE_LINES.length : 0));
    setShowLine(false);
    window.setTimeout(() => setShowLine(true), 40);
  };

  const spawnBurst = (count = 12) => {
    const items: BurstItem[] = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.35;
      const dist = 50 + Math.random() * 100;
      return {
        id: Date.now() + i + Math.random(),
        kind: i % 3 === 0 ? 'kiss' : 'heart',
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 12,
        rot: (Math.random() - 0.5) * 50,
        size: 1.05 + Math.random() * 1.15,
        delay: i * 0.04,
      };
    });
    setBurst(prev => [...prev, ...items].slice(-48));
    window.setTimeout(() => {
      setBurst(prev => prev.filter(p => !items.some(it => it.id === p.id)));
    }, 1700);
  };

  return (
    <motion.div
      className="teddy-kiss-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <p className="tke-hint font-hand">
        {tapped ? 'Tap again for more love 💗' : 'Tap the heart 💗'}
      </p>

      <div className="tke-stage">
        <motion.button
          type="button"
          className="tke-heart-btn"
          onClick={onTap}
          aria-label="Tap the heart"
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -10, 0],
            rotate: [-4, 4, -4],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 32 29" className="tke-heart-svg" aria-hidden="true">
            <defs>
              <linearGradient id="tkeHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff8fb1" />
                <stop offset="50%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
            </defs>
            <path
              d="M16 28s-14-8.5-14-17A7.5 7.5 0 0 1 16 6.2 7.5 7.5 0 0 1 30 11c0 8.5-14 17-14 17z"
              fill="url(#tkeHeartGrad)"
            />
          </svg>
        </motion.button>

        <AnimatePresence>
          {burst.map(item => (
            <motion.span
              key={item.id}
              className={`tke-particle tke-${item.kind}`}
              style={{ fontSize: `${item.size}rem` }}
              initial={{ opacity: 0, scale: 0.2, x: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.3, 1.2, 1],
                x: item.x,
                y: item.y,
                rotate: item.rot,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.35, delay: item.delay, ease: 'easeOut' }}
            >
              {item.kind === 'kiss' ? '💋' : '💗'}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {showLine && (
          <motion.h2
            key={LOVE_LINES[lineIndex]}
            className="tke-love"
            initial={{ opacity: 0, scale: 0.75, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14 }}
          >
            {LOVE_LINES[lineIndex]}
          </motion.h2>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
