import { Article, ArticleReply } from '@/lib/type'
export function isArticle(arg: any): arg is Article {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.id === 'string' &&
    typeof arg.title === 'string' &&
    typeof arg.content === 'string' &&
    typeof arg.author === 'string' &&
    typeof arg.userno === 'number' &&
    typeof arg.likeCount === 'number' &&
    typeof arg.dislikeCount === 'number' &&
    typeof arg.commentCount === 'number'
  )
}

export function assertArticle(arg: any): asserts arg is Article {
  if (!isArticle(arg)) {
    throw new Error('Invalid Article')
  }
}

export function isArticleComment(arg: any): arg is ArticleReply {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.id === 'number' &&
    typeof arg.articleId === 'number' &&
    typeof arg.userno === 'number' &&
    typeof arg.content === 'string' &&
    typeof arg.nickname === 'string' &&
    (typeof arg.avatar === 'string' || arg.avatar === undefined) &&
    arg.createdAt instanceof Date &&
    arg.updatedAt instanceof Date
  )
}

export function assertArticleComment(arg: any): asserts arg is ArticleReply {
  if (!isArticleComment(arg)) {
    throw new Error('Invalid Article Comment')
  }
}
