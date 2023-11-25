import { LoginFormProvider } from '@/components/form/auth/login/hook/login-form-context'
import { FunctionComponent } from 'react'
import { LoginForm } from '@/components/form/auth/login/login-form'

interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  return (
    <LoginFormProvider>
      <LoginForm />
    </LoginFormProvider>
  )
}

export default Page
