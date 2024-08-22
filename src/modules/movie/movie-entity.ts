export interface Movie {
  id: number
  audience: number
  title: string
  createdAt: Date
  updatedAt: Date
  poster: string
  rank: number
}

export function isMovie(arg: any): arg is Movie {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.id === 'number' &&
    typeof arg.audience === 'number' &&
    typeof arg.title === 'string' &&
    typeof arg.poster === 'string' &&
    arg.createdAt instanceof Date &&
    arg.updatedAt instanceof Date
  )
}

export function assertMovie(arg: any): asserts arg is Movie {
  if (!isMovie(arg)) {
    throw new Error('Invalid Movie')
  }
}
