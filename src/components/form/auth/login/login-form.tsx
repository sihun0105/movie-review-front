'use client'

import { Form } from '@/components/ui/form'
import { FunctionComponent, HTMLAttributes, useState } from 'react'
import { Button } from '@/components/ui/button'
import { IdInputField } from './fields/id-input-field'
import { PasswordInputField } from './fields/password-input-field'
import { signIn } from 'next-auth/react'
import { useLoginFormContext } from './hook/login-form-context'

interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {}

const LoginForm: FunctionComponent<LoginFormProps> = ({
  className,
  ...props
}) => {
  const { form, onSubmit } = useLoginFormContext()
  const isFormValid = form.formState.isValid
  const [isLogging, setIsLogging] = useState(false)

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            setIsLogging(true)
            onSubmit(
              data,
              () => {
                signIn('credentials', {
                  ...data,
                  callbackUrl: '/',
                })
              },
              () => {
                setIsLogging(false)
              },
            )
          })}
        >
          <IdInputField />
          <PasswordInputField />
          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid || isLogging}
          >
            {!isLogging ? '로그인' : '로그인 중'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export { LoginForm }
