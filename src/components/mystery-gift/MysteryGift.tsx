import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MYSTERY_GIFT_CONTENT } from '../../data/birthdayContent';
import { FloatingHearts } from '../common/FloatingHearts';
import { PetalEffect } from '../common/PetalEffect';
import './MysteryGift.css';

interface MysteryGiftProps {
  onComplete: () => void;
}

type GiftState = 'idle' | 'opening' | 'revealed';

export const MysteryGift: React.FC<MysteryGiftProps> = ({ onComplete }) => {
  const [giftState, setGiftState] = useState<GiftState>('idle');

  const handleOpen = () => {
    if (giftState !== 'idle') return;
    setGiftState('opening');
    setTimeout(() => setGiftState('revealed'), 1400);
  };

  return (
    <div className="mystery-gift-wrapper">
      <PetalEffect active={giftState === 'opening'} count={25} />
      <FloatingHearts count={8} trigger={giftState === 'revealed'} />

      {/* Gift box illustration */}
      <div className="gift-scene" aria-label="Mystery gift box">
        <AnimatePresence mode="wait">
          {giftState !== 'revealed' ? (
            <motion.div
              key="box"
              className="gift-box-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <svg width="180" height="200" viewBox="0 0 180 200" aria-label="Pink gift box with lavender ribbon">
                {/* Lid */}
                <motion.g
                  animate={giftState === 'opening'
                    ? { y: -60, rotate: -25, opacity: 0 }
                    : { y: 0, rotate: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                  <rect x="10" y="60" width="160" height="30" rx="6" fill="#F7B8CB"/>
                  <rect x="10" y="60" width="160" height="30" rx="6" fill="url(#lidGrad)" opacity="0.5"/>
                  {/* Ribbon on lid */}
                  <rect x="82" y="55" width="16" height="40" rx="4" fill="#B39DDB"/>
                  {/* Bow */}
                  <ellipse cx="70" cy="60" rx="18" ry="11" fill="#D8C9F5" transform="rotate(-25 70 60)"/>
                  <ellipse cx="110" cy="60" rx="18" ry="11" fill="#D8C9F5" transform="rotate(25 110 60)"/>
                  <circle cx="90" cy="60" r="10" fill="#B39DDB"/>
                  {/* Stars on lid */}
                  <text x="20" y="80" fontSize="10" fill="white" opacity="0.8">✨</text>
                  <text x="148" y="83" fontSize="10" fill="white" opacity="0.8">⭐</text>
                </motion.g>

                {/* Box body */}
                <rect x="10" y="88" width="160" height="105" rx="6" fill="#FF8FB1"/>
                <defs>
                  <linearGradient id="lidGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="white" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="transparent"/>
                  </linearGradient>
                  <linearGradient id="boxGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF8FB1"/>
                    <stop offset="100%" stopColor="#E86F98"/>
                  </linearGradient>
                </defs>
                <rect x="10" y="88" width="160" height="105" rx="6" fill="url(#boxGrad)"/>
                {/* Ribbon on box */}
                <rect x="82" y="88" width="16" height="105" rx="2" fill="#B39DDB" opacity="0.8"/>
                {/* Polka dots */}
                {[30, 60, 130, 155].map((x, i) => (
                  <circle key={i} cx={x} cy={120 + i * 12} r="5" fill="white" opacity="0.25"/>
                ))}
                {/* Flowers */}
                <text x="22" y="170" fontSize="16">🌸</text>
                <text x="140" y="150" fontSize="14">🌷</text>
                <text x="50" y="185" fontSize="12">🧸</text>
                <text x="120" y="185" fontSize="12">💗</text>
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              className="gift-reveal"
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 18 }}
            >
              <div className="gift-reveal-emoji anim-bounce-in" aria-hidden="true">🎉</div>
              <h3 className="gift-reveal-title">{MYSTERY_GIFT_CONTENT.revealMessage}</h3>
              <p className="gift-reveal-msg font-hand">{MYSTERY_GIFT_CONTENT.revealSub}</p>
              <div className="gift-reveal-decorations" aria-hidden="true">
                <span className="anim-float">🌷</span>
                <span className="anim-heartbeat">💗</span>
                <span className="anim-float" style={{ animationDelay: '0.5s' }}>🧸</span>
                <span className="anim-twinkle">✨</span>
              </div>
              <button
                className="btn btn-primary"
                onClick={onComplete}
                style={{ marginTop: 16 }}
              >
                Continue Karte Hain 💗
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Open button */}
      <AnimatePresence>
        {giftState === 'idle' && (
          <motion.button
            className="btn btn-primary gift-open-btn"
            onClick={handleOpen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open the mystery gift"
          >
            {MYSTERY_GIFT_CONTENT.buttonText}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
