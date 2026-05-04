import { FunctionComponent, Suspense } from 'react'
import { ChatRoomList } from './components/chat-room-list'

const Page: FunctionComponent = () => {
  return (
    <div className="min-h-page bg-background text-foreground">
      <div className="flex items-center border-b border-border px-4 py-3.5">
        <h1 className="font-dm-display text-[20px] italic font-bold text-foreground">
          채팅
        </h1>
      </div>
      <Suspense
        fallback={
          <div className="flex h-[40vh] items-center justify-center font-mono text-[12px] text-muted-foreground">
            loading...
          </div>
        }
      >
        <ChatRoomList />
      </Suspense>
    </div>
  )
}

export default Page
