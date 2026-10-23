import React from 'react';
import { motion } from 'framer-motion';
import { WELCOME_CONTENT } from '../data/birthdayContent';
import { FlowerBg } from './shared/FlowerBg';
import { FloatingHearts } from '../components/common/FloatingHearts';
import { TreeScene } from '../components/scene/TreeScene';
import { RoseRain } from '../components/scene/RoseRain';
import { NextArrowButton } from '../components/common/NextArrowButton';

interface WelcomePageProps {
  /** true once the rose curtain has started parting — the scene begins in the middle */
  revealed: boolean;
  onNext: () => void;
}

/**
 * The welcome screen sits *behind* the rose curtain (App renders the curtain as an overlay).
 * When the roses slide off to the left and right, roses start falling one by one, a blossom tree
 * slowly grows and a couple appears beneath it.
 */
export const WelcomePage: React.FC<WelcomePageProps> = ({ revealed, onNext }) => (
  <div
    className="page"
    style={{ background: 'radial-gradient(circle at 50% 38%, #fff8ec 0%, #ffe9d6 55%, #fbd5c0 100%)' }}
  >
    <FlowerBg />
    <FloatingHearts count={6} trigger={revealed} />
    <RoseRain active={revealed} />

    {/* dried roses in the corner, like a pressed bouquet */}
    <img
      src="/images/deco/dried-roses.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      style={{
        position: 'absolute',
        top: -16,
        left: -2,
        width: 'min(28vw, 118px)',
        transform: 'rotate(84deg)',
        opacity: revealed ? 0.95 : 0,
        transition: 'opacity 1.6s ease 1.2s',
        filter: 'drop-shadow(0 4px 8px rgba(90, 40, 30, 0.22))',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />

    {/* anime pookie reactions peeking in from the corners */}
    <motion.img
      src="/images/stickers/anime-2.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={revealed ? { opacity: 1, scale: 1, y: [0, -8, 0] } : { opacity: 0, scale: 0.4 }}
      transition={{
        opacity: { delay: 9, duration: 0.6 },
        scale: { delay: 9, type: 'spring', stiffness: 260, damping: 14 },
        y: { delay: 9.6, duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{ position: 'absolute', right: 6, bottom: 96, width: 62, zIndex: 1, pointerEvents: 'none' }}
    />
    <motion.img
      src="/images/stickers/anime-4.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={revealed ? { opacity: 1, scale: 1, y: [0, -6, 0] } : { opacity: 0, scale: 0.4 }}
      transition={{
        opacity: { delay: 10, duration: 0.6 },
        scale: { delay: 10, type: 'spring', stiffness: 260, damping: 14 },
        y: { delay: 10.6, duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{ position: 'absolute', left: 6, bottom: 96, width: 60, zIndex: 1, pointerEvents: 'none' }}
    />

    <div
      className="page-content"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ delay: revealed ? 0.8 : 0, duration: 1.1 }}
      >
        <p
          style={{
            fontFamily: "'Dancing Script', 'Caveat', cursive",
            fontSize: 'clamp(1.1rem, 4.5vw, 1.4rem)',
            color: '#a8675a',
            letterSpacing: '0.04em',
          }}
        >
          {WELCOME_CONTENT.welcome} to your day,
        </p>
        <h1
          style={{
            fontFamily: "'Great Vibes', 'Dancing Script', cursive",
            fontWeight: 400,
            fontSize: 'clamp(3rem, 15vw, 4.4rem)',
            color: '#d9567f',
            lineHeight: 1.05,
            textShadow: '0 2px 10px rgba(217, 86, 127, 0.22)',
          }}
        >
          {WELCOME_CONTENT.name}
        </h1>
      </motion.div>

      <TreeScene play={revealed} />

      <motion.div
        className="card"
        style={{ padding: '14px 20px', background: 'rgba(255, 252, 246, 0.9)', marginTop: 4 }}
        initial={{ opacity: 0, y: 16 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ delay: revealed ? 6.6 : 0, duration: 1 }}
      >
        {WELCOME_CONTENT.lines.map((line, i) => (
          <p key={i} style={{ fontSize: '0.95rem', marginBottom: 3 }}>{line}</p>
        ))}
      </motion.div>

      <motion.div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 8 }}
        initial={{ opacity: 0, y: 12 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ delay: revealed ? 7.4 : 0, duration: 0.9 }}
      >
        <NextArrowButton onClick={onNext} label={WELCOME_CONTENT.buttonText} disabled={!revealed} />
      </motion.div>
    </div>
  </div>
);
