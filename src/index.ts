import React from 'react'

import {
  usePopupState,
  anchorRef,
  bindTrigger,
  bindContextMenu,
  bindToggle,
  bindHover,
  bindFocus,
  bindMenu,
  bindPopover,
  bindPopper,
  bindDialog,
  type Variant,
  type PopupState as InjectedProps,
} from './hooks'

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
  bindDialog,
  type Variant,
  type InjectedProps,
}

export type Props = {
  popupId?: string
  children: (props: InjectedProps) => any
  variant: Variant
  parentPopupState?: InjectedProps | null | undefined
  disableAutoFocus?: boolean | null
}

export default function PopupState({
  children,
  popupId,
  variant,
  parentPopupState,
  disableAutoFocus,
}: Props): any {
  const popupState = usePopupState({
    popupId,
    variant,
    parentPopupState,
    disableAutoFocus,
  })
  const result = children(popupState)
  return result != null ? result : null
}
