import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REEL_PHOTOS, REEL_CONTENT } from '../../data/reel';
import { VIDEO_SONG } from '../../data/music';
import { duckMusic } from '../../utils/voice';
import './BirthdayVideo.css';

const FRAME_STYLES = ['polaroid', 'gold', 'film', 'ribbon', 'heart'] as const;
type FrameStyle = (typeof FRAME_STYLES)[number];

/**
 * Creative birthday-template video: framed photos + dedicated video song.
 */
export const BirthdayVideo: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState<Set<number>>(() => new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const touchX = useRef<number | null>(null);

  const total = REEL_PHOTOS.length;
  const src = REEL_PHOTOS[index];
  const frame: FrameStyle = FRAME_STYLES[index % FRAME_STYLES.length];
  const caption = REEL_CONTENT.captions[index] ?? REEL_CONTENT.captions[0];
  const kenBurns = index % 2 === 0 ? 'kb-in' : 'kb-out';

  const go = useCallback((n: number) => {
    setIndex(((n % total) + total) % total);
  }, [total]);

  // video-only: Love Me Like You Do
  useEffect(() => {
    const audio = new Audio(VIDEO_SONG.url);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.85;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
      duckMusic(false);
    };
  }, []);

  const startVideo = () => {
    setStarted(true);
    setPlaying(true);
    duckMusic(true);
    void audioRef.current?.play().catch(() => {});
  };

  const togglePlay = () => {
    if (!started) {
      startVideo();
      return;
    }
    setPlaying(p => {
      const next = !p;
      if (next) {
        duckMusic(true);
        void audioRef.current?.play().catch(() => {});
      } else {
        audioRef.current?.pause();
        duckMusic(false);
      }
      return next;
    });
  };

  // advance frames; on last frame → stop video song, resume main song-3
  useEffect(() => {
    if (!playing || !started) return;
    const t = window.setTimeout(() => {
      if (index >= total - 1) {
        setPlaying(false);
        const a = audioRef.current;
        if (a) {
          a.pause();
          a.currentTime = 0;
        }
        duckMusic(false); // song-3 (Tum Se Hi) starts again
        return;
      }
      go(index + 1);
    }, REEL_CONTENT.frameMs);
    return () => window.clearTimeout(t);
  }, [index, playing, started, go, total]);

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

  return (
    <div className="bday-video">
      {/* floating balloons */}
      <div className="bv-balloons" aria-hidden="true">
        {['#FF8FB1', '#FFF0B5', '#D8C9F5', '#C9DDC1', '#FFB7C5'].map((c, i) => (
          <span key={i} className="bv-balloon" style={{ left: `${8 + i * 20}%`, background: c, animationDelay: `${i * 0.45}s` }} />
        ))}
      </div>

      <div className="bv-header">
        <p className="bv-chip">🎂 Birthday Special</p>
        <h1 className="bv-title">{REEL_CONTENT.heading}</h1>
        <p className="bv-sub">{REEL_CONTENT.subtitle}</p>
      </div>

      <div
        className={`bv-stage bv-frame-${frame}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* decorative frame chrome */}
        <div className="bv-ornament bv-ornament-tl" aria-hidden="true">🎀</div>
        <div className="bv-ornament bv-ornament-tr" aria-hidden="true">✨</div>

        <div className="bv-photo-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className={`bv-photo ${kenBurns}`}
              initial={{ opacity: 0, rotate: frame === 'polaroid' ? -2 : 0, y: 12 }}
              animate={{ opacity: 1, rotate: frame === 'polaroid' ? (index % 2 ? 1.5 : -1.2) : 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55 }}
            >
              {!failed.has(index) ? (
                <img
                  src={src}
                  alt={`Honey birthday memory ${index + 1}`}
                  draggable={false}
                  onError={() => setFailed(prev => new Set(prev).add(index))}
                />
              ) : (
                <div className="bv-missing">📸</div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="bv-caption font-hand">{caption}</p>
        <span className="bv-counter">{index + 1} / {total}</span>

        {/* confetti when playing */}
        {playing && (
          <div className="bv-sparkles" aria-hidden="true">
            {['✨', '🎉', '💗', '⭐', '🎈'].map((e, i) => (
              <span key={i} className="bv-spark" style={{ left: `${12 + i * 18}%`, animationDelay: `${i * 0.35}s` }}>
                {e}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bv-progress" aria-hidden="true">
        <span style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      {!started ? (
        <motion.button
          type="button"
          className="btn btn-primary bv-start"
          onClick={startVideo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          ▶️ Play Video
        </motion.button>
      ) : (
        <div className="bv-controls">
          <button type="button" className="bv-ctl" onClick={() => go(index - 1)} aria-label="Previous">◀</button>
          <button type="button" className="bv-ctl bv-ctl-main" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? '⏸' : '▶'}
          </button>
          <button type="button" className="bv-ctl" onClick={() => go(index + 1)} aria-label="Next">▶</button>
        </div>
      )}

      <p className="bv-song-note font-hand">
        {started
          ? (playing ? '🎵 Soft song on…' : 'Song paused')
          : 'Play dabao — photos + soft song 🎬💗'}
      </p>
    </div>
  );
};
