import { Ref, CSSProperties } from 'react'
import { PropInjector } from '@material-ui/types'
import { Classes } from '@material-ui/styles/mergeClasses/mergeClasses'
import { ClassNameMap } from '@material-ui/styles/withStyles'

export const hoverWorkaround: PropInjector<{
  ref: Ref<any>
  classes: ClassNameMap<'_modalRoot' | 'paper'>
  className: string
  style: CSSProperties
}>
