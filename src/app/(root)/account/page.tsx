import { FunctionComponent } from 'react'
import AccountSection from './sections/account-section'
import ProfileSection from './sections/profile-section'
import { UpdateProfileModalContextProvider } from './hooks/use-update-profile-modal-context'
interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  return (
    <main>
      <AccountSection />
      <UpdateProfileModalContextProvider>
        <ProfileSection />
      </UpdateProfileModalContextProvider>
    </main>
  )
}

export default Page
