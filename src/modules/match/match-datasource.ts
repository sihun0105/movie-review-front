import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import type {
  MatchPost,
  MatchPostResponse,
  CreateMatchPostRequest,
  ApplyMatchRequest,
  MatchApplication,
} from './match.entity'

export class MatchDataSource {
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
  // 매치 게시글 목록 조회
  async getMatchPosts(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<MatchPostResponse> {
    try {
      const response = await fetch(
        AppBackEndApiEndpoint.getMatchPosts(page, pageSize),
        {
          method: 'GET',
          headers: this.getAuthHeaders(),
          cache: 'no-cache',
        },
      )

      if (!response.ok) {
        throw new Error('Failed to fetch match posts')
      }

      return await response.json()
    } catch (error) {
      console.error('Match posts fetch error:', error)
      throw new Error('매치 게시글을 불러오는데 실패했습니다.')
    }
  }

  // 매치 게시글 상세 조회
  async getMatchPost(matchId: string): Promise<MatchPost> {
    try {
      const response = await fetch(
        AppBackEndApiEndpoint.getMatchPost(matchId),
        {
          method: 'GET',
          headers: this.getAuthHeaders(),
          cache: 'no-cache',
        },
      )

      if (!response.ok) {
        throw new Error('Failed to fetch match post')
      }

      return await response.json()
    } catch (error) {
      console.error('Match post fetch error:', error)
      throw new Error('매치 게시글을 불러오는데 실패했습니다.')
    }
  }

  // 매치 게시글 작성
  async createMatchPost(data: CreateMatchPostRequest): Promise<MatchPost> {
    console.log('Creating match post with data:', data)
    try {
      const response = await fetch(AppBackEndApiEndpoint.createMatchPost(), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create match post')
      }

      return await response.json()
    } catch (error) {
      console.error('Match post creation error:', error)
      throw new Error('매치 게시글 작성에 실패했습니다.')
    }
  }

  // 매치 게시글 수정
  async updateMatchPost(
    matchId: string,
    data: Partial<CreateMatchPostRequest>,
  ): Promise<MatchPost> {
    try {
      const response = await fetch(
        AppBackEndApiEndpoint.updateMatchPost(matchId),
        {
          method: 'PUT',
          headers: this.getAuthHeaders(),
          body: JSON.stringify(data),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to update match post')
      }

      return await response.json()
    } catch (error) {
      console.error('Match post update error:', error)
      throw new Error('매치 게시글 수정에 실패했습니다.')
    }
  }

  // 매치 게시글 삭제
  async deleteMatchPost(matchId: string): Promise<void> {
    try {
      const response = await fetch(
        AppBackEndApiEndpoint.deleteMatchPost(matchId),
        {
          method: 'DELETE',
          headers: this.getAuthHeaders(),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to delete match post')
      }
    } catch (error) {
      console.error('Match post delete error:', error)
      throw new Error('매치 게시글 삭제에 실패했습니다.')
    }
  }

  // 매치 신청
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

  // 매치 신청 목록 조회 (게시글 작성자만)
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

  // 매치 신청 상태 업데이트 (승인/거절)
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

  // 내가 신청한 매치들 조회
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
  // 내가 신청한 매치의 신청 상태 조회
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
  // 내가 작성한 매치들 조회
  async getMyPosts(): Promise<MatchPost[]> {
    try {
      const response = await fetch(AppBackEndApiEndpoint.getMyPosts(), {
        method: 'GET',
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch my posts')
      }

      const data = await response.json()
      return data.matches || []
    } catch (error) {
      console.error('My posts fetch error:', error)
      throw new Error('내 게시글 목록을 불러오는데 실패했습니다.')
    }
  }

  // 매치 신청 취소
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
