import { FunctionComponent } from 'react'
import { CommentForm } from '../components/comment-form'
import { CommentFormProvider } from '../hooks/comment-form-context'
import { cn } from '@/lib/utils'

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
        ['fixed bottom-0 z-40 w-full max-w-[460px] bg-white py-2'],
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
