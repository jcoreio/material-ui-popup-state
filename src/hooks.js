// @flow

import { useState } from 'react'

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
  const setState = nextState => _setState({ ...state, ...nextState })

  return createPopupState({
    state,
    setState,
    parentPopupState,
    popupId,
    variant,
  })
}
