import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { GET } from './route'

vi.mock('@/modules/movie/movie-repository', () => ({
  MovieRepository: vi.fn(),
}))

describe('GET /api/movie/catalog', () => {
  beforeEach(() => vi.clearAllMocks())

  it('forwards sanitized catalog parameters', async () => {
    const getMovieCatalog = vi.fn().mockResolvedValue({
      movies: [],
      page: 2,
      pageSize: 12,
      total: 0,
      hasNext: false,
    })
    vi.mocked(MovieRepository).mockImplementation(
      () => ({ getMovieCatalog }) as any,
    )
    const request = new NextRequest(
      'http://localhost/api/movie/catalog?query=%20%EC%9D%B8%ED%84%B4%20&genre=%EB%93%9C%EB%9D%BC%EB%A7%88&page=2&pageSize=12',
    )

    const response = await GET(request)

    expect(response.status).toBe(200)
    expect(getMovieCatalog).toHaveBeenCalledWith('인턴', '드라마', 2, 12)
  })
})
