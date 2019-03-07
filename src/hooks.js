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
  bindTrigger,
  bindToggle,
  bindHover,
  bindMenu,
  bindPopover,
  bindPopper,
  type Variant,
  type PopupState,
  type CoreState,
} from './core'

export { bindTrigger, bindToggle, bindHover, bindMenu, bindPopover, bindPopper }
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
  const [state, _setState] = useState(initCoreState)
  const isMounted = useRef(true)
  useEffect(
    () => () => {
      isMounted.current = false
    },
    []
  )
  useEffect(
    () => {
      if (popupId && typeof document === 'object') {
        const popup = document.getElementById(popupId)
        if (popup) popup.focus()
      }
    },
    [popupId, state.anchorEl]
  )
  const setState = (nextState: $Shape<CoreState>) => {
    if (isMounted.current) _setState({ ...state, ...nextState })
  }

  return createPopupState({
    state,
    setState,
    parentPopupState,
    popupId,
    variant,
  })
}
