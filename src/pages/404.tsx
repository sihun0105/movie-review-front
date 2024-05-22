import { FunctionComponent } from 'react'
import Link from 'next/link'

interface Error404Props {}

const Error404: FunctionComponent<Error404Props> = ({}) => {
  return (
    <main className="flex flex-col items-center justify-center p-4 text-center text-gray-800">
      <h1>404: Not Found</h1>
      <p>It&apos;s gone :(</p>
      <Link href="/">
        <p className="mt-6 rounded-md bg-blue-600 px-6 py-3 text-lg text-white hover:bg-blue-700">
          home
        </p>
      </Link>
    </main>
  )
}

export default Error404
