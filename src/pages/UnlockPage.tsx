import React from 'react';
import { motion } from 'framer-motion';
import { PatternLock } from '../components/pattern-lock/PatternLock';
import { FloatingHearts } from '../components/common/FloatingHearts';
import { ProgressIndicator } from '../components/common/ProgressIndicator';
import { FlowerBg } from './shared/FlowerBg';

import type { PageId } from '../types/birthday';

interface UnlockPageProps {
  onNext: () => void;
  onNavigate?: (pageId: PageId) => void;
}

export const UnlockPage: React.FC<UnlockPageProps> = ({ onNext, onNavigate }) => (
  <div className="page" style={{ background: 'var(--grad-hero)' }}>
    <FlowerBg />
    <FloatingHearts count={5} />
    <ProgressIndicator currentPage="unlock" onNavigate={onNavigate} />

    <div className="page-content">
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <PatternLock onUnlocked={onNext} />
      </motion.div>
    </div>
  </div>
);
