import { describe, expect, it, vi } from 'vitest'
vi.mock('./data', () => ({
  getMovieDetail: vi.fn(),
  getScore: vi.fn().mockResolvedValue(null),
  getReviews: vi.fn().mockResolvedValue([]),
  hasValidScore: (s: any) => !!s?.scoreCount && s.averageScore > 0,
}))
vi.mock(
  '@/lib/seo/public-discovery',
  () => import('../../../../../lib/seo/public-discovery'),
)
import { getMovieDetail } from './data'
import { generateMovieMetadata } from './metadata'
import { buildMovieJsonLd } from './json-ld'

const movie = {
  title: '사진의 얼굴',
  plot: '',
  poster: '',
  openedAt: new Date('2026-09-02'),
  genre: '',
  director: '',
} as any

describe('movie SEO accuracy', () => {
  it('provides meaningful metadata for movies without enrichment', async () => {
    vi.mocked(getMovieDetail).mockResolvedValue(movie)
    const meta = await generateMovieMetadata('20255509')
    expect(meta.description).toContain('사진의 얼굴')
    expect(meta.description).not.toMatch(/^\s*\|/)
  })
  it('does not hide missing-resource or service errors behind home metadata', async () => {
    const error = new Error('NEXT_NOT_FOUND')
    vi.mocked(getMovieDetail).mockRejectedValue(error)
    await expect(generateMovieMetadata('99999999')).rejects.toBe(error)
  })
  it('omits empty images and unsupported watch action', () => {
    const json = buildMovieJsonLd('20255509', movie, [], null)
    expect(json).not.toHaveProperty('image')
    expect(json).not.toHaveProperty('potentialAction')
  })
  it('marks up real ratings only and does not call a page count a total', () => {
    const replies = [
      { id: 12, nickname: '팬', content: '좋아요', rating: 4 },
      { id: 13, nickname: '팬2', content: '대화만' },
      { id: 14, nickname: '팬3', content: '삭제', rating: 5, isDeleted: true },
    ] as any
    const json = buildMovieJsonLd('20255509', movie, replies, {
      movieCd: 20255509,
      averageScore: 4,
      scoreCount: 20,
    })
    expect(json.review).toHaveLength(1)
    expect(json.review).toMatchObject([
      {
        '@id': 'https://bollae.kr/movie/20255509#comment-12',
        reviewRating: { ratingValue: 4, bestRating: 5 },
      },
    ])
    expect(json.aggregateRating).not.toHaveProperty('reviewCount')
  })
})
