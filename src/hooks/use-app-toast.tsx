import { useToast } from '@/hooks/use-toast'

const useAppToast = () => {
  const { toast } = useToast()
  const showToast = (message: string, duration = 1000) => {
    const { dismiss } = toast({
      title: message,
    })
    setTimeout(() => {
      dismiss()
    }, duration)
  }

  return { showToast }
}

export { useAppToast }
