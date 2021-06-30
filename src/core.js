// @flow
/* eslint-env browser */

import * as React from 'react'

const printedWarnings: { [string]: boolean } = {}

function warn(key: string, message: string) {
  if (printedWarnings[key]) return
  printedWarnings[key] = true
  console.error('[material-ui-popup-state] WARNING', message) // eslint-disable-line no-console
}

export type Variant = 'popover' | 'popper'

export type PopupState = {
  open: (eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement) => void,
  close: () => void,
  toggle: (eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement) => void,
  onMouseLeave: (event: SyntheticEvent<any>) => void,
  setOpen: (
    open: boolean,
    eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement
  ) => void,
  isOpen: boolean,
  anchorEl: ?HTMLElement,
  setAnchorEl: (?HTMLElement) => any,
  setAnchorElUsed: boolean,
  popupId: ?string,
  variant: Variant,
  disableAutoFocus: boolean,
  _childPopupState: ?PopupState,
  _setChildPopupState: (?PopupState) => void,
}

export type CoreState = {
  isOpen: boolean,
  setAnchorElUsed: boolean,
  anchorEl: ?HTMLElement,
  hovered: boolean,
  _childPopupState: ?PopupState,
  _deferNextOpen: boolean,
  _deferNextClose: boolean,
}

export const initCoreState: CoreState = {
  isOpen: false,
  setAnchorElUsed: false,
  anchorEl: null,
  hovered: false,
  _childPopupState: null,
  _deferNextOpen: false,
  _deferNextClose: false,
}

export function createPopupState({
  state,
  setState: _setState,
  parentPopupState,
  popupId,
  variant,
  disableAutoFocus,
}: {
  state: CoreState,
  setState: ($Shape<CoreState>) => any,
  popupId: ?string,
  variant: Variant,
  parentPopupState?: ?PopupState,
  disableAutoFocus?: ?boolean,
}): PopupState {
  const {
    isOpen,
    setAnchorElUsed,
    anchorEl,
    hovered,
    _childPopupState,
    _deferNextOpen,
    _deferNextClose,
  } = state

  // use lastState to workaround cases where setState is called multiple times
  // in a single render (e.g. because of refs being called multiple times)
  let lastState = state
  const setState = (nextState: $Shape<CoreState>) => {
    if (hasChanges(lastState, nextState)) {
      _setState((lastState = { ...lastState, ...nextState }))
    }
  }

  const setAnchorEl = (_anchorEl: ?HTMLElement) => {
    setState({ setAnchorElUsed: true, anchorEl: _anchorEl })
  }

  const toggle = (eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement) => {
    if (isOpen) close(eventOrAnchorEl)
    else open(eventOrAnchorEl)
  }

  const open = (eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement) => {
    const eventType = eventOrAnchorEl && (eventOrAnchorEl: any).type
    const currentTarget =
      eventOrAnchorEl && (eventOrAnchorEl: any).currentTarget

    if (eventType === 'touchstart') {
      setState({ _deferNextOpen: true })
      return
    }

    const doOpen = () => {
      if (!eventOrAnchorEl && !setAnchorElUsed) {
        warn(
          'missingEventOrAnchorEl',
          'eventOrAnchorEl should be defined if setAnchorEl is not used'
        )
      }

      if (parentPopupState) {
        if (!parentPopupState.isOpen) return
        parentPopupState._setChildPopupState(popupState)
      }

      const newState: $Shape<CoreState> = {
        isOpen: true,
        hovered: eventType === 'mouseover',
      }

      if (currentTarget) {
        if (!setAnchorElUsed) {
          newState.anchorEl = (currentTarget: any)
        }
      } else if (eventOrAnchorEl) {
        newState.anchorEl = (eventOrAnchorEl: any)
      }

      setState(newState)
    }
    if (_deferNextOpen) {
      setState({ _deferNextOpen: false })
      setTimeout(doOpen, 0)
    } else {
      doOpen()
    }
  }

  const close = (arg?: SyntheticEvent<any> | HTMLElement) => {
    const eventType = arg && (arg: any).type
    if (eventType === 'touchstart') {
      setState({ _deferNextClose: true })
      return
    }
    const doClose = () => {
      if (_childPopupState) _childPopupState.close()
      if (parentPopupState) parentPopupState._setChildPopupState(null)
      setState({ isOpen: false, hovered: false })
    }
    if (_deferNextClose) {
      setState({ _deferNextClose: false })
      setTimeout(doClose, 0)
    } else {
      doClose()
    }
  }

  const setOpen = (
    nextOpen: boolean,
    eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement
  ) => {
    if (nextOpen) {
      open(eventOrAnchorEl)
    } else close(eventOrAnchorEl)
  }

  const onMouseLeave = (event: SyntheticEvent<any>) => {
    const relatedTarget: any = (event: any).relatedTarget
    if (hovered && !isElementInPopup(relatedTarget, popupState)) {
      close(event)
    }
  }

  const _setChildPopupState = (_childPopupState) =>
    setState({ _childPopupState })

  const popupState = {
    anchorEl,
    setAnchorEl,
    setAnchorElUsed,
    popupId,
    variant,
    isOpen,
    open,
    close,
    toggle,
    setOpen,
    onMouseLeave,
    disableAutoFocus: Boolean(disableAutoFocus),
    _childPopupState,
    _setChildPopupState,
  }

  return popupState
}

/**
 * Creates a ref that sets the anchorEl for the popup.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function anchorRef({ setAnchorEl }: PopupState): (?HTMLElement) => any {
  return (el: ?HTMLElement) => {
    if (el) setAnchorEl(el)
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
  'aria-controls'?: ?string,
  'aria-describedby'?: ?string,
  'aria-haspopup': ?true,
  onClick: (event: SyntheticEvent<any>) => void,
  onTouchStart: (event: SyntheticEvent<any>) => void,
} {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']: isOpen
      ? popupId
      : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
    onClick: open,
    onTouchStart: open,
  }
}

/**
 * Creates props for a component that opens the popup on its contextmenu event (right click).
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindContextMenu({
  isOpen,
  open,
  popupId,
  variant,
}: PopupState): {
  'aria-controls'?: ?string,
  'aria-describedby'?: ?string,
  'aria-haspopup': ?true,
  onContextMenu: (event: SyntheticEvent<any>) => void,
} {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']: isOpen
      ? popupId
      : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
    onContextMenu: (e: SyntheticMouseEvent<any>) => {
      e.preventDefault()
      open(e)
    },
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
  'aria-controls'?: ?string,
  'aria-describedby'?: ?string,
  'aria-haspopup': ?true,
  onClick: (event: SyntheticEvent<any>) => void,
  onTouchStart: (event: SyntheticEvent<any>) => void,
} {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']: isOpen
      ? popupId
      : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
    onClick: toggle,
    onTouchStart: toggle,
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
  'aria-controls'?: ?string,
  'aria-describedby'?: ?string,
  'aria-haspopup': ?true,
  onTouchStart: (event: SyntheticMouseEvent<any>) => any,
  onMouseOver: (event: SyntheticMouseEvent<any>) => any,
  onMouseLeave: (event: SyntheticMouseEvent<any>) => any,
} {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']: isOpen
      ? popupId
      : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
    onTouchStart: open,
    onMouseOver: open,
    onMouseLeave,
  }
}

/**
 * Creates props for a component that opens the popup while focused.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindFocus({
  isOpen,
  open,
  close,
  popupId,
  variant,
}: PopupState): {
  'aria-controls'?: ?string,
  'aria-describedby'?: ?string,
  'aria-haspopup': ?true,
  onFocus: (event: SyntheticEvent<any>) => any,
  onBlur: (event: SyntheticEvent<any>) => any,
} {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']: isOpen
      ? popupId
      : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
    onFocus: open,
    onBlur: close,
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
  disableAutoFocus,
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
    disableAutoFocus,
    disableEnforceFocus: disableAutoFocus,
    disableRestoreFocus: disableAutoFocus,
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
  onMouseLeave,
}: PopupState): {
  id: ?string,
  anchorEl: ?HTMLElement,
  open: boolean,
  onMouseLeave: (event: SyntheticEvent<any>) => void,
} {
  return {
    id: popupId,
    anchorEl,
    open: isOpen,
    onMouseLeave,
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

function hasChanges(state: CoreState, nextState: $Shape<CoreState>): boolean {
  for (let key in nextState) {
    if (
      Object.prototype.hasOwnProperty.call(state, key) &&
      state[key] !== nextState[key]
    ) {
      return true
    }
  }
  return false
}
