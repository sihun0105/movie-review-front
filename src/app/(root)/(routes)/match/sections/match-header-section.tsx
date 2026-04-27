import { FunctionComponent } from 'react'
import Link from 'next/link'

const MatchHeaderSection: FunctionComponent = () => {
  return (
    <div className="flex items-center border-b border-dm-line px-4 py-3.5">
      <h1 className="break-keep whitespace-nowrap font-dm-display text-[20px] italic font-bold text-dm-text">
        같이 볼 사람
      </h1>
      <Link
        href="/match/new"
        className="ml-auto inline-flex items-center gap-1 whitespace-nowrap bg-dm-red px-2.5 py-1.5 text-[11px] font-semibold text-white"
      >
        ＋ 쓰기
      </Link>
    </div>
  )
}

export { MatchHeaderSection }
