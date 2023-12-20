import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from '@/providers/session-provider'
import Footer from '@/components/app/footer'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={`${inter.className}`}>
        <SessionProvider>{children}</SessionProvider>
        <section className="h-[100px] w-full bg-app-gray-003">
          <div className="flex h-full flex-col justify-center">
            <Footer />
          </div>
        </section>
      </body>
    </html>
  )
}
