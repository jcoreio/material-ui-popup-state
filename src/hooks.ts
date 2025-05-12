/* eslint-env browser */

import {
  type SyntheticEvent,
  type MouseEvent,
  type TouchEvent,
  type FocusEvent,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react'
import * as React from 'react'
import { type PopoverPosition, type PopoverReference } from '@mui/material'
import { useEvent } from './useEvent'

const printedWarnings: Record<string, boolean> = {}

function warn(key: string, message: string) {
  if (printedWarnings[key]) return
  printedWarnings[key] = true
  // eslint-disable-next-line no-console
  console.error('[material-ui-popup-state] WARNING', message)
}

export type Variant = 'popover' | 'popper' | 'dialog'

export type PopupState = {
  open: (eventOrAnchorEl?: SyntheticEvent | Element | null) => void
  close: (eventOrAnchorEl?: SyntheticEvent | Element | null) => void
  toggle: (eventOrAnchorEl?: SyntheticEvent | Element | null) => void
  onBlur: (event: FocusEvent) => void
  onMouseLeave: (event: MouseEvent) => void
  setOpen: (
    open: boolean,
    eventOrAnchorEl?: SyntheticEvent | Element | null
  ) => void
  isOpen: boolean
  anchorEl: Element | undefined
  anchorPosition: PopoverPosition | undefined
  setAnchorEl: (anchorEl: Element | null | undefined) => any
  setAnchorElUsed: boolean
  disableAutoFocus: boolean
  popupId: string | undefined
  variant: Variant
  _openEventType: string | null | undefined
  _childPopupState: PopupState | null | undefined
  _setChildPopupState: (popupState: PopupState | null | undefined) => void
}

export type CoreState = {
  isOpen: boolean
  setAnchorElUsed: boolean
  anchorEl: Element | undefined
  anchorPosition: PopoverPosition | undefined
  hovered: boolean
  focused: boolean
  _openEventType: string | null | undefined
  _childPopupState: PopupState | null | undefined
  _deferNextOpen: boolean
  _deferNextClose: boolean
}

export const initCoreState: CoreState = {
  isOpen: false,
  setAnchorElUsed: false,
  anchorEl: undefined,
  anchorPosition: undefined,
  hovered: false,
  focused: false,
  _openEventType: null,
  _childPopupState: null,
  _deferNextOpen: false,
  _deferNextClose: false,
}

// https://github.com/jcoreio/material-ui-popup-state/issues/138
// Webpack prod build doesn't like it if we refer to React.useId conditionally,
// but aliasing to a variable like this works
const _react = React
const defaultPopupId =
  'useId' in _react ?
    () => _react.useId()
    // istanbul ignore next
  : () => undefined

export function usePopupState({
  parentPopupState,
  popupId = defaultPopupId(),
  variant,
  disableAutoFocus,
}: {
  parentPopupState?: PopupState | null | undefined
  popupId?: string | null
  variant: Variant
  disableAutoFocus?: boolean | null | undefined
}): PopupState {
  const isMounted = useRef(true)

  useEffect((): (() => void) => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const [state, _setState] = useState(initCoreState)

  const setState = useCallback(
    (state: CoreState | ((prevState: CoreState) => CoreState)) => {
      if (isMounted.current) _setState(state)
    },
    []
  )

  const setAnchorEl = useCallback(
    (anchorEl: Element | null | undefined) =>
      setState((state) => ({
        ...state,
        setAnchorElUsed: true,
        anchorEl: anchorEl ?? undefined,
      })),
    []
  )

  const toggle = useEvent(
    (eventOrAnchorEl?: SyntheticEvent | Element | null) => {
      if (state.isOpen) close(eventOrAnchorEl)
      else open(eventOrAnchorEl)
      return state
    }
  )

  const open = useEvent((eventOrAnchorEl?: SyntheticEvent | Element | null) => {
    const event =
      eventOrAnchorEl instanceof Element ? undefined : eventOrAnchorEl
    const element =
      eventOrAnchorEl instanceof Element ? eventOrAnchorEl
      : eventOrAnchorEl?.currentTarget instanceof Element ?
        eventOrAnchorEl.currentTarget
      : undefined

    if (event?.type === 'touchstart') {
      setState((state) => ({ ...state, _deferNextOpen: true }))
      return
    }

    const clientX = (event as MouseEvent | undefined)?.clientX
    const clientY = (event as MouseEvent | undefined)?.clientY
    const anchorPosition =
      typeof clientX === 'number' && typeof clientY === 'number' ?
        { left: clientX, top: clientY }
      : undefined

    const doOpen = (state: CoreState): CoreState => {
      if (!eventOrAnchorEl && !state.setAnchorElUsed && variant !== 'dialog') {
        warn(
          'missingEventOrAnchorEl',
          'eventOrAnchorEl should be defined if setAnchorEl is not used'
        )
      }

      if (parentPopupState) {
        if (!parentPopupState.isOpen) return state
        setTimeout(() => parentPopupState._setChildPopupState(popupState))
      }

      const newState: CoreState = {
        ...state,
        isOpen: true,
        anchorPosition,
        hovered: event?.type === 'mouseover' || state.hovered,
        focused: event?.type === 'focus' || state.focused,
        _openEventType: event?.type,
      }

      if (!state.setAnchorElUsed) {
        if (event?.currentTarget) {
          newState.anchorEl = event.currentTarget as any
        } else if (element) {
          newState.anchorEl = element
        }
      }

      return newState
    }

    setState((state: CoreState): CoreState => {
      if (state._deferNextOpen) {
        setTimeout(() => setState(doOpen), 0)
        return { ...state, _deferNextOpen: false }
      } else {
        return doOpen(state)
      }
    })
  })

  const doClose = (state: CoreState): CoreState => {
    const { _childPopupState } = state
    setTimeout(() => {
      _childPopupState?.close()
      parentPopupState?._setChildPopupState(null)
    })
    return { ...state, isOpen: false, hovered: false, focused: false }
  }

  const close = useEvent(
    (eventOrAnchorEl?: SyntheticEvent | Element | null) => {
      const event =
        eventOrAnchorEl instanceof Element ? undefined : eventOrAnchorEl

      if (event?.type === 'touchstart') {
        setState((state) => ({ ...state, _deferNextClose: true }))
        return
      }

      setState((state: CoreState): CoreState => {
        if (state._deferNextClose) {
          setTimeout(() => setState(doClose), 0)
          return { ...state, _deferNextClose: false }
        } else {
          return doClose(state)
        }
      })
    }
  )

  const setOpen = useCallback(
    (
      nextOpen: boolean,
      eventOrAnchorEl?: SyntheticEvent<any> | Element | null
    ) => {
      if (nextOpen) {
        open(eventOrAnchorEl)
      } else {
        close(eventOrAnchorEl)
      }
    },
    []
  )

  const onMouseLeave = useEvent((event: MouseEvent) => {
    const { relatedTarget } = event
    setState((state: CoreState): CoreState => {
      if (
        state.hovered &&
        !(
          relatedTarget instanceof Element &&
          isElementInPopup(relatedTarget, popupState)
        )
      ) {
        if (state.focused) {
          return { ...state, hovered: false }
        } else {
          return doClose(state)
        }
      }
      return state
    })
  })

  const onBlur = useEvent((event?: FocusEvent) => {
    if (!event) return
    const { relatedTarget } = event
    setState((state: CoreState): CoreState => {
      if (
        state.focused &&
        !(
          relatedTarget instanceof Element &&
          isElementInPopup(relatedTarget, popupState)
        )
      ) {
        if (state.hovered) {
          return { ...state, focused: false }
        } else {
          return doClose(state)
        }
      }
      return state
    })
  })

  const _setChildPopupState = useCallback(
    (_childPopupState: PopupState | null | undefined) =>
      setState((state) => ({ ...state, _childPopupState })),
    []
  )

  const popupState: PopupState = {
    ...state,
    setAnchorEl,
    popupId: popupId ?? undefined,
    variant,
    open,
    close,
    toggle,
    setOpen,
    onBlur,
    onMouseLeave,
    disableAutoFocus:
      disableAutoFocus ?? Boolean(state.hovered || state.focused),
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
export function anchorRef({
  setAnchorEl,
}: PopupState): (el: Element | null | undefined) => any {
  return setAnchorEl
}

type ControlAriaProps = {
  'aria-controls'?: string
  'aria-describedby'?: string
  'aria-haspopup'?: true
}

function controlAriaProps({
  isOpen,
  popupId,
  variant,
}: PopupState): ControlAriaProps {
  return {
    ...(variant === 'popover' ?
      {
        'aria-haspopup': true,
        'aria-controls': isOpen ? popupId : undefined,
      }
    : variant === 'popper' ?
      { 'aria-describedby': isOpen ? popupId : undefined }
    : undefined),
  }
}

/**
 * Creates props for a component that opens the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindTrigger(popupState: PopupState): ControlAriaProps & {
  onClick: (event: MouseEvent) => void
  onTouchStart: (event: TouchEvent) => void
} {
  return {
    ...controlAriaProps(popupState),
    onClick: popupState.open,
    onTouchStart: popupState.open,
  }
}

/**
 * Creates props for a component that opens the popup on its contextmenu event (right click).
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindContextMenu(popupState: PopupState): ControlAriaProps & {
  onContextMenu: (event: MouseEvent) => void
} {
  return {
    ...controlAriaProps(popupState),
    onContextMenu: (e: MouseEvent) => {
      e.preventDefault()
      popupState.open(e)
    },
  }
}

/**
 * Creates props for a component that toggles the popup when clicked.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindToggle(popupState: PopupState): ControlAriaProps & {
  onClick: (event: MouseEvent) => void
  onTouchStart: (event: TouchEvent) => void
} {
  return {
    ...controlAriaProps(popupState),
    onClick: popupState.toggle,
    onTouchStart: popupState.toggle,
  }
}

/**
 * Creates props for a component that opens the popup while hovered.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindHover(popupState: PopupState): ControlAriaProps & {
  onTouchStart: (event: TouchEvent) => any
  onMouseOver: (event: MouseEvent) => any
  onMouseLeave: (event: MouseEvent) => any
} {
  const { open, onMouseLeave } = popupState
  return {
    ...controlAriaProps(popupState),
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
export function bindFocus(popupState: PopupState): ControlAriaProps & {
  onFocus: (event: FocusEvent) => any
  onBlur: (event: FocusEvent) => any
} {
  const { open, onBlur } = popupState
  return {
    ...controlAriaProps(popupState),
    onFocus: open,
    onBlur,
  }
}

/**
 * Creates props for a component that opens the popup while double click.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindDoubleClick({
  isOpen,
  open,
  popupId,
  variant,
}: PopupState): {
  'aria-controls'?: string
  'aria-describedby'?: string
  'aria-haspopup'?: true
  onDoubleClick: (event: MouseEvent) => any
} {
  return {
    // $FlowFixMe
    [variant === 'popover' ? 'aria-controls' : 'aria-describedby']:
      isOpen ? popupId : null,
    'aria-haspopup': variant === 'popover' ? true : undefined,
    onDoubleClick: open,
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
  anchorPosition,
  close,
  popupId,
  onMouseLeave,
  disableAutoFocus,
  _openEventType,
}: PopupState): {
  id?: string
  anchorEl?: Element | null
  anchorPosition?: PopoverPosition
  anchorReference: PopoverReference
  open: boolean
  onClose: () => void
  onMouseLeave: (event: MouseEvent) => void
  disableAutoFocus?: boolean
  disableEnforceFocus?: boolean
  disableRestoreFocus?: boolean
} {
  const usePopoverPosition = _openEventType === 'contextmenu'
  return {
    id: popupId,
    anchorEl,
    anchorPosition,
    anchorReference: usePopoverPosition ? 'anchorPosition' : 'anchorEl',
    open: isOpen,
    onClose: close,
    onMouseLeave,
    ...(disableAutoFocus && {
      disableAutoFocus: true,
      disableEnforceFocus: true,
      disableRestoreFocus: true,
    }),
  }
}

/**
 * Creates props for a `Menu` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */

/**
 * Creates props for a `Popover` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindMenu({
  isOpen,
  anchorEl,
  anchorPosition,
  close,
  popupId,
  onMouseLeave,
  disableAutoFocus,
  _openEventType,
}: PopupState): {
  id?: string
  anchorEl?: Element | null
  anchorPosition?: PopoverPosition
  anchorReference: PopoverReference
  open: boolean
  onClose: () => void
  onMouseLeave: (event: MouseEvent) => void
  autoFocus?: boolean
  disableAutoFocusItem?: boolean
  disableAutoFocus?: boolean
  disableEnforceFocus?: boolean
  disableRestoreFocus?: boolean
} {
  const usePopoverPosition = _openEventType === 'contextmenu'
  return {
    id: popupId,
    anchorEl,
    anchorPosition,
    anchorReference: usePopoverPosition ? 'anchorPosition' : 'anchorEl',
    open: isOpen,
    onClose: close,
    onMouseLeave,
    ...(disableAutoFocus && {
      autoFocus: false,
      disableAutoFocusItem: true,
      disableAutoFocus: true,
      disableEnforceFocus: true,
      disableRestoreFocus: true,
    }),
  }
}
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
  id?: string
  anchorEl?: Element | null
  open: boolean
  onMouseLeave: (event: MouseEvent) => void
} {
  return {
    id: popupId,
    anchorEl,
    open: isOpen,
    onMouseLeave,
  }
}

/**
 * Creates props for a `Dialog` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export function bindDialog({ isOpen, close }: PopupState): {
  open: boolean
  onClose: (event: SyntheticEvent) => any
} {
  return {
    open: isOpen,
    onClose: close,
  }
}

function getPopup(
  element: Element,
  { popupId }: PopupState
): Element | null | undefined {
  if (!popupId) return null
  const rootNode: any =
    typeof element.getRootNode === 'function' ? element.getRootNode() : document
  if (typeof rootNode.getElementById === 'function') {
    return rootNode.getElementById(popupId)
  }
  return null
}

function isElementInPopup(element: Element, popupState: PopupState): boolean {
  const { anchorEl, _childPopupState } = popupState
  return (
    isAncestor(anchorEl, element) ||
    isAncestor(getPopup(element, popupState), element) ||
    (_childPopupState != null && isElementInPopup(element, _childPopupState))
  )
}

function isAncestor(
  parent: Element | null | undefined,
  child: Element | null | undefined
): boolean {
  if (!parent) return false
  while (child) {
    if (child === parent) return true
    child = child.parentElement
  }
  return false
}
