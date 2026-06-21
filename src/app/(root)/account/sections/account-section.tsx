'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { AppPath } from '@/config/app-path'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'

interface MenuItem {
  label: string
  href?: string
  onClick?: () => void
  destructive?: boolean
}

function MenuRow({ item, isLast }: { item: MenuItem; isLast: boolean }) {
  const inner = (
    <div
      className={`flex w-full items-center px-4 py-3.5 text-left transition-colors hover:bg-accent ${!isLast ? 'border-b border-border' : ''}`}
    >
      <span className={`text-[14px] ${item.destructive ? 'text-destructive' : 'text-foreground'}`}>
        {item.label}
      </span>
      {!item.destructive && (
        <svg
          width="7" height="12" viewBox="0 0 8 14"
          aria-hidden className="ml-auto text-muted-foreground"
        >
          <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
  if (item.href) return <Link href={item.href}>{inner}</Link>
  return <button type="button" onClick={item.onClick} className="block w-full">{inner}</button>
}

const AccountSection: FunctionComponent = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const items: MenuItem[] = [
    { label: '내 매칭', href: '/match/my-matches' },
    { label: '알림 설정', href: AppPath.settings() },
    { label: '로그아웃', onClick: () => signOut({ callbackUrl: '/' }), destructive: true },
  ]

  const handleDeleteAccount = async () => {
    if (isDeleting) return
    setIsDeleting(true)
    try {
      const res = await fetch('/api/user', {
        method: 'DELETE',
      })
      if (!res.ok) {
        throw new Error('Failed to delete account')
      }
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Delete account error:', error)
      setIsDeleting(false)
      window.alert('회원탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  return (
    <section>
      <div className="flex items-center border-b border-border px-4 py-3.5">
        <h1 className="text-[18px] font-bold tracking-tight text-foreground">계정</h1>
      </div>

      <div className="px-4 pt-4">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">활동</p>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          {items.map((it, i) => (
            <MenuRow key={it.label} item={it} isLast={i === items.length - 1} />
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">계정 관리</p>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center px-4 py-3.5 text-left transition-colors hover:bg-accent"
              >
                <span className="text-[14px] text-destructive">회원탈퇴</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[calc(100vw-2rem)] rounded-lg sm:max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>정말 탈퇴하시겠습니까?</AlertDialogTitle>
                <AlertDialogDescription>
                  탈퇴하면 계정이 비활성화되고 다시 로그인할 수 없습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>취소</AlertDialogCancel>
                <AlertDialogAction
                  disabled={isDeleting}
                  onClick={(event) => {
                    event.preventDefault()
                    handleDeleteAccount()
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? '탈퇴 처리 중...' : '탈퇴하기'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  )
}

export default AccountSection
