import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import useSWRMutate from 'swr/mutation'

const fetcher = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      userEmail: string
      password: string
      nickname: string
    }
  },
) => {
  const formData = new FormData()
  formData.append('userEmail', arg.userEmail)
  formData.append('password', arg.password)
  formData.append('nickname', arg.nickname)
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  })
  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.message)
  }

  return result
}

export const useRegister = () => {
  const { trigger, isMutating, error } = useSWRMutate(
    AppClientApiEndpoint.reigster(),
    fetcher,
  )

  const register = (
    arg: {
      userEmail: string
      password: string
      nickname: string
    },
    {
      onSuccess,
      onError,
    }: {
      onSuccess: () => void
      onError: () => void
    },
  ) => {
    trigger(arg, {
      onSuccess,
      onError,
    })
  }

  return {
    register,
    isRegisting: isMutating,
    RegistingError: error,
  }
}
