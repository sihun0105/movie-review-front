'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createContext, useContext } from 'react'
import * as z from 'zod'

const formSchema = z.object({
  replyId: z.number(),
  comment: z.string().min(1, {
    message: '댓글은 최소 1글자 이상 입력해야 합니다.',
  }),
})

const useModifyCommentForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      replyId: 0,
      comment: '',
    },
  })
  return {
    form,
  }
}
const ModifyCommentFormContext = createContext<ReturnType<
  typeof useModifyCommentForm
> | null>(null)

export const useModifyCommentFormContext = () => {
  const context = useContext(ModifyCommentFormContext)
  if (!context) {
    throw new Error('useModifyCommentFormContext가 없습니다.')
  }
  return context
}

export const ModifyCommentFormProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { form } = useModifyCommentForm()
  return (
    <ModifyCommentFormContext.Provider
      value={{
        form,
      }}
    >
      {children}
    </ModifyCommentFormContext.Provider>
  )
}
