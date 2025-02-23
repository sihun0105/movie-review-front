'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createContext, useContext } from 'react'
import * as z from 'zod'

const formSchema = z.object({
  comment: z.string().min(2, {
    message: 'comment must be at least 2 characters.',
  }),
})

const useCommentForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      comment: '',
    },
  })

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    onSuccess: () => void,
    onError: () => void,
  ) => {
    await new Promise((resolve) =>
      setTimeout(() => {
        return resolve(onSuccess())
      }, 200),
    )
  }

  return {
    form,
    onSubmit,
  }
}

const CommentFormContext = createContext<ReturnType<
  typeof useCommentForm
> | null>(null)

export const useCommentFormContext = () => {
  const context = useContext(CommentFormContext)
  if (!context) {
    throw new Error('useCommentFormContext가 없습니다.')
  }
  return context
}

export const CommentFormProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { form, onSubmit } = useCommentForm()
  return (
    <CommentFormContext.Provider
      value={{
        form,
        onSubmit,
      }}
    >
      {children}
    </CommentFormContext.Provider>
  )
}
