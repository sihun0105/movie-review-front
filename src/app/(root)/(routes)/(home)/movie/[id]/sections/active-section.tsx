import { CommentForm } from '@/components/form/auth/comment/comment-form'
import { CommentFormProvider } from '@/components/form/auth/comment/hook/comment-form-context'
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
