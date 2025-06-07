import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import useSWRMutation from 'swr/mutation'

interface CreateArticleArgs {
  title: string
  content: string
}

export const useCreateArticle = (onSuccessMutate?: () => void) => {
  const getKey = AppClientApiEndpoint.createArticle()

  const fetcher = async (_: string, { arg }: { arg: CreateArticleArgs }) => {
    const formData = new FormData()
    formData.append('title', arg.title)
    formData.append('content', arg.content)

    const res = await fetch(getKey, {
      method: 'POST',
      body: formData,
    })

    const result = await res.json()
    if (!res.ok) throw new Error(result.message || '게시글 생성 실패')
    return result
  }

  const { trigger, isMutating, error } = useSWRMutation(getKey, fetcher)

  const createArticle = (
    args: CreateArticleArgs,
    {
      onSuccess,
      onError,
    }: {
      onSuccess: () => void
      onError: () => void
    },
  ) => {
    trigger(args, {
      onSuccess,
      onError,
    })
  }

  return {
    createArticle,
    isCreating: isMutating,
    createError: error,
  }
}
