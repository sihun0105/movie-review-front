'use client'

import Link from 'next/link'
import { Pencil } from 'lucide-react'
import { FunctionComponent } from 'react'

const NewArticleToggle: FunctionComponent = () => {
  return (
    <Link
      href="/articles/new"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg"
    >
      <Pencil className="h-5 w-5" />
    </Link>
  )
}

export default NewArticleToggle
