interface TribeBadgeProps {
  name: string
  color?: string
}

export function TribeBadge({ name, color = '#D4A017' }: TribeBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-xs tracking-widest uppercase"
      style={{
        borderColor: color,
        color,
        background: `${color}10`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {name}
    </div>
  )
}
