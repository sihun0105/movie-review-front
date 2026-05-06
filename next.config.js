/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: [
      'kmdb.or.kr',
      'file.koreafilm.or.kr',
      'image.tmdb.org',
    ],
    remotePatterns: [
      { protocol: 'https', hostname: '*.drunkenmovie.shop' },
      { protocol: 'http', hostname: '58.79.17.11' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
