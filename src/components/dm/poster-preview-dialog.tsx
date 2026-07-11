'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Maximize2, X } from 'lucide-react'
import type { ReactNode } from 'react'

interface PosterPreviewDialogProps {
  title: string
  imageUrl?: string
  children: ReactNode
}

export function PosterPreviewDialog({
  title,
  imageUrl,
  children,
}: PosterPreviewDialogProps) {
  if (!imageUrl) return <>{children}</>

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`${title} 포스터 크게 보기`}
          title="포스터 크게 보기"
          className="group relative block w-full cursor-zoom-in text-left"
        >
          {children}
          <span className="absolute bottom-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-white opacity-90 transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" aria-hidden />
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 outline-none sm:max-h-[calc(100dvh-4rem)] sm:max-w-[calc(100vw-4rem)]">
          <Dialog.Title className="sr-only">{title} 포스터</Dialog.Title>
          <Dialog.Description className="sr-only">
            {title} 포스터 확대 이미지
          </Dialog.Description>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={`${title} 포스터`}
            className="block max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] object-contain shadow-2xl sm:max-h-[calc(100dvh-4rem)] sm:max-w-[calc(100vw-4rem)]"
          />
          <Dialog.Close
            aria-label="포스터 닫기"
            className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-colors hover:bg-white hover:text-black"
          >
            <X className="h-5 w-5" aria-hidden />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
