import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { STORY_CHAPTERS, STORY_FINALE, CHAPTER_MS } from '../data/story';
import { FlowerBg } from './shared/FlowerBg';
import { FloatingHearts } from '../components/common/FloatingHearts';
import { TreeScene } from '../components/scene/TreeScene';
import { NextArrowButton } from '../components/common/NextArrowButton';
import './StoryPage.css';

interface StoryPageProps {
  onNext: () => void;
}

const TOTAL = STORY_CHAPTERS.length + 1; // + finale

/**
 * "Humari Kahani" — memory reel (auto-plays). Tap the frame to go next.
 * No skip tab / media controls / replay.
 */
export const StoryPage: React.FC<StoryPageProps> = ({ onNext }) => {
  const [state, setState] = useState({ cur: 0, prev: -1 });
  const { cur, prev } = state;
  const isFinale = cur === TOTAL - 1;

  const go = useCallback((n: number) => {
    setState(s => (n === s.cur ? s : { cur: Math.max(0, Math.min(TOTAL - 1, n)), prev: s.cur }));
  }, []);

  useEffect(() => {
    STORY_CHAPTERS.forEach(c => {
      new Image().src = c.image;
      if (c.sprite) new Image().src = c.sprite.src;
      if (c.sticker) new Image().src = c.sticker;
    });
    new Image().src = '/images/scene/tree.png';
    new Image().src = '/images/scene/couple.png';
  }, []);

  // auto-advance (always playing)
  useEffect(() => {
    if (isFinale) return;
    const t = window.setTimeout(() => go(cur + 1), CHAPTER_MS);
    return () => window.clearTimeout(t);
  }, [cur, isFinale, go]);

  const chapter = isFinale ? null : STORY_CHAPTERS[cur];
  const prevChapter = prev >= 0 && prev < STORY_CHAPTERS.length ? STORY_CHAPTERS[prev] : null;

  const title = chapter ? chapter.title : STORY_FINALE.title;
  const caption = chapter ? chapter.caption : STORY_FINALE.caption;

  return (
    <div className="page story-page">
      <FlowerBg />
      <FloatingHearts count={5} />

      <div className="page-content story-content">
        <div className="story-bars" aria-hidden="true">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <span key={i} className={`story-bar ${i < cur ? 'done' : ''} ${i === cur ? 'active' : ''}`}>
              <span
                className="story-bar-fill"
                style={i === cur && !isFinale ? { animationDuration: `${CHAPTER_MS}ms` } : undefined}
              />
            </span>
          ))}
        </div>

        <div className="story-top">
          <span className="story-chip">
            {isFinale ? '\u2728 The End... or not?' : `\uD83C\uDF9E\uFE0F Chapter ${cur + 1} / ${STORY_CHAPTERS.length}`}
          </span>
        </div>

        <div
          className="story-frame"
          onClick={() => !isFinale && go(cur + 1)}
          role="img"
          aria-label={title}
        >
          <span className="story-tape story-tape-l" aria-hidden="true" />
          <span className="story-tape story-tape-r" aria-hidden="true" />

          <div className="story-canvas">
            {prevChapter && (
              <img key={`prev-${prev}`} className="story-img story-img-prev" src={prevChapter.image} alt="" draggable={false} />
            )}

            {chapter && (
              <div key={`scene-${cur}`} className="story-scene">
                <img className="story-img story-img-cur" src={chapter.image} alt="" draggable={false} />

                {chapter.sprite && (
                  <div className={`story-sprite story-sprite-${chapter.sprite.kind}`}>
                    <img src={chapter.sprite.src} alt="" draggable={false} />
                  </div>
                )}

                <span className="story-petal sp1" /><span className="story-petal sp2" /><span className="story-petal sp3" />
                <span className="story-petal sp4" /><span className="story-petal sp5" />
                <span className="story-heart sh1">{'\u2764\uFE0F'}</span>
                <span className="story-heart sh2">{'\uD83D\uDC97'}</span>
                <span className="story-heart sh3">{'\uD83E\uDE77'}</span>

                {chapter.sticker && (
                  <img className="story-sticker" src={chapter.sticker} alt="" draggable={false} />
                )}
              </div>
            )}

            {isFinale && (
              <div className="story-finale">
                <TreeScene play />
              </div>
            )}

            <div className="story-vignette" aria-hidden="true" />
            <div className="story-grain" aria-hidden="true" />
          </div>
        </div>

        <div key={`txt-${cur}`} className="story-text">
          <h2 className="story-title">{title}</h2>
          <p className="story-caption">{caption}</p>
        </div>

        {isFinale && (
          <motion.div
            className="story-end"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 8, duration: 0.9 }}
          >
            <NextArrowButton onClick={onNext} label="Continue" />
          </motion.div>
        )}
      </div>
    </div>
  );
};
