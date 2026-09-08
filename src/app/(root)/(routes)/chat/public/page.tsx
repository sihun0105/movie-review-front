import { PublicChatRoom } from './components/public-chat-room'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '공개채팅 | 볼래 영화 커뮤니티',
  description:
    '영화 감상과 추천을 나누는 볼래 공개채팅. 영화 좋아하는 사람들과 자유롭게 이야기하세요.',
  alternates: { canonical: 'https://bollae.kr/chat/public' },
  openGraph: {
    title: '공개채팅 | 볼래 영화 커뮤니티',
    description: '영화 감상과 추천을 나누는 볼래 공개채팅.',
    url: 'https://bollae.kr/chat/public',
    type: 'website',
  },
}

export default function Page() {
  return <PublicChatRoom />
}
