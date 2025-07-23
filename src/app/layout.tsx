import AppThemeProvider from '@/components/app/app-theme-provider'
import BottomNav from '@/components/app/bottom-nav'
import ChatSupport from '@/components/app/chat-support'
import Footer from '@/components/app/footer'
import Header from '@/components/app/header'
import { Toaster } from '@/components/ui/toaster'
import { MessageModalContextProvider } from '@/hooks/use-message-modal-context'
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
  title: '영화 뭐함 - 영화뭐함 | 최신 영화 리뷰와 추천',
  description:
    '영화 뭐함? 영화뭐함에서 최신 영화 리뷰, 평점, 추천을 확인하세요! 어떤 영화를 볼지 고민될 때 영화 뭐함 사이트에서 완벽한 답을 찾으세요.',
  keywords: [
    '영화 뭐함',
    '영화뭐함',
    '영화 추천',
    '영화 리뷰',
    '영화 평점',
    '최신 영화',
    '영화 순위',
    '영화 정보',
    '영화 커뮤니티',
    '영화 고민',
    '무슨 영화',
    '어떤 영화',
    '영화 선택',
    '영화 찾기',
    '볼만한 영화',
    'DrunkenMovie',
    'drunkenmovie',
  ],
  authors: [{ name: '영화뭐함 - DrunkenMovie' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://drunkenmovie.shop',
    siteName: '영화 뭐함 - 영화뭐함',
    title: '영화 뭐함? 영화뭐함에서 찾는 완벽한 영화 추천',
    description:
      '영화 뭐함? 영화뭐함에서 최신 영화 리뷰, 평점, 추천을 확인하세요! 어떤 영화를 볼지 고민될 때 완벽한 답을 찾으세요.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '영화 뭐함 - 영화뭐함 OG 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '영화 뭐함? 영화뭐함에서 찾는 완벽한 영화 추천',
    description:
      '영화 뭐함? 영화뭐함에서 최신 영화 리뷰, 평점, 추천을 확인하세요!',
    images: ['/images/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://drunkenmovie.shop',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '영화 뭐함 - 영화뭐함',
    alternateName: ['영화뭐함', '영화 뭐함', 'DrunkenMovie'],
    url: 'https://drunkenmovie.shop',
    description:
      '영화 뭐함? 영화뭐함에서 최신 영화 리뷰, 평점, 추천을 확인하세요!',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://drunkenmovie.shop/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    mainEntity: {
      '@type': 'Organization',
      name: '영화뭐함',
      sameAs: ['https://drunkenmovie.shop'],
      logo: {
        '@type': 'ImageObject',
        url: 'https://drunkenmovie.shop/images/og-image.png',
      },
    },
  }
  return (
    <html lang="ko">
      <head>
        <meta
          name="google-site-verification"
          content="4StxYcl8XHxRM28X7KZbRNrE7fjOjFH5oM8XBKk9YkM"
        />
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
            <MessageModalContextProvider>
              <div className="mx-auto flex min-h-screen w-full max-w-[460px] flex-col">
                <Header />
                <main className="min-h-page">
                  {children}
                  <Footer className="pb-[var(--footer-height)]" />
                </main>
                <BottomNav />
                <ChatSupport />
                <Toaster />
              </div>
            </MessageModalContextProvider>
          </AppThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
