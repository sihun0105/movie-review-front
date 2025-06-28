import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import useSWRMutation from 'swr/mutation'

interface ModifyArticleArgs {
  title: string
  content: string
}

export const useModifyArticle = (articleId: number) => {
  const getKey = AppClientApiEndpoint.updateArticle(articleId)

  const fetcher = async (_: string, { arg }: { arg: ModifyArticleArgs }) => {
    const formData = new FormData()
    formData.append('title', arg.title)
    formData.append('content', arg.content)

    const res = await fetch(getKey, {
      method: 'PATCH',
      body: formData,
    })

    const result = await res.json()
    if (!res.ok) throw new Error(result.message || '게시글 수정 실패')
    return result
  }

  const { trigger, isMutating, error } = useSWRMutation(getKey, fetcher)

  const modifyArticle = (
    args: ModifyArticleArgs,
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

  return { modifyArticle, isModifying: isMutating, modifyError: error }
}
