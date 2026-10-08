import { MovieRepository } from '@/modules/movie/movie-repository'
import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GET } from './route'

vi.mock('@/modules/movie/movie-repository', () => ({
  MovieRepository: vi.fn(),
}))

describe('GET /api/movie/top-rated', () => {
  beforeEach(() => vi.clearAllMocks())

  it.each([
    ['99', 24],
    ['invalid', 12],
    ['0', 1],
  ])('normalizes limit %s to %i', async (query, expected) => {
    const getTopRatedMovies = vi.fn().mockResolvedValue([])
    vi.mocked(MovieRepository).mockImplementation(
      () => ({ getTopRatedMovies }) as any,
    )
    const request = new NextRequest(
      `http://localhost/api/movie/top-rated?limit=${query}`,
    )

    const response = await GET(request)

    expect(response.status).toBe(200)
    expect(getTopRatedMovies).toHaveBeenCalledWith(expected)
    await expect(response.json()).resolves.toEqual({ movies: [] })
  })
})
