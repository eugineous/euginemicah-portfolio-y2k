'use client'

import { useRef, useState } from 'react'

export function BroadcastPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    if (!videoRef.current) return
    if (playing) { videoRef.current.pause(); setPlaying(false) }
    else { videoRef.current.play(); setPlaying(true) }
  }

  return (
    <div
      className="relative rounded-xl overflow-hidden border-2 border-gold/30 scan-lines"
      style={{ background: '#000', aspectRatio: '16/9' }}
    >
      {/* Broadcast monitor chrome */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-2 bg-black/80 border-b border-gold/20">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-signal-red"
            style={{ animation: 'pulse-ring 1.5s ease-out infinite' }}
          />
          <span className="font-mono text-xs text-white tracking-widest">ON AIR — URBAN NEWS</span>
        </div>
        <span className="font-mono text-xs text-gold">StarTimes Ch.430</span>
      </div>

      {/* Placeholder / video */}
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-void to-cosmic-navy min-h-[200px]">
        <div className="text-center">
          <div className="text-6xl mb-4">📺</div>
          <p className="font-mono text-xs text-gold tracking-widest uppercase">Urban News</p>
          <p className="font-mono text-xs text-text-tertiary mt-1">with Eugine Micah & Lucy Ogunde</p>
          <p className="font-mono text-xs text-text-tertiary">StarTimes Channel 430</p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center gap-3 px-4 py-2 bg-black/80 border-t border-gold/20">
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? '⏸' : '▶'}
        </button>
        <div className="flex-1 h-0.5 bg-white/10 rounded-full">
          <div className="h-full w-0 bg-gold rounded-full" />
        </div>
        <span className="font-mono text-xs text-text-tertiary">LIVE</span>
      </div>
    </div>
  )
}
