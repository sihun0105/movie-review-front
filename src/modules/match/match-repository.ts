import { MatchDataSource } from './match-datasource'
import type {
  MatchPost,
  MatchPostResponse,
  CreateMatchPostRequest,
  ApplyMatchRequest,
  MatchApplication,
} from './match.entity'

export class MatchRepository {
  private dataSource: MatchDataSource

  constructor(token?: string) {
    this.dataSource = new MatchDataSource(token)
  }

  // 매치 게시글 목록 조회
  async getMatchPosts(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<MatchPostResponse> {
    // 클라이언트 사이드 validation
    if (page < 1) {
      throw new Error('페이지 번호는 1 이상이어야 합니다.')
    }

    if (pageSize < 1 || pageSize > 100) {
      throw new Error('페이지 크기는 1-100 사이여야 합니다.')
    }

    const data = await this.dataSource.getMatchPosts(page, pageSize)
    return data
  }

  // 매치 게시글 상세 조회
  async getMatchPost(matchId: string): Promise<MatchPost> {
    if (!matchId || matchId.trim() === '') {
      throw new Error('매치 ID가 필요합니다.')
    }

    return await this.dataSource.getMatchPost(matchId)
  }

  // 매치 게시글 작성
  async createMatchPost(data: CreateMatchPostRequest): Promise<MatchPost> {
    // 클라이언트 사이드 validation
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

    // 상영 시간이 현재 시간보다 미래인지 확인
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

  // 매치 게시글 수정
  async updateMatchPost(
    matchId: string,
    data: Partial<CreateMatchPostRequest>,
  ): Promise<MatchPost> {
    if (!matchId || matchId.trim() === '') {
      throw new Error('매치 ID가 필요합니다.')
    }

    // 수정할 데이터가 있는지 확인
    if (Object.keys(data).length === 0) {
      throw new Error('수정할 데이터가 없습니다.')
    }

    // 제공된 필드에 대한 validation
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

  // 매치 게시글 삭제
  async deleteMatchPost(matchId: string): Promise<void> {
    if (!matchId || matchId.trim() === '') {
      throw new Error('매치 ID가 필요합니다.')
    }

    return await this.dataSource.deleteMatchPost(matchId)
  }

  // 매치 신청
  async applyToMatch(data: ApplyMatchRequest): Promise<void> {
    if (!data.matchPostId || data.matchPostId.trim() === '') {
      throw new Error('매치 ID가 필요합니다.')
    }

    if (!data.message || data.message.trim() === '') {
      throw new Error('신청 메시지를 입력해주세요.')
    }

    if (data.message.length > 500) {
      throw new Error('신청 메시지는 500자 이하로 입력해주세요.')
    }

    return await this.dataSource.applyToMatch(data)
  }

  // 매치 신청 목록 조회 (게시글 작성자만)
  async getMatchApplications(matchId: string): Promise<MatchApplication[]> {
    if (!matchId || matchId.trim() === '') {
      throw new Error('매치 ID가 필요합니다.')
    }

    const result = await this.dataSource.getMatchApplications(matchId)
    return result
  }

  // 매치 신청 상태 업데이트 (승인/거절)
  async updateApplicationStatus(
    matchId: string,
    applicationId: string,
    status: 'accepted' | 'rejected',
  ): Promise<void> {
    if (!matchId || matchId.trim() === '') {
      throw new Error('매치 ID가 필요합니다.')
    }

    if (!applicationId || applicationId.trim() === '') {
      throw new Error('신청 ID가 필요합니다.')
    }

    if (!['accepted', 'rejected'].includes(status)) {
      throw new Error('올바른 상태를 입력해주세요.')
    }

    return await this.dataSource.updateApplicationStatus(
      matchId,
      applicationId,
      status,
    )
  }

  // 내가 신청한 매치들 조회
  async getMyApplications(): Promise<MatchApplication[]> {
    return await this.dataSource.getMyApplications()
  }

  // 내가 신청한 매치의 신청 상태 조회
  async getMyApplication(matchId: string): Promise<MatchApplication | null> {
    if (!matchId || matchId.trim() === '') {
      throw new Error('매치 ID가 필요합니다.')
    }

    const result = await this.dataSource.getMyApplication(matchId)
    return result
  }
  // 내가 작성한 매치들 조회
  async getMyPosts(): Promise<MatchPost[]> {
    return await this.dataSource.getMyPosts()
  }

  // 매치 신청 취소
  async cancelApplication(applicationId: string): Promise<void> {
    if (!applicationId || applicationId.trim() === '') {
      throw new Error('신청 ID가 필요합니다.')
    }

    return await this.dataSource.cancelApplication(applicationId)
  }
}
