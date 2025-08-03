import {
  MatchPost,
  MatchPostResponse,
  CreateMatchPostRequest,
  ApplyMatchRequest,
  MatchApplication,
} from '@/lib/type'

export class MatchService {
  // 매치 게시글 목록 조회
  static async getMatchPosts(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<MatchPostResponse> {
    const response = await fetch(
      `/api/match?page=${page}&pageSize=${pageSize}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    if (!response.ok) {
      throw new Error('매치 게시글을 불러오는데 실패했습니다.')
    }

    return response.json()
  }

  // 매치 게시글 상세 조회
  static async getMatchPost(matchId: string): Promise<MatchPost> {
    const response = await fetch(`/api/match/${matchId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('매치 게시글을 불러오는데 실패했습니다.')
    }

    return response.json()
  }

  // 매치 게시글 작성
  static async createMatchPost(
    data: CreateMatchPostRequest,
  ): Promise<MatchPost> {
    const response = await fetch('/api/match', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('매치 게시글 작성에 실패했습니다.')
    }

    return response.json()
  }

  // 매치 게시글 수정
  static async updateMatchPost(
    matchId: string,
    data: Partial<CreateMatchPostRequest>,
  ): Promise<MatchPost> {
    const response = await fetch(`/api/match/${matchId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('매치 게시글 수정에 실패했습니다.')
    }

    return response.json()
  }

  // 매치 게시글 삭제
  static async deleteMatchPost(matchId: string): Promise<void> {
    const response = await fetch(`/api/match/${matchId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('매치 게시글 삭제에 실패했습니다.')
    }
  }

  // 매치 신청
  static async applyToMatch(data: ApplyMatchRequest): Promise<void> {
    const response = await fetch(`/api/match/${data.matchPostId}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ message: data.message }),
    })

    if (!response.ok) {
      throw new Error('매치 신청에 실패했습니다.')
    }
  }

  // 매치 신청 목록 조회 (게시글 작성자만)
  static async getMatchApplications(
    matchId: string,
  ): Promise<MatchApplication[]> {
    const response = await fetch(`/api/match/${matchId}/applications`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('매치 신청 목록을 불러오는데 실패했습니다.')
    }

    return response.json()
  }

  // 매치 신청 상태 업데이트 (승인/거절)
  static async updateApplicationStatus(
    matchId: string,
    applicationId: string,
    status: 'accepted' | 'rejected',
  ): Promise<void> {
    const response = await fetch(
      `/api/match/${matchId}/applications/${applicationId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      },
    )

    if (!response.ok) {
      throw new Error('신청 상태 업데이트에 실패했습니다.')
    }
  }
}
