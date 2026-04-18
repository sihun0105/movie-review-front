'use client'
import { AppValidation } from '@/config/app-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const updateNicknameFormSchema = z.object({
  nickname: AppValidation.username(),
})

const useUpdateNicknameForm = () => {
  const form = useForm<z.infer<typeof updateNicknameFormSchema>>({
    resolver: zodResolver(updateNicknameFormSchema),
    mode: 'onTouched',
    defaultValues: {
      nickname: '',
    },
  })

  return {
    form,
  }
}

const UpdateNicknameFormContext = createContext<ReturnType<
  typeof useUpdateNicknameForm
> | null>(null)

export const useUpdateNicknameFormContext = () => {
  const context = useContext(UpdateNicknameFormContext)
  if (!context) {
    throw new Error(
      'useUpdateNicknameFormContext must be used within a UpdateNicknameFormProvider',
    )
  }
  return context
}

export const UpdateNicknameFormProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { form } = useUpdateNicknameForm()
  return (
    <UpdateNicknameFormContext.Provider
      value={{
        form,
      }}
    >
      {children}
    </UpdateNicknameFormContext.Provider>
  )
}
