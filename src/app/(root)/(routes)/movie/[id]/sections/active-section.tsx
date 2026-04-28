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
        'fixed bottom-[72px] z-40 w-full max-w-[460px] border-t border-dm-line bg-dm-bg/95 px-3 py-2 backdrop-blur-md',
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
