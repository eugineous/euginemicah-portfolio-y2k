'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'em_theme';

// Dark-mode toggle for the new (2026-07) brand shell. The actual flip of
// <html data-theme="dark"> for the *first* paint happens in a blocking
// inline script in app/layout.tsx (avoids a flash of the wrong theme);
// this component only takes over from there — reading whatever the script
// already applied, then keeping localStorage + the DOM attribute in sync
// on click. No raw DOM class manipulation beyond that single attribute.
export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      setTheme('dark');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    try {
      if (theme === 'dark') localStorage.setItem(STORAGE_KEY, 'dark');
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable (private mode, etc.) — theme just won't persist
    }
  }, [theme, mounted]);

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="emx-icon-btn"
      style={{
        cursor: 'pointer',
        background: 'transparent',
        border: '2px solid var(--text)',
        borderRadius: 999,
        width: 32,
        height: 32,
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text)',
        flexShrink: 0,
      }}
    >
      {mounted && theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}
