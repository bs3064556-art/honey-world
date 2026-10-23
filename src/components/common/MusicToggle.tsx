import React, { useEffect, useRef } from 'react';
import { DUCK_EVENT } from '../../utils/voice';
import { SONG } from '../../data/music';

interface MusicToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

/**
 * 🎶 Background music — song-3 (Tum Se Hi). Fully pauses while birthday video plays.
 */
const VOL = 0.6;

export const MusicToggle: React.FC<MusicToggleProps> = ({ isEnabled, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const enabledRef = useRef(isEnabled);
  const duckRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(SONG.url);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = VOL;
    audioRef.current = audio;
    if (enabledRef.current) audio.play().catch(() => {});
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onDuck = (e: Event) => {
      const duck = Boolean((e as CustomEvent<boolean>).detail);
      duckRef.current = duck;
      const audio = audioRef.current;
      if (!audio) return;
      if (duck) {
        // video playing → main song OFF
        audio.pause();
      } else if (enabledRef.current) {
        // video ended → song-3 back ON
        audio.volume = VOL;
        void audio.play().catch(() => {});
      }
    };
    window.addEventListener(DUCK_EVENT, onDuck);
    return () => window.removeEventListener(DUCK_EVENT, onDuck);
  }, []);

  useEffect(() => {
    enabledRef.current = isEnabled;
    const audio = audioRef.current;
    if (!audio) return;
    if (isEnabled && !duckRef.current) audio.play().catch(() => {});
    else audio.pause();
  }, [isEnabled]);

  const handleClick = () => {
    if (!isEnabled) {
      enabledRef.current = true;
      audioRef.current?.play().catch(() => {});
    }
    onToggle();
  };

  return (
    <div className="music-dock">
      <button
        onClick={handleClick}
        className={`music-toggle ${isEnabled ? 'active' : ''}`}
        aria-label={isEnabled ? 'Mute background music' : 'Play background music'}
        title={isEnabled ? 'Music On' : 'Music Off'}
      >
        <span className={`music-icon ${isEnabled ? 'playing' : ''}`}>
          {isEnabled ? '\uD83C\uDFB5' : '\uD83D\uDD07'}
        </span>
      </button>
    </div>
  );
};
