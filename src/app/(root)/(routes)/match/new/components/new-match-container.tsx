'use client'

import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { CreateMatchPostRequest } from '@/lib/type'
import { useCreateMatch } from '../../hooks'
import { MatchFormSection } from '../../sections/match-form-section'

const NewMatchContainer = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { createMatch } = useCreateMatch()

  // 매치 생성
  const handleCreateMatch = async (data: CreateMatchPostRequest) => {
    try {
      await createMatch(data)
      toast({
        title: '성공',
        description: '매치가 성공적으로 등록되었습니다.',
      })
      router.push('/match')
    } catch (error) {
      toast({
        title: '오류',
        description: '매치 등록에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  const handleCancel = () => {
    router.push('/match')
  }

  return (
    <MatchFormSection onSubmit={handleCreateMatch} onCancel={handleCancel} />
  )
}

export { NewMatchContainer }
