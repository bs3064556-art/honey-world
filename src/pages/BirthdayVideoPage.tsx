import React from 'react';
import { motion } from 'framer-motion';
import { BirthdayVideo } from '../components/birthday-video/BirthdayVideo';
import { FloatingHearts } from '../components/common/FloatingHearts';
import { ProgressIndicator } from '../components/common/ProgressIndicator';
import { FlowerBg } from './shared/FlowerBg';
import { NextArrowButton } from '../components/common/NextArrowButton';
import type { PageId } from '../types/birthday';

interface BirthdayVideoPageProps {
  onNext: () => void;
  onNavigate?: (pageId: PageId) => void;
}

export const BirthdayVideoPage: React.FC<BirthdayVideoPageProps> = ({ onNext, onNavigate }) => (
  <div
    className="page"
    style={{
      background: 'radial-gradient(ellipse at 50% 20%, #fff6ec 0%, #ffe0d4 45%, #f9c8c0 100%)',
      paddingTop: 60,
      paddingBottom: 60,
      minHeight: '100dvh',
    }}
  >
    <FlowerBg />
    <FloatingHearts count={5} />
    <ProgressIndicator currentPage="birthday-video" onNavigate={onNavigate} />

    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%' }}
      >
        <BirthdayVideo />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <NextArrowButton onClick={onNext} label="Continue" />
      </motion.div>
    </div>
  </div>
);
