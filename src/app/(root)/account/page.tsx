import { FunctionComponent } from 'react'
import AccountSection from './sections/account-section'
import ProfileSection from './sections/profile-section'
import { UpdateProfileModalContextProvider } from './hooks/use-update-profile-modal-context'

const Page: FunctionComponent = () => {
  return (
    <main className="min-h-page bg-dm-bg pb-5 text-dm-text">
      <UpdateProfileModalContextProvider>
        <AccountSection />
        <ProfileSection />
      </UpdateProfileModalContextProvider>
    </main>
  )
}

export default Page
