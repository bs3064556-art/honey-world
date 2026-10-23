import React from 'react';
import { motion } from 'framer-motion';
import { POOKIE_METER_CONTENT } from '../data/birthdayContent';
import { PookieMeter } from '../components/pookie-meter/PookieMeter';
import { FloatingHearts } from '../components/common/FloatingHearts';
import { ProgressIndicator } from '../components/common/ProgressIndicator';
import { FlowerBg } from './shared/FlowerBg';
import { NextArrowButton } from '../components/common/NextArrowButton';
import type { PageId } from '../types/birthday';

interface PookieMeterPageProps {
  onNext: () => void;
  onNavigate?: (pageId: PageId) => void;
}

export const PookieMeterPage: React.FC<PookieMeterPageProps> = ({ onNext, onNavigate }) => {
  return (
    <div className="page" style={{ background: 'var(--grad-hero)', paddingTop: 70, paddingBottom: 60 }}>
      <FlowerBg />
      <FloatingHearts count={6} />
      <ProgressIndicator currentPage="pookie-meter" onNavigate={onNavigate} />

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <h1 className="section-heading">{POOKIE_METER_CONTENT.heading}</h1>
          <p className="section-subheading" style={{ fontFamily: 'var(--font-hand)', fontSize: '1.1rem', marginBottom: 6 }}>
            Watch the blush load all the way up! 🤭🎀
          </p>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PookieMeter />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}
        >
          <NextArrowButton onClick={onNext} label="See Final Surprise" />
        </motion.div>
      </div>
    </div>
  );
};
