import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { SessionProvider } from '@/providers/session-provider'
import Footer from '@/components/app/footer'
import Header from '@/components/app/header'
import { cn } from '@/lib/utils'
import { ThemeProvider } from 'next-themes'
import ChatSupport from '@/components/app/chat-support'
import GoogleAd from '@/components/app/googleAd'
import { Toaster } from '@/components/ui/toaster'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://drunkenmovie.shop'),
  title: 'Drunken Movie',
  description: 'Drunken Movie',
  keywords: [
    '영화',
    '뭐함',
    'movie',
    'what',
    'watch',
    '영화뭐함',
    '영화 뭐함',
    '영화 뭐봄',
    '영화뭐봄',
    '영화 평점',
    '영화 추천',
    '미키17',
    '요즘영화',
    '드렁큰무비',
    '영화는술이다',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://drunkenmovie.shop',
    siteName: '영화뭐함',
    title: '영화뭐함',
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
  return (
    <html lang="ko">
      <head>
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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="w-full max-w-[460px]">
              <header className="w-full">
                <Header />
              </header>
            </div>

            <div className="relative flex h-full min-h-screen w-full min-w-[320px] max-w-[460px] flex-col bg-white dark:bg-black">
              {children}
              <ChatSupport />
              <Footer />
              <Toaster />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
