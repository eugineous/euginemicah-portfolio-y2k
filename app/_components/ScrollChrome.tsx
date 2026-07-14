'use client';

import { useEffect, useState } from 'react';

// Thin scroll-position bar (top) + circular "back to top" button (bottom-left).
// Ported from the DCLogic mockup's #scroll-progress / #back-to-top elements,
// driven by React state instead of raw DOM writes.
export function ScrollChrome() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0);
      setVisible(doc.scrollTop > 400);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 3,
          width: `${progress}%`,
          background: 'var(--a)',
          zIndex: 60,
          transition: 'width .1s linear',
        }}
      />
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        title="Back to top"
        style={{
          position: 'fixed',
          bottom: 22,
          left: 22,
          zIndex: 55,
          width: 46,
          height: 46,
          borderRadius: '50%',
          background: 'var(--text)',
          color: 'var(--bg)',
          border: '2.5px solid var(--text)',
          fontSize: 18,
          fontWeight: 800,
          cursor: 'pointer',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transition: 'opacity .2s, transform .15s',
          boxShadow: '3px 3px 0 var(--c)',
        }}
      >
        ↑
      </button>
    </>
  );
}
