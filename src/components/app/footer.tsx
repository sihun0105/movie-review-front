import { FunctionComponent } from 'react'
import { Mail, Github } from 'lucide-react'
interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = ({}) => {
  return (
    <footer className="footer bottom-0 flex justify-between p-10 text-app-gray-007">
      <aside>
        <p>© 2024 Sihun.</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="mailto:tlgns14@nate.com" className="flex flex-row space-x-2">
            <Mail />
          </a>
          {/* <a
            href="https://github.com/sihun0105"
            target="_blank"
            className="flex flex-row space-x-2"
          >
            <Github />
          </a> */}
        </div>
      </nav>
    </footer>
  )
}

export default Footer
