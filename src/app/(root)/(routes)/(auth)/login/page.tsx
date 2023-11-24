import { LoginFormProvider } from '@/components/form/auth/login/hook/login-form-context'
import { FunctionComponent } from 'react'
import { cn } from '@/lib/utils'
import { LoginForm } from '@/components/form/auth/login/login-form'

interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  return (
    <LoginFormProvider>
      <main
        className={cn(
          'flex min-h-[100vh] items-center justify-center bg-slate-400 p-5',
        )}
      >
        <section
          className={cn(
            'flex w-[500px] min-w-[300px] flex-col items-center justify-center rounded-sm bg-white p-5',
          )}
        >
          <LoginForm />
        </section>
      </main>
    </LoginFormProvider>
  )
}

export default Page
