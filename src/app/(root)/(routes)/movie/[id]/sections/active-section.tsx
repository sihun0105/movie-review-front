import { FunctionComponent } from 'react'
import { CommentForm } from '../components/comment-form'
import { CommentFormProvider } from '../hooks/comment-form-context'

interface ActiveSectionProps {
  id: string
}

const ActiveSection: FunctionComponent<ActiveSectionProps> = ({ id }) => {
  return (
    <div className="pointer-events-auto fixed bottom-0 left-0 right-0 z-50 bg-white shadow-md">
      <CommentFormProvider>
        <div className="mx-auto w-full max-w-[460px] p-4">
          <CommentForm id={id} />
        </div>
      </CommentFormProvider>
    </div>
  )
}

export default ActiveSection
