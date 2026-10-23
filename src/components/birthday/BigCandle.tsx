import React from 'react';
import { motion } from 'framer-motion';
import { CreamBear, BrownBear } from '../pookie-bears/PookieBears';
import './BigCandle.css';

interface BigCandleProps {
  blown: boolean;
  onBlow: () => void;
}

/** Giant surprise candle — Honey blows it, then cake + patakha appear */
export const BigCandle: React.FC<BigCandleProps> = ({ blown, onBlow }) => (
  <div className={`big-candle-scene ${blown ? 'is-blown' : ''}`}>
    <div className="bc-bears" aria-hidden="true">
      <BrownBear size={72} pose="shy" />
      <CreamBear size={68} pose="cheer" />
    </div>

    <p className="bc-hint font-hand">
      {blown ? 'Shhhhh… the cake is coming! 🎂' : 'Honey… blow out this candle 🕯️✨'}
    </p>

    <button
      type="button"
      className="bc-hit"
      onClick={onBlow}
      disabled={blown}
      aria-label={blown ? 'Candle blown out' : 'Blow out the birthday candle'}
    >
      <svg className="bc-svg" viewBox="0 0 120 220" width="120" height="220" aria-hidden="true">
        {/* flame */}
        {!blown && (
          <g className="bc-flame">
            <motion.ellipse
              cx="60"
              cy="42"
              rx="18"
              ry="28"
              fill="#FFA726"
              animate={{ scaleY: [1, 1.12, 0.92, 1.08, 1], scaleX: [1, 0.92, 1.06, 0.94, 1] }}
              transition={{ repeat: Infinity, duration: 0.55 }}
            />
            <motion.ellipse
              cx="60"
              cy="48"
              rx="9"
              ry="16"
              fill="#FFF59D"
              animate={{ opacity: [0.95, 0.7, 0.95] }}
              transition={{ repeat: Infinity, duration: 0.45 }}
            />
          </g>
        )}
        {blown && (
          <motion.g initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 0.55, 0], y: -28 }} transition={{ duration: 1.4, repeat: 2 }}>
            <ellipse cx="60" cy="40" rx="8" ry="5" fill="#8C6878" opacity="0.4" />
          </motion.g>
        )}
        {/* wick */}
        <line x1="60" y1="68" x2="60" y2="78" stroke="#4A3028" strokeWidth="3" strokeLinecap="round" />
        {/* candle body */}
        <rect x="38" y="78" width="44" height="120" rx="10" fill="url(#bcGrad)" />
        <rect x="38" y="78" width="44" height="14" rx="6" fill="#FFE0EC" />
        <rect x="38" y="120" width="44" height="10" fill="#fff" opacity="0.45" />
        {/* drip */}
        <ellipse cx="48" cy="92" rx="5" ry="8" fill="#FFE0EC" opacity="0.9" />
        <ellipse cx="78" cy="98" rx="4" ry="7" fill="#FFE0EC" opacity="0.8" />
        <defs>
          <linearGradient id="bcGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF9DB9" />
            <stop offset="100%" stopColor="#E86F98" />
          </linearGradient>
        </defs>
      </svg>
    </button>

    {!blown && (
      <motion.button
        type="button"
        className="btn btn-primary bc-blow-btn"
        onClick={onBlow}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🌬️ BLOW THE CANDLE
      </motion.button>
    )}
  </div>
);
