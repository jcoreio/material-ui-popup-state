import { SyntheticEvent } from 'react'

export type Variant = 'popover' | 'popper'

export type PopupState = {
  open: (eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement | null) => void
  close: () => void
  toggle: (eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement | null) => void
  onMouseLeave: (event: SyntheticEvent<any>) => void
  setOpen: (
    open: boolean,
    eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement
  ) => void
  isOpen: boolean
  anchorEl: HTMLElement | undefined
  setAnchorEl: (anchorEl: HTMLElement) => any
  setAnchorElUsed: boolean
  disableAutoFocus: boolean
  popupId: string | undefined
  variant: Variant
  _childPopupState: PopupState | undefined
  _setChildPopupState: (popupState: PopupState | null | undefined) => void
}

export type CoreState = {
  isOpen: boolean
  setAnchorElUsed: boolean
  anchorEl: HTMLElement | undefined
  hovered: boolean
  _childPopupState: PopupState | undefined
  _deferNextOpen: boolean
  _deferNextClose: boolean
}

export const initCoreState: CoreState

export function createPopupState(options: {
  state: CoreState
  setState: (state: Partial<CoreState>) => any
  popupId: string | undefined
  variant: Variant
  parentPopupState?: PopupState | null
  disableAutoFocus?: boolean | null
}): PopupState

/**
 * Creates a ref that sets the anchorEl for the popup.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function anchorRef<T = HTMLElement>(
  popupState: PopupState
): (popupState: T | undefined) => void

/**
 * Creates props for a component that opens the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindTrigger(popupState: PopupState): {
  'aria-controls'?: string | undefined
  'aria-describedby'?: string | undefined
  'aria-haspopup': true | undefined
  onClick: (event: SyntheticEvent<any>) => void
}

/**
 * Creates props for a component that toggles the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindToggle(popupState: PopupState): {
  'aria-controls'?: string
  'aria-describedby'?: string
  'aria-haspopup': true | undefined
  onClick: (event: SyntheticEvent<any>) => void
}

/**
 * Creates props for a component that opens the popup on its contextmenu event (right click).
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindContextMenu(popupState: PopupState): {
  'aria-controls'?: string | undefined
  'aria-describedby'?: string | undefined
  'aria-haspopup': true | undefined
  onContextMenu: (event: SyntheticEvent<any>) => void
}

/**
 * Creates props for a component that opens the popup while hovered.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindHover(popupState: PopupState): {
  'aria-controls'?: string
  'aria-describedby'?: string
  'aria-haspopup': true | undefined
  onMouseEnter: (event: SyntheticEvent<any>) => any
  onMouseLeave: (event: SyntheticEvent<any>) => any
}

/**
 * Creates props for a component that opens the popup while focused.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindFocus(popupState: PopupState): {
  'aria-controls'?: string
  'aria-describedby'?: string
  'aria-haspopup': true | undefined
  onFocus: (event: SyntheticEvent<any>) => any
  onBlur: (event: SyntheticEvent<any>) => any
}

/**
 * Creates props for a `Popover` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindPopover(popupState: PopupState): {
  id: string | undefined
  anchorEl: HTMLElement | undefined
  open: boolean
  onClose: () => void
  onMouseLeave: (event: SyntheticEvent<any>) => void
  disableAutoFocus?: boolean
  disableEnforceFocus?: boolean
  disableRestoreFocus?: boolean
}

/**
 * Creates props for a `Menu` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindMenu(popupState: PopupState): {
  id: string | undefined
  anchorEl: HTMLElement | undefined
  open: boolean
  onClose: () => void
  onMouseLeave: (event: SyntheticEvent<any>) => void
  autoFocus?: boolean
  disableAutoFocusItem?: boolean
  disableAutoFocus?: boolean
  disableEnforceFocus?: boolean
  disableRestoreFocus?: boolean
}

/**
 * Creates props for a `Popper` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindPopper(popupState: PopupState): {
  id: string | undefined
  anchorEl: HTMLElement | undefined
  open: boolean
  onMouseLeave: (event: SyntheticEvent<any>) => void
}
