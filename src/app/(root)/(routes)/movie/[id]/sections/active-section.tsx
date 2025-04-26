import { FunctionComponent } from 'react'
import { CommentForm } from '../components/comment-form'
import { CommentFormProvider } from '../hooks/comment-form-context'

interface ActiveSectionProps {
  id: string
}

const ActiveSection: FunctionComponent<ActiveSectionProps> = ({ id }) => {
  return (
    <div className="bottom-0 z-10 w-full bg-white py-2 ">
      <CommentFormProvider>
        <CommentForm id={id} />
      </CommentFormProvider>
    </div>
  )
}

export default ActiveSection
