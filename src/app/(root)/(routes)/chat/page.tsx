import { FunctionComponent, Suspense } from 'react'
import { ChatRoomList } from './components/chat-room-list'

const Page: FunctionComponent = () => {
  return (
    <div className="min-h-page bg-dm-bg text-dm-text">
      <div className="flex items-center border-b border-dm-line px-4 py-3.5">
        <h1 className="font-dm-display text-[20px] italic font-bold text-dm-text">
          채팅
        </h1>
      </div>
      <Suspense
        fallback={
          <div className="flex h-[40vh] items-center justify-center font-dm-mono text-[12px] text-dm-text-faint">
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
