import { FunctionComponent } from 'react'
interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  return (
    <main>
      <section className="container">
        <p className="text-xl">page</p>
      </section>
    </main>
  )
}

export default Page
