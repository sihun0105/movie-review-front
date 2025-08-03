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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>매치 신청</AlertDialogTitle>
          <AlertDialogDescription>
            &quot;{matchTitle}&quot;에 함께 영화보러 가기를 신청합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4">
          <Label htmlFor="message">신청 메시지</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="자기소개나 영화에 대한 이야기를 간단히 남겨주세요."
            rows={4}
            className="mt-2"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
          <Button onClick={handleApply} disabled={isLoading}>
            {isLoading ? '신청 중...' : '신청하기'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
