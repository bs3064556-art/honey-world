import React from 'react';

/** Original Honeyverse pookie bears (brown = Honey, cream = Pooja) — cute couple stickers vibe */
export type BearPose = 'run' | 'cheer' | 'shy' | 'pout' | 'hug-front' | 'heart' | 'sit';

interface BearProps {
  size?: number;
  className?: string;
  pose?: BearPose;
}

const blush = (cx: number, cy: number) => (
  <>
    <circle cx={cx - 14} cy={cy} r="5" fill="#FF8FAB" opacity="0.55" />
    <circle cx={cx + 14} cy={cy} r="5" fill="#FF8FAB" opacity="0.55" />
  </>
);

/** Brown teddy — Honey */
export const BrownBear: React.FC<BearProps> = ({ size = 88, className, pose = 'run' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
    {/* ears */}
    <circle cx="28" cy="28" r="16" fill="#8B5A2B" />
    <circle cx="92" cy="28" r="16" fill="#8B5A2B" />
    <circle cx="28" cy="28" r="8" fill="#C48A5A" />
    <circle cx="92" cy="28" r="8" fill="#C48A5A" />
    {/* body */}
    <ellipse cx="60" cy="78" rx="34" ry="30" fill="#A06B3C" />
    {/* head */}
    <circle cx="60" cy="48" r="32" fill="#A06B3C" />
    <ellipse cx="60" cy="56" rx="18" ry="14" fill="#D4A574" />
    {/* eyes + nose */}
    {pose === 'shy' ? (
      <>
        <path d="M46 46 Q50 42 54 46" stroke="#3A2415" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M66 46 Q70 42 74 46" stroke="#3A2415" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </>
    ) : (
      <>
        <circle cx="48" cy="46" r="4" fill="#2A1A10" />
        <circle cx="72" cy="46" r="4" fill="#2A1A10" />
        <circle cx="49.5" cy="44.5" r="1.3" fill="#fff" />
        <circle cx="73.5" cy="44.5" r="1.3" fill="#fff" />
      </>
    )}
    <ellipse cx="60" cy="54" rx="5" ry="4" fill="#2A1A10" />
    {pose === 'cheer' || pose === 'heart' ? (
      <path d="M54 62 Q60 68 66 62" stroke="#2A1A10" strokeWidth="2" fill="none" strokeLinecap="round" />
    ) : pose === 'pout' ? (
      <path d="M54 66 Q60 62 66 66" stroke="#2A1A10" strokeWidth="2" fill="none" strokeLinecap="round" />
    ) : (
      <path d="M55 62 Q60 66 65 62" stroke="#2A1A10" strokeWidth="2" fill="none" strokeLinecap="round" />
    )}
    {blush(60, 58)}
    {/* arms by pose */}
    {pose === 'run' && (
      <>
        <ellipse cx="28" cy="72" rx="10" ry="7" fill="#A06B3C" transform="rotate(-25 28 72)" />
        <ellipse cx="94" cy="78" rx="10" ry="7" fill="#A06B3C" transform="rotate(35 94 78)" />
        <ellipse cx="44" cy="104" rx="9" ry="6" fill="#8B5A2B" />
        <ellipse cx="78" cy="100" rx="9" ry="6" fill="#8B5A2B" />
      </>
    )}
    {pose === 'heart' && (
      <>
        <ellipse cx="34" cy="78" rx="11" ry="8" fill="#A06B3C" />
        <ellipse cx="86" cy="78" rx="11" ry="8" fill="#A06B3C" />
        <path d="M60 72 C52 64 44 70 44 78 C44 86 60 94 60 94 C60 94 76 86 76 78 C76 70 68 64 60 72Z" fill="#FF6B9D" />
      </>
    )}
    {(pose === 'cheer' || pose === 'sit' || pose === 'shy') && (
      <>
        <ellipse cx="30" cy={pose === 'cheer' ? 58 : 80} rx="11" ry="8" fill="#A06B3C" />
        <ellipse cx="90" cy={pose === 'cheer' ? 58 : 80} rx="11" ry="8" fill="#A06B3C" />
      </>
    )}
  </svg>
);

/** Cream / white teddy — Pooja */
export const CreamBear: React.FC<BearProps> = ({ size = 88, className, pose = 'run' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
    <circle cx="28" cy="28" r="16" fill="#F5E6D3" stroke="#E8D4BC" strokeWidth="2" />
    <circle cx="92" cy="28" r="16" fill="#F5E6D3" stroke="#E8D4BC" strokeWidth="2" />
    <circle cx="28" cy="28" r="8" fill="#FFC4D6" />
    <circle cx="92" cy="28" r="8" fill="#FFC4D6" />
    <ellipse cx="60" cy="78" rx="34" ry="30" fill="#FFF8F0" stroke="#E8D4BC" strokeWidth="2" />
    <circle cx="60" cy="48" r="32" fill="#FFF8F0" stroke="#E8D4BC" strokeWidth="2" />
    {pose === 'pout' ? (
      <>
        <circle cx="48" cy="46" r="4" fill="#2A1A10" />
        <circle cx="72" cy="46" r="4" fill="#2A1A10" />
        <path d="M52 66 Q60 58 68 66" stroke="#2A1A10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="38" cy="80" rx="12" ry="9" fill="#FFF8F0" stroke="#E8D4BC" strokeWidth="2" />
        <ellipse cx="82" cy="80" rx="12" ry="9" fill="#FFF8F0" stroke="#E8D4BC" strokeWidth="2" />
      </>
    ) : pose === 'cheer' ? (
      <>
        <circle cx="48" cy="46" r="4" fill="#2A1A10" />
        <circle cx="72" cy="46" r="4" fill="#2A1A10" />
        <ellipse cx="60" cy="62" rx="8" ry="7" fill="#2A1A10" />
        <ellipse cx="60" cy="60" rx="5" ry="3" fill="#FF8FAB" />
        <ellipse cx="30" cy="52" rx="11" ry="8" fill="#FFF8F0" stroke="#E8D4BC" strokeWidth="2" />
        <ellipse cx="90" cy="52" rx="11" ry="8" fill="#FFF8F0" stroke="#E8D4BC" strokeWidth="2" />
        {/* floating hearts */}
        <path d="M22 28 C18 24 14 28 14 32 C14 36 22 42 22 42 C22 42 30 36 30 32 C30 28 26 24 22 28Z" fill="#FF6B9D" />
        <path d="M98 22 C95 19 92 22 92 25 C92 28 98 33 98 33 C98 33 104 28 104 25 C104 22 101 19 98 22Z" fill="#FF8FAB" />
      </>
    ) : (
      <>
        <circle cx="48" cy="46" r="4" fill="#2A1A10" />
        <circle cx="72" cy="46" r="4" fill="#2A1A10" />
        <circle cx="49.5" cy="44.5" r="1.3" fill="#fff" />
        <circle cx="73.5" cy="44.5" r="1.3" fill="#fff" />
        <ellipse cx="60" cy="54" rx="4.5" ry="3.5" fill="#2A1A10" />
        <path d="M54 62 Q60 68 66 62" stroke="#2A1A10" strokeWidth="2" fill="none" strokeLinecap="round" />
      </>
    )}
    {blush(60, 58)}
    {pose === 'run' && (
      <>
        <ellipse cx="26" cy="74" rx="10" ry="7" fill="#FFF8F0" stroke="#E8D4BC" strokeWidth="2" transform="rotate(-20 26 74)" />
        <ellipse cx="96" cy="76" rx="10" ry="7" fill="#FFF8F0" stroke="#E8D4BC" strokeWidth="2" transform="rotate(30 96 76)" />
        <ellipse cx="46" cy="104" rx="9" ry="6" fill="#F5E6D3" />
        <ellipse cx="76" cy="102" rx="9" ry="6" fill="#F5E6D3" />
      </>
    )}
    {pose === 'sit' && (
      <>
        <ellipse cx="32" cy="82" rx="11" ry="8" fill="#FFF8F0" stroke="#E8D4BC" strokeWidth="2" />
        <ellipse cx="88" cy="82" rx="11" ry="8" fill="#FFF8F0" stroke="#E8D4BC" strokeWidth="2" />
      </>
    )}
  </svg>
);

/** Cream hugging brown from behind (shy Honey) */
export const HugPair: React.FC<{ size?: number; className?: string }> = ({ size = 120, className }) => (
  <div className={className} style={{ position: 'relative', width: size, height: size * 0.92 }}>
    <BrownBear size={size * 0.78} pose="shy" className="hug-brown" />
    <CreamBear
      size={size * 0.72}
      pose="cheer"
      className="hug-cream"
    />
    <style>{`
      .hug-brown { position: absolute; left: 8%; bottom: 0; z-index: 1; }
      .hug-cream { position: absolute; left: 28%; bottom: 4%; z-index: 2; transform: scale(0.95); }
    `}</style>
  </div>
);

/** Pout cream + poking brown — “rootna mana” */
export const RootnaManaPair: React.FC<{ size?: number; className?: string }> = ({ size = 140, className }) => (
  <div className={className} style={{ display: 'flex', alignItems: 'flex-end', gap: 2, width: size }}>
    <CreamBear size={size * 0.55} pose="pout" />
    <BrownBear size={size * 0.52} pose="shy" />
  </div>
);
