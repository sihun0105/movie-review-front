import { FunctionComponent } from 'react'
interface PageProps {
  params: {
    id: string
  }
}

const Page: FunctionComponent<PageProps> = ({ params: { id } }) => {
  return <main>{id}</main>
}

export default Page
