'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createContext, useContext } from 'react'
import * as z from 'zod'

const formSchema = z.object({
  title: z.string().min(2, {
    message: '제목은 최소 2자 이상 입력해주세요.',
  }),
  content: z.string().min(5, {
    message: '내용은 최소 5자 이상 입력해주세요.',
  }),
  movieTitle: z.string().min(1, {
    message: '영화 제목을 입력해주세요.',
  }),
  theaterName: z.string().min(1, {
    message: '영화관 이름을 입력해주세요.',
  }),
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

const useMatchPostForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      title: '',
      content: '',
      movieTitle: '',
      theaterName: '',
      showTime: '',
      maxParticipants: 1,
      location: '',
    },
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
}: {
  children: React.ReactNode
}) => {
  const { form } = useMatchPostForm()
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
