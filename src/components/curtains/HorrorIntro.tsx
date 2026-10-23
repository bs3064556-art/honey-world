import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './HorrorIntro.css';

interface HorrorIntroProps {
  onTap: () => void;
}

/**
 * Spooky gate before the rose rain — Honey taps to “dare” open the surprise.
 */
export const HorrorIntro: React.FC<HorrorIntroProps> = ({ onTap }) => {
  const [flicker, setFlicker] = useState(false);
  const [line, setLine] = useState(0);

  const lines = [
    'Something is waiting in the dark…',
    "Honey… don't be scared.",
    'Just tap once to begin.',
  ];

  useEffect(() => {
    const f = window.setInterval(() => setFlicker(v => !v), 180);
    return () => window.clearInterval(f);
  }, []);

  useEffect(() => {
    if (line >= lines.length - 1) return;
    const t = window.setTimeout(() => setLine(l => l + 1), 1600);
    return () => window.clearTimeout(t);
  }, [line, lines.length]);

  return (
    <div className={`horror-intro ${flicker ? 'is-flicker' : ''}`} role="dialog" aria-label="Horror intro">
      <div className="horror-grain" aria-hidden="true" />
      <div className="horror-vignette" aria-hidden="true" />

      {/* floating eerie orbs */}
      <span className="horror-orb o1" aria-hidden="true" />
      <span className="horror-orb o2" aria-hidden="true" />
      <span className="horror-orb o3" aria-hidden="true" />

      <motion.p
        key={line}
        className="horror-line"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {lines[line]}
      </motion.p>

      <motion.button
        type="button"
        className="horror-door"
        onClick={onTap}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Tap to open the surprise"
      >
        <span className="horror-tap-icon" aria-hidden="true">👆</span>
        <span className="horror-door-label">TAP TO OPEN</span>
        <span className="horror-door-sub">Honey…</span>
      </motion.button>

      <p className="horror-hint">Tap the button above — then flowers will appear 🌹</p>
    </div>
  );
};
