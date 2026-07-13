import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { getAuthTokenFromRequest } from '@/lib/utils/getToken'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { GET, POST } from './route'

vi.mock('@/lib/utils/getToken', () => ({
  getAuthTokenFromRequest: vi.fn(),
}))

vi.mock('@/modules/movie/movie-repository', () => ({
  MovieRepository: vi.fn(),
}))

const mockAuthToken = vi.mocked(getAuthTokenFromRequest)
const MockMovieRepository = vi.mocked(MovieRepository)
const score = { id: 7, movieCd: 20259946, score: 4, userId: 4 }

describe('movie score authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('uses the current NextAuth token to update a score', async () => {
    const updateScore = vi.fn().mockResolvedValue(score)
    mockAuthToken.mockResolvedValue('oauth-token')
    MockMovieRepository.mockImplementation(
      () => ({ updateScore } as unknown as MovieRepository),
    )
    const request = new NextRequest('http://localhost/api/score/20259946', {
      method: 'POST',
      body: JSON.stringify({ score: 4 }),
    })

    const response = await POST(request, { params: { id: 20259946 } })

    expect(MockMovieRepository).toHaveBeenCalledWith('oauth-token')
    expect(updateScore).toHaveBeenCalledWith(20259946, 4)
    expect(response.status).toBe(200)
  })

  it('uses the current NextAuth token to read a score', async () => {
    const getScore = vi.fn().mockResolvedValue(score)
    mockAuthToken.mockResolvedValue('oauth-token')
    MockMovieRepository.mockImplementation(
      () => ({ getScore } as unknown as MovieRepository),
    )
    const request = new NextRequest('http://localhost/api/score/20259946')

    const response = await GET(request, { params: { id: '20259946' } })

    expect(MockMovieRepository).toHaveBeenCalledWith('oauth-token')
    expect(getScore).toHaveBeenCalledWith('20259946')
    expect(response.status).toBe(200)
  })

  it('returns the expected unauthenticated responses', async () => {
    mockAuthToken.mockResolvedValue(undefined)
    const postRequest = new NextRequest(
      'http://localhost/api/score/20259946',
      { method: 'POST', body: JSON.stringify({ score: 4 }) },
    )
    const getRequest = new NextRequest('http://localhost/api/score/20259946')

    const postResponse = await POST(postRequest, {
      params: { id: 20259946 },
    })
    const getResponse = await GET(getRequest, { params: { id: '20259946' } })

    expect(postResponse.status).toBe(401)
    expect(await getResponse.json()).toEqual({
      data: { id: 0, score: 0, userId: 0, movieCd: 20259946 },
    })
    expect(MockMovieRepository).not.toHaveBeenCalled()
  })
})
