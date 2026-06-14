import { FunctionComponent, Suspense } from 'react'
import Link from 'next/link'
import { ChatRoomList } from './components/chat-room-list'

const Page: FunctionComponent = () => {
  return (
    <div className="min-h-page bg-background text-foreground">
      <div className="flex items-center border-b border-border px-4 py-3.5">
        <h1 className="font-dm-display text-[20px] font-bold italic text-foreground">
          채팅
        </h1>
      </div>
      <section className="border-b border-border px-4 py-4">
        <Link
          href="/chat/public"
          className="block rounded-md border border-border bg-secondary px-4 py-4 hover:border-primary"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-[16px] font-bold text-foreground">
                공개 채팅
              </h2>
              <p className="mt-1 truncate text-[12px] text-muted-foreground">
                지금 접속한 사람들과 이야기하기
              </p>
            </div>
            <span className="shrink-0 text-[18px]" aria-hidden="true">
              →
            </span>
          </div>
        </Link>
      </section>
      <div className="px-4 pt-4">
        <h2 className="text-[13px] font-semibold text-muted-foreground">
          내 매칭 채팅
        </h2>
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
