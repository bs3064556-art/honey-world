import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FINAL_REVEAL_CONTENT } from '../data/birthdayContent';
import { BloomingFlower } from '../components/final-reveal/BloomingFlower';
import { TeddyKissEnd } from '../components/final-reveal/TeddyKissEnd';
import { ClosingCurtain } from '../components/curtains/ClosingCurtain';
import { FloatingHearts } from '../components/common/FloatingHearts';
import { ProgressIndicator } from '../components/common/ProgressIndicator';
import { FlowerBg } from './shared/FlowerBg';
import type { PageId } from '../types/birthday';

interface FinalRevealPageProps {
  onNavigate?: (pageId: PageId) => void;
}

export const FinalRevealPage: React.FC<FinalRevealPageProps> = ({ onNavigate }) => {
  const [showEnd, setShowEnd] = useState(false);
  const [closeCurtain, setCloseCurtain] = useState(false);

  useEffect(() => {
    if (!showEnd) return;
    const t = window.setTimeout(() => setCloseCurtain(true), 7000);
    return () => window.clearTimeout(t);
  }, [showEnd]);

  return (
    <div className="page" style={{ background: 'var(--grad-hero)', paddingTop: 70, paddingBottom: 60, minHeight: '100dvh' }}>
      <FlowerBg />
      <FloatingHearts count={showEnd ? 10 : 6} trigger={showEnd} />
      <ProgressIndicator currentPage="final-reveal" onNavigate={onNavigate} />

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <AnimatePresence mode="wait">
          {!showEnd ? (
            <motion.div
              key="letter-flow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <div style={{ textAlign: 'center', marginBottom: 12 }}>
                <h1 className="section-heading font-display">{FINAL_REVEAL_CONTENT.teaser}</h1>
                <p
                  className="section-subheading"
                  style={{ fontFamily: 'var(--font-hand)', fontSize: '1.2rem', color: 'var(--pink-deep)' }}
                >
                  {FINAL_REVEAL_CONTENT.teaserSub}
                </p>
              </div>
              <BloomingFlower onComplete={() => setShowEnd(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="teddy-end"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              style={{ textAlign: 'center' }}
            >
              <h1
                className="section-heading font-display"
                style={{ marginBottom: 4 }}
              >
                The End
              </h1>
              <p
                className="section-subheading"
                style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: '1.2rem',
                  color: 'var(--pink-deep)',
                  marginBottom: 12,
                }}
              >
                One last heartbeat… just for you
              </p>
              <TeddyKissEnd />
              <motion.p
                className="font-hand"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{
                  marginTop: 20,
                  fontSize: '1.35rem',
                  color: '#d9567f',
                }}
              >
                Bye bye, Honey… until next time 👋💗
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {closeCurtain && <ClosingCurtain />}
    </div>
  );
};
