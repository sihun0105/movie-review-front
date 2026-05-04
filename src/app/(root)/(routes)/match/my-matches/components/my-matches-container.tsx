'use client'

import { useAppToast } from '@/hooks/use-app-toast'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useCancelApplication, useMyApplications, useMyPosts } from '../../hooks'
import { MyAppliedMatches } from './my-applied-matches'
import { MyCreatedMatches } from './my-created-matches'

type Tab = 'applied' | 'created'

const MyMatchesContainer = () => {
  const { status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showToast } = useAppToast()

  const initialTab = (searchParams?.get('tab') as Tab) ?? 'applied'
  const [activeTab, setActiveTab] = useState<Tab>(initialTab)

  const { applications, isLoading: loadingApplied, refetch } = useMyApplications()
  const { matches, isLoading: loadingCreated } = useMyPosts()
  const { cancelApplication } = useCancelApplication()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  const handleCancel = useCallback(
    async (id: string) => {
      if (!window.confirm('정말로 신청을 취소하시겠습니까?')) return
      try {
        await cancelApplication(id)
        showToast('신청이 취소되었습니다.')
        refetch()
      } catch {
        showToast('신청 취소에 실패했습니다.')
      }
    },
    [cancelApplication, showToast, refetch],
  )

  if (status === 'loading')
    return (
      <div className="flex h-[40vh] items-center justify-center font-mono text-[12px] text-muted-foreground">
        loading...
      </div>
    )

  if (status === 'unauthenticated') return null

  const isLoading = activeTab === 'applied' ? loadingApplied : loadingCreated

  return (
    <div>
      <div className="flex border-b border-border">
        {(['applied', 'created'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 font-mono text-[11px] uppercase tracking-[1px] transition ${
              activeTab === tab
                ? 'border-b-2 border-yellow-400 text-yellow-400'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'applied' ? '신청한 매칭' : '내가 만든 매칭'}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex h-[30vh] items-center justify-center font-mono text-[12px] text-muted-foreground">
          loading...
        </div>
      ) : activeTab === 'applied' ? (
        <MyAppliedMatches applications={applications} onCancel={handleCancel} />
      ) : (
        <MyCreatedMatches matches={matches} />
      )}
    </div>
  )
}

export { MyMatchesContainer }
