'use client'

import { useLoginForm } from '@/hooks/use-login-form'
import { FormProvider } from 'react-hook-form'
import { LoginForm } from '@/components/app/login-form'

export function LoginFormClient() {
  const { form } = useLoginForm()

  return (
    <FormProvider {...form}>
      <LoginForm />
    </FormProvider>
  )
}
