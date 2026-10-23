import React from 'react';
import { motion } from 'framer-motion';
import type { HeartSurpriseKind } from '../../types/birthday';

/** Animated “pop out” scenes — no anime / couple art, only playful bursts */
export const SurpriseScene: React.FC<{ kind: HeartSurpriseKind }> = ({ kind }) => {
  switch (kind) {
    case 'bouquet':
      return <FlowerBurst />;
    case 'dance':
      return <MusicBurst />;
    case 'kiss':
      return <KissBurst />;
    case 'hug':
      return <HeartHugBurst />;
    case 'cake':
      return <CelebrationBlast />;
    case 'balloons':
      return <BalloonBurst />;
    case 'letter':
      return <ChocolateBurst />;
    case 'ring':
      return <SparkleBurst />;
    case 'cuddle':
      return <PetalRain />;
    case 'stars':
      return <StarBurst />;
    case 'butterfly':
      return <ButterflyBurst />;
    case 'moon':
      return <MoonBurst />;
    default:
      return null;
  }
};

/** Shared flying particle */
const Fly: React.FC<{
  children: React.ReactNode;
  i: number;
  total?: number;
  delay?: number;
  size?: string;
}> = ({ children, i, total = 12, delay = 0, size = '1.6rem' }) => {
  const angle = (i / total) * Math.PI * 2;
  const dist = 48 + (i % 4) * 18;
  const x = Math.cos(angle) * dist;
  const y = Math.sin(angle) * dist - 10;
  return (
    <motion.span
      className="hs-fly"
      style={{ fontSize: size }}
      initial={{ opacity: 0, scale: 0, x: 0, y: 20 }}
      animate={{ opacity: [0, 1, 1, 0.85], scale: [0.3, 1.25, 1], x, y }}
      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: delay + i * 0.05 }}
    >
      {children}
    </motion.span>
  );
};

const FlowerBurst = () => (
  <div className="hs-scene hs-burst">
    {[1, 2, 3, 4, 5, 6].map(i => (
      <motion.img
        key={i}
        className={`hs-rose hs-rose-${i}`}
        src={`/images/roses/rose-${((i - 1) % 6) + 1}.png`}
        alt=""
        draggable={false}
        initial={{ opacity: 0, scale: 0.15, y: 50, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: -16 + i * 7 }}
        transition={{ type: 'spring', stiffness: 230, damping: 13, delay: 0.06 * i }}
      />
    ))}
    {['🌸', '🌺', '🌷', '🌼', '💐', '🌹'].map((e, i) => (
      <Fly key={e + i} i={i} total={6} delay={0.2} size="1.5rem">{e}</Fly>
    ))}
  </div>
);

const MusicBurst = () => (
  <div className="hs-scene hs-burst">
    <motion.span
      className="hs-center-emoji"
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: [0, 1.3, 1], rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 12 }}
    >
      🎵
    </motion.span>
    {['🎶', '🎵', '✨', '💫', '🎹', '🎤', '💗', '⭐', '🎶', '🎵'].map((e, i) => (
      <Fly key={i} i={i} total={10} delay={0.1} size="1.45rem">{e}</Fly>
    ))}
  </div>
);

const KissBurst = () => (
  <div className="hs-scene hs-burst">
    <motion.span
      className="hs-center-emoji"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.4, 1] }}
      transition={{ type: 'spring', stiffness: 280, damping: 11 }}
    >
      💋
    </motion.span>
    {Array.from({ length: 14 }).map((_, i) => (
      <Fly key={i} i={i} total={14} delay={0.08} size={i % 3 === 0 ? '1.9rem' : '1.4rem'}>
        {['💋', '😘', '💕', '😚'][i % 4]}
      </Fly>
    ))}
  </div>
);

const HeartHugBurst = () => (
  <div className="hs-scene hs-burst">
    <motion.span
      className="hs-center-emoji"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.35, 1] }}
      transition={{ type: 'spring', stiffness: 240, damping: 12 }}
    >
      🤗
    </motion.span>
    {['💗', '💕', '❤️', '💞', '💓', '🩷', '💖', '💗', '💕', '❤️'].map((e, i) => (
      <Fly key={i} i={i} total={10} delay={0.1} size="1.55rem">{e}</Fly>
    ))}
  </div>
);

const CelebrationBlast = () => (
  <div className="hs-scene hs-burst hs-blast">
    <motion.span
      className="hs-blast-core"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.8, 1.1], opacity: [0, 1, 0.9] }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      💥
    </motion.span>
    {['🎉', '🎊', '✨', '⭐', '💫', '🥳', '🎈', '🌟', '💛', '💗', '🎁', '🎇'].map((e, i) => (
      <motion.span
        key={i}
        className="hs-fly"
        style={{ fontSize: '1.5rem' }}
        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.2, 1.3, 1],
          x: Math.cos((i / 12) * Math.PI * 2) * (70 + (i % 3) * 20),
          y: Math.sin((i / 12) * Math.PI * 2) * (55 + (i % 4) * 16),
          rotate: (i % 2 ? 1 : -1) * (120 + i * 20),
        }}
        transition={{ duration: 1.1, delay: 0.05 * i, ease: 'easeOut' }}
      >
        {e}
      </motion.span>
    ))}
  </div>
);

const BalloonBurst = () => (
  <div className="hs-scene hs-burst">
    {['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '💗', '🎈'].map((e, i) => (
      <motion.span
        key={i}
        className="hs-fly"
        style={{ fontSize: i % 2 ? '2.2rem' : '1.7rem' }}
        initial={{ opacity: 0, y: 60, scale: 0.4 }}
        animate={{ opacity: 1, y: -20 - (i % 4) * 18, x: (i - 3.5) * 22, scale: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.07 * i }}
      >
        {e}
      </motion.span>
    ))}
  </div>
);

const CHOCOLATES = ['🍫', '🍫', '🤎', '🍫', '🍪', '🍫', '🧁', '🍫', '🍩', '🍫', '🤎', '🍫', '🍪', '🍫', '🧁', '🍫'];

const ChocolateBurst = () => (
  <div className="hs-scene hs-burst">
    <motion.span
      className="hs-center-emoji"
      initial={{ scale: 0, rotate: -30 }}
      animate={{ scale: [0, 1.35, 1], rotate: 0 }}
      transition={{ type: 'spring', stiffness: 250, damping: 12 }}
    >
      🍫
    </motion.span>
    {CHOCOLATES.map((e, i) => (
      <Fly key={i} i={i} total={CHOCOLATES.length} delay={0.05} size={i % 4 === 0 ? '1.85rem' : '1.4rem'}>
        {e}
      </Fly>
    ))}
  </div>
);

const SparkleBurst = () => (
  <div className="hs-scene hs-burst">
    <motion.span
      className="hs-center-emoji"
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: [0, 1.4, 1], rotate: 0 }}
      transition={{ type: 'spring', delay: 0.05, stiffness: 260 }}
    >
      ✨
    </motion.span>
    {Array.from({ length: 12 }).map((_, i) => (
      <Fly key={i} i={i} total={12} delay={0.1} size="1.4rem">
        {['✨', '⭐', '💫', '🌟'][i % 4]}
      </Fly>
    ))}
  </div>
);

const PetalRain = () => (
  <div className="hs-scene hs-burst">
    {[1, 2, 3, 4].map(i => (
      <motion.img
        key={i}
        className={`hs-rose hs-rose-soft hs-rose-${i}`}
        src={`/images/roses/rose-${i}.png`}
        alt=""
        draggable={false}
        initial={{ opacity: 0, y: -30, scale: 0.4 }}
        animate={{ opacity: 0.95, y: 10 + i * 8, scale: 0.85 + i * 0.04 }}
        transition={{ type: 'spring', delay: 0.08 * i }}
      />
    ))}
    {['🌸', '💕', '🌺', '💗', '🌼', '💖', '🌷', '💞'].map((e, i) => (
      <motion.span
        key={i}
        className="hs-fly"
        style={{ fontSize: '1.35rem' }}
        initial={{ opacity: 0, y: -40, x: (i - 3.5) * 16 }}
        animate={{ opacity: [0, 1, 1], y: 50 + (i % 3) * 20, x: (i - 3.5) * 24 }}
        transition={{ duration: 1.4, delay: 0.1 * i, ease: 'easeOut' }}
      >
        {e}
      </motion.span>
    ))}
  </div>
);

const StarBurst = () => (
  <div className="hs-scene hs-burst">
    <motion.span
      className="hs-center-emoji"
      initial={{ scale: 0, rotate: -40 }}
      animate={{ scale: [0, 1.4, 1], rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 12 }}
    >
      🌟
    </motion.span>
    {['⭐', '✨', '💫', '🌟', '⭐', '✨', '💫', '🌟', '⭐', '✨', '💫', '🌟'].map((e, i) => (
      <Fly key={i} i={i} total={12} delay={0.08} size="1.45rem">{e}</Fly>
    ))}
  </div>
);

const ButterflyBurst = () => (
  <div className="hs-scene hs-burst">
    <motion.span
      className="hs-center-emoji"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.35, 1], y: [0, -6, 0] }}
      transition={{ type: 'spring', stiffness: 240, damping: 12 }}
    >
      🦋
    </motion.span>
    {['🦋', '🌸', '🦋', '💗', '🦋', '✨', '🦋', '💕', '🦋', '🌼'].map((e, i) => (
      <Fly key={i} i={i} total={10} delay={0.08} size="1.5rem">{e}</Fly>
    ))}
  </div>
);

const MoonBurst = () => (
  <div className="hs-scene hs-burst">
    <motion.span
      className="hs-center-emoji"
      initial={{ scale: 0, rotate: -25 }}
      animate={{ scale: [0, 1.35, 1], rotate: 0 }}
      transition={{ type: 'spring', stiffness: 250, damping: 12 }}
    >
      🌙
    </motion.span>
    {['🌙', '✨', '⭐', '💫', '🌙', '💗', '✨', '⭐', '💫', '💕'].map((e, i) => (
      <Fly key={i} i={i} total={10} delay={0.1} size="1.45rem">{e}</Fly>
    ))}
  </div>
);
