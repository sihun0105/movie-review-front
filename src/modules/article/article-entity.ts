import { Article } from '@/lib/type'

export function isArticle(arg: any): arg is Article {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.id === 'string' &&
    typeof arg.title === 'string' &&
    typeof arg.content === 'string' &&
    typeof arg.author === 'string' &&
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
