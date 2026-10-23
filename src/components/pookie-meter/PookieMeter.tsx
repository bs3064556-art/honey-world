import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { POOKIE_METER_CONTENT } from '../../data/birthdayContent';
import { FloatingHearts } from '../common/FloatingHearts';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './PookieMeter.css';

const FILL_MS = 4200;

export const PookieMeter: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const [maxReached, setMaxReached] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setValue(100);
      setMaxReached(true);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / FILL_MS);
      const eased = 1 - (1 - t) ** 3;
      const next = Math.round(eased * 100);
      setValue(next);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setMaxReached(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReduced]);

  const currentLevel = POOKIE_METER_CONTENT.levels.find(
    l => value >= l.min && value <= l.max
  ) ?? POOKIE_METER_CONTENT.levels[0];

  const lineText = value < 100 ? POOKIE_METER_CONTENT.loading : currentLevel.message;

  const fillPercent = value;

  return (
    <div className="pookie-meter-wrapper">
      <FloatingHearts count={5} trigger={maxReached} />

      {/* Blush character */}
      <motion.div
        className="pookie-character"
        key={currentLevel.emoji}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        aria-label={`Expression: ${lineText}`}
      >
        <div className="pookie-face">
          <motion.img
            key={METER_FACES[Math.min(5, Math.floor(value / 20))]}
            src={METER_FACES[Math.min(5, Math.floor(value / 20))]}
            alt=""
            aria-hidden="true"
            width={130}
            height={130}
            style={{ objectFit: 'contain', filter: 'drop-shadow(0 4px 10px rgba(91,58,72,0.2))' }}
            initial={{ scale: 0.8, rotate: -4 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          />
        </div>
        <motion.p
          key={lineText}
          className="pookie-expression font-hand"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {lineText}
        </motion.p>
      </motion.div>

      {/* Slider */}
      <div className="pookie-slider-wrapper">
        <div className="pookie-slider-track">
          <div
            className="pookie-slider-fill"
            style={{ width: `${fillPercent}%` }}
            role="presentation"
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          readOnly
          tabIndex={-1}
          className="pookie-slider is-auto"
          aria-label="Blush meter loading"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={lineText}
        />
        <div className="pookie-slider-labels">
          <span>😎</span>
          <span>{value}%</span>
          <span>💗</span>
        </div>
      </div>

      {/* POOKIE OVERLOAD! */}
      {value === 100 && (
        <motion.div
          className="pookie-overload"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <p className="font-hand pookie-overload-text">
            🧸 POOKIE OVERLOAD! 💗✨
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
            That much blush? The secret is out, Honey! 😂💌
          </p>
        </motion.div>
      )}
    </div>
  );
};

// Anime pookie face that changes with the blush level (0–5)
const METER_FACES = [
  '/images/stickers/anime-7.png', // 0–19   pout ("I'm not shy")
  '/images/stickers/anime-5.png', // 20–39  cuddly
  '/images/stickers/anime-1.png', // 40–59  blushing
  '/images/stickers/anime-4.png', // 60–79  kiss
  '/images/stickers/anime-2.png', // 80–99  heart eyes
  '/images/stickers/anime-8.png', // 100    flying hug
];
