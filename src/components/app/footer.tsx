import { FunctionComponent } from 'react'
import { Mail, Github } from 'lucide-react'
interface FooterProps {}
const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <section>
      <div className="mb-[15px] flex flex-col items-center space-y-4 text-xs font-normal text-app-gray-007">
        <a href="mailto:tlgns14@nate.com" className="flex flex-row space-x-2">
          <Mail />
          <p>email :tlgns14@nate.com</p>
        </a>
        <a
          href="https://github.com/sihun0105"
          target="_blank"
          className="flex flex-row space-x-2"
        >
          <Github />
          <p>github : https://github.com/sihun0105</p>
        </a>
      </div>
    </section>
  )
}

export default Footer
