import { MatchApplicationDataSource } from './match-application-datasource'
import type { ApplyMatchRequest, MatchApplication } from './match.entity'

export class MatchApplicationRepository {
  private dataSource: MatchApplicationDataSource

  constructor(token?: string) {
    this.dataSource = new MatchApplicationDataSource(token)
  }

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

  async getMatchApplications(matchId: string): Promise<MatchApplication[]> {
    if (!matchId || matchId.trim() === '') {
      throw new Error('매치 ID가 필요합니다.')
    }

    return await this.dataSource.getMatchApplications(matchId)
  }

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

  async getMyApplications(): Promise<MatchApplication[]> {
    return await this.dataSource.getMyApplications()
  }

  async getMyApplication(matchId: string): Promise<MatchApplication | null> {
    if (!matchId || matchId.trim() === '') {
      throw new Error('매치 ID가 필요합니다.')
    }

    return await this.dataSource.getMyApplication(matchId)
  }

  async cancelApplication(applicationId: string): Promise<void> {
    if (!applicationId || applicationId.trim() === '') {
      throw new Error('신청 ID가 필요합니다.')
    }

    return await this.dataSource.cancelApplication(applicationId)
  }
}
