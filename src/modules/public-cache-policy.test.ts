import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/config/movie-api-endpoint', () => ({
  MovieBackEndApiEndpoint: {
    getMovie: () => 'https://backend/movie',
  },
}))

vi.mock('@/config/app-backend-api-endpoint', () => ({
  AppBackEndApiEndpoint: {
    listArticles: (page: number, pageSize: number) =>
      `https://backend/article?page=${page}&pageSize=${pageSize}`,
    getMatchPosts: (page: number, pageSize: number) =>
      `https://backend/match?page=${page}&pageSize=${pageSize}`,
  },
}))

vi.mock('@/config/article-comment-api-endpoint', () => ({
  ArticleCommentApiEndpoint: {},
}))

vi.mock('@/lib/http-response-error', () => ({
  HttpResponseError: class HttpResponseError extends Error {},
}))

import { ArticleDatasource } from './article/article-datasource'
import { MatchPostDataSource } from './match/match-post-datasource'
import { MovieDatasource } from './movie/movie-datasource'

afterEach(() => vi.unstubAllGlobals())

describe('public list cache policy', () => {
  it.each([
    ['movies', () => new MovieDatasource().getMovie(), 300],
    ['articles', () => new ArticleDatasource().listArticles(1), 60],
    ['matches', () => new MatchPostDataSource().getMatchPosts(1, 5), 60],
  ])('revalidates %s without an authorization header', async (_, load, seconds) => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await load()

    const options = fetchMock.mock.calls[0][1]
    expect(options.next).toEqual({ revalidate: seconds })
    expect(options.headers).not.toHaveProperty('Authorization')
  })
})
