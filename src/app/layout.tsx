import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { SessionProvider } from '@/providers/session-provider'
import Footer from '@/components/app/footer'
import Header from '@/components/app/header'
import { cn } from '@/lib/utils'
import { ThemeProvider } from 'next-themes'
import ChatSupport from '@/components/app/chat-support'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: '영화뭐함',
  description: '영화뭐함',
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
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://movie-watch.vercel.app',
    siteName: '영화뭐함',
    title: '영화뭐함',
  },
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
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
      <body className={cn('flex justify-center', roboto.className)}>
        <div className="relative h-full w-full min-w-[320px] max-w-[460px] bg-white dark:bg-black">
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
              <ChatSupport />
              <Footer />
            </ThemeProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  )
}
