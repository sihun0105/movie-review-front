import { FunctionComponent } from 'react'
import AccountSection from './sections/account-section'
import ProfileSection from './sections/profile-section'
import { UpdateProfileModalContextProvider } from './hooks/use-update-profile-modal-context'
import CommunitySummarySection from './sections/community-summary-section'

const Page: FunctionComponent = () => {
  return (
    <main className="min-h-page pb-8">
      <UpdateProfileModalContextProvider>
        <div className="xl:grid xl:grid-cols-[200px_minmax(0,1fr)] xl:gap-6 xl:px-6 xl:py-7">
          <aside className="xl:col-start-1 xl:row-start-1">
            <ProfileSection />
          </aside>
          <section className="min-w-0 xl:col-start-2 xl:row-span-2 xl:row-start-1">
            <CommunitySummarySection />
          </section>
          <aside className="xl:col-start-1 xl:row-start-2">
            <AccountSection />
          </aside>
        </div>
      </UpdateProfileModalContextProvider>
    </main>
  )
}

export default Page
