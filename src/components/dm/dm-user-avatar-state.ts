export type AvatarImageStatus = 'idle' | 'loading' | 'loaded' | 'error'

export interface AvatarImageState {
  src: string
  status: AvatarImageStatus
}

export function isAvatarDataPending(
  isLoading: boolean | undefined,
  name: string | null | undefined,
  image: string | null | undefined,
) {
  return isLoading ?? (name === undefined && image === undefined)
}

export function isAvatarImagePending(
  imageSrc: string,
  imageState: AvatarImageState,
) {
  return (
    imageState.src !== imageSrc ||
    imageState.status === 'idle' ||
    imageState.status === 'loading'
  )
}
