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
  PopupState,
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
  PopupState,
}

export function usePopupState(options: {
  parentPopupState?: PopupState | null | undefined
  popupId: string | null | undefined
  variant: Variant
  disableAutoFocus?: boolean | null
}): PopupState
