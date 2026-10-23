import React from 'react';
import './TreeScene.css';

interface TreeSceneProps {
  /** start the growing animation (the curtain is opening) */
  play: boolean;
}

// deterministic "random" values so the scene never jumps between renders
const PETALS = Array.from({ length: 14 }, (_, i) => ({
  left: 6 + ((i * 37) % 88),
  size: 8 + ((i * 5) % 7),
  delay: 6.5 + ((i * 53) % 90) / 10,
  dur: 6 + ((i * 29) % 40) / 10,
  drift: ((i * 17) % 50) - 25,
  rot: (i * 47) % 360,
}));

const FIREFLIES = Array.from({ length: 12 }, (_, i) => ({
  left: 4 + ((i * 41) % 92),
  top: 30 + ((i * 23) % 62),
  delay: 7 + ((i * 31) % 50) / 10,
  dur: 3 + ((i * 13) % 30) / 10,
}));

const HEARTS = ['\u2764\uFE0F', '\uD83D\uDC97', '\uD83E\uDE77', '\uD83D\uDC95', '\uD83D\uDC96', '\uD83D\uDC93'];

/**
 * A blossom tree that slowly grows out of the ground, then a couple appears under it
 * (he is holding her in his arms) while petals fall and fireflies glow.
 */
export const TreeScene: React.FC<TreeSceneProps> = ({ play }) => (
  <div className={`tree-scene ${play ? 'is-playing' : ''}`} aria-hidden="true">
    <div className="tree-glow" />

    <img className="tree-img" src="/images/scene/tree.png" alt="" draggable={false} />

    {/* falling blossom petals */}
    {PETALS.map((p, i) => (
      <span
        key={`p${i}`}
        className="tree-petal"
        style={{
          left: `${p.left}%`,
          width: p.size,
          height: p.size * 1.25,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.dur}s`,
          ['--drift' as string]: `${p.drift}px`,
          ['--rot' as string]: `${p.rot}deg`,
        }}
      />
    ))}

    <img className="couple-img" src="/images/scene/couple.png" alt="" draggable={false} />

    {/* hearts rising from the couple */}
    {HEARTS.map((h, i) => (
      <span
        key={`h${i}`}
        className="couple-heart"
        style={{
          left: `${38 + ((i * 11) % 28)}%`,
          animationDelay: `${7.8 + i * 1.1}s`,
          fontSize: `${0.85 + (i % 3) * 0.25}rem`,
        }}
      >
        {h}
      </span>
    ))}

    {FIREFLIES.map((f, i) => (
      <span
        key={`f${i}`}
        className="firefly"
        style={{ left: `${f.left}%`, top: `${f.top}%`, animationDelay: `${f.delay}s`, animationDuration: `${f.dur}s` }}
      />
    ))}
  </div>
);
