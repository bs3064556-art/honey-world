import React from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../../data/birthdayContent';
import './HappyBirthdayBanner.css';

interface HappyBirthdayBannerProps {
  show: boolean;
}

const FLAGS = ['💗', '🎉', '✨', '🎂', '💕', '🎈', '🌟', '🎁', '💗'];

export const HappyBirthdayBanner: React.FC<HappyBirthdayBannerProps> = ({ show }) => {
  if (!show) return null;

  return (
    <motion.div
      className="hb-banner"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.15 }}
      aria-hidden="true"
    >
      <div className="hb-string" />
      <div className="hb-flags">
        {FLAGS.map((f, i) => (
          <motion.span
            key={i}
            className="hb-flag"
            style={{ ['--i' as string]: i }}
            animate={{ rotate: [ -6, 6, -6 ] }}
            transition={{ duration: 2.2 + (i % 3) * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
          >
            {f}
          </motion.span>
        ))}
      </div>
      <motion.div
        className="hb-banner-text"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 220, damping: 12 }}
      >
        <span className="hb-banner-main">Happy Birthday</span>
        <span className="hb-banner-name">{CONFIG.boyfriendName}!</span>
      </motion.div>
    </motion.div>
  );
};
