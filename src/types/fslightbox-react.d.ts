declare module 'fslightbox-react' {
  import type { ComponentType } from 'react'

  interface FsLightboxProps {
    toggler: boolean
    sources: string[]
    slide?: number
    type?: 'image' | 'video' | 'youtube'
    customAttributes?: Array<Record<string, unknown>>
    onOpen?: () => void
    onClose?: () => void
  }

  const FsLightbox: ComponentType<FsLightboxProps>
  export default FsLightbox
}
