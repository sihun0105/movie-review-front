/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: [
      'kmdb.or.kr',
      'file.koreafilm.or.kr',
      'uploads.drunkenmovie.shop',
      'image.tmdb.org',
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
