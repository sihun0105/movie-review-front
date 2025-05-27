import AppThemeProvider from '@/components/app/app-theme-provider'
import ChatSupport from '@/components/app/chat-support'
import Footer from '@/components/app/footer'
import Header from '@/components/app/header'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { SessionProvider } from '@/providers/session-provider'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://drunkenmovie.shop'),
  title: 'DrunkenMovie',
  description: '최신 영화 리뷰와 평점을 확인하세요!',
  keywords: ['추천', '평가', '영화'],
  authors: [{ name: 'DrunkenMovie' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://drunkenmovie.shop',
    siteName: '영화뭐함',
    title: '영화뭐함 - DrunkenMovie',
    description: '최신 영화 리뷰와 평점을 확인하세요!',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DrunkenMovie OG 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '영화뭐함 - DrunkenMovie',
    description: '최신 영화 리뷰와 평점을 확인하세요!',
    images: ['/images/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DrunkenMovie',
    url: `https://drunkenmovie.shop`,
  }
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="15x15"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/favicon/favicon-48x48.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="64x64"
          href="/favicon/favicon-64x64.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="128x128"
          href="/favicon/favicon-128x128.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="256x256"
          href="/favicon/favicon-256x256.png"
        />
      </head>
      <body
        className={cn(
          'flex min-h-screen flex-col items-center',
          roboto.className,
        )}
      >
        <SessionProvider>
          <AppThemeProvider>
            <div className="mx-auto flex min-h-screen w-full max-w-[460px] flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
              <ChatSupport />
              <Toaster />
            </div>
          </AppThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
