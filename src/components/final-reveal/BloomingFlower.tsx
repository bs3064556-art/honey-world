import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FINAL_REVEAL_CONTENT } from '../../data/birthdayContent';
import { FloatingHearts } from '../common/FloatingHearts';
import { PetalEffect } from '../common/PetalEffect';
import './BloomingFlower.css';

interface BloomingFlowerProps {
  onComplete?: () => void;
}

type RevealState = 'closed' | 'blooming' | 'letter' | 'hug' | 'done';

const letterParts = FINAL_REVEAL_CONTENT.loveLetter.split(/\n\s*\n/);
const letterTitle = letterParts[0];
const letterSignoff = letterParts[letterParts.length - 1];
const letterBody = letterParts.slice(1, -1);

export const BloomingFlower: React.FC<BloomingFlowerProps> = ({ onComplete }) => {
  const [state, setState] = useState<RevealState>('closed');

  const handleBloom = () => {
    setState('blooming');
    setTimeout(() => setState('letter'), 1800);
  };

  const handleHug = () => {
    setState('hug');
    setTimeout(() => { setState('done'); onComplete?.(); }, 2500);
  };


  return (
    <div className="blooming-wrapper">
      <FloatingHearts count={6} trigger={state === 'letter'} />
      <PetalEffect active={state === 'blooming'} count={30} />

      <AnimatePresence mode="wait">
        {/* CLOSED BUD */}
        {state === 'closed' && (
          <motion.div
            key="bud"
            className="flower-bud-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ y: { repeat: Infinity, duration: 3, ease: 'easeInOut' } }}
          >
            <img className="flower-bud-rose" src="/images/roses/rose-3.png" alt="A rose waiting to bloom" draggable={false} />

            <button
              className="btn btn-primary bloom-btn"
              onClick={handleBloom}
              aria-label="Open your last surprise — bloom the flower"
            >
              {FINAL_REVEAL_CONTENT.buttonText}
            </button>
          </motion.div>
        )}

        {/* BLOOMING ANIMATION */}
        {state === 'blooming' && (
          <motion.div
            key="blooming"
            className="flower-blooming-container"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            aria-label="Flower blooming"
          >
            <motion.img
              className="flower-bloom-rose"
              src="/images/roses/rose-3.png"
              alt=""
              draggable={false}
              initial={{ scale: 0.35, rotate: -40, opacity: 0.4 }}
              animate={{ scale: 1.25, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}

        {/* LOVE LETTER */}
        {(state === 'letter' || state === 'hug' || state === 'done') && (
          <motion.div
            key="letter"
            className="love-letter-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* The old-paper letter */}
            <div className="vintage-letter">
              <span className="letter-tape letter-tape-l" aria-hidden="true" />
              <span className="letter-tape letter-tape-r" aria-hidden="true" />
              <img className="letter-dried-roses" src="/images/deco/dried-roses.png" alt="" aria-hidden="true" draggable={false} />
              <span className="letter-note letter-note-a" aria-hidden="true">{'\u266B'}</span>
              <span className="letter-note letter-note-b" aria-hidden="true">{'\u266A'}</span>
              <span className="letter-note letter-note-c" aria-hidden="true">{'\u266A'}</span>

              <h2 className="letter-title" style={{ animationDelay: '0.4s' }}>{letterTitle}</h2>

              {letterBody.map((para, i) => (
                <p key={i} className="letter-para" style={{ animationDelay: `${1.3 + i * 1.1}s` }}>
                  {para}
                </p>
              ))}

              <p className="letter-signoff" style={{ animationDelay: `${1.3 + letterBody.length * 1.1}s` }}>
                {letterSignoff}
              </p>

              <span
                className="letter-seal"
                aria-hidden="true"
                style={{ animationDelay: `${2 + letterBody.length * 1.1}s` }}
              >
                {'\u2665'}
              </span>
            </div>

            {/* Hug button */}
            <AnimatePresence>
              {state === 'letter' && (
                <motion.button
                  className="btn btn-primary hug-btn"
                  onClick={handleHug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: 2.6 + letterBody.length * 1.1 }}
                >
                  {FINAL_REVEAL_CONTENT.hugButtonText}
                </motion.button>
              )}
            </AnimatePresence>

            {/* Hug teddy */}
            <AnimatePresence>
              {(state === 'hug' || state === 'done') && (
                <motion.div
                  className="hug-teddy"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 250 }}
                  role="img"
                  aria-label="Teddy bear hugging a heart"
                >
                  <svg width="120" height="110" viewBox="0 0 120 110">
                    <circle cx="20" cy="20" r="14" fill="#F7B8CB"/>
                    <circle cx="20" cy="20" r="9" fill="#FFD7C2"/>
                    <circle cx="100" cy="20" r="14" fill="#F7B8CB"/>
                    <circle cx="100" cy="20" r="9" fill="#FFD7C2"/>
                    <ellipse cx="60" cy="82" rx="30" ry="24" fill="#F7B8CB"/>
                    <circle cx="60" cy="48" r="30" fill="#FFD7C2"/>
                    <circle cx="50" cy="44" r="5" fill="#5B3A48"/>
                    <circle cx="70" cy="44" r="5" fill="#5B3A48"/>
                    <circle cx="51" cy="43" r="2" fill="white"/>
                    <circle cx="71" cy="43" r="2" fill="white"/>
                    <path d="M 46 44 Q 50 40 54 44" stroke="#5B3A48" strokeWidth="2" fill="none"/>
                    <path d="M 66 44 Q 70 40 74 44" stroke="#5B3A48" strokeWidth="2" fill="none"/>
                    <path d="M 51 58 Q 60 66 69 58" stroke="#E86F98" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <ellipse cx="42" cy="60" rx="8" ry="5" fill="#FF8FB1" opacity="0.5"/>
                    <ellipse cx="78" cy="60" rx="8" ry="5" fill="#FF8FB1" opacity="0.5"/>
                    <path d="M 32 78 Q 40 90 60 92 Q 80 90 88 78" stroke="#F7B8CB" strokeWidth="8" fill="none" strokeLinecap="round"/>
                    <text x="46" y="100" fontSize="22">❤️</text>
                  </svg>
                  <p className="hug-final-msg font-hand">{FINAL_REVEAL_CONTENT.afterHugMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
