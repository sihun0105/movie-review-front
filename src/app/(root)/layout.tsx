import Footer from '@/components/app/footer'
import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'

import moment from 'moment'
moment.locale('ko')

/**
 * @see https://www.npmjs.com/package/react-circular-progressbar
 */
import 'react-circular-progressbar/dist/styles.css'
/**
 *  @see https://www.npmjs.com/package/react-responsive-carousel
 */
import '@/styles/globals.css'
import Navbar from '@/components/app/navbar'
import { LoginFormClient } from '@/components/app/login-form-client'

export const metadata: Metadata = {
  title: '썩은양배추',
  description: '썩은양배추',
  keywords: '썩은양배추',
}
interface AppLayoutProps extends PropsWithChildren {}

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="sticky top-0 z-10 w-full">
          <header className="header-h w-full ">
            <Navbar />
          </header>
        </div>
        <div className="header-h" />
        <section className="flex flex-row">
          <section>
            <LoginFormClient /> {/* 수정된 부분 */}
          </section>
          {children}
        </section>
        <section className="sticky bottom-0 h-[164px] w-full bg-app-gray-002">
          <div className="flex h-full flex-col justify-end">
            <Footer />
          </div>
        </section>
      </body>
    </html>
  )
}

export default AppLayout
