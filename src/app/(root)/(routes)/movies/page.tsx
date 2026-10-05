import Link from 'next/link'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Search } from 'lucide-react'
import { MovieRepository } from '@/modules/movie/movie-repository'
import {
  movieCatalogHref,
  movieCatalogPageNumber,
} from '@/lib/seo/public-discovery'
import { MovieCatalogCard } from './movie-catalog-card'

export const dynamic = 'force-dynamic'
export const fetchCache = 'default-cache'

const GENRES = ['드라마', '액션', '코미디', '스릴러', '애니메이션', '공포']
interface PageProps {
  searchParams?: { query?: string; genre?: string; page?: string }
}

const clean = (value?: string) => value?.trim().slice(0, 50) ?? ''

export function generateMetadata({ searchParams }: PageProps): Metadata {
  const query = clean(searchParams?.query)
  const genre = clean(searchParams?.genre)
  const page = movieCatalogPageNumber(searchParams?.page)
  const canonical = `https://bollae.kr${movieCatalogHref({ page, query, genre })}`
  const title = query ? `${query} 영화 검색 | 볼래` : '영화 둘러보기 | 볼래'
  const description =
    '최신 영화와 장르별 작품을 둘러보고 평점, 리뷰, 감독 정보를 확인하세요.'
  return {
    title,
    description,
    alternates: { canonical },
    robots: query || genre || page > 1 ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'website',
      title,
      description,
      url: canonical,
      images: ['/images/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.png'],
    },
  }
}

export default async function MoviesPage({ searchParams }: PageProps) {
  const query = clean(searchParams?.query)
  const genre = clean(searchParams?.genre)
  const page = movieCatalogPageNumber(searchParams?.page)
  const data = await new MovieRepository().getMovieCatalog(query, genre, page)
  if (page > 1 && data.movies.length === 0) {
    redirect(movieCatalogHref({ page: 1, query, genre }))
  }

  return (
    <main className="min-h-page px-4 pb-8 pt-5">
      <header>
        <p className="text-[12px] font-medium text-primary">MOVIE LIBRARY</p>
        <h1 className="mt-1 text-[24px] font-bold">영화 둘러보기</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          보고 싶은 영화를 찾고 리뷰와 매칭을 확인해보세요.
        </p>
      </header>

      <form className="mt-5 flex gap-2" action="/movies">
        {genre && <input type="hidden" name="genre" value={genre} />}
        <label className="flex h-11 min-w-0 flex-1 items-center gap-2 border-b border-foreground px-1">
          <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
          <input
            name="query"
            defaultValue={query}
            placeholder="영화 제목 검색"
            aria-label="영화 제목 검색"
            className="min-w-0 flex-1 bg-transparent text-[14px] outline-none"
          />
        </label>
        <button className="h-11 bg-foreground px-4 text-[13px] font-semibold text-background">
          검색
        </button>
      </form>

      <nav aria-label="장르 필터" className="-mx-4 mt-4 overflow-x-auto px-4">
        <div className="flex w-max gap-2 pr-4">
          {['', ...GENRES].map((item) => (
            <Link
              key={item || 'all'}
              href={movieCatalogHref({ page: 1, query, genre: item })}
              className={`border px-3 py-1.5 text-[12px] ${genre === item ? 'border-foreground bg-foreground text-background' : 'border-border'}`}
            >
              {item || '전체'}
            </Link>
          ))}
        </div>
      </nav>

      <div className="mt-5 flex items-end justify-between border-b border-border pb-3">
        <h2 className="text-[15px] font-semibold">
          {query ? `'${query}' 검색 결과` : genre || '전체 영화'}
        </h2>
        <span className="font-mono text-[11px] text-muted-foreground">
          {data.total}편
        </span>
      </div>

      {data.movies.length ? (
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3">
          {data.movies.map((movie) => (
            <MovieCatalogCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-[13px] text-muted-foreground">
          조건에 맞는 영화가 없습니다.
        </p>
      )}

      {(page > 1 || data.hasNext) && (
        <nav
          aria-label="영화 목록 페이지"
          className="mt-8 flex justify-between border-t border-border pt-4 text-[13px]"
        >
          {page > 1 ? (
            <Link href={movieCatalogHref({ page: page - 1, query, genre })}>
              ← 이전
            </Link>
          ) : (
            <span />
          )}
          {data.hasNext && (
            <Link href={movieCatalogHref({ page: page + 1, query, genre })}>
              다음 →
            </Link>
          )}
        </nav>
      )}
    </main>
  )
}
