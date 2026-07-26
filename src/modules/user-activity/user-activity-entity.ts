export interface UserActivitySummary {
  articleCommentCount: number
  movieRatingCount: number
  articleCount: number
  receivedLikeCount: number
}

export class UserActivityRequestError extends Error {
  readonly status: number

  constructor(status: number) {
    super('커뮤니티 활동을 불러오지 못했습니다.')
    this.status = status
  }
}
