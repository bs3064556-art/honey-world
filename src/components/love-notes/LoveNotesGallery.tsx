import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOVE_NOTES, LOVE_NOTES_CONTENT } from '../../data/birthdayContent';
import { FloatingHearts } from '../common/FloatingHearts';
import './LoveNotesGallery.css';

interface LoveNotesGalleryProps {
  openedHearts: string[];
  onHeartOpen: (id: string) => void;
}

export const LoveNotesGallery: React.FC<LoveNotesGalleryProps> = ({ openedHearts, onHeartOpen }) => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [allOpenedBurst, setAllOpenedBurst] = useState(false);

  const visibleNotes = LOVE_NOTES.filter(n => !n.isSecret || openedHearts.length >= LOVE_NOTES.filter(x => !x.isSecret).length);

  const handleOpen = (id: string) => {
    if (!openedHearts.includes(id)) {
      const newOpened = [...openedHearts, id];
      onHeartOpen(id);
      // Check if all non-secret are opened
      const nonSecretIds = LOVE_NOTES.filter(n => !n.isSecret).map(n => n.id);
      if (nonSecretIds.every(nid => newOpened.includes(nid))) {
        setTimeout(() => setAllOpenedBurst(true), 200);
      }
    }
    setActiveNote(id);
  };

  const activeNoteData = LOVE_NOTES.find(n => n.id === activeNote);
  const allOpened = LOVE_NOTES.filter(n => !n.isSecret).every(n => openedHearts.includes(n.id));

  return (
    <div className="love-notes-wrapper">
      <FloatingHearts count={4} trigger={allOpenedBurst} />

      {/* Heart grid */}
      <div className="love-hearts-grid" role="list" aria-label="Love note hearts">
        {visibleNotes.map((note, i) => {
          const isOpened = openedHearts.includes(note.id);
          const isSecret = note.isSecret;
          return (
            <motion.button
              key={note.id}
              className={`love-heart-btn ${isOpened ? 'opened' : ''} ${isSecret ? 'secret' : ''}`}
              onClick={() => handleOpen(note.id)}
              aria-label={`Heart ${i + 1}: ${isOpened ? note.title : 'tap to reveal'}`}
              role="listitem"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="heart-shape">
                {isSecret && !isOpened ? (
                  <span className="heart-lock" aria-label="Secret heart, unlock all others first">🔒</span>
                ) : (
                  <span className="heart-emoji">{isOpened ? note.emoji : '💗'}</span>
                )}
              </div>
              {isOpened && (
                <span className="heart-label">{note.title}</span>
              )}
              {!isOpened && !isSecret && (
                <span className="heart-hint">tap! 💗</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* All opened message */}
      <AnimatePresence>
        {allOpened && (
          <motion.div
            className="all-opened-msg card card-pink"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <p className="font-hand" style={{ fontSize: '1.15rem', color: 'var(--text-main)', lineHeight: 1.6, textAlign: 'center' }}>
              {LOVE_NOTES_CONTENT.allOpenedMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note detail modal */}
      <AnimatePresence>
        {activeNote && activeNoteData && (
          <motion.div
            className="love-note-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveNote(null)}
          >
            <motion.div
              className="love-note-modal"
              initial={{ scale: 0.7, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 30 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="love-note-modal-emoji anim-heartbeat">{activeNoteData.emoji}</div>
              <h3 className="love-note-modal-title">{activeNoteData.title}</h3>
              <p className="love-note-modal-msg font-hand">{activeNoteData.message}</p>
              {activeNoteData.isSecret && (
                <div className="secret-badge">🎀 Secret Revealed!</div>
              )}
              <button
                className="btn btn-secondary"
                onClick={() => setActiveNote(null)}
                style={{ marginTop: 16 }}
              >
                💗 Aww, Thanks!
              </button>
              <button
                className="love-note-close"
                onClick={() => setActiveNote(null)}
                aria-label="Close love note"
              >✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
