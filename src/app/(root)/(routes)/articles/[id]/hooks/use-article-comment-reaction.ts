'use client'

import { ArticleCommentApiEndpoint } from '@/config/article-comment-api-endpoint'
import { useAppToast } from '@/hooks/use-app-toast'
import { useAuthenticationCheck } from '@/hooks/use-authentication-check'
import useSWRMutation from 'swr/mutation'

interface ReactionArgs {
  commentId: number
  reaction: 'like' | 'dislike'
}

async function reactionFetcher(url: string, { arg }: { arg: ReactionArgs }) {
  const form = new FormData()
  form.set('commentId', String(arg.commentId))
  form.set('reaction', arg.reaction)
  const response = await fetch(url, { method: 'PATCH', body: form })
  if (!response.ok) throw new Error('반응 저장 실패')
  return response.json()
}

export function useArticleCommentReaction(onChanged: () => void) {
  const { showToast } = useAppToast()
  const { requireAuthentication } = useAuthenticationCheck()
  const { trigger, isMutating } = useSWRMutation(
    ArticleCommentApiEndpoint.clientReaction(),
    reactionFetcher,
  )
  const reactComment = requireAuthentication(async (args: ReactionArgs) => {
    try {
      await trigger(args)
      onChanged()
    } catch (error) {
      showToast('댓글 반응을 저장하지 못했습니다.')
    }
  })
  return { reactComment, isReacting: isMutating }
}
