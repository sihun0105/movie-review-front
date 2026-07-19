'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createContext, useContext } from 'react'
import * as z from 'zod'
import { CreateMatchPostRequest } from '@/lib/type'
import { getMatchPostFormDefaults } from '../match-post-form-defaults'

const formSchema = z.object({
  title: z.string().min(1, {
    message: '제목은 최소 2자 이상 입력해주세요.',
  }),
  content: z.string().max(500, {
    message: '설명은 최대 500자까지 입력할 수 있어요.',
  }),
  movieTitle: z.string().min(1, {
    message: '영화 제목을 입력해주세요.',
  }),
  theaterName: z.string().min(1),
  showTime: z.string().min(1, {
    message: '상영 시간을 선택해주세요.',
  }),
  maxParticipants: z
    .number()
    .min(1, {
      message: '최소 1명 이상이어야 합니다.',
    })
    .max(10, {
      message: '최대 10명까지 가능합니다.',
    }),
  location: z.string().min(1, {
    message: '위치를 입력해주세요.',
  }),
})

const useMatchPostForm = (initialData?: Partial<CreateMatchPostRequest>) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: getMatchPostFormDefaults(initialData),
  })

  return {
    form,
  }
}

const MatchPostFormContext = createContext<ReturnType<
  typeof useMatchPostForm
> | null>(null)

export const useMatchPostFormContext = () => {
  const context = useContext(MatchPostFormContext)
  if (!context) {
    throw new Error('useMatchPostFormContext가 없습니다.')
  }
  return context
}

export const MatchPostFormProvider = ({
  children,
  initialData,
}: {
  children: React.ReactNode
  initialData?: Partial<CreateMatchPostRequest>
}) => {
  const { form } = useMatchPostForm(initialData)
  return (
    <MatchPostFormContext.Provider
      value={{
        form,
      }}
    >
      {children}
    </MatchPostFormContext.Provider>
  )
}
