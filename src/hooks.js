// @flow

import * as React from 'react'

if (!React.useState) {
  throw new Error(
    `React.useState (added in 16.8.0) must be defined to use the hooks API`
  )
}

export type Variant = 'popover' | 'popper'

export type PopupState = {
  open: (eventOrAnchorEl: SyntheticEvent<any> | HTMLElement) => void,
  close: () => void,
  toggle: (eventOrAnchorEl: SyntheticEvent<any> | HTMLElement) => void,
  setOpen: (
    open: boolean,
    eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement
  ) => void,
  isOpen: boolean,
  anchorEl: ?HTMLElement,
  popupId: ?string,
  variant: Variant,
}

let eventOrAnchorElWarned: boolean = false

export function usePopupState({
  popupId,
  variant,
}: {
  popupId: ?string,
  variant: Variant,
}): PopupState {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const toggle = (eventOrAnchorEl: SyntheticEvent<any> | HTMLElement) => {
    if (anchorEl) close()
    else open(eventOrAnchorEl)
  }

  const open = (eventOrAnchorEl: SyntheticEvent<any> | HTMLElement) => {
    if (!eventOrAnchorElWarned && !eventOrAnchorEl) {
      eventOrAnchorElWarned = true
      console.error('eventOrAnchorEl should be defined') // eslint-disable-line no-console
    }
    setAnchorEl(
      eventOrAnchorEl && eventOrAnchorEl.currentTarget
        ? (eventOrAnchorEl.currentTarget: any)
        : (eventOrAnchorEl: any)
    )
  }

  const close = () => setAnchorEl(null)

  const setOpen = (
    nextOpen: boolean,
    eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement
  ) => {
    if (nextOpen) {
      if (!eventOrAnchorEl) {
        throw new Error('eventOrAnchorEl must be defined when opening')
      }
      open(eventOrAnchorEl)
    } else close()
  }

  return {
    anchorEl,
    setAnchorEl,
    popupId,
    variant,
    isOpen: anchorEl != null,
    open,
    close,
    toggle,
    setOpen,
  }
}

/**
 * Creates props for a component that opens the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindTrigger({
  isOpen,
  open,
  popupId,
  variant,
}: PopupState): {
  'aria-owns'?: ?string,
  'aria-describedby'?: ?string,
  'aria-haspopup': true,
  onClick: (event: SyntheticEvent<any>) => void,
} {
  return {
    [variant === 'popover' ? 'aria-owns' : 'aria-describedby']: isOpen
      ? popupId
      : null,
    'aria-haspopup': true,
    onClick: open,
  }
}

/**
 * Creates props for a component that toggles the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindToggle({
  isOpen,
  toggle,
  popupId,
  variant,
}: PopupState): {
  'aria-owns'?: ?string,
  'aria-describedby'?: ?string,
  'aria-haspopup': true,
  onClick: (event: SyntheticEvent<any>) => void,
} {
  return {
    [variant === 'popover' ? 'aria-owns' : 'aria-describedby']: isOpen
      ? popupId
      : null,
    'aria-haspopup': true,
    onClick: toggle,
  }
}

/**
 * Creates props for a `Popover` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindPopover({
  isOpen,
  anchorEl,
  close,
  popupId,
}: PopupState): {
  id: ?string,
  anchorEl: ?HTMLElement,
  open: boolean,
  onClose: () => void,
} {
  return {
    id: popupId,
    anchorEl,
    open: isOpen,
    onClose: close,
  }
}

/**
 * Creates props for a `Menu` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export const bindMenu = bindPopover

/**
 * Creates props for a `Popper` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindPopper({
  isOpen,
  anchorEl,
  popupId,
}: PopupState): {
  id: ?string,
  anchorEl: ?HTMLElement,
  open: boolean,
} {
  return {
    id: popupId,
    anchorEl,
    open: isOpen,
  }
}
