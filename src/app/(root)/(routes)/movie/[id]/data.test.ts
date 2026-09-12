import { afterEach, describe, expect, it, vi } from 'vitest'
vi.mock('react', () => ({ cache: (fn: unknown) => fn }))

vi.mock('@/config/app-backend-api-endpoint', () => ({
  AppBackEndApiEndpoint: {
    getCommentList: (id: number, page: number) =>
      `https://backend/reply?movieId=${id}&page=${page}`,
  },
}))
vi.mock('@/config/comment-api-endpoint', () => ({ CommentApiEndpoint: {} }))
vi.mock('@/config/movie-api-endpoint', () => ({ MovieBackEndApiEndpoint: {} }))
vi.mock(
  '@/modules/comment/comment-repository',
  () => import('../../../../../modules/comment/comment-repository'),
)
vi.mock(
  '@/modules/movie/movie-repository',
  () => import('../../../../../modules/movie/movie-repository'),
)
vi.mock(
  '@/lib/http-response-error',
  () => import('../../../../../lib/http-response-error'),
)
vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND')
  },
}))

import { getCommentPage, getMovieDetail } from './data'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { HttpResponseError } from '@/lib/http-response-error'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('movie server data contracts', () => {
  it('reads backend page one while browser pagination remains zero-based', async () => {
    vi.stubGlobal('fetch', async (url: string) => {
      const page = Number(new URL(url).searchParams.get('page'))
      if ((page - 1) * 10 < 0) return new Response('{}', { status: 500 })
      return Response.json({
        replies: [
          {
            replyId: 12,
            userId: 4,
            nickname: '영화팬',
            comment: '실제 첫 페이지',
            rating: 4,
            createdAt: '2026-07-19',
            updatedAt: '2026-07-19',
          },
        ],
        hasNext: false,
      })
    })
    expect(await getCommentPage('20233219')).toMatchObject({
      comments: [{ id: 12, content: '실제 첫 페이지', rating: 4 }],
    })
  })

  it('maps only missing movies to Next notFound', async () => {
    const spy = vi.spyOn(MovieRepository.prototype, 'getMovieDetail')
    spy.mockRejectedValueOnce(new HttpResponseError(404, 'Missing'))
    await expect(getMovieDetail('99999999')).rejects.toThrow('NEXT_NOT_FOUND')
    const failure = new HttpResponseError(503, 'Unavailable')
    spy.mockRejectedValueOnce(failure)
    await expect(getMovieDetail('20233219')).rejects.toBe(failure)
  })
})
