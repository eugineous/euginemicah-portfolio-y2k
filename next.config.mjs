/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  // The marketing site is now real App Router routes under app/(site)/ —
  // no more static-HTML-in-/public rewrite. /admin (LinkedIn Control Room)
  // and its API layer are untouched, separate from this.
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/story.html', destination: '/story', permanent: true },
      { source: '/work.html', destination: '/work', permanent: true },
      { source: '/book.html', destination: '/book', permanent: true },
      { source: '/press.html', destination: '/story', permanent: true },
      { source: '/booking.html', destination: '/book-me', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/gallery.html', destination: '/gallery', permanent: true },
      { source: '/shop.html', destination: '/shop', permanent: true },
      { source: '/feed.html', destination: '/journal', permanent: true },
      { source: '/dates.html', destination: '/tour', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/hq-assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
