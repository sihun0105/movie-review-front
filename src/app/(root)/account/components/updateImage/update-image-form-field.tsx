import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { ChangeEvent, FunctionComponent } from 'react'
import { useUpdateImageFormContext } from './update-image-form-context'
import Image from 'next/image'
interface UpdateIMageFormFieldProps {
  setFile: (file: File) => void
  fileInputRef: React.RefObject<HTMLInputElement>
  loading: boolean
  imageUrl: string | null
  currentImage: string
}

const UpdateImageFormField: FunctionComponent<UpdateIMageFormFieldProps> = ({
  setFile,
  fileInputRef,
  loading,
  imageUrl,
  currentImage,
}) => {
  const { form } = useUpdateImageFormContext()

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFile(file)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <FormField
      control={form.control}
      name="file"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <section className="relative">
              <input
                ref={fileInputRef}
                onChange={handleProfileImageChange}
                type="file"
                accept="image/*,image/heic"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="h-full w-full"
              >
                <div className="flex items-center justify-center">
                  {loading ? (
                    <p>로딩중...</p>
                  ) : imageUrl ? (
                    <div className="h-20 w-20">
                      <Image
                        src={imageUrl}
                        width={80}
                        height={80}
                        alt="image"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="h-20 w-20">
                      <Image
                        src={currentImage}
                        alt="Image"
                        width={80}
                        height={80}
                      />
                    </div>
                  )}
                </div>
              </button>
            </section>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default UpdateImageFormField
