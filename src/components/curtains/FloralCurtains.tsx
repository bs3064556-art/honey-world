import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CURTAIN_CONTENT } from '../../data/birthdayContent';
import { PetalEffect } from '../common/PetalEffect';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { HorrorIntro } from './HorrorIntro';
import './FloralCurtains.css';

interface FloralCurtainsProps {
  /** true once curtains are parting */
  isOpening: boolean;
  /** Honey dismissed horror — start music (user gesture) */
  onHorrorTap: () => void;
  /** start parting left/right after flowers land */
  onOpenClick: () => void;
  /** curtain animation finished, safe to unmount */
  onDone: () => void;
}

const ROSE_IMAGES = [1, 2, 3, 4, 5, 6].map(n => `/images/roses/rose-${n}.png`);

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface RosePlacement { x: number; y: number; d: number; r: number; img: number; delay: number }

/** slower rain so opening feels cinematic */
const RAIN_SECONDS = 5.2;
const ROSE_SEED = 42;
/** slower curtain parting across the screen */
const OPEN_SECONDS = 4.6;

function buildRoses(w: number, h: number, seed: number): RosePlacement[] {
  const rand = mulberry32(seed);
  const base = w < 360 ? 74 : w < 600 ? 88 : 108;
  const step = base * 0.7;
  const cols = Math.ceil(w / step) + 2;
  const rows = Math.ceil(h / step) + 2;
  const out: RosePlacement[] = [];
  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const rowShift = row % 2 ? step * 0.5 : 0;
      out.push({
        x: col * step + rowShift + (rand() - 0.5) * step * 0.5,
        y: row * step + (rand() - 0.5) * step * 0.5,
        d: base * (0.9 + rand() * 0.55),
        r: rand() * 360,
        img: Math.floor(rand() * ROSE_IMAGES.length),
        delay: (1 - Math.min(1, Math.max(0, (row * step) / h))) * 3.4 + rand() * 0.65,
      });
    }
  }
  return out.sort((a, b) => a.y - b.y);
}

export const ContinuousRoses: React.FC<{ fullW: number; h: number }> = ({ fullW, h }) => {
  const roses = useMemo(() => buildRoses(fullW, h, ROSE_SEED), [fullW, h]);
  return (
    <div className="curtain-roses" aria-hidden="true" style={{ width: fullW }}>
      {roses.map((r, i) => (
        <img
          key={i}
          src={ROSE_IMAGES[r.img]}
          alt=""
          draggable={false}
          className="curtain-rose"
          style={{
            width: r.d,
            height: r.d,
            left: r.x - r.d / 2,
            top: r.y - r.d / 2,
            ['--r' as string]: `${r.r.toFixed(0)}deg`,
            animationDelay: `${r.delay.toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
};

const useViewport = () => {
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
};

export const FloralCurtains: React.FC<FloralCurtainsProps> = ({
  isOpening,
  onHorrorTap,
  onOpenClick,
  onDone,
}) => {
  const prefersReduced = useReducedMotion();
  const { w, h } = useViewport();
  const [horrorDone, setHorrorDone] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);

  const doneRef = useRef(onDone);
  useEffect(() => { doneRef.current = onDone; }, [onDone]);
  const openClickRef = useRef(onOpenClick);
  useEffect(() => { openClickRef.current = onOpenClick; }, [onOpenClick]);

  useEffect(() => {
    let cancelled = false;
    const finish = () => { if (!cancelled) setAssetsReady(true); };
    const timer = window.setTimeout(finish, 4000);
    Promise.all(
      ROSE_IMAGES.map(src => new Promise<void>(resolve => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      })),
    ).then(() => { window.clearTimeout(timer); finish(); });
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, []);

  const raining = horrorDone && assetsReady;
  const duration = prefersReduced ? 0.35 : OPEN_SECONDS;

  useEffect(() => {
    if (!isOpening) return;
    const t = window.setTimeout(() => doneRef.current(), duration * 1000 + 500);
    return () => window.clearTimeout(t);
  }, [isOpening, duration]);

  const [canTapOpen, setCanTapOpen] = useState(false);

  // After flower rain lands → show tap button (Honey must click)
  useEffect(() => {
    if (!raining || isOpening) return;
    const wait = prefersReduced ? 400 : (RAIN_SECONDS + 0.5) * 1000;
    const t = window.setTimeout(() => setCanTapOpen(true), wait);
    return () => window.clearTimeout(t);
  }, [raining, isOpening, prefersReduced]);

  const handleHorrorTap = () => {
    setHorrorDone(true);
    onHorrorTap();
  };

  const handleOpenTap = () => {
    if (!canTapOpen || isOpening) return;
    openClickRef.current();
  };

  const ease = [0.55, 0.05, 0.25, 1] as [number, number, number, number];

  return (
    <div
      className={`curtain-scene ${isOpening ? 'is-opening' : ''} ${raining ? 'is-raining' : ''} ${!horrorDone ? 'is-horror' : ''}`}
      aria-label="Surprise curtain"
    >
      <AnimatePresence>
        {!horrorDone && (
          <motion.div
            key="horror"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            style={{ position: 'absolute', inset: 0, zIndex: 60 }}
          >
            <HorrorIntro onTap={handleHorrorTap} />
          </motion.div>
        )}
      </AnimatePresence>

      <PetalEffect active={isOpening} count={26} />

      <motion.div
        className="curtain curtain-left"
        initial={false}
        animate={{ x: isOpening ? '-105%' : '0%' }}
        transition={isOpening ? { duration, ease, delay: 0.2 } : { duration: 0 }}
      >
        <ContinuousRoses fullW={w} h={h} />
      </motion.div>

      <motion.div
        className="curtain curtain-right"
        initial={false}
        animate={{ x: isOpening ? '105%' : '0%' }}
        transition={isOpening ? { duration, ease, delay: 0.2 } : { duration: 0 }}
      >
        <ContinuousRoses fullW={w} h={h} />
      </motion.div>

      {horrorDone && (
        <motion.div
          className="curtain-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isOpening ? { opacity: 0, scale: 0.85 } : raining ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={isOpening ? { duration: 0.5 } : { delay: prefersReduced ? 0.2 : RAIN_SECONDS * 0.4, duration: 0.8 }}
        >
          <p className="curtain-teaser font-hand">{CURTAIN_CONTENT.teaser}</p>
          {canTapOpen && !isOpening && (
            <motion.button
              type="button"
              className="curtain-tap-btn"
              onClick={handleOpenTap}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Tap to open"
            >
              <span className="curtain-tap-icon" aria-hidden="true">👆</span>
              <span>Tap to open</span>
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
};
