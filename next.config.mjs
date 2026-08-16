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
      { source: '/work.html', destination: '/work', permanent: true },
      { source: '/book.html', destination: '/book', permanent: true },
      { source: '/story.html', destination: '/about', permanent: true },
      { source: '/press.html', destination: '/press', permanent: true },
      { source: '/booking.html', destination: '/work', permanent: true },
      { source: '/contact.html', destination: '/messages', permanent: true },
      { source: '/gallery.html', destination: '/about', permanent: true },
      { source: '/shop.html', destination: '/about', permanent: true },
      { source: '/feed.html', destination: '/blog', permanent: true },
      { source: '/dates.html', destination: '/', permanent: true },

      // 2026-07 site rebuild: old page set -> new page set.
      { source: '/story', destination: '/about', permanent: true },
      { source: '/tour', destination: '/', permanent: true },
      { source: '/shop', destination: '/about', permanent: true },
      { source: '/gallery', destination: '/about', permanent: true },
      { source: '/contact', destination: '/messages', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/journal', destination: '/blog', permanent: true },
      { source: '/journal/:slug', destination: '/blog/:slug', permanent: true },

      // The printed book's back-matter text says "euginemicah.tech/booking" —
      // redirect rather than reprint. Both old booking routes now point at
      // /work-with-eugine, the 2026-08 rebrand's enquiry hub (previously
      // pointed at /work, which is now the portfolio page, not the booking
      // one -- see the 2026-08 rebrand redirects below).
      { source: '/booking', destination: '/work-with-eugine', permanent: true },
      { source: '/book-me', destination: '/work-with-eugine', permanent: true },

      // 2026-08 rebrand: new brand IA. /about -> /profile and /shows -> /work
      // are full replaces (old pages' content/routes no longer exist).
      // /book, /roylandz, /terms deliberately keep working and are NOT
      // redirected here: /book still has the live Paystack checkout (now
      // also reachable from /ideas, the new canonical book page, without
      // moving the checkout itself or its Paystack success-page target);
      // /roylandz has a fuller real company profile than the new /build
      // page's brief summary, which links to it instead of replacing it;
      // /terms isn't part of the new page set but has real legal content
      // worth keeping reachable.
      { source: '/about', destination: '/profile', permanent: true },
      { source: '/shows', destination: '/work', permanent: true },
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
