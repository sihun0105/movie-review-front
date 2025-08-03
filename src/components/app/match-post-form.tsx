'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import Box from '@/components/ui/box'
import { CreateMatchPostRequest } from '@/lib/type'

interface MatchPostFormProps {
  onSubmit: (_data: CreateMatchPostRequest) => Promise<void>
  onCancel: () => void
  initialData?: Partial<CreateMatchPostRequest>
}

export const MatchPostForm = ({
  onSubmit,
  onCancel,
  initialData,
}: MatchPostFormProps) => {
  const [formData, setFormData] = useState<CreateMatchPostRequest>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    movieTitle: initialData?.movieTitle || '',
    theaterName: initialData?.theaterName || '',
    showTime: initialData?.showTime || '',
    maxParticipants: initialData?.maxParticipants || 2,
    location: initialData?.location || '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await onSubmit(formData)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (
    field: keyof CreateMatchPostRequest,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Box className="rounded-lg border p-6">
      <h2 className="mb-6 text-xl font-semibold">영화 메이트 모집</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="모집 글 제목을 입력하세요"
            required
          />
        </div>

        <div>
          <Label htmlFor="content">내용</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            placeholder="모집 내용을 입력하세요"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="movieTitle">영화 제목</Label>
            <Input
              id="movieTitle"
              value={formData.movieTitle}
              onChange={(e) => handleChange('movieTitle', e.target.value)}
              placeholder="영화 제목"
              required
            />
          </div>

          <div>
            <Label htmlFor="theaterName">영화관</Label>
            <Input
              id="theaterName"
              value={formData.theaterName}
              onChange={(e) => handleChange('theaterName', e.target.value)}
              placeholder="영화관 이름"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="showTime">상영 시간</Label>
            <Input
              id="showTime"
              type="datetime-local"
              value={formData.showTime}
              onChange={(e) => handleChange('showTime', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="maxParticipants">최대 인원</Label>
            <Input
              id="maxParticipants"
              type="number"
              min="2"
              max="10"
              value={formData.maxParticipants}
              onChange={(e) =>
                handleChange('maxParticipants', parseInt(e.target.value))
              }
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="location">위치</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="영화관 위치 (예: 강남구, 홍대 등)"
            required
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            취소
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '등록 중...' : '등록하기'}
          </Button>
        </div>
      </form>
    </Box>
  )
}
