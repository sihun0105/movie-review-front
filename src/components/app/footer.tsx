import { FunctionComponent } from 'react'
interface FooterProps {}
const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <section>
      <div className="mb-[15px] text-center text-xs font-normal text-app-gray-004">
        <p>email : tlgns14@nate.com</p>
        <p>github : https://github.com/sihun0105</p>
      </div>
    </section>
  )
}

export default Footer
