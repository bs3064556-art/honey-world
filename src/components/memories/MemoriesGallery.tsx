import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEMORIES, MEMORIES_CONTENT } from '../../data/birthdayContent';
import type { MemoryCard } from '../../types/birthday';
import './MemoriesGallery.css';

export const MemoriesGallery: React.FC = () => {
  const [lightboxCard, setLightboxCard] = useState<MemoryCard | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  // photos whose file isn't there yet → show the "add your photo" placeholder instead of a broken image
  const [failed, setFailed] = useState<string[]>([]);
  const markFailed = (id: string) => setFailed(prev => (prev.includes(id) ? prev : [...prev, id]));
  const hasPhoto = (card: MemoryCard) => Boolean(card.src) && !failed.includes(card.id);

  const openLightbox = (card: MemoryCard, index: number) => {
    setLightboxCard(card);
    setLightboxIndex(index);
  };

  const closeLightbox = React.useCallback(() => setLightboxCard(null), []);

  const prevCard = React.useCallback(() => {
    setLightboxIndex(prev => {
      const newIdx = (prev - 1 + MEMORIES.length) % MEMORIES.length;
      setLightboxCard(MEMORIES[newIdx]);
      return newIdx;
    });
  }, []);

  const nextCard = React.useCallback(() => {
    setLightboxIndex(prev => {
      const newIdx = (prev + 1) % MEMORIES.length;
      setLightboxCard(MEMORIES[newIdx]);
      return newIdx;
    });
  }, []);

  // Keyboard nav for lightbox
  React.useEffect(() => {
    if (!lightboxCard) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevCard();
      else if (e.key === 'ArrowRight') nextCard();
      else if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxCard, prevCard, nextCard, closeLightbox]);

  return (
    <div className="memories-wrapper">
      {/* Gallery */}
      <div className="polaroid-grid" role="list" aria-label="Memory photo gallery">
        {MEMORIES.map((card, i) => (
          <motion.button
            key={card.id}
            className="polaroid-card"
            style={{ '--rotation': `${card.rotation ?? 0}deg` } as React.CSSProperties}
            onClick={() => openLightbox(card, i)}
            role="listitem"
            aria-label={`Photo: ${card.caption}`}
            initial={{ opacity: 0, y: 20, rotate: card.rotation ?? 0 }}
            animate={{ opacity: 1, y: 0, rotate: card.rotation ?? 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Photo area */}
            <div className="polaroid-photo">
              {hasPhoto(card) ? (
                <img
                  src={card.src}
                  alt={card.alt}
                  loading="lazy"
                  className="polaroid-img"
                  onError={() => markFailed(card.id)}
                />
              ) : (
                <div className="polaroid-placeholder" aria-label="Photo placeholder — add your photo here">
                  <div className="placeholder-icon">📸</div>
                  <p className="placeholder-text">Photo {i + 1}<br />yahan aayegi</p>
                </div>
              )}
              <div className="polaroid-flower">{card.subCaption}</div>
            </div>
            {/* Caption */}
            <p className="polaroid-caption font-hand">{card.caption}</p>
          </motion.button>
        ))}
      </div>

      {/* Bottom message */}
      <div className="memories-footer card card-pink" style={{ marginTop: 16 }}>
        <p className="font-hand" style={{ fontSize: '1.1rem', color: 'var(--text-main)', textAlign: 'center', lineHeight: 1.6 }}>
          {MEMORIES_CONTENT.bottomMessage}
        </p>
        <p style={{ textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
          {MEMORIES_CONTENT.bottomSub}
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxCard && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo: ${lightboxCard.caption}`}
          >
            <motion.div
              className="lightbox-card"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="lightbox-photo">
                {hasPhoto(lightboxCard) ? (
                  <img
                    src={lightboxCard.src}
                    alt={lightboxCard.alt}
                    className="lightbox-img"
                    onError={() => markFailed(lightboxCard.id)}
                  />
                ) : (
                  <div className="lightbox-placeholder">
                    <span className="lightbox-placeholder-icon">📸</span>
                    <p>Photo {lightboxIndex + 1} — save it as<br /><code>public/images/gallery/photo-{lightboxIndex + 1}.jpg</code></p>
                  </div>
                )}
              </div>
              <p className="lightbox-caption font-hand">{lightboxCard.caption}</p>

              {/* Nav */}
              <div className="lightbox-nav">
                <button className="btn btn-secondary lightbox-prev" onClick={prevCard} aria-label="Previous photo">←</button>
                <span className="lightbox-counter">{lightboxIndex + 1} / {MEMORIES.length}</span>
                <button className="btn btn-secondary lightbox-next" onClick={nextCard} aria-label="Next photo">→</button>
              </div>

              <button className="lightbox-close" onClick={closeLightbox} aria-label="Close photo">✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
