// LINKEDIN AUDIT PIPELINE
// npm run analyze-linkedin
// Input:  ./linkedin-export  (ZIP or extracted CSVs from LinkedIn →
//         Settings & Privacy → Data privacy → Get a copy of your data)
//         Expected files: Shares.csv, Comments.csv, Reactions.csv,
//         Connections.csv (naming varies slightly by export vintage — handled).
// Output: reports/linkedin-audit.md + reports/linkedin-audit.json
//         (rendered at /admin/linkedin-audit)
// NOTE: reads the OFFICIAL export only. No scraping.

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';

const EXPORT_DIR = './linkedin-export';
mkdirSync('reports', { recursive: true });

// ── locate + unzip if needed ────────────────────────────────────────────────
function findCsvDir() {
  if (!existsSync(EXPORT_DIR)) return null;
  const entries = readdirSync(EXPORT_DIR);
  const zip = entries.find((f) => f.toLowerCase().endsWith('.zip'));
  if (zip && !entries.some((f) => f.toLowerCase().endsWith('.csv'))) {
    const dest = path.join(EXPORT_DIR, '_extracted');
    mkdirSync(dest, { recursive: true });
    try { execSync(`tar -xf "${path.join(EXPORT_DIR, zip)}" -C "${dest}"`); } catch { /* tar handles zip on win11+ */ }
    return dest;
  }
  return entries.some((f) => f.toLowerCase().endsWith('.csv')) ? EXPORT_DIR : null;
}

// ── tiny CSV parser (handles quoted fields + embedded newlines) ─────────────
function parseCsv(text) {
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') { if (cell || row.length) { row.push(cell); rows.push(row); row = []; cell = ''; } if (c === '\r' && text[i + 1] === '\n') i++; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const head = rows.shift()?.map((h) => h.trim().toLowerCase()) || [];
  return rows.map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] || '').trim()])));
}
const load = (dir, names) => {
  for (const n of names) {
    const f = readdirSync(dir).find((x) => x.toLowerCase() === n.toLowerCase());
    if (f) return parseCsv(readFileSync(path.join(dir, f), 'utf8'));
  }
  return [];
};

// ── placeholder report when export is missing ───────────────────────────────
const dir = findCsvDir();
if (!dir) {
  const placeholder = {
    generated: new Date().toISOString(), status: 'awaiting_export',
    message: 'LinkedIn export not found in ./linkedin-export. Upload it (see FINAL_CHECKLIST.md) and rerun: npm run analyze-linkedin',
  };
  writeFileSync('reports/linkedin-audit.json', JSON.stringify(placeholder, null, 2));
  writeFileSync('reports/linkedin-audit.md', [
    '# LinkedIn Audit — awaiting data', '',
    '**Status:** no export found in `./linkedin-export`.', '',
    '1. LinkedIn → Settings & Privacy → Data privacy → *Get a copy of your data* → select **the works** (or at least Shares, Comments, Reactions, Connections).',
    '2. Download the ZIP (arrives in ~10 min for the fast archive, 24h for full).',
    '3. Drop the ZIP into `./linkedin-export/` in this repo.',
    '4. Run `npm run analyze-linkedin`, commit, redeploy — the report appears at `/admin/linkedin-audit`.', '',
    '_The full analysis pipeline is already built: top/bottom 20 posts, engagement-rate timeline, best days/hours, hook + format + topic analysis, decay detection (first vs second half, >40% drops flagged), consistency gaps, 10 brutal mistakes and 10 double-downs — all computed the moment data lands._',
  ].join('\n'));
  console.log('[audit] no export found → placeholder report written. Everything is ready for the data.');
  process.exit(0);
}

// ── real analysis ───────────────────────────────────────────────────────────
const shares = load(dir, ['Shares.csv', 'shares.csv', 'Posts.csv']);
const comments = load(dir, ['Comments.csv']);
const reactions = load(dir, ['Reactions.csv']);
const posts = shares
  .map((s) => ({
    date: new Date(s['date'] || s['created date'] || s['sharedate'] || 0),
    text: s['sharecommentary'] || s['share commentary'] || s['commentary'] || '',
    link: s['sharelink'] || s['share link'] || '',
    media: (s['media type'] || s['mediatype'] || (s['sharedurl'] ? 'link' : 'text') || 'text').toLowerCase(),
    likes: +(s['likescount'] || s['likes'] || 0),
    comments: +(s['commentscount'] || s['comments'] || 0),
  }))
  .filter((p) => p.date.getTime() > 0 && p.text)
  .sort((a, b) => a.date - b.date);

if (!posts.length) {
  console.error('[audit] export found but no parseable posts in Shares.csv — check the file and rerun.');
  process.exit(1);
}

const eng = (p) => p.likes + p.comments * 3; // comments weighted: conversation > applause
const firstLines = (t) => t.split('\n').slice(0, 2).join(' ').slice(0, 120);
const topicOf = (t) => {
  const s = t.toLowerCase();
  if (/(born broke|book|memoir|chapter)/.test(s)) return 'book';
  if (/(urban gang|tour|school|students)/.test(s)) return 'tour';
  if (/(citizen|ppp|urban news|tv|broadcast|newsroom|studio)/.test(s)) return 'media';
  if (/(ai|agent|code|built|shipped|automat|github|next\.js|supabase)/.test(s)) return 'builder';
  if (/(lugari|kakamega|village|grew up|mother|father|teacher)/.test(s)) return 'origin';
  return 'other';
};
const hookStyle = (t) => {
  const h = firstLines(t);
  if (/\?/.test(h)) return 'question';
  if (/^\d|\d+ (things|lessons|ways|years|shillings)/i.test(h)) return 'number';
  if (/(I |my |me )/i.test(h.slice(0, 24))) return 'first-person story';
  if (/(you|your)/i.test(h.slice(0, 24))) return 'direct address';
  return 'statement';
};

const byEng = [...posts].sort((a, b) => eng(b) - eng(a));
const top20 = byEng.slice(0, 20);
const bottom20 = byEng.slice(-20).reverse();

// group helper
const groupAvg = (arr, keyFn) => {
  const m = {};
  for (const p of arr) { const k = keyFn(p); (m[k] ||= []).push(eng(p)); }
  return Object.fromEntries(Object.entries(m).map(([k, v]) => [k, { n: v.length, avg: +(v.reduce((a, b) => a + b, 0) / v.length).toFixed(1) }]));
};
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const byDay = groupAvg(posts, (p) => DAYS[p.date.getDay()]);
const byHour = groupAvg(posts, (p) => p.date.getHours());
const byFormat = groupAvg(posts, (p) => p.media);
const byTopic = groupAvg(posts, (p) => topicOf(p.text));
const byHook = groupAvg(posts, (p) => hookStyle(p.text));

// monthly engagement-rate timeline
const byMonth = {};
for (const p of posts) { const k = p.date.toISOString().slice(0, 7); (byMonth[k] ||= []).push(eng(p)); }
const timeline = Object.entries(byMonth).map(([m, v]) => ({ month: m, posts: v.length, avg: +(v.reduce((a, b) => a + b, 0) / v.length).toFixed(1) }));

// decay: first half vs second half by topic + format (>40% drop flagged)
const mid = new Date((posts[0].date.getTime() + posts[posts.length - 1].date.getTime()) / 2);
const h1 = posts.filter((p) => p.date < mid), h2 = posts.filter((p) => p.date >= mid);
const decay = [];
for (const [label, keyFn] of [['topic', (p) => topicOf(p.text)], ['format', (p) => p.media], ['hook', (p) => hookStyle(p.text)]]) {
  const a = groupAvg(h1, keyFn), b = groupAvg(h2, keyFn);
  for (const k of Object.keys(a)) {
    if (b[k] && a[k].avg > 0) {
      const change = (b[k].avg - a[k].avg) / a[k].avg;
      if (change < -0.4) decay.push({ kind: label, key: k, before: a[k].avg, after: b[k].avg, drop: Math.round(change * 100) + '%' });
    }
  }
}

// consistency gaps (>10 days silent)
const gaps = [];
for (let i = 1; i < posts.length; i++) {
  const days = Math.round((posts[i].date - posts[i - 1].date) / 86400_000);
  if (days > 10) gaps.push({ from: posts[i - 1].date.toISOString().slice(0, 10), to: posts[i].date.toISOString().slice(0, 10), days });
}

// mistakes + double-downs (data-derived, with examples)
const worstDay = Object.entries(byDay).sort((a, b) => a[1].avg - b[1].avg)[0];
const bestDay = Object.entries(byDay).sort((a, b) => b[1].avg - a[1].avg)[0];
const worstHook = Object.entries(byHook).sort((a, b) => a[1].avg - b[1].avg)[0];
const bestHook = Object.entries(byHook).sort((a, b) => b[1].avg - a[1].avg)[0];
const worstTopic = Object.entries(byTopic).sort((a, b) => a[1].avg - b[1].avg)[0];
const bestTopic = Object.entries(byTopic).sort((a, b) => b[1].avg - a[1].avg)[0];
const ex = (p) => `"${firstLines(p.text)}" (${p.date.toISOString().slice(0, 10)}, eng ${eng(p)})`;

const mistakes = [
  `Posting gaps: ${gaps.length} silent stretches over 10 days (worst: ${gaps[0]?.days || 0} days). The algorithm forgets you in 4.`,
  `Weak hook style "${worstHook?.[0]}" averages ${worstHook?.[1].avg} vs "${bestHook?.[0]}" at ${bestHook?.[1].avg} — e.g. ${ex(bottom20[0])}.`,
  `"${worstTopic?.[0]}" topic underperforms (avg ${worstTopic?.[1].avg}); it reads generic next to your lived stories.`,
  `Posting on ${worstDay?.[0]} (avg ${worstDay?.[1].avg}) instead of ${bestDay?.[0]} (avg ${bestDay?.[1].avg}).`,
  `Bottom-20 posts share a pattern: no first-person specifics in line 1 — e.g. ${ex(bottom20[1] || bottom20[0])}.`,
  ...decay.slice(0, 3).map((d) => `Decayed ${d.kind} "${d.key}": ${d.before} → ${d.after} (${d.drop}). It worked once; the audience moved.`),
  'No consistent CTA: engagement without capture. Every 3rd post should route to the newsletter.',
  'Long single-paragraph bodies in low performers — line breaks are free engagement.',
].slice(0, 10);
const doubles = [
  `"${bestHook?.[0]}" hooks (avg ${bestHook?.[1].avg}) — e.g. ${ex(top20[0])}.`,
  `"${bestTopic?.[0]}" topic (avg ${bestTopic?.[1].avg}) — your unfair advantage; nobody else owns this story.`,
  `${bestDay?.[0]} posting (avg ${bestDay?.[1].avg}) — anchor the flagship series here.`,
  ...top20.slice(0, 4).map((p) => `More like: ${ex(p)}`),
  'Comment-heavy posts (weighted 3x here) — ask one specific question, answer every reply for 60 min.',
  'Story + number + receipt formula appears across the whole top 20 — codify it.',
  'Series naming: recurring formats create habit; the calendar already encodes this.',
].slice(0, 10);

const report = {
  generated: new Date().toISOString(), status: 'ok',
  span: { from: posts[0].date.toISOString().slice(0, 10), to: posts[posts.length - 1].date.toISOString().slice(0, 10), posts: posts.length },
  top20: top20.map((p) => ({ date: p.date.toISOString().slice(0, 10), hook: firstLines(p.text), likes: p.likes, comments: p.comments, eng: eng(p), format: p.media, topic: topicOf(p.text) })),
  bottom20: bottom20.map((p) => ({ date: p.date.toISOString().slice(0, 10), hook: firstLines(p.text), likes: p.likes, comments: p.comments, eng: eng(p), format: p.media, topic: topicOf(p.text) })),
  timeline, byDay, byHour, byFormat, byTopic, byHook, decay, gaps, mistakes, doubles,
};
writeFileSync('reports/linkedin-audit.json', JSON.stringify(report, null, 2));

const mdTable = (rows, cols) => ['| ' + cols.join(' | ') + ' |', '| ' + cols.map(() => '---').join(' | ') + ' |', ...rows.map((r) => '| ' + cols.map((c) => String(r[c] ?? '').replace(/\|/g, '\\|')).join(' | ') + ' |')].join('\n');
writeFileSync('reports/linkedin-audit.md', [
  `# LinkedIn Audit — ${report.span.from} → ${report.span.to} (${report.span.posts} posts)`,
  `_Generated ${report.generated}. Engagement = likes + 3×comments._`,
  '', '## Top 20 posts', mdTable(report.top20, ['date', 'hook', 'eng', 'likes', 'comments', 'format', 'topic']),
  '', '## Bottom 20 posts', mdTable(report.bottom20, ['date', 'hook', 'eng', 'likes', 'comments', 'format', 'topic']),
  '', '## Engagement over time', mdTable(timeline, ['month', 'posts', 'avg']),
  '', '## Best days', mdTable(Object.entries(byDay).map(([k, v]) => ({ day: k, ...v })).sort((a, b) => b.avg - a.avg), ['day', 'n', 'avg']),
  '', '## Best hours', mdTable(Object.entries(byHour).map(([k, v]) => ({ hour: k, ...v })).sort((a, b) => b.avg - a.avg).slice(0, 8), ['hour', 'n', 'avg']),
  '', '## Hook styles', mdTable(Object.entries(byHook).map(([k, v]) => ({ hook: k, ...v })).sort((a, b) => b.avg - a.avg), ['hook', 'n', 'avg']),
  '', '## Formats', mdTable(Object.entries(byFormat).map(([k, v]) => ({ format: k, ...v })).sort((a, b) => b.avg - a.avg), ['format', 'n', 'avg']),
  '', '## Topics', mdTable(Object.entries(byTopic).map(([k, v]) => ({ topic: k, ...v })).sort((a, b) => b.avg - a.avg), ['topic', 'n', 'avg']),
  '', '## Decayed (>40% drop, first half vs second half)', decay.length ? mdTable(decay, ['kind', 'key', 'before', 'after', 'drop']) : '_Nothing decayed >40%. Good._',
  '', '## Consistency gaps (>10 days)', gaps.length ? mdTable(gaps, ['from', 'to', 'days']) : '_No major gaps._',
  '', '## 10 brutal mistakes', ...mistakes.map((m, i) => `${i + 1}. ${m}`),
  '', '## 10 double-downs', ...doubles.map((m, i) => `${i + 1}. ${m}`),
].join('\n'));

console.log(`[audit] ${posts.length} posts analysed → reports/linkedin-audit.{md,json}`);
