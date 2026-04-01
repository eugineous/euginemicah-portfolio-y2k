'use client'

import { useState } from 'react'
import { EUGINE } from '@/lib/constants'

const SOCIALS = [
  { name: 'LinkedIn', href: EUGINE.social.linkedin, color: '#0077B5', icon: 'in' },
  { name: 'Twitter/X', href: EUGINE.social.twitter, color: '#1DA1F2', icon: '𝕏' },
  { name: 'Instagram', href: EUGINE.social.instagram, color: '#E1306C', icon: '◉' },
  { name: 'Facebook', href: EUGINE.social.facebook, color: '#1877F2', icon: 'f' },
  { name: 'TikTok', href: EUGINE.social.tiktok, color: '#FF0050', icon: '♪' },
  { name: 'YouTube', href: EUGINE.social.youtube, color: '#FF0000', icon: '▶' },
]

export function SocialLinks() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {SOCIALS.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(social.name)}
          onMouseLeave={() => setHovered(null)}
          className="flex flex-col items-center gap-2 group"
          aria-label={social.name}
        >
          <div
            className="w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300"
            style={{
              borderColor: hovered === social.name ? social.color : 'rgba(255,255,255,0.15)',
              background: hovered === social.name ? `${social.color}20` : 'rgba(255,255,255,0.03)',
              boxShadow: hovered === social.name ? `0 0 20px ${social.color}40` : 'none',
              color: hovered === social.name ? social.color : 'var(--color-text-secondary)',
            }}
          >
            <span className="font-mono text-sm font-bold">{social.icon}</span>
          </div>
          <span className="font-mono text-[10px] text-text-tertiary tracking-wider group-hover:text-text-secondary transition-colors">
            {social.name.toUpperCase()}
          </span>
        </a>
      ))}
    </div>
  )
}
