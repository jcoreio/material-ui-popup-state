// @flow
/* eslint-env browser */

import * as React from 'react'

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
  _childPopupState: ?PopupState,
  _setChildPopupState: (?PopupState) => void,
}

let eventOrAnchorElWarned: boolean = false

export type CoreState = {
  isOpen: boolean,
  setAnchorElUsed: boolean,
  anchorEl: ?HTMLElement,
  hovered: boolean,
  _childPopupState: ?PopupState,
}

export const initCoreState: CoreState = {
  isOpen: false,
  setAnchorElUsed: false,
  anchorEl: null,
  hovered: false,
  _childPopupState: null,
}

export function createPopupState({
  state,
  setState: _setState,
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
  const { isOpen, setAnchorElUsed, anchorEl, hovered, _childPopupState } = state

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
    if (isOpen) close()
    else open(eventOrAnchorEl)
  }

  const open = (eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement) => {
    if (!eventOrAnchorElWarned && !eventOrAnchorEl && !setAnchorElUsed) {
      eventOrAnchorElWarned = true
      /* eslint-disable no-console */
      console.error(
        'eventOrAnchorEl should be defined if setAnchorEl is not used'
      )
      /* eslint-enable no-console */
    }
    if (parentPopupState) {
      if (!parentPopupState.isOpen) return
      parentPopupState._setChildPopupState(popupState)
    }
    if (typeof document === 'object' && document.activeElement) {
      document.activeElement.blur()
    }

    const newState: $Shape<CoreState> = {
      isOpen: true,
      hovered: eventOrAnchorEl && (eventOrAnchorEl: any).type === 'mouseenter',
    }

    if (eventOrAnchorEl && eventOrAnchorEl.currentTarget) {
      if (!setAnchorElUsed) {
        newState.anchorEl = (eventOrAnchorEl.currentTarget: any)
      }
    } else if (eventOrAnchorEl) {
      newState.anchorEl = (eventOrAnchorEl: any)
    }

    setState(newState)
  }

  const close = () => {
    if (_childPopupState) _childPopupState.close()
    if (parentPopupState) parentPopupState._setChildPopupState(null)
    setState({ isOpen: false, hovered: false })
  }

  const setOpen = (
    nextOpen: boolean,
    eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement
  ) => {
    if (nextOpen) {
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
} {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']: isOpen
      ? popupId
      : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
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
  'aria-controls'?: ?string,
  'aria-describedby'?: ?string,
  'aria-haspopup': ?true,
  onClick: (event: SyntheticEvent<any>) => void,
} {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']: isOpen
      ? popupId
      : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
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
  'aria-controls'?: ?string,
  'aria-describedby'?: ?string,
  'aria-haspopup': ?true,
  onMouseEnter: (event: SyntheticEvent<any>) => any,
  onMouseLeave: (event: SyntheticEvent<any>) => any,
} {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']: isOpen
      ? popupId
      : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
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

function hasChanges(state: CoreState, nextState: $Shape<CoreState>): boolean {
  for (let key in nextState) {
    if (state.hasOwnProperty(key) && state[key] !== nextState[key]) {
      return true
    }
  }
  return false
}
