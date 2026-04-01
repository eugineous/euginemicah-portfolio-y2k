const BARS = [0.6, 0.9, 0.4, 1.0, 0.7, 0.5, 0.8, 0.3, 0.95, 0.6]

export function VUMeter() {
  return (
    <div className="flex items-end gap-0.5 h-8">
      {BARS.map((height, i) => (
        <div
          key={i}
          className="w-1.5 rounded-sm"
          style={{
            height: `${height * 100}%`,
            background: height > 0.8 ? 'var(--color-signal-red)' : height > 0.5 ? 'var(--color-gold)' : '#4CAF50',
            animation: `vu-bar ${0.8 + i * 0.1}s ease-in-out infinite`,
            animationDelay: `${i * 0.08}s`,
            transformOrigin: 'bottom',
          }}
        />
      ))}
    </div>
  )
}
