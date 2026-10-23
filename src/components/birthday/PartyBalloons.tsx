import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playBalloonPop } from '../../utils/popSound';
import './PartyBalloons.css';

interface BalloonDef {
  id: string;
  kind: 'heart' | 'cluster' | 'emoji';
  src?: string;
  emoji?: string;
  color?: string;
  left: string;
  bottom: string;
  size: number;
  delay: number;
  pitch: number;
}

const BALLOONS: BalloonDef[] = [
  { id: 'b1', kind: 'heart', src: '/images/deco/balloon-heart.png', left: '4%', bottom: '18%', size: 72, delay: 0, pitch: 1.1 },
  { id: 'b2', kind: 'cluster', src: '/images/deco/balloons-1.png', left: '72%', bottom: '22%', size: 100, delay: 0.2, pitch: 0.95 },
  { id: 'b3', kind: 'cluster', src: '/images/deco/balloons-2.png', left: '78%', bottom: '48%', size: 88, delay: 0.35, pitch: 1.05 },
  { id: 'b4', kind: 'emoji', emoji: '🎈', color: '#ff8fb1', left: '12%', bottom: '52%', size: 42, delay: 0.1, pitch: 1.2 },
  { id: 'b5', kind: 'emoji', emoji: '🎈', color: '#d8c9f5', left: '58%', bottom: '8%', size: 38, delay: 0.45, pitch: 0.9 },
  { id: 'b6', kind: 'emoji', emoji: '🎈', color: '#fff0b5', left: '28%', bottom: '6%', size: 36, delay: 0.55, pitch: 1.15 },
  { id: 'b7', kind: 'emoji', emoji: '🎈', color: '#ff6b9d', left: '86%', bottom: '12%', size: 40, delay: 0.25, pitch: 1 },
  { id: 'b8', kind: 'emoji', emoji: '🎈', color: '#c9ddc1', left: '42%', bottom: '58%', size: 34, delay: 0.4, pitch: 1.25 },
];

interface PartyBalloonsProps {
  active: boolean;
  /** auto-pop a few balloons after open for celebration feel */
  autoPop?: boolean;
}

export const PartyBalloons: React.FC<PartyBalloonsProps> = ({ active, autoPop = true }) => {
  const [popped, setPopped] = useState<Set<string>>(new Set());
  const [bursts, setBursts] = useState<{ id: string; x: string; y: string }[]>([]);

  const pop = useCallback((b: BalloonDef) => {
    setPopped(prev => {
      if (prev.has(b.id)) return prev;
      const next = new Set(prev);
      next.add(b.id);
      return next;
    });
    playBalloonPop(b.pitch);
    const burstId = `${b.id}-${Date.now()}`;
    setBursts(prev => [...prev, { id: burstId, x: b.left, y: b.bottom }]);
    window.setTimeout(() => {
      setBursts(prev => prev.filter(x => x.id !== burstId));
    }, 700);
  }, []);

  // celebration: auto-pop a couple balloons after curtains open
  useEffect(() => {
    if (!active || !autoPop) return;
    const timers = [
      window.setTimeout(() => pop(BALLOONS[3]), 900),
      window.setTimeout(() => pop(BALLOONS[5]), 1400),
      window.setTimeout(() => pop(BALLOONS[6]), 1900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active, autoPop, pop]);

  if (!active) return null;

  return (
    <div className="party-balloons" aria-hidden="true">
      {BALLOONS.map(b => {
        if (popped.has(b.id)) return null;
        return (
          <motion.button
            key={b.id}
            type="button"
            className={`pb-balloon pb-${b.kind}`}
            style={{
              left: b.left,
              bottom: b.bottom,
              width: b.size,
              height: b.kind === 'emoji' ? b.size * 1.35 : undefined,
              ['--delay' as string]: `${b.delay}s`,
              color: b.color,
            }}
            initial={{ opacity: 0, y: 40, scale: 0.5 }}
            animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
            transition={{
              opacity: { delay: 0.2 + b.delay, duration: 0.45 },
              scale: { delay: 0.2 + b.delay, type: 'spring', stiffness: 220 },
              y: { delay: 0.6 + b.delay, duration: 2.4 + b.delay, repeat: Infinity, ease: 'easeInOut' },
            }}
            onClick={e => {
              e.stopPropagation();
              pop(b);
            }}
            aria-label="Balloon pop"
          >
            {b.kind === 'emoji' ? (
              <span className="pb-emoji" style={{ fontSize: b.size }}>
                {b.emoji}
              </span>
            ) : (
              <img src={b.src} alt="" draggable={false} />
            )}
            <span className="pb-string" />
          </motion.button>
        );
      })}

      <AnimatePresence>
        {bursts.map(burst => (
          <motion.div
            key={burst.id}
            className="pb-burst"
            style={{ left: burst.x, bottom: burst.y }}
            initial={{ opacity: 1, scale: 0.4 }}
            animate={{ opacity: 0, scale: 1.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            {['💥', '✨', '💗', '⭐', '💫'].map((p, i) => (
              <span
                key={i}
                className="pb-particle"
                style={{ ['--a' as string]: `${i * 72}deg` }}
              >
                {p}
              </span>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
