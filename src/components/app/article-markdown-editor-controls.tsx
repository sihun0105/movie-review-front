import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface EditorButtonProps {
  children: ReactNode
  disabled?: boolean
  onClick: () => void
  title: string
}

export function EditorButton({
  children,
  disabled,
  onClick,
  title,
}: EditorButtonProps) {
  return (
    <button
      type="button"
      aria-label={title}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-md border border-border bg-transparent text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50 sm:h-9 sm:w-9"
    >
      {children}
    </button>
  )
}

export function ModeButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'h-10 touch-manipulation rounded px-2.5 text-[12px] text-muted-foreground',
        active && 'bg-secondary font-medium text-foreground shadow-sm',
      )}
    >
      {children}
    </button>
  )
}
