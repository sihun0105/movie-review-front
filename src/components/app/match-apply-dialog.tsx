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
      <AlertDialogContent className="border border-border bg-card text-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            매치 신청
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            &quot;{matchTitle}&quot; 에 함께 영화보러 가기를 신청합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-2">
          <Label
            htmlFor="message"
            className="font-mono text-[10px] uppercase tracking-[0.5px] text-muted-foreground"
          >
            신청 메시지
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="자기소개나 영화에 대한 이야기를 간단히 남겨주세요."
            rows={4}
            className="mt-2 border border-border bg-secondary text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onClose}
            className="border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            취소
          </AlertDialogCancel>
          <Button
            onClick={handleApply}
            disabled={isLoading}
            className="border border-primary bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? '신청 중...' : '🎟 신청하기'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
