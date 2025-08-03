import { FunctionComponent } from 'react'
import { MatchPostFormProvider } from '@/components/form/match/hooks/match-post-form-context'
import { MatchPostForm } from '@/components/form/match/match-post-form'
import { CreateMatchPostRequest } from '@/lib/type'

interface MatchFormSectionProps {
  onSubmit: (_data: CreateMatchPostRequest) => Promise<void>
  onCancel: () => void
  initialData?: Partial<CreateMatchPostRequest>
}

const MatchFormSection: FunctionComponent<MatchFormSectionProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  return (
    <MatchPostFormProvider>
      <MatchPostForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        initialData={initialData}
      />
    </MatchPostFormProvider>
  )
}

export { MatchFormSection }
