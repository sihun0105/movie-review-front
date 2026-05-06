import { cn } from '@/lib/utils'
import { FunctionComponent } from 'react'
import { CommentForm } from '../components/comment-form'
import { CommentFormProvider } from '../hooks/comment-form-context'

interface ActiveSectionProps {
  id: string
  className?: string
}

const ActiveSection: FunctionComponent<ActiveSectionProps> = ({
  id,
  className,
}) => {
  return (
    <div
      className={cn(
        'fixed bottom-[72px] lg:bottom-0 z-40 w-full max-w-[460px] border-t border-border bg-background/95 px-3 py-2 backdrop-blur-md',
        className,
      )}
    >
      <CommentFormProvider>
        <CommentForm id={id} />
      </CommentFormProvider>
    </div>
  )
}

export default ActiveSection
