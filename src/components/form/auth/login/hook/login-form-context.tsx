'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createContext, useContext } from 'react'
import * as z from 'zod'

const formSchema = z.object({
  userId: z.string().min(4, {
    message: 'userId must be at least 4 characters.',
  }),
  password: z.string().min(4, {
    message: 'password must be at least 4 characters.',
  }),
})

const useLoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      userId: '',
      password: '',
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
      }, 2500),
    )
  }

  return {
    form,
    onSubmit,
  }
}

const LoginFormContext = createContext<ReturnType<typeof useLoginForm> | null>(
  null,
)

export const useLoginFormContext = () => {
  const context = useContext(LoginFormContext)
  if (!context) {
    throw new Error('useLoginFormContext가 없습니다.')
  }
  return context
}

export const LoginFormProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { form, onSubmit } = useLoginForm()
  return (
    <LoginFormContext.Provider
      value={{
        form,
        onSubmit,
      }}
    >
      {children}
    </LoginFormContext.Provider>
  )
}
