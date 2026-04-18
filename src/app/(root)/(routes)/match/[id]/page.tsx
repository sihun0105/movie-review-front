import { FunctionComponent } from 'react'
import { MatchDetailContainer } from './components/match-detail-container'

interface PageProps {
  params: { id: string }
}

const Page: FunctionComponent<PageProps> = ({ params: _params }) => {
  return <MatchDetailContainer />
}

export default Page
