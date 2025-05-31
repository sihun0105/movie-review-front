import { FunctionComponent } from 'react'
import { Mail, Github } from 'lucide-react'
import { cn } from '@/lib/utils'
interface FooterProps {
  className?: string
}

const Footer: FunctionComponent<FooterProps> = ({ className }) => {
  return (
    <footer
      className={cn(
        'footer bottom-0 flex justify-between p-10 text-app-gray-007',
        className,
      )}
    >
      <aside>
        <p>© 2024 Sihun.</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="mailto:tlgns14@nate.com" className="flex flex-row space-x-2">
            <Mail />
          </a>
        </div>
      </nav>
    </footer>
  )
}

export default Footer
