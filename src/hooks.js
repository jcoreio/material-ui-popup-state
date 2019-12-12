// @flow
/* eslint-env browser */

import { useState, useRef, useEffect } from 'react'

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
  bindToggle,
  bindHover,
  bindMenu,
  bindPopover,
  bindPopper,
  type Variant,
  type PopupState,
} from './core'

export {
  anchorRef,
  bindTrigger,
  bindToggle,
  bindHover,
  bindMenu,
  bindPopover,
  bindPopper,
}
export type { Variant, PopupState }

export function usePopupState({
  parentPopupState,
  popupId,
  variant,
}: {
  parentPopupState?: ?PopupState,
  popupId: ?string,
  variant: Variant,
}): PopupState {
  const [state, setState] = useState(initCoreState)
  const isMounted = useRef(true)
  useEffect(
    () => () => {
      isMounted.current = false
    },
    []
  )
  useEffect(() => {
    if (popupId && typeof document === 'object') {
      const popup = document.getElementById(popupId)
      if (popup) popup.focus()
    }
  }, [popupId, state.anchorEl])

  return createPopupState({
    state,
    setState,
    parentPopupState,
    popupId,
    variant,
  })
}
