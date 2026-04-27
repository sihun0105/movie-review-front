'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'

interface MatchApplyDialogProps {
  isOpen: boolean
  onClose: () => void
  onApply: (_message: string) => Promise<void>
  matchTitle: string
}

export const MatchApplyDialog = ({
  isOpen,
  onClose,
  onApply,
  matchTitle,
}: MatchApplyDialogProps) => {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleApply = async () => {
    if (!message.trim()) {
      alert('신청 메시지를 입력해주세요.')
      return
    }

    setIsLoading(true)
    try {
      await onApply(message)
      setMessage('')
      onClose()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-none border border-dm-line-2 bg-dm-bg text-dm-text">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-dm-display italic text-dm-text">
            매치 신청
          </AlertDialogTitle>
          <AlertDialogDescription className="text-dm-text-muted">
            &quot;{matchTitle}&quot; 에 함께 영화보러 가기를 신청합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-2">
          <Label
            htmlFor="message"
            className="font-dm-mono text-[10px] uppercase tracking-[0.5px] text-dm-text-muted"
          >
            신청 메시지
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="자기소개나 영화에 대한 이야기를 간단히 남겨주세요."
            rows={4}
            className="mt-2 rounded-none border border-dm-line-2 bg-dm-surface text-[13px] text-dm-text placeholder:text-dm-text-faint focus-visible:ring-1 focus-visible:ring-dm-amber focus-visible:ring-offset-0"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onClose}
            className="rounded-none border-dm-line-2 bg-transparent text-dm-text-muted hover:bg-dm-surface hover:text-dm-text"
          >
            취소
          </AlertDialogCancel>
          <Button
            onClick={handleApply}
            disabled={isLoading}
            className="rounded-none border border-dm-red bg-dm-red font-semibold text-white hover:bg-dm-red-deep"
          >
            {isLoading ? '신청 중...' : '🎟 신청하기'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
