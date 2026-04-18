import { FunctionComponent } from 'react'
import { Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
interface FooterProps {
  className?: string
}

const Footer: FunctionComponent<FooterProps> = ({ className }) => {
  return (
    <footer
      className={cn(
        'footer bottom-0 flex flex-col justify-between gap-4 p-10 text-app-gray-007',
        className,
      )}
    >
      <div className="flex justify-between">
        <aside>
          <div className="text-sm">
            <p className="mb-2 font-semibold">
              영화 뭐함? 영화뭐함에서 찾으세요!
            </p>
            <p className="text-xs">최신 영화 추천, 리뷰, 평점을 한눈에</p>
          </div>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a
              href="mailto:tlgns14@nate.com"
              className="flex flex-row space-x-2"
            >
              <Mail />
            </a>
          </div>
        </nav>
      </div>
      <div className="text-center text-xs">
        <p>© 2024 영화뭐함 - 영화 뭐함? 고민 끝!</p>
      </div>
    </footer>
  )
}

export default Footer
