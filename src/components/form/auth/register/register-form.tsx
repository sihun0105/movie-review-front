'use client'

import { Form } from '@/components/ui/form'
import { FunctionComponent, HTMLAttributes } from 'react'
import { Button } from '@/components/ui/button'
import { IdInputField } from './fields/id-input-field'
import { PasswordInputField } from './fields/password-input-field'
import { useRegisterFormContext } from './hook/register-form-context'
import { NicknameInputField } from './fields/nickname-input-field'
import { useRegister } from './hook/use-register'
import { useRouter } from 'next/navigation'

interface RegisterFormProps extends HTMLAttributes<HTMLDivElement> {}

const RegisterForm: FunctionComponent<RegisterFormProps> = ({
  className,
  ...props
}) => {
  const { form } = useRegisterFormContext()
  const isFormValid = form.formState.isValid
  const { register, isRegisting, RegistingError } = useRegister()
  const router = useRouter()
  const handleSubmit = form.handleSubmit(async (data) => {
    await register(
      {
        nickname: data.nicknmae,
        password: data.password,
        email: data.userId,
      },
      {
        onSuccess: async () => {
          alert('회원가입에 성공하였습니다.')
          form.reset()
          router.push('/login')
        },
        onError: () => {
          alert('회원가입에 실패하였습니다.')
        },
      },
    )
  })
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <IdInputField />
          <PasswordInputField />
          <NicknameInputField />
          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid || isRegisting}
          >
            {!isRegisting ? '회원가입' : '회원가입 중'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export { RegisterForm }
