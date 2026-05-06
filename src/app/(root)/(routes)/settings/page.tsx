'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

function useLocalToggle(key: string, defaultVal = true) {
  const [on, setOn] = useState(defaultVal)
  useEffect(() => {
    const stored = localStorage.getItem(key)
    if (stored !== null) setOn(stored === 'true')
  }, [key])
  const toggle = () => {
    setOn((prev) => {
      localStorage.setItem(key, String(!prev))
      return !prev
    })
  }
  return [on, toggle] as const
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`relative h-6 w-11 rounded-full transition-colors focus:outline-none ${on ? 'bg-primary' : 'bg-secondary'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  )
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  )
}

export default function SettingsPage() {
  const router = useRouter()

  // 훅은 항상 최상위에서 고정 순서로 호출해야 함 (Rules of Hooks)
  const [applyOn, applyToggle] = useLocalToggle('notif_apply')
  const [resultOn, resultToggle] = useLocalToggle('notif_result')
  const [chatOn, chatToggle] = useLocalToggle('notif_chat')

  const notifItems = [
    { key: 'notif_apply',  label: '매칭 신청 알림',  desc: '내 매칭에 신청이 들어왔을 때',  on: applyOn,  toggle: applyToggle },
    { key: 'notif_result', label: '신청 결과 알림',   desc: '신청한 매칭의 승인·거절 결과',  on: resultOn, toggle: resultToggle },
    { key: 'notif_chat',   label: '채팅 메시지 알림', desc: '새 채팅 메시지가 도착했을 때',  on: chatOn,   toggle: chatToggle },
  ]

  return (
    <div className="min-h-page bg-background pb-[100px] lg:pb-4 text-foreground">
      {/* 헤더 */}
      <div className="flex items-center border-b border-border px-4 py-3.5">
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label="뒤로"
        >
          <svg width="7" height="12" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="ml-3 text-[18px] font-bold tracking-tight text-foreground">설정</h1>
      </div>

      <div className="space-y-6 px-4 pt-5">
        {/* 알림 설정 */}
        <div>
          <SectionHead>알림</SectionHead>
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            {notifItems.map(({ key, label, desc, on, toggle }, i) => (
              <div
                key={key}
                className={`flex items-center justify-between px-4 py-3.5 ${i < notifItems.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="min-w-0 flex-1 pr-4">
                  <p className="text-[14px] text-foreground">{label}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{desc}</p>
                </div>
                <Toggle on={on} onToggle={toggle} />
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            * 알림은 브라우저 로컬 설정으로 저장됩니다. 실제 푸시 알림은 준비 중입니다.
          </p>
        </div>

        {/* 앱 정보 */}
        <div>
          <SectionHead>앱 정보</SectionHead>
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            {[
              { label: '버전', value: 'v0.1.0' },
              { label: '문의하기', value: 'tlgns14@gmail.com' },
            ].map(({ label, value }, i, arr) => (
              <div
                key={label}
                className={`flex items-center justify-between px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-border' : ''}`}
              >
                <span className="text-[14px] text-foreground">{label}</span>
                <span className="font-mono text-[12px] text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
