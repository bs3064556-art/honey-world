import React from 'react';
import { motion } from 'framer-motion';
import { LOVE_NOTES_CONTENT } from '../data/birthdayContent';
import { LoveNotesGallery } from '../components/love-notes/LoveNotesGallery';
import { FloatingHearts } from '../components/common/FloatingHearts';
import { ProgressIndicator } from '../components/common/ProgressIndicator';
import { FlowerBg } from './shared/FlowerBg';
import { NextArrowButton } from '../components/common/NextArrowButton';

import type { PageId } from '../types/birthday';

interface LoveNotesPageProps {
  openedHearts: string[];
  onHeartOpen: (id: string) => void;
  onNext: () => void;
  onNavigate?: (pageId: PageId) => void;
}

export const LoveNotesPage: React.FC<LoveNotesPageProps> = ({ openedHearts, onHeartOpen, onNext, onNavigate }) => (
  <div className="page" style={{ background: 'var(--grad-hero)', paddingTop: 60, paddingBottom: 60 }}>
    <FlowerBg />
    <FloatingHearts count={5} />
    <ProgressIndicator currentPage="love-notes" onNavigate={onNavigate} />

    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
        <h1 className="section-heading">{LOVE_NOTES_CONTENT.heading}</h1>
        <p className="section-subheading" style={{ marginBottom: 4 }}>{LOVE_NOTES_CONTENT.subtitle}</p>
        <p className="section-subheading" style={{ marginBottom: 4 }}>{LOVE_NOTES_CONTENT.subtitle2}</p>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', textAlign: 'center' }}>
          {LOVE_NOTES_CONTENT.instruction}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <LoveNotesGallery openedHearts={openedHearts} onHeartOpen={onHeartOpen} />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        <NextArrowButton onClick={onNext} label="See Memories" />
      </motion.div>
    </div>
  </div>
);
