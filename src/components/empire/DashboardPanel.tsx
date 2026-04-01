'use client'

import { useEffect, useState } from 'react'

export function DashboardPanel() {
  const [time, setTime] = useState('')
  const [posts, setPosts] = useState(47)

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString())
    tick()
    const id = setInterval(tick, 1000)

    // Simulate live post count
    const postId = setInterval(() => {
      setPosts(p => p + (Math.random() > 0.7 ? 1 : 0))
    }, 8000)

    return () => { clearInterval(id); clearInterval(postId) }
  }, [])

  const platforms = [
    { name: 'LinkedIn', status: 'ACTIVE', color: '#0077B5' },
    { name: 'Twitter/X', status: 'ACTIVE', color: '#1DA1F2' },
    { name: 'Instagram', status: 'ACTIVE', color: '#E1306C' },
    { name: 'Facebook', status: 'ACTIVE', color: '#1877F2' },
    { name: 'TikTok', status: 'ACTIVE', color: '#FF0050' },
    { name: 'Website', status: 'ACTIVE', color: '#D4A017' },
  ]

  return (
    <div
      className="rounded-xl border font-mono text-sm overflow-hidden"
      style={{ background: '#020005', borderColor: '#00D4FF30' }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: '#00D4FF20', background: '#00D4FF08' }}>
        <span className="text-cyber-cyan tracking-widest text-xs font-bold">PROPOST LIVE DASHBOARD</span>
        <span className="text-text-tertiary text-xs">Last Sync: {time}</span>
      </div>

      {/* Stats */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-xs">Posts Today:</span>
          <span className="text-cyber-cyan">{posts} ✓</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-xs">Agents Active:</span>
          <span className="text-green-400">150/150</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-xs">Platforms:</span>
          <span className="text-green-400">6/6 online</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-xs">Content Queue:</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-cyber-cyan rounded-full" style={{ width: '94%' }} />
            </div>
            <span className="text-cyber-cyan text-xs">94%</span>
          </div>
        </div>
      </div>

      {/* Platform grid */}
      <div className="px-4 pb-4 grid grid-cols-3 gap-2">
        {platforms.map((p, i) => (
          <div key={i} className="flex items-center gap-1.5 bg-white/5 rounded px-2 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4CAF50', boxShadow: '0 0 4px #4CAF50' }} />
            <span className="text-[10px] text-text-secondary truncate">{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
