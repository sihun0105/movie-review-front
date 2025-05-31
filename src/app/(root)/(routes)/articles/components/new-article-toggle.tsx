import { cn } from '@/lib/utils'
import { FunctionComponent, ReactNode } from 'react'
import Link from 'next/link'
import { Pencil } from 'lucide-react'

interface NewArticleToggleProps {
  className?: string
  children?: ReactNode
}

const NewArticleToggle: FunctionComponent<NewArticleToggleProps> = ({
  className,
  children,
}) => {
  return (
    <Link
      href="/articles/new"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-black shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-black/30',
        className,
      )}
    >
      <Pencil className="h-5 w-5" />
    </Link>
  )
}

export default NewArticleToggle
