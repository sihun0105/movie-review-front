import AppThemeProvider from '@/components/app/app-theme-provider'
import BottomNav from '@/components/app/bottom-nav'

import Footer from '@/components/app/footer'
import Header from '@/components/app/header'
import { Toaster } from '@/components/ui/toaster'
import { MessageModalContextProvider } from '@/hooks/use-message-modal-context'
import { cn } from '@/lib/utils'
import { SessionProvider } from '@/providers/session-provider'
import '@/styles/globals.css'
import { Roboto } from 'next/font/google'
import Script from 'next/script'
import { siteMetadata, siteJsonLd } from './site-metadata'

export const metadata = siteMetadata

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

// dm 폰트는 runtime <link> 로 로드한다.
// next/font/google 는 빌드 타임에 fonts.gstatic.com 으로 fetch 하는데, Docker
// 빌드 환경의 네트워크 제약으로 실패한 이력이 있어 (PR #213·#215) 안정성을
// 위해 클라이언트 사이드 로드로 전환. 폰트 family 는 dm/tokens.css 에 정의.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* dm 폰트 — runtime fetch (build network 우회) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K2TN4MLS');`,
          }}
        />
        {/* End Google Tag Manager */}
        <meta
          name="google-site-verification"
          content="4StxYcl8XHxRM28X7KZbRNrE7fjOjFH5oM8XBKk9YkM"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K2TN4MLS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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
                {/* <ChatSupport /> */}
                <Toaster />
              </div>
            </MessageModalContextProvider>
          </AppThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
