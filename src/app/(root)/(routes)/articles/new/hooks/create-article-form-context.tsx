'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createContext, useContext } from 'react'
import * as z from 'zod'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'title must be at least 2 characters.',
  }),
  content: z.string().min(2, {
    message: 'content must be at least 2 characters.',
  }),
})

const useCreateArticleForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      title: '',
      content: '',
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

const CreateArticleFormContext = createContext<ReturnType<
  typeof useCreateArticleForm
> | null>(null)

export const useCreateArticleFormContext = () => {
  const context = useContext(CreateArticleFormContext)
  if (!context) {
    throw new Error('useCreateArticleFormContext가 없습니다.')
  }
  return context
}

export const CreateArticleFormProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { form, onSubmit } = useCreateArticleForm()
  return (
    <CreateArticleFormContext.Provider
      value={{
        form,
        onSubmit,
      }}
    >
      {children}
    </CreateArticleFormContext.Provider>
  )
}
