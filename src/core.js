// @flow
/* eslint-env browser */

import * as React from 'react'

export type Variant = 'popover' | 'popper'

export type PopupState = {
  open: (eventOrAnchorEl: SyntheticEvent<any> | HTMLElement) => void,
  close: () => void,
  toggle: (eventOrAnchorEl: SyntheticEvent<any> | HTMLElement) => void,
  onMouseLeave: (event: SyntheticEvent<any>) => void,
  setOpen: (
    open: boolean,
    eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement
  ) => void,
  isOpen: boolean,
  anchorEl: ?HTMLElement,
  popupId: ?string,
  variant: Variant,
  _childPopupState: ?PopupState,
  _setChildPopupState: (?PopupState) => void,
}

let eventOrAnchorElWarned: boolean = false

export type CoreState = {
  anchorEl: ?HTMLElement,
  hovered: boolean,
  _childPopupState: ?PopupState,
}

export const initCoreState: CoreState = {
  anchorEl: null,
  hovered: false,
  _childPopupState: null,
}

export function createPopupState({
  state: { anchorEl, hovered, _childPopupState },
  setState,
  parentPopupState,
  popupId,
  variant,
}: {
  state: CoreState,
  setState: ($Shape<CoreState>) => any,
  popupId: ?string,
  variant: Variant,
  parentPopupState?: ?PopupState,
}): PopupState {
  const toggle = (eventOrAnchorEl: SyntheticEvent<any> | HTMLElement) => {
    if (anchorEl) close()
    else open(eventOrAnchorEl)
  }

  const open = (eventOrAnchorEl: SyntheticEvent<any> | HTMLElement) => {
    if (!eventOrAnchorElWarned && !eventOrAnchorEl) {
      eventOrAnchorElWarned = true
      console.error('eventOrAnchorEl should be defined') // eslint-disable-line no-console
    }
    if (parentPopupState) {
      if (!parentPopupState.isOpen) return
      parentPopupState._setChildPopupState(popupState)
    }
    if (typeof document === 'object' && document.activeElement) {
      document.activeElement.blur()
    }
    setState({
      anchorEl:
        eventOrAnchorEl && eventOrAnchorEl.currentTarget
          ? (eventOrAnchorEl.currentTarget: any)
          : (eventOrAnchorEl: any),
      hovered: (eventOrAnchorEl: any).type === 'mouseenter',
    })
  }

  const close = () => {
    if (_childPopupState) _childPopupState.close()
    if (parentPopupState) parentPopupState._setChildPopupState(null)
    setState({ anchorEl: null, hovered: false })
  }

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

  const onMouseLeave = (event: SyntheticEvent<any>) => {
    const relatedTarget: any = (event: any).relatedTarget
    if (hovered && !isElementInPopup(relatedTarget, popupState)) {
      close()
    }
  }

  const _setChildPopupState = _childPopupState => setState({ _childPopupState })

  const popupState = {
    anchorEl,
    popupId,
    variant,
    isOpen: anchorEl != null,
    open,
    close,
    toggle,
    setOpen,
    onMouseLeave,
    _childPopupState,
    _setChildPopupState,
  }

  return popupState
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
 * Creates props for a component that opens the popup while hovered.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindHover({
  isOpen,
  open,
  onMouseLeave,
  popupId,
  variant,
}: PopupState): {
  'aria-owns'?: ?string,
  'aria-describedby'?: ?string,
  'aria-haspopup': true,
  onMouseEnter: (event: SyntheticEvent<any>) => any,
  onMouseLeave: (event: SyntheticEvent<any>) => any,
} {
  return {
    [variant === 'popover' ? 'aria-owns' : 'aria-describedby']: isOpen
      ? popupId
      : null,
    'aria-haspopup': true,
    onMouseEnter: open,
    onMouseLeave,
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
  onMouseLeave,
}: PopupState): {
  id: ?string,
  anchorEl: ?HTMLElement,
  open: boolean,
  onClose: () => void,
  onMouseLeave: (event: SyntheticEvent<any>) => void,
} {
  return {
    id: popupId,
    anchorEl,
    open: isOpen,
    onClose: close,
    onMouseLeave,
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

function getPopup({ popupId }: PopupState): ?HTMLElement {
  return popupId && typeof document !== 'undefined'
    ? document.getElementById(popupId) // eslint-disable-line no-undef
    : null
}

function isElementInPopup(
  element: HTMLElement,
  popupState: PopupState
): boolean {
  const { anchorEl, _childPopupState } = popupState
  return (
    isAncestor(anchorEl, element) ||
    isAncestor(getPopup(popupState), element) ||
    (_childPopupState != null && isElementInPopup(element, _childPopupState))
  )
}

function isAncestor(parent: ?Element, child: ?Element): boolean {
  if (!parent) return false
  while (child) {
    if (child === parent) return true
    child = child.parentElement
  }
  return false
}
