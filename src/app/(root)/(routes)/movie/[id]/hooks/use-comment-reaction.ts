'use client'

import { CommentApiEndpoint } from '@/config/comment-api-endpoint'
import { useAppToast } from '@/hooks/use-app-toast'
import { useAuthenticationCheck } from '@/hooks/use-authentication-check'
import { useParams } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import { ReactCommentArgs, reactCommentFetcher } from './comment-fetchers'

export function useCommentReaction(onChanged: () => void) {
  const params = useParams()
  const { showToast } = useAppToast()
  const { requireAuthentication } = useAuthenticationCheck()
  const movieId = Number(params?.id)
  const { trigger, isMutating } = useSWRMutation(
    CommentApiEndpoint.clientReaction(movieId),
    reactCommentFetcher,
  )

  const reactComment = requireAuthentication(async (args: ReactCommentArgs) => {
    try {
      await trigger(args)
      onChanged()
    } catch (error) {
      showToast('댓글 반응을 저장하지 못했습니다.')
    }
  })

  return { reactComment, isReacting: isMutating }
}
