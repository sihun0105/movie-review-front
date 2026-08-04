'use client'

import { RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import {
  UserActivityRepository,
  UserActivityRequestError,
  UserActivityType,
} from '@/modules/user-activity'
import ActivityListPanel from '../components/activity/activity-list-panel'
import ActivitySummaryNav from '../components/activity/activity-summary-nav'

const repository = new UserActivityRepository()

export default function CommunitySummarySection() {
  const [selected, setSelected] = useState<UserActivityType | null>(null)
  const { data, error, isLoading, mutate } = useSWR(
    'account-community-summary',
    () => repository.getSummary(),
    { revalidateOnFocus: false },
  )
  const isUnauthorized =
    error instanceof UserActivityRequestError && error.status === 401

  return (
    <section className="py-5">
      <ActivitySummaryNav
        summary={error ? undefined : data}
        selected={selected}
        isLoading={isLoading}
        onSelect={(type) => setSelected(selected === type ? null : type)}
      />
      {error && (
        <div
          role="alert"
          className="mx-4 mt-3 flex items-center justify-between gap-3 border border-destructive/30 bg-destructive/5 px-3 py-2 text-[12px] text-destructive"
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
      {selected && (
        <ActivityListPanel type={selected} onDeleted={() => mutate()} />
      )}
    </section>
  )
}
