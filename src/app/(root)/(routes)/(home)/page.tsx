'use client'
import { useSession } from 'next-auth/react'

import { FunctionComponent } from 'react'
interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  const { data, status } = useSession()
  console.log(data)
  return (
    <main>
      <section className="container">
        <p className="text-xl">page</p>
      </section>
    </main>
  )
}

export default Page
