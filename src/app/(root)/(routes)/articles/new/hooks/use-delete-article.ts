import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import useSWRMutation from 'swr/mutation'

const getKey = (slug: number) => {
  return AppClientApiEndpoint.deleteArticle(slug)
}
const fetcher = async (url: string) => {
  const res = await fetch(url, { method: 'DELETE' })
  const result = await res.json()
  if (!res.ok) throw new Error(result.message || '게시글 삭제 실패')
  return result
}

export const useDeleteArticle = (slug: number) => {
  const { trigger, isMutating, error } = useSWRMutation(getKey(slug), fetcher)

  const deleteArticle = (
    args: { articleId: number },

    {
      onSuccess,
      onError,
    }: {
      onSuccess: () => void
      onError: () => void
    },
  ) => {
    trigger(null, {
      onSuccess,
      onError,
    })
  }
  return { deleteArticle, isDeleting: isMutating, deleteError: error }
}
