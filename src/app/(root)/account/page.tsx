import { FunctionComponent } from 'react'
import AccountSection from './sections/account-section'
import ProfileSection from './sections/profile-section'
import { UpdateProfileModalContextProvider } from './hooks/use-update-profile-modal-context'
import CommunitySummarySection from './sections/community-summary-section'

const Page: FunctionComponent = () => {
  return (
    <main className="min-h-page pb-8">
      <UpdateProfileModalContextProvider>
        <div className="w-full min-w-0 xl:px-6 xl:py-7">
          <ProfileSection />
          <section className="min-w-0 xl:mt-5">
            <CommunitySummarySection />
          </section>
          <AccountSection />
        </div>
      </UpdateProfileModalContextProvider>
    </main>
  )
}

export default Page
