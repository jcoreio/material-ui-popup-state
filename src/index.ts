import PropTypes from 'prop-types'

import {
  usePopupState,
  anchorRef,
  bindTrigger,
  bindContextMenu,
  bindToggle,
  bindHover,
  bindFocus,
  bindMenu,
  bindPopover,
  bindPopper,
  bindDoubleClick,
  bindDialog,
  type Variant,
  type PopupState as InjectedProps,
} from './hooks'

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
  bindDoubleClick,
  bindDialog,
  type Variant,
  type InjectedProps,
}

export type Props = {
  popupId?: string
  children: (props: InjectedProps) => any
  variant: Variant
  parentPopupState?: InjectedProps | null
  disableAutoFocus?: boolean | null
}

export default function PopupState({
  children,
  popupId,
  variant,
  parentPopupState,
  disableAutoFocus,
}: Props): any {
  const popupState = usePopupState({
    popupId,
    variant,
    parentPopupState,
    disableAutoFocus,
  })
  const result = children(popupState)
  return result != null ? result : null
}

PopupState.propTypes = {
  /**
   * The render function.
   *
   * @param {object} props the properties injected by `PopupState`:
   * <ul>
   *   <li>`open(eventOrAnchorEl)`: opens the popup</li>
   *   <li>`close()`: closes the popup</li>
   *   <li>`toggle(eventOrAnchorEl)`: opens the popup if it is closed, or
   *     closes the popup if it is open.
   *   </li>
   *   <li>`setOpen(open, [eventOrAnchorEl])`: sets whether the popup is open.
   *     `eventOrAnchorEl` is required if `open` is truthy.
   *   </li>
   *   <li>`isOpen`: `true`/`false` if the popup is open/closed</li>
   *   <li>`anchorEl`: the current anchor element (`null` the popup is closed)</li>
   *   <li>`popupId`: the `popupId` prop you passed</li>
   * </ul>
   *
   * @returns {React.Node} the content to display
   */
  children: PropTypes.func.isRequired,
  /**
   * The `id` property to use for the popup.  Will be passed to the render
   * function as `bindPopup.id`, and also used for the `aria-controls` property
   * passed to the trigger component via `bindTrigger`.
   */
  popupId: PropTypes.string,
  /**
   * Which type of popup you are controlling.  Use `'popover'` for `Popover`
   * and `Menu`; use `'popper'` for `Popper`s.  Right now this only affects
   * whether `aria-controls` or `aria-describedby` is used on the trigger
   * component.
   */
  variant: PropTypes.oneOf(['popover', 'popper']).isRequired,
  /**
   * The popupState of the parent menu (for cascading menus)
   */
  parentPopupState: PropTypes.object,
  /**
   * Will focus the popup when it opens unless disableAutoFocus is explicitly false.
   */
  disableAutoFocus: PropTypes.bool,
}
