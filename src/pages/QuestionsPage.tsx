import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS, QUESTIONS_CONTENT } from '../data/birthdayContent';
import { FloatingHearts } from '../components/common/FloatingHearts';
import { ProgressIndicator } from '../components/common/ProgressIndicator';
import { FlowerBg } from './shared/FlowerBg';
import { NextArrowButton } from '../components/common/NextArrowButton';
import type { QuestionAnswers, PageId } from '../types/birthday';
import { saveAnswersToSheet } from '../utils/saveAnswers';

interface QuestionsPageProps {
  answers: QuestionAnswers;
  onAnswerChange: (answers: QuestionAnswers) => void;
  onNext: () => void;
  onNavigate?: (pageId: PageId) => void;
}

export const QuestionsPage: React.FC<QuestionsPageProps> = ({ answers, onAnswerChange, onNext, onNavigate }) => {
  const [currentQ, setCurrentQ] = useState<number | null>(null); // index of opened question
  const [bloomedFlowers, setBloomedFlowers] = useState<Set<string>>(new Set());

  const openQuestion = (idx: number) => {
    const q = QUESTIONS[idx];
    setBloomedFlowers(prev => new Set([...prev, q.id]));
    setCurrentQ(idx);
  };

  const handleAnswer = (qId: string, value: string) => {
    onAnswerChange({ ...answers, [qId]: value });
  };

  const allAnswered = QUESTIONS.every(q => bloomedFlowers.has(q.id));

  const currentQuestion = currentQ !== null ? QUESTIONS[currentQ] : null;

  const FLOWER_COLORS = ['#FF8FB1', '#E86F98', '#FFF0B5', '#D8C9F5', '#C9DDC1'];

  return (
    <div className="page" style={{ background: 'var(--grad-hero)', paddingTop: 60, paddingBottom: 60 }}>
      <FlowerBg />
      <FloatingHearts count={4} />
      <ProgressIndicator currentPage="questions" onNavigate={onNavigate} />

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
          <h1 className="section-heading">{QUESTIONS_CONTENT.heading}</h1>
          <p className="section-subheading">{QUESTIONS_CONTENT.subheading}</p>
        </motion.div>

        {/* Flower buds */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', padding: '8px 0' }}>
          {QUESTIONS.map((q, i) => {
            const bloomed = bloomedFlowers.has(q.id);
            const color = FLOWER_COLORS[i % FLOWER_COLORS.length];
            return (
              <motion.button
                key={q.id}
                onClick={() => openQuestion(i)}
                aria-label={`${bloomed ? 'Revisit' : 'Open'} question ${i + 1}: ${bloomed ? q.question : 'Click the flower!'}`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <svg width="56" height="68" viewBox="0 0 56 68" aria-hidden="true">
                  {/* Stem */}
                  <line x1="28" y1="68" x2="28" y2="42" stroke="#AFC9A4" strokeWidth="3" strokeLinecap="round"/>
                  {bloomed ? (
                    // Bloomed
                    <>
                      <ellipse cx="28" cy="28" rx="14" ry="10" fill={color} transform="rotate(0 28 28)"/>
                      <ellipse cx="28" cy="28" rx="14" ry="10" fill={color} transform="rotate(45 28 28)" opacity="0.8"/>
                      <ellipse cx="28" cy="28" rx="14" ry="10" fill={color} transform="rotate(90 28 28)" opacity="0.7"/>
                      <ellipse cx="28" cy="28" rx="14" ry="10" fill={color} transform="rotate(135 28 28)" opacity="0.8"/>
                      <circle cx="28" cy="28" r="10" fill="#FFF0B5"/>
                      <text x="28" y="32" fontSize="10" textAnchor="middle">{q.flower}</text>
                    </>
                  ) : (
                    // Bud
                    <>
                      <ellipse cx="28" cy="26" rx="12" ry="20" fill={color} opacity="0.7"/>
                      <ellipse cx="28" cy="26" rx="8" ry="16" fill={color}/>
                      <ellipse cx="22" cy="28" rx="7" ry="14" fill={color} opacity="0.5" transform="rotate(-20 22 28)"/>
                      <ellipse cx="34" cy="28" rx="7" ry="14" fill={color} opacity="0.5" transform="rotate(20 34 28)"/>
                    </>
                  )}
                </svg>
                <span style={{ fontSize: '0.65rem', color: bloomed ? 'var(--pink-deep)' : 'var(--text-light)', fontFamily: 'var(--font-body)', fontWeight: bloomed ? 600 : 400 }}>
                  {bloomed ? `Q${i + 1} ✓` : `Q${i + 1}`}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              className="card"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
            >
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.15rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>
                {currentQuestion.question}
              </p>

              {/* Options */}
              {(currentQuestion.type === 'options' || currentQuestion.type === 'options-with-text') &&
                currentQuestion.options?.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(currentQuestion.id, opt)}
                    aria-pressed={answers[currentQuestion.id] === opt}
                    style={{
                      display: 'block', width: '100%', marginBottom: 8,
                      background: answers[currentQuestion.id] === opt
                        ? 'linear-gradient(135deg, rgba(255, 197, 213, 0.5), rgba(233, 223, 255, 0.4))'
                        : 'rgba(255, 253, 249, 0.7)',
                      border: answers[currentQuestion.id] === opt
                        ? '2px solid var(--pink-bubble)'
                        : '2px solid rgba(255, 197, 213, 0.3)',
                      borderRadius: 'var(--radius-md)', padding: '10px 14px',
                      cursor: 'pointer', textAlign: 'left',
                      fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                      color: 'var(--text-main)', transition: 'all 0.2s ease',
                    }}
                  >
                    {answers[currentQuestion.id] === opt ? '💗 ' : '○ '}{opt}
                  </button>
                ))
              }

              {/* Text / textarea */}
              {(currentQuestion.type === 'text' || currentQuestion.type === 'options-with-text') && (
                <input
                  className="input"
                  type="text"
                  placeholder={currentQuestion.placeholder}
                  value={typeof answers[currentQuestion.id] === 'string' && !currentQuestion.options?.includes(answers[currentQuestion.id] as string)
                    ? answers[currentQuestion.id] as string : ''}
                  onChange={e => handleAnswer(currentQuestion.id, e.target.value)}
                  aria-label="Your answer"
                  style={{ marginTop: currentQuestion.type === 'options-with-text' ? 8 : 0 }}
                />
              )}
              {currentQuestion.type === 'textarea' && (
                <textarea
                  className="textarea"
                  placeholder={currentQuestion.placeholder}
                  value={typeof answers[currentQuestion.id] === 'string' ? answers[currentQuestion.id] as string : ''}
                  onChange={e => handleAnswer(currentQuestion.id, e.target.value)}
                  rows={4}
                  aria-label="Your answer"
                />
              )}

              {/* Nav */}
              <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'space-between' }}>
                {currentQ !== null && currentQ > 0 && (
                  <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => openQuestion(currentQ - 1)}>← Back</button>
                )}
                {currentQ !== null && currentQ < QUESTIONS.length - 1 && (
                  <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => openQuestion(currentQ + 1)}>Next →</button>
                )}
                {currentQ === QUESTIONS.length - 1 && (
                  <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setCurrentQ(null)}>Done ✓</button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All bloomed */}
        <AnimatePresence>
          {allAnswered && !currentQuestion && (
            <motion.div
              className="card card-pink"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center' }}
            >
              <p className="font-hand" style={{ fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                {QUESTIONS_CONTENT.thankYouMessage}
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: 6 }}>
                {QUESTIONS_CONTENT.thankYouSub}
              </p>
              {!import.meta.env.VITE_SHEET_URL && (
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: 8, fontStyle: 'italic' }}>
                  (Your answers are saved only on this device. 💌)
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ display: 'flex', justifyContent: 'center' }}>
          <NextArrowButton
            onClick={() => {
              void saveAnswersToSheet(answers);
              onNext();
            }}
            label="Continue"
          />
        </motion.div>
      </div>
    </div>
  );
};
