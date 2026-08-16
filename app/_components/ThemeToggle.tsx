'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'em_theme';

// Dark-mode toggle for the new (2026-07) brand shell. The actual flip of
// <html data-theme="dark"> for the *first* paint happens in a blocking
// inline script in app/layout.tsx (avoids a flash of the wrong theme);
// this component only takes over from there — reading whatever the script
// already applied, then keeping localStorage + the DOM attribute in sync
// on click. No raw DOM class manipulation beyond that single attribute.
//
// 2026-08: dark is the default (see app/layout.tsx's themeInitScript) --
// this toggle still lets a visitor switch to light mode, it just no longer
// starts there. Only an explicit 'light' choice is persisted; the absence
// of a stored value means dark, not light.
export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (document.documentElement.getAttribute('data-theme') !== 'dark') {
      setTheme('light');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    try {
      if (theme === 'light') localStorage.setItem(STORAGE_KEY, 'light');
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
