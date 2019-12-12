import { useState, useRef, useEffect } from 'react'

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
  Variant,
  PopupState,
} from './core'

export {
  anchorRef,
  bindTrigger,
  bindToggle,
  bindHover,
  bindMenu,
  bindPopover,
  bindPopper,
  Variant,
  PopupState,
}

export function usePopupState(options: {
  parentPopupState?: PopupState | null | undefined
  popupId: string | null | undefined
  variant: Variant
}): PopupState
