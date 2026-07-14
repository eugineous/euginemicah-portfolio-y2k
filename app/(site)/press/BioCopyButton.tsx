'use client';

import { useState } from 'react';

// Copy-to-clipboard for the press-kit bio cards. Ported from the DCLogic
// mockup's onCopyShort/onCopyLong handlers — genuinely just clipboard UX,
// no backend needed, so it's fine to keep (per the phase brief). Mirrors
// SiteFooter.tsx's copyLink pattern: local state, 1.8s revert, silent
// catch if the clipboard API is unavailable.
export function BioCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="emx-icon-btn"
      style={{
        fontFamily: 'var(--font-bricolage), sans-serif',
        cursor: 'pointer',
        fontWeight: 700,
        fontSize: 13,
        background: 'var(--bg)',
        border: '2px solid var(--text)',
        borderRadius: 999,
        padding: '6px 14px',
        color: 'var(--text)',
        flexShrink: 0,
      }}
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  );
}
