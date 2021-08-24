// @flow
/* eslint-env browser */

import { useState, useEffect, useMemo } from 'react'

if (!useState) {
  throw new Error(
    `React.useState (added in 16.8.0) must be defined to use the hooks API`
  )
}

import {
  initCoreState,
  createPopupState,
  anchorRef,
  bindTrigger,
  bindContextMenu,
  bindToggle,
  bindHover,
  bindFocus,
  bindMenu,
  bindPopover,
  bindPopper,
  type Variant,
  type PopupState,
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
}
export type { Variant, PopupState }

export function usePopupState({
  parentPopupState,
  popupId,
  variant,
  disableAutoFocus,
}: {|
  parentPopupState?: ?PopupState,
  popupId: ?string,
  variant: Variant,
  disableAutoFocus?: ?boolean,
|}): PopupState {
  const [state, setState] = useState(initCoreState)
  useEffect(() => {
    if (!disableAutoFocus && popupId && typeof document === 'object') {
      const popup = document.getElementById(popupId)
      if (popup) popup.focus()
    }
  }, [popupId, state.anchorEl])

  return useMemo(
    () =>
      createPopupState({
        state,
        setState,
        parentPopupState,
        popupId,
        variant,
        disableAutoFocus,
      }),
    [state, setState, parentPopupState, popupId, variant, disableAutoFocus]
  )
}
