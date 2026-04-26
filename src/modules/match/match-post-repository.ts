import { MatchPostDataSource } from './match-post-datasource'
import type {
  MatchPost,
  MatchPostResponse,
  CreateMatchPostRequest,
} from './match.entity'

export class MatchPostRepository {
  private dataSource: MatchPostDataSource

  constructor(token?: string) {
    this.dataSource = new MatchPostDataSource(token)
  }

  async getMatchPosts(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<MatchPostResponse> {
    if (page < 1) {
      throw new Error('페이지 번호는 1 이상이어야 합니다.')
    }

    if (pageSize < 1 || pageSize > 100) {
      throw new Error('페이지 크기는 1-100 사이여야 합니다.')
    }

    return await this.dataSource.getMatchPosts(page, pageSize)
  }

  async getMatchPost(matchId: string): Promise<MatchPost> {
    if (!matchId || matchId.trim() === '') {
      throw new Error('매치 ID가 필요합니다.')
    }

    return await this.dataSource.getMatchPost(matchId)
  }

  async createMatchPost(data: CreateMatchPostRequest): Promise<MatchPost> {
    if (!data.title || data.title.trim() === '') {
      throw new Error('제목을 입력해주세요.')
    }

    if (!data.content || data.content.trim() === '') {
      throw new Error('내용을 입력해주세요.')
    }

    if (!data.movieTitle || data.movieTitle.trim() === '') {
      throw new Error('영화 제목을 입력해주세요.')
    }

    if (!data.theaterName || data.theaterName.trim() === '') {
      throw new Error('영화관을 입력해주세요.')
    }

    if (!data.showTime) {
      throw new Error('상영 시간을 입력해주세요.')
    }

    const showTime = new Date(data.showTime)
    const now = new Date()
    if (showTime <= now) {
      throw new Error('상영 시간은 현재 시간보다 미래여야 합니다.')
    }

    if (
      !data.maxParticipants ||
      data.maxParticipants < 1 ||
      data.maxParticipants > 10
    ) {
      throw new Error('최대 인원은 1-10명 사이여야 합니다.')
    }

    if (!data.location || data.location.trim() === '') {
      throw new Error('위치를 입력해주세요.')
    }

    return await this.dataSource.createMatchPost(data)
  }

  async updateMatchPost(
    matchId: string,
    data: Partial<CreateMatchPostRequest>,
  ): Promise<MatchPost> {
    if (!matchId || matchId.trim() === '') {
      throw new Error('매치 ID가 필요합니다.')
    }

    if (Object.keys(data).length === 0) {
      throw new Error('수정할 데이터가 없습니다.')
    }

    if (data.title !== undefined && (!data.title || data.title.trim() === '')) {
      throw new Error('제목을 입력해주세요.')
    }

    if (
      data.content !== undefined &&
      (!data.content || data.content.trim() === '')
    ) {
      throw new Error('내용을 입력해주세요.')
    }

    if (data.showTime !== undefined) {
      const showTime = new Date(data.showTime)
      const now = new Date()
      if (showTime <= now) {
        throw new Error('상영 시간은 현재 시간보다 미래여야 합니다.')
      }
    }

    if (
      data.maxParticipants !== undefined &&
      (data.maxParticipants < 2 || data.maxParticipants > 10)
    ) {
      throw new Error('최대 인원은 2-10명 사이여야 합니다.')
    }

    return await this.dataSource.updateMatchPost(matchId, data)
  }

  async deleteMatchPost(matchId: string): Promise<void> {
    if (!matchId || matchId.trim() === '') {
      throw new Error('매치 ID가 필요합니다.')
    }

    return await this.dataSource.deleteMatchPost(matchId)
  }

  async getMyPosts(): Promise<MatchPost[]> {
    return await this.dataSource.getMyPosts()
  }
}
