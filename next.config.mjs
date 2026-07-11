/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  // The original y2k static site lives at the repo root and is copied into
  // /public by scripts/sync-static.mjs at build time. `/` serves index.html
  // verbatim so the existing site is preserved byte-for-byte; the Next app
  // adds /admin, /admin/linkedin-audit and the API layer around it.
  async rewrites() {
    return [{ source: '/', destination: '/index.html' }];
  },
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
