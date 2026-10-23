import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG, PATTERN_LOCK_CONTENT } from '../../data/birthdayContent';
import { FloatingHearts } from '../common/FloatingHearts';
import './PatternLock.css';

interface PatternLockProps {
  onUnlocked: () => void;
}

type NodeState = 'idle' | 'active' | 'success' | 'error';

interface GridNode {
  id: number;
  x: number;
  y: number;
}

const GRID: GridNode[] = [
  { id: 0, x: 1, y: 1 }, { id: 1, x: 2, y: 1 }, { id: 2, x: 3, y: 1 },
  { id: 3, x: 1, y: 2 }, { id: 4, x: 2, y: 2 }, { id: 5, x: 3, y: 2 },
  { id: 6, x: 1, y: 3 }, { id: 7, x: 2, y: 3 }, { id: 8, x: 3, y: 3 },
];

const patterns = (() => JSON.parse(JSON.stringify(CONFIG.correctPattern)) as number[])();

function patternsMatch(a: number[], b: number[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

export const PatternLock: React.FC<PatternLockProps> = ({ onUnlocked }) => {
  const [drawn, setDrawn] = useState<number[]>([]);
  const [nodeState, setNodeState] = useState<NodeState>('idle');
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(null);
  const [successTriggered, setSuccessTriggered] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getNodeCenter = useCallback((nodeId: number) => {
    const el = nodeRefs.current[nodeId];
    const svg = svgRef.current;
    if (!el || !svg) return null;
    const nodeRect = el.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    return {
      x: nodeRect.left + nodeRect.width / 2 - svgRect.left,
      y: nodeRect.top + nodeRect.height / 2 - svgRect.top,
    };
  }, []);

  const getNodeAtPosition = useCallback((clientX: number, clientY: number): number | null => {
    for (const node of GRID) {
      const el = nodeRefs.current[node.id];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const hitArea = 28;
      if (
        clientX >= rect.left - hitArea &&
        clientX <= rect.right + hitArea &&
        clientY >= rect.top - hitArea &&
        clientY <= rect.bottom + hitArea
      ) {
        return node.id;
      }
    }
    return null;
  }, []);

  const handleSubmit = useCallback(() => {
    if (patternsMatch(drawn, patterns)) {
      setNodeState('success');
      setSuccessTriggered(true);
      setMessage(PATTERN_LOCK_CONTENT.successMessage);
      setTimeout(onUnlocked, 2200);
    } else {
      setNodeState('error');
      setMessage(PATTERN_LOCK_CONTENT.errorMessage);
      setTimeout(() => {
        setDrawn([]);
        setNodeState('idle');
        setMessage(null);
      }, 1500);
    }
  }, [drawn, onUnlocked]);

  const addNode = useCallback((nodeId: number) => {
    setDrawn(prev => {
      if (prev.includes(nodeId)) return prev;
      return [...prev, nodeId];
    });
  }, []);

  const startDraw = useCallback((clientX: number, clientY: number) => {
    if (nodeState === 'success') return;
    setNodeState('active');
    setIsDrawing(true);
    setMessage(null);
    const nodeId = getNodeAtPosition(clientX, clientY);
    if (nodeId !== null) {
      setDrawn([nodeId]);
    }
    setCurrentPos({ x: clientX, y: clientY });
  }, [nodeState, getNodeAtPosition]);

  const moveDraw = useCallback((clientX: number, clientY: number) => {
    if (!isDrawing) return;
    const nodeId = getNodeAtPosition(clientX, clientY);
    if (nodeId !== null) addNode(nodeId);
    const svg = svgRef.current;
    if (svg) {
      const rect = svg.getBoundingClientRect();
      setCurrentPos({ x: clientX - rect.left, y: clientY - rect.top });
    }
  }, [isDrawing, getNodeAtPosition, addNode]);

  const endDraw = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setCurrentPos(null);
    if (drawn.length >= 2) handleSubmit();
    else { setDrawn([]); setNodeState('idle'); }
  }, [isDrawing, drawn.length, handleSubmit]);

  useEffect(() => {
    const onMouseUp = () => endDraw();
    const onTouchEnd = () => endDraw();
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [endDraw]);

  const getLinePoints = () => {
    const points: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = 0; i < drawn.length - 1; i++) {
      const a = getNodeCenter(drawn[i]);
      const b = getNodeCenter(drawn[i + 1]);
      if (a && b) points.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
    }
    // Line to current cursor
    if (isDrawing && currentPos && drawn.length > 0) {
      const last = getNodeCenter(drawn[drawn.length - 1]);
      if (last) points.push({ x1: last.x, y1: last.y, x2: currentPos.x, y2: currentPos.y });
    }
    return points;
  };

  const lineColor = nodeState === 'error' ? '#F7B8CB' : nodeState === 'success' ? '#80CBC4' : '#FF8FB1';

  return (
    <div className="pattern-lock-wrapper">
      <FloatingHearts count={6} trigger={successTriggered} />

      <div className="pattern-lock-header">
        <h2 className="section-heading" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.4rem)' }}>
          {PATTERN_LOCK_CONTENT.heading}
        </h2>
        <p className="section-subheading" style={{ marginBottom: 8 }}>
          {PATTERN_LOCK_CONTENT.subheading}
        </p>
        <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
          {PATTERN_LOCK_CONTENT.hint}
        </p>
      </div>

      <div
        className={`pattern-grid-container ${nodeState === 'error' ? 'shake' : ''}`}
        role="application"
        aria-label="Pattern lock grid"
        onMouseDown={e => startDraw(e.clientX, e.clientY)}
        onMouseMove={e => moveDraw(e.clientX, e.clientY)}
        onTouchStart={e => { e.preventDefault(); const t = e.touches[0]; startDraw(t.clientX, t.clientY); }}
        onTouchMove={e => { e.preventDefault(); const t = e.touches[0]; moveDraw(t.clientX, t.clientY); }}
        style={{ touchAction: 'none' }}
      >
        {/* SVG overlay for lines */}
        <svg
          ref={svgRef}
          className="pattern-svg"
          aria-hidden="true"
        >
          {getLinePoints().map((pt, i) => (
            <line
              key={i}
              x1={pt.x1} y1={pt.y1}
              x2={pt.x2} y2={pt.y2}
              stroke={lineColor}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.7"
            />
          ))}
        </svg>

        {/* 3x3 Grid */}
        <div className="pattern-grid" aria-hidden="true">
          {GRID.map(node => {
            const isSelected = drawn.includes(node.id);
            const isLast = drawn[drawn.length - 1] === node.id;
            return (
              <div
                key={node.id}
                ref={el => { nodeRefs.current[node.id] = el; }}
                className={`pattern-node ${isSelected ? `selected ${nodeState}` : ''} ${isLast ? 'last' : ''}`}
              >
                <div className="pattern-node-inner" />
                {isSelected && <div className="pattern-node-ring" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Message */}
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            className={`pattern-message ${nodeState === 'success' ? 'success' : 'error'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p>{message}</p>
            {nodeState === 'success' && (
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1rem', marginTop: 8 }}>
                {PATTERN_LOCK_CONTENT.successSub}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset hint + Skip */}
      <div className="pattern-actions">
        {drawn.length > 0 && nodeState !== 'success' && (
          <button
            className="btn btn-ghost"
            onClick={() => { setDrawn([]); setNodeState('idle'); setMessage(null); }}
            aria-label="Reset pattern"
          >
            🔄 Reset
          </button>
        )}
        <button
          className="btn btn-ghost"
          onClick={onUnlocked}
          aria-label="Skip pattern lock and continue"
          style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}
        >
          {PATTERN_LOCK_CONTENT.skipButtonText}
        </button>
      </div>
    </div>
  );
};
