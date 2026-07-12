'use client'

import useSWR from 'swr'
import {
  Activity,
  CalendarDays,
  RefreshCw,
  UserPlus,
  Users,
} from 'lucide-react'
import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import type { AnalyticsSummary } from '@/modules/analytics'

const fetcher = async (url: string): Promise<AnalyticsSummary> => {
  const response = await fetch(url, { cache: 'no-store' })
  const body = await response.json()
  if (!response.ok) throw new Error(body.message)
  return body
}

const numberFormat = new Intl.NumberFormat('ko-KR')

export default function AnalyticsPage() {
  const endpoint = AppClientApiEndpoint.getAnalyticsSummary()
  const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher)

  return (
    <main className="min-h-page px-5 pb-24 pt-8 md:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-start justify-between border-b border-neutral-200 pb-6">
          <div>
            <p className="text-sm font-medium text-neutral-500">운영 현황</p>
            <h1 className="mt-1 text-2xl font-bold text-neutral-950">
              사용자 통계
            </h1>
          </div>
          <button
            type="button"
            aria-label="통계 새로고침"
            onClick={() => mutate()}
            className="size-10 grid place-items-center border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
          >
            <RefreshCw
              className={`size-4 ${isLoading ? 'animate-spin' : ''}`}
            />
          </button>
        </header>

        {error && (
          <div className="mt-8 border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error.message}
          </div>
        )}

        {isLoading && !data && <LoadingState />}
        {data && <Dashboard summary={data} />}
      </div>
    </main>
  )
}

function Dashboard({ summary }: { summary: AnalyticsSummary }) {
  const metrics = [
    { label: '전체 가입자', value: summary.totalUsers, icon: Users },
    {
      label: '이번 달 가입자',
      value: summary.signupsThisMonth,
      icon: UserPlus,
    },
    { label: '오늘 활성 사용자', value: summary.activeToday, icon: Activity },
    {
      label: '최근 7일 활성 사용자',
      value: summary.active7d,
      icon: CalendarDays,
    },
    {
      label: '최근 30일 활성 사용자',
      value: summary.active30d,
      icon: CalendarDays,
    },
  ]
  const maxCount = Math.max(
    ...summary.monthlySignups.map((item) => item.count),
    1,
  )

  return (
    <>
      <section className="grid grid-cols-2 gap-3 py-8 md:grid-cols-5">
        {metrics.map(({ label, value, icon: Icon }) => (
          <article key={label} className="border border-neutral-200 p-4">
            <Icon className="size-4 text-blue-600" />
            <p className="mt-5 text-xs text-neutral-500">{label}</p>
            <strong className="mt-1 block text-2xl text-neutral-950">
              {numberFormat.format(value)}
            </strong>
          </article>
        ))}
      </section>

      <section className="border-t border-neutral-200 py-8">
        <h2 className="text-lg font-bold text-neutral-950">월별 가입자</h2>
        <div className="mt-6 flex h-56 items-end gap-3 border-b border-neutral-200 px-2 md:gap-6">
          {summary.monthlySignups.map((item) => (
            <div
              key={item.month}
              className="flex min-w-0 flex-1 flex-col items-center gap-2"
            >
              <span className="text-xs font-semibold text-neutral-700">
                {item.count}
              </span>
              <div
                className="max-w-14 w-full bg-blue-600"
                style={{
                  height: `${Math.max((item.count / maxCount) * 150, 2)}px`,
                }}
              />
              <span className="whitespace-nowrap text-xs text-neutral-500">
                {item.month.slice(5)}월
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-neutral-400">
          갱신 {new Date(summary.generatedAt).toLocaleString('ko-KR')}
        </p>
      </section>
    </>
  )
}

function LoadingState() {
  return (
    <div
      className="grid grid-cols-2 gap-3 py-8 md:grid-cols-5"
      aria-label="통계 로딩 중"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-28 animate-pulse bg-neutral-100" />
      ))}
    </div>
  )
}
