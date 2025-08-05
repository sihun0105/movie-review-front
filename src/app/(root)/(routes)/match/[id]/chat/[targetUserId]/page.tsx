import { ChatContainer } from './components/chat-container'

interface PageProps {
  params: {
    id: string
    targetUserId: string
  }
}

const ChatPage = ({ params }: PageProps) => {
  return (
    <ChatContainer matchId={params.id} targetUserId={params.targetUserId} />
  )
}

export default ChatPage
