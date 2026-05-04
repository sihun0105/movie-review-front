import { FunctionComponent } from 'react'
import Link from 'next/link'

const MatchHeaderSection: FunctionComponent = () => {
  return (
    <div className="flex items-center border-b border-border px-4 py-3.5">
      <h1 className="text-[18px] font-bold tracking-tight text-foreground">
        같이 볼 사람
      </h1>
      <Link
        href="/match/new"
        className="ml-auto inline-flex h-8 items-center rounded-md bg-primary px-3 text-[13px] font-medium text-primary-foreground"
      >
        ＋ 만들기
      </Link>
    </div>
  )
}

export { MatchHeaderSection }
