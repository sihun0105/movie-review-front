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
        'mt-4 border-t border-border bg-background px-4 py-4',
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
