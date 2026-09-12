/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ['kmdb.or.kr', 'file.koreafilm.or.kr', 'image.tmdb.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'bollae-uploads-prod-058511778476-ap-northeast-2-an.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      { protocol: 'https', hostname: '*.bollae.kr' },
      { protocol: 'http', hostname: '58.79.17.11' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
