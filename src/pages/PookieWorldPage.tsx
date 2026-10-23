import React from 'react';
import { motion } from 'framer-motion';
import { POOKIE_WORLD_CONTENT } from '../data/birthdayContent';
import { HeartGallery } from '../components/pookie/HeartGallery';
import { FloatingHearts } from '../components/common/FloatingHearts';
import { ProgressIndicator } from '../components/common/ProgressIndicator';
import { FlowerBg } from './shared/FlowerBg';
import { NextArrowButton } from '../components/common/NextArrowButton';

import type { PageId } from '../types/birthday';

interface PookieWorldPageProps {
  onNext: () => void;
  onNavigate?: (pageId: PageId) => void;
}

export const PookieWorldPage: React.FC<PookieWorldPageProps> = ({ onNext, onNavigate }) => (
  <div className="page" style={{ background: 'var(--grad-hero)', minHeight: '100dvh', paddingTop: 60, paddingBottom: 60 }}>
    <FlowerBg />
    <FloatingHearts count={6} />
    <ProgressIndicator currentPage="pookie-world" onNavigate={onNavigate} />

    <div className="page-content">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 24 }}
      >
        <h1 className="section-heading">{POOKIE_WORLD_CONTENT.heading}</h1>
        <p className="section-subheading" style={{ marginBottom: 4 }}>{POOKIE_WORLD_CONTENT.subtitle}</p>
        <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.05rem', color: 'var(--pink-deep)', textAlign: 'center' }}>
          {POOKIE_WORLD_CONTENT.rule1}
        </p>
        <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.05rem', color: 'var(--pink-deep)', textAlign: 'center' }}>
          {POOKIE_WORLD_CONTENT.rule2}
        </p>
        <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.05rem', color: 'var(--pink-deep)', textAlign: 'center', marginBottom: 8 }}>
          {POOKIE_WORLD_CONTENT.rule3}
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', textAlign: 'center', marginBottom: 16 }}>
          {POOKIE_WORLD_CONTENT.hint}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <HeartGallery />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}
      >
        <NextArrowButton onClick={onNext} label="Continue" />
      </motion.div>
    </div>
  </div>
);
