const base =
  process.env.SERVER_API ||
  process.env.NEXT_PUBLIC_SERVER_API ||
  'http://127.0.0.1:3030'

export const ArticleCommentApiEndpoint = {
  backendReaction: (commentId: number) =>
    `${base}/article/comments/${commentId}/reaction`,
  clientReaction: () => '/api/article/comment/reaction',
}
