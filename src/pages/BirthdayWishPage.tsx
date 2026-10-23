import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG, getHoneyAge } from '../data/birthdayContent';
import { BirthdayCake } from '../components/birthday/BirthdayCake';
import { BirthdayCalendar } from '../components/birthday/BirthdayCalendar';
import { HappyBirthdayBanner } from '../components/birthday/HappyBirthdayBanner';
import { PartyBalloons } from '../components/birthday/PartyBalloons';
import { FloatingHearts } from '../components/common/FloatingHearts';
import { ProgressIndicator } from '../components/common/ProgressIndicator';
import { FlowerBg } from './shared/FlowerBg';
import { NextArrowButton } from '../components/common/NextArrowButton';
import { playBalloonPop } from '../utils/popSound';
import type { PageId } from '../types/birthday';
import './BirthdayWishPage.css';

interface BirthdayWishPageProps {
  onNext: () => void;
  onNavigate?: (pageId: PageId) => void;
}

type Phase = 'ready' | 'countdown' | 'balloons' | 'reveal';

const GATE_BALLOONS = [
  { e: '🎈', l: '6%', t: '12%', s: 2.2, d: 0 },
  { e: '💗', l: '78%', t: '8%', s: 1.8, d: 0.1 },
  { e: '🎈', l: '18%', t: '38%', s: 2.6, d: 0.15 },
  { e: '🎈', l: '62%', t: '28%', s: 2.4, d: 0.05 },
  { e: '💛', l: '42%', t: '14%', s: 1.6, d: 0.2 },
  { e: '🎈', l: '84%', t: '42%', s: 2.1, d: 0.12 },
  { e: '💜', l: '8%', t: '58%', s: 1.7, d: 0.18 },
  { e: '🎈', l: '52%', t: '52%', s: 2.8, d: 0.08 },
  { e: '🎈', l: '28%', t: '68%', s: 2.0, d: 0.22 },
  { e: '🩷', l: '70%', t: '66%', s: 1.9, d: 0.14 },
  { e: '🎈', l: '88%', t: '72%', s: 2.3, d: 0.06 },
  { e: '🎈', l: '12%', t: '82%', s: 2.1, d: 0.16 },
];

export const BirthdayWishPage: React.FC<BirthdayWishPageProps> = ({ onNext, onNavigate }) => {
  const [phase, setPhase] = useState<Phase>('ready');
  const [count, setCount] = useState(3);
  const [isBlownOut, setIsBlownOut] = useState(false);
  const age = useMemo(() => getHoneyAge(), []);

  useEffect(() => {
    if (phase !== 'countdown') return;
    if (count > 0) {
      const t = window.setTimeout(() => setCount(c => c - 1), 900);
      return () => window.clearTimeout(t);
    }
    setPhase('balloons');
  }, [phase, count]);

  const startSurprise = () => {
    setCount(3);
    setPhase('countdown');
  };

  const openParty = () => {
    playBalloonPop(1.1);
    window.setTimeout(() => playBalloonPop(0.95), 120);
    window.setTimeout(() => playBalloonPop(1.2), 240);
    setPhase('reveal');
  };

  const celebrating = phase === 'reveal';

  return (
    <div className={`page bday-surprise-page ${celebrating ? 'is-party' : ''}`} style={{ paddingTop: 60, paddingBottom: 60 }}>
      <FlowerBg />
      <FloatingHearts count={celebrating ? 10 : 4} trigger={celebrating} />
      <ProgressIndicator currentPage="birthday-wish" onNavigate={onNavigate} />

      <div className="page-content bday-surprise-content">
        <AnimatePresence mode="wait">
          {phase === 'ready' && (
            <motion.div
              key="ready"
              className="bs-ready"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <p className="bs-chip">🎂 Honey&apos;s special day</p>
              <h1 className="bs-title">Today is all yours</h1>
              <p className="bs-sub font-hand">
                Tap the glowing date on the calendar — then the magic begins ✨
              </p>
              <p className="bs-dob font-hand">
                DOB · 2 Nov {CONFIG.birthYear} · year <strong>{age}</strong> begins 🕯️
              </p>
              <BirthdayCalendar interactive onBirthdayClick={startSurprise} />
            </motion.div>
          )}

          {phase === 'countdown' && (
            <motion.div
              key={`count-${count}`}
              className="bs-countdown"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            >
              <span className="bs-count-num">{count > 0 ? count : '🎉'}</span>
              <p className="bs-count-hint font-hand">{count > 0 ? 'Get ready…' : 'Go!'}</p>
            </motion.div>
          )}

          {phase === 'balloons' && (
            <motion.div
              key="balloons"
              className="bs-balloon-gate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {GATE_BALLOONS.map((b, i) => (
                <motion.span
                  key={i}
                  className="bs-gate-balloon"
                  style={{ left: b.l, top: b.t, fontSize: `${b.s}rem` }}
                  animate={{ y: [0, -12, 0], rotate: [-4, 4, -4] }}
                  transition={{ duration: 2.4 + (i % 4) * 0.2, repeat: Infinity, delay: b.d, ease: 'easeInOut' }}
                >
                  {b.e}
                </motion.span>
              ))}
              <div className="bs-gate-card">
                <p className="bs-gate-eyebrow">Balloons ready…</p>
                <h2 className="bs-gate-title font-hand">Shall we start the party?</h2>
                <p className="bs-gate-sub font-hand">
                  Cake, candles, and love for year {age} 💗
                </p>
                <button type="button" className="bs-gate-btn" onClick={openParty}>
                  Open 🎈
                </button>
              </div>
            </motion.div>
          )}

          {phase === 'reveal' && (
            <motion.div
              key="stage"
              className="bs-stage"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <HappyBirthdayBanner show />

              <div className="bs-reveal is-open">
                <p className="bs-hb-sub font-hand">
                  My Honey… year {age} starts with you 💗
                </p>
                <p className="bs-dob-pill font-hand">Born 2 Nov {CONFIG.birthYear}</p>
                <BirthdayCake
                  candleCount={age}
                  onWishMade={() => setIsBlownOut(true)}
                  isBlownOut={isBlownOut}
                />
                <p className="bs-pop-hint font-hand">Tap the balloons — pop! 💥</p>
              </div>

              <PartyBalloons active />

              <div className="bs-confetti" aria-hidden="true">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span
                    key={i}
                    className="bs-confetti-piece"
                    style={{
                      left: `${6 + (i * 5.2) % 90}%`,
                      animationDelay: `${(i % 9) * 0.18}s`,
                      background: ['#ff6b9d', '#fff0b5', '#d8c9f5', '#ff8fb1', '#c9ddc1'][i % 5],
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {celebrating && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}
          >
            <NextArrowButton onClick={onNext} label="Continue" />
          </motion.div>
        )}
      </div>
    </div>
  );
};
