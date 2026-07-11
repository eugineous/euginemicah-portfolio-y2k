import fs from 'node:fs';
import path from 'node:path';

export const metadata = { title: 'LinkedIn Audit — Eugine Micah', robots: { index: false, follow: false } };

// Renders reports/linkedin-audit.md (regenerate with `npm run analyze-linkedin`).
// The raw markdown is also committed in /reports for offline reading.
export default function AuditPage() {
  let md = '# LinkedIn Audit\n\nNo report generated yet. Run `npm run analyze-linkedin`.';
  try {
    md = fs.readFileSync(path.join(process.cwd(), 'reports', 'linkedin-audit.md'), 'utf8');
  } catch { /* placeholder text above */ }

  return (
    <div style={{ minHeight: '100vh', maxWidth: 980, margin: '0 auto', padding: '32px 18px 80px' }}>
      <a href="/admin" style={{ color: 'var(--pink)', fontWeight: 800, fontSize: 13 }}>← Control Room</a>
      <article style={{ marginTop: 14 }}>
        {md.split('\n').map((line, i) => {
          if (line.startsWith('# ')) return <h1 key={i} className="em-smash" style={{ fontSize: 30, margin: '10px 0' }}>{line.slice(2)}</h1>;
          if (line.startsWith('## ')) return <h2 key={i} className="em-smash" style={{ fontSize: 20, margin: '26px 0 8px', color: 'var(--yellow)' }}>{line.slice(3)}</h2>;
          if (line.startsWith('|')) {
            const cells = line.split('|').slice(1, -1).map((c) => c.trim());
            const isSep = cells.every((c) => /^-+$/.test(c));
            if (isSep) return null;
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: `repeat(${cells.length}, minmax(70px, 1fr))`, gap: 8, padding: '6px 8px', borderBottom: '1px solid #221e2b', fontSize: 12.5, background: i % 2 ? 'transparent' : '#17141d' }}>
                {cells.map((c, j) => <span key={j} style={{ overflowWrap: 'anywhere' }}>{c}</span>)}
              </div>
            );
          }
          if (/^\d+\. /.test(line)) return <p key={i} style={{ margin: '6px 0', fontSize: 14.5, lineHeight: 1.55 }}>• {line.replace(/^\d+\. /, '')}</p>;
          if (line.startsWith('_') || line.startsWith('>')) return <p key={i} style={{ color: '#8d879c', fontSize: 13, margin: '6px 0' }}>{line.replace(/^[_>]|_$/g, '')}</p>;
          if (line.trim() === '') return <div key={i} style={{ height: 6 }} />;
          return <p key={i} style={{ margin: '6px 0', fontSize: 14.5, lineHeight: 1.6 }}>{line}</p>;
        })}
      </article>
    </div>
  );
}
