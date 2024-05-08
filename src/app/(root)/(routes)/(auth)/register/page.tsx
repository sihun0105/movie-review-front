import { RegisterFormProvider } from '@/components/form/auth/register/hook/register-form-context'
import { RegisterForm } from '@/components/form/auth/register/register-form'
import { FunctionComponent } from 'react'
interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  return (
    <RegisterFormProvider>
      <RegisterForm />
    </RegisterFormProvider>
  )
}

export default Page
