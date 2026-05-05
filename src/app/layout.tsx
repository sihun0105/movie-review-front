import AppThemeProvider from '@/components/app/app-theme-provider'
import { NicknameGuard } from '@/components/app/nickname-guard'
import {
  DmAppBar,
  DmAppFooter,
  DmBottomNav,
  DmDesktopLeftNav,
  DmDesktopRightSidebar,
} from '@/components/dm'
import { Toaster } from '@/components/ui/toaster'
import { MessageModalContextProvider } from '@/hooks/use-message-modal-context'
import { cn } from '@/lib/utils'
import { SessionProvider } from '@/providers/session-provider'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { siteMetadata, siteJsonLd } from './site-metadata'

export const metadata = siteMetadata

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
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
        {/* Geist Mono — runtime fetch (build network 우회) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap"
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
      <body className={cn('bg-background text-foreground antialiased', inter.className, inter.variable)}>
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
            <NicknameGuard />
            <MessageModalContextProvider>
              {/* mobile: single column max-w-[460px] centered
                  desktop lg+: 3-column [240px | 1fr | 320px] max-w-[1400px] */}
              <div className="mx-auto flex min-h-screen w-full max-w-[460px] flex-col lg:max-w-[1400px] lg:flex-row lg:items-start">
                <DmDesktopLeftNav />

                <div className="flex w-full min-w-0 flex-1 flex-col lg:border-x lg:border-border">
                  <div className="lg:hidden">
                    <DmAppBar />
                  </div>
                  <main className="flex min-h-page flex-1 flex-col">
                    {children}
                    <DmAppFooter className="mt-auto pb-[88px] lg:pb-8" />
                  </main>
                  <div className="lg:hidden">
                    <DmBottomNav />
                  </div>
                </div>

                <DmDesktopRightSidebar />
              </div>
              <Toaster />
            </MessageModalContextProvider>
          </AppThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
