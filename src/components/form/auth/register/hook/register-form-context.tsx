'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createContext, useContext } from 'react'
import * as z from 'zod'

const formSchema = z.object({
  userId: z
    .string()
    .min(4, {
      message: 'userId must be at least 4 characters.',
    })
    .email({
      message: 'userId must be email.',
    }),
  password: z.string().min(4, {
    message: 'password must be at least 4 characters.',
  }),
  nicknmae: z.string().min(4, {
    message: 'nicknmae must be at least 4 characters.',
  }),
})

const useRegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      userId: '',
      password: '',
      nicknmae: '',
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

const RegisterFormContext = createContext<ReturnType<
  typeof useRegisterForm
> | null>(null)

export const useRegisterFormContext = () => {
  const context = useContext(RegisterFormContext)
  if (!context) {
    throw new Error('useRegisterFormContext가 없습니다.')
  }
  return context
}

export const RegisterFormProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { form, onSubmit } = useRegisterForm()
  return (
    <RegisterFormContext.Provider
      value={{
        form,
        onSubmit,
      }}
    >
      {children}
    </RegisterFormContext.Provider>
  )
}
