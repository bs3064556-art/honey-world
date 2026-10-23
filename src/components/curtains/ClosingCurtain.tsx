import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ContinuousRoses } from './FloralCurtains';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './FloralCurtains.css';
import './ClosingCurtain.css';

const CLOSE_SECONDS = 4.6;

/**
 * Same rose curtain as the opening, closing back together.
 * The girl sticker stands in the middle, the way the rest of the app draws her.
 */
export const ClosingCurtain: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  const [closed, setClosed] = useState(prefersReduced);
  const duration = prefersReduced ? 0.35 : CLOSE_SECONDS;
  const ease = [0.55, 0.05, 0.25, 1] as [number, number, number, number];

  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="curtain-scene is-settled is-closing" aria-label="She closes the curtain">
      <motion.div
        className="curtain curtain-left"
        initial={{ x: '-105%' }}
        animate={{ x: '0%' }}
        transition={{ duration, ease, delay: prefersReduced ? 0 : 0.45 }}
        onAnimationComplete={() => setClosed(true)}
      >
        <ContinuousRoses fullW={size.w} h={size.h} />
      </motion.div>

      <motion.div
        className="curtain curtain-right"
        initial={{ x: '105%' }}
        animate={{ x: '0%' }}
        transition={{ duration, ease, delay: prefersReduced ? 0 : 0.45 }}
      >
        <ContinuousRoses fullW={size.w} h={size.h} />
      </motion.div>

      <div className="close-girl-wrap">
        <motion.img
          className="close-girl"
          src="/images/stickers/anime-4.png"
          alt=""
          draggable={false}
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
          transition={{
            opacity: { duration: 0.6 },
            scale: { duration: 0.6 },
            y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
          }}
        />
        <motion.p
          className="curtain-teaser font-hand"
          initial={{ opacity: 0, y: 10 }}
          animate={closed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6 }}
        >
          The End
        </motion.p>
      </div>
    </div>
  );
};
