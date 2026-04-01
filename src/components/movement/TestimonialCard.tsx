interface TestimonialCardProps {
  quote: string
  author: string
}

export function TestimonialCard({ quote, author }: TestimonialCardProps) {
  return (
    <div className="glass rounded-xl p-6 border border-white/10">
      <p className="font-body text-text-secondary italic mb-4">"{quote}"</p>
      <p className="font-mono text-xs text-text-tertiary">— {author}</p>
    </div>
  )
}
