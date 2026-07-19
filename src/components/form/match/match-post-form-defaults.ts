import { CreateMatchPostRequest } from '@/lib/type'

const baseDefaults: CreateMatchPostRequest = {
  title: '자동 생성',
  content: '',
  movieTitle: '',
  theaterName: '상영관 미정',
  showTime: '',
  maxParticipants: 1,
  location: '',
}

export function getMatchPostFormDefaults(
  initialData?: Partial<CreateMatchPostRequest>,
): CreateMatchPostRequest {
  return { ...baseDefaults, ...initialData }
}
