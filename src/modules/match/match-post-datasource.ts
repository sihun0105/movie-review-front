import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import type {
  MatchPost,
  MatchPostResponse,
  CreateMatchPostRequest,
} from './match.entity'

export class MatchPostDataSource {
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

  async createMatchPost(data: CreateMatchPostRequest): Promise<MatchPost> {
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
}
