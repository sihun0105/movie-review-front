import { getToken } from '@/lib/utils/getToken'
import { FunctionComponent } from 'react'
interface PageProps {}

const getCounselList = async (): Promise<any> => {
  const token = getToken()
  const result = {}
  return result
}
const Page: FunctionComponent<PageProps> = async ({}) => {
  const result = await getCounselList()
  return (
    <main>
      <section className="container">
        <p className="text-xl">page</p>
      </section>
    </main>
  )
}

export default Page
