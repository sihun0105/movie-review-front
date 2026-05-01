import { FunctionComponent } from 'react'

const Page: FunctionComponent = () => {
  return (
    <div className="flex min-h-page flex-col items-center justify-center bg-dm-bg">
      <div className="mb-3 font-dm-display text-[32px] italic text-dm-text">
        Chat.
      </div>
      <div className="mb-1 font-dm-mono text-[11px] uppercase tracking-[2px] text-dm-amber">
        Coming Soon
      </div>
      <div className="font-dm-mono text-[11px] text-dm-text-faint">
        매칭 후 채팅은{' '}
        <span className="text-dm-text">매칭 상세 페이지</span>에서 이용할 수
        있어요.
      </div>
    </div>
  )
}

export default Page
