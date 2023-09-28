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

export const metadata: Metadata = {
  title: '썩은사과',
  description: '썩은사과',
  keywords: '썩은사과',
}
interface AppLayoutProps extends PropsWithChildren {}

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <header className="header-h w-full"></header>
        <div className="header-h" />
        {children}
        <section className="h-[164px] w-full bg-app-gray-002">
          <div className="flex h-full flex-col justify-center">
            <Footer />
          </div>
        </section>
      </body>
    </html>
  )
}

export default AppLayout
