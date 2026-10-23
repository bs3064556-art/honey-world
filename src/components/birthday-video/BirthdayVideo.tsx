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
  const wantPlay = useRef(false);
  const blockPauseUntil = useRef(0);
  const touchX = useRef<number | null>(null);

  const total = REEL_PHOTOS.length;
  const src = REEL_PHOTOS[index];
  const frame: FrameStyle = FRAME_STYLES[index % FRAME_STYLES.length];
  const caption = REEL_CONTENT.captions[index] ?? REEL_CONTENT.captions[0];
  const kenBurns = index % 2 === 0 ? 'kb-in' : 'kb-out';

  const go = useCallback((n: number) => {
    setIndex(((n % total) + total) % total);
  }, [total]);

  const resumeSong = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !wantPlay.current) return;
    duckMusic(true);
    const start = () => {
      if (!wantPlay.current) return;
      void audio.play().catch(() => {
        if (!wantPlay.current) return;
        if (audio.error) audio.load();
        if (audio.readyState >= 2) {
          void audio.play().catch(() => {});
          return;
        }
        audio.addEventListener('canplay', () => {
          if (wantPlay.current) void audio.play().catch(() => {});
        }, { once: true });
      });
    };
    start();
  }, []);

  // If the browser pauses the song on its own, start it again.
  // A real pause clears wantPlay first, so it will not bounce back.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let lastRetry = 0;
    const onPause = () => {
      if (!wantPlay.current) return;
      const now = Date.now();
      if (now - lastRetry < 500) return;
      lastRetry = now;
      resumeSong();
    };
    audio.addEventListener('pause', onPause);
    return () => {
      wantPlay.current = false;
      audio.removeEventListener('pause', onPause);
      audio.pause();
      duckMusic(false);
    };
  }, [resumeSong]);

  const startVideo = () => {
    // The Play button is replaced by Pause under the same finger.
    // Ignore that follow-up tap so the song does not stop immediately.
    blockPauseUntil.current = Date.now() + 800;
    wantPlay.current = true;
    setStarted(true);
    setPlaying(true);
    resumeSong();
  };

  const togglePlay = () => {
    if (!started) {
      startVideo();
      return;
    }
    if (playing && Date.now() < blockPauseUntil.current) return;
    if (playing) {
      wantPlay.current = false;
      audioRef.current?.pause();
      duckMusic(false);
      setPlaying(false);
      return;
    }
    wantPlay.current = true;
    setPlaying(true);
    resumeSong();
  };

  const step = (dir: number) => {
    go(index + dir);
    // Right/left arrows keep the song going if the browser had paused it.
    if (wantPlay.current) resumeSong();
  };

  // advance frames; on last frame → stop video song, resume main song-3
  useEffect(() => {
    if (!playing || !started) return;
    const t = window.setTimeout(() => {
      if (index >= total - 1) {
        wantPlay.current = false;
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
    if (dx < 0) step(1);
    else step(-1);
  };

  return (
    <div className="bday-video">
      <audio ref={audioRef} className="bv-audio" src={VIDEO_SONG.url} loop preload="auto" />
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
          <button type="button" className="bv-ctl" onClick={() => step(-1)} aria-label="Previous">◀</button>
          <button type="button" className="bv-ctl bv-ctl-main" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? '⏸' : '▶'}
          </button>
          <button type="button" className="bv-ctl" onClick={() => step(1)} aria-label="Next">▶</button>
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
