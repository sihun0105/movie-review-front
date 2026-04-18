'use client'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { FunctionComponent, PropsWithChildren } from 'react'
import IconCloseCircle from '@/components/app/icons/icon-close-circle'
interface AppFormDialogueProps extends PropsWithChildren {
  render: React.ReactNode
  renderTrigger?: React.ReactNode
  title: React.ReactNode
  open: boolean
  setOpen: (_: boolean) => void
  className?: string
}

const AppFormDialogue: FunctionComponent<AppFormDialogueProps> = ({
  render,
  title,
  renderTrigger,
  open,
  setOpen,
  className,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{renderTrigger}</AlertDialogTrigger>
      <AlertDialogContent className={className}>
        <AlertDialogCancel asChild>
          <div className="absolute right-[20px] top-[20px]">
            <IconCloseCircle />
          </div>
        </AlertDialogCancel>
        <AlertDialogHeader className="mt-[24px]">
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="mt-6">{render}</div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AppFormDialogue
