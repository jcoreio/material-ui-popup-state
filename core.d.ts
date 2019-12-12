import { SyntheticEvent } from 'react'

export type Variant = 'popover' | 'popper'

export type PopupState = {
  open: (eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement) => void
  close: () => void
  toggle: (eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement) => void
  onMouseLeave: (event: SyntheticEvent<any>) => void
  setOpen: (
    open: boolean,
    eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement
  ) => void
  isOpen: boolean
  anchorEl: HTMLElement | null | undefined
  setAnchorEl: (anchorEl: HTMLElement) => any
  setAnchorElUsed: boolean
  popupId: string | null | undefined
  variant: Variant
  _childPopupState: PopupState | null | undefined
  _setChildPopupState: (popupState: PopupState | null | undefined) => void
}

export type CoreState = {
  isOpen: boolean
  setAnchorElUsed: boolean
  anchorEl: HTMLElement | null | undefined
  hovered: boolean
  _childPopupState: PopupState | null | undefined
}

export const initCoreState: CoreState

export function createPopupState(options: {
  state: CoreState
  setState: (state: Partial<CoreState>) => any
  popupId: string | null | undefined
  variant: Variant
  parentPopupState?: PopupState | null | undefined
}): PopupState

/**
 * Creates a ref that sets the anchorEl for the popup.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function anchorRef(
  popupState: PopupState
): (popupState: HTMLElement | null | undefined) => any

/**
 * Creates props for a component that opens the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindTrigger(
  popupState: PopupState
): {
  'aria-owns'?: string | null | undefined
  'aria-describedby'?: string | null | undefined
  'aria-haspopup': true | null | undefined
  onClick: (event: SyntheticEvent<any>) => void
}

/**
 * Creates props for a component that toggles the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindToggle(
  popupState: PopupState
): {
  'aria-owns'?: string | null | undefined
  'aria-describedby'?: string | null | undefined
  'aria-haspopup': true | null | undefined
  onClick: (event: SyntheticEvent<any>) => void
}

/**
 * Creates props for a component that opens the popup while hovered.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindHover(
  popupState: PopupState
): {
  'aria-owns'?: string | null | undefined
  'aria-describedby'?: string | null | undefined
  'aria-haspopup': true | null | undefined
  onMouseEnter: (event: SyntheticEvent<any>) => any
  onMouseLeave: (event: SyntheticEvent<any>) => any
}

/**
 * Creates props for a `Popover` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindPopover(
  popupState: PopupState
): {
  id: string | null | undefined
  anchorEl: HTMLElement | null | undefined
  open: boolean
  onClose: () => void
  onMouseLeave: (event: SyntheticEvent<any>) => void
}

/**
 * Creates props for a `Menu` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindMenu(
  popupState: PopupState
): {
  id: string | null | undefined
  anchorEl: HTMLElement | null | undefined
  open: boolean
  onClose: () => void
  onMouseLeave: (event: SyntheticEvent<any>) => void
}

/**
 * Creates props for a `Popper` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindPopper(
  popupState: PopupState
): {
  id: string | null | undefined
  anchorEl: HTMLElement | null | undefined
  open: boolean
}
