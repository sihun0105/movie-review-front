'use client'

import { Form } from '@/components/ui/form'
import { FunctionComponent, useState } from 'react'
import { useMatchPostFormContext } from './hooks/match-post-form-context'
import { TitleInputField } from './fields/title-input-field'
import { ContentInputField } from './fields/content-input-field'
import { MovieTitleInputField } from './fields/movie-title-input-field'
import { TheaterNameInputField } from './fields/theater-name-input-field'
import { ShowTimeInputField } from './fields/show-time-input-field'
import { MaxParticipantsInputField } from './fields/max-participants-input-field'
import { LocationInputField } from './fields/location-input-field'
import { CreateMatchPostRequest } from '@/lib/type'

interface MatchPostFormProps {
  onSubmit: (_data: CreateMatchPostRequest) => Promise<void>
  onCancel: () => void
  initialData?: Partial<CreateMatchPostRequest>
}

const MatchPostForm: FunctionComponent<MatchPostFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const { form } = useMatchPostFormContext()
  const [isLoading, setIsLoading] = useState(false)

  // initialData가 있을 때 form 값 설정
  if (initialData) {
    Object.entries(initialData).forEach(([key, value]) => {
      if (value !== undefined) {
        form.setValue(key as keyof CreateMatchPostRequest, value as any)
      }
    })
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      await onSubmit(data)
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TitleInputField />
        <ContentInputField />

        <div className="grid grid-cols-2 gap-3">
          <MovieTitleInputField />
          <TheaterNameInputField />
        </div>

        <ShowTimeInputField />
        <MaxParticipantsInputField />
        <LocationInputField />

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-border py-3 font-mono text-[13px] text-muted-foreground hover:border-primary hover:text-yellow-400"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-primary py-3 font-mono text-[13px] text-white disabled:bg-secondary disabled:text-muted-foreground"
          >
            {isLoading ? '등록 중...' : '등록하기 →'}
          </button>
        </div>
      </form>
    </Form>
  )
}

export { MatchPostForm }
