import { Ref, CSSProperties } from 'react'
import { PropInjector } from '@material-ui/types'

export const hoverWorkaround: PropInjector<{
  ref: Ref<any>
  style: CSSProperties
  PaperProps: {
    style: CSSProperties
  }
}>
