import React from 'react';
import { motion } from 'framer-motion';
import { MYSTERY_GIFT_CONTENT } from '../data/birthdayContent';
import { MysteryGift } from '../components/mystery-gift/MysteryGift';
import { FloatingHearts } from '../components/common/FloatingHearts';
import { ProgressIndicator } from '../components/common/ProgressIndicator';
import { FlowerBg } from './shared/FlowerBg';

import type { PageId } from '../types/birthday';

interface MysteryGiftPageProps {
  onComplete?: () => void;
  onNext: () => void;
  onNavigate?: (pageId: PageId) => void;
}

export const MysteryGiftPage: React.FC<MysteryGiftPageProps> = ({ onNext, onNavigate }) => (
  <div className="page" style={{ background: 'var(--grad-hero)', paddingTop: 60, paddingBottom: 60 }}>
    <FlowerBg />
    <FloatingHearts count={5} />
    <ProgressIndicator currentPage="mystery-gift" onNavigate={onNavigate} />

    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
        <h1 className="section-heading">{MYSTERY_GIFT_CONTENT.heading}</h1>
        <p className="section-subheading" style={{ fontFamily: 'var(--font-hand)', fontSize: '1.1rem' }}>
          {MYSTERY_GIFT_CONTENT.subheading}
        </p>
        <p className="section-subheading">{MYSTERY_GIFT_CONTENT.question}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <MysteryGift onComplete={onNext} />
      </motion.div>
    </div>
  </div>
);
