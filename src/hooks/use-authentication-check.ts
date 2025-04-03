import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface UseAuthenticationCheck {
  requireAuthentication: <T extends (...args: any[]) => any>(
    callback: T,
  ) => (...args: Parameters<T>) => void
}

const useAuthenticationCheck = (): UseAuthenticationCheck => {
  const { data: session } = useSession()
  const router = useRouter()

  const requireAuthentication = useCallback(
    <T extends (...args: any[]) => any>(callback: T) => {
      return (...args: Parameters<T>) => {
        if (!session) {
          router.push('/auth/login')
          return
        }
        callback(...args)
      }
    },
    [session, router],
  )

  return { requireAuthentication }
}

export { useAuthenticationCheck }
