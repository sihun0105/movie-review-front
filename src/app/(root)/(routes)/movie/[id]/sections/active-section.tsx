import { CommentForm } from '@/components/form/comment/comment-form'
import { CommentFormProvider } from '@/components/form/comment/hook/comment-form-context'
import { FunctionComponent } from 'react'
interface ActiveSectionProps {
  id: string
}

const ActiveSection: FunctionComponent<ActiveSectionProps> = ({ id }) => {
  return (
    <main>
      <CommentFormProvider>
        <CommentForm id={id} />
      </CommentFormProvider>
    </main>
  )
}

export default ActiveSection
