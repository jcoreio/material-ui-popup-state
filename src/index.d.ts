/* eslint-env browser */

import * as React from 'react'

import {
  anchorRef,
  bindTrigger,
  bindContextMenu,
  bindToggle,
  bindHover,
  bindFocus,
  bindMenu,
  bindPopover,
  bindPopper,
  Variant,
  PopupState as InjectedProps,
} from './core'

export {
  anchorRef,
  bindTrigger,
  bindContextMenu,
  bindToggle,
  bindHover,
  bindFocus,
  bindMenu,
  bindPopover,
  bindPopper,
  Variant,
  InjectedProps,
}

export type Props = {
  popupId?: string
  children: (props: InjectedProps) => React.ReactNode | null | undefined
  variant: Variant
  parentPopupState?: InjectedProps | null | undefined
  disableAutoFocus?: boolean | null
}

declare const PopupState: React.ComponentType<Props>
export default PopupState
