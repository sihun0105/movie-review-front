export interface MatchPost {
  id: string
  title: string
  userno: number
  author: string
  content: string
  movieTitle: string
  theaterName: string
  showTime: string
  maxParticipants: number
  currentParticipants: number
  location: string
  createdAt: string
  updatedAt?: string
  deletedAt?: string
}

export interface MatchApplication {
  id: string
  matchPostId: string
  applicantUserno: number
  applicantName: string
  message: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

export interface MatchPostResponse {
  matchPosts: MatchPost[]
  hasNext: boolean
}

export interface CreateMatchPostRequest {
  title: string
  content: string
  movieTitle: string
  theaterName: string
  showTime: string
  maxParticipants: number
  location: string
}

export interface ApplyMatchRequest {
  matchPostId: string
  message: string
}
