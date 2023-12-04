export interface Comment {
  id: number
  userId: number
  userName: string
  createdAt: Date
  updatedAt: Date
  comment: string
}

export function isComment(arg: any): arg is Comment {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.id === 'number' &&
    typeof arg.userId === 'number' &&
    typeof arg.userName === 'string' &&
    typeof arg.comment === 'string' &&
    arg.createdAt instanceof Date &&
    arg.updatedAt instanceof Date
  )
}

export function assertComment(arg: any): asserts arg is Comment {
  if (!isComment(arg)) {
    throw new Error('Invalid Comment')
  }
}
