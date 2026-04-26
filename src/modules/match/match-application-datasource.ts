import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import type { ApplyMatchRequest, MatchApplication } from './match.entity'

export class MatchApplicationDataSource {
  private token?: string

  constructor(token?: string) {
    this.token = token
  }

  private getAuthHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
  }

  async applyToMatch(data: ApplyMatchRequest): Promise<void> {
    try {
      const response = await fetch(
        AppBackEndApiEndpoint.applyToMatch(data.matchPostId),
        {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ message: data.message }),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to apply to match')
      }
    } catch (error) {
      console.error('Match apply error:', error)
      throw new Error('매치 신청에 실패했습니다.')
    }
  }

  async getMatchApplications(matchId: string): Promise<MatchApplication[]> {
    try {
      const response = await fetch(
        AppBackEndApiEndpoint.getMatchApplications(matchId),
        {
          method: 'GET',
          headers: this.getAuthHeaders(),
          cache: 'no-cache',
        },
      )

      if (!response.ok) {
        throw new Error('Failed to fetch match applications')
      }

      return await response.json()
    } catch (error) {
      console.error('Match applications fetch error:', error)
      throw new Error('매치 신청 목록을 불러오는데 실패했습니다.')
    }
  }

  async updateApplicationStatus(
    matchId: string,
    applicationId: string,
    status: 'accepted' | 'rejected',
  ): Promise<void> {
    try {
      const response = await fetch(
        AppBackEndApiEndpoint.updateApplicationStatus(matchId, applicationId),
        {
          method: 'PUT',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ status }),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to update application status')
      }
    } catch (error) {
      console.error('Application status update error:', error)
      throw new Error('신청 상태 업데이트에 실패했습니다.')
    }
  }

  async getMyApplications(): Promise<MatchApplication[]> {
    try {
      const response = await fetch(AppBackEndApiEndpoint.getMyApplications(), {
        method: 'GET',
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch my applications')
      }

      const data = await response.json()
      return data.applications || []
    } catch (error) {
      console.error('My applications fetch error:', error)
      throw new Error('내 신청 목록을 불러오는데 실패했습니다.')
    }
  }

  async getMyApplication(matchId: string): Promise<MatchApplication | null> {
    try {
      const response = await fetch(
        AppBackEndApiEndpoint.getMyApplication(matchId),
        {
          method: 'GET',
          headers: this.getAuthHeaders(),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to fetch my application')
      }

      const data = await response.json()
      return data.application || null
    } catch (error) {
      console.error('My application fetch error:', error)
      throw new Error('내 신청 상태를 불러오는데 실패했습니다.')
    }
  }

  async cancelApplication(applicationId: string): Promise<void> {
    try {
      const response = await fetch(
        AppBackEndApiEndpoint.cancelApplication(applicationId),
        {
          method: 'DELETE',
          headers: this.getAuthHeaders(),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to cancel application')
      }
    } catch (error) {
      console.error('Cancel application error:', error)
      throw new Error('신청 취소에 실패했습니다.')
    }
  }
}
