'use client'
import { FunctionComponent } from 'react'
import { Home, MessageCircle, SquareEqual, UserCircleIcon } from 'lucide-react'
import { useMessageModalContext } from '@/hooks/use-message-modal-context'

interface BottomNavProps {}

const BottomNav: FunctionComponent<BottomNavProps> = () => {
  const { open, setOpen } = useMessageModalContext()
  return (
    <footer className="border-app-gray-200 fixed bottom-0 z-50 flex w-full max-w-[460px] border-t bg-white ">
      <nav className="w-full max-w-[460px]">
        <ul className="grid grid-cols-4 text-app-gray-007">
          <li>
            <a
              href="/"
              className="flex flex-col items-center justify-center py-2"
            >
              <Home className="h-6 w-6" />
              <span className="mt-1 text-xs font-semibold">홈</span>
            </a>
          </li>
          <li>
            <a
              href="/articles"
              className="flex flex-col items-center justify-center py-2"
            >
              <SquareEqual className="h-6 w-6" />
              <span className="mt-1 text-xs font-semibold">게시판</span>
            </a>
          </li>
          <li>
            <a
              className="flex flex-col items-center justify-center py-2"
              onClick={() => setOpen(!open)}
            >
              <MessageCircle className="h-6 w-6" />
              <span className="mt-1 text-xs font-semibold">메시지</span>
            </a>
          </li>
          <li>
            <a
              href="/account"
              className="flex flex-col items-center justify-center py-2"
            >
              <UserCircleIcon className="h-6 w-6" />
              <span className="mt-1 text-xs font-semibold">유저</span>
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default BottomNav
