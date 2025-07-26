'use client'
import { LoginFormProvider } from '@/components/form/auth/login/hook/login-form-context'
import { FunctionComponent } from 'react'
import { ModernLoginForm } from '@/components/form/auth/login/modern-login-form'
import ModernOAuthSection from './section/modern-oAuth-section'

interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <LoginFormProvider>
        <ModernLoginForm />
        <ModernOAuthSection />
      </LoginFormProvider>
    </main>
  )
}

export default Page
