import { SyntheticEvent, MouseEvent, TouchEvent, FocusEvent } from 'react'

export type Variant = 'popover' | 'popper' | 'dialog'

export type PopupState = {
  open: (eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement | null) => void
  close: () => void
  toggle: (eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement | null) => void
  onMouseLeave: (event: MouseEvent<any>) => void
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
  popupId?: string | null
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

type ControlAriaProps = {
  'aria-controls'?: string
  'aria-describedby'?: string
  'aria-haspopup'?: true
}

/**
 * Creates props for a component that opens the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindTrigger(popupState: PopupState): ControlAriaProps & {
  onClick: (event: MouseEvent<any>) => void
  onTouchStart: (event: TouchEvent<any>) => void
}

/**
 * Creates props for a component that toggles the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindToggle(popupState: PopupState): ControlAriaProps & {
  onClick: (event: MouseEvent<any>) => void
  onTouchStart: (event: TouchEvent<any>) => void
}

/**
 * Creates props for a component that opens the popup on its contextmenu event (right click).
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindContextMenu(popupState: PopupState): ControlAriaProps & {
  onContextMenu: (event: MouseEvent<any>) => void
}

/**
 * Creates props for a component that opens the popup while hovered.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindHover(popupState: PopupState): ControlAriaProps & {
  onTouchStart: (event: TouchEvent<any>) => void
  onMouseEnter: (event: MouseEvent<any>) => void
  onMouseLeave: (event: MouseEvent<any>) => void
}

/**
 * Creates props for a component that opens the popup while focused.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindFocus(popupState: PopupState): ControlAriaProps & {
  onFocus: (event: FocusEvent<any>) => void
  onBlur: (event: FocusEvent<any>) => void
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
  onMouseLeave: (event: MouseEvent<any>) => void
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
  onMouseLeave: (event: MouseEvent<any>) => void
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
  onMouseLeave: (event: MouseEvent<any>) => void
}

/**
 * Creates props for a `Dialog` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindDialog(popupState: PopupState): {
  open: boolean
  onClose: (event: SyntheticEvent<any>) => void
}
