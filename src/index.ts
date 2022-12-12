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
  Variant,
  PopupState as InjectedProps,
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

export default function PopupState({
  children,
  popupId,
  variant,
  parentPopupState,
  disableAutoFocus,
}: Props): React.ReactNode | null {
  const popupState = usePopupState({
    popupId,
    variant,
    parentPopupState,
    disableAutoFocus,
  })
  const result = children(popupState)
  return result != null ? result : null
}
