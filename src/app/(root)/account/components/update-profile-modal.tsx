'use client'
import AppFormDialogue from '@/components/app/app-form-dialogue'
import { FunctionComponent } from 'react'
import { ChangeNameForm } from './update-profile-form'
import { useUpdateProfileModalContext } from '../hooks/use-update-profile-modal-context'
interface ChangeNameModalProps {}

const UpdateProfileModal: FunctionComponent<ChangeNameModalProps> = () => {
  const { open, setOpen } = useUpdateProfileModalContext()

  return (
    <AppFormDialogue
      title={
        <div className=" mt-3 flex h-[42px] w-full items-center justify-center text-center">
          <p>프로필 편집</p>
        </div>
      }
      open={open}
      setOpen={(boolean) => {
        setOpen(boolean)
      }}
      render={<ChangeNameForm />}
    />
  )
}

export { UpdateProfileModal }
