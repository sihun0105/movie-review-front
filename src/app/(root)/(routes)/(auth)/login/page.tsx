'use client'
import { LoginFormProvider } from '@/components/form/auth/login/hook/login-form-context'
import { FunctionComponent } from 'react'
import { LoginForm } from '@/components/form/auth/login/login-form'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { AppPath } from '@/config/app-path'

interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  const router = useRouter()
  return (
    <>
      <LoginFormProvider>
        <LoginForm />
      </LoginFormProvider>
      <Button
        type="submit"
        className="mt-5 w-full"
        onClick={() => router.push(AppPath.register())}
      >
        {'회원가입'}
      </Button>
    </>
  )
}

export default Page
