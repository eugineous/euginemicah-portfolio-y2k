interface ThemeBadgeProps {
  theme: string
}

export function ThemeBadge({ theme }: ThemeBadgeProps) {
  return (
    <div
      className="inline-flex items-center justify-center px-5 py-2.5 border-2 font-mono text-xs tracking-[0.2em] uppercase font-bold"
      style={{
        borderColor: '#D4A017',
        color: '#D4A017',
        background: 'rgba(212,160,23,0.05)',
        transform: `rotate(${Math.random() > 0.5 ? '-1' : '1'}deg)`,
        boxShadow: 'inset 0 0 0 1px rgba(212,160,23,0.2)',
      }}
    >
      {theme}
    </div>
  )
}
