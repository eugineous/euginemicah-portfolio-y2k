'use client';

// Shared, deliberately plain UI primitives for /control-room. This is an
// internal tool (light admin CMS, single role) -- functional beats polished
// here, so these wrap the site's --a/--b/--c/--bg/--text tokens from
// app/globals.css without adding any new design system on top.

export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        border: '1px solid color-mix(in srgb, var(--text) 15%, transparent)',
        borderRadius: 12,
        background: 'var(--bg)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled,
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'danger';
  type?: 'button' | 'submit';
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  const base: React.CSSProperties = {
    fontWeight: 700,
    fontSize: 13,
    borderRadius: 8,
    padding: '8px 14px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    border: '1px solid transparent',
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--a)', color: '#FAF4EA', border: '1px solid var(--a)' },
    ghost: { background: 'transparent', color: 'var(--text)', border: '1px solid color-mix(in srgb, var(--text) 25%, transparent)' },
    danger: { background: 'transparent', color: '#C0392B', border: '1px solid #C0392B' },
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

export function Badge({ text, tone = 'neutral' }: { text: string; tone?: 'neutral' | 'good' | 'warn' | 'bad' }) {
  const tones: Record<string, React.CSSProperties> = {
    neutral: { background: 'color-mix(in srgb, var(--text) 10%, transparent)', color: 'var(--text)' },
    good: { background: 'var(--c)', color: '#1B1714' },
    warn: { background: 'var(--b)', color: '#FAF4EA' },
    bad: { background: '#C0392B', color: '#fff' },
  };
  return (
    <span
      style={{
        display: 'inline-block',
        borderRadius: 999,
        padding: '2px 10px',
        fontSize: 11,
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '.04em',
        ...tones[tone],
      }}
    >
      {text}
    </span>
  );
}

export const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: '1px solid color-mix(in srgb, var(--text) 25%, transparent)',
  borderRadius: 8,
  padding: '8px 10px',
  color: 'var(--text)',
  fontSize: 14,
  fontFamily: 'inherit',
};

export const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '.06em',
  opacity: 0.6,
  fontWeight: 700,
  margin: '12px 0 5px',
};

export const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 10px',
  fontSize: 10.5,
  textTransform: 'uppercase',
  letterSpacing: '.06em',
  opacity: 0.55,
  borderBottom: '1px solid color-mix(in srgb, var(--text) 15%, transparent)',
  whiteSpace: 'nowrap',
};

export const td: React.CSSProperties = {
  padding: '9px 10px',
  fontSize: 13,
  borderBottom: '1px solid color-mix(in srgb, var(--text) 8%, transparent)',
  verticalAlign: 'top',
};

export function Toast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div
      style={{
        position: 'fixed',
        top: 14,
        right: 14,
        zIndex: 100,
        padding: '10px 16px',
        borderRadius: 10,
        background: 'var(--a)',
        color: '#FAF4EA',
        fontWeight: 700,
        fontSize: 13,
        boxShadow: '0 4px 16px rgba(0,0,0,.25)',
      }}
    >
      {message}
    </div>
  );
}

export function EmptyRow({ colSpan, children }: { colSpan: number; children: React.ReactNode }) {
  return (
    <tr>
      <td style={{ ...td, opacity: 0.6, textAlign: 'center', padding: '24px 10px' }} colSpan={colSpan}>
        {children}
      </td>
    </tr>
  );
}
