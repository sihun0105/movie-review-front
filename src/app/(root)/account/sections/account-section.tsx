'use client'
import { useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
interface AccountSectionProps {}

const AccountSection: FunctionComponent<AccountSectionProps> = ({}) => {
  const userData = useSession()
  return (
    <main className="container ">
      <p className="font-bold">계정 정보</p>
      <div className="flex flex-row gap-2 rounded-md bg-gray-100 p-4">
        <p className="text-gray-500">계정</p>
        <p>{userData.data?.user?.email}</p>
      </div>
    </main>
  )
}

export default AccountSection
