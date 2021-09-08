import { Ref, CSSProperties } from 'react'
import { PropInjector } from '@mui/types'

export const hoverWorkaround: PropInjector<{
  ref: Ref<any>
  style: CSSProperties
  PaperProps: {
    style: CSSProperties
  }
}>
