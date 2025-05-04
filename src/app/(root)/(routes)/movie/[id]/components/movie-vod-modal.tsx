import AppFormDialogue from '@/components/app/app-form-dialogue'
import { FunctionComponent } from 'react'
import { useVodModalContext } from '../hooks/use-vod-modal-context'

const MovieVodModal: FunctionComponent = () => {
  const { open, setOpen, src, title } = useVodModalContext()

  return (
    <AppFormDialogue
      title={<p>{title}</p>}
      open={open}
      setOpen={setOpen}
      render={
        <div className="flex h-full w-full items-center justify-center p-4">
          <iframe
            src={src}
            allowFullScreen
            className="h-[560px] max-h-[90vh] w-[880px] max-w-full rounded shadow-lg"
          />
        </div>
      }
    />
  )
}

export default MovieVodModal
