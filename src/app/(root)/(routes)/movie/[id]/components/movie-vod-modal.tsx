import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ExternalLink, X } from 'lucide-react'
import { FunctionComponent } from 'react'
import { useVodModalContext } from '../hooks/use-vod-modal-context'

const MovieVodModal: FunctionComponent = () => {
  const { open, setOpen, src, title } = useVodModalContext()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-h-[92dvh] w-[calc(100vw-24px)] max-w-[960px] gap-0 overflow-hidden border border-white/10 bg-[#050505] p-0 text-white shadow-2xl sm:rounded-lg">
        <AlertDialogCancel
          aria-label="영상 닫기"
          className="absolute right-3 top-3 z-10 mt-0 h-10 w-10 rounded-full border-white/15 bg-black/70 p-0 text-white hover:bg-white hover:text-black"
        >
          <X className="mx-auto h-5 w-5" aria-hidden />
        </AlertDialogCancel>

        <AlertDialogHeader className="space-y-1 px-4 pb-3 pt-4 text-left sm:px-5 sm:pt-5">
          <AlertDialogTitle className="pr-12 text-base font-semibold text-white">
            관련 영상
          </AlertDialogTitle>
          <AlertDialogDescription className="line-clamp-1 text-xs text-white/60">
            {title
              ? `${title} 예고편과 관련 영상을 확인합니다.`
              : '영화 관련 영상을 확인합니다.'}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="bg-black px-3 pb-3 sm:px-5 sm:pb-5">
          <div className="aspect-video w-full overflow-hidden rounded-md border border-white/10 bg-zinc-950">
            {src ? (
              <iframe
                src={src}
                title={title ? `${title} 관련 영상` : '영화 관련 영상'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm text-white/65">
                표시할 영상 정보를 불러오지 못했습니다.
              </div>
            )}
          </div>

          {src && (
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white"
            >
              새 창에서 열기
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default MovieVodModal
