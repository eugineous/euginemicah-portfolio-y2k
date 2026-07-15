'use client';

import { useState } from 'react';

// Copies the current post's URL. Mirrors SiteFooter.tsx's copyLink and
// press/BioCopyButton.tsx: local state, 1.8s revert, silent catch if the
// clipboard API is unavailable (private mode, unsupported browser, etc.).
export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      style={{
        fontFamily: 'var(--font-bricolage), sans-serif',
        cursor: 'pointer',
        fontWeight: 700,
        fontSize: 13.5,
        background: '#1B1714',
        color: '#FAF4EA',
        borderRadius: 999,
        padding: '10px 18px',
        border: 'none',
      }}
    >
      {copied ? 'Copied ✓' : 'Copy link'}
    </button>
  );
}
