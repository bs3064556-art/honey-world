import React from 'react';
import { motion } from 'framer-motion';
import { MEMORIES_CONTENT } from '../data/birthdayContent';
import { MemoriesGallery } from '../components/memories/MemoriesGallery';
import { FloatingHearts } from '../components/common/FloatingHearts';
import { ProgressIndicator } from '../components/common/ProgressIndicator';
import { FlowerBg } from './shared/FlowerBg';
import { NextArrowButton } from '../components/common/NextArrowButton';

import type { PageId } from '../types/birthday';

interface MemoriesPageProps {
  onNext: () => void;
  onNavigate?: (pageId: PageId) => void;
}

export const MemoriesPage: React.FC<MemoriesPageProps> = ({ onNext, onNavigate }) => (
  <div className="page" style={{ background: 'var(--grad-hero)', paddingTop: 60, paddingBottom: 60 }}>
    <FlowerBg />
    <FloatingHearts count={4} />
    <ProgressIndicator currentPage="memories" onNavigate={onNavigate} />

    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
        <h1 className="section-heading">{MEMORIES_CONTENT.heading}</h1>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <MemoriesGallery />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ display: 'flex', justifyContent: 'center' }}>
        <NextArrowButton onClick={onNext} label="Watch Birthday Video" />
      </motion.div>
    </div>
  </div>
);
