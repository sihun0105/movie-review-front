import { FunctionComponent } from 'react'
import { UpdateImageFormProvider } from './updateImage/update-image-form-context'
import UpdateImageForm from './updateImage/update-image-form'
import { UpdateNicknameFormProvider } from './updateNickname/update-nickname-form-context'
import UpdateNicknameForm from './updateNickname/update-nickname-form'
interface UpdateProfileProps {}

const UpdateProfile: FunctionComponent<UpdateProfileProps> = ({}) => {
  return (
    <>
      <UpdateImageFormProvider>
        <UpdateImageForm />
      </UpdateImageFormProvider>
      <UpdateNicknameFormProvider>
        <UpdateNicknameForm />
      </UpdateNicknameFormProvider>
    </>
  )
}

export default UpdateProfile
