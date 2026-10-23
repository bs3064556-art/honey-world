import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './BirthdayCake.css';

interface BirthdayCakeProps {
  onWishMade: () => void;
  isBlownOut: boolean;
  /** candles = age (from DOB) */
  candleCount?: number;
}

const CANDLE_COLORS = ['#FF8FB1', '#D8C9F5', '#FFF0B5', '#C9DDC1', '#FFD7C2'];

const CONFETTI = ['🎉', '🎊', '✨', '💗', '🎈', '🌸', '⭐', '🎂'];
const BUNTING_COLORS = ['#FF8FB1', '#D8C9F5', '#FFF0B5', '#C9DDC1', '#FFD7C2'];

// Flags hanging on a sagging string across the top of the cake (quadratic bezier)
const BUNTING_FLAGS = Array.from({ length: 9 }, (_, i) => {
  const t = (i + 0.5) / 9;
  const x = (1 - t) * (1 - t) * 4 + 2 * (1 - t) * t * 110 + t * t * 216;
  const y = (1 - t) * (1 - t) * -16 + 2 * (1 - t) * t * 4 + t * t * -16;
  return { x, y, color: BUNTING_COLORS[i % BUNTING_COLORS.length] };
});

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ onWishMade, isBlownOut, candleCount = 5 }) => {
  const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);
  const [blown, setBlown] = useState<number[]>([]);
  const prefersReduced = useReducedMotion();

  // keep cake readable — show age candles (cap spacing for many)
  const count = Math.max(1, Math.min(candleCount, 30));
  const candles = Array.from({ length: count }, (_, i) => i);
  const isOut = (i: number) => isBlownOut || blown.includes(i);
  const allOut = isBlownOut || blown.length === candles.length;

  const blowCandle = (i: number) => {
    setBlown(prev => (prev.includes(i) ? prev : [...prev, i]));
  };

  // all candles blown one by one → tell the page the wish is made
  useEffect(() => {
    if (!isBlownOut && blown.length === candles.length) onWishMade();
  }, [blown, isBlownOut, candles.length, onWishMade]);

  return (
    <div className="cake-scene" aria-label="Birthday cake with candles">
      {/* Floating balloons */}
      <div className="cake-balloons" aria-hidden="true">
        {['#FF8FB1', '#D8C9F5', '#FFF0B5'].map((color, i) => (
          <div
            key={i}
            className="balloon"
            style={{
              background: color,
              left: `${10 + i * 30}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Cake SVG */}
      <motion.div
        className="cake-container"
        initial={prefersReduced ? {} : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        <svg
          width="260"
          height="270"
          viewBox="0 -40 220 260"
          fill="none"
          className="cake-svg"
          aria-label="Pink birthday cake"
        >
          {/* Bunting */}
          <path d="M4 -16 Q 110 4 216 -16" stroke="#B8879A" strokeWidth="1.2" fill="none" />
          {BUNTING_FLAGS.map((f, i) => (
            <polygon
              key={i}
              points={`${f.x - 7},${f.y + 2} ${f.x + 7},${f.y + 2} ${f.x},${f.y + 17}`}
              fill={f.color}
              opacity="0.95"
            />
          ))}

          {/* Plate */}
          <ellipse cx="110" cy="205" rx="90" ry="10" fill="#F7B8CB" opacity="0.5"/>

          {/* Bottom tier */}
          <rect x="20" y="155" width="180" height="50" rx="12" fill="#FF8FB1"/>
          <rect x="20" y="155" width="180" height="12" rx="6" fill="#F7B8CB"/>
          {/* Dots on bottom tier */}
          {[40, 70, 100, 130, 160, 190].map(x => (
            <circle key={x} cx={x} cy="178" r="5" fill="white" opacity="0.6"/>
          ))}
          {/* Bottom drips */}
          {[35, 65, 95, 125, 155, 185].map((x, i) => (
            <ellipse key={i} cx={x} cy="205" rx="8" ry="5" fill="#E86F98" opacity="0.4"/>
          ))}
          {/* Ribbon with greeting */}
          <rect x="20" y="170" width="180" height="22" fill="white" opacity="0.88"/>
          <text
            x="110" y="186" textAnchor="middle" fontSize="16" fontWeight="700"
            fill="#E86F98" style={{ fontFamily: 'Caveat, cursive' }}
          >
            Happy Birthday Honey!
          </text>

          {/* Middle tier */}
          <rect x="38" y="108" width="144" height="50" rx="10" fill="#F7B8CB"/>
          <rect x="38" y="108" width="144" height="12" rx="6" fill="#FFD7C2"/>
          {/* Dots on middle tier */}
          {[60, 90, 120, 150].map(x => (
            <circle key={x} cx={x} cy="130" r="4" fill="white" opacity="0.5"/>
          ))}

          {/* Top tier */}
          <rect x="58" y="72" width="104" height="40" rx="10" fill="#FFD7C2"/>
          <rect x="58" y="72" width="104" height="10" rx="5" fill="#FFF0B5"/>
          {/* Top tier flowers */}
          <circle cx="90" cy="86" r="6" fill="#FF8FB1"/>
          <circle cx="110" cy="82" r="5" fill="#F7B8CB"/>
          <circle cx="130" cy="86" r="6" fill="#FF8FB1"/>

          {/* Frosting top drips */}
          {[70, 90, 110, 130, 150].map((x, i) => (
            <path
              key={i}
              d={`M ${x} 72 Q ${x + 6} 78 ${x} 85`}
              stroke="white"
              strokeWidth="3"
              fill="none"
              opacity="0.5"
            />
          ))}

          {/* Age label */}
          <text
            x="110" y="18" textAnchor="middle" fontSize="13" fontWeight="700"
            fill="#c43d6a" style={{ fontFamily: 'Caveat, cursive' }}
          >
            {count} candles · {count} years
          </text>

          {/* Candles — spaced across top tier (2 rows if many) */}
          {candles.map(i => {
            const row = count > 13 ? Math.floor(i / Math.ceil(count / 2)) : 0;
            const perRow = count > 13 ? Math.ceil(count / 2) : count;
            const col = count > 13 ? i % perRow : i;
            const gap = Math.min(14, 104 / Math.max(perRow, 1));
            const startX = 110 - ((perRow - 1) * gap) / 2;
            const x = startX + col * gap;
            const yOff = row * 18;
            const w = count > 16 ? 5 : count > 10 ? 6 : 8;
            const h = count > 16 ? 22 : 30;
            const color = CANDLE_COLORS[i % CANDLE_COLORS.length];
            const candleBlown = isOut(i);
            return (
              <g
                key={i}
                transform={`translate(${x}, ${yOff})`}
                style={{ cursor: candleBlown ? 'default' : 'pointer' }}
                onMouseEnter={() => setHoveredCandle(i)}
                onMouseLeave={() => setHoveredCandle(null)}
                onClick={() => blowCandle(i)}
              >
                <rect x={-w - 2} y="18" width={w * 2 + 4} height={h + 28} fill="transparent" />
                <rect x={-w / 2} y={44 - (h - 30)} width={w} height={h} rx="2" fill={color}/>
                <rect x={-w / 2} y={52 - (h - 30)} width={w} height={2} rx="1" fill="white" opacity="0.4"/>
                <line x1="0" y1={44 - (h - 30)} x2="0" y2={38 - (h - 30)} stroke="#5B3A48" strokeWidth="1.2"/>
                {!candleBlown && (
                  <g>
                    <motion.ellipse
                      cx="0" cy={32 - (h - 30)}
                      rx={count > 16 ? 2.5 : 4} ry={count > 16 ? 5 : 7}
                      fill={hoveredCandle === i ? '#FFF0B5' : '#FFA726'}
                      animate={prefersReduced ? {} : {
                        scaleY: [1, 1.15, 0.9, 1.1, 1],
                        scaleX: [1, 0.9, 1.05, 0.95, 1],
                      }}
                      transition={{ repeat: Infinity, duration: 0.55 + (i % 5) * 0.08 }}
                    />
                    <ellipse cx="0" cy={34 - (h - 30)} rx="2" ry="3.5" fill="#FFF9C4" opacity="0.85"/>
                  </g>
                )}
                {candleBlown && (
                  <motion.g
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 0.6, 0], y: -10 }}
                    transition={{ duration: 1.4, repeat: 2 }}
                  >
                    <ellipse cx="0" cy={32 - (h - 30)} rx="2" ry="1.5" fill="#8C6878" opacity="0.3"/>
                  </motion.g>
                )}
              </g>
            );
          })}

          {/* Stars & sparkles around */}
          <text x="10" y="70" fontSize="14" opacity="0.7">✨</text>
          <text x="195" y="80" fontSize="12" opacity="0.6">⭐</text>
          <text x="5" y="130" fontSize="10" opacity="0.5">💗</text>
          <text x="200" y="145" fontSize="11" opacity="0.6">🌷</text>
        </svg>

        {/* Confetti burst when every candle is out */}
        {allOut && !prefersReduced && (
          <div className="cake-confetti" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.span
                key={i}
                className="confetti-piece"
                initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0.6 }}
                animate={{
                  opacity: [1, 1, 0],
                  x: (i - 7.5) * 20,
                  y: -120 - (i % 4) * 45,
                  rotate: (i % 2 ? 1 : -1) * (120 + i * 12),
                  scale: 1.1,
                }}
                transition={{ duration: 1.8 + (i % 5) * 0.15, delay: (i % 6) * 0.05, ease: 'easeOut' }}
              >
                {CONFETTI[i % CONFETTI.length]}
              </motion.span>
            ))}
          </div>
        )}

        {/* Hint + make a wish button */}
        {!allOut && (
          <p className="cake-hint font-hand">Tap the candles 🕯️ or press the button below!</p>
        )}
        <AnimatePresence>
          {!allOut && (
            <motion.button
              className="btn btn-primary wish-btn"
              onClick={onWishMade}
              aria-label="Make a birthday wish and blow out candles"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.5 }}
            >
              🕯️ MAKE A WISH ✨
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
