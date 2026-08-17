import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { PRESS_EMAIL, facts, shortBio, longBio } from '../../(site)/press/page';

// Real, server-generated media kit PDF, replacing the browser-print-only
// version -- a known gap flagged in the original design handoff ("Media
// kit is currently a browser print of the Press page, not a designed
// PDF"). Same real content as /press (bio, quick facts, contact) -- no new
// facts invented for this, just reformatted into a downloadable document.
// Text-only: no embedded photos, to keep this simple and to avoid the
// added complexity/failure surface of image embedding on a Cloudflare
// Workers runtime, which pdf-lib (chosen specifically for having no Node-
// native dependencies) otherwise handles fine.
//
// force-dynamic isn't relevant here since this is a route handler that
// always executes fresh per request (route handlers aren't statically
// cached the way page components can be).

const PAGE_WIDTH = 612; // US Letter, points
const PAGE_HEIGHT = 792;
const MARGIN = 56;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const CRIMSON = rgb(0.82, 0.15, 0.17); // #D1272C
const INK = rgb(0.09, 0.09, 0.1); // #17171A
const GREY = rgb(0.4, 0.4, 0.4);

function wrapText(text: string, font: any, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function GET() {
  const doc = await PDFDocument.create();
  doc.setTitle('Eugine Micah: Media Kit');
  doc.setAuthor('Eugine Micah');

  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const italic = await doc.embedFont(StandardFonts.HelveticaOblique);

  let page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  function ensureSpace(needed: number) {
    if (y - needed < MARGIN) {
      page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      y = PAGE_HEIGHT - MARGIN;
    }
  }

  function heading(text: string, size = 22) {
    ensureSpace(size + 10);
    page.drawText(text, { x: MARGIN, y, size, font: bold, color: INK });
    y -= size + 10;
  }

  function kicker(text: string) {
    ensureSpace(20);
    page.drawText(text.toUpperCase(), { x: MARGIN, y, size: 10, font: bold, color: CRIMSON });
    y -= 24;
  }

  function subheading(text: string) {
    ensureSpace(24);
    page.drawText(text, { x: MARGIN, y, size: 13, font: bold, color: INK });
    y -= 20;
  }

  function paragraph(text: string, size = 10.5, lineHeight = 15, color = INK) {
    const lines = wrapText(text, regular, size, CONTENT_WIDTH);
    for (const line of lines) {
      ensureSpace(lineHeight);
      page.drawText(line, { x: MARGIN, y, size, font: regular, color });
      y -= lineHeight;
    }
    y -= 8;
  }

  // Header
  kicker('Media kit');
  heading('Eugine Micah');
  page.drawText('Broadcaster, journalist, and founder', { x: MARGIN, y, size: 12, font: italic, color: GREY });
  y -= 30;

  // Short bio
  subheading('Short bio');
  paragraph(shortBio);

  // Long bio
  subheading('Full bio');
  paragraph(longBio);

  // Quick facts
  subheading('Quick facts');
  ensureSpace(facts.length * 16 + 10);
  for (const [value, label] of facts) {
    ensureSpace(16);
    page.drawText(value, { x: MARGIN, y, size: 10.5, font: bold, color: CRIMSON });
    page.drawText(label, { x: MARGIN + 70, y, size: 10.5, font: regular, color: INK });
    y -= 16;
  }
  y -= 14;

  // Contact
  subheading('Press contact');
  paragraph(PRESS_EMAIL);
  paragraph('euginemicah.tech/press');

  const bytes = await doc.save();
  return new Response(new Uint8Array(bytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="eugine-micah-media-kit.pdf"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
