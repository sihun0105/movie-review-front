import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { SessionProvider } from '@/providers/session-provider'
import Footer from '@/components/app/footer'
import Header from '@/components/app/header'
import { cn } from '@/lib/utils'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: '썩은양배추',
  description: '썩은양배추',
  keywords: '썩은양배추',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={cn('flex justify-center', roboto.className)}>
        <div className="relative h-full w-full min-w-[320px] max-w-[460px]">
          <SessionProvider>
            <Header />
            {children}
            <Footer />
          </SessionProvider>
        </div>
      </body>
    </html>
  )
}
