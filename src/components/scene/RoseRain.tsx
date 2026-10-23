import React from 'react';
import './RoseRain.css';

interface RoseRainProps {
  /** start raining — roses fall one by one once the curtain has parted */
  active: boolean;
  count?: number;
}

const IMAGES = [1, 2, 3, 4, 5, 6].map(n => `/images/roses/rose-${n}.png`);

// deterministic layout (no Math.random in render)
const buildRoses = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    img: IMAGES[(i * 5 + 1) % IMAGES.length],
    left: 3 + ((i * 53) % 92),
    size: 40 + ((i * 17) % 34),
    dur: 8 + ((i * 7) % 50) / 10,
    delay: 1.4 + i * 0.7,
    sway: 16 + ((i * 11) % 22),
    spin: 140 + ((i * 29) % 220),
    flip: i % 2 ? -1 : 1,
  }));

/** Natural watercolour roses drift down the screen one after another. */
export const RoseRain: React.FC<RoseRainProps> = ({ active, count = 16 }) => {
  if (!active) return null;
  return (
    <div className="rose-rain" aria-hidden="true">
      {buildRoses(count).map((r, i) => (
        <span
          key={i}
          className="rose-fall"
          style={{
            left: `${r.left}%`,
            animationDuration: `${r.dur}s`,
            animationDelay: `${r.delay}s`,
          }}
        >
          <img
            src={r.img}
            alt=""
            draggable={false}
            className="rose-sway"
            style={{
              width: r.size,
              height: r.size,
              ['--sway' as string]: `${r.sway * r.flip}px`,
              ['--spin' as string]: `${r.spin * r.flip}deg`,
              animationDuration: `${2.6 + (i % 4) * 0.5}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
};
