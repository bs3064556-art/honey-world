import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrownBear, CreamBear } from '../pookie-bears/PookieBears';
import './PookieIntro.css';

interface PookieIntroProps {
  /** curtain has opened — start the chase */
  active: boolean;
  onDone: () => void;
}

type Phase = 'idle' | 'chase' | 'door' | 'open' | 'birthday' | 'done';

/**
 * Opening mini-movie:
 * brown teddy runs → cream follows → door appears → opens → Happy Birthday → dashboard
 */
export const PookieIntro: React.FC<PookieIntroProps> = ({ active, onDone }) => {
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    if (!active || phase !== 'idle') return;
    setPhase('chase');
    const t1 = window.setTimeout(() => setPhase('door'), 3200);
    const t2 = window.setTimeout(() => setPhase('open'), 4200);
    const t3 = window.setTimeout(() => setPhase('birthday'), 5400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [active, phase]);

  if (!active || phase === 'done') return null;

  const goDashboard = () => {
    setPhase('done');
    onDone();
  };

  return (
    <div className="pookie-intro" role="dialog" aria-label="Pookie birthday intro">
      <div className="pi-sky" aria-hidden="true" />
      <div className="pi-ground" aria-hidden="true" />

      {/* floating little balloons during chase */}
      <div className="pi-mini-balloons" aria-hidden="true">
        {['#FF8FB1', '#FFF0B5', '#D8C9F5', '#C9DDC1'].map((c, i) => (
          <span key={i} className="pi-balloon" style={{ left: `${12 + i * 22}%`, background: c, animationDelay: `${i * 0.4}s` }} />
        ))}
      </div>

      <AnimatePresence>
        {(phase === 'chase' || phase === 'door' || phase === 'open') && (
          <motion.div
            key="chase"
            className="pi-chase"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={`pi-runner pi-brown ${phase !== 'chase' ? 'pi-arrive' : ''}`}>
              <BrownBear size={92} pose="run" />
            </div>
            <div className={`pi-runner pi-cream ${phase !== 'chase' ? 'pi-arrive' : ''}`}>
              <CreamBear size={86} pose="run" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Door */}
      {(phase === 'door' || phase === 'open' || phase === 'birthday') && (
        <div className={`pi-door-wrap ${phase === 'open' || phase === 'birthday' ? 'is-open' : ''}`}>
          <div className="pi-door-frame">
            <div className="pi-door-left" />
            <div className="pi-door-right" />
            <div className="pi-door-glow" />
            {(phase === 'open' || phase === 'birthday') && (
              <motion.div
                className="pi-door-inside"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                <p className="pi-hb-label">Happy Birthday</p>
                <p className="pi-hb-name">Honey!</p>
                <span className="pi-hb-spark">✨🎂✨</span>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Full birthday splash after door */}
      <AnimatePresence>
        {phase === 'birthday' && (
          <motion.div
            key="hb"
            className="pi-birthday"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h1
              className="pi-title"
              initial={{ scale: 0.4, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
            >
              Happy Birthday
            </motion.h1>
            <motion.p
              className="pi-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Mere pookie Honey ke liye… 🧸💗
            </motion.p>

            <div className="pi-bears-pose">
              <BrownBear size={100} pose="heart" />
              <CreamBear size={96} pose="cheer" />
            </div>

            <motion.button
              type="button"
              className="btn btn-primary pi-enter"
              onClick={goDashboard}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              Birthday world kholo 🚪✨
            </motion.button>

            <button type="button" className="pi-skip" onClick={goDashboard}>
              Skip →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'chase' && (
        <p className="pi-caption">Brown teddy is running… cream teddy is chasing! 🏃🧸</p>
      )}
      {phase === 'door' && <p className="pi-caption">One door… what’s inside? 👀</p>}
      {phase === 'open' && <p className="pi-caption">It’s open! 🎉</p>}
    </div>
  );
};
