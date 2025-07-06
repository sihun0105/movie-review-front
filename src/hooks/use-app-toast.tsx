import { toast } from 'sonner'

const useAppToast = () => {
  const showToast = (message: string, duration = 1000) => {
    const toastId = toast(message)
    setTimeout(() => {
      toast.dismiss(toastId)
    }, duration)
  }

  return { showToast }
}

export { useAppToast }
