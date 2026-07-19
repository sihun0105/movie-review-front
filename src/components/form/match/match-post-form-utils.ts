import { CreateMatchPostRequest } from '@/lib/type'

export function buildMatchPayload(
  data: CreateMatchPostRequest,
): CreateMatchPostRequest {
  const movie = data.movieTitle.trim()
  const place = data.location.trim()
  const people = data.maxParticipants
  const description = data.content.trim()
  return {
    ...data,
    title: `${movie} 같이 볼 사람 구해요`,
    content:
      description || `${place}에서 ${people}명이 함께 볼 영화 약속입니다.`,
    theaterName: place,
  }
}

export function formatMatchDateTime(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
