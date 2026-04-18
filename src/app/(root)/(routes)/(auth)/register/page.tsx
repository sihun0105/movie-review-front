import { RegisterFormProvider } from '@/components/form/auth/register/hook/register-form-context'
import { MultiStepRegisterForm } from '@/components/form/auth/register/multi-step-register-form'
import { FunctionComponent } from 'react'

interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  return (
    <RegisterFormProvider>
      <MultiStepRegisterForm />
    </RegisterFormProvider>
  )
}

export default Page
