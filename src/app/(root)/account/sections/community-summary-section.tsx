'use client'

import { FileText, Heart, MessageCircle, RefreshCw, Star } from 'lucide-react'
import Link from 'next/link'
import useSWR from 'swr'
import {
  UserActivityRepository,
  UserActivityRequestError,
} from '@/modules/user-activity'

const repository = new UserActivityRepository()

const metrics = [
  { key: 'articleCommentCount', label: '작성 댓글', icon: MessageCircle },
  { key: 'movieRatingCount', label: '영화 평가', icon: Star },
  { key: 'articleCount', label: '작성 게시글', icon: FileText },
  { key: 'receivedLikeCount', label: '받은 좋아요', icon: Heart },
] as const

export default function CommunitySummarySection() {
  const { data, error, isLoading, mutate } = useSWR(
    'account-community-summary',
    () => repository.getSummary(),
    { revalidateOnFocus: false },
  )
  const isUnauthorized =
    error instanceof UserActivityRequestError && error.status === 401

  return (
    <section className="border-b border-border px-4 py-5">
      <h2 className="mb-3 text-[18px] font-bold tracking-tight text-foreground">
        나의 커뮤니티
      </h2>
      <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-card">
        {metrics.map(({ key, label, icon: Icon }, index) => (
          <div
            key={key}
            className={`min-w-0 p-4 ${
              index % 2 === 0 ? 'border-r border-border' : ''
            } ${index < 2 ? 'border-b border-border' : ''}`}
          >
            <Icon className="mb-3 h-4 w-4 text-muted-foreground" />
            <div className="font-mono text-[26px] font-bold leading-none text-foreground">
              {isLoading ? (
                <span className="inline-block h-6 w-10 animate-pulse rounded bg-secondary" />
              ) : error || !data ? (
                '—'
              ) : (
                (data?.[key] ?? 0).toLocaleString('ko-KR')
              )}
            </div>
            <p className="mt-2 text-[12px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      {error && (
        <div
          role="alert"
          className="mt-3 flex items-center justify-between gap-3 border border-destructive/30 bg-destructive/5 px-3 py-2 text-[12px] text-destructive"
        >
          <span>
            {isUnauthorized
              ? '세션이 만료됐어요.'
              : '활동 정보를 불러오지 못했어요.'}
          </span>
          {isUnauthorized ? (
            <Link
              href="/login?callbackUrl=%2Faccount"
              className="shrink-0 font-semibold underline underline-offset-2"
            >
              다시 로그인
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => mutate()}
              aria-label="활동 정보 다시 불러오기"
              title="다시 불러오기"
              className="shrink-0 p-1 hover:text-foreground"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </section>
  )
}
