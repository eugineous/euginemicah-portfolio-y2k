'use client';

import { useEffect, useState } from 'react';

const roles = ['TV presenter', 'journalist', 'founder', 'author'];

// Small client island for the home hero's rotating role word — the rest of
// the page stays a server component for metadata export. Mirrors the
// mockup's roleIdx state cycling every 2.2s.
export function RoleCycler() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span style={{ background: 'var(--c)', padding: '0 10px', borderRadius: 4, color: '#1B1714' }}>
      {roles[idx]}
    </span>
  );
}
