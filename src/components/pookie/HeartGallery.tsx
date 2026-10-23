import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HEART_SURPRISES } from '../../data/birthdayContent';
import type { HeartSurprise } from '../../types/birthday';
import { SurpriseScene } from './SurpriseScenes';
import './HeartGallery.css';

export const HeartGallery: React.FC = () => {
  const [active, setActive] = useState<HeartSurprise | null>(null);
  const [opened, setOpened] = useState<Set<string>>(new Set());
  const [cracking, setCracking] = useState<string | null>(null);

  const smashHeart = (heart: HeartSurprise) => {
    if (cracking) return;
    setCracking(heart.id);
    window.setTimeout(() => {
      setOpened(prev => new Set(prev).add(heart.id));
      setActive(heart);
      setCracking(null);
    }, 520);
  };

  return (
    <>
      <div className="heart-gallery" role="list" aria-label="Mystery hearts">
        {HEART_SURPRISES.map((heart, i) => {
          const isOpened = opened.has(heart.id);
          const isCracking = cracking === heart.id;
          return (
            <motion.button
              key={heart.id}
              type="button"
              role="listitem"
              className={`heart-btn ${isOpened ? 'opened' : ''} ${isCracking ? 'cracking' : ''}`}
              onClick={() => smashHeart(heart)}
              aria-label="Tap with the hammer to break the heart"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * i, type: 'spring', stiffness: 260, damping: 16 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              <span className="heart-pulse" aria-hidden="true" />

              <span className="heart-stack" aria-hidden="true">
                <svg className="heart-svg" viewBox="0 0 32 29">
                  <path
                    d="M16 28s-14-8.5-14-17A7.5 7.5 0 0 1 16 6.2 7.5 7.5 0 0 1 30 11c0 8.5-14 17-14 17z"
                    fill={heart.tint}
                  />
                </svg>
                <span className={`heart-hammer ${isCracking ? 'swing' : ''}`}>🔨</span>
              </span>

              {isOpened && <span className="heart-check" aria-hidden="true">✦</span>}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="hs-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Heart surprise"
          >
            <motion.div
              className="hs-card"
              initial={{ scale: 0.35, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.6, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                type="button"
                className="hs-close"
                onClick={() => setActive(null)}
                aria-label="Close"
              >
                ✕
              </button>

              <div className="hs-stage">
                <SurpriseScene kind={active.kind} />
              </div>

              <motion.p
                className="hs-msg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                {active.message}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
