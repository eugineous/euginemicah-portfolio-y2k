export function RadioWave() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto">
      {/* Expanding rings */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: `${i * 60}px`,
            height: `${i * 60}px`,
            borderColor: 'rgba(212,160,23,0.3)',
            animation: `pulse-ring 3s ease-out infinite`,
            animationDelay: `${(i - 1) * 0.75}s`,
          }}
        />
      ))}

      {/* Center dot */}
      <div
        className="w-4 h-4 rounded-full z-10"
        style={{
          background: '#D4A017',
          boxShadow: '0 0 20px rgba(212,160,23,0.8)',
        }}
      />

      {/* Frequency lines */}
      {[-60, -30, 0, 30, 60].map((angle, i) => (
        <div
          key={i}
          className="absolute w-px h-8 origin-bottom"
          style={{
            background: 'linear-gradient(to top, rgba(212,160,23,0.6), transparent)',
            transform: `rotate(${angle}deg) translateY(-80px)`,
            animation: `breathe ${1 + i * 0.2}s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  )
}
