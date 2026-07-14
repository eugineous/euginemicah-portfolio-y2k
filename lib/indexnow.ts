const SITE = 'https://euginemicah.tech';

// IndexNow lets us push URLs straight to Bing/Yandex/Seznam (and any other
// participating engine) instead of waiting for their next crawl. Not
// Google-specific — Google's old /ping?sitemap= endpoint was deprecated.
// This key isn't a secret: it only proves domain ownership by also being
// hosted as plain text at /{key}.txt (IndexNow spec requirement).
const INDEXNOW_KEY = '7db2168ad0b478f09d67b24b6166b37a';
const INDEXNOW_KEY_LOCATION = `${SITE}/${INDEXNOW_KEY}.txt`;

export async function pingIndexNow(paths: string[]): Promise<void> {
  if (!paths.length) return;
  const urlList = paths.map((p) => SITE + (p.startsWith('/') ? p : `/${p}`));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: new URL(SITE).host,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList,
      }),
      signal: controller.signal,
    });
  } catch (e: any) {
    console.warn('[indexnow] ping failed (non-fatal):', String(e?.message || e));
  } finally {
    clearTimeout(timeout);
  }
}
