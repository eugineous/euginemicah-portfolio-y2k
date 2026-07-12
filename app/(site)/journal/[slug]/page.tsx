import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articlesData } from '@/content/em-site-data';

export function generateStaticParams() {
  return articlesData.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.deck,
    alternates: { canonical: `/journal/${slug}` },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug);
  if (!article) notFound();

  const leadFirst = article.lead.slice(0, 1);
  const leadRest = article.lead.slice(1);

  return (
    <main>
      <article style={{ borderBottom: '2px solid #191613' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '64px 28px 90px' }}>
          <Link href="/journal" style={{ marginBottom: 36, padding: '10px 18px', border: '2px solid #191613', fontFamily: "'Spline Sans Mono'", fontSize: 11.5, letterSpacing: '.14em', textTransform: 'uppercase', display: 'inline-block' }}>&larr; Back to the desk</Link>
          <p style={{ margin: '0 0 16px', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase' }}>
            <span style={{ color: '#C03B22', fontWeight: 600 }}>{article.cat}</span>
            <span style={{ color: '#6E6455' }}> · {article.date} · {article.read} min read</span>
          </p>
          <h1 style={{ margin: '0 0 18px', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 'clamp(36px,4.6vw,64px)', lineHeight: 1, letterSpacing: '-.02em' }}>{article.title}</h1>
          <p style={{ margin: '0 0 30px', fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 22, lineHeight: 1.45, color: '#4A4237' }}>{article.deck}</p>
          <p style={{ margin: '0 0 34px', padding: '14px 0', borderTop: '2px solid #191613', borderBottom: '1px solid #191613', fontFamily: "'Spline Sans Mono'", fontSize: 11.5, letterSpacing: '.14em', textTransform: 'uppercase', color: '#6E6455' }}>By Eugine Micah · Nairobi Desk · Filed under strong opinions</p>

          <p style={{ margin: '0 0 24px', fontFamily: "'Newsreader'", fontSize: 19, lineHeight: 1.85 }}>
            <span style={{ float: 'left', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 64, lineHeight: .8, padding: '6px 12px 0 0', color: '#C03B22' }}>{leadFirst}</span>
            {leadRest}
          </p>

          {article.parasA.map((pa, i) => (
            <p key={i} style={{ margin: '0 0 24px', fontFamily: "'Newsreader'", fontSize: 19, lineHeight: 1.85 }}>{pa}</p>
          ))}

          <div style={{ margin: '38px 0', padding: '26px 30px', borderTop: '3px solid #C03B22', borderBottom: '3px solid #C03B22' }}>
            <p style={{ margin: 0, fontFamily: "'Bricolage Grotesque'", fontWeight: 700, fontSize: 'clamp(22px,2.4vw,30px)', lineHeight: 1.25 }}>&ldquo;{article.pull}&rdquo;</p>
          </div>

          {article.parasB.map((pb, i) => (
            <p key={i} style={{ margin: '0 0 24px', fontFamily: "'Newsreader'", fontSize: 19, lineHeight: 1.85 }}>{pb}</p>
          ))}

          <p style={{ margin: '36px 0 0', fontFamily: "'Spline Sans Mono'", fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: '#6E6455' }}>&mdash; EM ★ Nairobi</p>

          <div style={{ marginTop: 56, paddingTop: 28, borderTop: '2px solid #191613', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Newsreader'", fontStyle: 'italic', fontSize: 16, color: '#6E6455' }}>Enjoyed this? The book is 45 chapters of it.</span>
            <Link href="/book" style={{ padding: '13px 24px', background: '#C03B22', color: '#F6F0E2', fontFamily: "'Spline Sans Mono'", fontWeight: 600, fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase' }}>Get the book &rarr;</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
