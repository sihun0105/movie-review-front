'use client'

import { Button } from '@/components/ui/button'
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
import Box from '@/components/ui/box'
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
    <Box className="rounded-lg border p-6">
      <h2 className="mb-6 text-xl font-semibold">영화 메이트 모집</h2>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TitleInputField />
          <ContentInputField />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <MovieTitleInputField />
            <TheaterNameInputField />
          </div>

          <ShowTimeInputField />

          <MaxParticipantsInputField />

          <LocationInputField />

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '등록 중...' : '등록하기'}
            </Button>
          </div>
        </form>
      </Form>
    </Box>
  )
}

export { MatchPostForm }
