import { FunctionComponent } from 'react'
import { MyMatchesContainer } from './components/my-matches-container'

const Page: FunctionComponent = () => {
  return (
    <div className="min-h-page bg-dm-bg pb-[100px] text-dm-text">
      <div className="flex items-center border-b border-dm-line px-4 py-3.5">
        <h1 className="font-dm-display text-[20px] italic font-bold text-dm-text">
          내 매칭
        </h1>
      </div>
      <MyMatchesContainer />
    </div>
  )
}

export default Page
