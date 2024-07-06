'use client'
import { LoginFormProvider } from '@/components/form/auth/login/hook/login-form-context'
import { FunctionComponent } from 'react'
import { LoginForm } from '@/components/form/auth/login/login-form'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { AppPath } from '@/config/app-path'
import OAuthSection from './section/oAuth-section'

interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  const router = useRouter()
  return (
    <section className="flex flex-col gap-2">
      <LoginFormProvider>
        <LoginForm />
      </LoginFormProvider>
      <Button
        type="submit"
        className="w-full"
        onClick={() => router.push(AppPath.register())}
      >
        {'회원가입'}
      </Button>
      <OAuthSection />
    </section>
  )
}

export default Page
