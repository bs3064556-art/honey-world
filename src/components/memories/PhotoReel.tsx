import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REEL_PHOTOS, REEL_CONTENT } from '../../data/reel';
import './PhotoReel.css';

/**
 * Photo collection that plays like a video — auto-advances through every Honey photo.
 */
export const PhotoReel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [failed, setFailed] = useState<Set<number>>(() => new Set());
  const touchX = useRef<number | null>(null);

  const total = REEL_PHOTOS.length;
  const src = REEL_PHOTOS[index];

  const go = useCallback((n: number) => {
    setIndex(((n % total) + total) % total);
  }, [total]);

  // autoplay like a video
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => go(index + 1), REEL_CONTENT.frameMs);
    return () => window.clearTimeout(t);
  }, [index, playing, go]);

  // preload next few frames
  useEffect(() => {
    for (let i = 1; i <= 3; i++) {
      const img = new Image();
      img.src = REEL_PHOTOS[(index + i) % total];
    }
  }, [index, total]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) go(index + 1);
    else go(index - 1);
  };

  const progress = ((index + 1) / total) * 100;

  return (
    <div className="photo-reel">
      <div className="pr-top">
        <h2 className="pr-heading">{REEL_CONTENT.heading}</h2>
        <p className="pr-sub">{REEL_CONTENT.subtitle}</p>
      </div>

      <div
        className="pr-stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="img"
        aria-label={`Memory video frame ${index + 1} of ${total}`}
      >
        {/* film progress ticks */}
        <div className="pr-bars" aria-hidden="true">
          {Array.from({ length: Math.min(total, 24) }).map((_, i) => {
            const chunk = Math.floor((index / total) * Math.min(total, 24));
            return <span key={i} className={`pr-bar ${i <= chunk ? 'on' : ''}`} />;
          })}
        </div>

        <div className="pr-frame">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="pr-slide"
              initial={{ opacity: 0, scale: 1.06, x: 18 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -18 }}
              transition={{ duration: 0.55, ease: [0.4, 0.1, 0.2, 1] }}
            >
              {!failed.has(index) ? (
                <img
                  src={src}
                  alt={`Honey memory ${index + 1}`}
                  className="pr-img"
                  draggable={false}
                  onError={() => setFailed(prev => new Set(prev).add(index))}
                />
              ) : (
                <div className="pr-missing">📸</div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="pr-vignette" aria-hidden="true" />
          <div className="pr-grain" aria-hidden="true" />

          <span className="pr-counter">{index + 1} / {total}</span>
        </div>

        <div className="pr-progress" aria-hidden="true">
          <span className="pr-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="pr-controls">
        <button type="button" className="pr-ctl" onClick={() => go(index - 1)} aria-label="Previous photo">
          ◀
        </button>
        <button
          type="button"
          className="pr-ctl pr-ctl-main"
          onClick={() => setPlaying(p => !p)}
          aria-label={playing ? 'Pause video' : 'Play video'}
        >
          {playing ? '⏸' : '▶'}
        </button>
        <button type="button" className="pr-ctl" onClick={() => go(index + 1)} aria-label="Next photo">
          ▶
        </button>
      </div>

      <p className="pr-hint font-hand">Swipe or use buttons · autoplay is on 💕</p>
    </div>
  );
};
