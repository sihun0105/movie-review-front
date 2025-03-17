'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const updateImageFormSchema = z.object({
  file: z.custom<File>(),
})

const useUpdateImageForm = () => {
  const form = useForm<z.infer<typeof updateImageFormSchema>>({
    resolver: zodResolver(updateImageFormSchema),
    mode: 'onTouched',
    defaultValues: {
      file: null as unknown as File,
    },
  })

  return {
    form,
  }
}

const UpdateImageFormContext = createContext<ReturnType<
  typeof useUpdateImageForm
> | null>(null)

export const useUpdateImageFormContext = () => {
  const context = useContext(UpdateImageFormContext)
  if (!context) {
    throw new Error(
      'updateImage form context must be used within a updateImage form provider',
    )
  }
  return context
}

export const UpdateImageFormProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { form } = useUpdateImageForm()
  return (
    <UpdateImageFormContext.Provider
      value={{
        form,
      }}
    >
      {children}
    </UpdateImageFormContext.Provider>
  )
}
