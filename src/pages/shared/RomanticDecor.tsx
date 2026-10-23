import React from 'react';
import './RomanticDecor.css';

const NOTES = [
  { left: '12%', delay: 0, dur: 11, ch: '\u266A' },
  { left: '34%', delay: 4, dur: 13, ch: '\u266B' },
  { left: '62%', delay: 2, dur: 12, ch: '\u266A' },
  { left: '86%', delay: 6, dur: 14, ch: '\u266B' },
];

const BOKEH = [
  { left: '8%', top: '22%', s: 46, d: 0 },
  { left: '78%', top: '14%', s: 62, d: 1.5 },
  { left: '90%', top: '58%', s: 40, d: 3 },
  { left: '20%', top: '70%', s: 54, d: 2 },
  { left: '52%', top: '88%', s: 36, d: 4 },
];

/**
 * Soft romantic ambience that sits at the edges of every page:
 * floating pastel balloons, flickering candles, drifting music notes and warm bokeh lights.
 * Lives inside <FlowerBg/> so it always renders *behind* the page content.
 */
export const RomanticDecor: React.FC = () => (
  <div className="romantic-decor" aria-hidden="true">
    {BOKEH.map((b, i) => (
      <span
        key={i}
        className="decor-bokeh"
        style={{ left: b.left, top: b.top, width: b.s, height: b.s, animationDelay: `${b.d}s` }}
      />
    ))}

    {/* balloons */}
    <img className="decor-balloon decor-balloon-a" src="/images/deco/balloons-1.png" alt="" draggable={false} />
    <img className="decor-balloon decor-balloon-b" src="/images/deco/balloon-heart.png" alt="" draggable={false} />
    <img className="decor-balloon decor-balloon-c" src="/images/deco/balloons-2.png" alt="" draggable={false} />

    {/* candles with a warm flickering glow */}
    <div className="decor-candle decor-candle-left">
      <span className="decor-candle-glow" />
      <img src="/images/deco/candles-3.png" alt="" draggable={false} />
    </div>
    <div className="decor-candle decor-candle-right">
      <span className="decor-candle-glow decor-candle-glow-2" />
      <img src="/images/deco/candle-1.png" alt="" draggable={false} />
    </div>

    {NOTES.map((n, i) => (
      <span
        key={i}
        className="decor-note"
        style={{ left: n.left, animationDelay: `${n.delay}s`, animationDuration: `${n.dur}s` }}
      >
        {n.ch}
      </span>
    ))}
  </div>
);
