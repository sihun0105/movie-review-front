import { FunctionComponent } from 'react'
import { Button } from '@/components/ui/button'

interface MatchHeaderSectionProps {
  onCreateClick: () => void
}

const MatchHeaderSection: FunctionComponent<MatchHeaderSectionProps> = ({
  onCreateClick,
}) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="mb-2 text-3xl font-bold">영화 메이트 찾기</h1>
        <p className="text-gray-600">함께 영화를 볼 사람을 찾아보세요!</p>
      </div>
      <Button onClick={onCreateClick}>매치 등록하기</Button>
    </div>
  )
}

export { MatchHeaderSection }
