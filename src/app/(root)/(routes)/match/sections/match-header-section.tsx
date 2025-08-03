import { FunctionComponent } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const MatchHeaderSection: FunctionComponent = () => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="mb-2 text-3xl font-bold">영화 메이트 찾기</h1>
        <p className="text-gray-600">함께 영화를 볼 사람을 찾아보세요!</p>
      </div>
      <Link href="/match/new">
        <Button>매치 등록하기</Button>
      </Link>
    </div>
  )
}

export { MatchHeaderSection }
